import Link from "next/link";
import type { Experiment } from "@/lib/experiments";

const ACCENT: Record<
  string,
  { bar: string; chip: string; text: string; glow: string }
> = {
  Regression: {
    bar: "from-brand-500 to-brand-700",
    chip: "bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/10 dark:text-brand-300 dark:border-brand-500/30",
    text: "text-brand-600 dark:text-brand-400",
    glow: "bg-brand-500/10",
  },
  Classification: {
    bar: "from-emerald-500 to-emerald-700",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "bg-emerald-500/10",
  },
  "Ensemble Learning": {
    bar: "from-rose-500 to-rose-700",
    chip: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30",
    text: "text-rose-600 dark:text-rose-400",
    glow: "bg-rose-500/10",
  },
  Clustering: {
    bar: "from-amber-500 to-amber-600",
    chip: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    glow: "bg-amber-500/10",
  },
  "Dimensionality Reduction": {
    bar: "from-teal-500 to-teal-700",
    chip: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30",
    text: "text-teal-600 dark:text-teal-400",
    glow: "bg-teal-500/10",
  },
};

export default function ExperimentCard({
  experiment,
}: {
  experiment: Experiment;
}) {
  const accent = ACCENT[experiment.category] || {
    bar: "from-slate-500 to-slate-700",
    chip: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    text: "text-slate-600 dark:text-slate-400",
    glow: "bg-slate-500/10",
  };
  const num = String(experiment.number).padStart(2, "0");

  return (
    <Link
      href={`/experiments/${experiment.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />

      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[88px] font-bold leading-none text-slate-900/[0.045] transition-colors duration-300 group-hover:text-slate-900/[0.08] dark:text-white/[0.05] dark:group-hover:text-white/[0.09]"
      >
        {num}
      </span>

      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            EXP {num}
          </span>
          <span
            className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${accent.chip}`}
          >
            {experiment.lo}
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-400">
          {experiment.title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
          {experiment.aim}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className={`text-[11px] font-semibold uppercase tracking-wide ${accent.text}`}>
            {experiment.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-400 transition-colors group-hover:text-brand-600 dark:text-slate-500 dark:group-hover:text-brand-400">
            Open
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
