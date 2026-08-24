# ML Virtual Lab — Presentation Script

**Duration: ~10–12 minutes (live demo) + Q&A**
**Course: CSC701 Machine Learning · SIES Graduate School of Technology · University of Mumbai**

---

## 1. Opening (30 sec)

> "Good [morning/afternoon] everyone. I'm presenting the **ML Virtual Lab** — a browser-based virtual laboratory for the CSC701 Machine Learning course, built in the style of the IIT Virtual Labs.
>
> The core idea: every student gets a full Python machine learning environment — no installs, no setup, no 'it works on my machine' — just a browser tab. Let me show you what that means."

*(Open `localhost:3111` on screen before you start talking, so it's loaded and ready.)*

---

## 2. The Problem (1 min)

> "Traditionally, an ML lab course has friction before the learning even starts:
> - Students need Python, NumPy, scikit-learn, matplotlib installed correctly.
> - Different OS, different Python versions, broken pip environments — hours lost to setup, not learning.
> - Lab manuals are static PDFs — theory, code, and results are three separate things you juggle.
>
> We wanted one place where a student reads the theory, writes real Python, runs it, sees the plot, and takes a quiz — all in one tab, and all *offline-capable* after first load."

---

## 3. The Solution — High-Level (1 min)

> "ML Virtual Lab runs an actual CPython interpreter *inside the browser*, using a project called **Pyodide** — Python compiled to WebAssembly. That means:
> - Real NumPy, real scikit-learn, real matplotlib — not a simulation, not a subset.
> - Everything executes on the student's machine. Nothing is sent to a server. No accounts, no tracking.
> - It covers all **10 experiments** in the CSC701 syllabus, from Simple Linear Regression through PCA, each following the full 8-section Virtual Labs structure: Aim, Theory, Pretest, Procedure, Simulation, Posttest, Further Readings, Feedback."

---

## 4. Live Demo Walkthrough (5–6 min)

### 4a. Landing page (30 sec)
*(Navigate to `/`)*
> "This is the overview page. Ten experiments, six syllabus modules, three lab outcomes, zero installs needed — that last stat is the whole pitch. Notice the theme toggle here [click sun/moon icon] — the entire site supports light and dark mode, including the code editor itself, not just the page chrome."

### 4b. Theory page (30 sec)
*(Navigate to `/theory`)*
> "This is the full official CSC701 syllabus — every module, every sub-topic, straight from the course document — mapped to the experiment that puts it into practice. So a student studying 'Ensemble Learning' can jump directly to the Random Forest or AdaBoost experiment from here."

### 4c. Experiments library (30 sec)
*(Navigate to `/experiments`)*
> "All ten experiments, filterable by lab outcome or topic — Regression, Classification, Ensemble Learning, Clustering, Dimensionality Reduction. Each card shows the experiment number, the outcome it maps to, and a one-line aim."

### 4d. Open an experiment — the 8-section structure (1 min)
*(Click into Experiment 1 — Simple Linear Regression)*
> "This is the full lab experience for one experiment. On the left, the section spine: **Aim, Theory, Pretest, Procedure, Simulation, Posttest, Further Readings, Feedback** — that's the standard Virtual Labs format.
>
> - **Aim** — what we're implementing and why.
> - **Theory** — the background math, rendered inline.
> - **Pretest** — five auto-graded questions to check prerequisites *before* touching code.
> - **Procedure** — step-by-step what to do in the simulation.
> - **Posttest** — five more questions, this time about the output you'll only have seen by actually running the code.
> - **Further Readings** — textbook and paper references, ISLR, ESL, the original papers where relevant.
> - **Feedback** — a quick rating, kept entirely in the browser."

### 4e. The Simulation — the centerpiece (2–3 min)
*(Click "Simulation")*
> "This is where it gets interesting. Clicking Simulation opens a full-screen IDE — built to feel like VS Code, not a toy code box.
>
> - Activity bar on the left — Aim, Theory, Procedure, Further Readings pop out as a docs sidebar without leaving the editor.
> - A real Monaco editor — the same editor that powers VS Code — with Python syntax highlighting.
> - **Starter** code has TODO markers; **Solution** loads a complete, clean implementation. Both are fully editable — this is a real interpreter, not a fixed demo.
>
> Let me hit **Run**."
*(Click Run — narrate while it loads first time)*
> "First run downloads the Python runtime and the scientific stack — about 25MB, cached after that. Every run after this is instant."
*(Once it finishes)*
> "And there it is — real console output, and a real matplotlib figure, rendered as an image, generated entirely client-side. I can edit any line and re-run immediately."

### 4f. The "compiler-like" guarantees (1 min)
> "A few things we specifically engineered so this behaves like a real compiler, not a fragile sandbox:
> 1. **Tracebacks point at the student's own line numbers** — not some wrapper script.
> 2. **Figures appear whether or not you call `plt.show()`** — because students forget, and it shouldn't matter.
> 3. If you import something that genuinely can't run in WebAssembly — say, `torch` — it's caught *before* execution and you get a clear explanation, with an alternative. Let me show that."
*(Type `import torch` in Starter, hit Run)*
> "See — it's blocked pre-flight with guidance: 'PyTorch needs a native backend; use scikit-learn's equivalent inside this lab, or run this locally with `pip install torch`.' Nothing crashes, nothing hangs."

---

## 5. Technical Architecture (1.5 min)

> "Under the hood, a few key decisions:
>
> - **Next.js 15 / React 19 / TypeScript**, deployed as a static-first app.
> - **Pyodide 314.0.5** — Python 3.14.2 with NumPy, SciPy, scikit-learn, pandas, matplotlib, networkx pre-bundled, plus on-demand installs via micropip for packages like seaborn.
> - A shared **`LabRuntime`** class runs identically in the browser *and* in our test suite — so what we verify in CI is exactly what the student's browser executes, not an approximation.
> - **Import scanning** classifies every import in the student's code before running it — standard library, bundled, installable from PyPI, or genuinely unsupported — so the block-with-guidance behavior is deterministic, not a runtime crash.
> - All 10 experiments were rewritten from scratch against the official lab manual, each with a from-scratch algorithmic implementation alongside the scikit-learn version — for example, Experiment 9 implements EM/Gaussian Mixture by hand, not just via `sklearn.mixture.GaussianMixture`."

---

## 6. Testing & Verification (1 min)

> "Because this claims to run real ML code reliably, we don't just assert that — we verify it:
> - A Node-based script runs all 20 code blocks — 10 starter, 10 solution — headlessly through Pyodide.
> - A behavioral suite checks 16 specific guarantees: traceback accuracy, figure capture with and without `plt.show()`, blocked-package messaging, state persistence, and more.
> - A full Playwright browser suite drives an actual Chromium instance through every experiment, clicking Simulation → Solution → Run, and asserts a real figure renders with zero console errors — across all 10 experiments, in both light and dark mode."

---

## 7. Closing (30 sec)

> "So — to summarize: ML Virtual Lab takes the CSC701 syllabus and turns it into ten fully interactive labs, each with real theory, a real Python IDE, auto-graded assessments, and zero setup — running entirely in the student's browser, with nothing ever leaving their machine.
>
> Happy to take questions, or walk through any specific experiment in more depth."

---

## Anticipated Q&A

**Q: Is this actually running Python, or is it faking output?**
> It's genuine CPython 3.14 compiled to WebAssembly via Pyodide — the same interpreter, actually executing the student's exact source. You can prove it by introducing a syntax error; the traceback points at the real line.

**Q: What about packages that can't run in the browser, like PyTorch or TensorFlow?**
> They're detected before execution and blocked with specific guidance — e.g., "install torch locally, or use scikit-learn's linear model here instead" — rather than crashing or hanging.

**Q: Does this replace the physical/local Python lab?**
> No — it's a zero-friction on-ramp and a consistent grading/practice environment. Students who want GPU-backed deep learning still work locally; this covers the classical ML syllabus completely.

**Q: How is this different from Jupyter/Colab?**
> No account, no cloud execution, nothing leaves the browser, and it's purpose-built around the syllabus — theory, pretest, procedure, and posttest are structurally part of each experiment, not bolted on.

**Q: What happens if the student's code never terminates (infinite loop)?**
> *(If asked — be honest about current limitations here rather than overclaiming.)* Currently there's no execution timeout in the runtime; that's a known area for hardening if this goes further.
