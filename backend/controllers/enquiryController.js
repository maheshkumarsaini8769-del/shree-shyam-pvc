const connectDB = require('../config/db');
const Enquiry = require('../models/Enquiry');

const createEnquiry = async (req, res) => {
  try {
    await connectDB();
    const { name, phone, service, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone number are required' });
    }

    const newEnquiry = await Enquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      service: service || 'General Enquiry',
      message: message ? message.trim() : '',
      status: 'New',
      notes: ''
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      enquiry: newEnquiry
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing enquiry', error: err.message });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    await connectDB();
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const q = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: q },
        { phone: q },
        { service: q }
      ];
    }

    const list = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enquiries', error: err.message });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const { status, notes } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const updated = await Enquiry.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating enquiry', error: err.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Enquiry removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting enquiry', error: err.message });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
};
