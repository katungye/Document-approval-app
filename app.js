const express = require('express');
const initializeAdmin = require('./config/setup');
const sequelize = require('./config/db');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const contextRoutes = require('./routes/contextRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewerRoutes = require('./routes/reviewerRoutes');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

// Define the views directory for EJS
app.set('views', path.join(__dirname, 'views'));

// Static files for CSS, JS, images
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up environment variables with fallback
const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '127.0.0.1';


app.use(express.json());

// Use routes
app.use('/auth', authRoutes);
app.use('/context', contextRoutes);
app.use('/user', userRoutes);
app.use('/reviewer', reviewerRoutes);

app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs page
});

// Initialize database and admin user
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        await initializeAdmin();
        app.listen(PORT, () => console.log(`Server running on http://${IP}:${PORT}`));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();