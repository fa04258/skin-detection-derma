require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ CORS setup (allow local dev + deployed frontend)
const corsOptions = {
  // Reflect the request origin if it matches any of these (supports 3000, 5173, etc.)
  origin: [/^http:\/\/localhost:\d+$/, "https://skin-frontend6.onrender.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const { host, name } = mongoose.connection;
    console.log(`✅ MongoDB Connected: ${host}/${name}`);
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
