const express = require('express');
const jwt = require('jsonwebtoken');
const MyBook = require('../models/MyBook');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const router = express.Router();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Unauthorized: Missing token');
  const token = authHeader.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).send('Server misconfiguration: JWT_SECRET not set');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

router.get('/', authenticate, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const books = await MyBook.find({ userId }).populate('bookId');
    res.json(books);
  } catch (err) {
    console.error('GET /api/mybooks error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/:bookId', authenticate, async (req, res) => {
  try {
    const { bookId } = req.params;
    const existing = await MyBook.findOne({ userId: req.user.id, bookId });
    if (existing) return res.status(400).send('Book already added');
    const newEntry = await MyBook.create({ userId: req.user.id, bookId });
    res.json(newEntry);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:bookId/status', authenticate, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;
    const entry = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { status },
      { new: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:bookId/rating', authenticate, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;

    const entry = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { rating },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send('Book not found'); // ✅ Book not found
    }

    res.status(200).json(entry); // ✅ OK
  } catch (err) {
    res.status(500).send('Server error'); // ✅ Internal Server Error
  }
});


module.exports = router;
