const store = require('../config/store');

const services = store.getCollection('services');

const getAllServices = (req, res) => {
  const list = services.find().filter(s => s.active !== false);
  list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  res.json(list);
};

const getServiceBySlug = (req, res) => {
  const { slug } = req.params;
  const service = services.findOne(s => s.slug === slug || s.id === slug);
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service);
};

// Admin endpoints
const getAllServicesAdmin = (req, res) => {
  const list = services.find();
  list.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  res.json(list);
};

const createService = (req, res) => {
  const { title, category, shortDescription, fullDescription, features, availableDesigns, imageKey, active } = req.body;
  if (!title || !category || !shortDescription) {
    return res.status(400).json({ message: 'Title, category, and short description are required' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newService = services.create({
    slug,
    title,
    category,
    shortDescription,
    fullDescription: fullDescription || shortDescription,
    features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : []),
    availableDesigns: Array.isArray(availableDesigns) ? availableDesigns : [],
    imageKey: imageKey || 'kitchen',
    active: active !== undefined ? active : true,
    sortOrder: services.countDocuments() + 1
  });

  res.status(201).json(newService);
};

const updateService = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = services.findByIdAndUpdate(id, updates);
  if (!updated) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(updated);
};

const deleteService = (req, res) => {
  const { id } = req.params;
  const deleted = services.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json({ message: 'Service deleted successfully' });
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService
};
