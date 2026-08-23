"use client";

import { useCallback, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import EngineBadge from "./EngineBadge";
import { usePyodide, useEnginePreload } from "./PyodideProvider";
import type { RunResult } from "@/lib/runtime/lab-runtime";
import type { Experiment } from "@/lib/experiments";

type OutputTab = "console" | "plots";
type FileMode = "starter" | "solution";

const MIN_SPLIT = 20;
const MAX_SPLIT = 80;

function ToolbarButton({
  onClick,
  children,
  title,
  primary = false,
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        primary
          ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
          : "text-slate-600 hover:bg-slate-900/5 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/** Rendered when a module cannot exist in WebAssembly, in place of running. */
function BlockedPackages({ blocked }: { blocked: RunResult["blocked"] }) {
  return (
    <div className="space-y-3">
      {blocked.map((module) => (
        <div key={module.module} className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 flex-shrink-0 text-amber-500 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="font-mono text-[13px] font-semibold text-amber-700 dark:text-amber-300">
              {module.module} is not available in this lab
            </p>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-amber-800/90 dark:text-amber-100/90">{module.note}</p>
        </div>
      ))}
      <p className="text-[12px] text-slate-500 dark:text-slate-500">
        Nothing was executed — the import was caught before your code ran.
      </p>
    </div>
  );
}

export default function Simulation({
  experiment,
  onExit,
}: {
  experiment: Experiment;
  onExit?: () => void;
}) {
  useEnginePreload();

  const { run, reset, status, message, pythonVersion, pyodideVersion } = usePyodide();
  const [code, setCode] = useState(experiment.starterCode);
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState<OutputTab>("console");
  const [edited, setEdited] = useState(false);
  const [fileMode, setFileMode] = useState<FileMode>("starter");
  const [splitPct, setSplitPct] = useState(45);

  const paneRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    try {
      await reset();
      const next = await run(code);
      setResult(next);
      setTab(next.plots.length > 0 && !next.error && next.blocked.length === 0 ? "plots" : "console");
    } catch (cause) {
      setResult({
        stdout: "",
        stderr: "",
        plots: [],
        blocked: [],
        durationMs: 0,
        error: cause instanceof Error ? cause.message : String(cause),
      });
      setTab("console");
    } finally {
      setIsRunning(false);
    }
  }, [code, run, reset]);

  const load = (mode: FileMode) => {
    setCode(mode === "starter" ? experiment.starterCode : experiment.solutionCode);
    setFileMode(mode);
    setEdited(false);
  };

  const startDrag = (event: React.MouseEvent) => {
    event.preventDefault();
    dragging.current = true;

    const onMove = (moveEvent: MouseEvent) => {
      if (!dragging.current || !paneRef.current) return;
      const rect = paneRef.current.getBoundingClientRect();
      const pct = ((moveEvent.clientY - rect.top) / rect.height) * 100;
      setSplitPct(Math.min(MAX_SPLIT, Math.max(MIN_SPLIT, pct)));
    };
    const onUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const booting = isRunning && status !== "ready";
  const plotCount = result?.plots.length ?? 0;
  const hasConsoleContent =
    result && (result.stdout || result.stderr || result.error || result.blocked.length > 0);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lift dark:border-editor-border dark:bg-editor-bg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-editor-border dark:bg-editor-panel">
        <div className="flex items-center gap-1.5">
          {onExit && (
            <>
              <button
                onClick={onExit}
                title="Exit simulation and return to experiment overview"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:bg-slate-50 hover:text-brand-600 dark:border-editor-border dark:bg-editor-bg dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
              <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-editor-border" />
            </>
          )}
          <ToolbarButton onClick={handleRun} disabled={isRunning} primary title="Execute the code (the engine loads on first use)">
            {isRunning ? (
              <>
                <span className="spinner h-3 w-3" />
                Running
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Run
              </>
            )}
          </ToolbarButton>
          <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-editor-border" />
          <ToolbarButton onClick={() => load("starter")} title="Reload the scaffold with TODOs">
            Starter
          </ToolbarButton>
          <ToolbarButton onClick={() => load("solution")} title="Load the complete worked solution">
            Solution
          </ToolbarButton>
          <ToolbarButton onClick={() => setResult(null)} title="Clear the output panel">
            Clear
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-3">
          {result && !isRunning && (
            <span className="font-mono text-[11px] text-slate-500">
              {(result.durationMs / 1000).toFixed(2)}s
            </span>
          )}
          {edited && <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">edited</span>}
          <EngineBadge />
        </div>
      </div>

      {/* File tab, VS Code style. */}
      <div className="flex items-center border-b border-slate-200 bg-white dark:border-editor-border dark:bg-editor-bg">
        <div className="flex items-center gap-2 border-r border-slate-200 bg-slate-50 px-3.5 py-2 dark:border-editor-border dark:bg-editor-panel">
          <svg className="h-3.5 w-3.5 flex-shrink-0 text-sky-500 dark:text-sky-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.5 2c-1.9 0-3.1.7-3.1 2.3v2h6.2v.8H4.6C2.9 7.1 2 8.6 2 10.9c0 2.3.9 3.7 2.6 3.7h1.5v-2.1c0-2 1.7-3.7 3.7-3.7h4.9c1.6 0 2.9-1.3 2.9-2.9V4.3C17.6 2.7 15.3 2 12.9 2H9.5zM8 3.9c.6 0 1 .5 1 1s-.4 1-1 1-1-.5-1-1 .4-1 1-1z" />
            <path d="M14.5 22c1.9 0 3.1-.7 3.1-2.3v-2h-6.2v-.8h7.9c1.7 0 2.6-1.5 2.6-3.8 0-2.3-.9-3.7-2.6-3.7h-1.5v2.1c0 2-1.7 3.7-3.7 3.7H9.2c-1.6 0-2.9 1.3-2.9 2.9v3.6c0 1.6 2.3 2.3 4.7 2.3h3.5zM16 20.1c-.6 0-1-.5-1-1s.4-1 1-1 1 .5 1 1-.4 1-1 1z" />
          </svg>
          <span className="font-mono text-[12px] text-ink dark:text-slate-200">
            {experiment.id}.{fileMode === "starter" ? "starter" : "solution"}.py
          </span>
          {edited && <span className="h-1.5 w-1.5 rounded-full bg-slate-900/60 dark:bg-white/70" />}
        </div>
      </div>

      <div ref={paneRef} className="flex min-h-0 flex-1 flex-col">
        <div className="relative min-h-0" style={{ height: `${splitPct}%` }}>
          <CodeEditor
            value={code}
            onChange={(next) => {
              setCode(next);
              setEdited(true);
            }}
          />
        </div>

        {/* Drag handle between editor and output, VS Code panel-resize style. */}
        <div
          onMouseDown={startDrag}
          className="group relative h-1.5 flex-shrink-0 cursor-row-resize bg-slate-200 dark:bg-editor-border"
        >
          <div className="absolute inset-x-0 -top-1 -bottom-1 group-hover:bg-brand-500/40" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col" style={{ height: `${100 - splitPct}%` }}>
          <div className="flex items-center border-b border-slate-200 bg-slate-50 dark:border-editor-border dark:bg-editor-panel">
            {(["console", "plots"] as const).map((name) => (
              <button
                key={name}
                onClick={() => setTab(name)}
                className={`border-b-2 px-4 py-2 text-[12px] font-medium capitalize transition-colors ${
                  tab === name
                    ? "border-brand-500 text-ink dark:text-white"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"
                }`}
              >
                {name}
                {name === "plots" && plotCount > 0 ? ` (${plotCount})` : ""}
              </button>
            ))}
          </div>

          <div className="dark-scroll min-h-0 flex-1 overflow-auto bg-white p-4 dark:bg-editor-bg">
            {booting ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <span className="spinner h-7 w-7 border-slate-200 border-t-brand-500 dark:border-white/20 dark:border-t-brand-400" />
                <p className="text-[13px] text-slate-500 dark:text-slate-400">{message || "Starting…"}</p>
                <p className="max-w-xs text-[11px] leading-relaxed text-slate-500 dark:text-slate-600">
                  The first run downloads Python {pythonVersion} and the scientific stack.
                  Everything after that is instant, and nothing leaves your browser.
                </p>
              </div>
            ) : tab === "console" ? (
              <>
                {!hasConsoleContent && (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                    <svg className="h-9 w-9 text-slate-300 dark:text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 6h12a2.25 2.25 0 002.25-2.25v-8.25A2.25 2.25 0 0019.5 5.25H4.5A2.25 2.25 0 002.25 7.5v8.25A2.25 2.25 0 004.5 18z" />
                    </svg>
                    <p className="text-[13px] text-slate-500">
                      Press <span className="font-semibold text-emerald-600 dark:text-emerald-400">Run</span> to execute
                    </p>
                  </div>
                )}

                {result && result.blocked.length > 0 && <BlockedPackages blocked={result.blocked} />}

                {result?.error && (
                  <pre className="mb-3 whitespace-pre-wrap border-l-2 border-red-500 pl-3 font-mono text-[12px] leading-relaxed text-red-600 dark:text-red-400">
                    {result.error}
                  </pre>
                )}
                {result?.stderr && (
                  <pre className="mb-3 whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-amber-600 dark:text-amber-400">
                    {result.stderr}
                  </pre>
                )}
                {result?.stdout && (
                  <pre className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-ink dark:text-slate-100">
                    {result.stdout}
                  </pre>
                )}
              </>
            ) : (
              <div className="space-y-4">
                {plotCount === 0 && (
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                    <svg className="h-9 w-9 text-slate-300 dark:text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l4.5-4.5 3 3 6-6m0 0H13m3.5 0V9" />
                    </svg>
                    <p className="text-[13px] text-slate-500">
                      matplotlib figures appear here, with or without{" "}
                      <code className="text-brand-600 dark:text-brand-400">plt.show()</code>
                    </p>
                  </div>
                )}
                {result?.plots.map((plot, index) => (
                  <figure key={index} className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-editor-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={plot} alt={`Figure ${index + 1}`} className="mx-auto h-auto max-w-full" />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar, VS Code blue bar. */}
      <div className="flex flex-shrink-0 items-center justify-between border-t border-slate-200 bg-brand-700 px-3 py-1 dark:border-editor-border">
        <div className="flex items-center gap-3 text-[11px] font-medium text-white/90">
          <span>Python {pythonVersion}</span>
          <span className="text-white/40">·</span>
          <span>Pyodide {pyodideVersion}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-medium text-white/90">
          <span>UTF-8</span>
          <span className="text-white/40">·</span>
          <span>{status === "ready" ? "Engine ready" : status === "loading" ? "Loading engine…" : status}</span>
        </div>
      </div>
    </div>
  );
}
