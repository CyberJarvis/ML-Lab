export const ex10 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA

iris = load_iris()
X, Y = iris.data, iris.target
print(f"{X.shape[0]} samples described by {X.shape[1]} features")

# TODO 1: standardise. Every feature must have mean 0 and standard deviation 1,
#         otherwise the feature measured in the largest units dominates.
#         X_std = (X - X.mean(axis=0)) / X.std(axis=0)
X_std = X

# TODO 2: covariance matrix of the standardised data:
#         C = (X_stdᵀ @ X_std) / (n - 1)
covariance = None

# TODO 3: eigenvalues and eigenvectors. Use np.linalg.eigh — the covariance
#         matrix is symmetric, so eigh is both faster and more accurate here.
eigenvalues, eigenvectors = None, None

# TODO 4: eigh returns them in ascending order. Reverse so the component that
#         explains the most variance comes first.

# TODO 5: project onto the first two components: X_pca = X_std @ eigenvectors[:, :2]
X_pca = None

# TODO 6: the explained variance ratio is eigenvalues / eigenvalues.sum().
#         Print it, then confirm it matches PCA(n_components=2) from sklearn.

plt.figure(figsize=(7, 5))
# TODO 7: scatter X_pca coloured by Y, with one label per iris species
plt.xlabel("PC1")
plt.ylabel("PC2")
plt.grid(alpha=0.3)
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA

iris = load_iris()
X, Y = iris.data, iris.target
species = list(iris.target_names)
features = [name.replace(" (cm)", "") for name in iris.feature_names]
n, d = X.shape

print(f"{n} samples described by {d} features: {features}")

# Step 1 — standardise, so a feature is not favoured merely for its units.
X_std = (X - X.mean(axis=0)) / X.std(axis=0, ddof=1)

# Step 2 — covariance. On standardised data this is the correlation matrix.
covariance = (X_std.T @ X_std) / (n - 1)
print("\\ncorrelation between features:")
print(np.round(covariance, 3))

# Step 3 & 4 — eigendecomposition, largest eigenvalue first.
eigenvalues, eigenvectors = np.linalg.eigh(covariance)
order = eigenvalues.argsort()[::-1]
eigenvalues, eigenvectors = eigenvalues[order], eigenvectors[:, order]

ratio = eigenvalues / eigenvalues.sum()
cumulative = np.cumsum(ratio)

print("\\ncomponent  eigenvalue  variance  cumulative")
for i, (value, share, total) in enumerate(zip(eigenvalues, ratio, cumulative), start=1):
    print(f"   PC{i}       {value:6.4f}     {share:6.2%}    {total:6.2%}")

# Step 5 — project onto the leading two components.
X_pca = X_std @ eigenvectors[:, :2]

# Step 6 — the library agrees. Signs may flip: an eigenvector and its negative
# describe the same axis, so compare magnitudes.
sklearn_pca = PCA(n_components=2).fit(X_std)
X_sklearn = sklearn_pca.transform(X_std)

print(f"\\nsklearn explained variance ratio: {np.round(sklearn_pca.explained_variance_ratio_, 4)}")
print(f"from scratch:                     {np.round(ratio[:2], 4)}")
print(f"largest projection difference: {np.abs(np.abs(X_pca) - np.abs(X_sklearn)).max():.2e}")
print(f"\\n4 dimensions reduced to 2 while keeping {cumulative[1]:.2%} of the variance")

palette = ["#4f46e5", "#10b981", "#f59e0b"]
fig, (ax_scatter, ax_scree, ax_loadings) = plt.subplots(1, 3, figsize=(17, 5.2))

for i, name in enumerate(species):
    member = Y == i
    ax_scatter.scatter(X_pca[member, 0], X_pca[member, 1], s=45, color=palette[i],
                       edgecolor="k", lw=0.6, label=name)
ax_scatter.axhline(0, color="#94a3b8", lw=0.7)
ax_scatter.axvline(0, color="#94a3b8", lw=0.7)
ax_scatter.set_title("Iris projected onto its first two components")
ax_scatter.set_xlabel(f"PC1 — {ratio[0]:.1%} of variance")
ax_scatter.set_ylabel(f"PC2 — {ratio[1]:.1%} of variance")
ax_scatter.legend()
ax_scatter.grid(alpha=0.25)

components = np.arange(1, d + 1)
ax_scree.bar(components, ratio, color="#4f46e5", alpha=0.85, label="Individual")
ax_scree.plot(components, cumulative, "o-", color="#ef4444", lw=2.2, label="Cumulative")
ax_scree.axhline(0.95, ls="--", color="#94a3b8", lw=1.4)
for x, value in zip(components, cumulative):
    ax_scree.text(x, value + 0.03, f"{value:.2f}", ha="center", fontsize=9)
ax_scree.set_xticks(components, [f"PC{i}" for i in components])
ax_scree.set_ylim(0, 1.12)
ax_scree.set_title("Scree plot — two components suffice")
ax_scree.set_ylabel("Variance explained")
ax_scree.legend(loc="center right")
ax_scree.grid(alpha=0.3, axis="y")

# Loadings show which original measurements each component is built from.
image = ax_loadings.imshow(eigenvectors[:, :2].T, cmap="RdBu", vmin=-1, vmax=1)
ax_loadings.set_xticks(range(d), features, rotation=30, ha="right", fontsize=9)
ax_loadings.set_yticks(range(2), ["PC1", "PC2"])
ax_loadings.set_title("Loadings — how each feature contributes")
for i in range(2):
    for j in range(d):
        ax_loadings.text(j, i, f"{eigenvectors[j, i]:.2f}", ha="center", va="center",
                         fontsize=9, fontweight="bold")
fig.colorbar(image, ax=ax_loadings, shrink=0.6)

plt.tight_layout()
plt.show()

print("\\nPC1 is essentially overall flower size — petal length, petal width and"
      "\\nsepal length all load onto it together, which is why one axis separates"
      "\\nsetosa from the other two species almost perfectly.")
`,
};
