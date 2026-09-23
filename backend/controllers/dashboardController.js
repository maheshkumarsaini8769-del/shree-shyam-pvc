const connectDB = require('../config/db');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');
const Review = require('../models/Review');
const AuthorizedAdmin = require('../models/AuthorizedAdmin');

const getDashboardStats = async (req, res) => {
  try {
    await connectDB();
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalEnquiries,
      newEnquiries,
      totalReviews,
      approvedReviews,
      totalAdmins,
      recentBookings,
      recentReviews
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'Pending' }),
      Booking.countDocuments({ status: 'Confirmed' }),
      Booking.countDocuments({ status: 'Completed' }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Review.countDocuments(),
      Review.countDocuments({ status: 'Approved' }),
      AuthorizedAdmin.countDocuments({ status: 'active' }),
      Booking.find().sort({ createdAt: -1 }).limit(5),
      Review.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Average rating
    const reviews = await Review.find({ status: 'Approved' }).select('rating');
    const avgRating = reviews.length > 0 
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
      : '5.0';

    res.json({
      metrics: {
        totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        totalEnquiries,
        newEnquiries,
        totalReviews,
        approvedReviews,
        totalAdmins,
        avgRating
      },
      recentBookings,
      recentReviews
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving dashboard stats', error: err.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    await connectDB();
    // Return newest pending bookings and new enquiries as notifications
    const [pendingBookings, newEnquiries] = await Promise.all([
      Booking.find({ status: 'Pending' }).sort({ createdAt: -1 }).limit(5),
      Enquiry.find({ status: 'New' }).sort({ createdAt: -1 }).limit(5)
    ]);

    const notifs = [
      ...pendingBookings.map(b => ({
        id: b._id,
        title: 'New Site Visit Request',
        message: `${b.name} (${b.phone}) booked ${b.serviceName}`,
        date: b.createdAt,
        type: 'booking'
      })),
      ...newEnquiries.map(e => ({
        id: e._id,
        title: 'New Website Enquiry',
        message: `${e.name} enquired about ${e.service}`,
        date: e.createdAt,
        type: 'enquiry'
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(notifs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

const markNotificationRead = (req, res) => {
  res.json({ success: true });
};

module.exports = {
  getDashboardStats,
  getNotifications,
  markNotificationRead
};
