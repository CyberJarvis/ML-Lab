"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { experiments } from "@/lib/experiments-data";
import { EXPERIMENT_LIST_PDF, INSTITUTE_NAV, LAB_MANUAL_PDF, SITE_NAV } from "@/lib/site-nav";
import { institute } from "@/lib/institute";

export default function SiteMenu() {
  const pathname = usePathname();
  const current = (href: string) => (pathname === href ? "current" : undefined);

  return (
    <nav id="layout-menu" aria-label="Site">
      <Link href="/" style={{ margin: 0, border: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sies-logo.png" alt={institute.name} className="menu-logo" />
      </Link>

      <div className="menu-category">Navigation</div>
      {SITE_NAV.map((item) => (
        <div key={item.href} className="menu-item">
          <Link href={item.href} className={current(item.href)}>
            {item.label}
          </Link>
        </div>
      ))}

      <div className="menu-category">Experiments</div>
      {experiments.map((exp) => {
        const href = `/experiments/${exp.id}`;
        const active = pathname === href || pathname === `/experiments/${exp.number}`;
        return (
          <div key={exp.id} className="menu-item">
            <Link href={href} className={active ? "current" : undefined}>
              {exp.number}. {exp.shortTitle}
            </Link>
          </div>
        );
      })}

      <div className="menu-category">Institute</div>
      {INSTITUTE_NAV.map((item) => (
        <div key={item.href} className="menu-item">
          <Link href={item.href} className={current(item.href)}>
            {item.label}
          </Link>
        </div>
      ))}
      <div className="menu-item">
        <a href={institute.website} target="_blank" rel="noopener noreferrer">
          {institute.shortName} Website
        </a>
      </div>

      <div className="menu-category">Downloads</div>
      <div className="menu-item">
        <a href={LAB_MANUAL_PDF} target="_blank" rel="noopener noreferrer">
          Lab Manual (PDF)
        </a>
      </div>
      <div className="menu-item">
        <a href={EXPERIMENT_LIST_PDF} target="_blank" rel="noopener noreferrer">
          Experiment List (PDF)
        </a>
      </div>
    </nav>
  );
}
