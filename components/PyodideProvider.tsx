"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CDN_URL,
  LabRuntime,
  PYODIDE_VERSION,
  PYTHON_VERSION,
  type PyodideLike,
  type RunResult,
} from "@/lib/runtime/lab-runtime";

export type EngineStatus = "idle" | "loading" | "ready" | "error";

interface PyodideContextValue {
  status: EngineStatus;
  message: string;
  /** Starts the download early so the first Run feels instant. */
  preload: () => void;
  run: (code: string) => Promise<RunResult>;
  reset: () => Promise<void>;
  pythonVersion: string;
  pyodideVersion: string;
}

const PyodideContext = createContext<PyodideContextValue | null>(null);

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideLike>;
  }
}

function loadPyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) return resolve();

    const existing = document.getElementById("pyodide-script");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Pyodide script failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.id = "pyodide-script";
    script.src = `${CDN_URL}pyodide.js`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Could not reach the Pyodide CDN. Check your network connection."));
    document.head.appendChild(script);
  });
}

export function PyodideProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<EngineStatus>("idle");
  const [message, setMessage] = useState("");
  const runtimeRef = useRef<LabRuntime | null>(null);
  const bootPromise = useRef<Promise<LabRuntime> | null>(null);

  const boot = useCallback(async (): Promise<LabRuntime> => {
    if (runtimeRef.current) return runtimeRef.current;
    if (bootPromise.current) return bootPromise.current;

    bootPromise.current = (async () => {
      try {
        setStatus("loading");
        setMessage("Downloading the Python engine…");
        await loadPyodideScript();

        setMessage("Starting Python…");
        const pyodide = await window.loadPyodide!({ indexURL: CDN_URL });

        const runtime = new LabRuntime(pyodide);
        await runtime.bootstrap(setMessage);

        runtimeRef.current = runtime;
        setStatus("ready");
        setMessage("");
        return runtime;
      } catch (cause) {
        bootPromise.current = null;
        setStatus("error");
        setMessage(cause instanceof Error ? cause.message : String(cause));
        throw cause;
      }
    })();

    return bootPromise.current;
  }, []);

  // Warm the engine up as soon as a lab page mounts, so the download overlaps
  // with the student reading the theory rather than blocking their first Run.
  const preload = useCallback(() => {
    void boot().catch(() => {});
  }, [boot]);

  const run = useCallback(
    async (code: string): Promise<RunResult> => {
      const runtime = await boot();
      return runtime.execute(code, setMessage);
    },
    [boot]
  );

  const reset = useCallback(async () => {
    await runtimeRef.current?.resetNamespace();
  }, []);

  return (
    <PyodideContext.Provider
      value={{
        status,
        message,
        preload,
        run,
        reset,
        pythonVersion: PYTHON_VERSION,
        pyodideVersion: PYODIDE_VERSION,
      }}
    >
      {children}
    </PyodideContext.Provider>
  );
}

export function usePyodide(): PyodideContextValue {
  const context = useContext(PyodideContext);
  if (!context) throw new Error("usePyodide must be used inside a PyodideProvider");
  return context;
}

/** Starts the engine download when the component using it mounts. */
export function useEnginePreload(): void {
  const { preload } = usePyodide();
  useEffect(preload, [preload]);
}
