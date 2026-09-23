import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Users,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminGetDashboardStats()
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching dashboard stats:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-charcoal-muted text-sm">
        Loading admin metrics...
      </div>
    );
  }

  const metrics = stats?.metrics || {
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    todaysVisits: 0,
    completed: 0,
    newEnquiries: 0
  };

  const statCards = [
    { label: 'Total Bookings', value: metrics.totalBookings, color: 'text-charcoal', bg: 'bg-warm-cream' },
    { label: 'Pending Requests', value: metrics.pending, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Confirmed Visits', value: metrics.confirmed, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: "Today's Visits", value: metrics.todaysVisits, color: 'text-brand-red', bg: 'bg-brand-redLight' },
    { label: 'Completed Jobs', value: metrics.completed, color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'New Enquiries', value: metrics.newEnquiries, color: 'text-purple-700', bg: 'bg-purple-50' }
  ];

  const statusCounts = stats?.statusCounts || {};

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            OPERATIONAL OVERVIEW
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/bookings"
            className="px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover transition-colors shadow-soft"
          >
            Manage Bookings
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black transition-colors"
          >
            View Enquiries
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid (Section 33) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((c, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl border border-warm-border shadow-soft ${c.bg} flex flex-col justify-between`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              {c.label}
            </span>
            <span className={`text-3xl font-extrabold mt-3 ${c.color}`}>
              {c.value}
            </span>
          </div>
        ))}
      </div>

      {/* Status Distribution Chart / Progress Bars */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-border shadow-soft space-y-4">
        <h2 className="text-lg font-bold text-charcoal">
          Booking Status Distribution
        </h2>
        <div className="space-y-3">
          {Object.entries(statusCounts).map(([status, count]) => {
            const percentage = metrics.totalBookings > 0 ? Math.round((count / metrics.totalBookings) * 100) : 0;
            return (
              <div key={status} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-charcoal">{status}</span>
                  <span className="text-charcoal-muted font-mono">{count} ({percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-warm-cream overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      status === 'Completed'
                        ? 'bg-green-600'
                        : status === 'Cancelled'
                        ? 'bg-red-500'
                        : status === 'Pending'
                        ? 'bg-amber-500'
                        : 'bg-brand-red'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings & Enquiries Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-3xl p-6 border border-warm-border shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-warm-border pb-3">
            <h3 className="font-bold text-base text-charcoal">
              Recent Site Visit Requests
            </h3>
            <Link
              to="/admin/bookings"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentBookings?.length === 0 ? (
              <p className="text-xs text-charcoal-muted py-4 text-center">No bookings recorded yet.</p>
            ) : (
              stats?.recentBookings?.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl bg-warm-white border border-warm-border flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-charcoal truncate">{b.name}</span>
                      <span className="font-mono text-brand-red font-semibold">{b.bookingId}</span>
                    </div>
                    <p className="text-charcoal-muted truncate mt-0.5">
                      {b.serviceName} • {b.preferredDate}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      b.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : b.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-3xl p-6 border border-warm-border shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-warm-border pb-3">
            <h3 className="font-bold text-base text-charcoal">
              Recent General Enquiries
            </h3>
            <Link
              to="/admin/enquiries"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>All Enquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.recentEnquiries?.length === 0 ? (
              <p className="text-xs text-charcoal-muted py-4 text-center">No enquiries received yet.</p>
            ) : (
              stats?.recentEnquiries?.map((e) => (
                <div
                  key={e.id}
                  className="p-3.5 rounded-xl bg-warm-white border border-warm-border flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-charcoal truncate">{e.name}</span>
                      <span className="text-charcoal-muted truncate">({e.phone})</span>
                    </div>
                    <p className="text-charcoal-muted truncate mt-0.5">
                      {e.service}
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                    e.status === 'New' ? 'bg-purple-100 text-purple-700' : 'bg-warm-cream text-charcoal'
                  }`}>
                    {e.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
