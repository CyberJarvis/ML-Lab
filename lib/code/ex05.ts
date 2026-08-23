export const ex05 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

iris = load_iris()
X, Y = iris.data, iris.target
print(f"{X.shape[0]} samples, {X.shape[1]} features, classes: {list(iris.target_names)}")

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.3, random_state=42, stratify=Y)

# TODO 1: fit a single DecisionTreeClassifier(random_state=42) as the baseline
#         and print its test accuracy
tree = DecisionTreeClassifier(random_state=42)

# TODO 2: fit a RandomForestClassifier(n_estimators=100, random_state=42),
#         predict on X_test, then print accuracy and the confusion matrix
forest = None
Y_pred = None

# TODO 3: forest.feature_importances_ tells you which measurements matter.
#         Sort them and draw a horizontal bar chart.
plt.figure(figsize=(8, 4))
plt.xlabel("Importance")
plt.grid(alpha=0.3, axis="x")
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

iris = load_iris()
X, Y = iris.data, iris.target
class_names = list(iris.target_names)
feature_names = [name.replace(" (cm)", "") for name in iris.feature_names]

print(f"{X.shape[0]} samples, {X.shape[1]} features, classes: {class_names}")

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.3, random_state=42, stratify=Y)

# A single unpruned tree is the weak learner the forest is built from.
tree = DecisionTreeClassifier(random_state=42).fit(X_train, Y_train)
tree_accuracy = accuracy_score(Y_test, tree.predict(X_test))

forest = RandomForestClassifier(n_estimators=100, random_state=42, oob_score=True)
forest.fit(X_train, Y_train)
Y_pred = forest.predict(X_test)
forest_accuracy = accuracy_score(Y_test, Y_pred)

print(f"\\nsingle decision tree : {tree_accuracy:.4f}")
print(f"random forest (100)  : {forest_accuracy:.4f}")
print(f"out-of-bag estimate  : {forest.oob_score_:.4f}")

matrix = confusion_matrix(Y_test, Y_pred)
print("\\nconfusion matrix:")
print(matrix)
print()
print(classification_report(Y_test, Y_pred, target_names=class_names, digits=3))

fig, (ax_matrix, ax_importance, ax_curve) = plt.subplots(1, 3, figsize=(16, 4.8))

ax_matrix.imshow(matrix, cmap="Blues")
ax_matrix.set_xticks(range(3), class_names, rotation=20)
ax_matrix.set_yticks(range(3), class_names)
ax_matrix.set_xlabel("Predicted")
ax_matrix.set_ylabel("Actual")
ax_matrix.set_title("Confusion matrix")
for i in range(3):
    for j in range(3):
        ax_matrix.text(j, i, matrix[i, j], ha="center", va="center", fontweight="bold",
                       color="white" if matrix[i, j] > matrix.max() / 2 else "black")

# Averaging importances over 100 trees is far more stable than reading one tree.
importances = forest.feature_importances_
spread = np.std([t.feature_importances_ for t in forest.estimators_], axis=0)
order = np.argsort(importances)
ax_importance.barh(range(len(importances)), importances[order],
                   xerr=spread[order], color="#4f46e5", ecolor="#94a3b8")
ax_importance.set_yticks(range(len(importances)), [feature_names[i] for i in order])
ax_importance.set_title("Feature importance (± std across trees)")
ax_importance.set_xlabel("Mean decrease in impurity")
ax_importance.grid(alpha=0.3, axis="x")

tree_counts = [1, 2, 5, 10, 25, 50, 100, 200]
accuracies = [
    accuracy_score(Y_test, RandomForestClassifier(n_estimators=c, random_state=42)
                   .fit(X_train, Y_train).predict(X_test))
    for c in tree_counts
]
ax_curve.plot(tree_counts, accuracies, "o-", color="#10b981", lw=2.2, ms=7, label="Random forest")
ax_curve.axhline(tree_accuracy, ls="--", color="#ef4444", lw=2, label="Single tree")
ax_curve.set_xscale("log")
ax_curve.set_xticks(tree_counts, [str(c) for c in tree_counts])
ax_curve.set_title("Accuracy vs number of trees")
ax_curve.set_xlabel("n_estimators")
ax_curve.set_ylabel("Test accuracy")
ax_curve.legend()
ax_curve.grid(alpha=0.3)

plt.tight_layout()
plt.show()

print("\\nEach tree sees a bootstrap sample and a random feature subset, so their"
      "\\nerrors are largely independent and majority voting cancels them out.")
`,
};
