export const ex01 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], dtype=float)
Y = np.array([2.1, 3.9, 6.2, 8.1, 10.1, 11.8, 14.2, 16.0, 17.9, 20.2])
n = len(X)


def least_squares(X, Y):
    """Part 1 — closed form.
    b1 = Σ(Xi - X̄)(Yi - Ȳ) / Σ(Xi - X̄)²
    b0 = Ȳ - b1·X̄
    """
    # TODO: replace the zeros with the two formulas above
    b0, b1 = 0.0, 0.0
    return b0, b1


def gradient_descent(X, Y, alpha=0.01, epochs=1000):
    """Part 2 — iterative optimisation of the same two parameters.
    error = Y - (b0 + b1·X)
    b0 -= alpha · (-2/n)·Σ(error)
    b1 -= alpha · (-2/n)·Σ(error·X)
    """
    b0, b1 = 0.0, 0.0
    for _ in range(epochs):
        pass  # TODO: compute the error, then update b0 and b1
    return b0, b1


b0_ls, b1_ls = least_squares(X, Y)
print(f"least squares     b0={b0_ls:.4f}  b1={b1_ls:.4f}")

b0_gd, b1_gd = gradient_descent(X, Y)
print(f"gradient descent  b0={b0_gd:.4f}  b1={b1_gd:.4f}")

# Part 3 — the library version.
model = LinearRegression()
# TODO: fit the model on X.reshape(-1, 1) and Y, then print intercept_ and coef_[0]

plt.figure(figsize=(7, 5))
plt.scatter(X, Y, color="#0b1220", s=60, zorder=5, label="Data")
# TODO: plot b0 + b1*X for each of the three methods
plt.xlabel("X")
plt.ylabel("Y")
plt.legend()
plt.grid(alpha=0.3)
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], dtype=float)
Y = np.array([2.1, 3.9, 6.2, 8.1, 10.1, 11.8, 14.2, 16.0, 17.9, 20.2])
n = len(X)

# Part 1 — closed-form least squares.
X_mean, Y_mean = X.mean(), Y.mean()
b1 = np.sum((X - X_mean) * (Y - Y_mean)) / np.sum((X - X_mean) ** 2)
b0 = Y_mean - b1 * X_mean
pred_ls = b0 + b1 * X

print(f"least squares     b0={b0:.4f}  b1={b1:.4f}"
      f"  MSE={mean_squared_error(Y, pred_ls):.4f}  R2={r2_score(Y, pred_ls):.4f}")

# Part 2 — gradient descent on the mean squared error.
b0_gd, b1_gd = 0.0, 0.0
alpha, epochs = 0.01, 1000
losses = np.empty(epochs)

for epoch in range(epochs):
    error = Y - (b0_gd + b1_gd * X)
    losses[epoch] = np.mean(error ** 2)
    b0_gd -= alpha * (-2 / n) * np.sum(error)
    b1_gd -= alpha * (-2 / n) * np.sum(error * X)

pred_gd = b0_gd + b1_gd * X
print(f"gradient descent  b0={b0_gd:.4f}  b1={b1_gd:.4f}"
      f"  MSE={losses[-1]:.4f}  ({epochs} epochs, alpha={alpha})")

# Part 3 — scikit-learn.
model = LinearRegression().fit(X.reshape(-1, 1), Y)
pred_sk = model.predict(X.reshape(-1, 1))
print(f"scikit-learn      b0={model.intercept_:.4f}  b1={model.coef_[0]:.4f}"
      f"  R2={model.score(X.reshape(-1, 1), Y):.4f}")

fig, (ax_fit, ax_loss) = plt.subplots(1, 2, figsize=(13, 5))

ax_fit.scatter(X, Y, s=70, color="#0b1220", zorder=5, label="Data")
ax_fit.plot(X, pred_ls, color="#4f46e5", lw=2.2, label=f"Least squares  y={b0:.2f}+{b1:.2f}x")
ax_fit.plot(X, pred_gd, color="#10b981", lw=2.2, ls="--", label=f"Gradient descent  y={b0_gd:.2f}+{b1_gd:.2f}x")
ax_fit.plot(X, pred_sk, color="#f59e0b", lw=2.2, ls=":", label=f"scikit-learn  y={model.intercept_:.2f}+{model.coef_[0]:.2f}x")
ax_fit.set_title("Three routes to the same line")
ax_fit.set_xlabel("X")
ax_fit.set_ylabel("Y")
ax_fit.legend()
ax_fit.grid(alpha=0.3)

ax_loss.plot(losses, color="#4f46e5", lw=2.2)
ax_loss.set_yscale("log")
ax_loss.set_title("Gradient descent convergence")
ax_loss.set_xlabel("Epoch")
ax_loss.set_ylabel("Mean squared error")
ax_loss.grid(alpha=0.3)

plt.tight_layout()
plt.show()

print(f"\\nMaximum disagreement between the three slopes: "
      f"{max(abs(b1 - b1_gd), abs(b1 - model.coef_[0])):.6f}")
`,
};
