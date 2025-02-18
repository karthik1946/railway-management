const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const authenticateAdmin = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
    next();
};

module.exports = { authenticateUser, authenticateAdmin };