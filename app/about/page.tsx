import { courseInfo, experiments, labOutcomes } from "@/lib/experiments-data";
import PageHero from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | ML Theory + Virtual Labs",
  description: "About Machine Learning Theory + Virtual Labs — course syllabus, theory modules, virtual experiments, and evaluation rubrics.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHero
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow={`Machine Learning Theory + Labs · ${courseInfo.semester}`}
        title={
          <>
            About <span className="text-gradient">ML Theory + Labs</span>
          </>
        }
        description="Comprehensive course information, syllabus theory modules, interactive coding environments, lab manuals, and evaluation rubrics."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Course Info */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 mb-4 dark:text-slate-100">Course Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">University</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.university}</dd></div>
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">Institute</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.institute}</dd></div>
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">Department</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.department}</dd></div>
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">Course</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.courseName}</dd></div>
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">Course Codes</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.courseCodes.join(" / ")}</dd></div>
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">Semester</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.semester}</dd></div>
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">Scheme</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.scheme}</dd></div>
            <div><dt className="font-semibold text-slate-500 dark:text-slate-400">Lab</dt><dd className="text-slate-800 dark:text-slate-200">Lab 06</dd></div>
            <div className="sm:col-span-2"><dt className="font-semibold text-slate-500 dark:text-slate-400">Faculty In-charge / Instructors</dt><dd className="text-slate-800 dark:text-slate-200">{courseInfo.faculty.join(" · ")}</dd></div>
          </div>
        </section>

        {/* How to use */}
        <section className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-500/30 dark:bg-brand-500/10">
          <h2 className="text-xl font-bold text-brand-900 mb-4 dark:text-brand-200">How to Use This Virtual Lab</h2>
          <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-[11px] font-bold text-white shadow-sm">1</span><span>Navigate to <strong>Experiments</strong> and select any of the {experiments.length} experiments.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-[11px] font-bold text-white shadow-sm">2</span><span>Read the <strong>Aim</strong>, <strong>Theory</strong>, <strong>Algorithm</strong>, and <strong>How To</strong> tabs on the left panel.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-[11px] font-bold text-white shadow-sm">3</span><span>The code editor comes pre-loaded with <strong>starter code</strong> with TODO markers. Complete it or click <strong>Load Solution</strong>.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-[11px] font-bold text-white shadow-sm">4</span><span>Click <strong>Run</strong>. The first run downloads Pyodide (~10 MB) — be patient. Later runs are instant.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-[11px] font-bold text-white shadow-sm">5</span><span>View text output in the <strong>Console</strong> tab and matplotlib figures in the <strong>Plots</strong> tab.</span></li>
            <li className="flex gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600 text-[11px] font-bold text-white shadow-sm">6</span><span>Edit and re-run as many times as you like. Experiment with different parameters!</span></li>
          </ol>
        </section>

        {/* Lab Outcomes */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 mb-4 dark:text-slate-100">Lab Outcomes</h2>
          <div className="space-y-4">
            {courseInfo.labOutcomes.map((lo) => {
              const info = labOutcomes[lo.code];
              const count = experiments.filter((e) => e.lo === lo.code).length;
              return (
                <div key={lo.code} className="flex gap-4 items-start">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ring-1 flex-shrink-0 ${info.className}`}>{info.label}</span>
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{lo.text}</p>
                    <p className="text-xs text-slate-400 mt-1 dark:text-slate-500">{count} experiment{count !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technology */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 mb-4 dark:text-slate-100">Technology Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60"><h3 className="font-semibold text-slate-800 dark:text-slate-200">Next.js 15</h3><p className="text-slate-500 mt-1 dark:text-slate-400">React framework with App Router & TypeScript</p></div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60"><h3 className="font-semibold text-slate-800 dark:text-slate-200">Pyodide</h3><p className="text-slate-500 mt-1 dark:text-slate-400">CPython compiled to WebAssembly — Python in the browser</p></div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60"><h3 className="font-semibold text-slate-800 dark:text-slate-200">Monaco Editor</h3><p className="text-slate-500 mt-1 dark:text-slate-400">The same editor that powers VS Code</p></div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60"><h3 className="font-semibold text-slate-800 dark:text-slate-200">scikit-learn, NumPy, SciPy</h3><p className="text-slate-500 mt-1 dark:text-slate-400">Scientific Python libraries pre-loaded in Pyodide</p></div>
          </div>
        </section>


        {/* Evaluation */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 mb-1 dark:text-slate-100">Evaluation Criteria</h2>
          <p className="text-sm text-slate-500 mb-4 dark:text-slate-400">Exceed Expectations (3), Meet Expectations (2), Below Expectations (1)</p>
          <div className="space-y-3">
            {[
              { name: "Preparedness and Efforts", desc: "Well prepared and puts efforts (3) / partial (2) / neither (1)" },
              { name: "Presentation of Output", desc: "Perfect instructions, well presented (3) / moderate (2) / not presented properly (1)" },
              { name: "Results / Participation", desc: "Participates and gets proper results (3) / gets result with help (2) / neither (1)" },
              { name: "Punctuality", desc: "Checked in-time, always on-time (3) / sometimes delays (2) / mostly delays (1)" },
              { name: "Lab Ethics", desc: "Follows proper lab ethics (3) / sometimes doesn't (2) / untidy (1)" },
            ].map((c) => (
              <div key={c.name} className="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{c.name}</h3>
                <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
