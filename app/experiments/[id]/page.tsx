import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { experiments, getExperiment } from "@/lib/experiments-data";
import ExperimentWorkspace from "@/components/ExperimentWorkspace";
import LOBadge from "@/components/LOBadge";

// Pre-render all experiment pages at build time
export function generateStaticParams() {
  // Generate slug-based params
  const slugParams = experiments.map((e) => ({ id: e.id }));
  // Also generate number-based params (e.g., /experiments/1)
  const numParams = experiments.map((e) => ({ id: String(e.number) }));
  return [...slugParams, ...numParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const experiment = getExperiment(id) || getExperimentByNumberStr(id);
  if (!experiment) return { title: "Experiment Not Found | ML Virtual Lab" };
  return {
    title: `Exp ${experiment.number}: ${experiment.title} | ML Virtual Lab`,
    description: experiment.aim,
  };
}

function getExperimentByNumberStr(id: string) {
  const num = parseInt(id, 10);
  if (!isNaN(num)) {
    return experiments.find((e) => e.number === num);
  }
  return undefined;
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experiment =
    getExperiment(id) || getExperimentByNumberStr(id);

  if (!experiment) {
    notFound();
  }

  // Find prev/next experiments for navigation
  const idx = experiments.findIndex((e) => e.number === experiment.number);
  const prevExp = idx > 0 ? experiments[idx - 1] : null;
  const nextExp = idx < experiments.length - 1 ? experiments[idx + 1] : null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Experiment header bar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/experiments"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-500 transition-all hover:border-brand-300 hover:text-brand-600 flex-shrink-0 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500/50 dark:hover:text-brand-400"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                All experiments
              </Link>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-sm font-bold text-white shadow-md flex-shrink-0">
                {experiment.number}
              </span>
              <h1 className="font-display text-base sm:text-lg font-semibold tracking-tight text-slate-900 truncate dark:text-slate-100">
                {experiment.title}
              </h1>
              <LOBadge lo={experiment.lo} />
            </div>

            {/* Prev/Next navigation */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {prevExp ? (
                <Link
                  href={`/experiments/${prevExp.id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  <span className="hidden sm:inline">Prev: {prevExp.shortTitle}</span>
                  <span className="sm:hidden">Prev</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-300 dark:border-slate-800 dark:text-slate-600">
                  <span>First</span>
                </span>
              )}
              {nextExp ? (
                <Link
                  href={`/experiments/${nextExp.id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                >
                  <span className="hidden sm:inline">Next: {nextExp.shortTitle}</span>
                  <span className="sm:hidden">Next</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-lg border border-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-300 dark:border-slate-800 dark:text-slate-600">
                  <span>Last</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section navigation and content */}
      <ExperimentWorkspace experiment={experiment} />
    </div>
  );
}
