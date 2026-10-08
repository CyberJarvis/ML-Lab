"use client";

import { useState } from "react";
import Link from "next/link";

interface SimTab {
  id: string;
  name: string;
  exNumber: string;
  link: string;
  code: string;
  metrics: { label: string; value: string; color?: string }[];
  status: string;
  renderPlot: () => React.ReactNode;
}

const TABS: SimTab[] = [
  {
    id: "linear-regression",
    name: "Linear Regression",
    exNumber: "EXPT 01",
    link: "/experiments/simple-linear-regression",
    code: `# Approach 1: Closed-form Least Squares
x_bar, y_bar = np.mean(X), np.mean(y)
beta_1 = np.sum((X - x_bar)*(y - y_bar)) / np.sum((X - x_bar)**2)
beta_0 = y_bar - beta_1 * x_bar

# Approach 3: scikit-learn model verification
model = LinearRegression().fit(X_train, y_train)
y_pred = model.predict(X_test)
r2 = model.score(X_test, y_test)  # R²: 0.948`,
    status: "Converged · 100 Epochs",
    metrics: [
      { label: "R² Determination", value: "0.948", color: "text-emerald-400" },
      { label: "Mean Squared Error", value: "2.142", color: "text-sky-400" },
      { label: "Slope (β₁)", value: "2.871", color: "text-amber-400" },
      { label: "Intercept (β₀)", value: "1.420", color: "text-indigo-400" },
    ],
    renderPlot: () => (
      <svg viewBox="0 0 160 110" className="w-full">
        {/* Grid axes */}
        <line x1="16" y1="94" x2="150" y2="94" stroke="#334155" strokeWidth="1" />
        <line x1="16" y1="94" x2="16" y2="10" stroke="#334155" strokeWidth="1" />
        <line x1="16" y1="66" x2="150" y2="66" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="16" y1="38" x2="150" y2="38" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3,3" />
        {/* Confidence interval band */}
        <polygon
          points="20,90 144,22 144,32 20,96"
          fill="#6366f1"
          opacity="0.15"
        />
        {/* Best fit line */}
        <line x1="20" y1="92" x2="144" y2="24" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Scatter points */}
        {[
          [28, 86],
          [38, 80],
          [48, 74],
          [58, 68],
          [68, 60],
          [82, 54],
          [94, 46],
          [106, 42],
          [118, 34],
          [130, 28],
          [140, 22],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" stroke="#0891b2" strokeWidth="1" />
        ))}
      </svg>
    ),
  },
  {
    id: "logistic-regression",
    name: "Logistic Sigmoid",
    exNumber: "EXPT 04",
    link: "/experiments/logistic-regression",
    code: `# Sigmoid activation & Binary Cross-Entropy
def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

# Gradient descent update for weights w
y_hat = sigmoid(X @ w + b)
loss = -np.mean(y*np.log(y_hat) + (1-y)*np.log(1-y_hat))
dw = (1/m) * (X.T @ (y_hat - y))
w -= alpha * dw`,
    status: "Log-Loss: 0.124 · Validated",
    metrics: [
      { label: "Classification Acc", value: "96.4%", color: "text-emerald-400" },
      { label: "Binary Log-Loss", value: "0.124", color: "text-sky-400" },
      { label: "Decision Boundary", value: "z = 0.0", color: "text-amber-400" },
      { label: "Learning Rate (α)", value: "0.05", color: "text-indigo-400" },
    ],
    renderPlot: () => (
      <svg viewBox="0 0 160 110" className="w-full">
        <line x1="16" y1="94" x2="150" y2="94" stroke="#334155" strokeWidth="1" />
        <line x1="80" y1="94" x2="80" y2="10" stroke="#475569" strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1="16" y1="52" x2="150" y2="52" stroke="#334155" strokeWidth="0.6" strokeDasharray="3,3" />
        {/* Sigmoid S-Curve */}
        <path
          d="M 20,92 C 55,92 65,90 80,52 C 95,14 105,12 144,12"
          fill="none"
          stroke="#f43f5e"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Class 0 points at bottom */}
        {[
          [24, 94],
          [34, 94],
          [44, 94],
          [54, 94],
          [64, 94],
        ].map(([x, y], i) => (
          <circle key={`c0-${i}`} cx={x} cy={y} r="3" fill="#60a5fa" />
        ))}
        {/* Class 1 points at top */}
        {[
          [96, 12],
          [108, 12],
          [118, 12],
          [128, 12],
          [138, 12],
        ].map(([x, y], i) => (
          <circle key={`c1-${i}`} cx={x} cy={y} r="3" fill="#34d399" />
        ))}
        {/* Threshold label */}
        <text x="84" y="50" fill="#94a3b8" fontSize="8" fontFamily="monospace">
          Threshold 0.5
        </text>
      </svg>
    ),
  },
  {
    id: "random-forest",
    name: "Random Forest",
    exNumber: "EXPT 05",
    link: "/experiments/random-forest",
    code: `# Ensemble Learning: Bagging + Feature Subsampling
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    oob_score=True,
    random_state=42
)
rf.fit(X_train, y_train)
oob_acc = rf.oob_score_  # 95.8%`,
    status: "100 Estimators · OOB Active",
    metrics: [
      { label: "Out-of-Bag (OOB)", value: "95.8%", color: "text-emerald-400" },
      { label: "Ensemble Trees", value: "100", color: "text-sky-400" },
      { label: "Max Depth", value: "5", color: "text-amber-400" },
      { label: "Macro F1-Score", value: "0.961", color: "text-indigo-400" },
    ],
    renderPlot: () => (
      <svg viewBox="0 0 160 110" className="w-full">
        {/* Decision Regions */}
        <rect x="16" y="10" width="64" height="84" fill="#3b82f6" opacity="0.2" />
        <rect x="80" y="10" width="70" height="42" fill="#10b981" opacity="0.2" />
        <rect x="80" y="52" width="70" height="42" fill="#f59e0b" opacity="0.2" />
        {/* Dividing boundaries */}
        <line x1="80" y1="10" x2="80" y2="94" stroke="#818cf8" strokeWidth="1.5" />
        <line x1="80" y1="52" x2="150" y2="52" stroke="#818cf8" strokeWidth="1.5" />
        {/* Scatter dots in each region */}
        {[
          [35, 30],
          [45, 60],
          [60, 45],
          [28, 75],
        ].map(([x, y], i) => (
          <circle key={`r1-${i}`} cx={x} cy={y} r="3" fill="#60a5fa" />
        ))}
        {[
          [100, 25],
          [120, 35],
          [135, 20],
        ].map(([x, y], i) => (
          <circle key={`r2-${i}`} cx={x} cy={y} r="3" fill="#34d399" />
        ))}
        {[
          [95, 75],
          [115, 65],
          [130, 80],
        ].map(([x, y], i) => (
          <circle key={`r3-${i}`} cx={x} cy={y} r="3" fill="#fbbf24" />
        ))}
      </svg>
    ),
  },
  {
    id: "svm",
    name: "SVM Kernels",
    exNumber: "EXPT 07",
    link: "/experiments/support-vector-machine",
    code: `# Support Vector Machine: Maximum Margin Hyperplane
from sklearn.svm import SVC

clf = SVC(kernel='rbf', C=1.0, gamma='scale')
clf.fit(X_train, y_train)

# Identified support vectors on boundary
support_vectors = clf.support_vectors_
n_sv = clf.n_support_  # [9, 9]`,
    status: "RBF Kernel · Margin Max",
    metrics: [
      { label: "Support Vectors", value: "18", color: "text-emerald-400" },
      { label: "Kernel Function", value: "RBF (γ)", color: "text-sky-400" },
      { label: "Margin Regularization", value: "C = 1.0", color: "text-amber-400" },
      { label: "Test Accuracy", value: "97.5%", color: "text-indigo-400" },
    ],
    renderPlot: () => (
      <svg viewBox="0 0 160 110" className="w-full">
        {/* Optimal Hyperplane */}
        <line x1="20" y1="90" x2="140" y2="20" stroke="#38bdf8" strokeWidth="2" />
        {/* Margins */}
        <line x1="10" y1="80" x2="130" y2="10" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="30" y1="100" x2="150" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
        {/* Points */}
        {[
          [35, 60],
          [50, 45],
          [70, 30],
        ].map(([x, y], i) => (
          <circle key={`s1-${i}`} cx={x} cy={y} r="3" fill="#818cf8" />
        ))}
        {[
          [90, 80],
          [110, 65],
          [130, 50],
        ].map(([x, y], i) => (
          <circle key={`s2-${i}`} cx={x} cy={y} r="3" fill="#f43f5e" />
        ))}
        {/* Highlighted Support Vectors with ring */}
        <circle cx="50" cy="45" r="5.5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="110" cy="65" r="5.5" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "pca",
    name: "PCA Projection",
    exNumber: "EXPT 10",
    link: "/experiments/principal-component-analysis",
    code: `# Dimensionality Reduction: Eigendecomposition
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X_scaled)

# Explained variance ratios
exp_var = pca.explained_variance_ratio_
# PC1: 72.4% · PC2: 18.1% (Total: 90.5%)`,
    status: "90.5% Variance Retained",
    metrics: [
      { label: "Retained Variance", value: "90.5%", color: "text-emerald-400" },
      { label: "Component 1 (PC1)", value: "72.4%", color: "text-sky-400" },
      { label: "Component 2 (PC2)", value: "18.1%", color: "text-amber-400" },
      { label: "Dimension Shift", value: "13D → 2D", color: "text-indigo-400" },
    ],
    renderPlot: () => (
      <svg viewBox="0 0 160 110" className="w-full">
        <line x1="80" y1="10" x2="80" y2="94" stroke="#334155" strokeWidth="1" />
        <line x1="16" y1="52" x2="150" y2="52" stroke="#334155" strokeWidth="1" />
        {/* Eigenvectors */}
        <line x1="80" y1="52" x2="135" y2="30" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="80" y1="52" x2="68" y2="20" stroke="#a855f7" strokeWidth="1.5" />
        {/* Projected clusters */}
        {[
          [50, 40],
          [60, 48],
          [55, 60],
          [45, 52],
        ].map(([x, y], i) => (
          <circle key={`pc1-${i}`} cx={x} cy={y} r="2.5" fill="#38bdf8" />
        ))}
        {[
          [110, 45],
          [120, 38],
          [125, 50],
          [105, 55],
        ].map(([x, y], i) => (
          <circle key={`pc2-${i}`} cx={x} cy={y} r="2.5" fill="#34d399" />
        ))}
      </svg>
    ),
  },
];

