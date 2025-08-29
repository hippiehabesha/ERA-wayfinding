import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
const dbPath = path.join(__dirname, "public", "data", "ERA.sqlite");
const db = new Database(dbPath);

// Create the comment table with proper structure
try {
  // Drop existing comment table if it exists
  db.exec(`DROP TABLE IF EXISTS comment`);
  
  // Create new comment table
  db.exec(`
    CREATE TABLE comment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      comment_type TEXT NOT NULL,
      comment TEXT NOT NULL
    )
  `);
  
  console.log("✅ Comment table created successfully");
  
  // Verify the table structure
  const tableInfo = db.prepare("PRAGMA table_info(comment)").all();
  console.log("📋 Table structure:", tableInfo);
  
  // Create feedback table
  db.exec(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      department TEXT NOT NULL,
      title TEXT,
      name TEXT NOT NULL,
      feedback_date TEXT NOT NULL,
      feedback_text TEXT NOT NULL
    )
  `);
  
  console.log("✅ Feedback table created successfully");
  
  // Test insertion for comment table
  const stmt = db.prepare("INSERT INTO comment (date, comment_type, comment) VALUES (?, ?, ?)");
  stmt.run("2025-08-29", "Test", "Test comment");
  
  // Verify data was inserted
  const rows = db.prepare("SELECT * FROM comment").all();
  console.log("📝 Test data:", rows);
  
} catch (error) {
  console.error("❌ Error:", error);
} finally {
  db.close();
}
