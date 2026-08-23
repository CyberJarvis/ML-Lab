"use client";

import { usePyodide } from "./PyodideProvider";

const STYLES = {
  ready: { label: "Ready", ring: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400", dot: "bg-emerald-500 dark:bg-emerald-400" },
  error: { label: "Error", ring: "border-red-300 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400", dot: "bg-red-500 dark:bg-red-400" },
  idle: { label: "Idle", ring: "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-600 dark:bg-white/5 dark:text-slate-400", dot: "bg-slate-400 dark:bg-slate-500" },
  loading: { label: "Loading", ring: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400", dot: "bg-amber-500 pulse-dot dark:bg-amber-400" },
} as const;

export default function EngineBadge() {
  const { status, message, pythonVersion } = usePyodide();
  const style = STYLES[status];
  const tooltip = message || `Python ${pythonVersion} running locally in your browser`;

  return (
    <span
      title={tooltip}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.ring}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}
