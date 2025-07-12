const express = require('express');
const jwt = require('jsonwebtoken');
const MyBook = require('../models/MyBook');
// const Book = require('../models/Book');
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
    // Ensure req.user.id exists and is valid
    if (!req.user || !req.user.id) {
      return res.status(401).send('Unauthorized: Invalid user');
    }
    console.log(req.user.id,req.user);
    const books = await MyBook.find({ userId: req.user.id }).populate('bookId');
    res.json(books);
  } catch (err) {
    res.status(500).send('Server error');
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

router.patch('/:bookId/status', authenticate, async (req, res) => {
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

router.patch('/:bookId/rating', authenticate, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;
    const entry = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { rating },
      { new: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
