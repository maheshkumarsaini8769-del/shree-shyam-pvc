const connectDB = require('../config/db');
const Review = require('../models/Review');

const getApprovedReviews = async (req, res) => {
  try {
    await connectDB();
    const list = await Review.find({ status: { $ne: 'Rejected' } }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reviews', error: err.message });
  }
};

const submitReview = async (req, res) => {
  try {
    await connectDB();
    const { customerName, rating, reviewText, serviceUsed, location } = req.body;
    if (!customerName || !rating || !reviewText) {
      return res.status(400).json({ message: 'Name, star rating, and review text are required' });
    }

    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const newReview = await Review.create({
      customerName: customerName.trim(),
      rating: numRating,
      reviewText: reviewText.trim(),
      serviceUsed: serviceUsed || 'Custom PVC Interior',
      location: location || 'Ahmedabad',
      status: 'Approved' // Auto-approved so everyone can immediately see public feedback
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Your review is now published.',
      review: newReview
    });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting review', error: err.message });
  }
};

const getAllReviewsAdmin = async (req, res) => {
  try {
    await connectDB();
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    const list = await Review.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews for admin', error: err.message });
  }
};

const updateReviewStatus = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const { status } = req.body;
    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await Review.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review status', error: err.message });
  }
};

// Admin official reply to a review
const replyToReview = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText || !replyText.trim()) {
      return res.status(400).json({ message: 'Reply text cannot be empty' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.adminReply = {
      text: replyText.trim(),
      repliedAt: new Date(),
      repliedBy: req.user ? req.user.name : 'Shree Shyam PVC Team'
    };

    await review.save();
    res.json({ success: true, message: 'Reply published successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error replying to review', error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review removed permanently' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};

module.exports = {
  getApprovedReviews,
  submitReview,
  getAllReviewsAdmin,
  updateReviewStatus,
  replyToReview,
  deleteReview
};
