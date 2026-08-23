// ============================================================================
// Further readings shown in each experiment's References section.
// Textbook entries name a specific chapter so the pointer is actually usable.
// ============================================================================

import type { Reference } from "./experiments";

const ISLR: Reference = {
  title: "An Introduction to Statistical Learning",
  detail: "James, Witten, Hastie & Tibshirani — freely available from the authors.",
  url: "https://www.statlearning.com/",
};

const ESL: Reference = {
  title: "The Elements of Statistical Learning",
  detail: "Hastie, Tibshirani & Friedman — the graduate-level companion to ISLR.",
  url: "https://hastie.su.domains/ElemStatLearn/",
};

const MITCHELL: Reference = {
  title: "Machine Learning — Tom M. Mitchell",
  detail: "McGraw-Hill, 1997. The text prescribed by the University of Mumbai syllabus.",
};

const BISHOP: Reference = {
  title: "Pattern Recognition and Machine Learning — Christopher Bishop",
  detail: "Springer, 2006. The standard reference for the probabilistic treatment.",
};

export const references: Record<number, Reference[]> = {
  1: [
    ISLR,
    { ...ISLR, title: "ISLR, Chapter 3.1 — Simple Linear Regression", detail: "Least squares, assessing coefficient accuracy, and the meaning of R²." },
    {
      title: "scikit-learn — Ordinary Least Squares",
      detail: "API reference and worked examples for LinearRegression.",
      url: "https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares",
    },
    MITCHELL,
  ],
  2: [
    { ...ISLR, title: "ISLR, Chapter 3.2 — Multiple Linear Regression", detail: "Interpreting several coefficients at once and testing their joint significance." },
    {
      title: "scikit-learn — Linear Models",
      detail: "Covers ordinary least squares alongside ridge and lasso regularisation.",
      url: "https://scikit-learn.org/stable/modules/linear_model.html",
    },
    {
      title: "NumPy — numpy.linalg.solve",
      detail: "Why solving a linear system is preferred to forming an explicit inverse.",
      url: "https://numpy.org/doc/stable/reference/generated/numpy.linalg.solve.html",
    },
    ESL,
  ],
  3: [
    { ...ESL, title: "ESL, Chapter 3.2.4 — Multiple Outputs", detail: "How the least-squares solution generalises to a matrix of responses." },
    {
      title: "NumPy — Linear algebra routines",
      detail: "Reference for the matrix operations used throughout this experiment.",
      url: "https://numpy.org/doc/stable/reference/routines.linalg.html",
    },
    MITCHELL,
  ],
  4: [
    { ...ISLR, title: "ISLR, Chapter 4.3 — Logistic Regression", detail: "The logistic model, maximum likelihood estimation, and interpreting odds." },
    {
      title: "scikit-learn — Logistic Regression",
      detail: "Solver choices, regularisation, and multi-class extensions.",
      url: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
    },
    {
      title: "scikit-learn — Classification metrics",
      detail: "Precision, recall, F1 and the confusion matrix printed by this experiment.",
      url: "https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics",
    },
    BISHOP,
  ],
  5: [
    { ...ISLR, title: "ISLR, Chapter 8.2 — Bagging, Random Forests, Boosting", detail: "Why averaging decorrelated trees reduces variance." },
    {
      title: "scikit-learn — Forests of randomized trees",
      detail: "Parameters, out-of-bag scoring, and the caveats of impurity-based importance.",
      url: "https://scikit-learn.org/stable/modules/ensemble.html#forest",
    },
    {
      title: "Breiman (2001) — Random Forests",
      detail: "The original paper, Machine Learning 45(1), 5–32.",
      url: "https://link.springer.com/article/10.1023/A:1010933404324",
    },
    ESL,
  ],
  6: [
    { ...ESL, title: "ESL, Chapter 10 — Boosting and Additive Trees", detail: "AdaBoost derived as forward stagewise additive modelling." },
    {
      title: "scikit-learn — AdaBoost",
      detail: "The SAMME algorithm, estimator weights, and staged prediction.",
      url: "https://scikit-learn.org/stable/modules/ensemble.html#adaboost",
    },
    {
      title: "Freund & Schapire (1997) — A Decision-Theoretic Generalization of On-Line Learning",
      detail: "The paper that introduced AdaBoost.",
      url: "https://www.sciencedirect.com/science/article/pii/S002200009791504X",
    },
  ],
  7: [
    { ...ISLR, title: "ISLR, Chapter 9 — Support Vector Machines", detail: "Maximal margin classifiers, soft margins, and kernels, built up step by step." },
    {
      title: "scikit-learn — Support Vector Machines",
      detail: "Kernel options, the meaning of C and gamma, and practical usage tips.",
      url: "https://scikit-learn.org/stable/modules/svm.html",
    },
    {
      title: "Cortes & Vapnik (1995) — Support-Vector Networks",
      detail: "The founding paper, Machine Learning 20(3), 273–297.",
      url: "https://link.springer.com/article/10.1007/BF00994018",
    },
    BISHOP,
  ],
  8: [
    {
      title: "NetworkX — Minimum spanning tree",
      detail: "Kruskal, Prim and Borůvka implementations with usage examples.",
      url: "https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.tree.mst.minimum_spanning_tree.html",
    },
    {
      title: "Zahn (1971) — Graph-Theoretical Methods for Detecting and Describing Gestalt Clusters",
      detail: "The original MST-based clustering method this experiment implements.",
      url: "https://ieeexplore.ieee.org/document/1671733",
    },
    {
      title: "scikit-learn — Hierarchical clustering",
      detail: "The agglomerative counterpart to the divisive approach used here.",
      url: "https://scikit-learn.org/stable/modules/clustering.html#hierarchical-clustering",
    },
    ESL,
  ],
  9: [
    { ...BISHOP, title: "Bishop, Chapter 9 — Mixture Models and EM", detail: "The full derivation of EM for Gaussian mixtures, including the convergence proof." },
    {
      title: "scikit-learn — Gaussian mixture models",
      detail: "Covariance types, initialisation strategies, and model selection by BIC.",
      url: "https://scikit-learn.org/stable/modules/mixture.html",
    },
    {
      title: "Dempster, Laird & Rubin (1977) — Maximum Likelihood from Incomplete Data via the EM Algorithm",
      detail: "The paper that named and unified the algorithm.",
      url: "https://www.jstor.org/stable/2984875",
    },
    MITCHELL,
  ],
  10: [
    { ...ISLR, title: "ISLR, Chapter 12.2 — Principal Components Analysis", detail: "PCA as variance maximisation, with scree plots and biplots." },
    {
      title: "scikit-learn — PCA",
      detail: "Solver options, whitening, and the explained variance attributes.",
      url: "https://scikit-learn.org/stable/modules/decomposition.html#pca",
    },
    {
      title: "Shlens — A Tutorial on Principal Component Analysis",
      detail: "A careful derivation connecting PCA to eigendecomposition and the SVD.",
      url: "https://arxiv.org/abs/1404.1100",
    },
    ESL,
  ],
};
