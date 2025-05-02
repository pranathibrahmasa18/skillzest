const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

// 🔐 JWT secret key (can be moved to .env)
const JWT_SECRET = "yourSecretKey";

// 📌 Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already in use' 
      });
    }

    // Save new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,  // plain password here!
      userType: req.body.userType
    });

    await newUser.save();

    // ✅ Log to terminal
    console.log("✅ New user registered:", {
      username: newUser.username,
      email: newUser.email,
      hashedPassword: newUser.password,
      role: newUser.userType
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.userType
      }
    });

  } catch (error) {
    console.error("❌ Registration error:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// 🔐 Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("🔐 Login attempt received:");
    console.log("➡️ Username:", username);
    console.log("➡️ Password (plain):", password);
    console.log("📎 Password Type:", typeof password);
    console.log("📎 Password JSON:", JSON.stringify(password));

    // ✅ Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(400).json({ message: 'User not found' });
    }

    console.log("🔐 Found user in DB:", user.username);
    console.log("🔒 Hashed password in DB:", user.password);

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🧪 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Login successful for:", username);

    return res.status(200).json({
      username: user.username,
      role: user.userType,
      token
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
