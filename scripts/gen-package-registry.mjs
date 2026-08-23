// Regenerates lib/runtime/package-registry.ts from the Pyodide distribution lock file.
// Usage: node scripts/gen-package-registry.mjs
import { writeFileSync } from "node:fs";

const VERSION = process.argv[2] ?? "314.0.5";
const url = `https://cdn.jsdelivr.net/pyodide/v${VERSION}/full/pyodide-lock.json`;

const lock = await fetch(url).then((r) => r.json());

const moduleToPackage = {};
for (const pkg of Object.values(lock.packages)) {
  if (pkg.package_type !== "package") continue;
  for (const mod of pkg.imports ?? []) moduleToPackage[mod] = pkg.name;
}

const sorted = Object.keys(moduleToPackage)
  .sort()
  .reduce((acc, k) => ((acc[k] = moduleToPackage[k]), acc), {});

const body = `// GENERATED FILE — do not edit by hand.
// Source: ${url}
// Regenerate with: node scripts/gen-package-registry.mjs ${VERSION}

export const PYODIDE_VERSION = "${VERSION}";
export const PYTHON_VERSION = "${lock.info.python}";

/** Importable module name -> Pyodide package that provides it. */
export const BUILTIN_MODULES: Record<string, string> = ${JSON.stringify(sorted, null, 2)};
`;

writeFileSync(new URL("../lib/runtime/package-registry.ts", import.meta.url), body);
console.log(
  `wrote ${Object.keys(sorted).length} modules from ${Object.keys(lock.packages).length} packages (Python ${lock.info.python})`
);
