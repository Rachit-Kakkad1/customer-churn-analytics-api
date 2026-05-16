const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * Authentication Routes
 * 
 * This file defines the routing structure for user authentication,
 * including registration, login, logout, and profile retrieval.
 */

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout user / Clear cookie
 * @access  Private
 */
router.get('/logout', authMiddleware, logoutUser);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current logged in user profile
 * @access  Private
 */
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
