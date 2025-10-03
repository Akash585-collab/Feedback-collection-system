const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
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

// Register route
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  if (db.users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = bcrypt.hashSync(password, 10);
  db.users.push({ email, password: hashed });
  writeDB(db);

  res.json({ message: "User registered successfully" });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

module.exports = router;
