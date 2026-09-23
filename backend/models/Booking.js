const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  customerId: {
    type: String,
    default: null
  },
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
  serviceId: {
    type: String,
    default: ''
  },
  serviceName: {
    type: String,
    required: true
  },
  preferredDate: {
    type: String,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: 'Ahmedabad'
  },
  area: {
    type: String,
    default: 'Vastral'
  },
  address: {
    type: String,
    default: ''
  },
  landmark: {
    type: String,
    default: ''
  },
  pincode: {
    type: String,
    default: '382418'
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  statusHistory: [
    {
      status: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      note: String
    }
  ]
}, { timestamps: true });

BookingSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
BookingSchema.set('toJSON', { virtuals: true });
BookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
