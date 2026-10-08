"use client";

import { useState } from "react";
import Link from "next/link";
import { experiments, labOutcomes } from "@/lib/experiments-data";
import Reveal from "@/components/Reveal";

export default function OfficialLabWorkbench() {
  const [selectedLO, setSelectedLO] = useState<"ALL" | "LO1" | "LO2" | "LO3">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExperiments = experiments.filter((exp) => {
    const matchesLO = selectedLO === "ALL" || exp.lo === selectedLO;
    const matchesSearch =
      searchQuery === "" ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.aim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLO && matchesSearch;
  });

  return (
    <section id="experiments" className="relative border-b border-slate-200 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                Virtual Computing Laboratory (CEL701 / CSL7001)
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-slate-100">
                The 10 Official <span className="text-gradient">Laboratory Experiments</span>
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                Interactive browser-executed Python environments with from-scratch algorithm implementations, auto-graded quizzes, and live matplotlib visualization.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/experiments"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
              >
                <span>View Full Lab Manual Grid</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Filter Toolbar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* LO Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedLO("ALL")}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                selectedLO === "ALL"
                  ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              All Practicals (10)
            </button>
            <button
              onClick={() => setSelectedLO("LO1")}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                selectedLO === "LO1"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              LO1: Regression (4)
            </button>
            <button
              onClick={() => setSelectedLO("LO2")}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                selectedLO === "LO2"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-rose-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              LO2: Ensembles & SVM (4)
            </button>
            <button
              onClick={() => setSelectedLO("LO3")}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                selectedLO === "LO3"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              LO3: Clustering & PCA (2)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search experiments or algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 pl-9 text-xs text-ink placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Experiment Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredExperiments.map((exp, idx) => {
            const loInfo = labOutcomes[exp.lo];
            return (
              <Reveal key={exp.id} delay={idx * 50}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/60">
                  <div>
                    {/* Top Row: Expt No. and LO Badge */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold tracking-wider text-brand-600 dark:text-brand-400">
                        EXPT {String(exp.number).padStart(2, "0")}
                      </span>
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ring-1 ${loInfo.className}`}>
                        {exp.lo}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 font-display text-base font-bold text-ink transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                      {exp.title}
                    </h3>

                    {/* Aim */}
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2 dark:text-slate-400">
                      {exp.aim}
                    </p>

                    {/* Algorithm & Stack Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {exp.category}
                      </span>
                      {exp.packages.slice(0, 2).map((pkg) => (
                        <span
                          key={pkg}
                          className="rounded bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                        >
                          {pkg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-3.5 dark:border-slate-800">
                    <Link
                      href={`/experiments/${exp.id}?tab=simulation`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-brand-700 active:scale-[0.98]"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Simulation IDE</span>
                    </Link>
                    <Link
                      href={`/experiments/${exp.id}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-white hover:text-ink dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Theory & Quiz
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 p-8 text-white shadow-glow sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                Client-Side Pyodide WebAssembly
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to execute code without installing Python?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-100">
                Every experiment runs locally inside your browser sandbox via WebAssembly. Write genuine scikit-learn models, tune hyperparameters, render matplotlib figures, and submit continuous assessment lab records.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/experiments/simple-linear-regression"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-900 shadow-md transition-transform hover:scale-105"
              >
                <span>Start Experiment 01 Now</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="/documents/SIES_GST_ML_Lab_Manual.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Lab Manual</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
