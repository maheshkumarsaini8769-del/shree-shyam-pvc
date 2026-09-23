const jwt = require('jsonwebtoken');
const store = require('../config/store');

const JWT_SECRET = process.env.JWT_SECRET || 'sspi_secret_key_vastral_ahmedabad_2026';

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = store.getCollection('users').findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found or session expired' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
};

const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
    }
  });
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = store.getCollection('users').findById(decoded.id) || null;
    } catch (err) {
      req.user = null;
    }
  }
  next();
};

module.exports = {
  JWT_SECRET,
  requireAuth,
  requireAdmin,
  optionalAuth
};
