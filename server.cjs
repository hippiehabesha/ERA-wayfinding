// server.cjs
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3001;

// ✅ Enable CORS for frontend requests
app.use(cors());

// ✅ Parse JSON request bodies
app.use(bodyParser.json());

// ✅ Correct SQLite path (case-sensitive on Linux)
const dbPath = path.join(__dirname, "public", "data", "ERA.sqlite");
let db;
try {
  db = new Database(dbPath);
  console.log("✅ Connected to database:", dbPath);
} catch (err) {
  console.error("❌ Failed to open database:", err.message);
  process.exit(1);
}

// 🟢 Insert comment into SQLite
app.post("/api/comment", (req, res) => {
  const { type, comment } = req.body;

  if (!type || !comment) {
    return res.status(400).json({ error: "Type and comment are required" });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO comment (date, comment_type, comment) VALUES (?, ?, ?)"
    );
    stmt.run(new Date().toISOString().split("T")[0], type, comment);

    res.json({ success: true, message: "Comment saved!" });
  } catch (err) {
    console.error("❌ DB insert error:", err);
    res.status(500).json({ error: "Failed to save comment" });
  }
});

// 🟢 (Optional) Fetch all comments
app.get("/api/comment", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM comment ORDER BY date DESC").all();
    res.json(rows);
  } catch (err) {
    console.error("❌ DB fetch error:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// 🟢 Insert feedback into SQLite
app.post("/api/feedback", (req, res) => {
  const { department, title, name, feedback_date, feedback_text } = req.body;

  if (!department || !name || !feedback_text) {
    return res.status(400).json({ error: "Department, name, and feedback text are required" });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO feedback (department, title, name, feedback_date, feedback_text) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(department, title || "", name, feedback_date || new Date().toISOString().split("T")[0], feedback_text);

    res.json({ success: true, message: "Feedback saved!" });
  } catch (err) {
    console.error("❌ DB insert error:", err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// 🟢 (Optional) Fetch all feedback
app.get("/api/feedback", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM feedback ORDER BY feedback_date DESC").all();
    res.json(rows);
  } catch (err) {
    console.error("❌ DB fetch error:", err);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// 🟢 Fetch all data
app.get("/api/data", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM data").all();
    res.json(rows);
  } catch (err) {
    console.error("❌ DB fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// 🟢 Serve React build (if you build frontend)
const clientBuildPath = path.join(__dirname, "build");
app.use(express.static(clientBuildPath));

// Catch-all: send React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "dist");
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
