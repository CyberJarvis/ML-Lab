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
      className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-ink dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
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
  { href: "/experiments", label: "Experiments" },
  { href: "/theory", label: "Theory" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 glass ${scrolled
            ? "border-slate-200/90 shadow-lift dark:border-slate-700/60"
            : "border-slate-200/60 shadow-sm dark:border-slate-800/60"
          }`}
      >
        <div className="flex h-14 items-center justify-between px-3 sm:px-4">
          <Link href="/" className="flex items-center gap-2.5">
            {/* White backing keeps the wordmark's black text legible on the dark navbar. */}
            <span className="flex-shrink-0 rounded-md bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sies-logo.png" alt="SIES Graduate School of Technology" className="h-8 w-auto" />
            </span>
            <div className="leading-tight">
              <div className="text-[13px] font-display font-semibold text-ink tracking-tight dark:text-slate-100">
                Machine Learning
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide dark:text-slate-400">
                SIES GST · University of Mumbai
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 rounded-full bg-slate-900/[0.04] p-1 md:flex dark:bg-white/[0.06]">
            {LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all ${active
                      ? "bg-white text-ink shadow-sm dark:bg-slate-700 dark:text-white"
                      : "text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-900/5 hover:text-ink md:hidden dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {menuOpen ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <nav className="border-t border-slate-200/70 px-3 py-3 md:hidden dark:border-slate-700/50">
            <ul className="space-y-1">
              {LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors ${active
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                          : "text-slate-600 hover:bg-slate-900/[0.04] dark:text-slate-300 dark:hover:bg-white/5"
                        }`}
                    >
                      {link.label}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
                    </Link>
                  </li>
                );
              })}

            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

