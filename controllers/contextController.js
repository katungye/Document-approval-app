// controllers/contextController.js

const Context = require('../models/context');
const User = require('../models/user');
const Status = require('../models/status');

const getAllContexts = async (req, res) => {
    try {
        const contexts = await Context.findAll({
            include: [
                { model: User, as: 'submitter' },
                { model: Status, as: 'currentStage' },
                { model: Status, as: 'previousStageStatus' }
            ]
        });
        res.status(200).json(contexts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contexts', error });
    }
};

const getContextById = async (req, res) => {
    try {
        const context = await Context.findByPk(req.params.id, {
            include: [
                { model: User, as: 'submitter' },
                { model: Status, as: 'currentStage' },
                { model: Status, as: 'previousStageStatus' }
            ]
        });
        if (!context) {
            return res.status(404).json({ message: 'Context not found' });
        }
        res.status(200).json(context);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching context', error });
    }
};

const createContext = async (req, res) => {
    try {
        const { category, factor, services, assets, documentation, stakeholders, legal, location } = req.body;
        const newContext = await Context.create({
            category,
            factor,
            services,
            assets,
            documentation,
            stakeholders,
            legal,
            location,
            submittedBy: req.user.id, // Assuming you have the user ID in the request object
            stage: 1, // Assuming initial stage is 1, adjust as necessary
            previousStage: null // Assuming no previous stage for new context
        });
        res.redirect('/auth/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Error creating context', error });
    }
};

const updateContext = async (req, res) => {
    try {
        const { id, category, factor, services, assets, documentation, stakeholders, legal, location, status } = req.body;
        const context = await Context.findByPk(id);
        if (!context) {
            return res.status(404).json({ message: 'Context not found' });
        }
        await context.update({
            category,
            factor,
            services,
            assets,
            documentation,
            stakeholders,
            legal,
            location,
            stage: status // Update the stage with the selected status
        });
        res.redirect('/auth/dashboard'); // Redirect to the dashboard after successful update
    } catch (error) {
        res.status(500).json({ message: 'Error updating context', error });
    }
};

const deleteContext = async (req, res) => {
    try {
        const context = await Context.findByPk(req.params.id);
        if (!context) {
            return res.status(404).json({ message: 'Context not found' });
        }
        await context.destroy();
        res.status(200).json({ message: 'Context deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting context', error });
    }
};

module.exports = { getAllContexts, getContextById, createContext, updateContext, deleteContext };