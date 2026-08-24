import { experiments, labOutcomes } from "@/lib/experiments-data";
import ExperimentFilters from "@/components/ExperimentFilters";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments | ML Virtual Lab",
  description: "All 10 Machine Learning lab experiments with interactive Python code execution.",
};

const LO_LEGEND = [
  { code: "LO1" as const, title: "Machine Learning Models", tone: "bg-blue-500" },
  { code: "LO2" as const, title: "Ensembles & Classification", tone: "bg-rose-500" },
  { code: "LO3" as const, title: "Reduction & Clustering", tone: "bg-emerald-500" },
];

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Experiments" }]}
        eyebrow={`${experiments.length} experiments `}
        title={
          <>
            The experiment <span className="text-gradient">library</span>
          </>
        }
      >
        <div className="mt-7 flex flex-wrap gap-2.5">
          {LO_LEGEND.map((lo) => (
            <span
              key={lo.code}
              title={labOutcomes[lo.code].description}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-[12px] font-medium text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${lo.tone}`} />
              {lo.code} · {lo.title}
            </span>
          ))}
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ExperimentFilters experiments={experiments} />
      </div>
    </div>
  );
}
