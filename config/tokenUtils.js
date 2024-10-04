
const jwt = require('jsonwebtoken');
require('dotenv').config()


const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

// Create access token (short-lived)
const createAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '15m' });
};

// Create refresh token (longer-lived)
const createRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

module.exports = {
    createAccessToken,
    createRefreshToken
};