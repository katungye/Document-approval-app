const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Role extends Model {}

Role.init({
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
    modelName: 'Role',
    timestamps: false, 
});

module.exports = Role;
