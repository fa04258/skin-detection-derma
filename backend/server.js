require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const app = express();

// ✅ Fixed CORS for Render
const allowedOrigins = [
  "https://skin-frontend4.onrender.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true 
}));

app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ DB Error", err));

// Routes
app.get("/", (req, res) => {
  res.send("🩺 Backend Running...");
});
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
