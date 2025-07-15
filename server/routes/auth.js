const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const router = express.Router();

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  const token = generateToken(user);
 req.headers['authorization'] = `Bearer ${token}`;
  console.log("token",token);
  res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    }).json({
  email: user.email,
  token, // ✅ send token in response
  user: { email: user.email } // optional for frontend
});
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).send('Invalid');
  const token = generateToken(user);
  req.headers['authorization'] = `Bearer ${token}`;

  res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).json({
  email: user.email,
  token, // ✅ send token in response
  user: { email: user.email } // optional for frontend
});
});

router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Unauthorized');
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json(user);
  } catch (err) {
    res.status(401).send('Invalid token');
  }
});

router.get('/logout', (_, res) => {
  res.clearCookie('token').send('Logged out');
});

module.exports = router;
