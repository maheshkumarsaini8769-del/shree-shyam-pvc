const express = require('express');
const router = express.Router();
const {
  getApprovedReviews,
  submitReview,
  getAllReviewsAdmin,
  updateReviewStatus,
  replyToReview,
  deleteReview
} = require('../controllers/reviewController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', getApprovedReviews);
router.post('/', submitReview);
router.get('/admin', requireAdmin, getAllReviewsAdmin);
router.patch('/admin/:id', requireAdmin, updateReviewStatus);
router.post('/admin/:id/reply', requireAdmin, replyToReview);
router.delete('/admin/:id', requireAdmin, deleteReview);

module.exports = router;
