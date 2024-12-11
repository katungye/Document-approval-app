// routes/contextRoutes.js

const express = require('express');
const { getAllContexts, getContextById, createContext, updateContext, deleteContext } = require('../controllers/contextController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all contexts
router.get('/', isAuthenticated, getAllContexts);

// Get context by ID
router.get('/:id', isAuthenticated, getContextById);

// Create a new context
router.post('/submit', isAuthenticated, createContext);

// Update a context
router.post('/update', isAuthenticated, updateContext); // Changed to POST for form submission

// Delete a context
router.delete('/:id', isAuthenticated, deleteContext);

module.exports = router;