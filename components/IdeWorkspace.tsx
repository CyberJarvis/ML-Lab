"use client";

import { useState } from "react";
import Simulation from "./Simulation";
import type { Experiment } from "@/lib/experiments";

type DocPanel = "aim" | "theory" | "procedure" | "references" | null;

function ActivityIcon({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
        active
          ? "bg-slate-900/5 text-ink dark:bg-white/10 dark:text-white"
          : "text-slate-400 hover:bg-slate-900/5 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-300"
      }`}
    >
      {active && <span className="absolute left-0 h-5 w-0.5 rounded-full bg-brand-500" />}
      {children}
    </button>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 border-b border-slate-200 px-4 py-3 dark:border-editor-border">
        <p className="font-display text-[13px] font-semibold text-ink dark:text-slate-200">{title}</p>
      </div>
      <div className="dark-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4">{children}</div>
    </div>
  );
}

export default function IdeWorkspace({
  experiment,
  onExit,
}: {
  experiment: Experiment;
  onExit: () => void;
}) {
  const [panel, setPanel] = useState<DocPanel>("theory");

  const toggle = (next: DocPanel) => setPanel((current) => (current === next ? null : next));

  return (
    <div className="fixed inset-0 z-[60] flex bg-white dark:bg-editor-bg">
      {/* Activity bar — VS Code's left icon rail. */}
      <div className="flex w-14 flex-shrink-0 flex-col items-center gap-1 border-r border-slate-200 bg-slate-50 py-3 dark:border-editor-border dark:bg-editor-panel">
        <ActivityIcon label="Back to experiment overview" active={false} onClick={onExit}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </ActivityIcon>

        <div className="my-1.5 h-px w-8 bg-slate-200 dark:bg-editor-border" />

        <ActivityIcon label="Aim" active={panel === "aim"} onClick={() => toggle("aim")}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
        </ActivityIcon>
        <ActivityIcon label="Theory" active={panel === "theory"} onClick={() => toggle("theory")}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.2 8.3 4.5 6 4.5v13c2.3 0 4.5.7 6 2 1.5-1.3 3.7-2 6-2v-13c-2.3 0-4.5.7-6 2z" />
          </svg>
        </ActivityIcon>
        <ActivityIcon label="Procedure" active={panel === "procedure"} onClick={() => toggle("procedure")}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
          </svg>
        </ActivityIcon>
        <ActivityIcon label="Further Readings" active={panel === "references"} onClick={() => toggle("references")}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </ActivityIcon>

        <div className="flex-1" />
      </div>

      {/* Collapsible docs sidebar. */}
      {panel && (
        <div className="w-80 flex-shrink-0 border-r border-slate-200 bg-white dark:border-editor-border dark:bg-editor-panel">
          {panel === "aim" && (
            <DocSection title="Aim">
              <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{experiment.aim}</p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Key concepts
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {experiment.keyConcepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 dark:border-editor-border dark:bg-white/5 dark:text-slate-300"
                  >
                    {concept}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Algorithm
              </p>
              <ol className="mt-2 space-y-2.5 list-none">
                {experiment.algorithm.map((step, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-slate-100 font-mono text-[10px] font-medium text-slate-500 dark:bg-white/10 dark:text-slate-400">
                      {index + 1}
                    </span>
                    <span className="flex-1 min-w-0">{step}</span>
                  </li>
                ))}
              </ol>
            </DocSection>
          )}

          {panel === "theory" && (
            <DocSection title="Theory">
              <div
                className="prose-lab max-w-none text-[13px]"
                dangerouslySetInnerHTML={{ __html: experiment.theory }}
              />
            </DocSection>
          )}

          {panel === "procedure" && (
            <DocSection title="Procedure">
              <ol className="space-y-3 list-none">
                {experiment.instructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 font-mono text-[10px] font-medium text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                      {index + 1}
                    </span>
                    <span className="flex-1 min-w-0">{step}</span>
                  </li>
                ))}
              </ol>
            </DocSection>
          )}

          {panel === "references" && (
            <DocSection title="Further Readings">
              <ul className="space-y-4">
                {experiment.references.map((reference) => (
                  <li key={reference.title} className="border-l-2 border-slate-200 pl-3 dark:border-editor-border">
                    {reference.url ? (
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12.5px] font-semibold text-brand-600 hover:text-brand-700 hover:underline dark:text-brand-400 dark:hover:text-brand-300"
                      >
                        {reference.title}
                      </a>
                    ) : (
                      <p className="text-[12.5px] font-semibold text-ink dark:text-slate-200">{reference.title}</p>
                    )}
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">{reference.detail}</p>
                  </li>
                ))}
              </ul>
            </DocSection>
          )}
        </div>
      )}

      {/* Editor + console/plots, filling whatever room remains. */}
      <div className="min-w-0 flex-1 p-2">
        <Simulation experiment={experiment} onExit={onExit} />
      </div>
    </div>
  );
}
