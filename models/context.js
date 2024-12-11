const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Status = require('./status');

class Context extends Model {}

Context.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    factor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    services: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    assets: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    documentation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stakeholders: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    legal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    stage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'id',
        },
    },
    previousStage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Status,
            key: 'id',
        },
    },
    submittedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Context',
    timestamps: false,
});

// Define relationships
Context.belongsTo(User, { foreignKey: 'submittedBy', as: 'submitter' });
User.hasMany(Context, { foreignKey: 'submittedBy', as: 'contexts' });

Context.belongsTo(Status, { foreignKey: 'stage', as: 'currentStage' });
Status.hasMany(Context, { foreignKey: 'stage', as: 'contextsCurrent' });

Context.belongsTo(Status, { foreignKey: 'previousStage', as: 'previousStageStatus' });
Status.hasMany(Context, { foreignKey: 'previousStage', as: 'contextsPrevious' });

module.exports = Context;