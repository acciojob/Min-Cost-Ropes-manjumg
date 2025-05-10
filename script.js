function calculateMinCost() {
  const input = document.getElementById("ropeInput").value;
  const arr = input.split(',').map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));

  if (arr.length < 2) {
    document.getElementById("output").textContent = "Please enter at least two valid rope lengths.";
    return;
  }

  const cost = mincost(arr);
  document.getElementById("output").textContent = `Minimum cost to connect all ropes: ${cost}`;
}

function mincost(arr) {
  const heap = [...arr].sort((a, b) => a - b);
  let totalCost = 0;

  while (heap.length > 1) {
    heap.sort((a, b) => a - b); // keep sorted for smallest two
    const first = heap.shift();
    const second = heap.shift();
    const combined = first + second;
    totalCost += combined;
    heap.push(combined);
  }

  return totalCost;
}
