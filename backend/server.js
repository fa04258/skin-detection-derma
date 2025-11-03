// backend/server.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;

// --- IMPORTANT UPDATE FOR CLARITY ---
// Prefer environment variable (from .env or Render) first.
// If process.env.MONGODB_URI is not set, it will use the hardcoded Atlas URI as a LOCAL FALLBACK.
// For production deployments on Render, ensure MONGODB_URI is set in Render's environment variables.
const MONGODB_URI = process.env.MONGODB_URI || '';

// ---------- MIDDLEWARE ----------
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// ---------- DATABASE CONNECTION ----------
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Optional: Add these for better connection management and debugging
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000,      // Close sockets after 45 seconds of inactivity
  })
  .then(() => {
    // Log the actual database connected to!
    console.log(`✅ MongoDB connected successfully to: ${mongoose.connection.host}/${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Make sure your MONGODB_URI is correct and accessible (check .env and Atlas settings).');
    process.exit(1); // Stop app if DB fails to connect
  });

// ---------- ROUTES ----------
app.get('/', (req, res) => {
  res.send('🩺 DERM-AI Backend API is running...');
});

// User routes
app.use('/api/users', userRoutes);

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});