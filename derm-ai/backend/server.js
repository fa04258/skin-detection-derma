require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ CORS setup for Render deployment
app.use(
  cors({
    origin: [
      "https://skin-frontend6.onrender.com", // your Render frontend URL
      "http://localhost:5173"               // local dev frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🩺 DERM-AI Backend API Running...");
});

// ✅ API Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});