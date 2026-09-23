const store = require('../config/store');

const bookingsCollection = store.getCollection('bookings');
const enquiriesCollection = store.getCollection('enquiries');
const servicesCollection = store.getCollection('services');
const notificationsCollection = store.getCollection('notifications');

const getDashboardStats = (req, res) => {
  const bookings = bookingsCollection.find();
  const enquiries = enquiriesCollection.find();

  const totalBookings = bookings.length;
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const siteVisits = bookings.filter(b => b.status === 'Site Visit Scheduled').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const cancelled = bookings.filter(b => b.status === 'Cancelled').length;

  const newEnquiries = enquiries.filter(e => e.status === 'New').length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysVisits = bookings.filter(b => b.preferredDate === todayStr || b.scheduledDate === todayStr).length;

  // Status breakdown
  const statusCounts = {
    Pending: pending,
    Confirmed: confirmed,
    'Site Visit Scheduled': siteVisits,
    'In Discussion': bookings.filter(b => b.status === 'In Discussion').length,
    'Work Started': bookings.filter(b => b.status === 'Work Started').length,
    Completed: completed,
    Cancelled: cancelled
  };

  // Recent 5 bookings
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Recent 5 enquiries
  const recentEnquiries = [...enquiries]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  res.json({
    metrics: {
      totalBookings,
      pending,
      confirmed,
      siteVisits,
      completed,
      cancelled,
      newEnquiries,
      todaysVisits
    },
    statusCounts,
    recentBookings,
    recentEnquiries
  });
};

const getNotifications = (req, res) => {
  const list = notificationsCollection.find();
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(list);
};

const markNotificationRead = (req, res) => {
  const { id } = req.params;
  const updated = notificationsCollection.findByIdAndUpdate(id, { read: true });
  res.json(updated || { success: true });
};

module.exports = {
  getDashboardStats,
  getNotifications,
  markNotificationRead
};
