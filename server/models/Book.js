const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Books', bookSchema);
