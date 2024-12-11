const sequelize = require('./db'); 
const User = require('../models/user'); 
const Role = require('../models/role'); 
const Status = require('../models/status'); 
const Context = require('../models/context'); 
const bcrypt = require('bcrypt');
const seedRoles = require('./seedRoles'); 
const seedStatuses = require('./seedStatuses'); 


async function initializeAdmin() {
    try {
        // Sync database and models to create tables
        await sequelize.sync();

        // Seed roles, statuses, and context data
        await seedRoles();
        await seedStatuses();
        

        // Check if any users exist
        const userCount = await User.count();
        if (userCount === 0) {
            console.log('No users found. Creating default admin user...');
            
            // Find admin role
            const adminRole = await Role.findOne({ where: { name: 'admin' } });

            // Create a default admin user
            const adminPassword = 'admin123'; 
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            await User.create({
                fname: 'Admin',
                lname: 'User',
                email: 'admin@example.com',
                password: hashedPassword,
                roleId: adminRole.id,
            });

            console.log('Admin user created with email: admin@example.com and password: admin123');
        } else {
            console.log('Users already exist. Skipping admin creation.');
        }
    } catch (error) {
        console.error('Error initializing admin user:', error);
    }
}

module.exports = initializeAdmin;
