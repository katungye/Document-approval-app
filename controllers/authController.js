<<<<<<< HEAD
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
=======
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const dotenv = require('dotenv');
//const { use } = require('../routes/authRoutes');

dotenv.config();

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fname, lname, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fname, lname, email, password: hashedPassword, role });
    //res.status(201).json({ message: 'User registered successfully', user });
    // After successful registration, redirect to the login page
     res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Add secure flag if in production
    return res.redirect('/dashboard'); // Redirect after setting the cookie
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to log in' });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); 
    res.render('users', { users }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
>>>>>>> 3aaf9b0 (Initial commit)
