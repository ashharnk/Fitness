const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'] ? req.headers['authorization'].split('Bearer ')[1] : false ;
  if(!token) return res.status(401).json({ message: 'No token provided' });
  console.log(token,process.env.JWT_SECRET)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.user = decoded;
    next();
  });
};

// Create a class (only admin or trainer)
router.post('/', verifyToken, async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'trainer'){
    return res.status(403).json({ message: 'Not authorized' });
  }
  const { title, description, date, capacity } = req.body;
  try {
    const newClass = new Class({ title, description, date, capacity, trainer: req.user.id });
    await newClass.save();
    res.json(newClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer', 'name email');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
