export const ex08 = {
  starterCode: `import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
from scipy.spatial.distance import pdist, squareform

rng = np.random.default_rng(42)
X = np.vstack([
    rng.normal([0, 0], 0.8, (25, 2)),
    rng.normal([8, 8], 0.8, (25, 2)),
    rng.normal([0, 8], 0.8, (25, 2)),
])
n = len(X)
N_CLUSTERS = 3

# TODO 1: D = squareform(pdist(X)) gives the pairwise Euclidean distances,
#         so D[i, j] is the distance between point i and point j.
D = None

# TODO 2: build a complete weighted graph. nx.from_numpy_array(D) turns the
#         distance matrix straight into one.
graph = None

# TODO 3: mst = nx.minimum_spanning_tree(graph) keeps only the n-1 cheapest
#         edges that still connect every point.
mst = None

# TODO 4: sort the MST edges by weight, remove the N_CLUSTERS - 1 largest,
#         then read nx.connected_components(mst) to get the cluster labels.
labels = np.zeros(n, dtype=int)

print("cluster sizes:", np.bincount(labels))

plt.figure(figsize=(7, 6))
plt.scatter(X[:, 0], X[:, 1], s=45, color="#0b1220")
# TODO 5: draw the MST edges, then recolour the points by cluster
plt.xlabel("x1")
plt.ylabel("x2")
plt.show()
`,

  solutionCode: `import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
from scipy.spatial.distance import pdist, squareform
from sklearn.metrics import adjusted_rand_score

rng = np.random.default_rng(42)
centres = [[0, 0], [8, 8], [0, 8]]
X = np.vstack([rng.normal(c, 0.8, (25, 2)) for c in centres])
truth = np.repeat(range(3), 25)
n = len(X)
N_CLUSTERS = 3

D = squareform(pdist(X))
graph = nx.from_numpy_array(D)
mst = nx.minimum_spanning_tree(graph)

print(f"{n} points -> complete graph has {graph.number_of_edges()} edges,"
      f" MST keeps {mst.number_of_edges()}")

# Sorting descending and cutting the top k-1 edges is the divisive step: each cut
# splits one connected component into two.
by_weight = sorted(mst.edges(data="weight"), key=lambda e: e[2], reverse=True)
cuts = by_weight[:N_CLUSTERS - 1]

print("\\nedges removed (longest first):")
for u, v, weight in cuts:
    print(f"  ({u:>2}, {v:>2})  length {weight:.3f}")

remaining_max = by_weight[N_CLUSTERS - 1][2]
print(f"longest surviving edge: {remaining_max:.3f}"
      f"  -> the gap between clusters is {cuts[-1][2] / remaining_max:.1f}x wider")

split = mst.copy()
split.remove_edges_from([(u, v) for u, v, _ in cuts])

labels = np.zeros(n, dtype=int)
for cluster_id, component in enumerate(nx.connected_components(split)):
    labels[list(component)] = cluster_id

print(f"\\ncluster sizes: {np.bincount(labels)}")
print(f"adjusted Rand index vs ground truth: {adjusted_rand_score(truth, labels):.4f}")

positions = {i: X[i] for i in range(n)}
palette = ["#4f46e5", "#10b981", "#f59e0b"]

fig, (ax_mst, ax_clusters, ax_weights) = plt.subplots(1, 3, figsize=(17, 5.2))

nx.draw_networkx_edges(mst, positions, ax=ax_mst, edge_color="#94a3b8", width=1.3)
nx.draw_networkx_edges(mst, positions, ax=ax_mst, edgelist=[(u, v) for u, v, _ in cuts],
                       edge_color="#ef4444", width=2.8, style="dashed")
ax_mst.scatter(X[:, 0], X[:, 1], s=45, color="#0b1220", zorder=5)
ax_mst.set_title("MST — dashed red edges are about to be cut")

for cluster_id in range(N_CLUSTERS):
    member = labels == cluster_id
    ax_clusters.scatter(X[member, 0], X[member, 1], s=55, color=palette[cluster_id],
                        edgecolor="k", label=f"Cluster {cluster_id + 1}")
nx.draw_networkx_edges(split, positions, ax=ax_clusters, edge_color="#cbd5e1", width=1.1)
ax_clusters.set_title("Connected components after the cuts")
ax_clusters.legend()

weights = np.sort([w for _, _, w in mst.edges(data="weight")])
ax_weights.plot(weights, "o-", color="#4f46e5", ms=4, lw=1.6)
ax_weights.axhline(remaining_max, ls="--", color="#94a3b8", lw=1.5)
for _, _, weight in cuts:
    ax_weights.axhline(weight, ls="--", color="#ef4444", lw=1.5)
ax_weights.set_title("Sorted MST edge lengths")
ax_weights.set_xlabel("Edge rank")
ax_weights.set_ylabel("Length")
ax_weights.grid(alpha=0.3)

for ax in (ax_mst, ax_clusters):
    ax.set_xlabel("x1")
    ax.set_ylabel("x2")

plt.tight_layout()
plt.show()

print("\\nThe jump at the right of the third plot is why this works: edges bridging"
      "\\ntwo clusters are far longer than edges inside one, so they cut cleanly.")
`,
};
