function calculateMinCost() {
  const input = document.getElementById('ropeInput').value;
  const arr = input.split(',').map(Number).filter(x => !isNaN(x) && x > 0);

  if (arr.length === 0) {
    document.getElementById('result').textContent = 'Please enter valid positive integers.';
    return;
  }

  const result = mincost(arr);
  document.getElementById('result').textContent = `Minimum cost to connect ropes: ${result}`;
}

function mincost(arr) {
  // Min-Heap approach using a priority queue
  const minHeap = [...arr].sort((a, b) => a - b);
  let totalCost = 0;

  while (minHeap.length > 1) {
    minHeap.sort((a, b) => a - b); // Maintain heap property
    const first = minHeap.shift();
    const second = minHeap.shift();
    const cost = first + second;
    totalCost += cost;
    minHeap.push(cost);
  }

  return totalCost;
}
