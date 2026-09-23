import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  AlertCircle,
  ArrowLeft,
  XCircle,
  Wrench,
  MessageSquare
} from 'lucide-react';
import { api } from '../services/api';
import { useSettings } from '../context/SettingsContext';

export const BookingTrackPage = () => {
  const { id } = useParams();
  const { settings } = useSettings();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getBookingTrack(id)
      .then(data => {
        setBooking(data);
      })
      .catch(err => {
        setError(err.message || 'Booking not found');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const timelineSteps = [
    { key: 'Pending', label: 'Booking Request Submitted', desc: 'Received online by Shree Shyam PVC Interior' },
    { key: 'Confirmed', label: 'Booking Confirmed', desc: 'Our specialist spoke with you and confirmed visit details' },
    { key: 'Site Visit Scheduled', label: 'Site Visit Scheduled', desc: 'Fabricator arrives for accurate measurements & profile catalog review' },
    { key: 'In Discussion', label: 'Design & Quotation', desc: 'Finalizing layouts, colors, and quotation' },
    { key: 'Work Started', label: 'Fabrication & Installation', desc: 'Precision manufacturing using KAKA PVC profiles' },
    { key: 'Completed', label: 'Project Completed', desc: 'Installed, cleaned, and handed over' }
  ];

  const getStepIndex = (status) => {
    if (status === 'Cancelled') return -1;
    return timelineSteps.findIndex(s => s.key === status);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-charcoal-muted text-sm">Loading booking details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-brand-red flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-charcoal">Booking Not Found</h2>
        <p className="text-xs text-charcoal-muted">
          We could not find any booking associated with ID "{id}". Please verify your reference number.
        </p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Book A Visit</span>
        </Link>
      </div>
    );
  }

  const currentStepIdx = getStepIndex(booking.status);
  const isCancelled = booking.status === 'Cancelled';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 md:py-12 space-y-6 pb-24">
      {/* Top Navigation */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted dark:text-slate-400 hover:text-obsidian dark:hover:text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
      </div>

      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted dark:text-slate-400">
              Live Booking Status
            </span>
            <h1 className="text-2xl font-serif font-bold text-obsidian dark:text-white mt-0.5">
              {booking.serviceName}
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold text-charcoal-muted dark:text-slate-400 uppercase tracking-wider block">
              Reference ID
            </span>
            <span className="font-mono font-extrabold text-luxury-goldDark dark:text-luxury-gold text-lg">
              {booking.bookingId}
            </span>
          </div>
        </div>

        {/* Current Status Pill */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
          <span className="text-xs text-charcoal-muted dark:text-slate-400 font-medium">Status</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            isCancelled
              ? 'bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50'
              : booking.status === 'Completed'
              ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
          }`}>
            {booking.status}
          </span>
        </div>

        {/* Scheduled info if exists */}
        {(booking.scheduledDate || booking.scheduledTime) && (
          <div className="p-3.5 rounded-xl bg-luxury-goldLight/20 dark:bg-slate-800 border border-luxury-gold/30 text-xs flex items-center gap-3">
            <Clock className="w-4 h-4 text-luxury-goldDark dark:text-luxury-gold shrink-0" />
            <div>
              <span className="font-bold text-obsidian dark:text-white">Confirmed Visit Slot: </span>
              <span className="text-charcoal-muted dark:text-slate-300 font-medium">
                {booking.scheduledDate} {booking.scheduledTime ? `(${booking.scheduledTime})` : ''}
              </span>
            </div>
          </div>
        )}

        {/* Admin Notes if provided */}
        {booking.adminNotes && (
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-xs space-y-1">
            <span className="font-bold text-obsidian dark:text-white block">Update from Workshop:</span>
            <p className="text-charcoal-muted dark:text-slate-300">{booking.adminNotes}</p>
          </div>
        )}
      </div>

      {/* Vertical Timeline (Mobile First) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-soft space-y-6">
        <h2 className="text-lg font-serif font-bold text-obsidian dark:text-white">
          Progress Timeline
        </h2>

        {isCancelled ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-start gap-3 text-xs text-red-600 dark:text-red-400">
            <XCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold text-sm">Booking Request Cancelled</p>
              <p className="mt-0.5">This booking was cancelled. Feel free to contact our office to reschedule.</p>
            </div>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {timelineSteps.map((step, idx) => {
              const isPast = currentStepIdx > idx;
              const isCurrent = currentStepIdx === idx;

              return (
                <div key={step.key} className="relative flex items-start gap-4">
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-luxury-gold text-obsidian shadow-sm font-black'
                        : isCurrent
                        ? 'bg-obsidian dark:bg-white text-white dark:text-obsidian ring-4 ring-luxury-gold/30 shadow-soft'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-obsidian" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Description */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold leading-tight ${
                      isCurrent ? 'text-obsidian dark:text-white' : isPast ? 'text-luxury-goldDark dark:text-luxury-gold' : 'text-slate-400 dark:text-slate-600'
                    }`}>
                      {step.label}
                    </h3>
                    <p className="text-xs text-charcoal-muted dark:text-slate-400 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Customer & Address Details */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-soft text-xs space-y-3">
        <h3 className="font-serif font-bold text-obsidian dark:text-white text-sm">Site & Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-charcoal-muted dark:text-slate-400 block">Client Name</span>
            <span className="font-bold text-obsidian dark:text-white">{booking.name}</span>
          </div>
          <div>
            <span className="text-charcoal-muted dark:text-slate-400 block">Mobile Number</span>
            <span className="font-bold text-obsidian dark:text-white">{booking.phone}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-charcoal-muted dark:text-slate-400 block">Site Address</span>
            <span className="font-medium text-obsidian dark:text-white">
              {booking.address}, {booking.area}, {booking.city} {booking.pincode ? `- ${booking.pincode}` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Help Contacts */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${settings.phone1}`}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-xs font-semibold text-obsidian dark:text-white shadow-sm transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Call Office</span>
        </a>
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
            `Hello Shree Shyam PVC Interior, I am inquiring regarding booking status for ID ${booking.bookingId}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
};
