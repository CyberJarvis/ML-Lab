import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { experiments, getExperiment, labOutcomes } from "@/lib/experiments-data";
import ExperimentWorkspace from "@/components/ExperimentWorkspace";

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
  if (!experiment) return { title: "Experiment Not Found | CSC701 Machine Learning" };
  return {
    title: `Exp ${experiment.number}: ${experiment.title} | CSC701 Machine Learning`,
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
    <div>
      <div className="jd-prose">
        <div id="toptitle">
          <h1>
            Experiment {experiment.number} &ndash; {experiment.title}
          </h1>
          <div id="subtitle">
            {experiment.category} · <span title={labOutcomes[experiment.lo].description}>{experiment.lo}</span> ·{" "}
            <Link href="/experiments">All experiments</Link>
            {prevExp && (
              <>
                {" · "}
                <Link href={`/experiments/${prevExp.id}`}>&laquo; Prev: {prevExp.shortTitle}</Link>
              </>
            )}
            {nextExp && (
              <>
                {" · "}
                <Link href={`/experiments/${nextExp.id}`}>Next: {nextExp.shortTitle} &raquo;</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section navigation and content */}
      <ExperimentWorkspace experiment={experiment} />
    </div>
  );
}
