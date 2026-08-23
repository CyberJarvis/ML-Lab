import Link from "next/link";
import type { Metadata } from "next";
import { getExperimentByNumber } from "@/lib/experiments-data";
import { assessment, courseHeader, references, syllabus, textbooks } from "@/lib/syllabus";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Theory | ML Virtual Lab",
  description: "The full CSC701 Machine Learning syllabus — every module, topic, textbook and reference, mapped to the lab experiments that put it into practice.",
};

export default function TheoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHero
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "Theory" }]}
        eyebrow={`${courseHeader.code} · ${courseHeader.credit} Credits · ${courseHeader.totalHours} Hrs`}
        title={
          <>
            Theory — <span className="text-gradient">{courseHeader.title}</span>
          </>
        }
        description="The complete University of Mumbai syllabus, module by module, with the topics each covers and the lab experiments that put them into practice."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Prerequisites, objectives, outcomes */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Prerequisites
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
              {courseHeader.prerequisites.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Course objectives
            </h2>
            <ol className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
              {courseHeader.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Course outcomes
            </h2>
            <ol className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
              {courseHeader.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* Modules */}
        <section className="space-y-5">
          {syllabus.map((mod) => (
            <div key={mod.number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 font-mono text-sm font-bold text-white shadow-md">
                    {mod.number}
                  </span>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">{mod.title}</h2>
                </div>
                <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  {mod.hours} hrs
                </span>
              </div>

              <div className="mt-5 space-y-5">
                {mod.topics.map((topic) => (
                  <div key={topic.id} className="border-l-2 border-slate-200 pl-4 dark:border-slate-700">
                    <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                      <span className="font-mono text-slate-400 dark:text-slate-500">{topic.id}</span> {topic.title}
                    </p>
                    <ul className="mt-2 space-y-1 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                      {topic.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {topic.experiments && topic.experiments.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                          In the lab:
                        </span>
                        {topic.experiments.map((num) => {
                          const experiment = getExperimentByNumber(num);
                          if (!experiment) return null;
                          return (
                            <Link
                              key={num}
                              href={`/experiments/${experiment.id}`}
                              className="rounded-md border border-brand-200 bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 transition-colors hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20"
                            >
                              Exp {num} · {experiment.shortTitle}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Textbooks & references */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Textbooks</h2>
            <ol className="mt-4 space-y-3">
              {textbooks.map((b, i) => (
                <li key={b.title} className="flex gap-3 text-sm">
                  <span className="font-mono text-slate-400 dark:text-slate-500">{i + 1}.</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {b.author}, <span className="italic">&ldquo;{b.title}&rdquo;</span>
                    {b.publisher ? `, ${b.publisher}` : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">References</h2>
            <ol className="mt-4 space-y-3">
              {references.map((r, i) => (
                <li key={r.title} className="flex gap-3 text-sm">
                  <span className="font-mono text-slate-400 dark:text-slate-500">{i + 1}.</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {r.author}, <span className="italic">&ldquo;{r.title}&rdquo;</span>
                    {r.publisher ? `, ${r.publisher}` : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Assessment */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Assessment</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">Internal assessment.</span> {assessment.internal}</p>
            <p><span className="font-semibold text-slate-900 dark:text-slate-100">End semester.</span> {assessment.endSemester}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
