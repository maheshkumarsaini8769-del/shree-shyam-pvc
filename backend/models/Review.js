const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true,
    trim: true
  },
  serviceUsed: {
    type: String,
    default: 'Custom PVC Interior'
  },
  location: {
    type: String,
    default: 'Ahmedabad'
  },
  status: {
    type: String,
    enum: ['Approved', 'Pending', 'Rejected'],
    default: 'Approved'
  },
  adminReply: {
    text: {
      type: String,
      default: ''
    },
    repliedAt: {
      type: Date,
      default: null
    },
    repliedBy: {
      type: String,
      default: 'Shree Shyam PVC Team'
    }
  }
}, { timestamps: true });

ReviewSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
ReviewSchema.set('toJSON', { virtuals: true });
ReviewSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
