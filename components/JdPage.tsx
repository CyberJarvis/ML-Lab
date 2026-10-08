import type { ReactNode } from "react";

/** Page body in the jemdoc mould: double-ruled title, then plain prose. */
export default function JdPage({
  title,
  subtitle,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="jd-prose">
      <div id="toptitle">
        <h1>{title}</h1>
        {subtitle && <div id="subtitle">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}
