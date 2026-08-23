// ============================================================================
// Pretest and posttest question banks.
//
// Pretest checks the prerequisites a student needs before attempting the
// experiment. Posttest checks what the experiment itself should have taught,
// including things only visible by running the code and reading the output.
// ============================================================================

import type { QuizQuestion } from "./experiments";

interface QuizPair {
  pretest: QuizQuestion[];
  posttest: QuizQuestion[];
}

export const quizzes: Record<number, QuizPair> = {
  1: {
    pretest: [
      {
        question: "In the model Y = β₀ + β₁X + ε, what does β₁ represent?",
        options: [
          "The value of Y when X is zero",
          "The change in Y for a one-unit increase in X",
          "The average of all Y values",
          "The total prediction error",
        ],
        answer: 1,
        explanation:
          "β₁ is the slope: it measures how much Y moves when X increases by one unit. β₀, the intercept, is the value of Y at X = 0.",
      },
      {
        question: "Which problem is best framed as regression rather than classification?",
        options: [
          "Deciding whether an email is spam",
          "Recognising a handwritten digit",
          "Predicting tomorrow's temperature in degrees",
          "Deciding whether a tumour is benign or malignant",
        ],
        answer: 2,
        explanation:
          "Regression predicts a continuous quantity. Temperature is continuous; the other three have a fixed set of discrete labels.",
      },
      {
        question: "Supervised learning is distinguished by the fact that the training data contains:",
        options: [
          "Only input features",
          "Input features paired with known target values",
          "Data grouped into clusters",
          "A reward signal received after each action",
        ],
        answer: 1,
        explanation:
          "Supervised learning learns a mapping from inputs to known outputs. Unsupervised methods see only inputs; reinforcement learning learns from rewards.",
      },
      {
        question: "The mean squared error of predictions is minimised when the residuals are:",
        options: [
          "As large as possible",
          "All exactly equal to each other",
          "As small as possible in magnitude, centred on zero",
          "All strictly positive",
        ],
        answer: 2,
        explanation:
          "MSE averages squared residuals, so it shrinks as residuals approach zero. A good fit leaves residuals small and scattered evenly above and below zero.",
      },
      {
        question: "In gradient descent, the learning rate α controls:",
        options: [
          "How many data points are used",
          "The size of each step taken against the gradient",
          "The number of features in the model",
          "The final accuracy of the model, directly",
        ],
        answer: 1,
        explanation:
          "α scales each update. Too small and convergence crawls; too large and the parameters overshoot and can diverge.",
      },
    ],
    posttest: [
      {
        question: "In the experiment, the least-squares slope was computed as:",
        options: [
          "Σ(Xᵢ − X̄)(Yᵢ − Ȳ) ÷ Σ(Xᵢ − X̄)²",
          "Σ(Xᵢ − X̄)² ÷ Σ(Yᵢ − Ȳ)²",
          "Σ(XᵢYᵢ) ÷ n",
          "(Ȳ − X̄) ÷ n",
        ],
        answer: 0,
        explanation:
          "That ratio is the covariance of X and Y divided by the variance of X, which is exactly the least-squares slope.",
      },
      {
        question: "All three methods produced nearly identical parameters. Why?",
        options: [
          "They happen to use the same random seed",
          "They all minimise the same squared-error objective, which has a single minimum",
          "scikit-learn copies the values computed earlier in the script",
          "The dataset is too small for the methods to differ",
        ],
        answer: 1,
        explanation:
          "Squared error for a linear model is convex with one global minimum. Solving it exactly or descending to it iteratively must land in the same place.",
      },
      {
        question: "The convergence plot was drawn on a logarithmic y-axis. What did that reveal?",
        options: [
          "That the error becomes negative after enough epochs",
          "That the error falls steeply at first and then improves by ever-smaller amounts",
          "That gradient descent never converges",
          "That the learning rate increases over time",
        ],
        answer: 1,
        explanation:
          "A log axis spreads out small values. The curve shows large early gains followed by slow refinement — the signature of gradient descent nearing a minimum.",
      },
      {
        question: "If the learning rate had been set to 1.0 instead of 0.01, the most likely result is:",
        options: [
          "Convergence in one epoch",
          "Identical results, just faster",
          "The parameters overshoot and the loss grows without bound",
          "The loss stays exactly constant",
        ],
        answer: 2,
        explanation:
          "With unscaled X values up to 10, a step of that size overshoots the minimum and each correction is larger than the last, so the loss diverges.",
      },
      {
        question: "After fitting, model.coef_[0] and model.intercept_ correspond to:",
        options: [
          "β₀ and β₁ respectively",
          "β₁ and β₀ respectively",
          "The MSE and the R² score",
          "The first and last data points",
        ],
        answer: 1,
        explanation:
          "coef_ holds the slopes, one per feature, so coef_[0] is β₁. intercept_ is β₀, stored separately because it multiplies no feature.",
      },
    ],
  },

  2: {
    pretest: [
      {
        question: "If X is an n×p matrix and β is a p×1 vector, the product Xβ has shape:",
        options: ["n×p", "p×1", "n×1", "p×n"],
        answer: 2,
        explanation:
          "Matrix multiplication contracts the inner dimensions: (n×p)(p×1) leaves n×1 — one predicted value per sample.",
      },
      {
        question: "Why is a column of ones prepended to the design matrix?",
        options: [
          "To normalise the features",
          "To let the intercept be treated as just another coefficient",
          "To make the matrix invertible in all cases",
          "To count the number of samples",
        ],
        answer: 1,
        explanation:
          "A constant column multiplied by β₀ contributes β₀ to every prediction, so the intercept falls out of the same matrix equation as the slopes.",
      },
      {
        question: "The transpose of an n×p matrix has shape:",
        options: ["n×p", "p×n", "n×n", "p×p"],
        answer: 1,
        explanation: "Transposing swaps rows and columns, turning n×p into p×n.",
      },
      {
        question: "A square matrix fails to have an inverse when:",
        options: [
          "It contains negative numbers",
          "Its determinant is zero",
          "It is symmetric",
          "It has more rows than columns",
        ],
        answer: 1,
        explanation:
          "A zero determinant means the columns are linearly dependent, so the matrix collapses dimensions and cannot be undone.",
      },
      {
        question: "Multiple linear regression differs from simple linear regression by having:",
        options: [
          "Several dependent variables",
          "Several independent variables",
          "No intercept term",
          "A non-linear cost function",
        ],
        answer: 1,
        explanation:
          "Multiple regression takes several predictors but still produces one output. Several outputs would make it multivariate regression, the subject of Experiment 3.",
      },
    ],
    posttest: [
      {
        question: "The normal equation solved in this experiment is:",
        options: ["β = XᵀY", "β = (XᵀX)⁻¹XᵀY", "β = X⁻¹Y", "β = (XXᵀ)⁻¹YᵀX"],
        answer: 1,
        explanation:
          "Setting the derivative of the squared error to zero gives XᵀXβ = XᵀY, and solving for β yields (XᵀX)⁻¹XᵀY.",
      },
      {
        question: "The solution uses np.linalg.solve rather than np.linalg.inv. Why?",
        options: [
          "solve is the only function that accepts matrices",
          "Solving the system directly is more numerically stable than forming an explicit inverse",
          "inv does not exist in NumPy",
          "solve returns the result in a different shape",
        ],
        answer: 1,
        explanation:
          "Explicitly inverting amplifies rounding error. Solving XᵀXβ = XᵀY directly is both faster and better conditioned, and gives the same answer.",
      },
      {
        question: "In the residual plot, residuals scattered randomly around zero indicate:",
        options: [
          "The model has overfitted",
          "A linear model captures the structure, leaving only noise",
          "The learning rate was too high",
          "The features need to be removed",
        ],
        answer: 1,
        explanation:
          "Structure left in the residuals — a curve or a fan shape — signals that the model missed a pattern. Unstructured scatter means only noise remains.",
      },
      {
        question: "The gradient used for the descent loop was:",
        options: [
          "(2/n)·Xᵀ(Xβ − Y)",
          "(2/n)·(Xβ − Y)",
          "Xᵀ(Y − Xβ)²",
          "(1/n)·ΣY",
        ],
        answer: 0,
        explanation:
          "Differentiating (1/n)‖Xβ − Y‖² with respect to β gives (2/n)Xᵀ(Xβ − Y), one component per coefficient.",
      },
      {
        question: "With three features, how many parameters did the model estimate in total?",
        options: ["3", "4", "50", "2"],
        answer: 1,
        explanation:
          "Three slopes plus one intercept gives four, which is why the design matrix had four columns after the ones column was added.",
      },
    ],
  },

  3: {
    pretest: [
      {
        question: "Multivariate linear regression is characterised by:",
        options: [
          "Multiple independent variables and one dependent variable",
          "Multiple dependent variables",
          "A non-linear relationship between variables",
          "The absence of an error term",
        ],
        answer: 1,
        explanation:
          "The distinguishing feature is multiple responses. Multiple predictors with a single response is multiple regression, covered in Experiment 2.",
      },
      {
        question: "If Y is n×m and X is n×(p+1), the coefficient matrix β must be:",
        options: ["(p+1)×m", "m×(p+1)", "n×m", "(p+1)×n"],
        answer: 0,
        explanation:
          "For Xβ to have Y's shape n×m, β must be (p+1)×m — one coefficient column per dependent variable.",
      },
      {
        question: "np.column_stack is used to:",
        options: [
          "Sort an array by column",
          "Join one-dimensional arrays side by side as columns of a matrix",
          "Compute a column-wise mean",
          "Remove a column from a matrix",
        ],
        answer: 1,
        explanation:
          "It stacks arrays along a new second axis, which is how the separate response vectors are assembled into a single Y matrix.",
      },
      {
        question: "The coefficient of determination R² measures:",
        options: [
          "The number of parameters used",
          "The fraction of variance in the target explained by the model",
          "The average size of the coefficients",
          "The correlation between two predictors",
        ],
        answer: 1,
        explanation:
          "R² = 1 − SS_res/SS_tot. It is 1 for a perfect fit and 0 for a model no better than always predicting the mean.",
      },
      {
        question: "In NumPy, the @ operator between two arrays performs:",
        options: [
          "Element-wise multiplication",
          "Matrix multiplication",
          "Array concatenation",
          "Exponentiation",
        ],
        answer: 1,
        explanation:
          "@ is matrix multiplication. Element-wise multiplication is the * operator — confusing the two is a common source of shape errors.",
      },
    ],
    posttest: [
      {
        question: "Does the normal equation change when Y gains extra columns?",
        options: [
          "Yes, a separate equation is needed for each response",
          "No, the identical formula solves for every response at once",
          "Yes, the inverse must be computed column by column",
          "No, but only when the responses are uncorrelated",
        ],
        answer: 1,
        explanation:
          "That is the central lesson of the experiment: (XᵀX)⁻¹XᵀY works unchanged, producing one coefficient column per response in a single step.",
      },
      {
        question: "In Part 1, beta1 had shape (2, 3). The 2 and the 3 correspond to:",
        options: [
          "2 samples and 3 features",
          "Intercept plus one slope, and 3 dependent variables",
          "2 dependent variables and 3 predictors",
          "2 iterations and 3 parameters",
        ],
        answer: 1,
        explanation:
          "One predictor plus the intercept column gives 2 rows; the three response variables give 3 columns.",
      },
      {
        question: "The estimated coefficients were close to, but not exactly equal to, the true values used to build the data. Why?",
        options: [
          "The normal equation is an approximation",
          "Gaussian noise was added to each response, so the sample estimate differs from the generating parameter",
          "Too few iterations were run",
          "The intercept column was omitted",
        ],
        answer: 1,
        explanation:
          "Regression recovers the best fit to the observed noisy sample. With finite data the estimate scatters around the true parameter rather than hitting it exactly.",
      },
      {
        question: "The R² values were reported per dependent variable rather than as a single number because:",
        options: [
          "R² cannot be averaged mathematically",
          "Each response has its own variance and is fitted with its own coefficient column",
          "The library only supports one column at a time",
          "The responses have different sample sizes",
        ],
        answer: 1,
        explanation:
          "Each response is a separate regression sharing the same predictors, so each has its own explained-variance fraction. One may be fitted well and another poorly.",
      },
      {
        question: "Y₃ was generated with a slope of −1.0. In the plot its fitted line:",
        options: [
          "Rises from left to right",
          "Falls from left to right",
          "Is horizontal",
          "Is vertical",
        ],
        answer: 1,
        explanation:
          "A negative slope means Y decreases as X increases, so the line descends — visibly opposite in direction to the two positive-slope responses.",
      },
    ],
  },

  4: {
    pretest: [
      {
        question: "The sigmoid function σ(z) = 1/(1 + e⁻ᶻ) has range:",
        options: ["(−∞, ∞)", "(0, 1)", "[−1, 1]", "[0, ∞)"],
        answer: 1,
        explanation:
          "It approaches 0 as z → −∞ and 1 as z → +∞ without reaching either, which is exactly what is needed for a probability.",
      },
      {
        question: "What is σ(0)?",
        options: ["0", "0.5", "1", "Undefined"],
        answer: 1,
        explanation:
          "1/(1 + e⁰) = 1/2. This is why z = 0 is the decision boundary at the default 0.5 threshold.",
      },
      {
        question: "Logistic regression is used for:",
        options: [
          "Predicting continuous values",
          "Classification, by modelling class probability",
          "Reducing the number of features",
          "Grouping unlabelled data",
        ],
        answer: 1,
        explanation:
          "Despite the name, it is a classifier. The 'regression' refers to regressing the log-odds of the class on the features.",
      },
      {
        question: "Why is squared error a poor loss function for logistic regression?",
        options: [
          "It cannot be differentiated",
          "It is non-convex in the parameters and penalises confident mistakes too weakly",
          "It requires more memory",
          "It only works with more than two classes",
        ],
        answer: 1,
        explanation:
          "Composed with the sigmoid, squared error becomes non-convex and its gradients vanish when predictions are confidently wrong. Cross-entropy stays convex and punishes those cases sharply.",
      },
      {
        question: "In a confusion matrix, a false positive is a case where the model:",
        options: [
          "Predicts class 1 when the truth is class 0",
          "Predicts class 0 when the truth is class 1",
          "Predicts the correct class",
          "Refuses to make a prediction",
        ],
        answer: 0,
        explanation:
          "A false positive is a spurious detection: the model raised the alarm when it should not have.",
      },
    ],
    posttest: [
      {
        question: "The gradient of the cross-entropy loss with respect to the weights is:",
        options: [
          "(1/n)·Xᵀ(p − Y)",
          "(1/n)·Xᵀ(Y − p)²",
          "(2/n)·Xᵀ(p − Y)",
          "(1/n)·Σ(p − Y)²",
        ],
        answer: 0,
        explanation:
          "The sigmoid and the log cancel elegantly, leaving the same clean form as linear regression's gradient — prediction minus target, projected onto the features.",
      },
      {
        question: "The decision boundary drawn in the plot is a straight line because:",
        options: [
          "Only two features were used",
          "The model is linear in the features; the sigmoid changes the output scale, not the boundary's shape",
          "The data happened to be linearly separable",
          "matplotlib cannot draw curves",
        ],
        answer: 1,
        explanation:
          "The boundary is the set where W·x + b = 0, which is always a line in two dimensions. The sigmoid maps distance from that line into a probability.",
      },
      {
        question: "The probabilities were clipped to [1e-15, 1 − 1e-15] before taking the log. Why?",
        options: [
          "To speed up the computation",
          "Because log(0) is undefined and would make the loss infinite or NaN",
          "To keep the loss positive",
          "Because NumPy cannot store very small numbers",
        ],
        answer: 1,
        explanation:
          "A perfectly confident and wrong prediction would produce log(0) = −∞, poisoning the loss. Clipping bounds the penalty at a large but finite value.",
      },
      {
        question: "In the shaded probability plot, points nearest the boundary have probabilities closest to:",
        options: ["0", "0.5", "1", "Their class label"],
        answer: 1,
        explanation:
          "The boundary is exactly where the model is undecided. Confidence grows with distance from it in either direction.",
      },
      {
        question: "The sigmoid was implemented with np.where and np.abs rather than the direct formula. This avoids:",
        options: [
          "Division by zero",
          "Overflow when computing exp of a large positive number",
          "Negative probabilities",
          "The need to import NumPy",
        ],
        answer: 1,
        explanation:
          "exp(-z) overflows for large negative z. Branching on the sign keeps the exponent negative in both cases, which is numerically safe.",
      },
    ],
  },

  5: {
    pretest: [
      {
        question: "An ensemble method improves performance by:",
        options: [
          "Training one very large model",
          "Combining the predictions of several models",
          "Removing features from the dataset",
          "Increasing the learning rate",
        ],
        answer: 1,
        explanation:
          "Ensembles aggregate several learners so that their individual errors, being partly independent, cancel out.",
      },
      {
        question: "Bootstrap sampling means drawing a sample:",
        options: [
          "Without replacement, of the same size as the original",
          "With replacement, so some points repeat and others are omitted",
          "Consisting only of the most recent observations",
          "Containing exactly half the data",
        ],
        answer: 1,
        explanation:
          "Sampling with replacement gives each tree a slightly different dataset, which is the source of the diversity that makes bagging work.",
      },
      {
        question: "A decision tree grown to full depth on training data typically:",
        options: [
          "Underfits badly",
          "Overfits, achieving high training accuracy but weaker test accuracy",
          "Ignores most features",
          "Cannot handle more than two classes",
        ],
        answer: 1,
        explanation:
          "An unpruned tree can carve out a leaf for every training point, memorising noise. That high variance is precisely what averaging over a forest reduces.",
      },
      {
        question: "In a classification random forest, predictions are combined by:",
        options: [
          "Averaging the class labels numerically",
          "Majority vote across the trees",
          "Taking the prediction of the deepest tree",
          "Selecting the first tree's answer",
        ],
        answer: 1,
        explanation:
          "Classification uses majority vote; the averaging rule applies to regression forests.",
      },
      {
        question: "Splitting data into training and test sets exists to:",
        options: [
          "Speed up training",
          "Estimate performance on data the model has never seen",
          "Reduce the number of features",
          "Balance the class distribution",
        ],
        answer: 1,
        explanation:
          "Accuracy measured on training data is optimistically biased. Only held-out data estimates how the model will generalise.",
      },
    ],
    posttest: [
      {
        question: "The random forest was created with oob_score=True. The out-of-bag score is:",
        options: [
          "Accuracy on the training set",
          "Accuracy measured for each sample using only the trees that did not see it during bootstrapping",
          "Accuracy on the test set",
          "The average depth of the trees",
        ],
        answer: 1,
        explanation:
          "Roughly a third of samples are left out of each bootstrap draw. Scoring each point on exactly those trees gives a validation estimate for free.",
      },
      {
        question: "Feature importances were plotted with error bars showing the standard deviation across trees. This communicates:",
        options: [
          "How long each tree took to train",
          "How consistently the trees agree about a feature's usefulness",
          "The number of times a feature appears in the data",
          "The correlation between features",
        ],
        answer: 1,
        explanation:
          "A large bar with a wide error range means the trees disagree, which matters when correlated features can substitute for one another.",
      },
      {
        question: "In the accuracy-versus-trees curve, accuracy rises quickly and then flattens. This is because:",
        options: [
          "The forest starts overfitting after a certain size",
          "Averaging over more trees reduces variance with diminishing returns once errors have largely cancelled",
          "The dataset runs out of samples",
          "Later trees are trained on less data",
        ],
        answer: 1,
        explanation:
          "Variance falls roughly as 1/number of trees. Notably, adding trees does not cause overfitting — it simply stops helping.",
      },
      {
        question: "Petal measurements dominated the importance chart over sepal measurements because:",
        options: [
          "They appear first in the dataset",
          "They separate the three iris species far more cleanly",
          "They are measured in different units",
          "The forest ignores the last two columns",
        ],
        answer: 1,
        explanation:
          "Petal length and width separate the species almost perfectly, so splits on them cut impurity the most and earn the highest importance.",
      },
      {
        question: "Randomness enters a random forest through two mechanisms:",
        options: [
          "Random initial weights and random learning rates",
          "Bootstrap sampling of rows and random subsetting of features at each split",
          "Random pruning and random labels",
          "Random test splits and random seeds only",
        ],
        answer: 1,
        explanation:
          "Row randomness alone would leave trees highly correlated when one feature is dominant. Restricting the features considered at each split decorrelates them further.",
      },
    ],
  },

  6: {
    pretest: [
      {
        question: "A decision stump is a decision tree with:",
        options: ["No splits", "Exactly one split", "One split per feature", "Unlimited depth"],
        answer: 1,
        explanation:
          "A stump has max_depth=1: it asks a single question about a single feature. On its own it is barely better than guessing, which makes it the archetypal weak learner.",
      },
      {
        question: "Boosting differs from bagging in that its models are trained:",
        options: [
          "Independently and in parallel",
          "Sequentially, each one correcting its predecessor",
          "On disjoint subsets of the features",
          "Using different algorithms each round",
        ],
        answer: 1,
        explanation:
          "Bagging builds independent models and averages them. Boosting is inherently sequential — round k+1 depends on what round k got wrong.",
      },
      {
        question: "A weak learner is one that performs:",
        options: [
          "Worse than random guessing",
          "Only slightly better than random guessing",
          "Perfectly on training data",
          "Well only on large datasets",
        ],
        answer: 1,
        explanation:
          "Boosting theory requires only that each learner beat chance. That small edge, accumulated over many rounds, is enough to build a strong classifier.",
      },
      {
        question: "In AdaBoost, after a round of training, misclassified samples have their weights:",
        options: ["Decreased", "Increased", "Set to zero", "Left unchanged"],
        answer: 1,
        explanation:
          "Raising the weight of missed samples forces the next learner to concentrate on them — the 'adaptive' part of Adaptive Boosting.",
      },
      {
        question: "The stratify argument in train_test_split ensures that:",
        options: [
          "The data is sorted before splitting",
          "The class proportions are preserved in both splits",
          "The split is reproducible",
          "Features are scaled to the same range",
        ],
        answer: 1,
        explanation:
          "Without stratification an unlucky split can leave a class badly under-represented in the test set, making the accuracy estimate unreliable.",
      },
    ],
    posttest: [
      {
        question: "staged_predict was used instead of refitting a model for each ensemble size because it:",
        options: [
          "Gives more accurate results",
          "Replays the already-fitted ensemble one round at a time, avoiding repeated training",
          "Is the only method that accepts test data",
          "Automatically selects the best number of rounds",
        ],
        answer: 1,
        explanation:
          "The prediction after k rounds is just the weighted vote of the first k learners, so one fitted model yields the entire error curve.",
      },
      {
        question: "The estimator_weights_ array plotted in the experiment holds:",
        options: [
          "The sample weights at each round",
          "The vote weight α of each weak learner, larger for more accurate stumps",
          "The feature importances",
          "The training error of each stump",
        ],
        answer: 1,
        explanation:
          "α is derived from each learner's weighted error. An accurate stump earns a louder vote in the final weighted decision.",
      },
      {
        question: "Fifty stumps substantially outperformed a single stump. The reason is:",
        options: [
          "Each stump is trained on more data",
          "Each stump targets the samples its predecessors misclassified, so together they carve out a complex boundary",
          "The stumps are deeper than the single one",
          "Errors are averaged out as in bagging",
        ],
        answer: 1,
        explanation:
          "Boosting reduces bias by construction: every round explicitly attacks the residual errors, letting depth-1 models combine into a flexible classifier.",
      },
      {
        question: "AdaBoost is described as sensitive to noisy data and outliers because:",
        options: [
          "It uses shallow trees",
          "Persistently misclassified points keep gaining weight, so later learners chase mislabelled examples",
          "It cannot handle continuous features",
          "It requires the data to be standardised",
        ],
        answer: 1,
        explanation:
          "The reweighting that makes boosting powerful has no way to distinguish a hard example from a corrupted label, and will pursue both.",
      },
      {
        question: "In the error curve, the training error kept falling while the test error levelled off. This gap represents:",
        options: [
          "A bug in the implementation",
          "The onset of overfitting — the ensemble is fitting detail specific to the training set",
          "The learning rate decaying",
          "Class imbalance in the test set",
        ],
        answer: 1,
        explanation:
          "A widening train/test gap is the standard signature of overfitting, and is why the number of boosting rounds is a parameter worth tuning.",
      },
    ],
  },

  7: {
    pretest: [
      {
        question: "In SVM terminology, the margin is:",
        options: [
          "The total number of misclassified points",
          "The distance between the hyperplane and the nearest training points of each class",
          "The gap between the training and test accuracy",
          "The regularisation penalty",
        ],
        answer: 1,
        explanation:
          "SVM maximises this width on the principle that a boundary sitting far from every class generalises better than one that grazes them.",
      },
      {
        question: "Support vectors are:",
        options: [
          "All points in the training set",
          "The points lying on or inside the margin, which alone determine the boundary",
          "The points furthest from the boundary",
          "The eigenvectors of the data matrix",
        ],
        answer: 1,
        explanation:
          "Every other training point could be deleted without moving the hyperplane. That sparsity is a defining property of SVMs.",
      },
      {
        question: "A hyperplane in two-dimensional space is:",
        options: ["A point", "A line", "A plane", "A sphere"],
        answer: 1,
        explanation:
          "A hyperplane has one dimension fewer than the space containing it: a line in 2-D, a plane in 3-D.",
      },
      {
        question: "The kernel trick allows an SVM to:",
        options: [
          "Train faster on small datasets",
          "Find a linear boundary in a higher-dimensional space without ever computing the coordinates there",
          "Handle missing values automatically",
          "Reduce the number of features",
        ],
        answer: 1,
        explanation:
          "A kernel computes inner products in the transformed space directly. The mapping is implicit, so the cost never depends on that space's dimension.",
      },
      {
        question: "The equation of the SVM decision boundary is:",
        options: ["wᵀx + b = 1", "wᵀx + b = 0", "wᵀx = ‖w‖", "y = wx² + b"],
        answer: 1,
        explanation:
          "The boundary is the zero level set. The ±1 level sets form the margin's edges, which is why they appear as dashed lines in the plot.",
      },
    ],
    posttest: [
      {
        question: "The experiment showed that decreasing C increases the number of support vectors. This is because a small C:",
        options: [
          "Penalises margin violations weakly, allowing a wider margin that encloses more points",
          "Forces the model to fit every training point exactly",
          "Reduces the number of features considered",
          "Switches the kernel to linear",
        ],
        answer: 0,
        explanation:
          "C trades margin width against violations. A small C buys a wider, softer margin — more tolerant of errors, and more points inside it.",
      },
      {
        question: "decision_function was plotted rather than predict because it:",
        options: [
          "Runs faster",
          "Returns the signed distance to the hyperplane, so the ±1 margin contours can be drawn",
          "Is the only method that accepts a meshgrid",
          "Returns probabilities instead of labels",
        ],
        answer: 1,
        explanation:
          "predict returns only a label, which can show the boundary but not the margin. The signed distance carries the extra information the plot needs.",
      },
      {
        question: "The RBF kernel produced a curved boundary while the linear kernel produced a straight one because:",
        options: [
          "RBF uses more training data",
          "RBF corresponds to an infinite-dimensional feature space, so a linear boundary there maps back to a curve here",
          "RBF ignores the C parameter",
          "The linear kernel failed to converge",
        ],
        answer: 1,
        explanation:
          "Every kernel SVM is linear in its own feature space. Curvature appears when that boundary is projected back into the original coordinates.",
      },
      {
        question: "With gamma='scale', the RBF kernel width is set:",
        options: [
          "To a fixed value of 1.0",
          "From the number of features and the variance of the data",
          "By cross-validation",
          "Equal to the value of C",
        ],
        answer: 1,
        explanation:
          "gamma = 1/(n_features · X.var()) adapts the kernel to the data's scale, which is why it is a far safer default than a fixed constant.",
      },
      {
        question: "An SVM trained on a dataset where every point is a support vector most likely indicates:",
        options: [
          "A perfect fit",
          "A very small C or a poorly chosen kernel, leaving the model unable to separate the classes cleanly",
          "That the data is linearly separable",
          "That training has not finished",
        ],
        answer: 1,
        explanation:
          "The sparsity of support vectors is the payoff of a good separation. When it disappears, the boundary is being propped up by the whole dataset.",
      },
    ],
  },

  8: {
    pretest: [
      {
        question: "A spanning tree of a connected graph with n nodes has exactly:",
        options: ["n edges", "n − 1 edges", "n(n−1)/2 edges", "2n edges"],
        answer: 1,
        explanation:
          "n − 1 edges is the minimum needed to connect n nodes; one more would create a cycle, one fewer would disconnect the graph.",
      },
      {
        question: "A minimum spanning tree is the spanning tree that:",
        options: [
          "Has the fewest nodes",
          "Has the smallest total edge weight",
          "Has the shortest single edge",
          "Contains no cycles",
        ],
        answer: 1,
        explanation:
          "Every spanning tree is acyclic and has n − 1 edges. The minimum one is distinguished by having the least total weight.",
      },
      {
        question: "Divisive clustering is:",
        options: [
          "Bottom-up: each point starts alone and clusters are merged",
          "Top-down: all points start together and clusters are split",
          "Density-based",
          "Only applicable to labelled data",
        ],
        answer: 1,
        explanation:
          "Divisive is top-down; agglomerative clustering is the bottom-up counterpart that repeatedly merges the closest pair.",
      },
      {
        question: "The Euclidean distance between (0, 0) and (3, 4) is:",
        options: ["5", "7", "12", "25"],
        answer: 0,
        explanation: "√(3² + 4²) = √25 = 5 — the familiar 3-4-5 right triangle.",
      },
      {
        question: "Removing one edge from a tree results in:",
        options: [
          "A graph with a cycle",
          "Two disconnected components",
          "An unchanged tree",
          "A complete graph",
        ],
        answer: 1,
        explanation:
          "A tree has exactly one path between any two nodes, so removing any edge necessarily splits it in two. This is what makes MST cutting a clean clustering step.",
      },
    ],
    posttest: [
      {
        question: "To obtain k clusters from the MST, the number of edges removed is:",
        options: ["k", "k − 1", "k + 1", "n − k"],
        answer: 1,
        explanation:
          "Each cut increases the component count by exactly one. Starting from one connected tree, k − 1 cuts yield k clusters.",
      },
      {
        question: "The edges chosen for removal were the longest ones because:",
        options: [
          "Long edges are usually measurement errors",
          "An edge bridging two clusters must span the gap between them, making it far longer than within-cluster edges",
          "Shorter edges are harder to remove computationally",
          "The algorithm requires edges in sorted order",
        ],
        answer: 1,
        explanation:
          "The sorted edge-length plot made this visible: a cluster of short intra-group edges, then a sharp jump to the few edges that bridge groups.",
      },
      {
        question: "The complete graph on 75 points had 2775 edges, but the MST kept only 74. The MST is useful here because it:",
        options: [
          "Is faster to draw",
          "Retains the connectivity structure of the data while discarding redundant long-range edges",
          "Guarantees clusters of equal size",
          "Removes outliers automatically",
        ],
        answer: 1,
        explanation:
          "The MST is a minimal skeleton of the data's connectivity. Clustering decisions become a matter of finding the weak links in that skeleton.",
      },
      {
        question: "The adjusted Rand index reported at the end measures:",
        options: [
          "The total edge weight of the MST",
          "How well the recovered clusters agree with the true groups, corrected for chance agreement",
          "The number of iterations required",
          "The variance within each cluster",
        ],
        answer: 1,
        explanation:
          "It scores partition agreement independently of how the clusters are labelled, and is 0 for a random partition and 1 for a perfect match.",
      },
      {
        question: "Compared with k-means, MST-based clustering is better suited to:",
        options: [
          "Very large datasets",
          "Clusters with elongated or non-convex shapes",
          "Data with many features",
          "Data containing missing values",
        ],
        answer: 1,
        explanation:
          "k-means assumes roughly spherical clusters around a centroid. MST cutting follows connectivity instead, so a crescent or a chain is handled naturally.",
      },
    ],
  },

  9: {
    pretest: [
      {
        question: "A Gaussian Mixture Model assumes the data is generated from:",
        options: [
          "A single normal distribution",
          "A weighted combination of several normal distributions",
          "A uniform distribution",
          "No distribution at all",
        ],
        answer: 1,
        explanation:
          "Each component is a Gaussian with its own mean and covariance; the mixing weights give the probability of drawing from each.",
      },
      {
        question: "Soft clustering differs from hard clustering in that each point is:",
        options: [
          "Assigned to exactly one cluster",
          "Given a probability of belonging to every cluster",
          "Left unassigned",
          "Assigned to the nearest two clusters",
        ],
        answer: 1,
        explanation:
          "Soft assignment retains uncertainty. A point midway between two components can be recorded as roughly 50/50 rather than forced into one.",
      },
      {
        question: "The E-step of the EM algorithm computes:",
        options: [
          "The updated means and covariances",
          "The responsibility of each component for each data point, given the current parameters",
          "The number of clusters",
          "The final cluster labels",
        ],
        answer: 1,
        explanation:
          "E is for Expectation: with parameters held fixed, it computes the expected assignment of every point.",
      },
      {
        question: "The M-step of the EM algorithm:",
        options: [
          "Merges nearby clusters",
          "Updates the parameters to maximise the likelihood, weighting each point by its responsibility",
          "Measures the distance between points",
          "Removes outliers",
        ],
        answer: 1,
        explanation:
          "M is for Maximization: with responsibilities held fixed, each Gaussian is refitted using them as weights.",
      },
      {
        question: "A covariance matrix describes:",
        options: [
          "The mean of each feature",
          "How features vary together, which sets the shape and orientation of the distribution",
          "The number of data points",
          "The distance between clusters",
        ],
        answer: 1,
        explanation:
          "Diagonal entries give per-feature variance and off-diagonal entries give the pairwise covariances, together determining the ellipse drawn in the plot.",
      },
    ],
    posttest: [
      {
        question: "The log-likelihood curve rose monotonically across iterations. EM guarantees this because:",
        options: [
          "The learning rate decreases each step",
          "Each E-step and M-step can only increase or leave unchanged the likelihood of the observed data",
          "The data was standardised beforehand",
          "The number of components was fixed",
        ],
        answer: 1,
        explanation:
          "That monotonic ascent is EM's central theoretical guarantee. It ensures convergence — though only to a local maximum, which is why n_init > 1 helps.",
      },
      {
        question: "Points ringed in red in the cluster plot were those with:",
        options: [
          "The largest distance from any mean",
          "A maximum responsibility below 0.9, meaning the model was genuinely uncertain",
          "Incorrect ground-truth labels",
          "The highest probability density",
        ],
        answer: 1,
        explanation:
          "They sit where two components overlap. k-means would silently assign each to one cluster; EM records that the assignment is doubtful.",
      },
      {
        question: "BIC was used to choose the number of components. Compared with log-likelihood alone, BIC:",
        options: [
          "Is always larger",
          "Adds a penalty for the number of parameters, preventing an ever-increasing component count",
          "Ignores the sample size",
          "Can only be used with two components",
        ],
        answer: 1,
        explanation:
          "Likelihood never decreases as components are added, so it would always pick the largest model. BIC's complexity penalty is what makes selection meaningful.",
      },
      {
        question: "The from-scratch EM and sklearn's GaussianMixture reached almost identical partitions. This confirms that:",
        options: [
          "sklearn uses the same random seed",
          "GaussianMixture.fit is itself running the E and M steps implemented by hand",
          "The dataset is trivially easy",
          "Both used the same number of iterations",
        ],
        answer: 1,
        explanation:
          "The library adds initialisation strategies and numerical safeguards, but the algorithm underneath is exactly the alternating scheme written out in the experiment.",
      },
      {
        question: "The ellipses drawn at 1σ and 2σ were derived from each component's covariance by:",
        options: [
          "Taking the mean of its entries",
          "Eigendecomposition: eigenvectors give the axis directions and eigenvalues give the axis lengths",
          "Inverting the matrix",
          "Computing its determinant",
        ],
        answer: 1,
        explanation:
          "The same eigendecomposition idea underpins PCA in Experiment 10 — eigenvectors of a covariance matrix are always its principal axes.",
      },
    ],
  },

  10: {
    pretest: [
      {
        question: "The purpose of PCA is to:",
        options: [
          "Classify data into categories",
          "Re-express data on fewer axes while retaining as much variance as possible",
          "Fill in missing values",
          "Increase the number of features",
        ],
        answer: 1,
        explanation:
          "PCA finds new orthogonal axes ordered by the variance they capture, so the trailing ones can be dropped at little cost.",
      },
      {
        question: "For a matrix A, a vector v is an eigenvector when:",
        options: [
          "Av = 0",
          "Av = λv for some scalar λ",
          "vᵀv = 0",
          "Av = vᵀ",
        ],
        answer: 1,
        explanation:
          "An eigenvector's direction survives the transformation unchanged; only its length is scaled, by the eigenvalue λ.",
      },
      {
        question: "Standardising data before PCA is necessary because:",
        options: [
          "PCA cannot handle negative numbers",
          "Otherwise a feature measured in large units dominates the variance regardless of its importance",
          "It reduces the number of samples",
          "Eigenvectors require positive inputs",
        ],
        answer: 1,
        explanation:
          "PCA maximises variance, and variance depends on units. Measuring a length in millimetres instead of metres would otherwise make it appear a million times more important.",
      },
      {
        question: "The covariance matrix of a dataset with d features has shape:",
        options: ["n×n", "d×d", "n×d", "d×1"],
        answer: 1,
        explanation:
          "It holds a covariance for every pair of features, so it is d×d and always symmetric.",
      },
      {
        question: "The explained variance ratio of a principal component is:",
        options: [
          "Its eigenvalue divided by the sum of all eigenvalues",
          "Its eigenvalue multiplied by the number of samples",
          "The length of its eigenvector",
          "The correlation between two features",
        ],
        answer: 0,
        explanation:
          "Each eigenvalue is the variance along its component, so dividing by the total gives that component's share.",
      },
    ],
    posttest: [
      {
        question: "np.linalg.eigh was used instead of np.linalg.eig because the covariance matrix is:",
        options: [
          "Always invertible",
          "Symmetric, so eigh is faster and returns real, correctly ordered results",
          "Diagonal",
          "Too large for eig",
        ],
        answer: 1,
        explanation:
          "eig is the general routine and can return complex values from rounding error. eigh exploits symmetry to guarantee real eigenvalues and orthogonal eigenvectors.",
      },
      {
        question: "The projections from the manual implementation and from sklearn agreed only in absolute value. The sign difference arises because:",
        options: [
          "One implementation contains a bug",
          "An eigenvector and its negation describe the same axis, so the sign is arbitrary",
          "sklearn standardises the data differently",
          "The data contains negative values",
        ],
        answer: 1,
        explanation:
          "If v is an eigenvector then so is −v, with the same eigenvalue. Flipping a component mirrors the plot without changing any distance or variance.",
      },
      {
        question: "Iris was reduced from four dimensions to two while retaining roughly 96% of the variance. This is possible because:",
        options: [
          "Two of the features contain no information",
          "The four measurements are strongly correlated, so they carry less than four dimensions' worth of independent information",
          "Two features were discarded before the analysis",
          "The dataset has only three classes",
        ],
        answer: 1,
        explanation:
          "The correlation matrix printed by the solution shows the redundancy directly. PCA converts correlation into compressibility.",
      },
      {
        question: "In the loadings plot, PC1 had large same-sign contributions from petal length, petal width and sepal length. PC1 therefore represents:",
        options: [
          "Measurement noise",
          "Overall flower size, since these measurements grow together",
          "The difference between petals and sepals",
          "The species label",
        ],
        answer: 1,
        explanation:
          "A component with uniform same-sign loadings is a general size factor — which is why a single axis nearly separates setosa from the other two species.",
      },
      {
        question: "PCA is described as unsupervised. In this experiment that means the class labels were:",
        options: [
          "Used to compute the components",
          "Used only to colour the plot, never in fitting",
          "Predicted by the algorithm",
          "Required for standardisation",
        ],
        answer: 1,
        explanation:
          "PCA saw only the four measurements. That the species separate so cleanly on PC1 and PC2 is a property the algorithm discovered without being told the labels.",
      },
    ],
  },
};