export default function HeroLabSimulator() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-700/60 bg-[#0d1424] shadow-2xl backdrop-blur-md">
      {/* Top Chrome: OS controls + Tab switcher */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] font-semibold text-slate-400">
            Interactive Pyodide Workbench
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
            {activeTab.status}
          </span>
          <Link
            href={activeTab.link}
            className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            <span>Launch IDE</span>
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-white/[0.06] bg-black/40 px-2 py-1.5 scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab)}
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab.id === tab.id
                ? "bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/40"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
            }`}
          >
            <span className="font-mono text-[10px] text-slate-500">{tab.exNumber}:</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Code Editor and Output Display */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Python Code snippet */}
        <div className="md:col-span-7 border-b md:border-b-0 md:border-r border-white/[0.08] p-4 font-mono text-[11.5px] leading-relaxed text-slate-300 bg-[#090e18]">
          <pre className="overflow-x-auto whitespace-pre font-mono">
            {activeTab.code}
          </pre>
          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-2 text-[10px] text-slate-500">
            <span>CPython 3.12 · Pyodide WebAssembly</span>
            <span className="text-emerald-400 font-semibold">Zero-install local execution</span>
          </div>
        </div>

        {/* Live Plot & Performance Telemetry */}
        <div className="md:col-span-5 flex flex-col justify-between bg-black/30 p-4">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
              <span>Matplotlib Plot Output</span>
              <span className="text-brand-400 font-bold">{activeTab.exNumber}</span>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl bg-slate-950/60 p-2 border border-white/[0.05]">
              {activeTab.renderPlot()}
            </div>
          </div>

          {/* Telemetry metrics */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {activeTab.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-[10.5px] font-mono"
              >
                <div className="text-slate-500 text-[9.5px]">{m.label}</div>
                <div className={`font-bold ${m.color || "text-slate-200"}`}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
