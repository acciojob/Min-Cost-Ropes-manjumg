function MinCost() {
  const input = document.getElementById("ropeInput").value;
  const arr = input.split(',').map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));

  if (arr.length < 2) {
    document.getElementById("output").textContent = "Please enter at least two valid rope lengths.";
    return;
  }

  const cost = mincost(arr);
  document.getElementById("output").textContent = `Minimum cost to connect all ropes: ${cost}`;
}

// Min-Heap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this._heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return min;
  }

  size() {
    return this.heap.length;
  }

  _heapifyUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i] < this.heap[parent]) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else {
        break;
      }
    }
  }

  _heapifyDown() {
    let i = 0;
    const length = this.heap.length;

    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

function mincost(arr) {
  const minHeap = new MinHeap();
  arr.forEach(val => minHeap.insert(val));
  let totalCost = 0;

  while (minHeap.size() > 1) {
    const first = minHeap.extractMin();
    const second = minHeap.extractMin();
    const cost = first + second;
    totalCost += cost;
    minHeap.insert(cost);
  }

  return totalCost;
}
