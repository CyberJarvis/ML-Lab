"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  level3: string;
  level2: string;
  level1: string;
  weight: string;
}

const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: "prep",
    name: "1. Preparedness & Knowledge",
    description: "Pre-lab study of mathematical formulation, algorithm steps, and dataset comprehension.",
    level3: "Thoroughly prepared with mathematical derivations; understands algorithmic parameters and hyperparameter roles.",
    level2: "Partially prepared; understands core concept but requires assistance explaining mathematical rationale.",
    level1: "Unprepared; unable to explain the aim, mathematical equation, or algorithm steps.",
    weight: "20%",
  },
  {
    id: "presentation",
    name: "2. Presentation & Documentation",
    description: "Accuracy of console prints, labeled matplotlib graphs, and structured journal documentation.",
    level3: "Flawless output presentation; all plots labeled with axis/titles/legends; concise analysis of metrics.",
    level2: "Satisfactory presentation; minor omissions in graphical labels or formatting.",
    level1: "Poor presentation; unformatted output, absent plots, or incomplete lab documentation.",
    weight: "20%",
  },
  {
    id: "debugging",
    name: "3. Practical Performance & Debugging",
    description: "Hands-on implementation, debugging runtime errors, and comparison of from-scratch vs library models.",
    level3: "Executes independently; diagnoses and corrects exceptions, tensor shapes, and convergence issues.",
    level2: "Executes with occasional faculty/TA hints; resolves common syntax and import errors.",
    level1: "Unable to run or debug code without complete assistance; fails to achieve convergence.",
    weight: "20%",
  },
  {
    id: "punctuality",
    name: "4. Punctuality & Timely Submission",
    description: "Adherence to lab schedule, on-time check-in, and timely submission of experiment assignments.",
    level3: "Always on time for practical sessions; completes and verifies experiments within designated slot.",
    level2: "Minor delays in check-in or submission within the grace window.",
    level1: "Consistent delays, chronic late submissions, or unexcused absenteeism.",
    weight: "20%",
  },
  {
    id: "ethics",
    name: "5. Lab Ethics & Professional Conduct",
    description: "Adherence to institutional laboratory conduct, original code development, and workstation etiquette.",
    level3: "Strict adherence to academic honesty; original code synthesis; maintains workstation cleanliness.",
    level2: "Minor lapses in workstation discipline; responds immediately to faculty instructions.",
    level1: "Plagiarism, unauthorized software usage, or disregard for lab decorum.",
    weight: "20%",
  },
];

const EXAM_SCHEME = [
  {
    component: "End Semester Examination (Theory)",
    marks: "80 Marks",
    duration: "3 Hours",
    desc: "Comprehensive Mumbai University theory paper covering Modules 1 to 6 with analytical and derivation questions.",
    badge: "Theory",
    color: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300",
  },
  {
    component: "Internal Assessment (IA)",
    marks: "20 Marks",
    duration: "2 Tests (1 Hr each)",
    desc: "Average of two class tests: Test 1 (approx 40% syllabus) and Test 2 (remaining 40% syllabus).",
    badge: "Continuous",
    color: "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300",
  },
  {
    component: "Term Work (TW)",
    marks: "25 Marks",
    duration: "Full Semester",
    desc: "Continuous evaluation across 10 lab practicals (15M), mini-project/assignments (5M), and attendance/ethics (5M).",
    badge: "Laboratory",
    color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  },
  {
    component: "Practical & Oral Examination",
    marks: "25 Marks",
    duration: "Joint Evaluation",
    desc: "Conducted jointly by internal and external examiners; includes on-the-spot programming, model evaluation and viva voce.",
    badge: "Viva & Coding",
    color: "border-purple-500/30 bg-purple-500/5 text-purple-700 dark:text-purple-300",
  },
];

const LAB_GUIDELINES = [
  {
    type: "dos",
    title: "Laboratory Best Practices (Do's)",
    items: [
      "Wearing college ID-Card is strictly compulsory before entering Lab 06.",
      "Read the experiment Aim, Theory, and Algorithm beforehand to ensure maximum session productivity.",
      "Shut down your workstation properly and arrange lab chairs before vacating the laboratory.",
      "Verify code convergence and check evaluation metrics (R², MSE, Accuracy, Confusion Matrix) with faculty.",
      "Report any workstation hardware or network anomalies to the technical staff immediately.",
    ],
  },
  {
    type: "donts",
    title: "Laboratory Code of Conduct (Don'ts)",
    items: [
      "Do not bring eatables, beverages, or unnecessary personal baggage to the computer workbench.",
      "Do not plagiarize or blindly copy-paste solutions without conceptual comprehension.",
      "Do not step on electrical trunking, peripheral cabling, or disconnect network interfaces.",
      "Do not alter system configurations, browser settings, or install unauthorized software.",
      "Do not leave the laboratory session without submitting the continuous assessment sign-off.",
    ],
  },
];

