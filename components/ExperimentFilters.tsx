"use client";

import { useMemo, useState } from "react";
import ExperimentCard from "./ExperimentCard";
import type { Experiment } from "@/lib/experiments";

const LO_FILTERS = [
  { id: "all", label: "All outcomes" },
  { id: "LO1", label: "LO1 · Models" },
  { id: "LO2", label: "LO2 · Ensembles" },
  { id: "LO3", label: "LO3 · Reduction" },
] as const;

export default function ExperimentFilters({
  experiments,
}: {
  experiments: Experiment[];
}) {
  const [query, setQuery] = useState("");
  const [lo, setLo] = useState<(typeof LO_FILTERS)[number]["id"]>("all");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(
    () => Array.from(new Set(experiments.map((e) => e.category))),
    [experiments]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return experiments.filter((exp) => {
      if (lo !== "all" && exp.lo !== lo) return false;
      if (category !== "all" && exp.category !== category) return false;
      if (!q) return true;
      return (
        exp.title.toLowerCase().includes(q) ||
        exp.aim.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q) ||
        exp.keyConcepts.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [experiments, query, lo, category]);

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
      active
        ? "border-brand-600 bg-brand-600 text-white shadow-sm dark:border-brand-500 dark:bg-brand-500"
        : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
    }`;

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-card backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search experiments, concepts…"
              aria-label="Search experiments"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-[13.5px] text-slate-700 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-brand-500"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {LO_FILTERS.map((f) => (
              <button key={f.id} onClick={() => setLo(f.id)} className={chip(lo === f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Topic
          </span>
          <button onClick={() => setCategory("all")} className={chip(category === "all")}>
            All
          </button>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={chip(category === c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[12.5px] font-medium text-slate-500 dark:text-slate-400" aria-live="polite">
        Showing{" "}
        <span className="font-semibold text-ink dark:text-slate-200">{filtered.length}</span>{" "}
        of {experiments.length} experiments
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
          <svg className="h-8 w-8 text-slate-300 dark:text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M20 20l-3.5-3.5M8.5 11h5" />
          </svg>
          <p className="text-[14px] font-medium text-slate-600 dark:text-slate-300">
            No experiments match &ldquo;{query}&rdquo;
          </p>
          <button
            onClick={() => {
              setQuery("");
              setLo("all");
              setCategory("all");
            }}
            className="text-[13px] font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
