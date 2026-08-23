"use client";

import { useState } from "react";
import IdeWorkspace from "./IdeWorkspace";
import Quiz from "./Quiz";
import FeedbackForm from "./FeedbackForm";
import { usePyodide } from "./PyodideProvider";
import type { Experiment } from "@/lib/experiments";

type SectionId =
  | "aim"
  | "theory"
  | "pretest"
  | "procedure"
  | "simulation"
  | "posttest"
  | "references"
  | "feedback";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "aim", label: "Aim" },
  { id: "theory", label: "Theory" },
  { id: "pretest", label: "Pretest" },
  { id: "procedure", label: "Procedure" },
  { id: "simulation", label: "Simulation" },
  { id: "posttest", label: "Posttest" },
  { id: "references", label: "Further Readings" },
  { id: "feedback", label: "Feedback" },
];

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6 border-b border-slate-200 pb-4 dark:border-slate-800">
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink dark:text-slate-100">
        <span className="mr-2.5 inline-block h-4 w-1 rounded-full bg-gradient-to-b from-brand-500 to-accent-500 align-[-2px]" />
        {title}
      </h2>
      {subtitle && <p className="mt-1.5 text-[13.5px] text-slate-500 dark:text-slate-400">{subtitle}</p>}
    </header>
  );
}

export default function ExperimentWorkspace({ experiment }: { experiment: Experiment }) {
  const [active, setActive] = useState<SectionId>("aim");
  const { pythonVersion, pyodideVersion } = usePyodide();

  if (active === "simulation") {
    return <IdeWorkspace experiment={experiment} onExit={() => setActive("procedure")} />;
  }

  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
      {/* Section navigation — the fixed spine of every Virtual Labs experiment. */}
      <nav aria-label="Experiment sections" className="lg:sticky lg:top-20 lg:self-start">
        <ol className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-card lg:flex-col lg:overflow-visible dark:border-slate-800 dark:bg-slate-900">
          {SECTIONS.map((section, index) => {
            const isActive = active === section.id;
            return (
              <li key={section.id} className="flex-shrink-0 lg:flex-shrink">
                <button
                  onClick={() => setActive(section.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-glow"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded font-mono text-[10px] font-semibold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {section.label}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card lg:block dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
              Environment
            </p>
          </div>
          <div className="p-4 pt-3">
          <dl className="mt-2.5 space-y-1.5 text-[12px]">
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500 dark:text-slate-400">Python</dt>
              <dd className="font-mono text-slate-700 dark:text-slate-300">{pythonVersion}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500 dark:text-slate-400">Pyodide</dt>
              <dd className="font-mono text-slate-700 dark:text-slate-300">{pyodideVersion}</dd>
            </div>
          </dl>
          <div className="mt-3 flex flex-wrap gap-1">
            {experiment.packages.map((name) => (
              <span
                key={name}
                className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {name}
              </span>
            ))}
          </div>
          </div>
        </div>
      </nav>

      <div className="min-w-0">
        {active === "aim" && (
          <section className="rise rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeading title="Aim" subtitle={`Experiment ${experiment.number} · ${experiment.category}`} />
            <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{experiment.aim}</p>

            <h3 className="mt-8 font-display text-[15px] font-semibold text-ink dark:text-slate-100">Key concepts</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {experiment.keyConcepts.map((concept) => (
                <span
                  key={concept}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[12.5px] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {concept}
                </span>
              ))}
            </div>

            <h3 className="mt-8 font-display text-[15px] font-semibold text-ink dark:text-slate-100">Algorithm</h3>
            <ol className="mt-3 space-y-3 list-none">
              {experiment.algorithm.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-brand-50 font-mono text-[11px] font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                    {index + 1}
                  </span>
                  <span className="flex-1 min-w-0 pt-0.5 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {active === "theory" && (
          <section className="rise rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeading title="Theory" subtitle="The background you need before writing any code." />
            <div
              className="prose-lab max-w-none"
              dangerouslySetInnerHTML={{ __html: experiment.theory }}
            />
          </section>
        )}

        {active === "pretest" && (
          <section className="rise">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <SectionHeading title="Pretest" subtitle="Five questions on the prerequisites for this experiment." />
              <Quiz
                questions={experiment.pretest}
                storageKey={`${experiment.id}-pre`}
                intro="Answer these before you begin. They check the background the experiment assumes — if several go wrong, read the Theory section first."
              />
            </div>
          </section>
        )}

        {active === "procedure" && (
          <section className="rise rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeading title="Procedure" subtitle="What to do, step by step, in the Simulation section." />
            <ol className="space-y-3 list-none">
              {experiment.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 font-mono text-[11px] font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {index + 1}
                  </span>
                  <span className="flex-1 min-w-0 pt-0.5 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">Before your first run</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                Python runs inside your browser, so the first Run downloads the interpreter and
                the scientific stack (roughly 25 MB). It is cached afterwards. No account, no
                installation, and no code ever leaves your machine.
              </p>
            </div>
          </section>
        )}

        {active === "posttest" && (
          <section className="rise">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <SectionHeading title="Posttest" subtitle="Five questions on what this experiment demonstrated." />
              <Quiz
                questions={experiment.posttest}
                storageKey={`${experiment.id}-post`}
                intro="Take this after running the simulation. Several questions refer to output and plots you will only have seen by executing the code yourself."
              />
            </div>
          </section>
        )}

        {active === "references" && (
          <section className="rise rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeading title="Further Readings" subtitle="Where to go deeper on this topic." />
            <ul className="space-y-4">
              {experiment.references.map((reference) => (
                <li key={reference.title} className="border-l-2 border-slate-200 pl-4 dark:border-slate-700">
                  {reference.url ? (
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700 hover:text-brand-800 hover:underline dark:text-brand-400 dark:hover:text-brand-300"
                    >
                      {reference.title}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  ) : (
                    <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{reference.title}</p>
                  )}
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">{reference.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {active === "feedback" && (
          <section className="rise rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeading title="Feedback" subtitle="Help improve this experiment." />
            <FeedbackForm experimentId={experiment.id} />
          </section>
        )}
      </div>
    </div>
  );
}
