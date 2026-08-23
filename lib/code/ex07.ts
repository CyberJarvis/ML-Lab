export const ex07 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, Y = make_classification(n_samples=200, n_features=2, n_redundant=0,
                           n_informative=2, n_clusters_per_class=1,
                           class_sep=1.2, random_state=42)
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.3, random_state=42, stratify=Y)

kernels = ["linear", "rbf", "poly"]
models = {}

# TODO 1: for each kernel, fit SVC(kernel=k, C=1.0) on the training data,
#         store it in models[k], and print its test accuracy plus
#         model.n_support_ (support vectors per class).
for kernel in kernels:
    pass

# TODO 2: C controls the margin/violation trade-off. Fit a linear SVC for
#         C in [0.01, 0.1, 1, 10, 100] and print how the support-vector count
#         changes. Small C -> wide margin, many support vectors.

# TODO 3: plot the decision regions. Build a meshgrid over the feature range,
#         call model.predict on the flattened grid, reshape, and contourf it.
plt.figure(figsize=(7, 5))
plt.scatter(X[:, 0], X[:, 1], c=Y, cmap="RdYlBu", edgecolor="k", s=30)
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

X, Y = make_classification(n_samples=200, n_features=2, n_redundant=0,
                           n_informative=2, n_clusters_per_class=1,
                           class_sep=1.2, random_state=42)
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.3, random_state=42, stratify=Y)

kernels = ["linear", "rbf", "poly"]
models = {}

for kernel in kernels:
    model = SVC(kernel=kernel, C=1.0, gamma="scale", degree=3).fit(X_train, Y_train)
    models[kernel] = model
    accuracy = accuracy_score(Y_test, model.predict(X_test))
    print(f"{kernel:>6}  accuracy={accuracy:.4f}  "
          f"support vectors={model.n_support_} of {len(X_train)} training points")

print("\\nconfusion matrix (rbf):")
print(confusion_matrix(Y_test, models["rbf"].predict(X_test)))

# C is the penalty for margin violations. A small C tolerates more of them, which
# widens the margin and pulls more points in as support vectors.
print("\\nC      accuracy  support vectors")
c_values = [0.01, 0.1, 1.0, 10.0, 100.0]
c_support = []
for C in c_values:
    model = SVC(kernel="linear", C=C).fit(X_train, Y_train)
    total = int(model.n_support_.sum())
    c_support.append(total)
    print(f"{C:>6}  {accuracy_score(Y_test, model.predict(X_test)):.4f}    {total}")


def draw_decision_regions(ax, model, title):
    pad, step = 0.8, 0.02
    xx, yy = np.meshgrid(
        np.arange(X[:, 0].min() - pad, X[:, 0].max() + pad, step),
        np.arange(X[:, 1].min() - pad, X[:, 1].max() + pad, step),
    )
    grid = np.c_[xx.ravel(), yy.ravel()]

    # decision_function gives the signed distance to the hyperplane, so the
    # ±1 contours are the margin itself rather than just the boundary.
    distance = model.decision_function(grid).reshape(xx.shape)
    ax.contourf(xx, yy, distance > 0, alpha=0.2, cmap="RdYlBu")
    ax.contour(xx, yy, distance, levels=[-1, 0, 1], colors="k",
               linestyles=["--", "-", "--"], linewidths=[1, 2, 1])
    ax.scatter(X_train[:, 0], X_train[:, 1], c=Y_train, cmap="RdYlBu",
               edgecolor="k", s=28, zorder=3)
    ax.scatter(model.support_vectors_[:, 0], model.support_vectors_[:, 1],
               s=110, facecolor="none", edgecolor="#f59e0b", linewidths=1.8, zorder=4)
    ax.set_title(title)
    ax.set_xlabel("Feature 1")


fig, axes = plt.subplots(1, 4, figsize=(19, 4.6))

for ax, kernel in zip(axes, kernels):
    accuracy = accuracy_score(Y_test, models[kernel].predict(X_test))
    draw_decision_regions(ax, models[kernel], f"{kernel} kernel — {accuracy:.3f}")
axes[0].set_ylabel("Feature 2")

axes[3].plot(c_values, c_support, "o-", color="#4f46e5", lw=2.2, ms=7)
axes[3].set_xscale("log")
axes[3].set_title("Smaller C keeps more support vectors")
axes[3].set_xlabel("C (penalty)")
axes[3].set_ylabel("Support vectors")
axes[3].grid(alpha=0.3)

plt.tight_layout()
plt.show()

print("\\nSolid line = hyperplane, dashed lines = the margin, ringed points = support"
      "\\nvectors. Only those points determine the boundary; the rest could be deleted.")
`,
};
