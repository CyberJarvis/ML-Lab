"use client";

import { useState, useEffect } from "react";

const NOTICES = [
  {
    tag: "Circular",
    text: "Academic Year 2025–26: Term Work submission for Experiments 01 to 10 scheduled in Lab 06.",
  },
  {
    tag: "Assessment",
    text: "Continuous Evaluation Rubrics (Levels 1–3) in effect for all 10 laboratory practicals.",
  },
  {
    tag: "Virtual Lab",
    text: "Browser-based WebAssembly Pyodide execution active — no local software installation needed.",
  },
  {
    tag: "Syllabus",
    text: "Mumbai University R-2019 Scheme (CSC701 / CEL701 / CSL7001) mapping 39h Theory & 26h Lab.",
  },
];

export default function InstitutionalBanner() {
  const [activeNotice, setActiveNotice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNotice((prev) => (prev + 1) % NOTICES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full border-b border-slate-200/80 bg-slate-900 text-slate-200 dark:border-slate-800 dark:bg-slate-950">
      {/* Top Accreditation & Identity Ribbon */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 text-xs sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5 font-semibold tracking-wide text-amber-400">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>SIES GRADUATE SCHOOL OF TECHNOLOGY</span>
          </div>
          <span className="hidden text-slate-500 sm:inline">|</span>
          <span className="text-slate-300">University of Mumbai Affiliated</span>
          <span className="hidden text-slate-500 md:inline">|</span>
          <div className="hidden items-center gap-2 md:flex">
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
              NAAC &apos;A&apos; Grade
            </span>
            <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-bold text-sky-300">
              NBA Accredited
            </span>
            <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-300">
              AICTE Approved
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="hidden lg:inline">Sector-V, Nerul, Navi Mumbai 400706</span>
          <span className="font-mono text-slate-300">AY 2025–2026 · Sem VII</span>
        </div>
      </div>

      {/* Live Campus Announcement / Notice Ticker */}
      <div className="border-t border-white/5 bg-black/30 px-4 py-1.5 text-xs sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-rose-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            <span>Academic Bulletin</span>
          </div>

          <div className="h-3 w-px bg-slate-700" />

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center gap-2 transition-all duration-500">
              <span className="rounded bg-brand-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-brand-300">
                {NOTICES[activeNotice].tag}
              </span>
              <p className="truncate text-slate-300">
                {NOTICES[activeNotice].text}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/documents/SIES_GST_ML_Lab_Manual.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 text-[11px] font-medium text-amber-300 hover:text-amber-200 hover:underline sm:inline-flex"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Lab Manual (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
