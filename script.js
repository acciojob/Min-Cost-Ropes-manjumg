function calculateMinCost() {
    const input = document.getElementById("ropeInput").value;
    const arr = input.split(",").map(Number).filter(n => !isNaN(n) && n > 0);

    if (arr.length < 2) {
        document.getElementById("result").textContent = "Enter at least two valid rope lengths.";
        return;
    }

    const minCost = mincost(arr);
    document.getElementById("result").textContent = `Minimum cost to connect ropes: ${minCost}`;
}

function mincost(arr) {
    const minHeap = [...arr].sort((a, b) => a - b);

    let cost = 0;
    while (minHeap.length > 1) {
        const first = minHeap.shift();
        const second = minHeap.shift();
        const newRope = first + second;
        cost += newRope;

        // Insert in sorted order
        let i = 0;
        while (i < minHeap.length && minHeap[i] < newRope) i++;
        minHeap.splice(i, 0, newRope);
    }
    return cost;
}
