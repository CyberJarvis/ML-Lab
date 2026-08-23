export const ex06 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

data = load_breast_cancer()
X, Y = data.data, data.target
print(f"{X.shape[0]} samples, {X.shape[1]} features")

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.3, random_state=42, stratify=Y)

# TODO 1: fit a single decision stump (max_depth=1) and print its test accuracy.
#         One stump can only split on one feature, so expect a weak result.
stump = DecisionTreeClassifier(max_depth=1, random_state=42)

# TODO 2: boost 50 of those stumps with
#         AdaBoostClassifier(estimator=DecisionTreeClassifier(max_depth=1),
#                            n_estimators=50, random_state=42)
#         then print its accuracy and confusion matrix.
boosted = None

# TODO 3: boosted.staged_predict(X_test) yields the prediction after every round.
#         Turn it into an error curve and plot error against boosting round.
plt.figure(figsize=(7, 4))
plt.xlabel("Boosting round")
plt.ylabel("Test error")
plt.grid(alpha=0.3)
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

data = load_breast_cancer()
X, Y = data.data, data.target
print(f"{X.shape[0]} samples, {X.shape[1]} features, classes: {list(data.target_names)}")

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.3, random_state=42, stratify=Y)


def make_booster(n_estimators):
    return AdaBoostClassifier(
        estimator=DecisionTreeClassifier(max_depth=1),
        n_estimators=n_estimators,
        learning_rate=1.0,
        random_state=42,
    )


stump = DecisionTreeClassifier(max_depth=1, random_state=42).fit(X_train, Y_train)
stump_accuracy = accuracy_score(Y_test, stump.predict(X_test))

boosted = make_booster(50).fit(X_train, Y_train)
Y_pred = boosted.predict(X_test)
boosted_accuracy = accuracy_score(Y_test, Y_pred)

print(f"\\nsingle stump      : {stump_accuracy:.4f}")
print(f"adaboost, 50 stumps: {boosted_accuracy:.4f}")
print(f"error reduced by {(1 - stump_accuracy) - (1 - boosted_accuracy):.4f}")

print("\\nconfusion matrix:")
print(confusion_matrix(Y_test, Y_pred))
print()
print(classification_report(Y_test, Y_pred, target_names=data.target_names, digits=3))

# staged_predict replays the ensemble one round at a time, which is far cheaper
# than refitting a new model for every ensemble size.
train_curve = [1 - accuracy_score(Y_train, p) for p in boosted.staged_predict(X_train)]
test_curve = [1 - accuracy_score(Y_test, p) for p in boosted.staged_predict(X_test)]
rounds = np.arange(1, len(test_curve) + 1)

fig, (ax_curve, ax_weights, ax_features) = plt.subplots(1, 3, figsize=(16, 4.8))

ax_curve.plot(rounds, train_curve, color="#10b981", lw=2.2, label="Train error")
ax_curve.plot(rounds, test_curve, color="#4f46e5", lw=2.2, label="Test error")
ax_curve.axhline(1 - stump_accuracy, ls="--", color="#ef4444", lw=2, label="Single stump")
ax_curve.set_title("Error falls as stumps are added")
ax_curve.set_xlabel("Boosting round")
ax_curve.set_ylabel("Error rate")
ax_curve.legend()
ax_curve.grid(alpha=0.3)

# alpha = learner weight; a stump that was more accurate gets a louder vote.
ax_weights.bar(rounds, boosted.estimator_weights_, color="#f59e0b")
ax_weights.set_title("Vote weight of each weak learner")
ax_weights.set_xlabel("Boosting round")
ax_weights.set_ylabel("alpha")
ax_weights.grid(alpha=0.3, axis="y")

top = np.argsort(boosted.feature_importances_)[-8:]
ax_features.barh(range(len(top)), boosted.feature_importances_[top], color="#4f46e5")
ax_features.set_yticks(range(len(top)), [data.feature_names[i] for i in top], fontsize=8)
ax_features.set_title("Features the stumps split on most")
ax_features.set_xlabel("Importance")
ax_features.grid(alpha=0.3, axis="x")

plt.tight_layout()
plt.show()

print("\\nRandom forest builds trees independently and averages them. AdaBoost builds"
      "\\nthem in sequence, each one reweighted toward the samples the last one missed.")
`,
};
