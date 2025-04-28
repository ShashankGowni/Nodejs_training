const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Signup Controller
exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.json({ message: 'User registered successfully' });
};

// Login Controller (Generates JWT)
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

  // Create JWT token
  const token = jwt.sign({ userId: user._id }, '1234', { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};
