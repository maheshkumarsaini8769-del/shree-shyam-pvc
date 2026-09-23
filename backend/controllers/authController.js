const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('../config/store');
const { JWT_SECRET } = require('../middleware/auth');

const users = store.getCollection('users');

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Name, phone, and password are required' });
    }

    const cleanPhone = phone.trim();
    const existing = users.findOne(u => u.phone === cleanPhone || (email && u.email === email.toLowerCase()));
    if (existing) {
      return res.status(400).json({ message: 'An account with this phone or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = users.create({
      name,
      email: email ? email.toLowerCase().trim() : '',
      phone: cleanPhone,
      password: hashedPassword,
      role: 'customer'
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // email or phone
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier (email/phone) and password are required' });
    }

    const clean = identifier.trim().toLowerCase();
    const user = users.findOne(u => 
      (u.email && u.email.toLowerCase() === clean) || 
      (u.phone && u.phone.replace(/[^0-9]/g, '') === clean.replace(/[^0-9]/g, ''))
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
};

const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role
    }
  });
};

module.exports = {
  register,
  login,
  getMe
};
