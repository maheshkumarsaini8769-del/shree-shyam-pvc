const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { requireAdmin } = require('../middleware/auth');

router.get('/', getSettings);
router.patch('/admin', requireAdmin, updateSettings);

module.exports = router;
