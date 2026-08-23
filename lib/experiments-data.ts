// ============================================================================
// Assembled experiment data — theory, algorithm, instructions + code
// ============================================================================
import type { Experiment } from "./experiments";
import { quizzes } from "./quizzes";
import { references } from "./references";
import { ex01 } from "./code/ex01";
import { ex02 } from "./code/ex02";
import { ex03 } from "./code/ex03";
import { ex04 } from "./code/ex04";
import { ex05 } from "./code/ex05";
import { ex06 } from "./code/ex06";
import { ex07 } from "./code/ex07";
import { ex08 } from "./code/ex08";
import { ex09 } from "./code/ex09";
import { ex10 } from "./code/ex10";

// Re-export shared constants so pages can import everything from one module
export { courseInfo, labOutcomes } from "./experiments";
export type { Experiment, LabOutcome } from "./experiments";

type ExperimentContent = Omit<Experiment, "pretest" | "posttest" | "references">;

const content: ExperimentContent[] = [
  {
    id: "simple-linear-regression",
    number: 1,
    title: "Simple Linear Regression",
    shortTitle: "Simple Linear Regression",
    lo: "LO1",
    category: "Regression",
    aim: "To implement Simple Linear Regression in Python through three approaches: (1) using parameters β0 and β1 directly via the least-squares method, (2) using Gradient Descent for parameter optimization, and (3) using Python library functions (scikit-learn).",
    theory: `<p><strong>Simple Linear Regression</strong> models the relationship between an independent variable <code>X</code> and a dependent variable <code>Y</code> using the equation:</p>
    <p><code>Y = β0 + β1·X + ε</code></p>
    <ul><li><strong>Y</strong>: Dependent variable (target)</li><li><strong>X</strong>: Independent variable (predictor)</li>
    <li><strong>β0</strong>: Intercept (value of Y when X = 0)</li><li><strong>β1</strong>: Slope (rate of change of Y w.r.t. X)</li><li><strong>ε</strong>: Error term</li></ul>
    <p>The aim is to find the best-fit line that minimizes the prediction error.</p>
    <p><strong>Part 1 — Direct parameters:</strong> β0 and β1 are calculated directly using the least-squares method. Efficient for smaller datasets and gives an exact solution.</p>
    <p><strong>Part 2 — Gradient Descent:</strong> An iterative optimization technique that minimizes the Mean Squared Error (MSE). Parameters are updated using partial derivatives with <code>α</code> as the learning rate, until convergence.</p>
    <p><strong>Part 3 — Python library:</strong> scikit-learn's <code>LinearRegression()</code> handles computation automatically — <code>model.fit(X, Y)</code>, then <code>model.coef_</code> and <code>model.intercept_</code> give the parameters.</p>`,
    algorithm: [
      "Part 1 (Direct): Compute β1 = Σ(Xi−X̄)(Yi−Ȳ) / Σ(Xi−X̄)² and β0 = Ȳ − β1·X̄.",
      "Part 2 (Gradient Descent): Initialize β0=β1=0. For each epoch compute predictions, the MSE cost, and update β0 and β1 using the gradient with learning rate α.",
      "Part 3 (sklearn): Fit LinearRegression().fit(X, Y), extract coef_ (β1) and intercept_ (β0), and predict with model.predict(X).",
      "Compare the results of all three methods — they should be nearly identical.",
    ],
    instructions: [
      "Read the Aim and Theory tabs to understand the three approaches.",
      "Open the Code editor — the starter code has TODO markers for each part.",
      "Implement Part 1: compute β0 and β1 directly using the least-squares formulas.",
      "Implement Part 2: write the Gradient Descent loop (initialize params, loop over epochs, compute gradients, update).",
      "Implement Part 3: use sklearn's LinearRegression to fit and predict.",
      "Add a plot showing the data points and all three regression lines.",
      "Click Run to execute. Check the Output console for parameters and the Plot viewer for the visual comparison.",
      "If you get stuck, click Load Solution to see a complete working example.",
    ],
    keyConcepts: ["Least-squares estimation", "Gradient Descent", "MSE cost function", "Learning rate", "scikit-learn LinearRegression", "R² score"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex01.starterCode,
    solutionCode: ex01.solutionCode,
  },
  {
    id: "multiple-linear-regression",
    number: 2,
    title: "Multiple Linear Regression",
    shortTitle: "Multiple Linear Regression",
    lo: "LO1",
    category: "Regression",
    aim: "To implement Multiple Linear Regression in Python using: (1) the matrix/normal-equation method, (2) Gradient Descent, and (3) Python library functions (scikit-learn).",
    theory: `<p><strong>Multiple Linear Regression</strong> models the relationship between a dependent variable <code>Y</code> and multiple independent variables <code>X1, X2, …, Xn</code>:</p>
    <p><code>Y = β0 + β1·X1 + β2·X2 + … + βn·Xn + ε</code></p>
    <p><strong>Part 1 — Matrix (Normal Equation):</strong> In matrix form: <code>Y = Xβ + ε</code> where X is an n×(p+1) matrix (with a column of 1s for the intercept). The optimal parameters: <code>β = (XᵀX)⁻¹ XᵀY</code>. This gives an exact solution but can be expensive for very large datasets.</p>
    <p><strong>Part 2 — Gradient Descent:</strong> Iteratively minimizes the MSE by updating all parameters simultaneously using the gradient <code>∇ = (2/n)·Xᵀ(Xβ − Y)</code> with learning rate α.</p>
    <p><strong>Part 3 — sklearn:</strong> <code>LinearRegression().fit(X, Y)</code> computes everything internally; use <code>model.coef_</code> and <code>model.intercept_</code> to retrieve the parameters.</p>`,
    algorithm: [
      "Construct the design matrix X_bias by prepending a column of 1s to X.",
      "Part 1 (Normal Equation): Compute β = (XᵀX)⁻¹ XᵀY using np.linalg.inv.",
      "Part 2 (Gradient Descent): Initialize β = 0. For each epoch, compute predictions Xβ, the gradient, and update β ← β − α·gradient.",
      "Part 3 (sklearn): Fit LinearRegression().fit(X, Y) and extract coefficients.",
      "Compare all three sets of coefficients and evaluate with MSE and R².",
    ],
    instructions: [
      "Review the Theory tab to understand the normal equation and matrix formulation.",
      "In the code editor, implement Part 1 by building X_bias and computing β with np.linalg.inv.",
      "Implement Part 2: write the Gradient Descent loop for multiple features (update the entire β vector).",
      "Implement Part 3: use sklearn's LinearRegression for comparison.",
      "Add a scatter plot of predicted vs actual values.",
      "Click Run and verify all three methods produce similar coefficients.",
      "Use Load Solution if you need a reference implementation.",
    ],
    keyConcepts: ["Normal equation", "Matrix formulation", "Multivariate gradient descent", "Design matrix", "MSE", "R² score"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex02.starterCode,
    solutionCode: ex02.solutionCode,
  },
  {
    id: "multivariate-linear-regression",
    number: 3,
    title: "Multivariate Linear Regression",
    shortTitle: "Multivariate Linear Regression",
    lo: "LO1",
    category: "Regression",
    aim: "To implement Multivariate Linear Regression in Python using: (1) one independent variable and multiple dependent variables, and (2) multiple independent variables and multiple dependent variables, utilizing the matrix method for parameter estimation.",
    theory: `<p><strong>Multivariate Linear Regression</strong> involves <strong>multiple dependent variables</strong> (responses), unlike simple multiple regression which has only one. The equation is:</p>
    <p><code>Y = Xβ + ε</code></p>
    <ul><li><strong>Y</strong>: n×m matrix of dependent variables (m = number of responses)</li>
    <li><strong>X</strong>: n×(p+1) matrix of independent variables (with a column of 1s for the intercept)</li>
    <li><strong>β</strong>: (p+1)×m matrix of regression coefficients</li><li><strong>ε</strong>: n×m error matrix</li></ul>
    <p>The optimal parameters are estimated using the normal equation: <code>β̂ = (XᵀX)⁻¹ XᵀY</code>, minimizing the sum of squared errors.</p>
    <p><strong>Part 1:</strong> One IV and multiple DVs — find regression coefficients for each DV with respect to the single IV.</p>
    <p><strong>Part 2:</strong> Multiple IVs and multiple DVs — find the optimal coefficient matrix that minimizes residual error for all responses simultaneously.</p>`,
    algorithm: [
      "Part 1: Create X (single IV, with intercept column) and Y (m columns of DVs). Compute β = (XᵀX)⁻¹ XᵀY, resulting in a (2×m) coefficient matrix.",
      "Part 2: Create X (p IVs, with intercept column) and Y (m DVs). Compute β = (XᵀX)⁻¹ XᵀY, resulting in a ((p+1)×m) coefficient matrix.",
      "Use the coefficient matrix to predict all dependent variables simultaneously.",
      "Visualize the fits and compute R² for each dependent variable.",
    ],
    instructions: [
      "Read the Theory to understand how multivariate regression differs from multiple regression (multiple outputs, not multiple inputs).",
      "Implement Part 1: create one independent variable and three dependent variables, then compute the coefficient matrix using the normal equation.",
      "Plot each dependent variable with its regression line.",
      "Implement Part 2: create a matrix of 3 independent variables and 2 dependent variables, compute β, and evaluate R² for each DV.",
      "Click Run to see the plots and coefficient estimates.",
      "Compare estimated coefficients with the true values used to generate the data.",
    ],
    keyConcepts: ["Multiple dependent variables", "Normal equation (matrix form)", "Coefficient matrix", "Simultaneous prediction", "R² for multiple outputs"],
    packages: ["numpy", "matplotlib"],
    starterCode: ex03.starterCode,
    solutionCode: ex03.solutionCode,
  },
  {
    id: "logistic-regression",
    number: 4,
    title: "Logistic Regression",
    shortTitle: "Logistic Regression",
    lo: "LO2",
    category: "Classification",
    aim: "To implement Logistic Regression with the Gradient Descent approach for parameter optimization.",
    theory: `<p><strong>Logistic Regression</strong> is a classification algorithm that models the probability of a binary outcome (0 or 1) using the <strong>sigmoid function</strong>. The predicted probability is constrained between 0 and 1.</p>
    <p><strong>Sigmoid function:</strong> <code>p = 1 / (1 + e^(−z))</code> where <code>z = β0 + β1·X</code>.</p>
    <p><strong>Cost function (Log Loss / Cross-Entropy):</strong></p>
    <p><code>J = −(1/n) Σ [ y·log(p) + (1−y)·log(1−p) ]</code></p>
    <p><strong>Gradient Descent update rules:</strong></p>
    <ul><li><code>dW = (1/n) · Xᵀ(p − y)</code></li><li><code>db = (1/n) · Σ(p − y)</code></li></ul>
    <p><strong>Linear vs Logistic Regression:</strong> Linear Regression predicts continuous values (e.g., house prices) using a straight line with MSE loss. Logistic Regression predicts binary class probabilities (e.g., spam detection) using the sigmoid with Log Loss. Linear output is unbounded; Logistic output is between 0 and 1.</p>`,
    algorithm: [
      "Initialize parameters β0 (bias) and β1 (weights) to zero.",
      "Compute predictions using the sigmoid function: p = σ(X·W + b).",
      "Calculate the gradient of the cross-entropy cost function.",
      "Update parameters: W ← W − α·dW, b ← b − α·db.",
      "Repeat steps 2–4 until convergence (for a fixed number of epochs).",
      "Classify: if p ≥ 0.5 predict class 1, else class 0.",
    ],
    instructions: [
      "Review the Theory tab — understand the sigmoid function and cross-entropy loss.",
      "Implement the sigmoid function in the code editor.",
      "Write the training loop: initialize W and b, loop over epochs computing predictions, cost, gradients, and updates.",
      "After training, compute predictions with a 0.5 threshold and print accuracy + confusion matrix.",
      "Plot the data points with the decision boundary and the cost convergence curve.",
      "Click Run to execute and view the output and plots.",
      "Try changing the learning rate and number of epochs to see how convergence changes.",
    ],
    keyConcepts: ["Sigmoid function", "Binary classification", "Cross-entropy (Log Loss)", "Gradient Descent", "Decision boundary", "Probability threshold"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex04.starterCode,
    solutionCode: ex04.solutionCode,
  },
  {
    id: "random-forest",
    number: 5,
    title: "Ensemble Learning: Random Forest",
    shortTitle: "Random Forest",
    lo: "LO2",
    category: "Ensemble Learning",
    aim: "To implement the Ensemble Method: Random Forest in Python and understand its working and significance.",
    theory: `<p><strong>Ensemble methods</strong> combine multiple models (weak learners) to improve overall performance by reducing variance, bias, or improving predictions.</p>
    <p><strong>Random Forest</strong> constructs multiple decision trees during training and outputs the class (classification) or average prediction (regression) from all trees. It introduces randomness by selecting random subsets of features and data points for each tree, making the model robust to overfitting and noise.</p>
    <p><strong>Algorithm:</strong></p>
    <ul><li>Select random subsets of data and features for each tree (bootstrap sampling).</li>
    <li>Build a decision tree for each subset without pruning.</li>
    <li>For classification, use majority voting across trees; for regression, take the average.</li>
    <li>Repeat for all trees and combine their predictions.</li></ul>
    <p>Random Forest mitigates overfitting and enhances accuracy through aggregation of multiple decision trees. It handles large, high-dimensional datasets well.</p>`,
    algorithm: [
      "Import sklearn.ensemble.RandomForestClassifier/Regressor.",
      "Load or generate the dataset and split into training and testing sets.",
      "Train the Random Forest model with chosen parameters (e.g., n_estimators = number of trees).",
      "Predict on the test set and evaluate with accuracy or MSE.",
      "Examine feature importances to understand which features drive predictions.",
      "Experiment with different numbers of trees to observe the effect on accuracy.",
    ],
    instructions: [
      "Read the Theory to understand bootstrap sampling and majority voting.",
      "In the editor, create a RandomForestClassifier with 100 trees and fit it on the Iris dataset.",
      "Predict on the test set and print accuracy, confusion matrix, and classification report.",
      "Plot the feature importances as a bar chart.",
      "Add a line plot showing how accuracy changes with the number of trees (1, 5, 10, 25, 50, 100, 200).",
      "Click Run and observe the plots. Try changing n_estimators to see the effect.",
    ],
    keyConcepts: ["Bootstrap sampling", "Decision trees", "Majority voting", "Feature importance", "Bias-variance tradeoff", "Overfitting reduction"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex05.starterCode,
    solutionCode: ex05.solutionCode,
  },
  {
    id: "adaboost",
    number: 6,
    title: "Ensemble Learning: AdaBoost",
    shortTitle: "AdaBoost",
    lo: "LO2",
    category: "Ensemble Learning",
    aim: "To implement the Ensemble Method: AdaBoost in Python and understand its working and significance.",
    theory: `<p><strong>AdaBoost (Adaptive Boosting)</strong> is an ensemble technique that sequentially builds a series of models, with each new model focusing on the mistakes made by the previous ones. Unlike Random Forest, which builds trees independently, AdaBoost assigns higher weights to incorrectly classified instances, guiding the next learner to focus more on these errors.</p>
    <p><strong>Algorithm — AdaBoost:</strong></p>
    <ul><li>Initialize equal weights for all data points.</li>
    <li>Train a weak learner (e.g., a shallow decision tree / stump) on the dataset.</li>
    <li>Calculate the weighted error and update the weights of misclassified points.</li>
    <li>Train the next learner with updated weights and repeat for a predefined number of iterations.</li>
    <li>Combine predictions using weighted voting for classification or averaging for regression.</li></ul>
    <p>The final prediction is made by combining the weighted votes of all models. AdaBoost works well with simple base learners and is suitable for both classification and regression tasks, though it may be sensitive to noisy data.</p>`,
    algorithm: [
      "Import sklearn.ensemble.AdaBoostClassifier/Regressor.",
      "Load and split the dataset into training and test sets.",
      "Train the AdaBoost model with a chosen number of estimators (weak learners).",
      "Use the trained model to predict on the test set and evaluate with accuracy or error metrics.",
      "Compare with a single weak learner to see the improvement from boosting.",
      "Plot the error rate vs number of estimators to observe convergence.",
    ],
    instructions: [
      "Read the Theory to understand how AdaBoost differs from Random Forest (sequential vs parallel).",
      "Create an AdaBoostClassifier with a decision stump (max_depth=1) as the base estimator and 50 estimators.",
      "Fit on the Breast Cancer dataset and print accuracy, confusion matrix, and classification report.",
      "Compare the AdaBoost accuracy with a single decision stump.",
      "Plot the train and test error rates as a function of the number of estimators.",
      "Click Run and observe how boosting improves over a single weak learner.",
    ],
    keyConcepts: ["Adaptive weighting", "Weak learners (stumps)", "Sequential boosting", "Weighted voting", "Focus on hard examples", "Error reduction"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex06.starterCode,
    solutionCode: ex06.solutionCode,
  },
  {
    id: "support-vector-machine",
    number: 7,
    title: "Support Vector Machine (SVM)",
    shortTitle: "SVM",
    lo: "LO2",
    category: "Classification",
    aim: "To implement Supervised Support Vector Machine (SVM) in Python and understand its working.",
    theory: `<p><strong>Support Vector Machine (SVM)</strong> is a supervised learning algorithm used for both classification and regression. The primary idea is to find the optimal <strong>hyperplane</strong> that separates data points of different classes with the <strong>maximum margin</strong>.</p>
    <p>The margin is the distance between the closest data points (<strong>support vectors</strong>) of each class to the hyperplane. The decision boundary is defined by <code>wᵀx + b = 0</code>, where w is the weight vector, b is the bias, and x represents input features.</p>
    <p><strong>Algorithm — SVM:</strong></p>
    <ul><li>Define the objective to maximize the margin by minimizing ½||w||² subject to constraints yᵢ(wᵀxᵢ + b) ≥ 1.</li>
    <li>Solve the optimization using Lagrange multipliers or Quadratic Programming.</li>
    <li>For non-linearly separable data, apply the <strong>kernel trick</strong> to project data into a higher-dimensional space.</li>
    <li>Use the trained hyperplane to classify new data points.</li></ul>
    <p>SVM is effective for high-dimensional datasets and performs well for both linear and non-linear data using kernel methods (linear, RBF, polynomial).</p>`,
    algorithm: [
      "Import sklearn.svm.SVC.",
      "Load or create a dataset and split into training and test sets.",
      "Train the SVM model with a linear or non-linear kernel (e.g., 'rbf', 'poly').",
      "Predict the labels for the test set and evaluate with accuracy or confusion matrix.",
      "Compare different kernels to see which works best for the data.",
      "Visualize the decision boundary and highlight support vectors.",
    ],
    instructions: [
      "Review the Theory — understand hyperplanes, margins, and the kernel trick.",
      "Train SVM classifiers with three kernels: 'linear', 'rbf', and 'poly'.",
      "Print the accuracy and number of support vectors for each kernel.",
      "Plot the decision boundaries for all three kernels side by side, with support vectors highlighted.",
      "Click Run and compare how different kernels separate the data.",
      "Try changing the C parameter (regularization) to see how the margin changes.",
    ],
    keyConcepts: ["Hyperplane", "Maximum margin", "Support vectors", "Kernel trick (RBF, poly, linear)", "C parameter", "Non-linear separation"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex07.starterCode,
    solutionCode: ex07.solutionCode,
  },
  {
    id: "divisive-clustering-mst",
    number: 8,
    title: "Graph based clustering: Divisive Clustering",
    shortTitle: "Divisive Clustering (MST)",
    lo: "LO2",
    category: "Clustering",
    aim: "To implement the Divisive Clustering Algorithm based on Minimum Spanning Tree (MST) in Python and understand the graph-based clustering approach.",
    theory: `<p><strong>Divisive Clustering</strong> is a top-down hierarchical clustering algorithm, where the entire dataset starts as a single cluster and is iteratively split into smaller clusters until specific criteria are met.</p>
    <p><strong>Graph-based clustering</strong> represents data points as nodes connected by weighted edges; clusters are formed by splitting the graph. Using a <strong>Minimum Spanning Tree (MST)</strong> ensures we partition the data by removing the most significant edges, breaking the dataset along its natural groupings.</p>
    <p><strong>Algorithm — Divisive Clustering using MST:</strong></p>
    <ul><li>Represent the dataset as a graph, with nodes as data points and edges weighted by distance (e.g., Euclidean).</li>
    <li>Compute the MST using Prim's or Kruskal's algorithm to connect all nodes with minimal edge weight.</li>
    <li>Identify and remove the <strong>largest edge</strong> in the MST, breaking the graph into two clusters.</li>
    <li>Repeat recursively on each new subgraph until the required number of clusters is obtained.</li></ul>
    <p>This approach works well when data points form clusters with varying densities and shapes, capturing the natural structure of the graph.</p>`,
    algorithm: [
      "Import networkx (graph/MST) and scipy (distance computation).",
      "Create a graph using the dataset and compute the pairwise Euclidean distance matrix.",
      "Compute the MST using Kruskal's or Prim's algorithm.",
      "Remove the edge with the largest weight to split the graph into two clusters.",
      "Continue splitting iteratively (remove next-largest edges) to form the desired number of clusters.",
      "Visualize the MST and the final clusters.",
    ],
    instructions: [
      "Read the Theory to understand top-down (divisive) vs bottom-up (agglomerative) clustering.",
      "Create a synthetic dataset with 3 visual clusters.",
      "Compute the pairwise Euclidean distance matrix using scipy.spatial.distance.pdist.",
      "Build a complete weighted graph with networkx and compute the MST.",
      "Remove the 2 largest edges to form 3 clusters, then find connected components.",
      "Plot the MST before and after splitting, with clusters color-coded.",
      "Click Run and observe how removing the largest edges reveals natural cluster boundaries.",
    ],
    keyConcepts: ["Top-down hierarchy", "Minimum Spanning Tree", "Kruskal's algorithm", "Euclidean distance", "Connected components", "Graph partitioning"],
    packages: ["numpy", "matplotlib", "scipy", "networkx", "scikit-learn"],
    starterCode: ex08.starterCode,
    solutionCode: ex08.solutionCode,
  },
  {
    id: "expectation-maximization",
    number: 9,
    title: "Model based clustering: Expectation Maximization",
    shortTitle: "EM Algorithm (GMM)",
    lo: "LO3",
    category: "Clustering",
    aim: "To implement the Expectation Maximization (EM) Algorithm for model-based clustering using Gaussian Mixture Models (GMM) in Python.",
    theory: `<p>The <strong>EM algorithm</strong> is an iterative method for fitting models with latent variables. For clustering, it is used with <strong>Gaussian Mixture Models (GMM)</strong>, which assume the data is generated from a mixture of several Gaussian distributions.</p>
    <p><strong>EM Steps for GMM:</strong></p>
    <ul><li><strong>E-Step:</strong> Estimate the probability (responsibility) that each data point belongs to each cluster based on current parameters.</li>
    <li><strong>M-Step:</strong> Update the parameters (mean, covariance, mixing coefficients) to maximize the likelihood given the estimated responsibilities.</li></ul>
    <p>The algorithm continues until convergence, ensuring the log-likelihood improves with each iteration. Unlike k-means, EM assigns data points based on <strong>probabilities</strong> (soft clustering), making it robust to noise and overlapping clusters.</p>`,
    algorithm: [
      "Import sklearn.mixture.GaussianMixture.",
      "Load the dataset and initialize the GMM for the desired number of clusters.",
      "Fit the model using GMM.fit() — this runs the EM algorithm internally.",
      "Predict cluster assignments using GMM.predict().",
      "Visualize the clusters and the Gaussian component means.",
      "Evaluate using BIC or AIC for model selection (optimal number of components).",
    ],
    instructions: [
      "Read the Theory to understand the E-step and M-step.",
      "Create a GaussianMixture with 3 components and fit it on a synthetic blob dataset.",
      "Print the converged status, log-likelihood, weights, and means.",
      "Plot the clustered data with component means marked, color-coded by cluster.",
      "Run GMM with 1–7 components and plot BIC/AIC to find the optimal number of clusters.",
      "Click Run and observe the probabilistic clustering and model selection plots.",
    ],
    keyConcepts: ["E-step (responsibilities)", "M-step (parameter update)", "Gaussian Mixture Model", "Soft clustering", "Log-likelihood", "BIC / AIC model selection"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex09.starterCode,
    solutionCode: ex09.solutionCode,
  },
  {
    id: "principal-component-analysis",
    number: 10,
    title: "Dimension Reduction Method: PCA",
    shortTitle: "PCA",
    lo: "LO3",
    category: "Dimensionality Reduction",
    aim: "To implement Principal Component Analysis (PCA) in Python for dimensionality reduction.",
    theory: `<p><strong>Principal Component Analysis (PCA)</strong> is a dimensionality reduction technique that transforms data to new axes where variance is maximized. By projecting onto <strong>principal components</strong>, it retains the most informative aspects while reducing noise and redundancy.</p>
    <p><strong>Algorithm Steps:</strong></p>
    <ul><li><strong>Standardization:</strong> Scale data so each feature has mean 0 and std 1.</li>
    <li><strong>Covariance Matrix:</strong> <code>Cov = (1/n) XᵀX</code> — captures relationships between features.</li>
    <li><strong>Eigenvalues & Eigenvectors:</strong> Eigenvectors = new directions; eigenvalues = variance along each.</li>
    <li><strong>Sort:</strong> Rank eigenvalues descending; highest = most important components.</li>
    <li><strong>Select top k:</strong> Choose k eigenvectors for desired variance retention.</li>
    <li><strong>Transform:</strong> <code>X_new = X · W</code> where W is the matrix of selected eigenvectors.</li></ul>
    <p>PCA is widely used for feature extraction, visualization of high-dimensional data, and speeding up ML models.</p>`,
    algorithm: [
      "Standardize the data using StandardScaler (mean=0, std=1).",
      "Compute the covariance matrix of the standardized data.",
      "Calculate eigenvalues and eigenvectors using np.linalg.eigh.",
      "Sort eigenvalues and eigenvectors in descending order.",
      "Select the top k eigenvectors and project: X_pca = X_std @ W.",
      "Compare with sklearn's PCA and plot the 2D projection + scree plot.",
    ],
    instructions: [
      "Read the Theory to understand variance maximization and principal components.",
      "Implement PCA from scratch: standardize, compute covariance, eigen-decomposition, sort, project.",
      "Print the explained variance ratio for all components.",
      "Implement the same with sklearn's PCA for verification.",
      "Plot the 2D projection (PC1 vs PC2) with principal component axes shown.",
      "Plot a scree plot showing individual and cumulative explained variance.",
      "Click Run and observe how 4D Iris data is reduced to 2D while retaining most variance.",
    ],
    keyConcepts: ["Standardization", "Covariance matrix", "Eigenvalues/eigenvectors", "Explained variance ratio", "Scree plot", "Dimensionality reduction"],
    packages: ["numpy", "matplotlib", "scikit-learn"],
    starterCode: ex10.starterCode,
    solutionCode: ex10.solutionCode,
  },
];

/** Question banks and further readings live in their own modules, keyed by number. */
export const experiments: Experiment[] = content.map((experiment) => ({
  ...experiment,
  pretest: quizzes[experiment.number].pretest,
  posttest: quizzes[experiment.number].posttest,
  references: references[experiment.number],
}));

// ---- Helper functions ----
export function getExperiment(id: string): Experiment | undefined {
  return experiments.find((e) => e.id === id);
}

export function getExperimentByNumber(num: number): Experiment | undefined {
  return experiments.find((e) => e.number === num);
}

export function getExperimentsByLO(lo: string): Experiment[] {
  return experiments.filter((e) => e.lo === lo);
}

export function getCategories(): string[] {
  return [...new Set(experiments.map((e) => e.category))];
}

