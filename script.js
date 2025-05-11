// index.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// ✅ Min-Cost Rope Function
function minCost(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return 0;

    // Create a min-heap via sorting
    const minHeap = [...arr].sort((a, b) => a - b);
    let cost = 0;

    while (minHeap.length > 1) {
        const first = minHeap.shift();
        const second = minHeap.shift();
        const newRope = first + second;
        cost += newRope;

        // Insert new rope into the correct position to maintain heap order
        let inserted = false;
        for (let i = 0; i < minHeap.length; i++) {
            if (newRope < minHeap[i]) {
                minHeap.splice(i, 0, newRope);
                inserted = true;
                break;
            }
        }
        if (!inserted) minHeap.push(newRope); // largest, append to end
    }

    return cost;
}

// ✅ POST API Route
app.post("/mincost", (req, res) => {
    try {
        const { arr } = req.body;

        if (!Array.isArray(arr) || arr.some(x => typeof x !== "number" || x <= 0)) {
            return res.status(400).json({ message: "Invalid input. Please send an array of positive numbers." });
        }

        const result = minCost(arr);
        return res.status(200).json({ message: result });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
