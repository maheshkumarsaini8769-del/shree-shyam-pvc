const connectDB = require('../config/db');
const Gallery = require('../models/Gallery');

const getAllGallery = async (req, res) => {
  try {
    await connectDB();
    const { category } = req.query;
    const filter = {};
    if (category && category.toLowerCase() !== 'all') {
      filter.category = category;
    }
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving gallery', error: err.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    await connectDB();
    const { title, category, imageUrl, featured, tags } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: 'Title and category are required' });
    }

    const newItem = await Gallery.create({
      title,
      category,
      imageUrl: imageUrl || '',
      featured: !!featured,
      tags: Array.isArray(tags) ? tags : []
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating gallery item', error: err.message });
  }
};

const updateGalleryItem = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const updated = await Gallery.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating gallery item', error: err.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting gallery item', error: err.message });
  }
};

module.exports = {
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
