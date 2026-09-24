const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  getAuthorizedAdmins,
  addAuthorizedAdmin,
  updateAuthorizedAdmin,
  deleteAuthorizedAdmin,
  getAdminSessions,
  revokeAdminSession,
  revokeAllOtherSessions
} = require('../controllers/authController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, getMe);

// Admin Email Authority Whitelist Management
router.get('/admin/authorities', requireAdmin, getAuthorizedAdmins);
router.post('/admin/authorities', requireAdmin, addAuthorizedAdmin);
router.patch('/admin/authorities/:id', requireAdmin, updateAuthorizedAdmin);
router.delete('/admin/authorities/:id', requireAdmin, deleteAuthorizedAdmin);

// Admin Active Device Sessions & Remote Logout
router.get('/admin/sessions', requireAdmin, getAdminSessions);
router.delete('/admin/sessions/:sessionId', requireAdmin, revokeAdminSession);
router.post('/admin/sessions/revoke-others', requireAdmin, revokeAllOtherSessions);

module.exports = router;
