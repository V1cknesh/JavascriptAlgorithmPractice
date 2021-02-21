class Member {

	constructor(data, weight) {
		this.data = data;
		this.weight = weight;
	}

}


class PriorityQueue {

	constructor(maxSize) {
		if (isNaN(maxSize)) {
			maxSize = 10;
		}
		this.maxSize = maxSize;
		this.queue = [];
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	isFull() {
		return this.queue.length >= this.maxSize;
	}

	enqueue(data, weight) {
		if (this.isFull()) {
			console.log("Too many items in queue");
			return;
		}



		let currentMember = new Member(data, weight);
		let presentInQueue = false;
		for (let step = 0; step < this.queue.length; step++) {
			if (currentMember.weight < this.queue[step].weight) {
				this.queue.splice(step, 0, currentMember);
				presentInQueue = true; 
				break;
			}
		}
		if (!presentInQueue) {
			this.queue.push(currentMember);
		}
	}

	dequeue() {
		return this.isEmpty() ? console.log("Queue is empty") : this.queue.pop(); 
	}

	peek() {
		return this.isEmpty() ? console.log("Queue is empty") : this.queue[this.queue.length -1];
	}
	clear() {
		this.queue = [];
	}

}



class Graph {

	constructor(vertices) {
		this.vertices = vertices;
		this.EdgeList = new Map();
	}

	addVertex(v, w) {
		this.EdgeList.set(v, []);
	}


	addDirectedEdge(v, w, cost) {
		this.EdgeList.get(v).push([ w,  cost]);
		this.EdgeList.get(w).push([ v , cost]);
	}

	djikstra(startNode) {

		let distances = {};
		let prev = {};
		let priorityQueue = new PriorityQueue(this.vertices * this.vertices);

		distances[startNode] = 0;
		priorityQueue.enqueue(startNode, 0);
		this.EdgeList.forEach((value, key) => {
			if (key != startNode) distances[key] = Infinity;
			prev[key] = null;
		});

		while (!priorityQueue.isEmpty()) {
			let closestNode = priorityQueue.dequeue();
			let currentNode = closestNode.data;
			let weight = closestNode.weight;
			this.EdgeList.get(currentNode).forEach(neighbour => {
				let distance = distances[currentNode] + neighbour[1];
				if (distance < distances[neighbour[0]]) {
					distances[neighbour[0]] = distance;
					prev[neighbour[0]] = currentNode;
					priorityQueue.enqueue(neighbour[0], distances[neighbour[0]]);
				}
			})
		}
		return distances;

		
	}

}

const vertices = 5;

let graph = new Graph(vertices);
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");


graph.addDirectedEdge("A", "B", 5);
graph.addDirectedEdge("B", "C", 4);
graph.addDirectedEdge("C", "D", 8);
graph.addDirectedEdge("D", "C", 8);
graph.addDirectedEdge("D", "E", 6);
graph.addDirectedEdge("A", "D", 5);
graph.addDirectedEdge("C", "E", 2);
graph.addDirectedEdge("E", "B", 3);
graph.addDirectedEdge("A", "E", 7);


console.log(graph.djikstra("A"))