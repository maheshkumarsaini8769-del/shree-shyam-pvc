const mongoose = require('mongoose');

const AuthorizedAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    default: 'Administrator'
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin'],
    default: 'admin'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  addedBy: {
    type: String,
    default: 'system'
  }
}, { timestamps: true });

// Virtual to match frontend expectations
AuthorizedAdminSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
AuthorizedAdminSchema.set('toJSON', { virtuals: true });
AuthorizedAdminSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.AuthorizedAdmin || mongoose.model('AuthorizedAdmin', AuthorizedAdminSchema);
