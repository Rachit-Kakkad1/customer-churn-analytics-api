const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

/**
 * Authentication Controller
 * 
 * This file contains placeholder methods for user authentication operations
 * such as registration, login, logout, and profile retrieval.
 * Business logic and database integration will be implemented in future phases.
 */

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  res.status(201).json({
    success: true,
    message: 'User registered successfully (placeholder)',
  });
};

/**
 * @desc    Authenticate user and get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Logout user / Clear cookie
 * @route   GET /api/auth/logout
 * @access  Private
 */
const logoutUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout user controller placeholder',
  });
};

/**
 * @desc    Get current logged in user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user profile controller placeholder',
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
};
