const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { requireAdmin } = require('../middleware/auth');

// Public
router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Admin
router.get('/admin/all', requireAdmin, getAllServicesAdmin);
router.post('/admin', requireAdmin, createService);
router.patch('/admin/:id', requireAdmin, updateService);
router.delete('/admin/:id', requireAdmin, deleteService);

module.exports = router;
