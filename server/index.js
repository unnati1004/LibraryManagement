const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({debug: true}); // ✅ Load environment variables
const path = require('path');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const myBookRoutes = require('./routes/mybooks');

const app = express();

const allowedOrigins = ['http://localhost:5173','https://librarymanagement-p9sa.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ CORS must come before routes and json parsing
app.use(cors(corsOptions));

// ✅ Handle preflight requests for all routes
//  app.options('*', cors(corsOptions));

app.use(express.static(path.join(__dirname, 'client', 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
    if (filePath.endsWith('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    }
  }
}));



// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/mybooks', myBookRoutes);

// MongoDB connection
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in your .env file');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log('Server running on port 5000')))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
