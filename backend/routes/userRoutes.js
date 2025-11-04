const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "Email already exists" });

    const user = await User.create({ username, email, password });

    res.status(201).json({
      msg: "User registered",
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Your credentials do not match the registered credentials." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Your credentials do not match the registered credentials." });

    res.json({
      msg: "Login success",
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
