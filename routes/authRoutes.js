<<<<<<< HEAD
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Route for user registration
router.post('/register', AuthController.register);

// Route for user login
router.post('/login', AuthController.login);
=======
const express = require('express');
const { register, login, logout, getAllUsers, } = require('../controllers/authController');
const { authenticateJWT, redirectIfAuthenticated, authorizeRole } = require('../middlewares/auth');
const ContextEstablishment = require('../models/ContextEstablishment');
const { body } = require('express-validator');
const User = require('../models/user');
const Document = require('../models/documents');
const router = express.Router();

// rendering public pages
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('login');  // Render login page
});

// Define a route for the root URL '/'
router.get('/', redirectIfAuthenticated, (req, res) => {
    res.redirect('/login');  // Redirects to login
});

router.get('/register', redirectIfAuthenticated,(req, res) => {
    res.render('register');  // Render register page
});


// sending data to the server
router.post('/register', redirectIfAuthenticated,[
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], register);

router.post('/login', redirectIfAuthenticated,login);

router.get('/logout', logout);

//get users
router.get('/users', authenticateJWT, authorizeRole(100), getAllUsers);


// Rendering protected pages
router.get('/dashboard', authenticateJWT, async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll(); 

        // Fetch all documents from the database
        const documents = await Document.findAll(); 

        // Fetch all trackers from the database
        const trackers = await ContextEstablishment.findAll(); 

        // Function to generate a reference code
        const generateRefCode = () => {
            return 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase(); // Example logic
        };

        // Render the dashboard and pass role, users, documents, and the generateRefCode function to the template
        res.render('dashboard', { 
            role: req.user.role, 
            users, 
            documents,
            generateRefCode,
            trackers 
        }); 
    } catch (err) {
        console.error(err);
        // Ensure you don't send a response after an error has already been sent
        if (!res.headersSent) {
            res.status(500).send('Error fetching users and documents for dashboard');
        }
    }
});


router.get('/profile', authenticateJWT, (req, res) => {
    res.render('profile', { user: req.user });  // Render profile
});

>>>>>>> 3aaf9b0 (Initial commit)

module.exports = router;
