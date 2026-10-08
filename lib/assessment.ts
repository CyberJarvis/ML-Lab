// Marks distribution, continuous-assessment rubric and lab conduct rules.
export const examScheme = [
  {
    component: "End Semester Examination (Theory)",
    marks: 80,
    duration: "3 Hours",
    desc: "Comprehensive Mumbai University theory paper covering Modules 1 to 6 with analytical and derivation questions.",
  },
  {
    component: "Internal Assessment (IA)",
    marks: 20,
    duration: "2 Tests (1 Hr each)",
    desc: "Average of two class tests: Test 1 (approx 40% syllabus) and Test 2 (remaining 40% syllabus).",
  },
  {
    component: "Term Work (TW)",
    marks: 25,
    duration: "Full Semester",
    desc: "Continuous evaluation across 10 lab practicals (15M), mini-project/assignments (5M), and attendance/ethics (5M).",
  },
  {
    component: "Practical & Oral Examination",
    marks: 25,
    duration: "Joint Evaluation",
    desc: "Conducted jointly by internal and external examiners; includes on-the-spot programming, model evaluation and viva voce.",
  },
];

export const rubricCriteria = [
  {
    name: "Preparedness & Knowledge",
    description: "Pre-lab study of mathematical formulation, algorithm steps, and dataset comprehension.",
    level3: "Thoroughly prepared with mathematical derivations; understands algorithmic parameters and hyperparameter roles.",
    level2: "Partially prepared; understands core concept but requires assistance explaining mathematical rationale.",
    level1: "Unprepared; unable to explain the aim, mathematical equation, or algorithm steps.",
    weight: "20%",
  },
  {
    name: "Presentation & Documentation",
    description: "Accuracy of console prints, labeled matplotlib graphs, and structured journal documentation.",
    level3: "Flawless output presentation; all plots labeled with axis/titles/legends; concise analysis of metrics.",
    level2: "Satisfactory presentation; minor omissions in graphical labels or formatting.",
    level1: "Poor presentation; unformatted output, absent plots, or incomplete lab documentation.",
    weight: "20%",
  },
  {
    name: "Practical Performance & Debugging",
    description: "Hands-on implementation, debugging runtime errors, and comparison of from-scratch vs library models.",
    level3: "Executes independently; diagnoses and corrects exceptions, tensor shapes, and convergence issues.",
    level2: "Executes with occasional faculty/TA hints; resolves common syntax and import errors.",
    level1: "Unable to run or debug code without complete assistance; fails to achieve convergence.",
    weight: "20%",
  },
  {
    name: "Punctuality & Timely Submission",
    description: "Adherence to lab schedule, on-time check-in, and timely submission of experiment assignments.",
    level3: "Always on time for practical sessions; completes and verifies experiments within designated slot.",
    level2: "Minor delays in check-in or submission within the grace window.",
    level1: "Consistent delays, chronic late submissions, or unexcused absenteeism.",
    weight: "20%",
  },
  {
    name: "Lab Ethics & Professional Conduct",
    description: "Adherence to institutional laboratory conduct, original code development, and workstation etiquette.",
    level3: "Strict adherence to academic honesty; original code synthesis; maintains workstation cleanliness.",
    level2: "Minor lapses in workstation discipline; responds immediately to faculty instructions.",
    level1: "Plagiarism, unauthorized software usage, or disregard for lab decorum.",
    weight: "20%",
  },
];

export const labDos = [
  "Wearing college ID-Card is strictly compulsory before entering Lab 06.",
  "Read the experiment Aim, Theory, and Algorithm beforehand to ensure maximum session productivity.",
  "Shut down your workstation properly and arrange lab chairs before vacating the laboratory.",
  "Verify code convergence and check evaluation metrics (R², MSE, Accuracy, Confusion Matrix) with faculty.",
  "Report any workstation hardware or network anomalies to the technical staff immediately.",
];

export const labDonts = [
  "Do not bring eatables, beverages, or unnecessary personal baggage to the computer workbench.",
  "Do not plagiarize or blindly copy-paste solutions without conceptual comprehension.",
  "Do not step on electrical trunking, peripheral cabling, or disconnect network interfaces.",
  "Do not alter system configurations, browser settings, or install unauthorized software.",
  "Do not leave the laboratory session without submitting the continuous assessment sign-off.",
];
