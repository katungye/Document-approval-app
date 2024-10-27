// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middlewares/uploadMiddleware');
const { authenticateJWT } = require('../middlewares/auth');


// Route for submitting a document
router.post('/submit-document', authenticateJWT, upload.single('document'), documentController.submitDocument);

// Route for updating document status
router.post('/update-status', authenticateJWT, documentController.updateDocumentStatus);

// Route to get documents for the logged-in user
router.get('/user-documents', authenticateJWT, documentController.getUserDocuments);


// Route for approving a document
router.post('/documents/approve/:id', authenticateJWT, documentController.approveDocument);

// Route for rejecting a document
router.post('/documents/reject/:id', authenticateJWT, documentController.rejectDocument);


// Route for marking a document as reviewed
router.post('/documents/review/:id', authenticateJWT, documentController.markAsReviewed);



module.exports = router;

