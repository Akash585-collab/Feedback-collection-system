const express = require("express");
const router = express.Router();

const feedbacks = [];

// Submit feedback
router.post("/", (req, res) => {
  const { name, feedback } = req.body;
  if (!name || !feedback) {
    return res.status(400).json({ message: "Name and feedback required" });
  }
  feedbacks.push({ name, feedback });
  res.json({ message: "Feedback submitted successfully!" });
});

// Get all feedback
router.get("/", (req, res) => {
  res.json(feedbacks);
});

module.exports = router;
