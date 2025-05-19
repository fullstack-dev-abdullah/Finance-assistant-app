const express = require('express');

const {authProtect} = require('../middleware/authMiddleware');

const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Register route  
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user profile route
router.get('/profile', authProtect ,getUserProfile);

// Update user profile route
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  // Save the image URL to the user's profile in the database
  res.status(200).json({ message: 'File uploaded successfully', imageUrl});
});

module.exports = router;
// This code defines the routes for user authentication in an Express application.