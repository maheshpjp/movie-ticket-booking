const express = require('express');
const { register, login, getUserProfile, updateUserProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * Authentication Routes
 */

// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

// GET /api/auth/profile - Get user profile (requires authentication)
router.get('/profile', auth, getUserProfile);

// PUT /api/auth/profile - Update user profile (requires authentication)
router.put('/profile', auth, updateUserProfile);

module.exports = router;
