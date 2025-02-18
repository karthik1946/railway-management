const express = require('express');
const db = require('../models/db');
const { authenticateAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addTrain', authenticateAdmin, async (req, res) => {
    const { name, source, destination, total_seats } = req.body;
    try {
        await db.execute(
            'INSERT INTO trains (name, source, destination, total_seats) VALUES (?, ?, ?, ?)',
            [name, source, destination, total_seats]
        );
        res.status(201).json({ message: 'Train added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding train', error });
    }
});

router.get('/availability', async (req, res) => {
    const { source, destination } = req.query;
    try {
        const [trains] = await db.execute(
            'SELECT * FROM trains WHERE source = ? AND destination = ?',
            [source, destination]
        );
        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching availability', error });
    }
});

module.exports = router;