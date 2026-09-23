const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    default: 'General Enquiry'
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'],
    default: 'New'
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

EnquirySchema.virtual('id').get(function() {
  return this._id.toHexString();
});
EnquirySchema.set('toJSON', { virtuals: true });
EnquirySchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
