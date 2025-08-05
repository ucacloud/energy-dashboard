const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");
// const { spawn } = require("child_process");

const allowedOrigins = [
  "http://localhost:4200",
  "https://energy-dashboard-nzok.onrender.com",
  "https://energy-dashboard-hgq1ajzuu-ucaclouds-projects.vercel.app",
  "https://energy-dashboard-lemon.vercel.app",
  "https://energy-dashboard-r9eo0put7-ucaclouds-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      let isVercelDomain = false;
      try {
        isVercelDomain = /\.vercel\.app$/.test(new URL(origin).hostname);
      } catch {
        return callback(new Error("Invalid origin"));
      }

      if (allowedOrigins.includes(origin) || isVercelDomain) {
        return callback(null, true);
      } else {
        console.warn(`CORS blocked: ${origin}`);
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Energy Dashboard Backend is running");
});

app.get("/api/settlements", (req, res) => {
  res.json([
    { id: 1, name: "Market A", amount: 1234.56 },
    { id: 2, name: "Market B", amount: 7890.12 },
  ]);
});

app.get("/api/prices", (req, res) => {
  const prices = [
    {
      id: 1,
      node: "LZ_SOUTH",
      price: 28.45,
      timestamp: "2025-05-05T10:00:00Z",
    },
    { id: 2, node: "LZ_NORTH", price: 30.1, timestamp: "2025-05-05T10:00:00Z" },
  ];
  res.json(prices);
});

app.get("/api/lmp", (req, res) => {
  const filePath = path.join(__dirname, "data", "lmp-data.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading LMP data:", err);
      return res.status(500).json({ error: "Failed to load LMP data" });
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/lmp-comparison", (req, res) => {
  const filePath = path.join(__dirname, "data", "lmp-comparison.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading LMP Comparison data:", err);
      return res
        .status(500)
        .json({ error: "Failed to load LMP comparison data" });
    }
    res.json(JSON.parse(data));
  });
});

app.post("/api/compliance-check", async (req, res) => {
  const { logContent } = req.body;
  console.log("Incoming log content:\n", logContent);

  if (!logContent) {
    return res.status(400).json({ error: "Log content is required" });
  }

  try {
    const { spawn } = require("child_process");
    const pyProcess = spawn("python", [
      "./python/compliance_checker.py",
      "--from-api",
    ]);

    let output = "";
    let errorOutput = "";

    pyProcess.stdin.write(logContent);
    pyProcess.stdin.end();

    pyProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pyProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pyProcess.on("close", (code) => {
      console.log("Python exited with code:", code);
      console.log("Raw Python output:", output);
      console.log("Raw Python error output:", errorOutput);

      if (code !== 0) {
        return res
          .status(500)
          .json({ error: `Python script failed: ${errorOutput}` });
      }

      try {
        console.log("Attempting to parse Python output:", output);

        const match = output.match(
          /---Begin JSON Output---\s*([\s\S]*?)\s*---End JSON Output---/
        );

        if (!match || !match[1]) {
          throw new Error("JSON output markers not found");
        }

        const jsonString = match[1];
        const result = JSON.parse(jsonString);
        res.json(result);
      } catch (err) {
        console.error("Failed to parse Python output:", err.message);
        res.status(500).json({ error: "Failed to parse Python output" });
      }
    });
  } catch (err) {
    console.error("JSON parsing failed:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
