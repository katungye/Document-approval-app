const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/allusers', userController.getAllUsers);

// Add a new user
router.post('/adduser', userController.addUser);

module.exports = router;
