import Link from "next/link";
import { experiments, courseInfo } from "@/lib/experiments-data";

const LAB_LINKS = [
  { href: "/experiments", label: "All experiments" },
  { href: "/theory", label: "Syllabus & theory" },
  { href: "/about", label: "About the lab" },
];

export default function Footer() {
  const featured = experiments.slice(0, 4);

  return (
    <footer className="relative border-t border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-950">
      {/* Gradient hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex-shrink-0 rounded-md bg-white p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sies-logo.png" alt="SIES Graduate School of Technology" className="h-8 w-auto" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[14px] font-semibold tracking-tight text-ink dark:text-slate-100">
                  ML Virtual Lab
                </p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Learn machine learning by doing
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
              An interactive machine learning laboratory that runs entirely in
              your browser — real Python, real plots, zero installs. Built for
              the {courseInfo.university} curriculum at {courseInfo.institute}.
            </p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Lab
            </p>
            <ul className="mt-4 space-y-2.5">
              {LAB_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Popular experiments
            </p>
            <ul className="mt-4 space-y-2.5">
              {featured.map((exp) => (
                <li key={exp.id}>
                  <Link
                    href={`/experiments/${exp.id}`}
                    className="group inline-flex items-baseline gap-2 text-[13px] text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    <span className="font-mono text-[10.5px] text-slate-400 group-hover:text-brand-500 dark:text-slate-500">
                      {String(exp.number).padStart(2, "0")}
                    </span>
                    {exp.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Course
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {courseInfo.courseCodes.map((code) => (
                <span
                  key={code}
                  className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {code}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
              {courseInfo.semester}
              <br />
              {courseInfo.scheme}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center dark:border-slate-800">
          <p className="text-[12px] text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {courseInfo.institute} · {courseInfo.department}
          </p>
        </div>
      </div>
    </footer>
  );
}
