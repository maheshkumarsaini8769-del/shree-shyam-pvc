const store = require('../config/store');

const getSettings = (req, res) => {
  const settings = store.getSettings();
  res.json(settings);
};

const updateSettings = (req, res) => {
  const updated = store.updateSettings(req.body);
  res.json(updated);
};

module.exports = {
  getSettings,
  updateSettings
};
