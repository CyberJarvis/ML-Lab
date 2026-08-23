// ============================================================================
// Import resolution for the browser Python runtime.
//
// Before any code runs we scan its import statements and decide, per module,
// whether it ships with Pyodide, can be fetched from PyPI at runtime, or simply
// cannot exist in a WebAssembly sandbox. The last case is reported to the
// student *before* execution starts, with a concrete alternative, rather than
// surfacing as a ModuleNotFoundError halfway through a run.
// ============================================================================

import { BUILTIN_MODULES } from "./package-registry";
import { STDLIB_MODULES } from "./stdlib-modules";

export type ModuleKind = "stdlib" | "builtin" | "pypi" | "unsupported" | "unknown";

export interface ResolvedModule {
  module: string;
  kind: ModuleKind;
  /** Distribution to hand to loadPackage() or micropip.install(). */
  distribution?: string;
  /** Why an unsupported module cannot run here, and what to use instead. */
  note?: string;
}

export interface ImportPlan {
  modules: ResolvedModule[];
  loadPackage: string[];
  micropip: string[];
  blocked: ResolvedModule[];
}

/**
 * Pure-Python distributions that are not bundled with Pyodide but install
 * cleanly from PyPI via micropip. Every entry here has been verified against
 * the pinned Pyodide build by scripts/verify-runtime.mjs.
 */
const PYPI_MODULES: Record<string, string> = {
  seaborn: "seaborn",
  plotly: "plotly",
  imblearn: "imbalanced-learn",
  mlxtend: "mlxtend",
  openpyxl: "openpyxl",
  tabulate: "tabulate",
  yellowbrick: "yellowbrick",
  category_encoders: "category_encoders",
  missingno: "missingno",
  pydotplus: "pydotplus",
  graphviz: "graphviz",
  wordcloud: "wordcloud",
};

/**
 * Modules that cannot work in Pyodide at all — they need native threads, a GPU,
 * or compiled extensions with no WebAssembly wheel. Each carries the guidance a
 * student needs to keep going.
 */
const UNSUPPORTED_MODULES: Record<string, string> = {
  torch:
    "PyTorch has no WebAssembly build — it needs native BLAS and threads. For this lab use scikit-learn (`MLPClassifier`, `MLPRegressor`) for neural networks, or run PyTorch locally / on Google Colab.",
  torchvision: "torchvision depends on PyTorch, which has no WebAssembly build. Use `sklearn.datasets` and `skimage` for image work here.",
  tensorflow:
    "TensorFlow has no WebAssembly build. Use scikit-learn's `MLPClassifier` / `MLPRegressor` in this lab, or run TensorFlow locally / on Google Colab.",
  keras: "Keras requires a TensorFlow or PyTorch backend, neither of which builds for WebAssembly. Use `sklearn.neural_network.MLPClassifier` instead.",
  transformers:
    "Hugging Face Transformers cannot run here: its `tokenizers` dependency is a compiled Rust extension with no WebAssembly wheel, and every model needs a PyTorch or TensorFlow backend. To use it, run locally after `pip install transformers torch`, then load a model with `AutoTokenizer.from_pretrained(...)` and `AutoModel.from_pretrained(...)`. Inside this lab, use scikit-learn's `TfidfVectorizer` + a linear model for text tasks.",
  datasets: "The Hugging Face `datasets` library needs `pyarrow` compiled extensions and network-backed dataset streaming. Use `sklearn.datasets` here.",
  huggingface_hub: "`huggingface_hub` downloads model weights over the network and needs a PyTorch or TensorFlow backend to be useful. Not available in this sandbox.",
  sentence_transformers: "sentence-transformers depends on PyTorch, which has no WebAssembly build. Use `sklearn.feature_extraction.text.TfidfVectorizer` for embeddings here.",
  cv2: "OpenCV is available, but under the distribution name `opencv-python`. It ships with Pyodide — this import should resolve automatically; if it does not, the pinned build omitted it.",
  tkinter: "tkinter needs a desktop window system. Plot with matplotlib instead — figures are captured and rendered in the Output panel.",
  socket: "Raw sockets are not available in the browser sandbox. Use `pyodide.http.pyfetch` or `requests` for HTTP.",
  multiprocessing: "The browser sandbox is single-process. Run the computation sequentially, or use `joblib` with `n_jobs=1`.",
  subprocess: "There is no operating-system shell in the browser sandbox.",
};

const IMPORT_RE = /^[ \t]*(?:from[ \t]+([A-Za-z_][\w.]*)[ \t]+import|import[ \t]+(.+))/gm;

/** Extracts every top-level module name imported by a block of Python source. */
export function extractImports(code: string): string[] {
  const withoutStrings = stripStringsAndComments(code);
  const found = new Set<string>();

  for (const match of withoutStrings.matchAll(IMPORT_RE)) {
    const [, fromModule, importList] = match;

    if (fromModule) {
      // `from . import x` is a relative import — nothing to fetch.
      if (!fromModule.startsWith(".")) found.add(fromModule.split(".")[0]);
      continue;
    }

    for (const clause of importList.split(",")) {
      const name = clause.trim().split(/[ \t]+as[ \t]+/)[0].trim();
      if (name && !name.startsWith(".")) found.add(name.split(".")[0]);
    }
  }

  return [...found];
}

export function resolveModule(module: string): ResolvedModule {
  if (STDLIB_MODULES.has(module) && !UNSUPPORTED_MODULES[module]) {
    return { module, kind: "stdlib" };
  }
  if (BUILTIN_MODULES[module]) {
    return { module, kind: "builtin", distribution: BUILTIN_MODULES[module] };
  }
  if (PYPI_MODULES[module]) {
    return { module, kind: "pypi", distribution: PYPI_MODULES[module] };
  }
  if (UNSUPPORTED_MODULES[module]) {
    return { module, kind: "unsupported", note: UNSUPPORTED_MODULES[module] };
  }
  return { module, kind: "unknown", distribution: module };
}

/** Classifies every import in `code` into a plan the runtime can act on. */
export function planImports(code: string): ImportPlan {
  const modules = extractImports(code).map(resolveModule);

  return {
    modules,
    loadPackage: dedupe(modules.filter((m) => m.kind === "builtin").map((m) => m.distribution!)),
    micropip: dedupe(
      modules.filter((m) => m.kind === "pypi" || m.kind === "unknown").map((m) => m.distribution!)
    ),
    blocked: modules.filter((m) => m.kind === "unsupported"),
  };
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)];
}

/**
 * Removes comments and string literals so that text such as `"import torch"`
 * inside a docstring is never mistaken for a real import.
 */
function stripStringsAndComments(code: string): string {
  let out = "";
  let i = 0;

  while (i < code.length) {
    const ch = code[i];

    if (ch === "#") {
      while (i < code.length && code[i] !== "\n") i++;
      continue;
    }

    if (ch === '"' || ch === "'") {
      const triple = code.startsWith(ch.repeat(3), i);
      const quote = triple ? ch.repeat(3) : ch;
      i += quote.length;
      while (i < code.length && !code.startsWith(quote, i)) {
        // Preserve newlines so line-anchored import matching stays aligned.
        if (code[i] === "\n") out += "\n";
        i += code[i] === "\\" ? 2 : 1;
      }
      i += quote.length;
      continue;
    }

    out += ch;
    i++;
  }

  return out;
}
