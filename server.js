const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
const PORT = process.env.PORT || 5000; // Render provides PORT env

app.use(cors());
app.use(express.json());

// ✅ Serve frontend (static files from "public" folder)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Routes
app.use("/auth", authRoutes);
app.use("/feedback", feedbackRoutes);

// ✅ Fallback (for invalid routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
