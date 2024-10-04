// models/userModel.js
const db = require('../config/config');
const bcrypt = require('bcryptjs');

const UserModel = {
    // Create a new user (register)
    createUser: async (fname, lname, email, role, password, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.run(
                `INSERT INTO user (fname, lname, email, role, password) 
                 VALUES (?, ?, ?, ?, ?)`,
                [fname, lname, email, role, hashedPassword],
                function (err) {
                    if (err) {
                        return callback(err, null); // Likely error: duplicate email
                    }
                    callback(null, { id: this.lastID, fname, lname, email, role });
                }
            );
        } catch (error) {
            callback(error, null);
        }
    },

    // Find a user by email (login)
    findUserByEmail: (email, callback) => {
        db.get('SELECT * FROM user WHERE email = ?', [email], (err, user) => {
            if (err || !user) {
                return callback('User not found', null);
            }
            callback(null, user);
        });
    }
};

module.exports = UserModel;
