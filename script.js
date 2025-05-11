class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return min;
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    _heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    size() {
        return this.heap.length;
    }
}

function mincost(arr) {
    const heap = new MinHeap();
    arr.forEach(val => heap.insert(val));

    let totalCost = 0;
    while (heap.size() > 1) {
        const first = heap.extractMin();
        const second = heap.extractMin();
        const cost = first + second;
        totalCost += cost;
        heap.insert(cost);
    }
    return totalCost;
}

function calculateMinCost() {
    const input = document.getElementById("ropeInput").value;
    const arr = input.split(",").map(Number).filter(n => !isNaN(n) && n > 0);

    if (arr.length < 2) {
        document.getElementById("result").textContent = "Enter at least two valid rope lengths.";
        return;
    }

    const result = mincost(arr);
    document.getElementById("result").textContent = `Minimum cost to connect ropes: ${result}`;
}
