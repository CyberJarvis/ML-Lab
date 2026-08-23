export const ex03 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)


def normal_equation(X_bias, Y):
    """beta = (XᵀX)⁻¹ XᵀY.

    Y may have several columns. The formula does not change: numpy solves for
    every dependent variable at once, giving one coefficient column per output.
    """
    # TODO: replace the zero matrix with the normal equation
    return np.zeros((X_bias.shape[1], Y.shape[1]))


# Part 1 — one independent variable, three dependent variables.
n = 30
x = np.linspace(0, 10, n)
Y1 = np.column_stack([
    2.0 * x + 1.0 + rng.normal(0, 1, n),
    0.5 * x + 3.0 + rng.normal(0, 1, n),
    -1.0 * x + 5.0 + rng.normal(0, 1, n),
])
X1_bias = np.column_stack([np.ones(n), x])

beta1 = normal_equation(X1_bias, Y1)
print("Part 1 — beta shape", beta1.shape, "(intercept + slope) x 3 outputs")
print(np.round(beta1, 3))

# Part 2 — three independent variables, two dependent variables.
m = 50
X2 = rng.uniform(0, 10, (m, 3))
true_weights = np.array([[1.5, -2.0, 0.5], [0.3, 0.8, -1.2]])
Y2 = X2 @ true_weights.T + np.array([1.0, 2.0]) + rng.normal(0, 0.5, (m, 2))
X2_bias = np.hstack([np.ones((m, 1)), X2])

# TODO: compute beta2 with normal_equation and print it
beta2 = None
print("Part 2 — beta:", beta2)

plt.figure(figsize=(7, 5))
# TODO: scatter each column of Y1 against x and draw its fitted line
plt.xlabel("X")
plt.ylabel("Y")
plt.grid(alpha=0.3)
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)


def normal_equation(X_bias, Y):
    """Solves for every dependent variable simultaneously: beta = (XᵀX)⁻¹ XᵀY."""
    return np.linalg.solve(X_bias.T @ X_bias, X_bias.T @ Y)


def r_squared(actual, predicted):
    ss_res = np.sum((actual - predicted) ** 2, axis=0)
    ss_tot = np.sum((actual - actual.mean(axis=0)) ** 2, axis=0)
    return 1 - ss_res / ss_tot


# Part 1 — one independent variable, three dependent variables.
n = 30
x = np.linspace(0, 10, n)
true_slopes = np.array([2.0, 0.5, -1.0])
true_intercepts = np.array([1.0, 3.0, 5.0])
Y1 = x[:, None] * true_slopes + true_intercepts + rng.normal(0, 1, (n, 3))
X1_bias = np.column_stack([np.ones(n), x])

beta1 = normal_equation(X1_bias, Y1)
pred1 = X1_bias @ beta1

print(f"Part 1 — X is {X1_bias.shape}, Y is {Y1.shape}, so beta is {beta1.shape}")
print("             Y1      Y2      Y3")
print("intercept", np.round(beta1[0], 3), " (true", true_intercepts, ")")
print("slope    ", np.round(beta1[1], 3), " (true", true_slopes, ")")
print("R2       ", np.round(r_squared(Y1, pred1), 4))

# Part 2 — three independent variables, two dependent variables.
m = 50
X2 = rng.uniform(0, 10, (m, 3))
true_weights = np.array([[1.5, -2.0, 0.5], [0.3, 0.8, -1.2]])
Y2 = X2 @ true_weights.T + np.array([1.0, 2.0]) + rng.normal(0, 0.5, (m, 2))
X2_bias = np.hstack([np.ones((m, 1)), X2])

beta2 = normal_equation(X2_bias, Y2)
pred2 = X2_bias @ beta2

print(f"\\nPart 2 — X is {X2_bias.shape}, Y is {Y2.shape}, so beta is {beta2.shape}")
print("estimated:\\n", np.round(beta2.T, 3))
print("true:\\n", np.round(np.column_stack([[1.0, 2.0], true_weights]), 3))
print("R2       ", np.round(r_squared(Y2, pred2), 4))

fig, (ax_part1, ax_part2) = plt.subplots(1, 2, figsize=(14, 5.2))

colors = ["#4f46e5", "#10b981", "#f59e0b"]
for i, color in enumerate(colors):
    ax_part1.scatter(x, Y1[:, i], s=35, color=color, alpha=0.7,
                     label=f"Y{i + 1} (true slope {true_slopes[i]})")
    ax_part1.plot(x, pred1[:, i], color=color, lw=2.2)
ax_part1.set_title("One predictor, three responses")
ax_part1.set_xlabel("X")
ax_part1.set_ylabel("Y")
ax_part1.legend()
ax_part1.grid(alpha=0.3)

for j, color in enumerate(["#4f46e5", "#10b981"]):
    ax_part2.scatter(Y2[:, j], pred2[:, j], s=45, color=color,
                     edgecolor="white", lw=0.8, label=f"Y{j + 1}")
low, high = Y2.min(), Y2.max()
ax_part2.plot([low, high], [low, high], ls="--", color="#ef4444", lw=2)
ax_part2.set_title("Three predictors, two responses")
ax_part2.set_xlabel("Actual")
ax_part2.set_ylabel("Predicted")
ax_part2.legend()
ax_part2.grid(alpha=0.3)

plt.tight_layout()
plt.show()

print("\\nOne normal equation recovers every response at once — that is what makes"
      "\\nthis multivariate rather than merely multiple regression.")
`,
};
