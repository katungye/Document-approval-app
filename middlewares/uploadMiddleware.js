// middlewares/uploadMiddleware.js
const multer = require('multer');

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Avoid name clashes
    }
});

// Create the upload instance
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;


