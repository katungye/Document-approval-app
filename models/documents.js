const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this path points to your database config

const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reviewStatus: {
        type: DataTypes.STRING, // Adjust based on your needs (e.g., ENUM for specific statuses)
        allowNull: true, // Optional, can be null initially
    },
    approvalStatus: {
        type: DataTypes.STRING, // Adjust based on your needs
        allowNull: true, // Optional, can be null initially
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subcategory: {
        type: DataTypes.STRING,
        allowNull: true, // Optional
    },
    description: {
        type: DataTypes.TEXT, // Use TEXT for larger descriptions
        allowNull: true, // Optional
    },
    uploadDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set to the current date
    },
    uploadedBy: {
        type: DataTypes.STRING, // Change this to INTEGER and relate to a User model if needed
        allowNull: false, // Required if you want to track who uploaded the document
    },
    link: {
        type: DataTypes.STRING, // Store the file path or URL of the uploaded document
        allowNull: false,
    },
    ref: {
        type: DataTypes.STRING, // You might use this for any reference number or code
        allowNull: true, // Optional
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Export the model for use in other files
module.exports = Document;
