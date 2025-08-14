// server.cjs or server.js (if no "type": "module" in package.json)
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(cors());
app.use(express.json());

const csvFile = path.join(__dirname, "public", "data", "feedback.csv");

// Append feedback to CSV file, creating header if needed
function appendFeedback(feedback) {
  const row =
    [
      feedback.department || "",
      feedback.title || "",
      feedback.name || "",
      feedback.feedback_date || "",
      (feedback.feedback_text || "").replace(/[\r\n]+/g, " "),
    ]
      .map((field) => `"${field.replace(/"/g, '""')}"`)
      .join(",") + "\n";

  // Ensure header matches frontend CSV
  if (!fs.existsSync(csvFile)) {
    const header = "department,title,name,feedback_date,feedback_text\n";
    fs.writeFileSync(csvFile, header, "utf8");
  }
  fs.appendFileSync(csvFile, row, "utf8");
}

app.post("/api/feedback", (req, res) => {
  const feedback = req.body;
  console.log("Received feedback POST:", feedback);

  if (
    !feedback.department ||
    !feedback.title ||
    !feedback.name ||
    !feedback.feedback_date ||
    !feedback.feedback_text
  ) {
    return res.status(400).json({ error: "Missing required feedback fields." });
  }

  try {
    appendFeedback(feedback);
    res.status(200).json({ success: true, message: "Feedback saved." });
  } catch (err) {
    console.error("Failed to save feedback:", err);
    res.status(500).json({ error: "Failed to save feedback." });
  }
});

const commentCsvFile = path.join(__dirname, "public", "data", "comment.csv");

// Append comment to comment.csv
function appendComment(commentData) {
  const row =
    [
      commentData.date || "",
      commentData.type || "",
      (commentData.comment || "").replace(/[\r\n]+/g, " "),
    ]
      .map((field) => `"${field.replace(/"/g, '""')}"`)
      .join(",") + "\n";

  if (!fs.existsSync(commentCsvFile)) {
    const header = "date,comment-type,comment\n";
    fs.writeFileSync(commentCsvFile, header, "utf8");
  }

  fs.appendFileSync(commentCsvFile, row, "utf8");
}

// New endpoint to handle feedback dialog
app.post("/api/comment", (req, res) => {
  const { type, comment } = req.body;

  if (!type || !comment) {
    return res
      .status(400)
      .json({ error: "Missing comment type or comment content." });
  }

  const date = new Date().toISOString().split("T")[0]; // e.g., "2025-08-08"

  try {
    appendComment({ date, type, comment });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to save comment:", err);
    res.status(500).json({ error: "Failed to save comment." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
