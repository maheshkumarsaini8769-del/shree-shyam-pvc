const connectDB = require('../config/db');
const Faq = require('../models/Faq');

const getAllFaqs = async (req, res) => {
  try {
    await connectDB();
    const { category } = req.query;
    const filter = {};
    if (category && category.toLowerCase() !== 'all') {
      filter.category = category;
    }
    const items = await Faq.find(filter).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving faqs', error: err.message });
  }
};

const createFaq = async (req, res) => {
  try {
    await connectDB();
    const { question, answer, category, order } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const newFaq = await Faq.create({
      question,
      answer,
      category: category || 'General',
      order: Number(order) || 0
    });

    res.status(201).json(newFaq);
  } catch (err) {
    res.status(500).json({ message: 'Error creating FAQ', error: err.message });
  }
};

const updateFaq = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const updated = await Faq.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating FAQ', error: err.message });
  }
};

const deleteFaq = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const deleted = await Faq.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting FAQ', error: err.message });
  }
};

module.exports = {
  getAllFaqs,
  getActiveFaqs: getAllFaqs,
  getAllFaqsAdmin: getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq
};
