const express = require('express');
const router = express.Router();
const {
  getActiveFaqs,
  getAllFaqsAdmin,
  createFaq,
  updateFaq,
  deleteFaq
} = require('../controllers/faqController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', getActiveFaqs);
router.get('/admin', requireAdmin, getAllFaqsAdmin);
router.post('/admin', requireAdmin, createFaq);
router.patch('/admin/:id', requireAdmin, updateFaq);
router.delete('/admin/:id', requireAdmin, deleteFaq);

module.exports = router;
