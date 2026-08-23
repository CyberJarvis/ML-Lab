// ============================================================================
// Environment-agnostic wrapper around a Pyodide instance.
//
// The React provider and the headless verification script both drive this
// module, so what runs in CI is byte-for-byte what runs in the student's
// browser. Nothing here touches the DOM.
// ============================================================================

import { PYTHON_PREAMBLE } from "./preamble";
import { planImports, type ResolvedModule } from "./resolve-imports";
import { PYODIDE_VERSION, PYTHON_VERSION } from "./package-registry";

export { PYODIDE_VERSION, PYTHON_VERSION };

export const CDN_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

/** Loaded eagerly so the first Run of any experiment needs no extra downloads. */
export const CORE_PACKAGES = [
  "numpy",
  "scipy",
  "matplotlib",
  "pandas",
  "scikit-learn",
  "networkx",
  "micropip",
];

export interface RunResult {
  stdout: string;
  stderr: string;
  /** base64 PNG data URIs, in creation order. */
  plots: string[];
  error: string | null;
  /** Modules refused before execution, with guidance. */
  blocked: ResolvedModule[];
  durationMs: number;
}

export interface PyodideLike {
  runPythonAsync(code: string): Promise<unknown>;
  loadPackage(names: string | string[], options?: unknown): Promise<unknown>;
  setStdout(handler: { batched: (text: string) => void }): void;
  setStderr(handler: { batched: (text: string) => void }): void;
  pyimport(name: string): { install(spec: string): Promise<void> };
  globals: { get(name: string): unknown };
}

type Progress = (message: string) => void;

export class LabRuntime {
  private readonly pyodide: PyodideLike;
  private readonly installed = new Set<string>(CORE_PACKAGES);
  private run!: (source: string) => Promise<string | null>;

  constructor(pyodide: PyodideLike) {
    this.pyodide = pyodide;
  }

  /** Loads the core scientific stack and installs the Python-side shim. */
  async bootstrap(onProgress: Progress = () => {}): Promise<void> {
    onProgress("Loading NumPy, SciPy, pandas, scikit-learn, matplotlib, NetworkX…");
    await this.pyodide.loadPackage(CORE_PACKAGES);

    onProgress("Preparing the lab environment…");
    await this.pyodide.runPythonAsync(PYTHON_PREAMBLE);
    this.run = this.pyodide.globals.get("_lab_run") as (s: string) => Promise<string | null>;
  }

  /** Discards every variable defined by previous runs. */
  async resetNamespace(): Promise<void> {
    await this.pyodide.runPythonAsync("_lab_reset_namespace()");
  }

  /**
   * Resolves imports, fetches whatever is missing, then executes the source.
   * Modules that cannot exist in WebAssembly abort the run before any code
   * executes, so the student gets guidance instead of a ModuleNotFoundError.
   */
  async execute(source: string, onProgress: Progress = () => {}): Promise<RunResult> {
    const started = Date.now();
    const plan = planImports(source);

    if (plan.blocked.length > 0) {
      return {
        stdout: "",
        stderr: "",
        plots: [],
        error: null,
        blocked: plan.blocked,
        durationMs: Date.now() - started,
      };
    }

    let stdout = "";
    let stderr = "";
    this.pyodide.setStdout({ batched: (text) => (stdout += text + "\n") });
    this.pyodide.setStderr({ batched: (text) => (stderr += text + "\n") });

    try {
      await this.installDependencies(plan.loadPackage, plan.micropip, onProgress);
    } catch (cause) {
      return {
        stdout,
        stderr,
        plots: [],
        error: describeInstallFailure(cause, plan.micropip),
        blocked: [],
        durationMs: Date.now() - started,
      };
    }

    // Python's None arrives as undefined; the public contract is `string | null`.
    const error = (await this.run(source)) ?? null;
    const plots = this.collectFigures();

    return { stdout, stderr, plots, error, blocked: [], durationMs: Date.now() - started };
  }

  private async installDependencies(
    bundled: string[],
    fromPypi: string[],
    onProgress: Progress
  ): Promise<void> {
    const missingBundled = bundled.filter((name) => !this.installed.has(name));
    if (missingBundled.length > 0) {
      onProgress(`Loading ${missingBundled.join(", ")}…`);
      await this.pyodide.loadPackage(missingBundled);
      missingBundled.forEach((name) => this.installed.add(name));
    }

    const missingPypi = fromPypi.filter((name) => !this.installed.has(name));
    if (missingPypi.length === 0) return;

    const micropip = this.pyodide.pyimport("micropip");
    for (const name of missingPypi) {
      onProgress(`Installing ${name} from PyPI…`);
      await micropip.install(name);
      this.installed.add(name);
    }
  }

  private collectFigures(): string[] {
    const handle = this.pyodide.globals.get("_lab_figures") as
      | { toJs(): string[] }
      | undefined;
    if (!handle?.toJs) return [];
    return handle.toJs().map((b64) => `data:image/png;base64,${b64}`);
  }
}

function describeInstallFailure(cause: unknown, attempted: string[]): string {
  const detail = cause instanceof Error ? cause.message : String(cause);
  const names = attempted.join(", ");
  return [
    `Could not install: ${names}`,
    "",
    "This package has no WebAssembly build, so it cannot run in the browser lab.",
    "Pure-Python packages install automatically; anything with compiled C, Rust or",
    "CUDA extensions (PyTorch, TensorFlow, Hugging Face tokenizers) does not.",
    "",
    detail,
  ].join("\n");
}
