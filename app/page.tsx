import Link from "next/link";
import { experiments, courseInfo, labOutcomes } from "@/lib/experiments-data";
import { courseHeader, syllabus } from "@/lib/syllabus";
import ExperimentCard from "@/components/ExperimentCard";
import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    title: "Runs entirely in the browser",
    desc: "Pyodide compiles CPython to WebAssembly. NumPy, SciPy, scikit-learn and matplotlib execute locally — no server, no installs.",
    gradient: "from-amber-400 to-orange-500",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: "A real code editor",
    desc: "Monaco, the editor from VS Code. Write ordinary Python: imports resolve themselves, tracebacks point at your own line numbers, and figures appear with or without plt.show().",
    gradient: "from-brand-500 to-accent-500",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  },
  {
    title: "Live plots & output",
    desc: "Console text and matplotlib figures render instantly. Iterate on parameters and re-run as often as you like.",
    gradient: "from-emerald-400 to-teal-500",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 3 3 5-6" />,
  },
  {
    title: "The full lab structure",
    desc: "Aim, Theory, Pretest, Procedure, Simulation, Posttest, Further Readings and Feedback — the standard Virtual Labs section set, with auto-graded quizzes.",
    gradient: "from-sky-400 to-blue-600",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Pick an experiment",
    desc: "Ten experiments follow the syllabus order — regression through ensembles to clustering and PCA. Each opens with the aim, key concepts and the algorithm.",
  },
  {
    number: "02",
    title: "Read, then run",
    desc: "Theory sits next to a real Python editor. Complete the TODO scaffold or load the worked solution, press Run, and watch console output and plots appear.",
  },
  {
    number: "03",
    title: "Check understanding",
    desc: "Auto-graded pretests and posttests with per-question explanations close the loop, and further readings point at where to go deeper.",
  },
];

