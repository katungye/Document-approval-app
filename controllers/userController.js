//controllers/userController.js
const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).json({ error: 'An error occurred while fetching users.' });
        }
        res.status(200).json(users); // Return users
    });
};

exports.addUser = (req, res) => {
    console.log('Request body:', req.body); // Log the entire request body
    const { fname, lname, email, password } = req.body; // Destructure request body

    // Validate input
    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ error: 'First name, last name, email, and password are required.' });
    }

    User.addUser(fname, lname, email, password, (err, newUser) => {
        if (err) {
            console.error('Error adding user:', err.message);
            return res.status(500).json({ error: 'An error occurred while adding the user.' });
        }
        
        res.status(201).json(newUser); // Respond with the created user details
    });
};
