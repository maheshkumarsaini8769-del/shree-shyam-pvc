const connectDB = require('../config/db');
const Booking = require('../models/Booking');

const generateBookingId = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `SSPI-${num}`;
};

const createBooking = async (req, res) => {
  try {
    await connectDB();
    const {
      name,
      phone,
      serviceId,
      serviceName,
      preferredDate,
      preferredTime,
      city,
      area,
      address,
      landmark,
      pincode,
      message
    } = req.body;

    if (!name || !phone || !serviceName || !preferredDate || !preferredTime) {
      return res.status(400).json({ message: 'Name, mobile phone, service, date, and time slot are required' });
    }

    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number' });
    }

    const bookingId = generateBookingId();
    const customerId = req.user ? req.user.id : null;

    const newBooking = await Booking.create({
      bookingId,
      customerId,
      name: name.trim(),
      phone: phone.trim(),
      serviceId: serviceId || '',
      serviceName: serviceName.trim(),
      preferredDate,
      preferredTime,
      city: city || 'Ahmedabad',
      area: area || 'Vastral',
      address: address ? address.trim() : '',
      landmark: landmark ? landmark.trim() : '',
      pincode: pincode ? pincode.trim() : '382418',
      message: message ? message.trim() : '',
      status: 'Pending',
      adminNotes: '',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date(),
          note: 'Booking request received online'
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Booking request created successfully',
      booking: newBooking
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing booking request', error: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();

    const booking = await Booking.findOne({
      $or: [
        { bookingId: cleanId },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ].filter(Boolean)
    });

    if (!booking) {
      return res.status(404).json({ message: `No booking found for reference ID ${id}` });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving booking', error: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    await connectDB();
    const phone = req.query.phone;
    const userId = req.user ? req.user.id : null;

    let filter = {};
    if (userId) {
      filter.customerId = userId;
    } else if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      filter.phone = new RegExp(cleanPhone, 'i');
    }

    const userBookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(userBookings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings', error: err.message });
  }
};

// Admin Endpoints
const getAllBookings = async (req, res) => {
  try {
    await connectDB();
    const { status, service, date, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (service && service !== 'all') {
      filter.serviceName = new RegExp(service, 'i');
    }

    if (date) {
      filter.preferredDate = date;
    }

    if (search) {
      const q = new RegExp(search.trim(), 'i');
      filter.$or = [
        { bookingId: q },
        { name: q },
        { phone: q },
        { area: q }
      ];
    }

    const list = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const booking = await Booking.findOne({
      $or: [
        { bookingId: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ].filter(Boolean)
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status) {
      booking.status = status;
      booking.statusHistory.push({
        status,
        timestamp: new Date(),
        note: adminNotes || `Status updated to ${status}`
      });
    }

    if (adminNotes !== undefined) {
      booking.adminNotes = adminNotes;
    }

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const deleted = await Booking.findOneAndDelete({
      $or: [
        { bookingId: id },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ].filter(Boolean)
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking deleted permanently' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
};
