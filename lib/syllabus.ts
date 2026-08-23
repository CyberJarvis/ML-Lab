export interface SyllabusTopic {
  id: string;
  title: string;
  points: string[];
  /** Experiment numbers in this lab that put the topic into practice. */
  experiments?: number[];
}

export interface SyllabusModule {
  number: number;
  title: string;
  hours: number;
  topics: SyllabusTopic[];
}

export const courseHeader = {
  code: "CSC701",
  title: "Machine Learning",
  credit: 3,
  totalHours: 39,
  prerequisites: ["Engineering Mathematics", "Data Structures", "Algorithms"],
  objectives: [
    "To introduce the basic concepts and techniques of Machine Learning.",
    "To acquire in depth understanding of various supervised and unsupervised algorithms.",
    "To be able to apply various ensemble techniques for combining ML models.",
    "To demonstrate dimensionality reduction techniques.",
  ],
  outcomes: [
    "To acquire fundamental knowledge of developing machine learning models.",
    "To select, apply and evaluate an appropriate machine learning model for the given application.",
    "To demonstrate ensemble techniques to combine predictions from different models.",
    "To demonstrate the dimensionality reduction techniques.",
  ],
};

export const syllabus: SyllabusModule[] = [
  {
    number: 1,
    title: "Introduction to Machine Learning",
    hours: 4,
    topics: [
      {
        id: "1.1",
        title: "Foundations of Machine Learning",
        points: [
          "Machine Learning",
          "Types of Machine Learning",
          "Issues in Machine Learning",
          "Application of Machine Learning",
          "Steps in developing a Machine Learning application",
        ],
      },
      {
        id: "1.2",
        title: "Model Error and Generalization",
        points: [
          "Training Error, Generalization error",
          "Overfitting, Underfitting",
          "Bias-Variance trade-off",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Learning with Regression and Trees",
    hours: 9,
    topics: [
      {
        id: "2.1",
        title: "Learning with Regression",
        points: ["Linear Regression", "Multivariate Linear Regression", "Logistic Regression"],
        experiments: [1, 2, 3, 4],
      },
      {
        id: "2.2",
        title: "Learning with Trees",
        points: [
          "Decision Trees",
          "Constructing Decision Trees using Gini Index (Regression)",
          "Classification and Regression Trees (CART)",
        ],
      },
      {
        id: "2.3",
        title: "Performance Metrics",
        points: [
          "Confusion Matrix, Kappa Statistics",
          "Sensitivity, Specificity",
          "Precision, Recall, F-measure",
          "ROC curve",
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Ensemble Learning",
    hours: 6,
    topics: [
      {
        id: "3.1",
        title: "Understanding Ensembles",
        points: ["K-fold cross validation", "Boosting", "Stumping", "XGBoost"],
        experiments: [6],
      },
      {
        id: "3.2",
        title: "Bagging and Random Forests",
        points: ["Bagging, Subagging", "Random Forest", "Comparison with Boosting", "Different ways to combine classifiers"],
        experiments: [5],
      },
    ],
  },
  {
    number: 4,
    title: "Learning with Classification",
    hours: 8,
    topics: [
      {
        id: "4.1",
        title: "Support Vector Machine",
        points: [
          "Constrained Optimization",
          "Optimal decision boundary, Margins and support vectors",
          "SVM as a constrained optimization problem, Quadratic Programming",
          "SVM for linear and nonlinear classification",
          "Basics of the Kernel trick",
        ],
        experiments: [7],
      },
      {
        id: "4.2",
        title: "Support Vector Regression & Multiclass Classification",
        points: ["Support Vector Regression", "Multiclass Classification"],
      },
    ],
  },
  {
    number: 5,
    title: "Learning with Clustering",
    hours: 7,
    topics: [
      {
        id: "5.1",
        title: "Introduction to Clustering",
        points: ["Overview of distance metrics", "Major clustering approaches"],
      },
      {
        id: "5.2",
        title: "Graph-Based, Model-Based & Density-Based Clustering",
        points: [
          "Graph Based Clustering: Clustering with a minimal spanning tree",
          "Model Based Clustering: Expectation Maximization Algorithm",
          "Density Based Clustering: DBSCAN",
        ],
        experiments: [8, 9],
      },
    ],
  },
  {
    number: 6,
    title: "Dimensionality Reduction",
    hours: 5,
    topics: [
      {
        id: "6.1",
        title: "Dimensionality Reduction Techniques",
        points: ["Principal Component Analysis", "Linear Discriminant Analysis", "Singular Value Decomposition"],
        experiments: [10],
      },
    ],
  },
];

export const textbooks = [
  { author: "Peter Harrington", title: "Machine Learning in Action", publisher: "DreamTech Press" },
  { author: "Ethem Alpaydın", title: "Introduction to Machine Learning", publisher: "MIT Press" },
  { author: "Tom M. Mitchell", title: "Machine Learning", publisher: "McGraw Hill" },
  { author: "Stephen Marsland", title: "Machine Learning — An Algorithmic Perspective", publisher: "CRC Press" },
];

export const references = [
  { author: "Han, Kamber", title: "Data Mining: Concepts and Techniques", publisher: "Morgan Kaufmann Publishers" },
  { author: "Margaret H. Dunham", title: "Data Mining: Introductory and Advanced Topics", publisher: "Pearson Education" },
  { author: "Kevin P. Murphy", title: "Machine Learning — A Probabilistic Perspective", publisher: "" },
  { author: "Samir Roy, Chakraborty", title: "Introduction to Soft Computing", publisher: "Pearson Education" },
  { author: "Richard Duda, Peter Hart, David G. Stork", title: "Pattern Classification, 2nd Edition", publisher: "Wiley" },
];

export const assessment = {
  internal:
    "Two class tests of 20 marks each. The first is conducted when roughly 40% of the syllabus is complete, the second after an additional 40%. Each test runs one hour.",
  endSemester: "End Semester Theory Examination, as per the University of Mumbai scheme.",
};
