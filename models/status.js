const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Status extends Model {}

Status.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Status',
    timestamps: false, 
});

module.exports = Status;
