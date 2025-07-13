const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const myBookRoutes = require('./routes/mybooks');

const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'https://librarymanagement-p9sa.onrender.com', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/mybooks', myBookRoutes);

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in your .env file');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });