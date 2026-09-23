const store = require('../config/store');

const enquiries = store.getCollection('enquiries');
const notifications = store.getCollection('notifications');

const createEnquiry = (req, res) => {
  const { name, phone, service, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone number are required' });
  }

  const newEnquiry = enquiries.create({
    name: name.trim(),
    phone: phone.trim(),
    service: service || 'General Enquiry',
    message: message ? message.trim() : '',
    status: 'New', // New, Contacted, Follow-up, Converted, Closed
    notes: '',
    createdAt: new Date().toISOString()
  });

  notifications.create({
    type: 'enquiry',
    title: 'New Customer Enquiry',
    message: `${name} enquired regarding ${service || 'General Enquiry'}`,
    referenceId: newEnquiry.id,
    read: false
  });

  res.status(201).json({ success: true, message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.', enquiry: newEnquiry });
};

const getAllEnquiries = (req, res) => {
  const { status, search } = req.query;
  let list = enquiries.find();
  if (status && status !== 'all') {
    list = list.filter(e => e.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(e => 
      e.name.toLowerCase().includes(q) || 
      e.phone.toLowerCase().includes(q) || 
      (e.service && e.service.toLowerCase().includes(q))
    );
  }
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(list);
};

const updateEnquiryStatus = (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const updates = {};
  if (status) updates.status = status;
  if (notes !== undefined) updates.notes = notes;

  const updated = enquiries.findByIdAndUpdate(id, updates);
  if (!updated) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }
  res.json(updated);
};

const deleteEnquiry = (req, res) => {
  const { id } = req.params;
  const deleted = enquiries.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }
  res.json({ message: 'Enquiry removed' });
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
};
