const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config()
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//ejs
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
const ip = process.env.IP || '127.0.0.1';
const db = require('./config/config');

//public
app.use(express.static('public'));

app.use(bodyParser.json()); // To parse JSON request bodies

// Routes
app.use('/users', userRoutes);
app.use('/assets', assetRoutes);
app.use('/auth', authRoutes);

// the ejs dashboard
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
//  the ejs login
app.get('/', (req, res) => {
  res.render('login');
});

//  the ejs register
app.get('/register', (req, res) => {
  res.render('register');
});

// Start the server
app.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
      if (err) {
          console.error('Error closing database ' + err.message);
      }
      console.log('Database connection closed.');
      process.exit(0);
  });
});
