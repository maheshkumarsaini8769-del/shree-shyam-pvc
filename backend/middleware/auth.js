const jwt = require('jsonwebtoken');
const connectDB = require('../config/db');
const User = require('../models/User');
const AuthorizedAdmin = require('../models/AuthorizedAdmin');
const AdminSession = require('../models/AdminSession');

const JWT_SECRET = process.env.JWT_SECRET || 'sspi_secret_key_vastral_ahmedabad_2026';

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    await connectDB();
    const decoded = jwt.verify(token, JWT_SECRET);

    // If token has a registered session, verify it has not been revoked
    if (decoded.sessionId) {
      const session = await AdminSession.findById(decoded.sessionId);
      if (!session || !session.isValid) {
        return res.status(401).json({ message: 'Session has been revoked or logged out from this device. Please log in again.' });
      }
      req.sessionId = decoded.sessionId;
      // Asynchronously bump lastActive without blocking response
      AdminSession.findByIdAndUpdate(decoded.sessionId, { lastActive: new Date() }).exec();
    }
    
    // Check if user exists in User or AuthorizedAdmin
    let user = await User.findById(decoded.id);
    if (!user) {
      user = await AuthorizedAdmin.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found or session expired' });
    }

    // Check if admin is active
    if (user.status && user.status === 'inactive') {
      return res.status(403).json({ message: 'This admin account has been deactivated' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
};

const requireAdmin = async (req, res, next) => {
  await requireAuth(req, res, () => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
    }
  });
};

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      await connectDB();
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = (await User.findById(decoded.id)) || (await AuthorizedAdmin.findById(decoded.id)) || null;
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
