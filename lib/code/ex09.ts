export const ex09 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.mixture import GaussianMixture

X, truth = make_blobs(n_samples=300, centers=3, cluster_std=1.5, random_state=42)
print(f"{X.shape[0]} points in {X.shape[1]} dimensions")

# TODO 1: fit GaussianMixture(n_components=3, random_state=42, n_init=5) on X.
#         fit() runs the E and M steps internally until the log-likelihood stops
#         improving.
gmm = None

# TODO 2: print gmm.converged_, gmm.n_iter_, gmm.weights_ and gmm.means_,
#         then get the hard cluster assignment with gmm.predict(X).
labels = np.zeros(len(X), dtype=int)

# TODO 3: predict_proba(X) returns the responsibilities — the probability that
#         each point came from each component. Print the responsibilities of the
#         point the model is least certain about (the row with the lowest max).

# TODO 4: fit a GMM for k in 1..6 and record gmm.bic(X). Lowest BIC wins.
bics = []

plt.figure(figsize=(7, 5))
plt.scatter(X[:, 0], X[:, 1], s=25, c=labels, cmap="viridis")
# TODO 5: mark each component mean with a large X marker
plt.xlabel("x1")
plt.ylabel("x2")
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
from sklearn.datasets import make_blobs
from sklearn.mixture import GaussianMixture
from sklearn.metrics import adjusted_rand_score

X, truth = make_blobs(n_samples=300, centers=3, cluster_std=1.5, random_state=42)
n, d = X.shape
K = 3
print(f"{n} points in {d} dimensions, fitting {K} Gaussian components")


def gaussian_density(X, mean, covariance):
    """Multivariate normal density, evaluated for every row of X at once."""
    delta = X - mean
    inverse = np.linalg.inv(covariance)
    exponent = -0.5 * np.einsum("ij,jk,ik->i", delta, inverse, delta)
    norm = np.sqrt((2 * np.pi) ** X.shape[1] * np.linalg.det(covariance))
    return np.exp(exponent) / norm


def em_fit(X, K, iterations=100, tol=1e-6, seed=42):
    """Expectation-Maximization for a Gaussian mixture, written out in full."""
    rng = np.random.default_rng(seed)
    n, d = X.shape

    weights = np.full(K, 1 / K)
    means = X[rng.choice(n, K, replace=False)]
    covariances = np.array([np.cov(X.T) for _ in range(K)])

    history = []
    for step in range(iterations):
        # E-step: how responsible is component k for point i?
        densities = np.column_stack([
            weights[k] * gaussian_density(X, means[k], covariances[k]) for k in range(K)
        ])
        evidence = densities.sum(axis=1, keepdims=True)
        responsibilities = densities / evidence

        log_likelihood = np.log(evidence).sum()
        history.append(log_likelihood)

        # M-step: refit each Gaussian, weighting every point by its responsibility.
        mass = responsibilities.sum(axis=0)
        weights = mass / n
        means = (responsibilities.T @ X) / mass[:, None]
        for k in range(K):
            delta = X - means[k]
            covariances[k] = (responsibilities[:, k] * delta.T) @ delta / mass[k]

        if step > 0 and abs(history[-1] - history[-2]) < tol:
            break

    return weights, means, covariances, responsibilities, history


weights, means, covariances, responsibilities, history = em_fit(X, K)
labels = responsibilities.argmax(axis=1)

print(f"\\nfrom-scratch EM converged in {len(history)} iterations")
print(f"log-likelihood: {history[0]:.2f} -> {history[-1]:.2f}")
print(f"mixing weights: {np.round(weights, 3)}")
print("means:")
print(np.round(means, 3))

gmm = GaussianMixture(n_components=K, random_state=42, n_init=5).fit(X)
print(f"\\nsklearn GaussianMixture converged={gmm.converged_} in {gmm.n_iter_} iterations")
print(f"log-likelihood: {gmm.score(X) * n:.2f}")
print(f"agreement between the two implementations: "
      f"{adjusted_rand_score(labels, gmm.predict(X)):.4f}")
print(f"agreement with ground truth: {adjusted_rand_score(truth, labels):.4f}")

# Soft clustering means some points genuinely sit between components.
confidence = responsibilities.max(axis=1)
undecided = confidence.argmin()
print(f"\\nleast certain point is #{undecided} at {np.round(X[undecided], 2)}")
print(f"its responsibilities: {np.round(responsibilities[undecided], 3)}")
print(f"{(confidence < 0.9).sum()} of {n} points are assigned with under 90% confidence")

candidate_ks = range(1, 7)
bics = [GaussianMixture(k, random_state=42, n_init=5).fit(X).bic(X) for k in candidate_ks]
aics = [GaussianMixture(k, random_state=42, n_init=5).fit(X).aic(X) for k in candidate_ks]
best_k = list(candidate_ks)[int(np.argmin(bics))]
print(f"\\nBIC selects k = {best_k}")


def draw_ellipse(ax, mean, covariance, color):
    values, vectors = np.linalg.eigh(covariance)
    order = values.argsort()[::-1]
    values, vectors = values[order], vectors[:, order]
    angle = np.degrees(np.arctan2(vectors[1, 0], vectors[0, 0]))
    for sigma in (1, 2):
        width, height = 2 * sigma * np.sqrt(values)
        ax.add_patch(Ellipse(mean, width, height, angle=angle, facecolor="none",
                             edgecolor=color, lw=1.8, alpha=1 - 0.3 * (sigma - 1)))


palette = ["#4f46e5", "#10b981", "#f59e0b"]
fig, (ax_clusters, ax_likelihood, ax_criterion) = plt.subplots(1, 3, figsize=(17, 5))

for k in range(K):
    member = labels == k
    ax_clusters.scatter(X[member, 0], X[member, 1], s=28, color=palette[k],
                        alpha=0.75, label=f"Component {k + 1}")
    draw_ellipse(ax_clusters, means[k], covariances[k], palette[k])
ax_clusters.scatter(X[confidence < 0.9][:, 0], X[confidence < 0.9][:, 1],
                    s=90, facecolor="none", edgecolor="#ef4444", lw=1.4,
                    label="Confidence < 90%")
ax_clusters.scatter(means[:, 0], means[:, 1], marker="X", s=220, color="black", zorder=10)
ax_clusters.set_title("Components with 1σ and 2σ contours")
ax_clusters.set_xlabel("x1")
ax_clusters.set_ylabel("x2")
ax_clusters.legend(fontsize=8)

ax_likelihood.plot(history, "o-", color="#4f46e5", lw=2.2, ms=4)
ax_likelihood.set_title("Log-likelihood never decreases")
ax_likelihood.set_xlabel("EM iteration")
ax_likelihood.set_ylabel("Log-likelihood")
ax_likelihood.grid(alpha=0.3)

ax_criterion.plot(list(candidate_ks), bics, "o-", color="#4f46e5", lw=2.2, label="BIC")
ax_criterion.plot(list(candidate_ks), aics, "s-", color="#10b981", lw=2.2, label="AIC")
ax_criterion.axvline(best_k, ls="--", color="#ef4444", lw=2, label=f"best k = {best_k}")
ax_criterion.set_title("Choosing the number of components")
ax_criterion.set_xlabel("Components")
ax_criterion.set_ylabel("Criterion (lower is better)")
ax_criterion.legend()
ax_criterion.grid(alpha=0.3)

plt.tight_layout()
plt.show()

print("\\nk-means would force every ringed point into one cluster. EM keeps the"
      "\\nuncertainty, which is what makes it model-based rather than distance-based.")
`,
};
