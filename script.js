function handleMinCost() {
  const input = document.getElementById("ropeInput").value;
  const arr = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

  if (arr.length < 1) {
    document.getElementById("output").innerText = "Please enter at least one valid rope length.";
    return;
  }

  const result = mincost(arr);
  document.getElementById("output").innerText = `Minimum cost: ${result}`;
}

function mincost(arr) {
  if (arr.length <= 1) return 0;

  const heap = new MinHeap();
  arr.forEach(length => heap.insert(length));

  let totalCost = 0;
  while (heap.size() > 1) {
    const first = heap.removeMin();
    const second = heap.removeMin();
    const cost = first + second;
    totalCost += cost;
    heap.insert(cost);
  }

  return totalCost;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this._heapifyUp();
  }

  removeMin() {
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
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] > this.heap[index]) {
        [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
        index = parent;
      } else break;
    }
  }

  _heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;

      if (smallest !== index) {
        [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
        index = smallest;
      } else break;
    }
  }
}
