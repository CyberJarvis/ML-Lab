"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/experiments";

const LETTERS = ["A", "B", "C", "D", "E"];

interface QuizProps {
  questions: QuizQuestion[];
  /** Distinguishes the pretest and posttest instances on the same page. */
  storageKey: string;
  intro: string;
}

export default function Quiz({ questions, storageKey, intro }: QuizProps) {
  const [chosen, setChosen] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(chosen).length;
  const score = useMemo(
    () => questions.reduce((total, q, i) => total + (chosen[i] === q.answer ? 1 : 0), 0),
    [chosen, questions]
  );

  const reset = () => {
    setChosen({});
    setSubmitted(false);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const verdict =
    percentage === 100
      ? "Full marks — every question correct."
      : percentage >= 60
        ? "A solid pass. Read the explanations below for the ones you missed."
        : "Worth another look — work through the explanations, then retake it.";

  return (
    <div className="space-y-5">
      <p className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">{intro}</p>

      {!submitted && (
        <div className="flex items-center gap-3">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
            role="progressbar"
            aria-valuenow={answered}
            aria-valuemin={0}
            aria-valuemax={questions.length}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-500"
              style={{ width: `${(answered / questions.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-[11.5px] font-medium text-slate-500 dark:text-slate-400">
            {answered}/{questions.length}
          </span>
        </div>
      )}

      {submitted && (
        <div
          className={`rise rounded-2xl border p-5 ${
            percentage >= 60
              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
              : "border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10"
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className={`font-display text-2xl font-semibold ${percentage >= 60 ? "text-emerald-800 dark:text-emerald-300" : "text-amber-800 dark:text-amber-300"}`}>
              {score} / {questions.length}
              <span className="ml-2 text-base font-medium opacity-70">({percentage}%)</span>
            </p>
            <button
              onClick={reset}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Retake
            </button>
          </div>
          <p className={`mt-1.5 text-[13px] ${percentage >= 60 ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
            {verdict}
          </p>
        </div>
      )}

      <ol className="space-y-5">
        {questions.map((question, questionIndex) => {
          const selected = chosen[questionIndex];
          const isCorrect = selected === question.answer;

          return (
            <li
              key={`${storageKey}-${questionIndex}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {questionIndex + 1}
                </span>
                <p className="pt-0.5 text-[14px] font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                  {question.question}
                </p>
              </div>

              <div className="mt-4 space-y-2 pl-9">
                {question.options.map((option, optionIndex) => {
                  const chosenThis = selected === optionIndex;
                  const isAnswer = question.answer === optionIndex;

                  let tone = "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500/50 dark:hover:bg-brand-500/10";
                  if (submitted && isAnswer) tone = "border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10";
                  else if (submitted && chosenThis) tone = "border-red-300 bg-red-50 dark:border-red-500/40 dark:bg-red-500/10";
                  else if (chosenThis) tone = "border-brand-400 bg-brand-50 dark:border-brand-500/50 dark:bg-brand-500/10";

                  return (
                    <button
                      key={optionIndex}
                      disabled={submitted}
                      onClick={() => setChosen((prev) => ({ ...prev, [questionIndex]: optionIndex }))}
                      className={`flex w-full items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors disabled:cursor-default ${tone}`}
                    >
                      <span
                        className={`mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center rounded font-mono text-[11px] font-semibold ${
                          submitted && isAnswer
                            ? "bg-emerald-600 text-white"
                            : submitted && chosenThis
                              ? "bg-red-500 text-white"
                              : chosenThis
                                ? "bg-brand-600 text-white"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {LETTERS[optionIndex]}
                      </span>
                      <span className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">{option}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`ml-9 mt-3 rounded-lg border-l-2 py-2 pl-3.5 pr-3 ${
                    isCorrect
                      ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-500/10"
                      : "border-amber-500 bg-amber-50/60 dark:bg-amber-500/10"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {isCorrect ? "Correct" : selected === undefined ? "Not answered" : "Not quite"}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                    {question.explanation}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted && (
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setSubmitted(true)}
            disabled={answered === 0}
            className="btn-shine rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            Submit answers
          </button>
          <span className="text-[12.5px] text-slate-500 dark:text-slate-400">
            {answered} of {questions.length} answered
          </span>
        </div>
      )}
    </div>
  );
}
