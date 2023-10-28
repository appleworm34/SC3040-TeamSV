class DiGraph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjList = new Map();
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjList.has(vertex1)) this.adjList.set(vertex1, []);
    if (!this.adjList.has(vertex2)) this.adjList.set(vertex2, []);

    this.adjList.get(vertex1).push(vertex2);
  }

  findCycle() {
    const visited = new Set();
    const stack = new Set();
    const cycleEdges = [];

    for (const vertex of this.adjList.keys()) {
      if (!visited.has(vertex) && this.isCyclic(vertex, visited, stack, cycleEdges)) {
        return cycleEdges; // Return the edges involved in the cycle
      }
    }

    return null; // No cycle found
  }

  isCyclic(vertex, visited, stack, cycleEdges) {
    visited.add(vertex);
    stack.add(vertex);

    for (const neighbor of this.adjList.get(vertex)) {
      if (!visited.has(neighbor)) {
        if (this.isCyclic(neighbor, visited, stack, cycleEdges)) {
          // Cycle detected, add the edge to the cycleEdges
          cycleEdges.push([vertex, neighbor]);
          return true;
        }
      } else if (stack.has(neighbor)) {
        // Cycle detected, add the edge to the cycleEdges
        cycleEdges.push([vertex, neighbor]);
        return true;
      }
    }

    stack.delete(vertex);
    return false;
  }
}

// Example usage
const graph = new DiGraph(6);
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(5, 1); // Creates a directed cycle

const cycleEdges = graph.findCycle();
if (cycleEdges) {
  console.log('Cycle detected in the directed graph. Edges involved in the cycle:');
  for (const [vertex1, vertex2] of cycleEdges) {
    console.log(`${vertex1} -> ${vertex2}`);
  }
} else {
  console.log('No cycle found in the directed graph.');
}