const ArrowIcon = (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

/** Stylised preview of the lab IDE — pure markup, no images. */
function LabPreview() {
  const codeLines: { n: number; parts: [string, string][] }[] = [
    { n: 1, parts: [["kw", "from"], ["pl", " sklearn.linear_model "], ["kw", "import"], ["pl", " LinearRegression"]] },
    { n: 2, parts: [["kw", "import"], ["pl", " matplotlib.pyplot "], ["kw", "as"], ["pl", " plt"]] },
    { n: 3, parts: [] },
    { n: 4, parts: [["pl", "model = LinearRegression()"]] },
    { n: 5, parts: [["pl", "model."], ["fn", "fit"], ["pl", "(X_train, y_train)"]] },
    { n: 6, parts: [["pl", "pred = model."], ["fn", "predict"], ["pl", "(X_test)"]] },
    { n: 7, parts: [] },
    { n: 8, parts: [["pl", "plt."], ["fn", "scatter"], ["pl", "(X_test, y_test)"]] },
    { n: 9, parts: [["pl", "plt."], ["fn", "plot"], ["pl", "(X_test, pred, color="], ["st", "\"red\""], ["pl", ")"]] },
  ];
  const tone: Record<string, string> = {
    kw: "text-brand-400",
    pl: "text-slate-300",
    fn: "text-sky-400",
    st: "text-emerald-400",
  };

  return (
    <div className="relative animate-float">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424]/95 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-[11px] text-slate-500">linear-regression.starter.py</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            Run
          </span>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-3 border-r border-white/[0.06] p-4 font-mono text-[10.5px] leading-[1.7]">
            {codeLines.map((line) => (
              <div key={line.n} className="flex gap-3">
                <span className="w-3 select-none text-right text-slate-600">{line.n}</span>
                <span className="whitespace-pre">
                  {line.parts.map(([t, text], i) => (
                    <span key={i} className={tone[t]}>{text}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
          <div className="col-span-2 flex flex-col p-3">
            <p className="mb-2 font-mono text-[9.5px] uppercase tracking-wider text-slate-500">Plots (1)</p>
            <svg viewBox="0 0 120 90" className="w-full flex-1">
              <line x1="10" y1="80" x2="110" y2="80" stroke="#334155" strokeWidth="1" />
              <line x1="10" y1="80" x2="10" y2="8" stroke="#334155" strokeWidth="1" />
              <line x1="14" y1="72" x2="106" y2="16" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" />
              {[[22, 66], [34, 60], [46, 55], [52, 48], [64, 44], [72, 36], [84, 30], [96, 22]].map(([x, y]) => (
                <circle key={x} cx={x} cy={y} r="2.2" fill="#22d3ee" opacity="0.9" />
              ))}
            </svg>
            <div className="mt-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 font-mono text-[9px] text-slate-400">
              R² score: 0.918 · MSE: 3.42
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-white text-ink dark:bg-slate-950 dark:text-white">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
                The Machine Learning
                <span className="text-gradient block pb-1">virtual laboratory.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                Ten university experiments with full theory, a real Python editor,
                and live output — running entirely in your browser.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/experiments"
                  className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  Start Experimenting {ArrowIcon}
                </Link>
                <Link
                  href="/theory"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-ink backdrop-blur transition-colors hover:bg-slate-200 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Read the Theory
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-slate-500 transition-colors hover:text-ink dark:text-slate-300 dark:hover:text-white"
                >
                  About the lab
                </Link>
              </div>

              <dl className="mt-12 grid max-w-xl grid-cols-4 gap-6 border-t border-slate-200 pt-8 dark:border-white/10">
                {[
                  { k: `${experiments.length}`, v: "Experiments" },
                  { k: `${syllabus.length}`, v: "Syllabus modules" },
                  { k: "3", v: "Lab outcomes" },
                  { k: "0", v: "Installs needed" },
                ].map((s) => (
                  <div key={s.v}>
                    <dt className="font-display text-2xl font-semibold text-ink sm:text-3xl dark:text-white">
                      <span className="text-gradient">{s.k}</span>
                    </dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hidden lg:block">
              <LabPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Course strip ---------- */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[12.5px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-ink dark:text-slate-100">{courseInfo.courseName}</span>
            <span>{courseInfo.institute}</span>
            <span className="hidden sm:inline">{courseInfo.semester}</span>
            <span className="font-mono text-[11.5px] text-slate-400 dark:text-slate-500">
              {courseInfo.courseCodes.join(" · ")}
            </span>
          </div>
        </div>
      </section>


      {/* ---------- Features ---------- */}
      <section className="bg-white py-16 sm:py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
              Why this lab
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
              Built like a real lab, not a slideshow
            </h2>
            <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
              Everything you need to learn by doing — theory on the left, code
              on the right, results underneath.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <div className="card-glow group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 font-semibold text-ink dark:text-slate-100">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-16 sm:py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
              How it works
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
              From zero to a trained model in three steps
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 110}>
                <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
                  <span className="font-display text-4xl font-semibold text-brand-600/15 dark:text-brand-400/20">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-display text-[16px] font-semibold text-ink dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {step.desc}
                  </p>
                  {i < STEPS.length - 1 && (
                    <svg
                      className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-400 md:block"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ---------- Theory / syllabus ---------- */}
      <section className="bg-white py-16 sm:py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                  Curriculum
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
                  The full {courseHeader.code} syllabus
                </h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
                  Every module and topic from the official course, mapped to the experiment that
                  puts it into practice — {courseHeader.totalHours} hours across {syllabus.length} modules.
                </p>
              </div>
              <Link
                href="/theory"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
              >
                Read the theory {ArrowIcon}
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {syllabus.map((mod, i) => (
              <Reveal key={mod.number} delay={i * 70}>
                <Link
                  href="/theory"
                  className="group flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/50"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 font-mono text-[13px] font-bold text-white shadow-md">
                    {mod.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-ink group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-400">
                      {mod.title}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">
                      {mod.hours} hrs · {mod.topics.length} topics
                    </p>
                  </div>
                  <svg
                    className="mt-1 h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ---------- Lab outcomes ---------- */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
              Outcomes
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
              Lab outcomes
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              On completing this laboratory course, you will be able to:
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {courseInfo.labOutcomes.map((lo, i) => {
              const info = labOutcomes[lo.code];
              const count = experiments.filter((e) => e.lo === lo.code).length;
              return (
                <Reveal key={lo.code} delay={i * 100}>
                  <div className="card-glow h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[12px] font-bold ring-1 ${info.className}`}>
                        {info.label}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        {count} experiment{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{lo.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Experiment index ---------- */}
      <section className="bg-white py-16 sm:py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                  The lab
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl dark:text-slate-100">
                  The ten experiments
                </h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
                  Regression through to dimensionality reduction, in the order the syllabus takes them.
                </p>
              </div>
              <Link
                href="/experiments"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:text-brand-300"
              >
                View all {ArrowIcon}
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.slice(0, 6).map((experiment, i) => (
              <Reveal key={experiment.id} delay={i * 70}>
                <ExperimentCard experiment={experiment} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="bg-white pb-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-16">
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Ready to train your first model?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  Open the lab, press Run, and watch a linear regression fit itself —
                  all without leaving this browser tab.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={`/experiments/${experiments[0].id}`}
                    className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Open Experiment 01 {ArrowIcon}
                  </Link>
                  <Link
                    href="/experiments"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                  >
                    Browse
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

