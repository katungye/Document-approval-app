const express = require('express');
const router = express.Router();
const contextEstablishmentController = require('../controllers/contextEstablishmentController');
const { authenticateJWT, authorizeRole } = require('../middlewares/auth');

// Only authenticated admins (role = 100) can access these routes
router.post('/create-context-tracker', authenticateJWT, authorizeRole(100), contextEstablishmentController.createContextTracker);

// Add a GET route to retrieve context trackers
router.get('/trackers', authenticateJWT, authorizeRole(100), contextEstablishmentController.getTrackers);

module.exports = router;
