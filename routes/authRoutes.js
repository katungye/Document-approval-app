const express = require('express');
const { registerUser, loginUser, logoutUser, allusers } = require('../controllers/authController');
const { isAuthenticated, redirectIfAuthenticated, validateUserRegistration } = require('../middlewares/authMiddleware');
const User = require('../models/user');
const Role = require('../models/role');
const Context = require('../models/context');
const Status = require('../models/status');

const router = express.Router();

// Public routes
router.get('/login', redirectIfAuthenticated, (req, res) => res.render('login'));
router.get('/register', redirectIfAuthenticated, (req, res) => res.render('register'));

// Register and login actions
router.post('/register', redirectIfAuthenticated, validateUserRegistration, registerUser);
router.post('/login', redirectIfAuthenticated, loginUser);

// Logout - accessible only to authenticated users
router.get('/logout', isAuthenticated, logoutUser);

// Dashboard route
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        // Fetch user with role details
        const userWithRole = await User.findOne({
            where: { id: req.user.id },
            include: { model: Role, as: 'role' }, // Ensure this matches your association
        });

        if (!userWithRole) {
            return res.status(404).send('User not found.');
        }

        if (userWithRole.status === 'inactive') {
            return res.status(403).send('Your access is pending confirmation or has been revoked. Please contact the administrator.');
        }

        // Fetch counts
        const userCount = await User.count();
        const contextCount = await Context.count();
        const approvedCount = await Context.count({ where: { stage: 5 } }); // Assuming 5 is the ID for approved
        const rejectedCount = await Context.count({ where: { stage: 4 } }); // Assuming 4 is the ID for rejected
        const rawCount = await Context.count({ where: { stage: 1 } }); // Assuming 1 is the ID for raw
        const reviewedCount = await Context.count({ where: { stage: 2 } }); // Assuming 2 is the ID for reviewed

        // Fetch statuses
        const statuses = await Status.findAll();

        // Fetch users and roles
        const users = await User.findAll({ include: { model: Role, as: 'role' } });
        const roles = await Role.findAll();

        // Pagination logic
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Number of contexts per page
        const offset = (page - 1) * limit;

        // Fetch context data with pagination
        const { count, rows: contexts } = await Context.findAndCountAll({
            include: [
                { model: User, as: 'submitter' },
                { model: Status, as: 'currentStage' },
                { model: Status, as: 'previousStageStatus' }
            ],
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        res.render('dashboard', { user: userWithRole, contexts, page, totalPages, userCount, contextCount, approvedCount, rejectedCount, rawCount, reviewedCount, statuses, users, roles, currentPage: page });
        console.log("User role:", userWithRole.role);
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).send('Internal server error.');
    }
});

module.exports = router;