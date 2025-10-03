const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const DB_FILE = "./db.json";
const SECRET = "mySecretKey";

// Helper functions
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Submit feedback
router.post("/", verifyToken, (req, res) => {
  const { feedback } = req.body;
  const db = readDB();

  db.feedbacks.push({ email: req.user.email, feedback });
  writeDB(db);

  res.json({ message: "Feedback submitted successfully" });
});

// Get all feedbacks
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.feedbacks);
});

module.exports = router;
