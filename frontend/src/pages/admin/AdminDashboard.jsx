import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Megaphone,
  PhoneCall,
  Info,
  CalendarCheck,
  Star,
  Layers,
  KeyRound,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Plus,
  Trash2,
  Reply,
  ExternalLink,
  MessageCircle,
  Save,
  RefreshCw,
  Eye,
  Shield,
  UserCheck,
  Building,
  MapPin,
  Sparkles,
  Check,
  X,
  Wrench,
  HelpCircle,
  Inbox,
  Menu,
  ChevronRight,
  Edit2,
  Camera,
  Calculator,
  Receipt,
  Download,
  Upload,
  Printer,
  Share2,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { exportToCSV, compressImageFile } from '../../utils/exportHelpers';
import logoImg from '../../assets/logo.jpg';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { refreshSettings } = useSettings();

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // 1. Overview & Stats
  const [stats, setStats] = useState(null);

  // 2. Settings CMS State
  const [settingsData, setSettingsData] = useState({
    businessName: '',
    tagline: '',
    profileBrand: '',
    primaryPhone: '',
    secondaryPhone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    workingHours: '',
    googleMapsUrl: '',
    googleReviewUrl: '',
    announcementText: '',
    announcementActive: true,
    emergencyNotice: '',
    heroBadgeText: '',
    heroHeading: '',
    heroSubheading: '',
    heroCtaPrimary: '',
    heroCtaSecondary: '',
    pricingCalculator: {
      tvUnitRate: 480,
      wardrobeRate: 520,
      kitchenRate: 550,
      fullHomeRate: 500
    },
    serviceLocations: [],
    gstNumber: '',
    footerCopyright: '',
    aboutHeading: '',
    aboutSubheading: '',
    aboutStory: '',
    missionStatement: '',
    visionStatement: '',
    yearsExperience: 12,
    completedProjects: 450,
    happyClients: 380,
    warrantyYears: 10,
    materialsDescription: '',
    socialChannels: {
      instagram: '',
      facebook: '',
      youtube: '',
      whatsapp: '',
      linkedin: '',
      twitter: ''
    },
    availableBrands: [],
    guaranteeDetails: ''
  });

  // 3. Bookings
  const [bookings, setBookings] = useState([]);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [bookingSearch, setBookingSearch] = useState('');

  // 4. Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [activeReviewForReply, setActiveReviewForReply] = useState(null);
  const [replyText, setReplyText] = useState('');

  // 5. Email Authority Whitelist
  const [authorities, setAuthorities] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('admin');
  const [passwordChangeId, setPasswordChangeId] = useState(null);
  const [newPasswordVal, setNewPasswordVal] = useState('');

  // 6. Services State
  const [services, setServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('480');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  // 7. Enquiries State
  const [enquiries, setEnquiries] = useState([]);
  const [enquiryFilter, setEnquiryFilter] = useState('all');

  // 8. FAQs State
  const [faqs, setFaqs] = useState([]);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState('Materials & Durability');

  // 9. Gallery State
  const [gallery, setGallery] = useState([]);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('TV Unit');
  const [newGalleryImageUrl, setNewGalleryImageUrl] = useState('');
  const [newGalleryDescription, setNewGalleryDescription] = useState('');

  // 10. Brand & Location Inputs
  const [newBrandInput, setNewBrandInput] = useState('');
  const [newLocationInput, setNewLocationInput] = useState('');
  const [galleryUploading, setGalleryUploading] = useState(false);

  // 11. Quotation & Bill Maker State
  const [quotationData, setQuotationData] = useState({
    invoiceNumber: `SSP-QT-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().slice(0, 10),
    clientName: '',
    clientPhone: '',
    siteAddress: '',
    projectType: 'PVC Modular Kitchen & Interior',
    items: [
      { id: 1, title: 'KAKA PVC Modular Kitchen Bottom Units', finish: 'High Gloss Acrylic', dimensions: '12 ft x 8 ft', sqft: 96, rate: 550, total: 52800 },
      { id: 2, title: 'Designer TV Unit Wall with Acoustic Louvers', finish: 'Teak Louver + Gold Profile', dimensions: '9 ft x 6 ft', sqft: 54, rate: 480, total: 25920 }
    ],
    discount: 0,
    gstPercent: 0,
    advancePaid: 0,
    notes: '100% Waterproof, 100% Termite-Proof Genuine Virgin PVC Profile. 10 Years Replacement Guarantee. Free Laser Measurement included.'
  });

  // Load all initial admin data
  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, settingsRes, bookingsRes, reviewsRes, authRes, servicesRes, enquiriesRes, faqsRes, galleryRes] = await Promise.all([
        api.adminGetDashboardStats().catch(() => null),
        api.getSettings().catch(() => ({})),
        api.adminGetBookings().catch(() => []),
        api.adminGetReviews().catch(() => []),
        api.adminGetEmailAuthorities().catch(() => []),
        api.adminGetServices().catch(() => []),
        api.adminGetEnquiries().catch(() => []),
        api.adminGetFaqs().catch(() => []),
        api.getGallery().catch(() => [])
      ]);

      if (statsRes) setStats(statsRes);
      if (settingsRes) {
        setSettingsData(prev => ({
          ...prev,
          ...settingsRes,
          pricingCalculator: {
            ...prev.pricingCalculator,
            ...(settingsRes.pricingCalculator || {})
          },
          serviceLocations: settingsRes.serviceLocations || prev.serviceLocations || [],
          socialChannels: {
            ...prev.socialChannels,
            ...(settingsRes.socialChannels || {})
          },
          availableBrands: settingsRes.availableBrands || prev.availableBrands
        }));
      }
      if (Array.isArray(bookingsRes)) setBookings(bookingsRes);
      if (Array.isArray(reviewsRes)) setReviews(reviewsRes);
      if (Array.isArray(authRes)) setAuthorities(authRes);
      if (Array.isArray(servicesRes)) setServices(servicesRes);
      if (Array.isArray(enquiriesRes)) setEnquiries(enquiriesRes);
      if (Array.isArray(faqsRes)) setFaqs(faqsRes);
      if (Array.isArray(galleryRes)) setGallery(galleryRes);
    } catch (err) {
      console.error('Error loading dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg, isErr = false) => {
    if (isErr) {
      setSaveError(msg);
      setTimeout(() => setSaveError(''), 4000);
    } else {
      setSaveSuccess(msg);
      setTimeout(() => setSaveSuccess(''), 4000);
    }
  };

  // Save Settings CMS
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    try {
      await api.adminUpdateSettings(settingsData);
      await refreshSettings();
      showNotification('Settings saved to MongoDB successfully!');
    } catch (err) {
      showNotification(err.message || 'Error updating settings', true);
    }
  };

  // Booking status update
  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await api.adminUpdateBookingStatus(id, { status: newStatus });
      setBookings(prev => prev.map(b => (b.id === id || b.bookingId === id ? { ...b, status: newStatus } : b)));
      showNotification(`Booking status updated to ${newStatus}`);
    } catch (err) {
      showNotification(err.message || 'Error updating status', true);
    }
  };

  // Booking delete
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this booking permanently?')) return;
    try {
      await api.adminDeleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id && b.bookingId !== id));
      showNotification('Booking deleted permanently');
    } catch (err) {
      showNotification(err.message || 'Error deleting booking', true);
    }
  };

  // Review status update
  const handleUpdateReviewStatus = async (id, newStatus) => {
    try {
      await api.adminUpdateReview(id, { status: newStatus });
      setReviews(prev => prev.map(r => (r.id === id || r._id === id ? { ...r, status: newStatus } : r)));
      showNotification(`Review status set to ${newStatus}`);
    } catch (err) {
      showNotification(err.message || 'Error updating review', true);
    }
  };

  // Review Reply Submit
  const handleReplyReviewSubmit = async (e) => {
    e.preventDefault();
    if (!activeReviewForReply || !replyText.trim()) return;

    try {
      const res = await api.adminReplyReview(activeReviewForReply.id || activeReviewForReply._id, replyText);
      setReviews(prev => prev.map(r => (r.id === activeReviewForReply.id || r._id === activeReviewForReply._id ? res.review : r)));
      setReplyModalOpen(false);
      setReplyText('');
      setActiveReviewForReply(null);
      showNotification('Official response published live on website!');
    } catch (err) {
      showNotification(err.message || 'Error publishing reply', true);
    }
  };

  // Review Delete
  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this customer review permanently?')) return;
    try {
      await api.adminDeleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id && r._id !== id));
      showNotification('Review deleted permanently');
    } catch (err) {
      showNotification(err.message || 'Error deleting review', true);
    }
  };

  // Service Management
  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;
    try {
      const created = await api.adminCreateService({
        name: newServiceName.trim(),
        startingPrice: Number(newServicePrice) || 450,
        shortDescription: newServiceDesc.trim() || 'Custom PVC Interior service with 10-year warranty.',
        status: 'Active'
      });
      setServices(prev => [created, ...prev]);
      setNewServiceName('');
      setNewServiceDesc('');
      showNotification('New PVC service created successfully!');
    } catch (err) {
      showNotification(err.message || 'Error creating service', true);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.adminDeleteService(id);
      setServices(prev => prev.filter(s => s.id !== id && s._id !== id));
      showNotification('Service removed');
    } catch (err) {
      showNotification(err.message || 'Error deleting service', true);
    }
  };

  // Enquiry status
  const handleUpdateEnquiryStatus = async (id, newStatus) => {
    try {
      await api.adminUpdateEnquiry(id, { status: newStatus });
      setEnquiries(prev => prev.map(e => (e.id === id || e._id === id ? { ...e, status: newStatus } : e)));
      showNotification(`Enquiry marked as ${newStatus}`);
    } catch (err) {
      showNotification(err.message || 'Error updating enquiry', true);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await api.adminDeleteEnquiry(id);
      setEnquiries(prev => prev.filter(e => e.id !== id && e._id !== id));
      showNotification('Enquiry removed');
    } catch (err) {
      showNotification(err.message || 'Error deleting enquiry', true);
    }
  };

  // FAQ Management
  const handleCreateFaq = async (e) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    try {
      const created = await api.adminCreateFaq({
        question: newFaqQuestion.trim(),
        answer: newFaqAnswer.trim(),
        category: newFaqCategory
      });
      setFaqs(prev => [...prev, created]);
      setNewFaqQuestion('');
      setNewFaqAnswer('');
      showNotification('New FAQ added successfully!');
    } catch (err) {
      showNotification(err.message || 'Error adding FAQ', true);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      await api.adminDeleteFaq(id);
      setFaqs(prev => prev.filter(f => f.id !== id && f._id !== id));
      showNotification('FAQ deleted');
    } catch (err) {
      showNotification(err.message || 'Error deleting FAQ', true);
    }
  };

  // Email Authority: Add new authorized admin email with password
  const handleAddAuthority = async (e) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminPassword) return;

    try {
      const res = await api.adminAddEmailAuthority({
        email: newAdminEmail.trim().toLowerCase(),
        name: newAdminName.trim() || 'Admin',
        password: newAdminPassword,
        role: newAdminRole
      });

      setAuthorities(prev => [res.admin, ...prev]);
      setNewAdminEmail('');
      setNewAdminName('');
      setNewAdminPassword('');
      showNotification(`Authorized admin ${res.admin.email} added! They can now log in.`);
    } catch (err) {
      showNotification(err.message || 'Error adding authorized email', true);
    }
  };

  // Email Authority: Change password
  const handleUpdatePassword = async (id) => {
    if (!newPasswordVal || newPasswordVal.length < 5) {
      alert('Password must be at least 5 characters');
      return;
    }
    try {
      await api.adminUpdateEmailAuthority(id, { newPassword: newPasswordVal });
      setPasswordChangeId(null);
      setNewPasswordVal('');
      showNotification('Password updated for this admin!');
    } catch (err) {
      showNotification(err.message || 'Error updating password', true);
    }
  };

  const handleToggleAdminStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await api.adminUpdateEmailAuthority(id, { status: nextStatus });
      setAuthorities(prev => prev.map(a => (a.id === id || a._id === id ? { ...a, status: nextStatus } : a)));
      showNotification(`Admin status changed to ${nextStatus}`);
    } catch (err) {
      showNotification(err.message || 'Error toggling status', true);
    }
  };

  const handleDeleteAuthority = async (id, email) => {
    if (email === 'maheshkumarsaini8769@gmail.com') {
      alert('Primary superadmin cannot be deleted.');
      return;
    }
    if (!window.confirm(`Revoke admin access for ${email}?`)) return;

    try {
      await api.adminDeleteEmailAuthority(id);
      setAuthorities(prev => prev.filter(a => a.id !== id && a._id !== id));
      showNotification(`Revoked access for ${email}`);
    } catch (err) {
      showNotification(err.message || 'Error deleting authority', true);
    }
  };

  // Brand Management
  const handleAddBrand = () => {
    if (!newBrandInput.trim()) return;
    if (settingsData.availableBrands.includes(newBrandInput.trim())) return;
    setSettingsData(prev => ({
      ...prev,
      availableBrands: [...prev.availableBrands, newBrandInput.trim()]
    }));
    setNewBrandInput('');
  };

  const handleRemoveBrand = (brandToRemove) => {
    setSettingsData(prev => ({
      ...prev,
      availableBrands: prev.availableBrands.filter(b => b !== brandToRemove)
    }));
  };

  // Gallery Management Handlers
  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle.trim() || !newGalleryImageUrl.trim()) {
      showNotification('Title and Image URL are required', true);
      return;
    }
    try {
      const created = await api.adminCreateGalleryItem({
        title: newGalleryTitle.trim(),
        category: newGalleryCategory,
        imageUrl: newGalleryImageUrl.trim(),
        description: newGalleryDescription.trim(),
        isRealWork: true,
        tag: 'On-Site Installation'
      });
      setGallery(prev => [created, ...prev]);
      setNewGalleryTitle('');
      setNewGalleryImageUrl('');
      setNewGalleryDescription('');
      showNotification('Project photo added to Live Gallery!');
    } catch (err) {
      showNotification(err.message || 'Error adding project photo', true);
    }
  };

  const handleDeleteGalleryItem = async (id, title) => {
    if (!window.confirm(`Delete "${title}" from Gallery?`)) return;
    try {
      await api.adminDeleteGalleryItem(id);
      setGallery(prev => prev.filter(g => g.id !== id && g._id !== id));
      showNotification('Project photo removed from Gallery!');
    } catch (err) {
      showNotification(err.message || 'Error deleting project photo', true);
    }
  };

  // Locations Handlers
  const handleAddLocation = () => {
    if (!newLocationInput.trim()) return;
    const currentLocs = settingsData.serviceLocations || [];
    if (currentLocs.includes(newLocationInput.trim())) return;
    setSettingsData(prev => ({
      ...prev,
      serviceLocations: [...currentLocs, newLocationInput.trim()]
    }));
    setNewLocationInput('');
  };

  const handleRemoveLocation = (locToRemove) => {
    setSettingsData(prev => ({
      ...prev,
      serviceLocations: (prev.serviceLocations || []).filter(l => l !== locToRemove)
    }));
  };

  // Gallery Direct Image Upload with Client-Side Canvas Compression
  const handleGalleryFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryUploading(true);
    try {
      const compressedBase64 = await compressImageFile(file, 1280, 0.82);
      setNewGalleryImageUrl(compressedBase64);
      showNotification('Photo compressed & attached successfully!');
    } catch (err) {
      showNotification(err.message || 'Error processing photo', true);
    } finally {
      setGalleryUploading(false);
      e.target.value = '';
    }
  };

  // CSV Exports for Bookings & Leads
  const handleExportBookingsCSV = () => {
    if (!bookings || !bookings.length) {
      showNotification('No bookings available to export', true);
      return;
    }
    const mapping = {
      bookingId: 'Booking ID',
      name: 'Customer Name',
      phone: 'Mobile Number',
      serviceName: 'Service',
      area: 'Area / Locality',
      address: 'Site Address',
      preferredDate: 'Visit Date',
      preferredTime: 'Visit Time',
      status: 'Status',
      createdAt: 'Booked On',
      message: 'Client Message'
    };
    exportToCSV('Shree_Shyam_PVC_Bookings', bookings, mapping);
    showNotification('Bookings exported to CSV successfully!');
  };

  const handleExportEnquiriesCSV = () => {
    if (!enquiries || !enquiries.length) {
      showNotification('No enquiries available to export', true);
      return;
    }
    const mapping = {
      id: 'Lead ID',
      name: 'Customer Name',
      phone: 'Phone Number',
      service: 'Service / Item',
      status: 'Lead Status',
      createdAt: 'Received Date',
      message: 'Requirements / Estimate Details'
    };
    exportToCSV('Shree_Shyam_PVC_Leads', enquiries, mapping);
    showNotification('Enquiries exported to CSV successfully!');
  };

  // Quotation & Bill Maker Calculations and Handlers
  const quotationSubtotal = (quotationData.items || []).reduce((sum, item) => sum + (Number(item.total) || 0), 0);
  const quotationDiscountAmount = Number(quotationData.discount) || 0;
  const quotationTaxable = Math.max(0, quotationSubtotal - quotationDiscountAmount);
  const quotationGstAmount = quotationData.gstPercent ? Math.round((quotationTaxable * Number(quotationData.gstPercent)) / 100) : 0;
  const quotationGrandTotal = quotationTaxable + quotationGstAmount;
  const quotationBalanceDue = Math.max(0, quotationGrandTotal - (Number(quotationData.advancePaid) || 0));

  const handleAddQuotationItem = (preset = null) => {
    const newItem = preset || {
      id: Date.now() + Math.random(),
      title: 'PVC Custom Unit',
      finish: 'KAKA PVC Profile',
      dimensions: '10 ft x 7 ft',
      sqft: 70,
      rate: 500,
      total: 35000
    };
    setQuotationData(prev => ({
      ...prev,
      items: [...prev.items, { ...newItem, id: Date.now() + Math.random() }]
    }));
  };

  const handleUpdateQuotationItem = (index, field, value) => {
    setQuotationData(prev => {
      const nextItems = [...prev.items];
      const item = { ...nextItems[index], [field]: value };
      if (field === 'sqft' || field === 'rate') {
        const sqftVal = Number(field === 'sqft' ? value : item.sqft) || 0;
        const rateVal = Number(field === 'rate' ? value : item.rate) || 0;
        item.total = sqftVal * rateVal;
      }
      nextItems[index] = item;
      return { ...prev, items: nextItems };
    });
  };

  const handleRemoveQuotationItem = (index) => {
    setQuotationData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleResetQuotation = () => {
    setQuotationData({
      invoiceNumber: `SSP-QT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().slice(0, 10),
      clientName: '',
      clientPhone: '',
      siteAddress: '',
      projectType: 'PVC Modular Kitchen & Interior',
      items: [
        { id: 1, title: 'KAKA PVC Modular Kitchen Bottom Units', finish: 'High Gloss Acrylic', dimensions: '12 ft x 8 ft', sqft: 96, rate: 550, total: 52800 },
        { id: 2, title: 'Designer TV Unit Wall with Acoustic Louvers', finish: 'Teak Louver + Gold Profile', dimensions: '9 ft x 6 ft', sqft: 54, rate: 480, total: 25920 }
      ],
      discount: 0,
      gstPercent: 0,
      advancePaid: 0,
      notes: '100% Waterproof, 100% Termite-Proof Genuine Virgin PVC Profile. 10 Years Replacement Guarantee. Free Laser Measurement included.'
    });
  };

  const handleSendQuotationWhatsApp = () => {
    if (!quotationData.clientPhone) {
      showNotification('Please enter client phone number first', true);
      return;
    }
    const cleanPhone = quotationData.clientPhone.replace(/[^0-9]/g, '');
    const phoneWithCode = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const itemsText = quotationData.items.map((it, idx) => 
      `${idx + 1}. *${it.title}* (${it.finish || 'KAKA PVC'})\n   📐 ${it.sqft} sqft @ ₹${it.rate}/sqft = *₹${(Number(it.total) || 0).toLocaleString('en-IN')}*`
    ).join('\n\n');

    const msg = 
`*ESTIMATE / QUOTATION — SHREE SHYAM PVC INTERIOR*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 *Quotation Ref:* ${quotationData.invoiceNumber}
📅 *Date:* ${quotationData.date}
👤 *Client Name:* ${quotationData.clientName || 'Valued Customer'}
📍 *Site Location:* ${quotationData.siteAddress || 'Ahmedabad'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
*ITEMIZED SPECIFICATIONS:*

${itemsText}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* ₹${quotationSubtotal.toLocaleString('en-IN')}
${quotationDiscountAmount > 0 ? `🏷️ *Discount:* -₹${quotationDiscountAmount.toLocaleString('en-IN')}\n` : ''}${quotationGstAmount > 0 ? `🧾 *GST (${quotationData.gstPercent}%):* +₹${quotationGstAmount.toLocaleString('en-IN')}\n` : ''}💵 *Grand Total:* *₹${quotationGrandTotal.toLocaleString('en-IN')}*
${quotationData.advancePaid > 0 ? `💳 *Advance Received:* ₹${Number(quotationData.advancePaid).toLocaleString('en-IN')}\n` : ''}⭐ *Balance Payable:* *₹${quotationBalanceDue.toLocaleString('en-IN')}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ *10 Years Guarantee:* 100% Waterproof & Termite-Proof KAKA PVC Profiles.
📍 *Workshop:* Yogeshwar Residency, Moti Canal Road, Vastral, Ahmedabad.
📞 *Contact:* +91 8209836370 / +91 9828448936`;

    window.open(`https://wa.me/${phoneWithCode}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('sspi_token');
    if (logout) logout();
    navigate('/admin/login', { replace: true });
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = bookingFilter === 'all' || b.status?.toLowerCase() === bookingFilter.toLowerCase();
    const q = bookingSearch.toLowerCase();
    const matchesSearch = !q || 
      b.name?.toLowerCase().includes(q) || 
      b.phone?.toLowerCase().includes(q) || 
      b.bookingId?.toLowerCase().includes(q) ||
      b.area?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const filteredReviews = reviews.filter(r => {
    if (reviewFilter === 'all') return true;
    return r.status?.toLowerCase() === reviewFilter.toLowerCase();
  });

  const filteredEnquiries = enquiries.filter(e => {
    if (enquiryFilter === 'all') return true;
    return e.status?.toLowerCase() === enquiryFilter.toLowerCase();
  });

  const filteredGallery = gallery.filter(g => {
    if (galleryCategoryFilter === 'All') return true;
    return g.category?.toLowerCase() === galleryCategoryFilter.toLowerCase();
  });

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'header', label: 'Header & Announcements', icon: Megaphone },
    { id: 'hero', label: 'Hero Section CMS', icon: Sparkles },
    { id: 'contact', label: 'Contact & Socials', icon: PhoneCall },
    { id: 'about', label: 'About Us CMS', icon: Info },
    { id: 'services', label: `Services (${services.length})`, icon: Wrench },
    { id: 'calculator', label: 'Pricing Calculator', icon: Calculator },
    { id: 'gallery', label: `Gallery & Works (${gallery.length})`, icon: Camera },
    { id: 'bookings', label: `Bookings (${bookings.length})`, icon: CalendarCheck },
    { id: 'quotations', label: 'Quotation & Bill Maker', icon: Receipt },
    { id: 'reviews', label: `Reviews & Replies (${reviews.length})`, icon: Star },
    { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Inbox },
    { id: 'faqs', label: `FAQs (${faqs.length})`, icon: HelpCircle },
    { id: 'locations', label: `Service Areas (${(settingsData.serviceLocations || []).length})`, icon: MapPin },
    { id: 'brands', label: 'PVC Brands & Materials', icon: Layers },
    { id: 'legal', label: 'Business & Legal', icon: Building },
    { id: 'authority', label: `Email Authority (${authorities.length})`, icon: KeyRound }
  ];

  return (
    <div className="min-h-screen bg-[#0F141E] text-stone-200 flex flex-col md:flex-row">
      {/* Toast Alerts */}
      {saveSuccess && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl bg-emerald-900/90 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}
      {saveError && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl bg-red-950/90 border border-red-500 text-red-200 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#141B28] border-b border-white/5 p-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1.5 ring-luxury-gold/60 shadow-md">
            <img src={logoImg} alt="Shree Shyam PVC Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xs text-white">Shree Shyam PVC</h2>
            <p className="text-[10px] text-luxury-gold font-mono truncate max-w-[170px]">{user?.email || 'Superadmin'}</p>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Horizontal Quick Navigation */}
      <div className="md:hidden bg-[#111722] border-b border-white/5 px-3 py-2 flex gap-1.5 overflow-x-auto scrollbar-none sticky top-[65px] z-30">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setMobileMenuOpen(false);
            }}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
              activeTab === item.id
                ? 'bg-luxury-gold text-obsidian shadow'
                : 'bg-white/5 text-stone-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className={`w-full md:w-72 bg-[#141B28] border-r border-white/5 flex flex-col shrink-0 ${
        mobileMenuOpen ? 'block' : 'hidden md:flex'
      }`}>
        <div className="p-4 border-b border-white/5 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-luxury-gold/70 shadow-lg shadow-luxury-gold/15">
              <img src={logoImg} alt="Shree Shyam PVC Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm text-white tracking-wide">Shree Shyam PVC</h2>
              <p className="text-[10px] text-luxury-gold font-mono font-bold tracking-wider uppercase">Admin Control Center</p>
            </div>
          </div>
        </div>

        {/* User identification */}
        <div className="px-5 py-3.5 bg-black/20 border-b border-white/5 flex items-center justify-between text-xs">
          <div className="truncate mr-2">
            <p className="text-stone-300 font-bold truncate">{user?.name || 'Mahesh Kumar Saini'}</p>
            <p className="text-[11px] text-luxury-gold truncate font-mono">{user?.email || 'maheshkumarsaini8769@gmail.com'}</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
            {user?.role || 'superadmin'}
          </span>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-luxury-gold text-obsidian shadow-md font-bold'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-obsidian' : 'text-luxury-gold'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer shortcuts */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Live Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0B0F17]">
        {/* Top Header */}
        <header className="px-6 py-4 bg-[#141B28]/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white capitalize font-serif">
              {navItems.find(n => n.id === activeTab)?.label || 'Admin Panel'}
            </h1>
            <p className="text-[11px] text-stone-400">All data stored in real-time MongoDB Atlas</p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {['header', 'hero', 'calculator', 'contact', 'about', 'brands', 'locations', 'legal'].includes(activeTab) && (
              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-black transition-all shadow-md active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save to MongoDB</span>
              </button>
            )}
          </div>
        </header>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">Bookings</p>
                  <p className="text-xl font-black text-white mt-0.5">{bookings.length}</p>
                  <p className="text-[10px] text-amber-400 mt-1 flex items-center gap-1 truncate">
                    <Clock className="w-2.5 h-2.5 shrink-0" />
                    <span>{bookings.filter(b => b.status === 'Pending').length} Pending</span>
                  </p>
                </div>

                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">Reviews</p>
                  <p className="text-xl font-black text-white mt-0.5">{reviews.length}</p>
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{stats?.metrics?.avgRating || '5.0'}/5</span>
                  </p>
                </div>

                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">Enquiries</p>
                  <p className="text-xl font-black text-white mt-0.5">{enquiries.length}</p>
                  <p className="text-[10px] text-cyan-400 mt-1">Lead inquiries</p>
                </div>

                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">Services</p>
                  <p className="text-xl font-black text-white mt-0.5">{services.length}</p>
                  <p className="text-[10px] text-stone-400 mt-1">Active services</p>
                </div>

                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">Gallery</p>
                  <p className="text-xl font-black text-white mt-0.5">{gallery.length}</p>
                  <p className="text-[10px] text-luxury-gold mt-1">Real projects</p>
                </div>

                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">FAQs</p>
                  <p className="text-xl font-black text-white mt-0.5">{faqs.length}</p>
                  <p className="text-[10px] text-stone-400 mt-1">Client answers</p>
                </div>

                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">Areas</p>
                  <p className="text-xl font-black text-white mt-0.5">{(settingsData.serviceLocations || []).length}</p>
                  <p className="text-[10px] text-indigo-400 mt-1">Ahmedabad</p>
                </div>

                <div className="bg-[#141B28] p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-stone-400 font-medium">Admins</p>
                  <p className="text-xl font-black text-white mt-0.5">{authorities.length}</p>
                  <p className="text-[10px] text-luxury-gold mt-1">Whitelisted</p>
                </div>
              </div>

              {/* Quick shortcut banner */}
              <div className="bg-gradient-to-r from-luxury-gold/15 to-transparent border border-luxury-gold/20 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">100% Comprehensive Website Controls</h3>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Header announcement, Hero banners, Calculator rates, Gallery photos, Bookings, Reviews, Areas & Email authority.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab('header')}
                      className="px-2.5 py-1 rounded-lg bg-luxury-gold text-obsidian text-xs font-bold hover:bg-luxury-goldDark"
                    >
                      Header Bar
                    </button>
                    <button
                      onClick={() => setActiveTab('hero')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                    >
                      Hero Banners
                    </button>
                    <button
                      onClick={() => setActiveTab('calculator')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                    >
                      Calculator Rates
                    </button>
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                    >
                      Gallery ({gallery.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                    >
                      Bookings
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                    >
                      Reviews
                    </button>
                    <button
                      onClick={() => setActiveTab('authority')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                    >
                      Email Authority
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Bookings & Reviews */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-luxury-gold" />
                      <span>Latest Site Visit Bookings</span>
                    </h4>
                    <button onClick={() => setActiveTab('bookings')} className="text-xs text-luxury-gold hover:underline">
                      View all ({bookings.length})
                    </button>
                  </div>
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map(b => (
                      <div key={b.id || b.bookingId} className="p-3 rounded-xl bg-black/20 border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-white">{b.name} <span className="text-[10px] text-stone-400 font-mono">({b.bookingId})</span></p>
                          <p className="text-[11px] text-stone-400">{b.serviceName} • {b.area || 'Ahmedabad'}</p>
                          <p className="text-[10px] text-stone-500 font-mono mt-0.5">{b.preferredDate} at {b.preferredTime}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                          b.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-400' :
                          b.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-luxury-gold" />
                      <span>Recent Public Reviews</span>
                    </h4>
                    <button onClick={() => setActiveTab('reviews')} className="text-xs text-luxury-gold hover:underline">
                      Manage ({reviews.length})
                    </button>
                  </div>
                  <div className="space-y-3">
                    {reviews.slice(0, 4).map(r => (
                      <div key={r.id || r._id} className="p-3 rounded-xl bg-black/20 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-bold text-white">{r.customerName}</p>
                          <div className="flex text-amber-400">
                            {[...Array(r.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-300 line-clamp-2 italic">"{r.reviewText}"</p>
                        {r.adminReply?.text && (
                          <p className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1 font-semibold">
                            <Reply className="w-3 h-3 shrink-0" />
                            <span>Replied: {r.adminReply.text.slice(0, 45)}...</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HEADER & ANNOUNCEMENT CMS */}
          {activeTab === 'header' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">Top Announcement Bar & Header CMS</h3>
                  <p className="text-xs text-stone-400 mt-1">Control top notification bar, hero badges, and emergency alerts.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-2">Live Bar Preview</label>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#121212] via-[#2A2318] to-[#121212] border border-luxury-gold/30 text-stone-200 text-xs flex items-center justify-between gap-2 shadow-inner">
                    <span className="truncate">
                      📢 {settingsData.announcementText || 'All Company PVC Material Work Available...'}
                    </span>
                    <span className="text-[10px] font-bold text-luxury-gold uppercase shrink-0">
                      {settingsData.announcementActive ? 'Enabled' : 'Hidden'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="announcementActive"
                    checked={settingsData.announcementActive}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, announcementActive: e.target.checked }))}
                    className="w-4 h-4 accent-luxury-gold rounded cursor-pointer"
                  />
                  <label htmlFor="announcementActive" className="text-xs font-bold text-white cursor-pointer">
                    Show Announcement Bar at top of all pages
                  </label>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Announcement Message</label>
                  <textarea
                    rows="2"
                    value={settingsData.announcementText}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, announcementText: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Hero Section Badge Tag</label>
                  <input
                    type="text"
                    value={settingsData.heroBadgeText}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, heroBadgeText: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Emergency Notice Banner (Optional)</label>
                  <input
                    type="text"
                    value={settingsData.emergencyNotice}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, emergencyNotice: e.target.value }))}
                    placeholder="Leave empty unless you have an urgent holiday / seasonal offer announcement"
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Header Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HERO SECTION CMS */}
          {activeTab === 'hero' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">Hero Section & Headline CMS</h3>
                  <p className="text-xs text-stone-400 mt-1">Configure the main homepage banner headlines, subtitle, badges, and CTA action buttons.</p>
                </div>

                {/* Live Preview Card */}
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-2">Live Hero Preview</label>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1c2333] to-[#0F141E] border border-luxury-gold/30 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold text-[10px] font-bold uppercase tracking-wider">
                      ✨ {settingsData.heroBadgeText || 'Ahmedabad Direct: All Companies PVC Material Work Available'}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-serif font-bold text-white leading-tight">
                      {settingsData.heroHeading || "Ahmedabad's #1 Certified KAKA PVC Modular Furniture"}
                    </h2>
                    <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                      {settingsData.heroSubheading || "100% Waterproof, 100% Termite-Proof Modern Interiors Fabricated in Vastral"}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="px-4 py-2 rounded-xl bg-luxury-gold text-obsidian text-xs font-black shadow">
                        {settingsData.heroCtaPrimary || 'Book Free Site Measurement'}
                      </span>
                      <span className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{settingsData.heroCtaSecondary || 'WhatsApp Consultation'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Hero Badge Tag (Top Pill)</label>
                    <input
                      type="text"
                      value={settingsData.heroBadgeText}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, heroBadgeText: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Main Hero Headline</label>
                    <input
                      type="text"
                      value={settingsData.heroHeading}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, heroHeading: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs font-bold focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Hero Subtitle / Description</label>
                    <textarea
                      rows="2"
                      value={settingsData.heroSubheading}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, heroSubheading: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">Primary CTA Button Label</label>
                      <input
                        type="text"
                        value={settingsData.heroCtaPrimary}
                        onChange={(e) => setSettingsData(prev => ({ ...prev, heroCtaPrimary: e.target.value }))}
                        className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">Secondary CTA Button Label</label>
                      <input
                        type="text"
                        value={settingsData.heroCtaSecondary}
                        onChange={(e) => setSettingsData(prev => ({ ...prev, heroCtaSecondary: e.target.value }))}
                        className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & SOCIALS CMS */}
          {activeTab === 'contact' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">Contact Details & Social Media Channels</h3>
                  <p className="text-xs text-stone-400 mt-1">Update phone numbers, WhatsApp, physical address, and social links.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={settingsData.primaryPhone}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, primaryPhone: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Secondary Phone Number</label>
                    <input
                      type="text"
                      value={settingsData.secondaryPhone}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, secondaryPhone: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">WhatsApp Direct Number (No +)</label>
                    <input
                      type="text"
                      value={settingsData.whatsappNumber}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Official Business Email</label>
                    <input
                      type="email"
                      value={settingsData.email}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Physical Address in Ahmedabad</label>
                  <textarea
                    rows="2"
                    value={settingsData.address}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={settingsData.workingHours}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, workingHours: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Google Maps Link</label>
                    <input
                      type="text"
                      value={settingsData.googleMapsUrl}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, googleMapsUrl: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-luxury-gold block mb-1">Google Maps Review Link (for 5-Star Reviews)</label>
                    <input
                      type="text"
                      placeholder="https://maps.google.com/?q=Shree+Shyam+PVC+Interior+Vastral+Ahmedabad"
                      value={settingsData.googleReviewUrl || ''}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, googleReviewUrl: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social media links */}
                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider mb-3">Social Media Channels</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">Instagram URL</label>
                      <input
                        type="text"
                        value={settingsData.socialChannels?.instagram || ''}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          socialChannels: { ...prev.socialChannels, instagram: e.target.value }
                        }))}
                        className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">Facebook URL</label>
                      <input
                        type="text"
                        value={settingsData.socialChannels?.facebook || ''}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          socialChannels: { ...prev.socialChannels, facebook: e.target.value }
                        }))}
                        className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">YouTube Channel URL</label>
                      <input
                        type="text"
                        value={settingsData.socialChannels?.youtube || ''}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          socialChannels: { ...prev.socialChannels, youtube: e.target.value }
                        }))}
                        className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">WhatsApp Chat Direct Link</label>
                      <input
                        type="text"
                        value={settingsData.socialChannels?.whatsapp || ''}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          socialChannels: { ...prev.socialChannels, whatsapp: e.target.value }
                        }))}
                        className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact & Socials</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ABOUT US CMS */}
          {activeTab === 'about' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">About Us CMS & Credentials</h3>
                  <p className="text-xs text-stone-400 mt-1">Manage company background, metrics (years, projects, clients), mission & vision statements.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Main About Heading</label>
                  <input
                    type="text"
                    value={settingsData.aboutHeading}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, aboutHeading: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">About Subheading</label>
                  <input
                    type="text"
                    value={settingsData.aboutSubheading}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, aboutSubheading: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Company Story / History</label>
                  <textarea
                    rows="4"
                    value={settingsData.aboutStory}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, aboutStory: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Key Numbers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Years Experience</label>
                    <input
                      type="number"
                      value={settingsData.yearsExperience}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, yearsExperience: Number(e.target.value) }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Completed Projects</label>
                    <input
                      type="number"
                      value={settingsData.completedProjects}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, completedProjects: Number(e.target.value) }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Happy Clients</label>
                    <input
                      type="number"
                      value={settingsData.happyClients}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, happyClients: Number(e.target.value) }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Warranty (Years)</label>
                    <input
                      type="number"
                      value={settingsData.warrantyYears}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, warrantyYears: Number(e.target.value) }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Mission Statement</label>
                    <textarea
                      rows="3"
                      value={settingsData.missionStatement}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, missionStatement: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Vision Statement</label>
                    <textarea
                      rows="3"
                      value={settingsData.visionStatement}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, visionStatement: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Us CMS</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES CMS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Add New Service Form */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6">
                <h3 className="font-serif font-bold text-base text-white mb-1">Add New PVC Interior Service</h3>
                <p className="text-xs text-stone-400 mb-4">Add or manage services displayed on the website.</p>

                <form onSubmit={handleCreateService} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Service Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PVC False Ceiling"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Starting Price (₹ / sq.ft)</label>
                    <input
                      type="number"
                      placeholder="480"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Service</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Services List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map(svc => (
                  <div key={svc.id || svc._id} className="bg-[#141B28] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-bold text-sm text-white">{svc.name}</h4>
                        <span className="text-xs font-mono font-bold text-luxury-gold px-2 py-0.5 rounded bg-luxury-gold/10">
                          ₹{svc.startingPrice || 450}/{svc.priceUnit || 'sq.ft'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mb-3">{svc.shortDescription}</p>
                      {svc.features && svc.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {svc.features.slice(0, 3).map((f, i) => (
                            <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-stone-300">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                      <span className="text-[11px] text-emerald-400 font-semibold">Active on website</span>
                      <button
                        onClick={() => handleDeleteService(svc.id || svc._id)}
                        className="text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-950/20"
                        title="Delete service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PRICING CALCULATOR CMS */}
          {activeTab === 'calculator' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">Livspace-Style Pricing Calculator Rates</h3>
                  <p className="text-xs text-stone-400 mt-1">Configure base rates (₹ per sq.ft) for the interactive room and finish estimator on the homepage.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/5">
                    <label className="text-xs font-bold text-white block mb-1">
                      📺 TV Unit & Acoustic Louvers
                    </label>
                    <p className="text-[11px] text-stone-400 mb-2">Base price per sq.ft</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-luxury-gold">₹</span>
                      <input
                        type="number"
                        value={settingsData.pricingCalculator?.tvUnitRate || 480}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          pricingCalculator: { ...prev.pricingCalculator, tvUnitRate: Number(e.target.value) }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#141B28] border border-white/10 text-white text-xs font-bold focus:ring-1 focus:ring-luxury-gold focus:outline-none"
                      />
                      <span className="text-xs text-stone-400">/ sq.ft</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/5">
                    <label className="text-xs font-bold text-white block mb-1">
                      🚪 Sliding Wardrobe & Lofts
                    </label>
                    <p className="text-[11px] text-stone-400 mb-2">Base price per sq.ft</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-luxury-gold">₹</span>
                      <input
                        type="number"
                        value={settingsData.pricingCalculator?.wardrobeRate || 520}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          pricingCalculator: { ...prev.pricingCalculator, wardrobeRate: Number(e.target.value) }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#141B28] border border-white/10 text-white text-xs font-bold focus:ring-1 focus:ring-luxury-gold focus:outline-none"
                      />
                      <span className="text-xs text-stone-400">/ sq.ft</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/5">
                    <label className="text-xs font-bold text-white block mb-1">
                      🍳 PVC Modular Kitchen
                    </label>
                    <p className="text-[11px] text-stone-400 mb-2">Base price per sq.ft</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-luxury-gold">₹</span>
                      <input
                        type="number"
                        value={settingsData.pricingCalculator?.kitchenRate || 550}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          pricingCalculator: { ...prev.pricingCalculator, kitchenRate: Number(e.target.value) }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#141B28] border border-white/10 text-white text-xs font-bold focus:ring-1 focus:ring-luxury-gold focus:outline-none"
                      />
                      <span className="text-xs text-stone-400">/ sq.ft</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0F17] border border-white/5">
                    <label className="text-xs font-bold text-white block mb-1">
                      🏠 Full Home (2BHK / 3BHK Flat)
                    </label>
                    <p className="text-[11px] text-stone-400 mb-2">Base price per sq.ft</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-luxury-gold">₹</span>
                      <input
                        type="number"
                        value={settingsData.pricingCalculator?.fullHomeRate || 500}
                        onChange={(e) => setSettingsData(prev => ({
                          ...prev,
                          pricingCalculator: { ...prev.pricingCalculator, fullHomeRate: Number(e.target.value) }
                        }))}
                        className="w-full p-2.5 rounded-lg bg-[#141B28] border border-white/10 text-white text-xs font-bold focus:ring-1 focus:ring-luxury-gold focus:outline-none"
                      />
                      <span className="text-xs text-stone-400">/ sq.ft</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 text-xs text-stone-300">
                  💡 <strong>Formula Note:</strong> Final estimates calculated dynamically: <code>[Area in Sq.Ft] × [Room Base Rate] × [Finish Multiplier (Fluted Louver: 1.2x, Marble Sheet: 1.15x, Teak: 1.05x, Charcoal: 1.1x)]</code>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Calculator Rates</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GALLERY & REAL WORK CMS */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Project Photo Form */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6">
                <div className="border-b border-white/5 pb-4 mb-5">
                  <h3 className="font-serif font-bold text-base text-white">Add New Real Work Photo to Live Gallery</h3>
                  <p className="text-xs text-stone-400">Photos added here appear immediately on the public website's Gallery page and portfolio showcases.</p>
                </div>

                <form onSubmit={handleAddGalleryItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern TV Unit with Louvers"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Category *</label>
                    <select
                      value={newGalleryCategory}
                      onChange={(e) => setNewGalleryCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    >
                      <option value="TV Unit">📺 TV Unit</option>
                      <option value="Wardrobe">🚪 Wardrobe</option>
                      <option value="Kitchen">🍳 Kitchen</option>
                      <option value="Doors">🚪 Doors</option>
                      <option value="Office">🏢 Office</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-2">
                    <label className="text-xs font-bold text-stone-300 block mb-1">
                      Project Photo * (Camera / File or URL)
                    </label>
                    <div className="flex gap-2">
                      <label className="cursor-pointer py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-luxury-gold/40 hover:border-luxury-gold text-luxury-gold text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 active:scale-95">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{galleryUploading ? 'Compressing...' : '📸 Choose / Camera'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryFileSelect}
                          className="hidden"
                          disabled={galleryUploading}
                        />
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Or paste image URL or path"
                        value={newGalleryImageUrl}
                        onChange={(e) => setNewGalleryImageUrl(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>
                    {newGalleryImageUrl && (
                      <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-black/30 border border-white/10">
                        <img
                          src={newGalleryImageUrl}
                          alt="Preview"
                          className="w-12 h-12 object-cover rounded-lg ring-1 ring-luxury-gold/50 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-emerald-400 block">✓ Photo Attached</span>
                          <span className="text-[10px] text-stone-400 truncate block">
                            {newGalleryImageUrl.startsWith('data:') ? 'Base64 Compressed (<150KB)' : newGalleryImageUrl}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewGalleryImageUrl('')}
                          className="text-stone-400 hover:text-red-400 text-xs px-2 py-1"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 lg:col-span-2">
                    <button
                      type="submit"
                      disabled={galleryUploading}
                      className="w-full py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload &amp; Publish to Gallery</span>
                    </button>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className="text-xs font-bold text-stone-300 block mb-1">Short Description / Specs (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. High gloss acrylic finish with gold profile handles"
                      value={newGalleryDescription}
                      onChange={(e) => setNewGalleryDescription(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>
                </form>
              </div>

              {/* Gallery Filter & Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-luxury-gold" />
                    <span>Real Work Projects Gallery ({gallery.length})</span>
                  </h4>

                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {['All', 'TV Unit', 'Wardrobe', 'Kitchen', 'Doors', 'Office'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setGalleryCategoryFilter(cat)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          galleryCategoryFilter.toLowerCase() === cat.toLowerCase()
                            ? 'bg-luxury-gold text-obsidian shadow'
                            : 'bg-[#141B28] text-stone-300 hover:bg-white/5'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredGallery.map((item, idx) => (
                    <div key={item.id || item._id || idx} className="bg-[#141B28] border border-white/5 rounded-2xl overflow-hidden group">
                      <div className="aspect-[4/3] bg-black/40 relative overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-luxury-gold border border-white/10">
                          {item.category}
                        </span>
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-950/80 backdrop-blur-md text-[9px] font-bold text-emerald-300 border border-emerald-500/20">
                          🔨 On-Site Work
                        </span>
                      </div>

                      <div className="p-3.5 space-y-2">
                        <h5 className="text-xs font-bold text-white truncate" title={item.title}>
                          {item.title}
                        </h5>
                        {item.description && (
                          <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-stone-500 font-mono">ID: {String(item.id || item._id).slice(-6)}</span>
                          <button
                            onClick={() => handleDeleteGalleryItem(item.id || item._id, item.title)}
                            className="text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/40"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BOOKINGS MANAGER */}
          {activeTab === 'bookings' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search bookings by name, phone, area..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-[#141B28] border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 w-64 sm:w-72"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={handleExportBookingsCSV}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                    title="Export Bookings to CSV / Excel spreadsheet"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export to CSV</span>
                  </button>

                  {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      onClick={() => setBookingFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        bookingFilter.toLowerCase() === st.toLowerCase()
                          ? 'bg-luxury-gold text-obsidian shadow'
                          : 'bg-[#141B28] text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table / Cards */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="divide-y divide-white/5">
                  {filteredBookings.map(b => (
                    <div key={b.id || b.bookingId} className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-white/[0.02]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-luxury-gold px-2 py-0.5 rounded bg-luxury-gold/10 border border-luxury-gold/20">
                            {b.bookingId}
                          </span>
                          <h4 className="text-sm font-bold text-white">{b.name}</h4>
                          <span className="text-xs text-stone-400">({b.phone})</span>
                        </div>
                        <p className="text-xs text-stone-300">
                          <strong className="text-white">{b.serviceName}</strong> • {b.area || 'Ahmedabad'}, {b.address || 'Address provided on call'}
                        </p>
                        <p className="text-[11px] text-stone-400 flex items-center gap-2">
                          <span>📅 Preferred: <strong className="text-stone-300">{b.preferredDate} ({b.preferredTime})</strong></span>
                          <span>• Booked: {new Date(b.createdAt).toLocaleDateString()}</span>
                        </p>
                        {b.message && (
                          <p className="text-[11px] text-stone-400 italic bg-black/20 p-2 rounded-lg mt-1">
                            "{b.message}"
                          </p>
                        )}
                        {b.adminNotes && (
                          <p className="text-[11px] text-luxury-gold mt-1 font-mono">
                            Admin Note: {b.adminNotes}
                          </p>
                        )}
                      </div>

                      {/* Status changer & Actions */}
                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        {/* WhatsApp client */}
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '').startsWith('91') ? b.phone.replace(/[^0-9]/g, '') : `91${b.phone.replace(/[^0-9]/g, '')}`}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          title="WhatsApp Client"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Status dropdown */}
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id || b.bookingId, e.target.value)}
                          className={`text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none cursor-pointer ${
                            b.status === 'Completed' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' :
                            b.status === 'Confirmed' ? 'bg-blue-950/40 text-blue-300 border-blue-800' :
                            b.status === 'Cancelled' ? 'bg-red-950/40 text-red-300 border-red-800' :
                            'bg-amber-950/40 text-amber-300 border-amber-800'
                          }`}
                        >
                          <option value="Pending" className="bg-[#141B28] text-white">Pending</option>
                          <option value="Confirmed" className="bg-[#141B28] text-white">Confirmed</option>
                          <option value="Completed" className="bg-[#141B28] text-white">Completed</option>
                          <option value="Cancelled" className="bg-[#141B28] text-white">Cancelled</option>
                        </select>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteBooking(b.id || b.bookingId)}
                          className="p-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-800/40 transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredBookings.length === 0 && (
                    <div className="p-8 text-center text-stone-500 text-xs">
                      No bookings matching the current search/filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: QUOTATION & BILL MAKER */}
          {activeTab === 'quotations' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-luxury-gold" />
                    <span>Quotation &amp; Itemized Bill Maker</span>
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Generate official estimates on company letterhead with 10-year warranty seal. Share to WhatsApp or print as PDF.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2.5 px-4 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-black shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendQuotationWhatsApp}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetQuotation}
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold transition-all border border-white/10"
                    title="Start fresh new quotation"
                  >
                    + New Quote
                  </button>
                </div>
              </div>

              {/* Client & Project Details Form */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
                <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider">Client &amp; Site Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Client Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      value={quotationData.clientName}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9825012345"
                      value={quotationData.clientPhone}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Site Address / Area</label>
                    <input
                      type="text"
                      placeholder="e.g. B-402, Shivalik Residency, Vastral"
                      value={quotationData.siteAddress}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, siteAddress: e.target.value }))}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">Quotation Ref</label>
                      <input
                        type="text"
                        value={quotationData.invoiceNumber}
                        onChange={(e) => setQuotationData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-300 block mb-1">Date</label>
                      <input
                        type="date"
                        value={quotationData.date}
                        onChange={(e) => setQuotationData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items Builder */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider">Itemized Line Items</h4>
                    <p className="text-[11px] text-stone-400">Add measurements, material finishes, and rates per sq.ft.</p>
                  </div>

                  {/* 1-Click Fast Presets */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-stone-400 uppercase font-bold mr-1">Quick Add:</span>
                    <button
                      type="button"
                      onClick={() => handleAddQuotationItem({ title: 'Modular Kitchen Base & Wall Cabinets', finish: 'High Gloss KAKA Profile', dimensions: '10x8 ft', sqft: 80, rate: 550, total: 44000 })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] font-semibold border border-white/10 transition-all"
                    >
                      + Kitchen
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddQuotationItem({ title: 'TV Unit & Acoustic Louver Wall', finish: 'Teak Louver + Statuario Sheet', dimensions: '9x7 ft', sqft: 63, rate: 480, total: 30240 })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] font-semibold border border-white/10 transition-all"
                    >
                      + TV Unit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddQuotationItem({ title: 'Full Height Sliding Wardrobe with Lofts', finish: 'Anti-Scratch Matte Pink & Slate', dimensions: '7x9 ft', sqft: 63, rate: 520, total: 32760 })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] font-semibold border border-white/10 transition-all"
                    >
                      + Wardrobe
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddQuotationItem({ title: '100% Waterproof Heavy Bathroom Door', finish: 'Woodgrain Solid PVC Panel', dimensions: '2.5x7 ft', sqft: 18, rate: 450, total: 8100 })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] font-semibold border border-white/10 transition-all"
                    >
                      + PVC Door
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {quotationData.items.map((item, index) => (
                    <div key={item.id || index} className="p-3.5 rounded-xl bg-[#0B0F17] border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-4">
                        <label className="text-[10px] text-stone-400 block mb-0.5">Item / Service Name</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateQuotationItem(index, 'title', e.target.value)}
                          placeholder="e.g. Modular Kitchen Unit"
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:ring-1 focus:ring-luxury-gold"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-stone-400 block mb-0.5">Finish / Profile</label>
                        <input
                          type="text"
                          value={item.finish}
                          onChange={(e) => handleUpdateQuotationItem(index, 'finish', e.target.value)}
                          placeholder="e.g. Acrylic Gloss"
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-stone-400 block mb-0.5">Dimensions</label>
                        <input
                          type="text"
                          value={item.dimensions}
                          onChange={(e) => handleUpdateQuotationItem(index, 'dimensions', e.target.value)}
                          placeholder="e.g. 10 ft x 8 ft"
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="text-[10px] text-stone-400 block mb-0.5">Sq. Ft.</label>
                        <input
                          type="number"
                          value={item.sqft}
                          onChange={(e) => handleUpdateQuotationItem(index, 'sqft', e.target.value)}
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs text-center font-mono focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-1">
                        <label className="text-[10px] text-stone-400 block mb-0.5">Rate (₹)</label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleUpdateQuotationItem(index, 'rate', e.target.value)}
                          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs text-center font-mono focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-1 text-right">
                        <label className="text-[10px] text-stone-400 block mb-0.5">Total</label>
                        <span className="text-xs font-bold text-luxury-gold font-mono block py-2">
                          ₹{(Number(item.total) || 0).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="sm:col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveQuotationItem(index)}
                          className="p-2 text-stone-400 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddQuotationItem()}
                  className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-luxury-gold text-xs font-bold border border-luxury-gold/30 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Item Row</span>
                </button>
              </div>

              {/* Financial Summary & Notes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#141B28] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-3">
                  <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider">Terms, Warranty &amp; Bank Instructions</h4>
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Terms &amp; Payment Conditions</label>
                    <textarea
                      rows={4}
                      value={quotationData.notes}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs leading-relaxed focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-900/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Includes 10-Year Replacement Warranty &amp; Free Ahmedabad On-Site Laser Measurement.</span>
                  </div>
                </div>

                <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-3">
                  <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider border-b border-white/5 pb-2">Financial Calculation</h4>
                  
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-stone-300">
                      <span>Items Subtotal:</span>
                      <span className="font-mono font-bold text-white">₹{quotationSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center text-stone-300">
                      <span>Discount (₹):</span>
                      <input
                        type="number"
                        value={quotationData.discount}
                        onChange={(e) => setQuotationData(prev => ({ ...prev, discount: e.target.value }))}
                        className="w-28 p-1.5 rounded-lg bg-[#0B0F17] border border-white/10 text-right text-xs text-emerald-400 font-mono focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-between items-center text-stone-300">
                      <span>GST (%):</span>
                      <select
                        value={quotationData.gstPercent}
                        onChange={(e) => setQuotationData(prev => ({ ...prev, gstPercent: Number(e.target.value) }))}
                        className="w-28 p-1.5 rounded-lg bg-[#0B0F17] border border-white/10 text-right text-xs text-white focus:outline-none"
                      >
                        <option value={0}>0% (Exempt)</option>
                        <option value={18}>18% (Standard)</option>
                      </select>
                    </div>

                    {quotationGstAmount > 0 && (
                      <div className="flex justify-between items-center text-stone-400 text-[11px]">
                        <span>GST Amount:</span>
                        <span className="font-mono text-stone-300">+₹{quotationGstAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                      <span className="font-bold text-white">Grand Total:</span>
                      <span className="font-mono font-black text-sm text-luxury-gold">₹{quotationGrandTotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center text-stone-300 pt-1">
                      <span>Advance Received (₹):</span>
                      <input
                        type="number"
                        value={quotationData.advancePaid}
                        onChange={(e) => setQuotationData(prev => ({ ...prev, advancePaid: e.target.value }))}
                        className="w-28 p-1.5 rounded-lg bg-[#0B0F17] border border-white/10 text-right text-xs text-blue-400 font-mono focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 border-t border-white/10 flex justify-between items-center bg-black/30 p-2.5 rounded-xl">
                      <span className="font-bold text-stone-300">Net Balance Due:</span>
                      <span className="font-mono font-black text-base text-emerald-400">₹{quotationBalanceDue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVE PRINTABLE LETTERHEAD PREVIEW & CONTAINER */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Official Letterhead Preview (Prints to PDF)</span>
                  </h4>
                  <span className="text-[11px] text-stone-400">Click "Print / Save PDF" to download or print</span>
                </div>

                <div id="printable-admin-quotation" className="bg-white text-stone-900 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-5 text-xs max-w-4xl mx-auto">
                  {/* Top Letterhead Banner */}
                  <div className="flex items-center justify-between border-b-2 border-amber-600/30 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <img src={logoImg} alt="Shree Shyam PVC" className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-amber-600/40" />
                      <div>
                        <h2 className="font-serif font-black text-lg text-stone-900 tracking-tight">SHREE SHYAM PVC INTERIOR</h2>
                        <p className="text-[11px] text-amber-700 font-black uppercase tracking-wider">KAKA PVC PROFILE &amp; ALL BRANDS AUTHORIZED FABRICATOR</p>
                        <p className="text-[10px] text-stone-600">Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad - 382418</p>
                        <p className="text-[10px] text-stone-600">Phone: +91 8209836370 / +91 9828448936 • GSTIN: {settingsData.gstNumber || '24AAAAA0000A1Z5'}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-900 font-serif font-black text-xs uppercase tracking-wider mb-1">
                        ESTIMATE / QUOTATION
                      </span>
                      <p className="font-mono font-bold text-stone-900">{quotationData.invoiceNumber}</p>
                      <p className="text-[10px] text-stone-600">Date: {quotationData.date}</p>
                      <p className="text-[10px] text-emerald-700 font-bold">10-YEAR GUARANTEE</p>
                    </div>
                  </div>

                  {/* Client Info Grid */}
                  <div className="bg-stone-50 p-3.5 rounded-xl grid grid-cols-2 gap-4 border border-stone-200/80 text-[11px]">
                    <div>
                      <span className="text-stone-500 block text-[9px] uppercase font-bold tracking-wider">QUOTATION ISSUED TO:</span>
                      <h4 className="font-bold text-stone-900 text-sm mt-0.5">{quotationData.clientName || 'Valued Customer'}</h4>
                      <p className="text-stone-700 font-mono">{quotationData.clientPhone || 'Mobile not provided'}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-500 block text-[9px] uppercase font-bold tracking-wider">PROJECT SITE LOCATION:</span>
                      <p className="font-bold text-stone-900 mt-0.5">{quotationData.siteAddress || 'Ahmedabad, Gujarat'}</p>
                      <p className="text-stone-600">Laser Measurement: <strong className="text-emerald-700">COMPLIMENTARY</strong></p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <table className="w-full text-left border border-stone-200 rounded-xl overflow-hidden text-[11px]">
                    <thead className="bg-stone-100 text-stone-800 text-[10px] uppercase font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-2.5 text-center w-10">#</th>
                        <th className="p-2.5">Item Description &amp; Specifications</th>
                        <th className="p-2.5">Dimensions</th>
                        <th className="p-2.5 text-center">Sq. Ft.</th>
                        <th className="p-2.5 text-right">Rate (₹)</th>
                        <th className="p-2.5 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {quotationData.items.map((item, idx) => (
                        <tr key={item.id || idx}>
                          <td className="p-2.5 text-center font-mono text-stone-500">{idx + 1}</td>
                          <td className="p-2.5">
                            <strong className="text-stone-900 font-semibold">{item.title}</strong>
                            {item.finish && <span className="block text-[10px] text-stone-500">Finish: {item.finish}</span>}
                          </td>
                          <td className="p-2.5 font-mono text-stone-700">{item.dimensions || 'As per site'}</td>
                          <td className="p-2.5 text-center font-mono text-stone-700">{item.sqft}</td>
                          <td className="p-2.5 text-right font-mono text-stone-700">₹{item.rate}</td>
                          <td className="p-2.5 text-right font-mono font-bold text-stone-900">₹{(Number(item.total) || 0).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-stone-200 bg-stone-50">
                      <tr>
                        <td colSpan="5" className="p-2 text-right font-bold text-stone-700">Subtotal:</td>
                        <td className="p-2 text-right font-mono font-bold text-stone-900">₹{quotationSubtotal.toLocaleString('en-IN')}</td>
                      </tr>
                      {quotationDiscountAmount > 0 && (
                        <tr>
                          <td colSpan="5" className="p-1.5 text-right text-emerald-700 font-semibold">Special Discount:</td>
                          <td className="p-1.5 text-right font-mono text-emerald-700 font-bold">-₹{quotationDiscountAmount.toLocaleString('en-IN')}</td>
                        </tr>
                      )}
                      {quotationGstAmount > 0 && (
                        <tr>
                          <td colSpan="5" className="p-1.5 text-right text-stone-600">GST ({quotationData.gstPercent}%):</td>
                          <td className="p-1.5 text-right font-mono text-stone-700">+₹{quotationGstAmount.toLocaleString('en-IN')}</td>
                        </tr>
                      )}
                      <tr className="bg-amber-100/70 border-t border-amber-300">
                        <td colSpan="5" className="p-2.5 text-right font-bold text-stone-900 text-xs uppercase">Grand Total (INR):</td>
                        <td className="p-2.5 text-right font-mono font-black text-stone-900 text-sm">₹{quotationGrandTotal.toLocaleString('en-IN')}</td>
                      </tr>
                      {Number(quotationData.advancePaid) > 0 && (
                        <tr>
                          <td colSpan="5" className="p-1.5 text-right text-blue-800 font-semibold">Advance Received:</td>
                          <td className="p-1.5 text-right font-mono text-blue-800 font-bold">₹{Number(quotationData.advancePaid).toLocaleString('en-IN')}</td>
                        </tr>
                      )}
                      <tr className="bg-emerald-50 border-t border-emerald-200">
                        <td colSpan="5" className="p-2 text-right font-bold text-emerald-900 text-xs uppercase">Net Balance Due on Handover:</td>
                        <td className="p-2 text-right font-mono font-black text-emerald-900 text-sm">₹{quotationBalanceDue.toLocaleString('en-IN')}</td>
                      </tr>
                    </tfoot>
                  </table>

                  {/* Terms & Certification Box */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-[10px] text-stone-600 space-y-1">
                      <strong className="text-stone-900 block font-bold">Guarantee &amp; Terms:</strong>
                      <p>• 10-Year Replacement Guarantee on Termite &amp; Water Resistance.</p>
                      <p>• 100% Genuine Lead-Free Virgin PVC Profiles (KAKA, TAASA, etc.).</p>
                      <p>• UPI / GPay / PhonePe payment number: <strong>8209836370</strong></p>
                    </div>

                    <div className="text-right flex flex-col justify-end pr-2">
                      <div className="h-10"></div>
                      <p className="border-t border-stone-300 pt-1 font-serif font-bold text-stone-900 text-[11px]">
                        For Shree Shyam PVC Interior
                      </p>
                      <span className="text-[10px] text-stone-500">Authorized Signatory / Vastral Workshop</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REVIEWS & REPLIES CMS */}
          {activeTab === 'reviews' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Customer Reviews & Official Replies</h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Reviews submitted by customers appear publicly. You can reply as official owner or delete.
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  {['all', 'Approved', 'Pending', 'Rejected'].map(st => (
                    <button
                      key={st}
                      onClick={() => setReviewFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        reviewFilter.toLowerCase() === st.toLowerCase()
                          ? 'bg-luxury-gold text-obsidian shadow'
                          : 'bg-[#141B28] text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                {filteredReviews.map(r => (
                  <div key={r.id || r._id} className="bg-[#141B28] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{r.customerName}</h4>
                          <span className="text-xs text-stone-400">({r.location || 'Ahmedabad'})</span>
                          <span className="text-[11px] text-stone-500 font-mono">• {r.serviceUsed}</span>
                        </div>
                        <div className="flex items-center gap-1 my-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < (r.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-stone-600'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-amber-400 ml-1">{r.rating || 5} Stars</span>
                        </div>
                        <p className="text-xs text-stone-200 mt-2 leading-relaxed italic">
                          "{r.reviewText}"
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Status dropdown */}
                        <select
                          value={r.status || 'Approved'}
                          onChange={(e) => handleUpdateReviewStatus(r.id || r._id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                            r.status === 'Approved' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800' :
                            r.status === 'Pending' ? 'bg-amber-950/40 text-amber-300 border-amber-800' :
                            'bg-red-950/40 text-red-300 border-red-800'
                          }`}
                        >
                          <option value="Approved" className="bg-[#141B28] text-white">Approved</option>
                          <option value="Pending" className="bg-[#141B28] text-white">Pending</option>
                          <option value="Rejected" className="bg-[#141B28] text-white">Rejected</option>
                        </select>

                        {/* Reply Button */}
                        <button
                          onClick={() => {
                            setActiveReviewForReply(r);
                            setReplyText(r.adminReply?.text || '');
                            setReplyModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-luxury-gold/15 hover:bg-luxury-gold/25 text-luxury-gold border border-luxury-gold/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>{r.adminReply?.text ? 'Edit Reply' : 'Reply'}</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteReview(r.id || r._id)}
                          className="p-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-800/40 transition-colors"
                          title="Delete Review Permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Show official reply if exists */}
                    {r.adminReply?.text && (
                      <div className="mt-4 p-3.5 rounded-xl bg-[#0B0F17] border border-emerald-500/20 text-xs">
                        <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Official Team Response ({r.adminReply.repliedBy || 'Shree Shyam PVC Team'})
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {r.adminReply.repliedAt ? new Date(r.adminReply.repliedAt).toLocaleDateString() : 'Live'}
                          </span>
                        </div>
                        <p className="text-stone-300 leading-relaxed font-sans">{r.adminReply.text}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reply Modal */}
              {replyModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#141B28] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                        <Reply className="w-4 h-4 text-luxury-gold" />
                        <span>Reply to {activeReviewForReply?.customerName}</span>
                      </h4>
                      <button onClick={() => setReplyModalOpen(false)} className="text-stone-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-stone-300 italic mb-4">
                      "{activeReviewForReply?.reviewText}"
                    </div>

                    <form onSubmit={handleReplyReviewSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-stone-300 block mb-1">
                          Official Response (Visible publicly on the Reviews page)
                        </label>
                        <textarea
                          rows="4"
                          required
                          placeholder="Thank you for your valuable feedback! We are delighted you loved the finish..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setReplyModalOpen(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-stone-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md"
                        >
                          Publish Official Reply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: ENQUIRIES / LEADS */}
          {activeTab === 'enquiries' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-white">Customer Enquiries & Callback Leads</h3>
                  <p className="text-xs text-stone-400 mt-0.5">Leads submitted via the website contact and quotation forms.</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleExportEnquiriesCSV}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
                    title="Export Leads to CSV / Excel spreadsheet"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Leads (CSV)</span>
                  </button>

                  {['all', 'New', 'Contacted', 'Closed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setEnquiryFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        enquiryFilter.toLowerCase() === st.toLowerCase()
                          ? 'bg-luxury-gold text-obsidian shadow'
                          : 'bg-[#141B28] text-stone-300 hover:bg-white/5'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredEnquiries.map(enq => (
                  <div key={enq.id || enq._id} className="bg-[#141B28] border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{enq.name}</h4>
                        <span className="text-xs text-luxury-gold font-mono font-bold">({enq.phone})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'New' ? 'bg-amber-500/20 text-amber-400' :
                          enq.status === 'Contacted' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300">
                        Inquiry for: <strong className="text-white">{enq.service || 'General PVC Interior'}</strong>
                      </p>
                      {enq.message && (
                        <p className="text-xs text-stone-400 italic bg-black/20 p-2.5 rounded-lg">
                          "{enq.message}"
                        </p>
                      )}
                      <p className="text-[10px] text-stone-500 font-mono">
                        Received: {new Date(enq.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '').startsWith('91') ? enq.phone.replace(/[^0-9]/g, '') : `91${enq.phone.replace(/[^0-9]/g, '')}`}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </a>

                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateEnquiryStatus(enq.id || enq._id, e.target.value)}
                        className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white focus:outline-none cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteEnquiry(enq.id || enq._id)}
                        className="p-2 rounded-xl bg-red-950/20 text-red-400 border border-red-800/40"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredEnquiries.length === 0 && (
                  <div className="p-8 text-center text-stone-500 text-xs bg-[#141B28] rounded-2xl border border-white/5">
                    No customer enquiries in this category.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 9: FAQS CMS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              {/* Add FAQ form */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6">
                <h3 className="font-serif font-bold text-base text-white mb-1">Add New FAQ to Website</h3>
                <p className="text-xs text-stone-400 mb-4">Questions and answers shown on the customer FAQ page.</p>

                <form onSubmit={handleCreateFaq} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Question *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Is PVC safe for modular kitchen heat and fire?"
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Answer *</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="e.g. Yes, heavy-duty KAKA and TAASA PVC profiles have flame retardant properties..."
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <select
                      value={newFaqCategory}
                      onChange={(e) => setNewFaqCategory(e.target.value)}
                      className="p-2 rounded-xl bg-[#0B0F17] border border-white/10 text-xs text-white"
                    >
                      <option>Materials & Durability</option>
                      <option>Brands & Choice</option>
                      <option>Warranty</option>
                      <option>Installation Speed</option>
                      <option>Pricing & Payment</option>
                    </select>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-black shadow-md flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add FAQ</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* FAQs list */}
              <div className="space-y-3">
                {faqs.map(faq => (
                  <div key={faq.id || faq._id} className="bg-[#141B28] border border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/20 mb-2 inline-block">
                          {faq.category || 'General'}
                        </span>
                        <h4 className="text-sm font-bold text-white mb-1.5">{faq.question}</h4>
                        <p className="text-xs text-stone-300 leading-relaxed">{faq.answer}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteFaq(faq.id || faq._id)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-xl bg-red-950/20 shrink-0"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SERVICE COVERAGE AREAS CMS */}
          {activeTab === 'locations' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">Ahmedabad Service Coverage Areas</h3>
                  <p className="text-xs text-stone-400 mt-1">Manage all local areas where Shree Shyam PVC Interior provides on-site measurement and installation.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-2">Active Service Localities ({(settingsData.serviceLocations || []).length})</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(settingsData.serviceLocations || []).map(loc => (
                      <span
                        key={loc}
                        className="px-3 py-1.5 rounded-xl bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold text-xs font-bold flex items-center gap-2"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{loc}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLocation(loc)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new locality (e.g. Science City, Prahlad Nagar, Chandkheda)"
                      value={newLocationInput}
                      onChange={(e) => setNewLocationInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddLocation(); } }}
                      className="p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none flex-1 max-w-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddLocation}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Locality</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Service Localities</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PVC BRANDS & MATERIALS */}
          {activeTab === 'brands' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">All Companies PVC Material Work Available</h3>
                  <p className="text-xs text-stone-400 mt-1">Manage certified brands offered (KAKA, TAASA, etc.) and warranty guarantees.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Guarantee Details Summary</label>
                  <input
                    type="text"
                    value={settingsData.guaranteeDetails}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, guaranteeDetails: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Materials Specification Text</label>
                  <textarea
                    rows="3"
                    value={settingsData.materialsDescription}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, materialsDescription: e.target.value }))}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-2">Available PVC Brands & Profiles</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {settingsData.availableBrands?.map(brand => (
                      <span
                        key={brand}
                        className="px-3 py-1.5 rounded-xl bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-gold text-xs font-bold flex items-center gap-2"
                      >
                        <span>{brand}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBrand(brand)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add brand name (e.g. Alstone, Century PVC)"
                      value={newBrandInput}
                      onChange={(e) => setNewBrandInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddBrand(); } }}
                      className="p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none flex-1 max-w-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddBrand}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Brand</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Brand Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BUSINESS & LEGAL CMS */}
          {activeTab === 'legal' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">Business Registration & Legal Details</h3>
                  <p className="text-xs text-stone-400 mt-1">Configure official registration numbers, GST, and copyright notices shown in the website footer.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">GSTIN / MSME Registration Number</label>
                    <input
                      type="text"
                      value={settingsData.gstNumber}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, gstNumber: e.target.value }))}
                      placeholder="e.g. 24AAAAA0000A1Z5"
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">State & Jurisdiction</label>
                    <input
                      type="text"
                      value={settingsData.state}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-stone-300 block mb-1">Footer Copyright Text</label>
                    <input
                      type="text"
                      value={settingsData.footerCopyright}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, footerCopyright: e.target.value }))}
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Legal Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: EMAIL AUTHORITY & ACCESS WHITELIST */}
          {activeTab === 'authority' && (
            <div className="space-y-6">
              {/* Add New Authorized Admin Card */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6">
                <div className="border-b border-white/5 pb-4 mb-5">
                  <div className="flex items-center gap-2 text-luxury-gold mb-1">
                    <KeyRound className="w-5 h-5" />
                    <h3 className="font-serif font-bold text-base text-white">Add New Authorized Admin Email & Password</h3>
                  </div>
                  <p className="text-xs text-stone-400">
                    Aap jis email aur password ko yahan add karenge, sirf wahi person admin panel login kar sakega.
                  </p>
                </div>

                <form onSubmit={handleAddAuthority} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Admin Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. partner@gmail.com"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Admin Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Partner Name"
                      value={newAdminName}
                      onChange={(e) => setNewAdminName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Password for this Email *</label>
                    <input
                      type="text"
                      required
                      placeholder="Assign password (e.g. secret123)"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Authorize Email</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Authorized Emails List */}
              <div className="bg-[#141B28] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-luxury-gold" />
                    <span>Currently Authorized Admin Emails ({authorities.length})</span>
                  </h4>
                  <span className="text-[11px] text-stone-400 font-mono">Real-time MongoDB Whitelist</span>
                </div>

                <div className="divide-y divide-white/5">
                  {authorities.map(admin => (
                    <div key={admin.id || admin._id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{admin.name || 'Admin'}</span>
                          <span className="text-xs font-mono text-luxury-gold">{admin.email}</span>
                          {admin.email === 'maheshkumarsaini8769@gmail.com' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
                              Primary Superadmin
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400">
                          Role: <strong className="text-stone-300 uppercase">{admin.role}</strong> • Added: {new Date(admin.createdAt).toLocaleDateString()}
                        </p>

                        {/* Inline password change form */}
                        {passwordChangeId === (admin.id || admin._id) && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                            <input
                              type="text"
                              placeholder="New password"
                              value={newPasswordVal}
                              onChange={(e) => setNewPasswordVal(e.target.value)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#0B0F17] border border-white/10 text-white text-xs font-mono focus:ring-1 focus:ring-luxury-gold"
                            />
                            <button
                              onClick={() => handleUpdatePassword(admin.id || admin._id)}
                              className="px-3 py-1.5 rounded-lg bg-luxury-gold text-obsidian text-xs font-bold"
                            >
                              Save Password
                            </button>
                            <button
                              onClick={() => setPasswordChangeId(null)}
                              className="px-2 py-1.5 text-stone-400 hover:text-white text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setPasswordChangeId(passwordChangeId === (admin.id || admin._id) ? null : (admin.id || admin._id));
                            setNewPasswordVal('');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
                        >
                          Change Password
                        </button>

                        <button
                          onClick={() => handleToggleAdminStatus(admin.id || admin._id, admin.status)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                            admin.status === 'active'
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                              : 'bg-red-950/40 text-red-300 border-red-800'
                          }`}
                        >
                          {admin.status === 'active' ? 'Active' : 'Inactive'}
                        </button>

                        {admin.email !== 'maheshkumarsaini8769@gmail.com' && (
                          <button
                            onClick={() => handleDeleteAuthority(admin.id || admin._id, admin.email)}
                            className="p-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-800/40 transition-colors"
                            title="Revoke Admin Access"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;
