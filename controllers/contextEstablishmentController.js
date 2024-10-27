const ContextEstablishment = require('../models/ContextEstablishment');

// Create a new context tracker
exports.createContextTracker = async (req, res) => {
    try {
        const { refCode, startDate, endDate } = req.body;

        // Validate endDate
        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({ error: 'End date must be after start date.' });
        }

        // Create new context tracker
        await ContextEstablishment.create({
            refCode,
            startDate,
            endDate
        });

        // Redirect to the dashboard after successful creation
        return res.redirect('/dashboard');
    } catch (error) {
        console.error('Error creating context tracker:', error);
        return res.status(500).json({ error: 'Failed to create context tracker' });
    }
};

// Get all context trackers
exports.getTrackers = async (req, res) => {
    try {
        const trackers = await ContextEstablishment.findAll();
        res.render('trackers', { trackers }); // Render a new view named trackers.ejs
    } catch (error) {
        console.error('Error fetching trackers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};