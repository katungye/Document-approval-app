const Document = require('../models/documents'); // Ensure the path is correct
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Document Submission - Create a new document entry
exports.submitDocument = async (req, res) => {
    try {
        // Extract data from request
        const { category, subcategory, description, documentName } = req.body;
        const file = req.file; // File from multer

        // Check if file is uploaded
        if (!file) {
            return res.status(400).json({ error: 'No document uploaded' });
        }

        // Generate document link based on where the file is stored
        const documentLink = `/uploads/${file.filename}`;

        // Extract token from cookies (assuming you are using cookie-parser middleware)
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify the token and extract user ID
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decodedToken.id;

        // Create a new document in the database
        const newDocument = await Document.create({
            documentName, // Ensure this field is included
            category,
            subcategory,
            description,
            link: documentLink,
            uploadedBy: userId,
        });

        // Respond with success
        res.status(201).json({ message: 'Document submitted successfully', document: newDocument });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to submit document' });
    }
};

// Partial update for reviewStatus and approvalStatus
exports.updateDocumentStatus = async (req, res) => {
    try {
        const { documentId, reviewStatus, approvalStatus } = req.body;

        // Find the document by primary key (ID)
        const document = await Document.findByPk(documentId);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Update the reviewStatus and approvalStatus
        await document.update({
            reviewStatus,
            approvalStatus,
        });

        // Optionally, send a success response or redirect to dashboard
        res.status(200).json({ message: 'Document status updated successfully' });
    } catch (error) {
        console.error("Error updating document status:", error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Function to retrieve documents uploaded by the logged-in user
exports.getUserDocuments = async (req, res) => {
    try {
        const userEmail = req.user.email; // Get the email from the authenticated user in the JWT token

        // Retrieve documents where 'uploadedBy' matches the logged-in user's email
        const documents = await Document.findAll({
            where: {
                uploadedBy: userEmail
            }
        });

        // Render the 'documents.ejs' view, passing the documents data
        res.render('documents', { documents, user: req.user });
    } catch (error) {
        console.error('Error fetching user documents:', error);
        res.status(500).json({ error: 'Failed to retrieve documents' });
    }
};


// Update all document statuses and return status count
exports.status_count = async (req, res) => {
    try {
        const { newStatus } = req.body; // Expecting the new status from the request body

        // Validate newStatus input
        if (!newStatus) {
            return res.status(400).json({ message: "New status is required" });
        }

        // Update all documents with the new status
        const [updatedCount] = await Document.update(
            { approvalStatus: newStatus }, // Update field
            { where: {}, returning: true } // Update all documents
        );

        if (updatedCount === 0) {
            return res.status(404).json({ message: "No documents found to update" });
        }

        // Fetch the updated status count
        const totalDocuments = await Document.count(); // Count total documents
        const updatedDocuments = await Document.count({ where: { approvalStatus: newStatus } }); // Count updated documents

        res.status(200).json({
            message: `${updatedCount} documents updated successfully.`,
            totalDocuments,
            updatedDocuments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating document statuses" });
    }
};


// Approve document
exports.approveDocument = async (req, res) => {
    const documentId = req.params.id;
    try {
        // Find the document
        const document = await Document.findOne({ where: { id: documentId } });

        // Check if the document has been reviewed
        if (document.reviewStatus === 'reviewed') {
            // Update approvalStatus to Approved
            await Document.update(
                { approvalStatus: 'Approved' }, 
                { where: { id: documentId } }
            );
            res.json({ message: 'Document approved successfully.' });
        } else {
            res.status(400).json({ error: 'Document must be reviewed before approval.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to approve document.' });
    }
};

// Reject document
exports.rejectDocument = async (req, res) => {
    const documentId = req.params.id;
    try {
        // Reject the document (no review status check needed for rejection)
        await Document.update(
            { approvalStatus: 'Rejected' }, 
            { where: { id: documentId } }
        );
        res.json({ message: 'Document rejected successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to reject document.' });
    }
};

// Mark document as reviewed
exports.markAsReviewed = async (req, res) => {
    const documentId = req.params.id;
    try {
        // Ensure the document exists
        const document = await Document.findByPk(documentId);
        if (!document) {
            return res.status(404).json({ error: 'Document not found.' });
        }

        // Update reviewStatus to 'reviewed'
        await Document.update(
            { reviewStatus: 'reviewed' },
            { where: { id: documentId } }
        );
        res.json({ message: 'Document marked as reviewed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to mark document as reviewed.' });
    }
};
