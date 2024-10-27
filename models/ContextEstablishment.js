// models/ContextEstablishment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Make sure your database connection is correct

const ContextEstablishment = sequelize.define('ContextEstablishment', {
    refCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: 'context_establishments' // Optional: table name in the database
});

module.exports = ContextEstablishment;
