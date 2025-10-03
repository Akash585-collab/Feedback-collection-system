const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/feedback", feedbackRoutes);

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
