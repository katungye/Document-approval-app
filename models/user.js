// models/user.js
<<<<<<< HEAD
const db = require('../config/config'); // Import the database configuration

const User = {
    getAll: (callback) => {
        db.all('SELECT * FROM user', [], (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, rows);
        });
    },

    addUser: (fname, lname, email, password, callback) => {
        db.run(
            'INSERT INTO user (fname, lname, email, password) VALUES (?, ?, ?, ?)',
            [fname, lname, email, password],
            function(err) {
                if (err) {
                    return callback(err); // Handle error
                }
                callback(null, { id: this.lastID, name: `${fname} ${lname}`, email });
            }
        );
    }
};
=======
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed

const User = sequelize.define('user', {
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false, // or true if you're using timestamps
});
>>>>>>> 3aaf9b0 (Initial commit)

module.exports = User;
