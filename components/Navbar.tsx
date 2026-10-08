"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      {theme === "dark" ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4.5" />
          <path strokeLinecap="round" d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z" />
        </svg>
      )}
    </button>
  );
}

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/experiments", label: "Virtual Labs (10)" },
  { href: "/theory", label: "Curriculum (39h)" },
  { href: "/#rubrics", label: "Assessment Rubric" },
  { href: "/#instructor", label: "Faculty & Team" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95">
      {/* 1. Official Institutional Masthead Bar */}
      <div className="border-b border-slate-100 bg-slate-900 px-4 py-1.5 text-slate-200 dark:border-slate-800 dark:bg-black/60 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px]">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
            <span className="font-semibold tracking-wide text-amber-400">
              SIES GRADUATE SCHOOL OF TECHNOLOGY, NERUL
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">University of Mumbai Affiliated</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[9.5px] font-bold text-emerald-300">
                NAAC &apos;A&apos;
              </span>
              <span className="rounded bg-sky-500/20 px-1 py-0.2 text-[9.5px] font-bold text-sky-300">
                NBA
              </span>
              <span className="rounded bg-indigo-500/20 px-1 py-0.2 text-[9.5px] font-bold text-indigo-300">
                AICTE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="font-mono text-slate-300">B.E. Sem VII · R-2019 Scheme</span>
            <a
              href="/documents/SIES_GST_ML_Lab_Manual.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 hover:underline"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Manual (PDF)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Institutional Course Identity */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex-shrink-0 rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sies-logo.png" alt="SIES GST Logo" className="h-7 w-auto" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-bold tracking-tight text-ink dark:text-slate-100">
                Machine Learning
              </span>
              <span className="rounded bg-brand-50 px-1.5 py-0.2 font-mono text-[10px] font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                CSC701 / CEL701
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Dept. of Computer Engineering · SIES GST Nerul
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-ink dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Launch Lab Button & Theme Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/experiments/simple-linear-regression"
            className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 active:scale-95 sm:inline-flex"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Launch Lab IDE</span>
          </Link>

          <ThemeToggle />

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="space-y-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
              <Link
                href="/experiments"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Launch Virtual Lab IDE</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
