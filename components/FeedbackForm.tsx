"use client";

import { useState } from "react";

const RATINGS = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Adequate" },
  { value: 2, label: "Weak" },
  { value: 1, label: "Poor" },
];

const STORAGE_PREFIX = "ml-lab-feedback";

export default function FeedbackForm({ experimentId }: { experimentId: string }) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => {
    try {
      localStorage.setItem(
        `${STORAGE_PREFIX}:${experimentId}`,
        JSON.stringify({ rating, comment, at: new Date().toISOString() })
      );
    } catch {
      // Private browsing or blocked site data — the note below still applies.
    }
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="rise rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="font-display text-base font-semibold text-emerald-900 dark:text-emerald-200">Thank you.</p>
        </div>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-emerald-800 dark:text-emerald-300">
          Your response has been kept in this browser. This lab runs entirely on your
          machine with no server behind it, so nothing was transmitted anywhere — please
          also pass substantive feedback to your lab in-charge.
        </p>
        <button
          onClick={() => setSaved(false)}
          className="mt-4 rounded-md border border-emerald-300 bg-white px-3 py-1.5 text-[12px] font-medium text-emerald-800 transition-colors hover:bg-emerald-50 dark:border-emerald-500/40 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
        >
          Edit response
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1">


      <fieldset>
        <legend className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
          How clear was this experiment?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {RATINGS.map((option) => (
            <button
              key={option.value}
              onClick={() => setRating(option.value)}
              className={`rounded-xl border px-3.5 py-2 text-[13px] font-medium transition-all ${rating === option.value
                  ? "border-transparent bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-glow"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-500/50"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="feedback-comment" className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
          What would you change?
        </label>
        <textarea
          id="feedback-comment"
          rows={5}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Anything unclear in the theory, the code, or the output…"
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-slate-700 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:placeholder:text-slate-600 dark:focus:border-brand-500"
        />
      </div>

      <button
        onClick={save}
        disabled={rating === null && comment.trim() === ""}
        className="btn-shine rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        Save feedback
      </button>
    </div>
  );
}
