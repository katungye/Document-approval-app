// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const { createAccessToken, createRefreshToken } = require('../config/tokenUtils');
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;


const AuthController = {
    // User registration
    register: (req, res) => {
        const { fname, lname, email, role, password } = req.body;

        UserModel.createUser(fname, lname, email, role, password, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Email already exists or database error' });
            }
            res.status(201).json({ message: 'User registered successfully', user });
        });
    },

    // User login
    login: (req, res) => {
        const { email, password } = req.body;

        UserModel.findUserByEmail(email, async (err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Compare the entered password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Create access and refresh tokens
            const accessToken = createAccessToken(user);
            const refreshToken = createRefreshToken(user);
           

            res.json({ accessToken, refreshToken });
        });
    }
};

module.exports = AuthController;