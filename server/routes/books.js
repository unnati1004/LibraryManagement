const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// POST route to add a book
router.post('/', async (req, res) => {  
  try {
    const { title, author, coverImage, availability } = req.body;

    const newBook = new Book({
      title,
      author,
      coverImage,
      availability
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook); // success
  } catch (err) {
    res.status(400).json({ error: 'Failed to save book' });
  }
});

module.exports = router;