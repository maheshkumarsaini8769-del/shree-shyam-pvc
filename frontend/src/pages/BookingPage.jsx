import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Navigation,
  MessageCircle,
  PhoneCall,
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useSettings } from '../context/SettingsContext';

export const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service') || '';
  const { settings } = useSettings();

  const [services, setServices] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoNotice, setGeoNotice] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    serviceId: initialServiceId,
    serviceName: 'PVC Modular Kitchen',
    name: '',
    phone: '',
    preferredDate: '',
    preferredTime: '10:00 AM - 01:00 PM',
    city: 'Ahmedabad',
    area: 'Vastral',
    address: 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad.',
    landmark: 'Opp. Ashutosh Tenament',
    pincode: '382418',
    latitude: 23.0000,
    longitude: 72.6456,
    message: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.getServices().then(data => {
      setServices(data);
      if (initialServiceId) {
        const found = data.find(s => s.id === initialServiceId || s.slug === initialServiceId);
        if (found) {
          setFormData(prev => ({
            ...prev,
            serviceId: found.id,
            serviceName: found.title
          }));
        }
      }
    });
  }, [initialServiceId]);

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) errs.phone = 'Valid 10-digit mobile number is required';
    if (!formData.preferredDate) errs.preferredDate = 'Select visit date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.address.trim()) errs.address = 'Address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoNotice('Geolocation not supported. Please select manually below.');
      return;
    }
    setGeoLoading(true);
    setGeoNotice(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          address: prev.address || `GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
        }));
        setGeoNotice('Location pinned! You can refine your street/flat details below.');
        setGeoLoading(false);
      },
      () => {
        setGeoNotice('Location permission denied. Please select area manually.');
        setGeoLoading(false);
      },
      { timeout: 8000 }
    );
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await api.createBooking(formData);
      if (res.success && res.booking) {
        setConfirmedBooking(res.booking);

        const waMsg = 
`*New Site Visit Booking Request - Shree Shyam PVC Interior*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Booking ID:* ${res.booking.bookingId}
👤 *Customer Name:* ${formData.name}
📞 *Contact Number:* ${formData.phone}
🏠 *Service:* ${formData.serviceName}
📅 *Preferred Date:* ${formData.preferredDate}
⏰ *Time Slot:* ${formData.preferredTime}
📍 *Address:* ${formData.address}
📌 *Area / City:* ${formData.area || 'Vastral'}, ${formData.city || 'Ahmedabad'} (Pincode: ${formData.pincode || '382418'})
${formData.landmark ? `🏢 *Landmark:* ${formData.landmark}\n` : ''}${formData.message ? `💬 *Requirement:* ${formData.message}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━
_Lead from Shree Shyam PVC Website_`;

        const waUrl = `https://wa.me/918209836370?text=${encodeURIComponent(waMsg)}`;

        // Auto-open WhatsApp after 1 second
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1200);

        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      } else {
        throw new Error('Could not submit booking');
      }
    } catch (err) {
      setSubmitError(err.message || 'Error creating booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirmation screen with instant WhatsApp lead dispatch
  if (confirmedBooking) {
    const waMsg = 
`*New Site Visit Booking Request - Shree Shyam PVC Interior*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Booking ID:* ${confirmedBooking.bookingId}
👤 *Customer Name:* ${confirmedBooking.name}
📞 *Contact Number:* ${confirmedBooking.phone}
🏠 *Service:* ${confirmedBooking.serviceName || formData.serviceName}
📅 *Preferred Date:* ${confirmedBooking.preferredDate || formData.preferredDate}
⏰ *Time Slot:* ${confirmedBooking.preferredTime || formData.preferredTime}
📍 *Address:* ${confirmedBooking.address || formData.address}
📌 *Area / City:* ${formData.area || 'Vastral'}, ${formData.city || 'Ahmedabad'} (Pincode: ${formData.pincode || '382418'})
${formData.landmark ? `🏢 *Landmark:* ${formData.landmark}\n` : ''}${formData.message ? `💬 *Requirement:* ${formData.message}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━
_Lead from Shree Shyam PVC Website_`;

    const waUrl = `https://wa.me/918209836370?text=${encodeURIComponent(waMsg)}`;

    return (
      <div className="max-w-xl mx-auto px-4 py-8 md:py-14 text-center space-y-6 animate-fade-in-up">
        <div className="bg-white dark:bg-[#1A1918] rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-white/10 shadow-floating space-y-6">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
              Request Received • Free Site Visit
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-obsidian dark:text-white mt-3">
              Booking Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
              Thank you, <strong className="text-obsidian dark:text-white">{confirmedBooking.name}</strong>. Our specialist engineer will contact you on <strong className="text-obsidian dark:text-white">{confirmedBooking.phone}</strong>.
            </p>
          </div>

          {/* Reference ID Pill */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-left space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              Reference Booking Tracking ID
            </span>
            <span className="text-2xl font-mono font-black text-luxury-goldDark dark:text-luxury-gold">
              {confirmedBooking.bookingId}
            </span>
          </div>

          {/* INSTANT WHATSAPP ALERT BUTTON TO OWNER (HIGH PRIORITY) */}
          <div className="space-y-2 pt-1">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95 group"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send to WhatsApp (Instant 15-Min Confirmation)</span>
            </a>
            <p className="text-[10px] text-stone-500 dark:text-stone-400">
              ⚡ Directly connects with workshop owner in Vastral, Ahmedabad
            </p>
          </div>

          {/* Secondary Action Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-100 dark:border-white/10">
            <Link
              to={`/booking/${confirmedBooking.bookingId}`}
              className="py-3 px-4 rounded-xl bg-stone-900 dark:bg-white/10 hover:bg-black dark:hover:bg-white/15 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              Track Live Status
            </Link>
            <Link
              to="/"
              className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 text-stone-800 dark:text-white text-xs font-bold border border-stone-200 dark:border-white/10 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 pb-24 animate-fade-in-up">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ZERO ADVANCE BOOKING</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-obsidian dark:text-white">
          {currentStep === 3 ? 'Select Your Location' : 'Book Free Site Visit'}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-1">
          {currentStep === 3
            ? 'Select your Ahmedabad address for free laser measurement & material samples.'
            : 'Fill in your requirements and our interior fabrication team will visit with swatches.'}
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between py-2 px-1">
        {[
          { num: 1, label: 'Service' },
          { num: 2, label: 'Details' },
          { num: 3, label: 'Location' },
          { num: 4, label: 'Confirm' }
        ].map((st) => (
          <div key={st.num} className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === st.num
                  ? 'bg-obsidian dark:bg-black text-luxury-gold border-2 border-luxury-gold shadow-md scale-105'
                  : currentStep > st.num
                  ? 'bg-luxury-gold text-obsidian font-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-white/10'
              }`}
            >
              {st.num}
            </div>
            <span className={`text-[11px] mt-1 font-semibold ${
              currentStep === st.num ? 'text-obsidian dark:text-white font-bold' : 'text-slate-400'
            }`}>
              {st.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: Select Service */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-soft space-y-4">
          <label className="block text-xs font-bold text-obsidian dark:text-white uppercase tracking-wider">
            Select Interior Category *
          </label>
          <div className="space-y-3">
            {services.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setFormData({ ...formData, serviceId: s.id, serviceName: s.title });
                  setCurrentStep(2);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all duration-200 ${
                  formData.serviceId === s.id
                    ? 'border-obsidian dark:border-luxury-gold bg-slate-50 dark:bg-slate-800/80 shadow-soft ring-1 ring-luxury-gold'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div>
                  <h4 className="font-serif font-bold text-sm text-obsidian dark:text-white">{s.title}</h4>
                  <p className="text-xs text-charcoal-muted dark:text-slate-400 mt-0.5">{s.shortDesc || s.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  formData.serviceId === s.id ? 'border-luxury-gold bg-obsidian dark:bg-black' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {formData.serviceId === s.id && <span className="w-2 h-2 rounded-full bg-luxury-gold" />}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-xl bg-obsidian hover:bg-charcoal dark:bg-luxury-gold dark:hover:bg-luxury-goldDark text-white dark:text-obsidian text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span className="text-luxury-goldLight dark:text-obsidian font-bold">Next Step</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold dark:text-obsidian" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Details */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-soft space-y-4 text-xs">
          <div>
            <label className="block font-bold text-obsidian dark:text-white uppercase tracking-wider mb-1">
              Selected Service
            </label>
            <select
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 font-semibold text-obsidian dark:text-white"
            >
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-obsidian dark:text-white uppercase tracking-wider mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Patel"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-3 rounded-xl border bg-white dark:bg-slate-800 text-obsidian dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 ${
                errors.name ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
              }`}
            />
          </div>

          <div>
            <label className="block font-bold text-obsidian dark:text-white uppercase tracking-wider mb-1">
              Mobile Phone Number (WhatsApp) *
            </label>
            <div className="flex">
              <span className="p-3 bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-white/10 rounded-l-xl font-bold text-obsidian dark:text-white">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                className={`w-full p-3 rounded-r-xl border border-l-0 bg-white dark:bg-slate-800 text-obsidian dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 ${
                  errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-white/10'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-obsidian dark:text-white uppercase tracking-wider mb-1">
                Preferred Visit Date *
              </label>
              <input
                type="date"
                min={getMinDate()}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
              />
            </div>

            <div>
              <label className="block font-bold text-obsidian dark:text-white uppercase tracking-wider mb-1">
                Preferred Time Slot *
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
              >
                <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                <option value="04:00 PM - 07:00 PM">Evening (04:00 PM - 07:00 PM)</option>
                <option value="07:00 PM - 08:30 PM">Late Evening (07:00 PM - 08:30 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-obsidian dark:text-white uppercase tracking-wider mb-1">
              Special Requirements or Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Need modular kitchen design with chimney space, or fluted TV unit..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 resize-none placeholder-slate-400"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              onClick={handleBack}
              className="px-4 py-2 text-xs font-semibold text-charcoal-muted dark:text-slate-400 hover:text-obsidian dark:hover:text-white"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-xl bg-obsidian hover:bg-charcoal dark:bg-luxury-gold dark:hover:bg-luxury-goldDark text-white dark:text-obsidian text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span className="text-luxury-goldLight dark:text-obsidian font-bold">Next Step</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold dark:text-obsidian" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Location */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-soft space-y-4 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search area, society in Ahmedabad..."
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-obsidian dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 placeholder-slate-400"
            />
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 relative h-48 bg-slate-100 dark:bg-slate-800">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14690.697415494639!2d72.6456381!3d23.0000452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a26f634351%3A0x2a3e5c9472e39951!2sVastral%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-md flex items-center gap-2">
              <MapPin className="w-5 h-5 text-luxury-gold shrink-0 animate-bounce" />
              <div className="text-[11px] leading-tight text-obsidian dark:text-white truncate">
                <span className="font-bold block">Yogeshwar Residency, Opp. Ashutosh Tenament</span>
                <span className="text-charcoal-muted dark:text-slate-400">Moti Canal Road, Vastral, Ahmedabad</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={geoLoading}
            className="w-full py-3 rounded-xl border border-obsidian dark:border-white/20 text-obsidian dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 text-luxury-gold" />
            <span>{geoLoading ? 'Detecting GPS...' : 'Use Current Device Location'}</span>
          </button>
          {geoNotice && <p className="text-[11px] text-emerald-700 dark:text-emerald-400 text-center font-medium">{geoNotice}</p>}

          <div className="pt-2 space-y-3">
            <span className="block font-bold text-obsidian dark:text-white uppercase tracking-wider text-[11px]">
              Or Select Manually
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-charcoal-muted dark:text-slate-400 font-bold mb-1">Select City</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white"
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-charcoal-muted dark:text-slate-400 font-bold mb-1">Select Area</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white"
                >
                  <option value="Vastral">Vastral</option>
                  <option value="Odhav">Odhav</option>
                  <option value="Nikol">Nikol</option>
                  <option value="Maninagar">Maninagar</option>
                  <option value="Naroda">Naroda</option>
                  <option value="C.G. Road">C.G. Road</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-charcoal-muted dark:text-slate-400 font-bold mb-1">House / Flat / Society Address</label>
              <input
                type="text"
                placeholder="e.g. Flat B-202, Suryam Elegance"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/10">
            <button onClick={handleBack} className="px-4 py-2 text-xs font-semibold text-charcoal-muted dark:text-slate-400 hover:text-obsidian dark:hover:text-white">Back</button>
            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-xl bg-obsidian hover:bg-charcoal dark:bg-luxury-gold dark:hover:bg-luxury-goldDark text-white dark:text-obsidian text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span className="text-luxury-goldLight dark:text-obsidian font-bold">Next Step</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold dark:text-obsidian" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Confirm Booking */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-soft space-y-4 text-xs">
          <h3 className="font-serif font-bold text-lg text-obsidian dark:text-white">Review & Confirm Site Visit</h3>

          {submitError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-900/50">
              {submitError}
            </div>
          )}

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 space-y-2.5">
            <div className="flex justify-between border-b border-slate-200/80 dark:border-white/10 pb-2">
              <span className="text-charcoal-muted dark:text-slate-400">Interior Service:</span>
              <span className="font-bold text-obsidian dark:text-white">{formData.serviceName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 dark:border-white/10 pb-2">
              <span className="text-charcoal-muted dark:text-slate-400">Client Name:</span>
              <span className="font-bold text-obsidian dark:text-white">{formData.name} ({formData.phone})</span>
            </div>
            <div className="flex justify-between border-b border-slate-200/80 dark:border-white/10 pb-2">
              <span className="text-charcoal-muted dark:text-slate-400">Scheduled Visit:</span>
              <span className="font-bold text-obsidian dark:text-white">{formData.preferredDate} ({formData.preferredTime})</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-charcoal-muted dark:text-slate-400">Address:</span>
              <span className="font-bold text-obsidian dark:text-white text-right truncate max-w-[220px]">{formData.address}, {formData.area}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[11px] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>100% Free Consultation. No payment or deposit required.</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/10">
            <button onClick={handleBack} disabled={isSubmitting} className="px-4 py-2 text-xs font-semibold text-charcoal-muted dark:text-slate-400 hover:text-obsidian dark:hover:text-white">Back</button>
            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-obsidian to-charcoal hover:from-black hover:to-obsidian dark:from-luxury-gold dark:to-luxury-goldDark text-white dark:text-obsidian text-xs font-black shadow-elevated transition-all active:scale-95 animate-shimmer"
            >
              <span className="text-luxury-goldLight dark:text-obsidian">{isSubmitting ? 'Confirming Visit...' : 'Confirm Free Site Visit'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
