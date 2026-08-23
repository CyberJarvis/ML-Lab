import Link from "next/link";
import type { ReactNode } from "react";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  crumbs?: Crumb[];
  /** Extra content rendered on the right / below the copy. */
  children?: ReactNode;
  compact?: boolean;
}

/** Shared page banner — flat surface, no gradient/glow decoration, follows the site theme. */
export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white text-ink dark:bg-slate-950 dark:text-white">
      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 ${
          compact ? "py-10 sm:py-12" : "py-14 sm:py-20"
        }`}
      >
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[12px] font-medium text-slate-500 dark:text-slate-400">
            {crumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {index > 0 && (
                  <svg className="h-3 w-3 text-slate-300 dark:text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-700 dark:text-slate-300">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-brand-200">
            {eyebrow}
          </p>
        )}

        <h1
          className={`mt-4 max-w-3xl font-display font-semibold tracking-tight text-balance ${
            compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"
          }`}
        >
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
