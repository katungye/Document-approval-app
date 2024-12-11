const express = require('express');
const { markAsReviewed } = require('../controllers/reviewerController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Mark context as reviewed
router.post('/markAsReviewed', isAuthenticated, markAsReviewed);

module.exports = router;