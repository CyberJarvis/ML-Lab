// ============================================================================
// Checks the promises the lab runtime makes about arbitrary student input:
// real tracebacks, blocked-package guidance, notebook paste, forgotten
// plt.show(), REPL echo, and automatic dependency resolution.
//
//   npm run verify:behaviour
// ============================================================================

import { loadPyodide } from "pyodide";
import { LabRuntime, type PyodideLike } from "../lib/runtime/lab-runtime";

const pyodide = (await loadPyodide()) as unknown as PyodideLike;
const runtime = new LabRuntime(pyodide);
await runtime.bootstrap();

interface Case {
  name: string;
  code: string;
  expect: (r: Awaited<ReturnType<LabRuntime["execute"]>>) => string | null;
}

const cases: Case[] = [
  {
    name: "traceback reports the student's own line number",
    code: ["x = 1", "y = 2", "z = x / 0"].join("\n"),
    expect: (r) =>
      r.error?.includes("line 3") && r.error?.includes("ZeroDivisionError")
        ? null
        : `expected a ZeroDivisionError on line 3, got: ${r.error}`,
  },
  {
    name: "traceback shows the offending source line",
    code: "values = [1, 2, 3]\nprint(values[99])",
    expect: (r) =>
      r.error?.includes("values[99]") && r.error?.includes("IndexError")
        ? null
        : `expected the source line in the traceback, got: ${r.error}`,
  },
  {
    name: "syntax errors are reported, not swallowed",
    code: "for i in range(3)\n    print(i)",
    expect: (r) => (r.error?.includes("SyntaxError") ? null : `got: ${r.error}`),
  },
  {
    name: "torch is blocked before execution with guidance",
    code: "import torch\nprint('never runs')",
    expect: (r) => {
      if (r.blocked.length !== 1) return `expected 1 blocked module, got ${r.blocked.length}`;
      if (r.stdout.includes("never runs")) return "code executed despite being blocked";
      return r.blocked[0].note?.includes("scikit-learn") ? null : "guidance missing an alternative";
    },
  },
  {
    name: "huggingface transformers explains how to run it elsewhere",
    code: "from transformers import AutoTokenizer",
    expect: (r) =>
      r.blocked[0]?.note?.includes("AutoTokenizer.from_pretrained")
        ? null
        : `expected setup guidance, got: ${r.blocked[0]?.note}`,
  },
  {
    name: "'import torch' inside a string is not treated as an import",
    code: "print('import torch')",
    expect: (r) => (r.blocked.length === 0 && r.stdout.includes("import torch") ? null : "false positive"),
  },
  {
    name: "notebook magics and shell escapes are stripped, not fatal",
    code: "%matplotlib inline\n!pip install numpy\nimport numpy as np\nprint(np.arange(3).sum())",
    expect: (r) =>
      r.error === null && r.stdout.includes("3") && r.stderr.includes("ignored notebook-only")
        ? null
        : `error=${r.error} stdout=${r.stdout.trim()}`,
  },
  {
    name: "a figure is captured even without plt.show()",
    code: "import matplotlib.pyplot as plt\nplt.plot([1, 2, 3])",
    expect: (r) => (r.plots.length === 1 ? null : `expected 1 figure, got ${r.plots.length}`),
  },
  {
    name: "multiple figures are captured in order",
    code: [
      "import matplotlib.pyplot as plt",
      "plt.figure(); plt.plot([1, 2]); plt.show()",
      "plt.figure(); plt.plot([3, 4]); plt.show()",
    ].join("\n"),
    expect: (r) => (r.plots.length === 2 ? null : `expected 2 figures, got ${r.plots.length}`),
  },
  {
    name: "a trailing expression echoes its value, like a REPL",
    code: "a = 6\nb = 7\na * b",
    expect: (r) => (r.stdout.trim() === "42" ? null : `expected 42, got ${JSON.stringify(r.stdout)}`),
  },
  {
    name: "pandas frames render as a table",
    code: "import pandas as pd\npd.DataFrame({'a': [1, 2], 'b': [3, 4]})",
    expect: (r) => (r.stdout.includes("a") && r.stdout.includes("b") ? null : `got ${r.stdout}`),
  },
  {
    name: "a bundled package not in the core set loads on demand",
    code: "import sympy\nprint(sympy.simplify('x + x'))",
    expect: (r) => (r.stdout.includes("2*x") ? null : `error=${r.error} stdout=${r.stdout}`),
  },
  {
    name: "a pure-Python PyPI package installs on demand",
    code: "import seaborn\nprint(seaborn.__version__.split('.')[0])",
    expect: (r) => (r.error === null && r.stdout.trim() ? null : `error=${r.error}`),
  },
  {
    name: "state persists between runs until reset",
    code: "print(a * b)",
    expect: (r) => (r.stdout.trim() === "42" ? null : `expected 42 from the earlier run, got ${r.stdout.trim()}`),
  },
  {
    name: "input() fails with an actionable message",
    code: "n = input('how many? ')",
    expect: (r) => (r.error?.includes("Assign the value directly") ? null : `got: ${r.error}`),
  },
  {
    name: "an unknown package fails with an explanation, not a stack trace",
    code: "import definitely_not_a_real_package_xyz",
    expect: (r) =>
      r.error?.includes("no WebAssembly build") ? null : `got: ${r.error?.slice(0, 120)}`,
  },
];

let failures = 0;

for (const testCase of cases) {
  const result = await runtime.execute(testCase.code);
  const problem = testCase.expect(result);

  if (problem) {
    failures++;
    console.log(`\x1b[31m✗\x1b[0m ${testCase.name}\n    ${problem}`);
  } else {
    console.log(`\x1b[32m✓\x1b[0m ${testCase.name}`);
  }
}

console.log(`\n${cases.length - failures}/${cases.length} passed`);
if (failures > 0) process.exit(1);
