const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const router = express.Router();

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = generateToken(user);

    res
      .status(201) // ✅ Created
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      })
      .json({
        token,
        user: { email: user.email }
      });
  } catch (error) {
    res.status(500).send('Server error during registration');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatch = user && await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid email or password'); // ✅ Unauthorized
    }

    const token = generateToken(user);

    res
      .status(200) // ✅ OK
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .json({
        token,
        user: { email: user.email }
      });
  } catch (error) {
    res.status(500).send('Server error during login');
  }
});

// Me Route
router.get('/me', (req, res) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) return res.status(401).send('Unauthorized');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(user); // ✅ OK
  } catch (err) {
    res.status(401).send('Invalid token');
  }
});


// Logout Route
router.get('/logout', (_, res) => {
  res.clearCookie('token').status(200).send('Logged out'); // ✅ OK
});

module.exports = router;
