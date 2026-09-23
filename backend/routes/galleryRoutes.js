const express = require('express');
const router = express.Router();
const {
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', getAllGallery);
router.post('/admin', requireAdmin, createGalleryItem);
router.patch('/admin/:id', requireAdmin, updateGalleryItem);
router.delete('/admin/:id', requireAdmin, deleteGalleryItem);

module.exports = router;
