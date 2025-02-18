const express = require('express');
const db = require('../models/db');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', authenticateUser, async (req, res) => {
    const { train_id } = req.body;
    const user_id = req.user.id;

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [availableSeats] = await connection.execute(
            'SELECT total_seats - COUNT(bookings.id) AS available_seats FROM trains LEFT JOIN bookings ON trains.id = bookings.train_id WHERE trains.id = ? GROUP BY trains.id',
            [train_id]
        );

        if (!availableSeats.length || availableSeats[0].available_seats <= 0) {
            throw new Error('No seats available');
        }

        const [booking] = await connection.execute(
            'INSERT INTO bookings (user_id, train_id, seat_number) VALUES (?, ?, ?)',
            [user_id, train_id, availableSeats[0].available_seats]
        );

        await connection.commit();
        res.json({ message: 'Seat booked successfully', booking_id: booking.insertId });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: 'Booking failed', error: error.message });
    } finally {
        connection.release();
    }
});

module.exports = router;