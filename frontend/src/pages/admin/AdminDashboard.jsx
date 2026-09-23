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
  X
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { refreshSettings } = useSettings();

  const [activeTab, setActiveTab] = useState('overview');
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
    announcementText: '',
    announcementActive: true,
    emergencyNotice: '',
    heroBadgeText: '',
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

  // 6. New Brand input
  const [newBrandInput, setNewBrandInput] = useState('');

  // Load all initial admin data
  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, settingsRes, bookingsRes, reviewsRes, authRes] = await Promise.all([
        api.adminGetDashboardStats().catch(() => null),
        api.getSettings().catch(() => ({})),
        api.adminGetBookings().catch(() => []),
        api.adminGetReviews().catch(() => []),
        api.adminGetEmailAuthorities().catch(() => [])
      ]);

      if (statsRes) setStats(statsRes);
      if (settingsRes) {
        setSettingsData(prev => ({
          ...prev,
          ...settingsRes,
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
      showNotification('Settings updated successfully in MongoDB!');
    } catch (err) {
      showNotification(err.message || 'Error updating settings', true);
    }
  };

  // Booking status update
  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await api.adminUpdateBookingStatus(id, { status: newStatus });
      setBookings(prev => prev.map(b => (b.id === id || b.bookingId === id ? { ...b, status: newStatus } : b)));
      showNotification(`Booking status changed to ${newStatus}`);
    } catch (err) {
      showNotification(err.message || 'Error updating status', true);
    }
  };

  // Booking delete
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking?')) return;
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
      showNotification('Official reply published! It is now live on the public website.');
    } catch (err) {
      showNotification(err.message || 'Error publishing reply', true);
    }
  };

  // Review Delete
  const handleDeleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer review permanently?')) return;
    try {
      await api.adminDeleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id && r._id !== id));
      showNotification('Review deleted permanently');
    } catch (err) {
      showNotification(err.message || 'Error deleting review', true);
    }
  };

  // Email Authority: Add new authorized email with password
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
      showNotification('Password successfully updated for this admin!');
    } catch (err) {
      showNotification(err.message || 'Error updating password', true);
    }
  };

  // Email Authority: Toggle active/inactive
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

  // Email Authority: Delete
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

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'header', label: 'Header & Announcement CMS', icon: Megaphone },
    { id: 'contact', label: 'Contact & Socials CMS', icon: PhoneCall },
    { id: 'about', label: 'About Us CMS', icon: Info },
    { id: 'bookings', label: `Bookings (${bookings.length})`, icon: CalendarCheck },
    { id: 'reviews', label: `Reviews & Replies (${reviews.length})`, icon: Star },
    { id: 'brands', label: 'PVC Brands & Materials', icon: Layers },
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

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-[#141B28] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luxury-gold/15 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm text-white tracking-wide">SSPI Control Center</h2>
              <p className="text-[11px] text-stone-400 font-mono">Superadmin Portal</p>
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
                onClick={() => setActiveTab(item.id)}
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
        <header className="px-6 py-4 bg-[#141B28]/60 backdrop-blur-md border-b border-white/5 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white capitalize font-serif">
              {navItems.find(n => n.id === activeTab)?.label || 'Admin Panel'}
            </h1>
            <p className="text-[11px] text-stone-400">All data automatically persisted in MongoDB Atlas</p>
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

            {['header', 'contact', 'about', 'brands'].includes(activeTab) && (
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#141B28] p-5 rounded-2xl border border-white/5">
                  <p className="text-xs text-stone-400 font-medium">Total Site Consultations</p>
                  <p className="text-2xl sm:text-3xl font-black text-white mt-1">{stats?.metrics?.totalBookings || bookings.length}</p>
                  <p className="text-[11px] text-amber-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{stats?.metrics?.pending || bookings.filter(b => b.status === 'Pending').length} Pending review</span>
                  </p>
                </div>

                <div className="bg-[#141B28] p-5 rounded-2xl border border-white/5">
                  <p className="text-xs text-stone-400 font-medium">Public Reviews</p>
                  <p className="text-2xl sm:text-3xl font-black text-white mt-1">{reviews.length}</p>
                  <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Average {stats?.metrics?.avgRating || '5.0'} / 5.0</span>
                  </p>
                </div>

                <div className="bg-[#141B28] p-5 rounded-2xl border border-white/5">
                  <p className="text-xs text-stone-400 font-medium">Authorized Admins</p>
                  <p className="text-2xl sm:text-3xl font-black text-white mt-1">{authorities.length}</p>
                  <p className="text-[11px] text-luxury-gold mt-2 flex items-center gap-1">
                    <KeyRound className="w-3 h-3" />
                    <span>Whitelist Protected</span>
                  </p>
                </div>

                <div className="bg-[#141B28] p-5 rounded-2xl border border-white/5">
                  <p className="text-xs text-stone-400 font-medium">Primary Guarantee</p>
                  <p className="text-2xl sm:text-3xl font-black text-white mt-1">{settingsData.warrantyYears || 10} Years</p>
                  <p className="text-[11px] text-cyan-400 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>100% Waterproof & Termite</span>
                  </p>
                </div>
              </div>

              {/* Quick actions card */}
              <div className="bg-gradient-to-r from-luxury-gold/15 to-transparent border border-luxury-gold/20 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Quick Control Shortcuts</h3>
                    <p className="text-xs text-stone-300 mt-1">
                      Edit announcement bar, manage customer reviews, assign admin authority, or track bookings.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab('header')}
                      className="px-3 py-1.5 rounded-lg bg-luxury-gold text-obsidian text-xs font-bold hover:bg-luxury-goldDark transition-colors"
                    >
                      Update Header Announcement
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
                    >
                      Reply to Reviews
                    </button>
                    <button
                      onClick={() => setActiveTab('authority')}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
                    >
                      Add Admin Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Bookings & Reviews split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-luxury-gold" />
                      <span>Latest Consultation Bookings</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-luxury-gold hover:underline"
                    >
                      View all ({bookings.length})
                    </button>
                  </div>
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map(b => (
                      <div key={b.id || b.bookingId} className="p-3 rounded-xl bg-black/20 border border-white/5 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-white">{b.name} <span className="text-[10px] text-stone-400 font-normal font-mono">({b.bookingId})</span></p>
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
                    {bookings.length === 0 && (
                      <p className="text-xs text-stone-500 text-center py-4">No bookings yet.</p>
                    )}
                  </div>
                </div>

                <div className="bg-[#141B28] border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-luxury-gold" />
                      <span>Recent Public Reviews</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-xs text-luxury-gold hover:underline"
                    >
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
                    {reviews.length === 0 && (
                      <p className="text-xs text-stone-500 text-center py-4">No reviews yet.</p>
                    )}
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
                  <p className="text-xs text-stone-400 mt-1">
                    Control what thousands of visitors see in the top gold bar of your website.
                  </p>
                </div>

                {/* Announcement Live Preview */}
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
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Announcement Bar Message
                  </label>
                  <textarea
                    rows="2"
                    value={settingsData.announcementText}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, announcementText: e.target.value }))}
                    placeholder="All Company PVC Material Work Available • KAKA, TAASA & All Major Brands • 10-Yr Guarantee..."
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Hero Section Badge Text (Above Title)
                  </label>
                  <input
                    type="text"
                    value={settingsData.heroBadgeText}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, heroBadgeText: e.target.value }))}
                    placeholder="Ahmedabad Direct: All Companies PVC Material Work Available (KAKA, TAASA & Major Brands)"
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Emergency Alert / Notification (Optional)
                  </label>
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
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Header Settings</span>
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
                  <p className="text-xs text-stone-400 mt-1">
                    Update phone numbers, WhatsApp, physical address, and official social accounts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={settingsData.primaryPhone}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, primaryPhone: e.target.value }))}
                      placeholder="+91 8209836370"
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Secondary Phone Number</label>
                    <input
                      type="text"
                      value={settingsData.secondaryPhone}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, secondaryPhone: e.target.value }))}
                      placeholder="+91 9828448936"
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">WhatsApp Direct Number (No +)</label>
                    <input
                      type="text"
                      value={settingsData.whatsappNumber}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                      placeholder="918209836370"
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Official Business Email</label>
                    <input
                      type="email"
                      value={settingsData.email}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="maheshkumarsaini8769@gmail.com"
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
                    placeholder="Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad - 382418"
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
                      placeholder="Monday - Sunday: 9:00 AM – 9:00 PM"
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">Google Maps Link</label>
                    <input
                      type="text"
                      value={settingsData.googleMapsUrl}
                      onChange={(e) => setSettingsData(prev => ({ ...prev, googleMapsUrl: e.target.value }))}
                      placeholder="https://maps.google.com/..."
                      className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social media links */}
                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider mb-3">
                    Social Media Channels
                  </h4>
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
                        placeholder="https://instagram.com/..."
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
                        placeholder="https://facebook.com/..."
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
                        placeholder="https://youtube.com/@..."
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
                        placeholder="https://wa.me/918209836370"
                        className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold transition-all shadow-md flex items-center gap-2"
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
                  <p className="text-xs text-stone-400 mt-1">
                    Manage company background, metrics (years, projects, clients), mission & vision statements.
                  </p>
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
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Us CMS</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BOOKINGS MANAGER */}
          {activeTab === 'bookings' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
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
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
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
                    <div key={b.id || b.bookingId} className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
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

          {/* TAB 6: REVIEWS & REPLIES CMS */}
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
                        {/* Status badge & toggle */}
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

                {filteredReviews.length === 0 && (
                  <div className="p-8 text-center text-stone-500 text-xs bg-[#141B28] rounded-2xl border border-white/5">
                    No reviews in this category.
                  </div>
                )}
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
                      <button
                        onClick={() => setReplyModalOpen(false)}
                        className="text-stone-400 hover:text-white"
                      >
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

          {/* TAB 7: PVC BRANDS & MATERIALS */}
          {activeTab === 'brands' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-[#141B28] border border-white/5 rounded-2xl p-6 space-y-5">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-base text-white">All Companies PVC Material Work Available</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage the certified brands offered (KAKA PVC, TAASA, etc.) and warranty guarantees displayed across the website.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Guarantee Details Summary</label>
                  <input
                    type="text"
                    value={settingsData.guaranteeDetails}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, guaranteeDetails: e.target.value }))}
                    placeholder="100% Termite Proof & 100% Waterproof with 10 Years Warranty"
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">Materials Specification Text</label>
                  <textarea
                    rows="3"
                    value={settingsData.materialsDescription}
                    onChange={(e) => setSettingsData(prev => ({ ...prev, materialsDescription: e.target.value }))}
                    placeholder="We work with all top certified brands including KAKA PVC, TAASA, Greenply PVC, and Alstone..."
                    className="w-full p-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                  />
                </div>

                {/* Available brands list */}
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
                          title="Remove brand"
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
                    className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Brand Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: EMAIL AUTHORITY & ACCESS WHITELIST */}
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
                        {/* Change password button */}
                        <button
                          onClick={() => {
                            setPasswordChangeId(passwordChangeId === (admin.id || admin._id) ? null : (admin.id || admin._id));
                            setNewPasswordVal('');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
                        >
                          Change Password
                        </button>

                        {/* Active / Inactive status */}
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

                        {/* Revoke / Delete */}
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
