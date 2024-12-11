// controllers/userController.js

const User = require('../models/user');

const updateUserRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        console.log('Received userId:', userId);
        console.log('Received roleId:', roleId);
        const user = await User.findByPk(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.roleId = roleId;
        await user.save();
        res.redirect('/auth/dashboard');
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ success: false, message: 'Failed to update user role' });
    }
};

module.exports = { updateUserRole };