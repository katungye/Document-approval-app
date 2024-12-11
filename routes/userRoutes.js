// routes/userRoutes.js

const express = require('express');
const { updateUserRole } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Update user role
router.post('/updateRole', isAuthenticated, updateUserRole);

module.exports = router;