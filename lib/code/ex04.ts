export const ex04 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.metrics import accuracy_score, confusion_matrix

X, Y = make_classification(n_samples=200, n_features=2, n_redundant=0,
                           n_informative=2, n_clusters_per_class=1,
                           class_sep=1.5, random_state=42)
n, d = X.shape


def sigmoid(z):
    """σ(z) = 1 / (1 + e⁻ᶻ) — squashes any real number into (0, 1)."""
    # TODO: return the sigmoid of z
    return np.zeros_like(z, dtype=float)


def log_loss(Y, p):
    """-(1/n)·Σ[ y·log(p) + (1-y)·log(1-p) ], clipped to avoid log(0)."""
    p = np.clip(p, 1e-15, 1 - 1e-15)
    # TODO: return the cross-entropy loss
    return 0.0


def train(X, Y, alpha=0.1, epochs=2000):
    """Gradient descent.
    p  = sigmoid(X·W + b)
    dW = (1/n)·Xᵀ(p - Y)
    db = (1/n)·Σ(p - Y)
    """
    W, b = np.zeros(X.shape[1]), 0.0
    losses = []
    for _ in range(epochs):
        pass  # TODO: compute p, record log_loss, then update W and b
    return W, b, losses


W, b, losses = train(X, Y)
print("W =", np.round(W, 4), " b =", round(b, 4))

# TODO: predict class 1 where sigmoid(X·W + b) >= 0.5, then print accuracy
#       and the confusion matrix

plt.figure(figsize=(7, 5))
plt.scatter(X[Y == 0][:, 0], X[Y == 0][:, 1], c="#ef4444", edgecolor="k", label="Class 0")
plt.scatter(X[Y == 1][:, 0], X[Y == 1][:, 1], c="#10b981", edgecolor="k", label="Class 1")
# TODO: draw the boundary. It is the line where W[0]·x + W[1]·y + b = 0,
#       so y = -(W[0]·x + b) / W[1]
plt.legend()
plt.grid(alpha=0.3)
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

X, Y = make_classification(n_samples=200, n_features=2, n_redundant=0,
                           n_informative=2, n_clusters_per_class=1,
                           class_sep=1.5, random_state=42)
n, d = X.shape


def sigmoid(z):
    """Numerically stable logistic function — no overflow for large |z|."""
    return np.where(z >= 0, 1 / (1 + np.exp(-np.abs(z))),
                    np.exp(-np.abs(z)) / (1 + np.exp(-np.abs(z))))


def log_loss(Y, p):
    p = np.clip(p, 1e-15, 1 - 1e-15)
    return -np.mean(Y * np.log(p) + (1 - Y) * np.log(1 - p))


W, b = np.zeros(d), 0.0
alpha, epochs = 0.1, 2000
losses = np.empty(epochs)

for epoch in range(epochs):
    p = sigmoid(X @ W + b)
    losses[epoch] = log_loss(Y, p)
    error = p - Y
    W -= alpha * (X.T @ error) / n
    b -= alpha * error.sum() / n

print(f"W = {np.round(W, 4)}   b = {b:.4f}")
print(f"log loss: {losses[0]:.4f} -> {losses[-1]:.4f} over {epochs} epochs")

probabilities = sigmoid(X @ W + b)
Y_pred = (probabilities >= 0.5).astype(int)

print(f"\\naccuracy: {accuracy_score(Y, Y_pred):.4f}")
print("confusion matrix (rows = actual, cols = predicted):")
print(confusion_matrix(Y, Y_pred))
print()
print(classification_report(Y, Y_pred, digits=3))

fig, (ax_sig, ax_boundary, ax_loss) = plt.subplots(1, 3, figsize=(16, 4.8))

z = np.linspace(-8, 8, 300)
ax_sig.plot(z, sigmoid(z), color="#4f46e5", lw=2.5)
ax_sig.axhline(0.5, color="#ef4444", ls="--", lw=1.5)
ax_sig.axvline(0, color="#94a3b8", lw=0.8)
ax_sig.set_title("Sigmoid maps any z into (0, 1)")
ax_sig.set_xlabel("z = W·x + b")
ax_sig.set_ylabel("P(y = 1)")
ax_sig.grid(alpha=0.3)

# Shade the two half-planes the model has learned.
pad = 0.6
xx, yy = np.meshgrid(
    np.linspace(X[:, 0].min() - pad, X[:, 0].max() + pad, 300),
    np.linspace(X[:, 1].min() - pad, X[:, 1].max() + pad, 300),
)
grid_probability = sigmoid(np.c_[xx.ravel(), yy.ravel()] @ W + b).reshape(xx.shape)
ax_boundary.contourf(xx, yy, grid_probability, levels=20, cmap="RdYlGn", alpha=0.35)
ax_boundary.contour(xx, yy, grid_probability, levels=[0.5], colors="k", linewidths=2)
ax_boundary.scatter(X[Y == 0][:, 0], X[Y == 0][:, 1], c="#ef4444", edgecolor="k", s=35, label="Class 0")
ax_boundary.scatter(X[Y == 1][:, 0], X[Y == 1][:, 1], c="#10b981", edgecolor="k", s=35, label="Class 1")
ax_boundary.set_title("Decision boundary at P = 0.5")
ax_boundary.set_xlabel("Feature 1")
ax_boundary.set_ylabel("Feature 2")
ax_boundary.legend(loc="best")

ax_loss.plot(losses, color="#f59e0b", lw=2.2)
ax_loss.set_title("Cross-entropy loss per epoch")
ax_loss.set_xlabel("Epoch")
ax_loss.set_ylabel("Log loss")
ax_loss.grid(alpha=0.3)

plt.tight_layout()
plt.show()

print("\\nUnlike linear regression, the output is a probability, and the loss that"
      "\\nis minimised is cross-entropy rather than squared error.")
`,
};
