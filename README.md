# 🧪 Machine Learning Virtual Lab

An interactive virtual laboratory for the **Machine Learning** course at **SIES Graduate School of Technology, University of Mumbai** (Course Codes: CEL701 / CSL7001, BE / Semester VII, R-2019).

Students can read the theory for each experiment, write Python code in a professional editor, and run it **entirely in the browser** — no installation, no server, no setup. Powered by **Pyodide** (CPython compiled to WebAssembly).

## ✨ Features

- **10 complete experiments** mapped to 3 Lab Outcomes (LO1–LO3)
- **Real Python execution** in the browser via Pyodide (NumPy, SciPy, scikit-learn, matplotlib, pandas, networkx)
- **Monaco code editor** (the same engine as VS Code) with Python syntax highlighting
- **Live output** — console output + matplotlib figures rendered in real-time
- **Theory & instructions** for every experiment (Aim, Theory, Algorithm, How-To, Key Concepts)
- **Starter code** with TODO markers + **complete solution code** for each experiment
- **Fully responsive** — works on desktop, tablet, and mobile
- **No backend** — everything runs client-side; deploy as a static site

## 📋 Experiments

| # | Experiment | LO |
|---|-----------|-----|
| 1 | Simple Linear Regression (direct, gradient descent, sklearn) | LO1 |
| 2 | Multiple Linear Regression (normal equation, GD, sklearn) | LO1 |
| 3 | Multivariate Linear Regression (multiple DVs, matrix method) | LO1 |
| 4 | Logistic Regression (sigmoid, cross-entropy, gradient descent) | LO2 |
| 5 | Ensemble Learning: Random Forest | LO2 |
| 6 | Ensemble Learning: AdaBoost | LO2 |
| 7 | Support Vector Machine (linear, RBF, poly kernels) | LO2 |
| 8 | Divisive Clustering based on Minimum Spanning Tree (MST) | LO2 |
| 9 | Expectation Maximization Algorithm (Gaussian Mixture Model) | LO3 |
| 10 | Principal Component Analysis (from scratch + sklearn) | LO3 |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org/) | React framework (App Router, TypeScript) |
| [Pyodide](https://pyodide.org/) v0.27.2 | CPython compiled to WebAssembly — runs Python in the browser |
| [@monaco-editor/react](https://github.com/suren-atoyan/monaco-editor) | Code editor (VS Code engine) |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| scikit-learn, NumPy, SciPy, matplotlib | Scientific Python libraries (loaded via Pyodide) |

## 📖 How to Use

1. Navigate to **Experiments** and select any experiment.
2. Read the **Aim**, **Theory**, **Algorithm**, and **How To** tabs on the left panel.
3. The code editor on the right is pre-loaded with **starter code** containing TODO markers. Complete the code or click **Load Solution**.
4. Click the green **Run** button. The first run downloads the Pyodide Python engine (~10 MB) — please be patient. Subsequent runs are instant.
5. View text output in the **Console** tab and matplotlib figures in the **Plots** tab.
6. Edit the code and re-run as many times as you like!

## 📁 Project Structure

```
ml-virtual-lab/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Pyodide provider + navbar)
│   ├── page.tsx                  # Home page (hero, features, experiment grid)
│   ├── about/page.tsx            # About (course info, safety rules, evaluation)
│   └── experiments/
│       ├── page.tsx              # All experiments (grouped by LO)
│       └── [id]/page.tsx         # Individual experiment workspace
├── components/
│   ├── PyodideProvider.tsx       # Loads Pyodide, manages packages, runs code
│   ├── CodeEditor.tsx            # Monaco editor wrapper
│   ├── CodeLab.tsx               # Editor + Run button + Output + Plots
│   ├── LabWorkspace.tsx          # Split layout (theory | code)
│   ├── TheoryPanel.tsx           # Tabbed theory/instructions panel
│   ├── ExperimentCard.tsx        # Experiment card for grids
│   ├── Navbar.tsx                # Top navigation
│   ├── LOBadge.tsx               # Lab Outcome badge
│   └── PyodideStatus.tsx         # Pyodide loading status indicator
├── lib/
│   ├── experiments.ts            # Types + lab outcomes + course info
│   ├── experiments-data.ts       # All 10 experiments (theory + instructions)
│   └── code/
│       ├── ex01.ts ... ex10.ts   # Python code (starter + solution) per experiment
└── package.json
```

## ⚠️ Notes

- The **first Run** on any experiment page downloads Pyodide (~10 MB) and scientific packages. This takes several seconds. After that, Python stays loaded and all subsequent runs are instant.
- Pyodide runs in the browser's main thread. Very large datasets or long computations may cause the UI to freeze temporarily.
- An internet connection is required for the initial Pyodide download (from the jsdelivr CDN). After that, the app works offline (the engine is cached by the browser).

## 📚 Source Material

This virtual lab is based on the official lab manual:
- **Final ML Lab Manual SH 2024** — SIES GST, Department of Computer Engineering
- **ML Experiment List FH 2026** — Course CEL701, BE/VII
