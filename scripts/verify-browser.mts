// ============================================================================
// End-to-end check in a real browser: navigates an experiment page, runs the
// solution through Pyodide, and confirms console output and figures appear.
//
//   npx next start -p 3111
//   npm run verify:browser
// ============================================================================

import { chromium } from "playwright";
import { experiments as experimentList } from "../lib/experiments-data";

const BASE = process.env.LAB_URL ?? "http://localhost:3111";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

const consoleErrors: string[] = [];
page.on("pageerror", (error) => consoleErrors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});

const checks: { name: string; ok: boolean; detail?: string }[] = [];
const record = (name: string, ok: boolean, detail?: string) => {
  checks.push({ name, ok, detail });
  console.log(ok ? `\x1b[32m✓\x1b[0m ${name}` : `\x1b[31m✗\x1b[0m ${name}${detail ? `\n    ${detail}` : ""}`);
};

await page.goto(`${BASE}/experiments/principal-component-analysis`, { waitUntil: "networkidle" });

record("experiment page loads", await page.getByRole("heading", { name: "Aim" }).isVisible());

// Every section in the Virtual Labs spine must be reachable.
const sections = ["Aim", "Theory", "Pretest", "Procedure", "Simulation", "Posttest", "Further Readings", "Feedback"];
for (const section of sections) {
  await page.getByRole("button", { name: section, exact: true }).click();
  if (section === "Simulation") {
    // Simulation launches a full-screen IDE overlay instead of an in-page heading.
    const visible = await page.getByRole("button", { name: "Run", exact: true }).isVisible();
    record(`section "${section}" renders`, visible);
    await page.getByRole("button", { name: "Exit to experiment overview" }).click();
    continue;
  }
  const visible = await page.getByRole("heading", { name: section, exact: true }).first().isVisible();
  record(`section "${section}" renders`, visible);
}

// Pretest grading.
await page.getByRole("button", { name: "Pretest", exact: true }).click();
await page.getByRole("button", { name: /^B/ }).first().click();
await page.getByRole("button", { name: "Submit answers" }).click();
record(
  "pretest grades and shows a score",
  await page.getByText(/\/ 5/).first().isVisible()
);

// The main event: run real Python in the browser.
await page.getByRole("button", { name: "Simulation", exact: true }).click();
await page.getByRole("button", { name: "Solution", exact: true }).click();
await page.getByRole("button", { name: "Run", exact: true }).click();

console.log("  …waiting for Pyodide to download and execute");
await page.getByRole("button", { name: "Run", exact: true }).waitFor({ state: "visible", timeout: 240_000 });
await page.waitForFunction(
  () => !document.body.innerText.includes("Running"),
  undefined,
  { timeout: 240_000 }
);

const figures = await page.locator('figure img[alt^="Figure"]').count();
record("solution produced a matplotlib figure in the browser", figures > 0, `figures found: ${figures}`);

await page.getByRole("button", { name: /^console$/i }).click();
const consoleText = await page.locator("pre").first().innerText().catch(() => "");
record(
  "console shows the experiment's output",
  consoleText.includes("explained variance") || consoleText.includes("PC1"),
  consoleText.slice(0, 200)
);

await page.screenshot({ path: "/tmp/lab-simulation.png", fullPage: false });

// A blocked package must be refused with guidance rather than a crash.
await page.getByRole("button", { name: "Starter", exact: true }).click();
await page.locator(".monaco-editor").first().click();
await page.keyboard.press("ControlOrMeta+A");
await page.keyboard.press("Backspace");
await page.keyboard.type("import torch");
await page.getByRole("button", { name: "Run", exact: true }).click();
await page.waitForFunction(() => document.body.innerText.includes("not available in this lab"), undefined, {
  timeout: 60_000,
});
const guidance = await page.getByText(/scikit-learn/).first().isVisible();
record("torch is refused before execution, with an alternative offered", guidance);

record("no uncaught JavaScript errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

// Dark mode toggle must flip the root class and persist across reload.
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
const initiallyDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
await page.getByRole("button", { name: /switch to (dark|light) mode/i }).click();
const afterToggle = await page.evaluate(() => document.documentElement.classList.contains("dark"));
record("dark mode toggle flips the root class", afterToggle !== initiallyDark, `${initiallyDark} -> ${afterToggle}`);
await page.reload({ waitUntil: "domcontentloaded" });
const afterReload = await page.evaluate(() => document.documentElement.classList.contains("dark"));
record("dark mode choice persists across reload", afterReload === afterToggle);
// Leave it back where it started so the rest of the sweep isn't affected.
if (afterReload !== initiallyDark) {
  await page.getByRole("button", { name: /switch to (dark|light) mode/i }).click();
}

// The Monaco editor background must actually follow light mode, not stay forced-dark.
await page.evaluate(() => document.documentElement.classList.remove("dark"));
await page.goto(`${BASE}/experiments/simple-linear-regression`, { waitUntil: "domcontentloaded" });
await page.evaluate(() => document.documentElement.classList.remove("dark"));
await page.getByRole("button", { name: "Simulation", exact: true }).click();
await page.locator(".monaco-editor").first().waitFor({ state: "visible", timeout: 30_000 });
const editorBg = await page.evaluate(() => {
  const el = document.querySelector(".monaco-editor-background");
  return el ? getComputedStyle(el).backgroundColor : null;
});
record(
  "editor background is light in light mode",
  editorBg !== null && editorBg !== "rgb(13, 17, 23)",
  `background-color: ${editorBg}`
);
await page.getByRole("button", { name: "Exit to experiment overview" }).click();

// Static pages must render too.
for (const [path, heading] of [["/", /virtual laborator/i], ["/experiments", /experiment/i], ["/theory", /CSC701/i], ["/about", /./]] as const) {
  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
  const text = await page.locator("body").innerText();
  record(`page ${path} renders`, heading.test(text), text.slice(0, 80));
}

// Finally, run every experiment's solution in the browser, not just one.
console.log("\n  sweeping all experiments — running each solution in the browser");
for (const experiment of experimentList) {
  await page.goto(`${BASE}/experiments/${experiment.id}`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Simulation", exact: true }).click();
  await page.getByRole("button", { name: "Solution", exact: true }).click();
  await page.getByRole("button", { name: "Run", exact: true }).click();
  await page.waitForFunction(() => !document.body.innerText.includes("Running"), undefined, {
    timeout: 240_000,
  });

  const figureCount = await page.locator('figure img[alt^="Figure"]').count();
  const errorText = await page.locator("pre.text-red-400").first().innerText().catch(() => "");
  record(
    `Ex ${experiment.number} ${experiment.shortTitle} runs in the browser`,
    figureCount > 0 && errorText === "",
    errorText || `figures: ${figureCount}`
  );
}

await browser.close();

const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} passed`);
if (failed.length > 0) process.exit(1);
