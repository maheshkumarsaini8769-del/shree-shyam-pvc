const store = require('../config/store');

const faqs = store.getCollection('faqs');

const getActiveFaqs = (req, res) => {
  const { category } = req.query;
  let list = faqs.find(f => f.active !== false);
  if (category && category.toLowerCase() !== 'all') {
    list = list.filter(f => f.category && f.category.toLowerCase() === category.toLowerCase());
  }
  list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  res.json(list);
};

const getAllFaqsAdmin = (req, res) => {
  const list = faqs.find();
  list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  res.json(list);
};

const createFaq = (req, res) => {
  const { question, answer, category, active } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ message: 'Question and answer are required' });
  }

  const newFaq = faqs.create({
    question: question.trim(),
    answer: answer.trim(),
    category: category || 'General',
    active: active !== undefined ? active : true,
    sortOrder: faqs.countDocuments() + 1
  });

  res.status(201).json(newFaq);
};

const updateFaq = (req, res) => {
  const { id } = req.params;
  const updated = faqs.findByIdAndUpdate(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'FAQ not found' });
  }
  res.json(updated);
};

const deleteFaq = (req, res) => {
  const { id } = req.params;
  const deleted = faqs.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'FAQ not found' });
  }
  res.json({ message: 'FAQ deleted' });
};

module.exports = {
  getActiveFaqs,
  getAllFaqsAdmin,
  createFaq,
  updateFaq,
  deleteFaq
};
