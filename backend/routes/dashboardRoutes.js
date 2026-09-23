const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getNotifications,
  markNotificationRead
} = require('../controllers/dashboardController');
const { requireAdmin } = require('../middleware/auth');

router.get('/stats', requireAdmin, getDashboardStats);
router.get('/notifications', requireAdmin, getNotifications);
router.patch('/notifications/:id/read', requireAdmin, markNotificationRead);

module.exports = router;
