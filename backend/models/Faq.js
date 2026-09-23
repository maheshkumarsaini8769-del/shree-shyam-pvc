const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

FaqSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
FaqSchema.set('toJSON', { virtuals: true });
FaqSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
