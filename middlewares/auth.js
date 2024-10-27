//middleware/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to authenticate JWT and check for valid user
exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Check both cookie and Authorization header
  if (!token) {
      return res.redirect('/login');
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.redirect('/login');
      }
      req.user = decoded;
      next();
  });
};

// Middleware to authorize based on user role
exports.authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next(); 
    } else {
      res.status(403).send("Access denied. You do not have permission to view this resource.");
    }
  };
};


exports.redirectIfAuthenticated = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in cookies

  if (token) {
    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (!err) {
        // If token is valid, redirect to the dashboard
        return res.redirect('/dashboard');
      }
      // If token is invalid, proceed to login page
      next();
    });
  } else {
    // No token found, proceed to login page
    next();
  }
};