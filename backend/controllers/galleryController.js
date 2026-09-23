const store = require('../config/store');

const gallery = store.getCollection('gallery');

const getAllGallery = (req, res) => {
  const { category } = req.query;
  let items = gallery.find();
  if (category && category.toLowerCase() !== 'all') {
    items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }
  items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  res.json(items);
};

const createGalleryItem = (req, res) => {
  const { title, category, serviceId, imageKey, url, altText, featured } = req.body;
  if (!title || !category) {
    return res.status(400).json({ message: 'Title and category are required' });
  }

  const newItem = gallery.create({
    title,
    category,
    serviceId: serviceId || '',
    imageKey: imageKey || 'kitchen',
    url: url || '',
    altText: altText || title,
    featured: !!featured,
    sortOrder: gallery.countDocuments() + 1
  });

  res.status(201).json(newItem);
};

const updateGalleryItem = (req, res) => {
  const { id } = req.params;
  const updated = gallery.findByIdAndUpdate(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }
  res.json(updated);
};

const deleteGalleryItem = (req, res) => {
  const { id } = req.params;
  const deleted = gallery.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }
  res.json({ message: 'Gallery item deleted successfully' });
};

module.exports = {
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
