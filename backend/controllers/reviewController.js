const store = require('../config/store');

const reviews = store.getCollection('reviews');

const getApprovedReviews = (req, res) => {
  const list = reviews.find(r => r.status !== 'Rejected');
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(list);
};

const submitReview = (req, res) => {
  const { customerName, rating, reviewText, serviceUsed } = req.body;
  if (!customerName || !rating || !reviewText) {
    return res.status(400).json({ message: 'Name, star rating, and review text are required' });
  }

  const numRating = parseInt(rating, 10);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  const newReview = reviews.create({
    customerName: customerName.trim(),
    rating: numRating,
    reviewText: reviewText.trim(),
    serviceUsed: serviceUsed || 'Custom PVC Interior',
    status: 'Approved', // Auto-approved so everyone can see customer reviews
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback! Your review will be published upon moderation.',
    review: newReview
  });
};

const getAllReviewsAdmin = (req, res) => {
  const { status } = req.query;
  let list = reviews.find();
  if (status && status !== 'all') {
    list = list.filter(r => r.status.toLowerCase() === status.toLowerCase());
  }
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(list);
};

const updateReviewStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Approved', 'Rejected', 'Pending'
  if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const updated = reviews.findByIdAndUpdate(id, { status });
  if (!updated) {
    return res.status(404).json({ message: 'Review not found' });
  }
  res.json(updated);
};

const deleteReview = (req, res) => {
  const { id } = req.params;
  const deleted = reviews.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Review not found' });
  }
  res.json({ message: 'Review removed' });
};

module.exports = {
  getApprovedReviews,
  submitReview,
  getAllReviewsAdmin,
  updateReviewStatus,
  deleteReview
};
