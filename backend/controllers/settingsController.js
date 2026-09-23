const connectDB = require('../config/db');
const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving settings', error: err.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    // Merge incoming updates
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        settings[key] = req.body[key];
      }
    });

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings', error: err.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
