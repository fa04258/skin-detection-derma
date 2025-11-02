// backend/server.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fa04258:Ramya%40123@cluster0.zxynhaq.mongodb.net/loginDB?retryWrites=true&w=majority';

// ---------- MIDDLEWARE ----------
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// ---------- DATABASE CONNECTION ----------
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
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
