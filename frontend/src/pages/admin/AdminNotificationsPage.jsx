import React, { useState, useEffect } from 'react';
import { Bell, Check, Clock, CalendarCheck, MessageSquare } from 'lucide-react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

export const AdminNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = () => {
    setLoading(true);
    api.adminGetNotifications()
      .then(data => setNotifications(data))
      .catch(err => console.error('Error fetching notifications:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.adminMarkNotificationRead(id);
      fetchNotifs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
          ACTIVITY FEED
        </span>
        <h1 className="text-2xl font-extrabold text-charcoal">
          Notifications & Alerts
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-warm-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sm text-charcoal-muted">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center text-sm text-charcoal-muted">
            No notifications yet.
          </div>
        ) : (
          <div className="divide-y divide-warm-border/60">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                  n.read ? 'bg-white opacity-70' : 'bg-warm-cream/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${
                    n.type === 'booking' ? 'bg-brand-redLight text-brand-red' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {n.type === 'booking' ? <CalendarCheck className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-charcoal">{n.title}</h3>
                    <p className="text-xs text-charcoal-muted mt-0.5">{n.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-charcoal-subtle">
                      <span>{new Date(n.createdAt).toLocaleString()}</span>
                      {n.referenceId && (
                        <Link
                          to={n.type === 'booking' ? '/admin/bookings' : '/admin/enquiries'}
                          className="font-bold text-brand-brown hover:underline"
                        >
                          View Details ({n.referenceId})
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {!n.read && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="p-1.5 rounded-lg text-charcoal-muted hover:text-green-600 hover:bg-green-50 text-xs shrink-0"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
