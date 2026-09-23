const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial state template
const defaultState = {
  users: [],
  services: [],
  bookings: [],
  enquiries: [],
  gallery: [],
  reviews: [],
  faqs: [],
  settings: {},
  notifications: []
};

class JsonStore {
  constructor() {
    this.filePath = STORE_FILE;
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return { ...defaultState, ...JSON.parse(raw) };
      }
    } catch (err) {
      console.error('Error reading store.json, resetting to default:', err.message);
    }
    this.save(defaultState);
    return { ...defaultState };
  }

  save(data = this.data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing store.json:', err.message);
    }
  }

  getCollection(name) {
    if (!this.data[name]) {
      this.data[name] = [];
      this.save();
    }
    return {
      find: (filter = {}) => {
        let results = [...(this.data[name] || [])];
        if (typeof filter === 'function') {
          return results.filter(filter);
        }
        for (const [key, value] of Object.entries(filter)) {
          results = results.filter(item => item[key] === value);
        }
        return results;
      },

      findOne: (filter = {}) => {
        const items = this.getCollection(name).find(filter);
        return items[0] || null;
      },

      findById: (id) => {
        return (this.data[name] || []).find(item => item.id === id || item._id === id) || null;
      },

      create: (item) => {
        const id = item.id || item._id || ('id_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7));
        const newItem = {
          ...item,
          id,
          _id: id,
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.data[name].push(newItem);
        this.save();
        return newItem;
      },

      findByIdAndUpdate: (id, updates) => {
        const index = (this.data[name] || []).findIndex(item => item.id === id || item._id === id);
        if (index === -1) return null;
        this.data[name][index] = {
          ...this.data[name][index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.save();
        return this.data[name][index];
      },

      findByIdAndDelete: (id) => {
        const index = (this.data[name] || []).findIndex(item => item.id === id || item._id === id);
        if (index === -1) return null;
        const deleted = this.data[name].splice(index, 1)[0];
        this.save();
        return deleted;
      },

      countDocuments: (filter = {}) => {
        return this.getCollection(name).find(filter).length;
      },

      replaceAll: (items) => {
        this.data[name] = items;
        this.save();
        return this.data[name];
      }
    };
  }

  getSettings() {
    return this.data.settings || {};
  }

  updateSettings(newSettings) {
    this.data.settings = {
      ...(this.data.settings || {}),
      ...newSettings,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.settings;
  }
}

const store = new JsonStore();
module.exports = store;
