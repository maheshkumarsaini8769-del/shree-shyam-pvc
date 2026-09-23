const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db');
const User = require('../models/User');
const AuthorizedAdmin = require('../models/AuthorizedAdmin');
const { JWT_SECRET } = require('../middleware/auth');

// Customer registration
const register = async (req, res) => {
  try {
    await connectDB();
    const { name, email, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Name, phone, and password are required' });
    }

    const cleanPhone = phone.trim();
    const existing = await User.findOne({
      $or: [
        { phone: cleanPhone },
        ...(email ? [{ email: email.toLowerCase().trim() }] : [])
      ]
    });

    if (existing) {
      return res.status(400).json({ message: 'An account with this phone or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email ? email.toLowerCase().trim() : '',
      phone: cleanPhone,
      password: hashedPassword,
      role: 'customer'
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
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

// Login (Checks AuthorizedAdmin for admin credentials, or User for customer)
const login = async (req, res) => {
  try {
    await connectDB();
    const { identifier, email, password } = req.body;
    const loginIdentifier = (email || identifier || '').trim().toLowerCase();

    if (!loginIdentifier || !password) {
      return res.status(400).json({ message: 'Email/Phone and password are required' });
    }

    // 1. Check if loginIdentifier is an AuthorizedAdmin
    const authAdmin = await AuthorizedAdmin.findOne({ email: loginIdentifier });
    if (authAdmin) {
      if (authAdmin.status !== 'active') {
        return res.status(403).json({ message: 'Yeh admin account inactive hai. Kripya administrator se sampark karein.' });
      }

      const isMatch = await bcrypt.compare(password, authAdmin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Galat password. Kripya sahi password enter karein.' });
      }

      const token = jwt.sign(
        { id: authAdmin._id, role: authAdmin.role, email: authAdmin.email },
        JWT_SECRET,
        { expiresIn: '30d' }
      );

      return res.json({
        token,
        user: {
          id: authAdmin._id,
          name: authAdmin.name,
          email: authAdmin.email,
          role: authAdmin.role,
          isAuthorizedAdmin: true
        }
      });
    }

    // 2. If trying to log in with an email not in AuthorizedAdmin, check standard User collection
    const user = await User.findOne({
      $or: [
        { email: loginIdentifier },
        { phone: loginIdentifier.replace(/[^0-9]/g, '') }
      ]
    });

    if (!user) {
      return res.status(401).json({
        message: 'Account nahi mila. Agar aap admin hain toh kripya authorized admin email use karein.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Please check your password.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isAuthorizedAdmin: user.role === 'admin' || user.role === 'superadmin'
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
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone || '',
      role: req.user.role,
      isAuthorizedAdmin: req.user.role === 'admin' || req.user.role === 'superadmin'
    }
  });
};

// ==========================================
// EMAIL AUTHORITY & ADMIN ACCESS MANAGEMENT
// ==========================================

// Get all authorized admins
const getAuthorizedAdmins = async (req, res) => {
  try {
    await connectDB();
    const admins = await AuthorizedAdmin.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching authorized admins', error: err.message });
  }
};

// Add new authorized admin email with custom password
const addAuthorizedAdmin = async (req, res) => {
  try {
    await connectDB();
    const { email, name, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await AuthorizedAdmin.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ message: `Yeh email (${cleanEmail}) pehle se authorized hai.` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await AuthorizedAdmin.create({
      email: cleanEmail,
      name: (name || 'Admin').trim(),
      password: hashedPassword,
      role: role === 'superadmin' ? 'superadmin' : 'admin',
      status: 'active',
      addedBy: req.user ? req.user.email : 'admin'
    });

    // Also sync or create in User model
    let existingUser = await User.findOne({ email: cleanEmail });
    if (!existingUser) {
      await User.create({
        name: newAdmin.name,
        email: cleanEmail,
        password: hashedPassword,
        role: newAdmin.role,
        isAuthorizedAdmin: true
      });
    } else {
      existingUser.password = hashedPassword;
      existingUser.role = newAdmin.role;
      existingUser.isAuthorizedAdmin = true;
      await existingUser.save();
    }

    res.status(201).json({
      success: true,
      message: `Admin ${cleanEmail} successfully authorized!`,
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
        status: newAdmin.status,
        createdAt: newAdmin.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error authorizing new admin', error: err.message });
  }
};

// Update authorized admin (Name, status, role, or change password)
const updateAuthorizedAdmin = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const { name, status, role, newPassword } = req.body;

    const admin = await AuthorizedAdmin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Authorized admin record not found' });
    }

    if (name) admin.name = name.trim();
    if (status && ['active', 'inactive'].includes(status)) admin.status = status;
    if (role && ['admin', 'superadmin'].includes(role)) admin.role = role;

    if (newPassword && newPassword.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword.trim(), salt);
    }

    await admin.save();

    // Sync to User model
    const user = await User.findOne({ email: admin.email });
    if (user) {
      user.name = admin.name;
      user.role = admin.role;
      if (newPassword && newPassword.trim().length > 0) {
        user.password = admin.password;
      }
      await user.save();
    }

    res.json({
      success: true,
      message: 'Admin permissions updated successfully',
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        status: admin.status,
        updatedAt: admin.updatedAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating authorized admin', error: err.message });
  }
};

// Delete authorized admin
const deleteAuthorizedAdmin = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const admin = await AuthorizedAdmin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Authorized admin record not found' });
    }

    // Protect primary superadmin
    if (admin.email === 'maheshkumarsaini8769@gmail.com') {
      return res.status(403).json({ message: 'Primary superadmin account cannot be removed!' });
    }

    await AuthorizedAdmin.findByIdAndDelete(id);
    await User.findOneAndDelete({ email: admin.email });

    res.json({ success: true, message: `Access revoked for ${admin.email}` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting authorized admin', error: err.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getAuthorizedAdmins,
  addAuthorizedAdmin,
  updateAuthorizedAdmin,
  deleteAuthorizedAdmin
};
