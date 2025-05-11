function mincost(arr) {
    if (arr.length === 0) return 0;

    // Use a min-heap implemented via a priority queue
    let heap = [...arr];
    heap.sort((a, b) => a - b); // initialize as min-heap

    let totalCost = 0;

    while (heap.length > 1) {
        // Always extract the two smallest ropes
        const first = heap.shift();
        const second = heap.shift();
        const cost = first + second;
        totalCost += cost;

        // Insert the new rope back, keeping heap sorted
        let inserted = false;
        for (let i = 0; i < heap.length; i++) {
            if (cost < heap[i]) {
                heap.splice(i, 0, cost);
                inserted = true;
                break;
            }
        }
        if (!inserted) heap.push(cost); // append at end if largest
    }

    return totalCost;
}

function calculateMinCost() {
    const input = document.getElementById("ropeInput").value;
    const arr = input
        .split(",")
        .map(x => parseInt(x.trim()))
        .filter(x => !isNaN(x) && x > 0);

    if (arr.length < 2) {
        document.getElementById("result").textContent = "Please enter at least two positive numbers.";
        return;
    }

    const result = mincost(arr);
    document.getElementById("result").textContent = `Minimum cost to connect ropes: ${result}`;
}
