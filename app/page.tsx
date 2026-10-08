import Link from "next/link";
import CurriculumRoadmap from "@/components/CurriculumRoadmap";
import OfficialLabWorkbench from "@/components/OfficialLabWorkbench";
import AssessmentRubricSection from "@/components/AssessmentRubricSection";
import InstructorSection from "@/components/InstructorSection";
import Reveal from "@/components/Reveal";
import { courseHeader, textbooks, references } from "@/lib/syllabus";
import { courseInfo, experiments, labOutcomes } from "@/lib/experiments-data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink dark:bg-slate-950 dark:text-slate-100">
      {/* 1. Academic Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950">
        {/* Ambient Subtle Gradients */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/15" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/15" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 dark:opacity-10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              {/* Official Accreditation & Course Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-800 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                  SIES GST · Dept. of Computer Engineering
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  University of Mumbai · CBCGS R-2019 · Sem VII
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-brand-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-brand-400">
                  Course: CSC701 / CEL701 / CSL7001
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl dark:text-white">
                Machine Learning
                <span className="text-gradient block pb-1">
                  Theory Curriculum & Virtual Laboratory
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                The official educational portal for B.E. Computer Engineering at SIES Graduate School of Technology. Integrating 39 hours of rigorous syllabus lectures across 6 modules with 10 zero-installation browser-based Python lab simulations.
              </p>

              {/* Action CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#experiments"
                  className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-3.5 text-xs font-bold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Launch 10 Virtual Labs</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link
                  href="#curriculum"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
                >
                  <span>Curriculum (39h)</span>
                </Link>

                <a
                  href="/documents/SIES_GST_ML_Lab_Manual.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-5 py-3.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <svg className="h-4 w-4 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h3V13h-3v2.5H8V9h3.5v2.5H9.5zM16 15h-1.5v-6H16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2z" />
                  </svg>
                  <span>Lab Manual (PDF)</span>
                </a>

                <Link
                  href="#rubrics"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-transparent px-4 py-3.5 text-xs font-semibold text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                >
                  <span>Assessment Rubrics (150M)</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* Key Course Metrics Row */}
              <dl className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-4 dark:border-slate-800">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Course Weightage
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-ink dark:text-white">
                    4 <span className="text-xs font-normal text-slate-500">Credits</span>
                  </dd>
                  <span className="text-xs text-brand-600 dark:text-brand-400">
                    3h Theory + 2h Practical / wk
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Contact Hours
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-ink dark:text-white">
                    65 <span className="text-xs font-normal text-slate-500">Total Hours</span>
                  </dd>
                  <span className="text-xs text-brand-600 dark:text-brand-400">
                    39h Theory · 26h Lab
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Virtual Practicals
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-ink dark:text-white">
                    10 <span className="text-xs font-normal text-slate-500">Experiments</span>
                  </dd>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">
                    LO1 to LO3 Lab Outcomes
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Evaluation Total
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-ink dark:text-white">
                    150 <span className="text-xs font-normal text-slate-500">Marks</span>
                  </dd>
                  <span className="text-xs text-amber-600 dark:text-amber-400">
                    80M Theory + 70M Lab/IA
                  </span>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* 3 Course Pillars / Pathways Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="#curriculum"
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 font-bold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                📘
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ink group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                Theory Curriculum (39h)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                6 structured modules spanning mathematical foundations, regression, tree ensembles, SVMs, GMM clustering, and PCA.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400">
                Explore 6 Modules →
              </span>
            </Link>

            <Link
              href="#experiments"
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                🧪
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ink group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-400">
                10 Virtual Practicals (26h)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                In-browser Python IDE with live NumPy, scikit-learn, and Matplotlib execution. No installations or servers required.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Launch Virtual Lab →
              </span>
            </Link>

            <Link
              href="#rubrics"
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                ⚖️
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ink group-hover:text-amber-600 dark:text-slate-100 dark:group-hover:text-amber-400">
                Continuous Assessment (150M)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Official 5-criteria grading rubric (Preparedness, Documentation, Debugging, Punctuality, Ethics) and marking scheme.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                View Grading Rubrics →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Live Academic Notice Banner */}
      <section className="border-b border-slate-200 bg-slate-100/70 py-2.5 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 text-xs sm:px-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Department Notice:
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Lab 06 Continuous Assessment in progress. Submit Experiments 01 to 10 with verified R² and confusion matrices.
            </span>
          </div>

          <div className="hidden items-center gap-3 sm:flex text-[11px] text-slate-500">
            <span>Course Code: <strong>CSC701 / CEL701</strong></span>
            <span>•</span>
            <span>Faculty In-charge: <strong>Dr. Deepika Kumari</strong></span>
          </div>
        </div>
      </section>

      {/* 3. Department Vision, Mission & Academic Framework */}
      <section className="relative border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Institutional Foundation
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
                Department Vision & <span className="text-gradient">Academic Framework</span>
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                SIES Graduate School of Technology, Department of Computer Engineering — aligning rigorous engineering fundamentals with contemporary industry applications.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Vision & Mission Card */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/40 sm:p-8">
                {/* Department Vision */}
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Department Vision
                  </span>
                  <p className="mt-2 text-base font-semibold leading-relaxed text-ink dark:text-slate-100">
                    &quot;To be a centre of Excellence in Computer Engineering to fulfill the rapidly growing needs of the Society.&quot;
                  </p>
                </div>

                {/* Department Mission M1-M4 */}
                <div className="mt-6 border-t border-slate-200/80 pt-6 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Department Mission
                  </span>
                  <div className="mt-3 space-y-3">
                    {[
                      { code: "M1", text: "To impart quality education to meet the professional challenges in the area of Computer Engineering." },
                      { code: "M2", text: "To create an environment for research, innovation, professional and social development." },
                      { code: "M3", text: "To nurture lifelong learning skills for achieving professional growth." },
                      { code: "M4", text: "To strengthen the alumni and industry connect." },
                    ].map((m) => (
                      <div key={m.code} className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100 dark:border-slate-800 dark:bg-slate-900/60">
                        <span className="rounded bg-brand-100 px-2 py-0.5 font-mono text-[11px] font-bold text-brand-800 dark:bg-brand-900/50 dark:text-brand-300">
                          {m.code}
                        </span>
                        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                          {m.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PO / PSO & Lab Outcomes Card */}
            <div className="space-y-6 lg:col-span-5">
              {/* Program Specific Outcomes */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  Program Specific Outcomes (PSOs)
                </span>
                <div className="mt-3 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <div className="border-l-2 border-brand-500 pl-3">
                    <strong className="text-slate-900 dark:text-white">PSO1:</strong> Apply computational and logical skills to solve Computer engineering problems.
                  </div>
                  <div className="border-l-2 border-accent-500 pl-3">
                    <strong className="text-slate-900 dark:text-white">PSO2:</strong> Develop interdisciplinary skills and acquaint with cutting-edge technologies in software industries.
                  </div>
                </div>
              </div>

              {/* Lab Outcomes (LO1 - LO3) */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Machine Learning Lab Outcomes (LO)
                </span>
                <div className="mt-3 space-y-2.5">
                  {courseInfo.labOutcomes.map((lo) => {
                    const info = labOutcomes[lo.code];
                    const count = experiments.filter((e) => e.lo === lo.code).length;
                    return (
                      <div key={lo.code} className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/40">
                        <div>
                          <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${info.className}`}>
                            {lo.code}
                          </span>
                          <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">{lo.text}</p>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {count} Labs
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Curriculum & Lecture Roadmap (39 Hours Theory) */}
      <CurriculumRoadmap />

      {/* 5. Virtual Laboratory Workbench (10 Prescribed Practicals) */}
      <OfficialLabWorkbench />

      {/* 6. Assessment Rubrics & Laboratory Ethics Section */}
      <AssessmentRubricSection />

      {/* 7. Faculty In-Charge & Teaching Assistants Team */}
      <InstructorSection />

      {/* 8. Prescribed Textbooks & Reference Literature */}
      <section className="relative border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Academic Bibliography
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
                Prescribed Textbooks & <span className="text-gradient">Reference Literature</span>
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Official reading list mandated by the University of Mumbai Machine Learning (CSC701) syllabus.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Prescribed Textbooks */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/40 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500/10 font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                  📚
                </span>
                <h3 className="font-display text-base font-bold text-ink dark:text-slate-100">
                  Prescribed Textbooks
                </h3>
              </div>

              <div className="mt-5 space-y-3.5">
                {textbooks.map((tb, idx) => (
                  <div
                    key={tb.title}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 font-mono text-[11px] font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                      T{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-ink dark:text-slate-100">
                        {tb.title}
                      </h4>
                      <p className="mt-0.5 text-[11.5px] text-slate-500 dark:text-slate-400">
                        {tb.author} {tb.publisher ? `· ${tb.publisher}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescribed Reference Books */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/40 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-500/10 font-bold text-accent-600 dark:bg-accent-500/20 dark:text-accent-400">
                  📖
                </span>
                <h3 className="font-display text-base font-bold text-ink dark:text-slate-100">
                  Reference Books & Papers
                </h3>
              </div>

              <div className="mt-5 space-y-3.5">
                {references.slice(0, 4).map((ref, idx) => (
                  <div
                    key={ref.title}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-accent-50 font-mono text-[11px] font-bold text-accent-700 dark:bg-accent-950/60 dark:text-accent-300">
                      R{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-ink dark:text-slate-100">
                        {ref.title}
                      </h4>
                      <p className="mt-0.5 text-[11.5px] text-slate-500 dark:text-slate-400">
                        {ref.author} {ref.publisher ? `· ${ref.publisher}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Official Document Downloads & Laboratory Support Center */}
      <section className="relative bg-slate-50 py-16 dark:bg-slate-900/60 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-slate-900 sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-[11px] font-bold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Official SIES GST Academic Publications
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
                  Download Official Laboratory Manuals & Curricula
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Access authentic institutional documentation published by the Department of Computer Engineering for B.E. Semester VII (R-2019 Scheme).
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="/documents/SIES_GST_ML_Lab_Manual.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  >
                    <svg className="h-4 w-4 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h3V13h-3v2.5H8V9h3.5v2.5H9.5zM16 15h-1.5v-6H16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2z" />
                    </svg>
                    <span>Download Final ML Lab Manual SH-2024 (PDF)</span>
                  </a>

                  <a
                    href="/documents/ML_Experiment_List_FH2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-700 transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <svg className="h-4 w-4 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Experiment List FH-2026 (PDF)</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 lg:col-span-4">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  Laboratory Location:
                </span>
                <p className="mt-1">
                  Computer Engineering Lab 06, SIES GST Nerul, Navi Mumbai 400706.
                </p>
                <div className="mt-3 border-t border-slate-200/80 pt-3 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Course In-Charge:
                  </span>
                  <p className="mt-1">
                    Dr. Deepika Kumari (Associate Professor, Ph.D. IIT Delhi)
                  </p>
                  <p className="mt-0.5 text-[11px] text-brand-600 dark:text-brand-400">
                    deepikak@sies.edu.in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
