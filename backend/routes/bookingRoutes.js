const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingById,
  getMyBookings,
  getAllBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { optionalAuth, requireAdmin } = require('../middleware/auth');

// Public & Customer routes
router.post('/', optionalAuth, createBooking);
router.get('/my', optionalAuth, getMyBookings);
router.get('/track/:id', getBookingById);
router.get('/:id', getBookingById);

// Admin routes
router.get('/admin/all', requireAdmin, getAllBookings);
router.patch('/admin/:id', requireAdmin, updateBookingStatus);

module.exports = router;
