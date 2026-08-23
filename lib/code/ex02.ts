export const ex02 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

X, Y = make_regression(n_samples=50, n_features=3, noise=10, random_state=42)
n = X.shape[0]

# Design matrix: a leading column of 1s turns the intercept into another coefficient.
X_bias = np.hstack([np.ones((n, 1)), X])


def normal_equation(X_bias, Y):
    """Part 1 — beta = (XᵀX)⁻¹ XᵀY. Use np.linalg.inv and the @ operator."""
    # TODO: replace the zero vector with the normal equation
    return np.zeros(X_bias.shape[1])


def gradient_descent(X_bias, Y, alpha=0.01, epochs=2000):
    """Part 2 — grad = (2/n)·Xᵀ(X·beta - Y), then beta -= alpha·grad."""
    beta = np.zeros(X_bias.shape[1])
    for _ in range(epochs):
        pass  # TODO: compute the gradient and update beta
    return beta


beta_normal = normal_equation(X_bias, Y)
print("normal equation  ", np.round(beta_normal, 3))

beta_gd = gradient_descent(X_bias, Y)
print("gradient descent ", np.round(beta_gd, 3))

# Part 3 — scikit-learn does the same thing internally.
# TODO: fit LinearRegression() on (X, Y) and print intercept_ and coef_

plt.figure(figsize=(6, 6))
# TODO: scatter actual Y against predicted Y, then add the y = x reference line
plt.xlabel("Actual Y")
plt.ylabel("Predicted Y")
plt.grid(alpha=0.3)
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

X, Y = make_regression(n_samples=50, n_features=3, noise=10, random_state=42)
n = X.shape[0]
X_bias = np.hstack([np.ones((n, 1)), X])

# Part 1 — normal equation. solve() is preferred over inv() for numerical stability.
beta_normal = np.linalg.solve(X_bias.T @ X_bias, X_bias.T @ Y)
pred_normal = X_bias @ beta_normal
print(f"normal equation   intercept={beta_normal[0]:8.4f}  coefs={np.round(beta_normal[1:], 3)}")
print(f"                  MSE={mean_squared_error(Y, pred_normal):.4f}  R2={r2_score(Y, pred_normal):.4f}")

# Part 2 — batch gradient descent over every coefficient at once.
beta_gd = np.zeros(X_bias.shape[1])
alpha, epochs = 0.01, 2000
losses = np.empty(epochs)

for epoch in range(epochs):
    residual = X_bias @ beta_gd - Y
    losses[epoch] = np.mean(residual ** 2)
    beta_gd -= alpha * (2 / n) * (X_bias.T @ residual)

print(f"gradient descent  intercept={beta_gd[0]:8.4f}  coefs={np.round(beta_gd[1:], 3)}")
print(f"                  MSE={losses[-1]:.4f}  ({epochs} epochs, alpha={alpha})")

# Part 3 — scikit-learn.
model = LinearRegression().fit(X, Y)
pred_sk = model.predict(X)
print(f"scikit-learn      intercept={model.intercept_:8.4f}  coefs={np.round(model.coef_, 3)}")
print(f"                  MSE={mean_squared_error(Y, pred_sk):.4f}  R2={r2_score(Y, pred_sk):.4f}")

fig, (ax_fit, ax_resid, ax_loss) = plt.subplots(1, 3, figsize=(16, 4.8))

ax_fit.scatter(Y, pred_sk, s=55, color="#4f46e5", edgecolor="white", lw=0.8, zorder=5)
limits = [Y.min() - 10, Y.max() + 10]
ax_fit.plot(limits, limits, ls="--", color="#ef4444", lw=2, label="Perfect prediction")
ax_fit.set_title("Predicted vs actual")
ax_fit.set_xlabel("Actual Y")
ax_fit.set_ylabel("Predicted Y")
ax_fit.legend()
ax_fit.grid(alpha=0.3)

residuals = Y - pred_sk
ax_resid.axhline(0, color="#ef4444", ls="--", lw=2)
ax_resid.scatter(pred_sk, residuals, s=55, color="#10b981", edgecolor="white", lw=0.8, zorder=5)
ax_resid.set_title("Residuals scatter around zero")
ax_resid.set_xlabel("Predicted Y")
ax_resid.set_ylabel("Residual")
ax_resid.grid(alpha=0.3)

ax_loss.plot(losses, color="#f59e0b", lw=2.2)
ax_loss.set_yscale("log")
ax_loss.set_title("Gradient descent convergence")
ax_loss.set_xlabel("Epoch")
ax_loss.set_ylabel("Mean squared error")
ax_loss.grid(alpha=0.3)

plt.tight_layout()
plt.show()

print(f"\\nLargest coefficient gap between the three methods: "
      f"{np.abs(beta_normal[1:] - model.coef_).max():.6f}")
`,
};
