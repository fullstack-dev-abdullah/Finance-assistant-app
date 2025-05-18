const express = require('express');

const {authProtect} = require('../middleware/authMiddleware');

const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');

const router = express.Router();

// Register route  
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user profile route
router.get('/profile', authProtect ,getUserProfile);

module.exports = router;
// This code defines the routes for user authentication in an Express application.