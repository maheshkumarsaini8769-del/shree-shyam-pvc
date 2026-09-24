const mongoose = require('mongoose');

const AdminSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  device: {
    type: String,
    default: 'Unknown Device'
  },
  browser: {
    type: String,
    default: 'Web Browser'
  },
  os: {
    type: String,
    default: 'Unknown OS'
  },
  ip: {
    type: String,
    default: 'Unknown IP'
  },
  userAgent: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: 'Ahmedabad, Gujarat, India'
  },
  isValid: {
    type: Boolean,
    default: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

AdminSessionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
AdminSessionSchema.set('toJSON', { virtuals: true });
AdminSessionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.AdminSession || mongoose.model('AdminSession', AdminSessionSchema);
