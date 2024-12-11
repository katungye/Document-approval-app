// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const jwtSecret = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
    try {
        const { fname, lname, email, password, roleId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fname, lname, email, password: hashedPassword, roleId });
        // Redirect to login page after successful registration
        res.redirect('/auth/login');
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

const allusers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('dashboard', { users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id, roleId: user.roleId }, jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/auth/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};

module.exports = { registerUser, loginUser, logoutUser, allusers };