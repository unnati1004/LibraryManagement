import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  const token = generateToken(user);
  req.headers['authorization'] = `Bearer ${token}`;
  // console.log("token",token);
  res.cookie('token', token, { httpOnly: true }).json({ email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).send('Invalid');
  const token = generateToken(user);
  req.headers['authorization'] = `Bearer ${token}`;
  res.cookie('token', token, { httpOnly: true }).json({ email: user.email });
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

export default router;
