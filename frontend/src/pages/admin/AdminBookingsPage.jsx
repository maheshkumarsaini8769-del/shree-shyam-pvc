import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Edit,
  Save,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Selected Booking for Modal / Quick Edit
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [schedDate, setSchedDate] = useState('');
  const [schedTime, setSchedTime] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchBookings = () => {
    setLoading(true);
    api.adminGetBookings({ search, status: statusFilter, service: serviceFilter })
      .then(data => setBookings(data))
      .catch(err => console.error('Error loading bookings:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, serviceFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBookings();
  };

  const openEditModal = (b) => {
    setSelectedBooking(b);
    setNewStatus(b.status);
    setNewNotes(b.adminNotes || '');
    setSchedDate(b.scheduledDate || b.preferredDate || '');
    setSchedTime(b.scheduledTime || b.preferredTime || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedBooking) return;
    setSaving(true);
    try {
      await api.adminUpdateBookingStatus(selectedBooking.id, {
        status: newStatus,
        adminNotes: newNotes,
        scheduledDate: schedDate,
        scheduledTime: schedTime
      });
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      alert('Error updating booking: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            BOOKING PIPELINE
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            Site Visit Requests
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-warm-border shadow-soft flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by ID, name, phone, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-warm-border bg-warm-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold text-charcoal focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Work Started">Work Started</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold text-charcoal focus:outline-none"
          >
            <option value="all">All Services</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Wardrobe">Wardrobe</option>
            <option value="Doors">Doors</option>
            <option value="Wall Panels">Wall Panels</option>
            <option value="TV Unit">TV Unit</option>
            <option value="Office">Office</option>
          </select>
        </div>
      </div>

      {/* Bookings Table / Cards */}
      <div className="bg-white rounded-3xl border border-warm-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            No bookings matching the filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm-cream/60 border-b border-warm-border text-charcoal font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Booking ID</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Visit Date & Slot</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border/60">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-warm-white/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-red">
                      {b.bookingId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-charcoal">{b.name}</div>
                      <a href={`tel:${b.phone}`} className="text-charcoal-muted hover:text-brand-red font-medium">
                        {b.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-charcoal">
                      {b.serviceName}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-charcoal">{b.preferredDate}</div>
                      <div className="text-[11px] text-charcoal-muted">{b.preferredTime}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[200px] truncate text-charcoal-muted">
                      {b.address ? `${b.address}, ` : ''}{b.area}, {b.city}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : b.status === 'Cancelled'
                          ? 'bg-red-100 text-brand-red'
                          : b.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(b)}
                          className="px-2.5 py-1.5 rounded-lg bg-warm-cream hover:bg-warm-border text-charcoal font-semibold text-[11px] transition-colors"
                        >
                          Manage
                        </button>
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${b.name}, this is regarding your PVC interior booking ${b.bookingId} at Shree Shyam PVC Interior.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-[#25D366] hover:bg-[#25D366]/10"
                          title="WhatsApp Client"
                        >
                          <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Booking Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-warm-border">
            <div className="flex items-center justify-between border-b border-warm-border pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-charcoal-muted tracking-wider">
                  Update Booking
                </span>
                <h3 className="text-lg font-bold text-charcoal">
                  {selectedBooking.serviceName} ({selectedBooking.bookingId})
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1 rounded-lg text-charcoal-muted hover:text-charcoal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                  Change Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold text-charcoal"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Work Started">Work Started</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    value={schedDate}
                    onChange={(e) => setSchedDate(e.target.value)}
                    className="w-full p-2 rounded-xl border border-warm-border bg-warm-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                    Scheduled Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 11:30 AM"
                    value={schedTime}
                    onChange={(e) => setSchedTime(e.target.value)}
                    className="w-full p-2 rounded-xl border border-warm-border bg-warm-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                  Workshop Internal Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Spoke with client. Client requested Teak wood profile sample and chimney space..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-warm-cream text-charcoal-muted leading-relaxed">
                <span className="font-bold text-charcoal block mb-0.5">Client Contact:</span>
                {selectedBooking.name} • {selectedBooking.phone} <br />
                {selectedBooking.address}, {selectedBooking.area}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-warm-border">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-warm-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSaveStatus}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Updates'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
