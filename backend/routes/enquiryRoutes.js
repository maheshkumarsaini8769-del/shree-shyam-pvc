const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { requireAdmin } = require('../middleware/auth');

router.post('/', createEnquiry);
router.get('/admin', requireAdmin, getAllEnquiries);
router.patch('/admin/:id', requireAdmin, updateEnquiryStatus);
router.delete('/admin/:id', requireAdmin, deleteEnquiry);

module.exports = router;
