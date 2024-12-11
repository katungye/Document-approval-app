const Role = require('../models/role'); 

async function seedRoles() {
    const roles = ['user', 'reviewer', 'admin', 'inactive'];

    try {
        for (const roleName of roles) {
            const [role, created] = await Role.findOrCreate({
                where: { name: roleName },
            });
            if (created) {
                console.log(`Role "${roleName}" created.`);
            }
        }
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
}

module.exports = seedRoles;
