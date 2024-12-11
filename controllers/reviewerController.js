const Context = require('../models/context');

const markAsReviewed = async (req, res) => {
    try {
        const { contextId, category, factor, services, assets, documentation, stakeholders, legal, location } = req.body;
        const context = await Context.findByPk(contextId);
        if (!context) {
            return res.status(404).json({ success: false, message: 'Context not found' });
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
            stage: 2 // Assuming 2 is the ID for reviewed
        });
        res.json({ success: true, message: 'Context marked as reviewed successfully' });
    } catch (error) {
        console.error('Error marking context as reviewed:', error);
        res.status(500).json({ success: false, message: 'Failed to mark context as reviewed' });
    }
};

module.exports = { markAsReviewed };