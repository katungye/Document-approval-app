// models/user.js
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

module.exports = User;
