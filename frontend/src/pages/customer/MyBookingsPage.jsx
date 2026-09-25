import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ClipboardList,
  AlertCircle,
  UserCheck
} from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const MyBookingsPage = () => {
  const { user } = useAuth();
  const [phoneSearch, setPhoneSearch] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  const fetchBookings = (phone) => {
    setLoading(true);
    setErrorNotice(null);
    api.getMyBookings(phone)
      .then(data => {
        setBookings(data);
        setSearched(true);
      })
      .catch(err => {
        setErrorNotice(err.message || 'Error finding bookings');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user && user.phone) {
      fetchBookings(user.phone);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!phoneSearch.trim()) return;
    fetchBookings(phoneSearch);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
          CUSTOMER PORTAL
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal">
          Track My Bookings & Visits
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted">
          Check live consultation progress, scheduled visit dates, and technician updates.
        </p>
      </div>

      {/* Guest Phone Search or Logged in User Bar */}
      {user ? (
        <div className="p-4 rounded-2xl bg-white border border-warm-border shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warm-cream flex items-center justify-center text-charcoal font-bold text-sm">
              <UserCheck className="w-5 h-5 text-brand-brown" />
            </div>
            <div>
              <p className="font-bold text-sm text-charcoal">{user.name}</p>
              <p className="text-xs text-charcoal-muted">+91 {user.phone}</p>
            </div>
          </div>
          <button
            onClick={() => fetchBookings(user.phone)}
            className="text-xs font-bold text-brand-red hover:underline"
          >
            Refresh List
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 border border-warm-border shadow-soft space-y-4">
          <p className="text-xs text-charcoal-muted font-medium">
            Enter your registered 10-digit mobile number below to retrieve all your site visit requests:
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-charcoal-muted">+91</span>
              <input
                type="tel"
                maxLength={10}
                required
                placeholder="Enter 10-digit mobile number"
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-warm-border bg-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Searching...' : 'Find Requests'}</span>
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-charcoal-muted pt-2 border-t border-warm-border">
            <span>Have an account?</span>
            <Link to="/login" className="font-bold text-brand-brown hover:text-brand-red transition-colors">
              Log in to your account
            </Link>
          </div>
        </div>
      )}

      {errorNotice && (
        <div className="p-4 rounded-xl bg-red-50 text-brand-red text-xs font-semibold flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-sm text-charcoal-muted">
            Searching for your bookings...
          </div>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-warm-border shadow-soft space-y-4 hover:shadow-elevated transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-border/60 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted block">
                    ID: <span className="font-mono text-brand-red font-bold">{booking.bookingId}</span>
                  </span>
                  <h3 className="font-bold text-base text-charcoal mt-0.5">
                    {booking.serviceName}
                  </h3>
                </div>

                <div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    booking.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : booking.status === 'Cancelled'
                      ? 'bg-red-100 text-brand-red'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-muted">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>Preferred: <strong className="text-charcoal">{booking.preferredDate}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>Slot: <strong className="text-charcoal">{booking.preferredTime}</strong></span>
                </div>
                <div className="sm:col-span-2 flex items-start gap-2 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0 mt-0.5" />
                  <span className="truncate">{booking.address}, {booking.area}, {booking.city}</span>
                </div>
              </div>

              {booking.adminNotes && (
                <div className="p-3 rounded-xl bg-warm-cream border border-warm-border text-xs">
                  <span className="font-bold text-charcoal block">Workshop Note:</span>
                  <p className="text-charcoal-muted mt-0.5">{booking.adminNotes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-warm-border/60">
                <span className="text-[11px] text-charcoal-muted">
                  Booked on {new Date(booking.createdAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/booking/${booking.bookingId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  <span>Track Full Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        ) : searched ? (
          <div className="p-8 rounded-2xl bg-white border border-warm-border text-center space-y-3">
            <ClipboardList className="w-10 h-10 text-charcoal-muted/30 mx-auto" />
            <h3 className="font-bold text-sm text-charcoal">No bookings found for this phone number</h3>
            <p className="text-xs text-charcoal-muted">
              Ready to schedule a free site visit in Vastral or nearby?
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover transition-colors mt-2"
            >
              <span>Book Free Visit Now</span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};
