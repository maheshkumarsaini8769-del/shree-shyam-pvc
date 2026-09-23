const connectDB = require('../config/db');
const Service = require('../models/Service');

const getAllServices = async (req, res) => {
  try {
    await connectDB();
    const list = await Service.find({ status: 'Active' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving services', error: err.message });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    await connectDB();
    const { slug } = req.params;
    const service = await Service.findOne({
      $or: [
        { slug },
        { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }
      ].filter(Boolean)
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving service', error: err.message });
  }
};

// Admin endpoints
const getAllServicesAdmin = async (req, res) => {
  try {
    await connectDB();
    const list = await Service.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
};

const createService = async (req, res) => {
  try {
    await connectDB();
    const { name, shortDescription, description, startingPrice, priceUnit, features, image, status } = req.body;
    if (!name || !shortDescription) {
      return res.status(400).json({ message: 'Name and short description are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newService = await Service.create({
      slug,
      name,
      shortDescription,
      description: description || shortDescription,
      startingPrice: Number(startingPrice) || 0,
      priceUnit: priceUnit || 'sq.ft',
      features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : []),
      image: image || '',
      status: status || 'Active'
    });

    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: 'Error creating service', error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating service', error: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service', error: err.message });
  }
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService
};
