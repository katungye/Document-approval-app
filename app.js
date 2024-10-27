<<<<<<< HEAD
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const contextRoutes = require('./routes/contextRoutes');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db'); // Your Sequelize config


dotenv.config();

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '127.0.0.1';

const app = express();
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.static('public')); // Serve static files from the public directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(cookieParser()); // Parse cookies

//uploadfolder 
app.use('/uploads', express.static('uploads'));

// Use authentication routes
app.use('/', authRoutes);
// Use document routes
app.use('/document', documentRoutes);  
// Use the route for context tracker
app.use('/context', contextRoutes);



// Synchronize the database
sequelize.sync({ alter: true }) // Alter tables to fit the model definitions
    .then(() => {
        console.log('Database synchronized');
        // Start the server only after the database sync is successful
        app.listen(PORT, IP, () => {
            console.log(`Server running on http://${IP}:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
=======
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const contextRoutes = require('./routes/contextRoutes');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db'); // Your Sequelize config


dotenv.config();

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '127.0.0.1';

const app = express();
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.static('public')); // Serve static files from the public directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data
app.use(cookieParser()); // Parse cookies

//uploadfolder 
app.use('/uploads', express.static('uploads'));

// Use authentication routes
app.use('/', authRoutes);
// Use document routes
app.use('/document', documentRoutes);  
// Use the route for context tracker
app.use('/context', contextRoutes);



// Synchronize the database
sequelize.sync({ alter: true }) // Alter tables to fit the model definitions
    .then(() => {
        console.log('Database synchronized');
        // Start the server only after the database sync is successful
        app.listen(PORT, IP, () => {
            console.log(`Server running on http://${IP}:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
>>>>>>> 3aaf9b0 (Initial commit)
