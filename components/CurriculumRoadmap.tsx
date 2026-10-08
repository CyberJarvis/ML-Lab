"use client";

import { useState } from "react";
import Link from "next/link";
import { syllabus, courseHeader } from "@/lib/syllabus";
import { experiments } from "@/lib/experiments-data";
import Reveal from "@/components/Reveal";

export default function CurriculumRoadmap() {
  const [selectedModule, setSelectedModule] = useState(syllabus[1].number); // Default to Module 2 (core regression/trees)

  const activeMod = syllabus.find((m) => m.number === selectedModule) || syllabus[0];

  // Find all experiments linked to this module
  const linkedExperiments = experiments.filter((e) => {
    return activeMod.topics.some((t) => t.experiments?.includes(e.number));
  });

  return (
    <section id="curriculum" className="relative border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                Lecture Series & Practical Alignment
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-slate-100">
                {courseHeader.code}: <span className="text-gradient">Lecture & Lab Curriculum</span>
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                Comprehensive 39-hour Mumbai University syllabus distributed across 6 theory modules, with direct dual-mapping to laboratory simulations.
              </p>
            </div>

            <Link
              href="/theory"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
            >
              <span>Explore Detailed Syllabus & Textbooks</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>

        {/* 6 Module Selector Pills */}
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {syllabus.map((m) => {
            const isSelected = m.number === selectedModule;
            const exCount = m.topics.reduce((acc, t) => acc + (t.experiments?.length || 0), 0);

            return (
              <button
                key={m.number}
                onClick={() => setSelectedModule(m.number)}
                className={`group relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-brand-500 bg-brand-50/50 shadow-md ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/20"
                    : "border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500"
                    }`}
                  >
                    MODULE 0{m.number}
                  </span>
                  <span className="rounded bg-slate-200/70 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {m.hours}h
                  </span>
                </div>
                <h3
                  className={`mt-2 line-clamp-2 font-display text-xs font-bold leading-snug ${
                    isSelected
                      ? "text-brand-900 dark:text-white"
                      : "text-slate-800 group-hover:text-ink dark:text-slate-200"
                  }`}
                >
                  {m.title}
                </h3>
                <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                  {exCount > 0 ? `${exCount} Practicals` : "Foundations"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail Panel */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Col: Module Syllabus Breakdown */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/10 font-mono text-base font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                  0{activeMod.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink dark:text-slate-100">
                    {activeMod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Curriculum Weightage: {activeMod.hours} Lecture Hours · University Scheme CBCGS R-2019
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {activeMod.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                        Topic {topic.id}
                      </span>
                      <span className="font-display text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {topic.title}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {topic.points.map((pt, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Mapped Lab Practicals */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-sm font-bold text-ink dark:text-slate-100">
                    Mapped Laboratory Practicals
                  </h4>
                  <span className="rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-800 dark:bg-brand-900/50 dark:text-brand-300">
                    {linkedExperiments.length} Hands-on Labs
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Theory topics taught in Module 0{activeMod.number} are applied in the following virtual laboratory experiments:
                </p>

                {linkedExperiments.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {linkedExperiments.map((exp) => (
                      <div
                        key={exp.id}
                        className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-brand-400 hover:shadow dark:border-slate-700 dark:bg-slate-900"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                            Experiment {String(exp.number).padStart(2, "0")}
                          </span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {exp.lo}
                          </span>
                        </div>
                        <h5 className="mt-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                          {exp.title}
                        </h5>
                        <p className="mt-1 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                          {exp.aim}
                        </p>
                        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
                          <span className="text-[10px] font-medium text-slate-400">
                            {exp.category}
                          </span>
                          <Link
                            href={`/experiments/${exp.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 transition-colors group-hover:text-brand-700 dark:text-brand-400 dark:group-hover:text-brand-300"
                          >
                            <span>Launch Lab</span>
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Module 0{activeMod.number} establishes fundamental theoretical foundations (e.g. Underfitting/Overfitting, Bias-Variance tradeoff, Generalization error) tested across all subsequent practical simulations.
                    </p>
                    <Link
                      href="/experiments"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
                    >
                      View all 10 experiments →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
