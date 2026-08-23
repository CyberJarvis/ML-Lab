import { labOutcomes, type LabOutcome } from "@/lib/experiments";

export default function LOBadge({ lo }: { lo: LabOutcome }) {
  const info = labOutcomes[lo];
  return (
    <span
      title={info.description}
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ${info.className}`}
    >
      {info.label}
    </span>
  );
}
