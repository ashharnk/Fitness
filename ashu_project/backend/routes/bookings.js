const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Class = require('../models/Class');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if(!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.user = decoded;
    next();
  });
};

// Book a class
router.post('/', verifyToken, async (req, res) => {
  const { classId, paymentIntentId } = req.body;
  try {
    // Check if class exists and has available slots
    const classItem = await Class.findById(classId);
    if(!classItem) return res.status(404).json({ message: "Class not found" });

    // Count existing bookings for this class
    const bookingsCount = await Booking.countDocuments({ classId, status: { $ne: 'cancelled' } });
    if(bookingsCount >= classItem.capacity) {
      return res.status(400).json({ message: "No available slots" });
    }

    const booking = new Booking({ classId, student: req.user.id, paymentIntentId, status: 'confirmed' });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookings for the logged-in user
router.get('/my', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user.id }).populate('classId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
