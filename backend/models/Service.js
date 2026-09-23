const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  startingPrice: {
    type: Number,
    default: 0
  },
  priceUnit: {
    type: String,
    default: 'sq.ft'
  },
  features: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Active', 'Draft'],
    default: 'Active'
  }
}, { timestamps: true });

ServiceSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
ServiceSchema.set('toJSON', { virtuals: true });
ServiceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
