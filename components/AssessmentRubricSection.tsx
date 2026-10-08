"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  level3: string;
  level2: string;
  level1: string;
  weight: string;
}

const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: "prep",
    name: "1. Preparedness & Knowledge",
    description: "Pre-lab study of mathematical formulation, algorithm steps, and dataset comprehension.",
    level3: "Thoroughly prepared with mathematical derivations; understands algorithmic parameters and hyperparameter roles.",
    level2: "Partially prepared; understands core concept but requires assistance explaining mathematical rationale.",
    level1: "Unprepared; unable to explain the aim, mathematical equation, or algorithm steps.",
    weight: "20%",
  },
  {
    id: "presentation",
    name: "2. Presentation & Documentation",
    description: "Accuracy of console prints, labeled matplotlib graphs, and structured journal documentation.",
    level3: "Flawless output presentation; all plots labeled with axis/titles/legends; concise analysis of metrics.",
    level2: "Satisfactory presentation; minor omissions in graphical labels or formatting.",
    level1: "Poor presentation; unformatted output, absent plots, or incomplete lab documentation.",
    weight: "20%",
  },
  {
    id: "debugging",
    name: "3. Practical Performance & Debugging",
    description: "Hands-on implementation, debugging runtime errors, and comparison of from-scratch vs library models.",
    level3: "Executes independently; diagnoses and corrects exceptions, tensor shapes, and convergence issues.",
    level2: "Executes with occasional faculty/TA hints; resolves common syntax and import errors.",
    level1: "Unable to run or debug code without complete assistance; fails to achieve convergence.",
    weight: "20%",
  },
  {
    id: "punctuality",
    name: "4. Punctuality & Timely Submission",
    description: "Adherence to lab schedule, on-time check-in, and timely submission of experiment assignments.",
    level3: "Always on time for practical sessions; completes and verifies experiments within designated slot.",
    level2: "Minor delays in check-in or submission within the grace window.",
    level1: "Consistent delays, chronic late submissions, or unexcused absenteeism.",
    weight: "20%",
  },
  {
    id: "ethics",
    name: "5. Lab Ethics & Professional Conduct",
    description: "Adherence to institutional laboratory conduct, original code development, and workstation etiquette.",
    level3: "Strict adherence to academic honesty; original code synthesis; maintains workstation cleanliness.",
    level2: "Minor lapses in workstation discipline; responds immediately to faculty instructions.",
    level1: "Plagiarism, unauthorized software usage, or disregard for lab decorum.",
    weight: "20%",
  },
];

const EXAM_SCHEME = [
  {
    component: "End Semester Examination (Theory)",
    marks: "80 Marks",
    duration: "3 Hours",
    desc: "Comprehensive Mumbai University theory paper covering Modules 1 to 6 with analytical and derivation questions.",
    badge: "Theory",
    color: "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300",
  },
  {
    component: "Internal Assessment (IA)",
    marks: "20 Marks",
    duration: "2 Tests (1 Hr each)",
    desc: "Average of two class tests: Test 1 (approx 40% syllabus) and Test 2 (remaining 40% syllabus).",
    badge: "Continuous",
    color: "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300",
  },
  {
    component: "Term Work (TW)",
    marks: "25 Marks",
    duration: "Full Semester",
    desc: "Continuous evaluation across 10 lab practicals (15M), mini-project/assignments (5M), and attendance/ethics (5M).",
    badge: "Laboratory",
    color: "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  },
  {
    component: "Practical & Oral Examination",
    marks: "25 Marks",
    duration: "Joint Evaluation",
    desc: "Conducted jointly by internal and external examiners; includes on-the-spot programming, model evaluation and viva voce.",
    badge: "Viva & Coding",
    color: "border-purple-500/30 bg-purple-500/5 text-purple-700 dark:text-purple-300",
  },
];

const LAB_GUIDELINES = [
  {
    type: "dos",
    title: "Laboratory Best Practices (Do's)",
    items: [
      "Wearing college ID-Card is strictly compulsory before entering Lab 06.",
      "Read the experiment Aim, Theory, and Algorithm beforehand to ensure maximum session productivity.",
      "Shut down your workstation properly and arrange lab chairs before vacating the laboratory.",
      "Verify code convergence and check evaluation metrics (R², MSE, Accuracy, Confusion Matrix) with faculty.",
      "Report any workstation hardware or network anomalies to the technical staff immediately.",
    ],
  },
  {
    type: "donts",
    title: "Laboratory Code of Conduct (Don'ts)",
    items: [
      "Do not bring eatables, beverages, or unnecessary personal baggage to the computer workbench.",
      "Do not plagiarize or blindly copy-paste solutions without conceptual comprehension.",
      "Do not step on electrical trunking, peripheral cabling, or disconnect network interfaces.",
      "Do not alter system configurations, browser settings, or install unauthorized software.",
      "Do not leave the laboratory session without submitting the continuous assessment sign-off.",
    ],
  },
];

export default function AssessmentRubricSection() {
  const [activeTab, setActiveTab] = useState<"rubrics" | "scheme" | "ethics">("rubrics");

  return (
    <section id="rubrics" className="relative border-b border-slate-200 bg-slate-50/70 py-16 dark:border-slate-800 dark:bg-slate-900/30 sm:py-24">
    </section>
  );
}
