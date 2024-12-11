// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const jwtSecret = process.env.SECRET_KEY;

const validateUserRegistration = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fname').notEmpty().withMessage('First name is required'),
    body('lname').optional().notEmpty().withMessage('Last name cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Middleware hit for path:", req.path);
    console.log("Token present:", !!token);

    if (!token) {
        console.log('No token found');
        if (req.path.startsWith('/context')) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        return res.redirect('/auth/login');
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.log('JWT verification failed:', err.message);
            if (req.path.startsWith('/context')) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            return res.redirect('/auth/login');
        }
        console.log('Token verified, user:', decoded);
        req.user = decoded;
        next();
    });
};

const redirectIfAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, jwtSecret, (err) => {
            if (!err) {
                console.log("User already authenticated, redirecting to dashboard");
                return res.redirect('/auth/dashboard'); // End execution if authenticated
            }
        });
    }
    next();
};

module.exports = { isAuthenticated, redirectIfAuthenticated, validateUserRegistration };