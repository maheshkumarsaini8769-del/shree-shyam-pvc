const store = require('../config/store');

const bookings = store.getCollection('bookings');
const notifications = store.getCollection('notifications');

const generateBookingId = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `SSPI-${num}`;
};

const createBooking = async (req, res) => {
  try {
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
      latitude,
      longitude,
      message
    } = req.body;

    if (!name || !phone || !serviceName || !preferredDate || !preferredTime) {
      return res.status(400).json({ message: 'Name, mobile phone, service, date, and time slot are required' });
    }

    // Phone validation (accepts 10 digits or with +91)
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number' });
    }

    const bookingId = generateBookingId();
    const customerId = req.user ? req.user.id : null;

    const newBooking = bookings.create({
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
      latitude: latitude || null,
      longitude: longitude || null,
      message: message ? message.trim() : '',
      status: 'Pending',
      adminNotes: '',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date().toISOString(),
          note: 'Booking request received online'
        }
      ]
    });

    // Notify Admin
    notifications.create({
      type: 'booking',
      title: 'New Site Visit Request',
      message: `${name} requested a visit for ${serviceName} on ${preferredDate}`,
      referenceId: bookingId,
      read: false
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
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();

    const booking = bookings.findOne(b => 
      b.bookingId === cleanId || 
      b.id === id || 
      b._id === id
    );

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
    const phone = req.query.phone;
    const userId = req.user ? req.user.id : null;

    let userBookings = [];
    if (userId) {
      userBookings = bookings.find(b => b.customerId === userId);
    } else if (phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      userBookings = bookings.find(b => b.phone.replace(/[^0-9]/g, '').includes(cleanPhone));
    }

    res.json(userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings', error: err.message });
  }
};

// Admin Endpoints
const getAllBookings = async (req, res) => {
  try {
    const { status, service, date, search } = req.query;
    let list = bookings.find();

    if (status && status !== 'all') {
      list = list.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }

    if (service && service !== 'all') {
      list = list.filter(b => b.serviceName.toLowerCase().includes(service.toLowerCase()));
    }

    if (date) {
      list = list.filter(b => b.preferredDate === date);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(b => 
        b.bookingId.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        (b.area && b.area.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, scheduledDate, scheduledTime } = req.body;

    const booking = bookings.findById(id) || bookings.findOne(b => b.bookingId === id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const updates = {};
    if (status) {
      updates.status = status;
      const history = booking.statusHistory || [];
      history.push({
        status,
        timestamp: new Date().toISOString(),
        note: adminNotes || `Status updated to ${status}`
      });
      updates.statusHistory = history;
    }

    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }

    if (scheduledDate) updates.scheduledDate = scheduledDate;
    if (scheduledTime) updates.scheduledTime = scheduledTime;

    const updated = bookings.findByIdAndUpdate(booking.id, updates);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getMyBookings,
  getAllBookings,
  updateBookingStatus
};
