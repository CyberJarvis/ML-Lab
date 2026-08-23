// ============================================================================
// ML Virtual Lab — course and experiment types.
//
// Content follows the SIES GST / University of Mumbai Machine Learning Lab
// (CEL701 for FH 2026, CSL7001 under R-2019) and is organised into the section
// set used across the Virtual Labs initiative: Aim, Theory, Pretest, Procedure,
// Simulation, Posttest, Further Readings, Feedback.
// ============================================================================

export type LabOutcome = "LO1" | "LO2" | "LO3";

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  explanation: string;
}

export interface Reference {
  title: string;
  detail: string;
  url?: string;
}

export interface Experiment {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  lo: LabOutcome;
  category: string;
  aim: string;
  /** Trusted authored HTML, rendered into the Theory section. */
  theory: string;
  algorithm: string[];
  /** Procedure — what the student actually does at the terminal. */
  instructions: string[];
  keyConcepts: string[];
  /** Pyodide distribution names, shown to the student and checked in CI. */
  packages: string[];
  pretest: QuizQuestion[];
  posttest: QuizQuestion[];
  references: Reference[];
  starterCode: string;
  solutionCode: string;
}

export const labOutcomes: Record<
  LabOutcome,
  { label: string; description: string; className: string }
> = {
  LO1: {
    label: "LO1",
    description:
      "To implement an appropriate machine learning model for the given application.",
    className: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/30",
  },
  LO2: {
    label: "LO2",
    description:
      "To implement ensemble techniques to combine predictions from different models.",
    className: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30",
  },
  LO3: {
    label: "LO3",
    description: "To implement the dimensionality reduction techniques.",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30",
  },
};

export const courseInfo = {
  university: "University of Mumbai",
  institute: "SIES Graduate School of Technology",
  department: "Department of Computer Engineering",
  courseName: "Machine Learning Lab",
  courseCodes: ["CEL701", "CSL7001"],
  semester: "B.E. / Semester VII",
  scheme: "R-2019",
  faculty: ["Dr. Aparna Bannore", "Dr. Rizwana Shaikh"],
  labOutcomes: (Object.keys(labOutcomes) as LabOutcome[]).map((code) => ({
    code,
    text: labOutcomes[code].description,
  })),
};
