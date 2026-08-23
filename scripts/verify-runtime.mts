// ============================================================================
// Executes every experiment's starter and solution code through the exact
// runtime the browser uses, and fails the run if anything errors.
//
//   npm run verify              all experiments
//   npm run verify -- 5 7       experiments 5 and 7 only
// ============================================================================

import { loadPyodide } from "pyodide";
import { LabRuntime, type PyodideLike, PYODIDE_VERSION } from "../lib/runtime/lab-runtime";
import { experiments } from "../lib/experiments-data";
import { planImports } from "../lib/runtime/resolve-imports";

interface Check {
  name: string;
  ok: boolean;
  detail: string;
}

const only = process.argv.slice(2).map(Number).filter(Boolean);
const selected = only.length > 0 ? experiments.filter((e) => only.includes(e.number)) : experiments;

const pyodide = (await loadPyodide({ stdLibURL: undefined })) as unknown as PyodideLike;
const runtime = new LabRuntime(pyodide);

console.log(`Pyodide ${PYODIDE_VERSION} — bootstrapping…`);
await runtime.bootstrap((message) => console.log(`  ${message}`));
console.log("");

const checks: Check[] = [];

for (const experiment of selected) {
  console.log(`\x1b[1mExperiment ${experiment.number} — ${experiment.title}\x1b[0m`);

  for (const variant of ["starterCode", "solutionCode"] as const) {
    const label = variant === "starterCode" ? "starter " : "solution";
    const source = experiment[variant];

    // The declared package list must cover what the code actually imports.
    const plan = planImports(source);
    const undeclared = plan.loadPackage.filter((p) => !experiment.packages.includes(p));

    await runtime.resetNamespace();
    const result = await runtime.execute(source);

    const problems: string[] = [];
    if (result.error) problems.push(result.error);
    if (result.blocked.length > 0) {
      problems.push(`blocked imports: ${result.blocked.map((b) => b.module).join(", ")}`);
    }
    if (undeclared.length > 0) {
      problems.push(`undeclared packages: ${undeclared.join(", ")}`);
    }
    if (variant === "solutionCode") {
      if (!result.stdout.trim()) problems.push("solution printed nothing");
      if (result.plots.length === 0) problems.push("solution produced no figure");
    }

    const ok = problems.length === 0;
    const stats = `${(result.durationMs / 1000).toFixed(1)}s  ${result.plots.length} fig  ${result.stdout.split("\n").length - 1} lines`;

    console.log(
      ok
        ? `  \x1b[32m✓\x1b[0m ${label}  ${stats}`
        : `  \x1b[31m✗\x1b[0m ${label}  ${stats}`
    );
    if (!ok) console.log(indent(problems.join("\n"), "      "));
    if (result.stderr.trim()) console.log(indent(`stderr: ${result.stderr.trim()}`, "      \x1b[33m") + "\x1b[0m");

    checks.push({ name: `Ex${experiment.number} ${label}`, ok, detail: problems.join("; ") });
  }
}

const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} passed`);

if (failed.length > 0) {
  console.log("\nFailures:");
  for (const check of failed) console.log(`  ${check.name}: ${check.detail}`);
  process.exit(1);
}

function indent(text: string, prefix: string): string {
  return text
    .split("\n")
    .map((line) => prefix + line)
    .join("\n");
}