export default function AssessmentRubricSection() {
  const [activeTab, setActiveTab] = useState<"rubrics" | "scheme" | "ethics">("rubrics");

  return (
    <section id="rubrics" className="relative border-b border-slate-200 bg-slate-50/70 py-16 dark:border-slate-800 dark:bg-slate-900/30 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
              Academic Standards & Evaluation
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-slate-100">
              Official Assessment Scheme & <span className="text-gradient">Continuous Rubrics</span>
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              Structured according to the SIES GST Department of Computer Engineering Machine Learning Lab Manual (SH-2024 / FH-2026) and Mumbai University CBCGS guidelines.
            </p>
          </div>
        </Reveal>

        {/* Tab Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setActiveTab("rubrics")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "rubrics"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              5-Point Assessment Rubric
            </button>
            <button
              onClick={() => setActiveTab("scheme")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "scheme"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Examination Scheme (150 Marks)
            </button>
            <button
              onClick={() => setActiveTab("ethics")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "ethics"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              Lab Guidelines & Ethics
            </button>
          </div>
        </div>

        {/* Tab 1: Rubrics Table */}
        {activeTab === "rubrics" && (
          <div className="mt-8 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink dark:text-slate-100">
                      Performance Indicators & Grading Rubric
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Evaluated for each of the 10 experiments out of 15 Marks (Scale 1 to 3 per indicator).
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Level 3: Exceeds Expectations
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> Level 2: Meets Expectations
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                      <span className="h-2 w-2 rounded-full bg-rose-500" /> Level 1: Below Expectations
                    </span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {RUBRIC_CRITERIA.map((criterion) => (
                  <div key={criterion.id} className="p-6 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-ink dark:text-slate-100">
                        {criterion.name}
                      </h4>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        Weight: {criterion.weight}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {criterion.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/50 p-3 text-xs dark:border-emerald-500/20 dark:bg-emerald-500/5">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">Score 3 (Exceeds):</span>
                        <p className="mt-1 text-slate-700 dark:text-slate-300">{criterion.level3}</p>
                      </div>
                      <div className="rounded-xl border border-amber-200/70 bg-amber-50/50 p-3 text-xs dark:border-amber-500/20 dark:bg-amber-500/5">
                        <span className="font-bold text-amber-700 dark:text-amber-300">Score 2 (Meets):</span>
                        <p className="mt-1 text-slate-700 dark:text-slate-300">{criterion.level2}</p>
                      </div>
                      <div className="rounded-xl border border-rose-200/70 bg-rose-50/50 p-3 text-xs dark:border-rose-500/20 dark:bg-rose-500/5">
                        <span className="font-bold text-rose-700 dark:text-rose-300">Score 1 (Needs Improvement):</span>
                        <p className="mt-1 text-slate-700 dark:text-slate-300">{criterion.level1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Examination Scheme */}
        {activeTab === "scheme" && (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {EXAM_SCHEME.map((item) => (
              <div
                key={item.component}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:shadow-lift dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${item.color}`}>
                    {item.badge}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {item.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink dark:text-slate-100">
                  {item.component}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-extrabold text-brand-600 dark:text-brand-400">
                    {item.marks}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">Evaluation Component</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.desc}
                </p>
              </div>
            ))}

            <div className="md:col-span-2 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 text-center dark:border-brand-500/30 dark:bg-brand-500/10">
              <span className="font-display text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Total Course Assessment Weightage
              </span>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-ink dark:text-slate-100">
                <span>Theory: 80 Marks</span>
                <span>•</span>
                <span>Internal Assessment: 20 Marks</span>
                <span>•</span>
                <span>Term Work: 25 Marks</span>
                <span>•</span>
                <span>Practical & Oral: 25 Marks</span>
              </div>
              <p className="mt-2 text-xs font-medium text-brand-800 dark:text-brand-300">
                Total: 150 Marks · 4 Credits (CSC701 + CEL701 / CSL7001)
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Laboratory Ethics & Guidelines */}
        {activeTab === "ethics" && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {LAB_GUIDELINES.map((guide) => (
              <div
                key={guide.type}
                className={`rounded-2xl border p-6 shadow-card ${
                  guide.type === "dos"
                    ? "border-emerald-200 bg-emerald-50/30 dark:border-emerald-500/20 dark:bg-emerald-950/10"
                    : "border-rose-200 bg-rose-50/30 dark:border-rose-500/20 dark:bg-rose-950/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold ${
                      guide.type === "dos"
                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                    }`}
                  >
                    {guide.type === "dos" ? "✓" : "✕"}
                  </span>
                  <h3 className="font-display text-base font-bold text-ink dark:text-slate-100">
                    {guide.title}
                  </h3>
                </div>

                <ul className="mt-5 space-y-3">
                  {guide.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      <span
                        className={`mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                          guide.type === "dos" ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
