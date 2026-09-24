import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  ExternalLink,
  Calendar,
  Clock,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { Link } from 'react-router-dom';

export const LocationPage = () => {
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(settings.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EXPERIENCE CENTER & WORKSHOP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
          Location & Directions
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-1.5">
          Visit our manufacturing workshop and material showcase in Vastral, Ahmedabad.
        </p>
      </div>

      {/* Main Location Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-elevated space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-5">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-obsidian dark:bg-slate-800 text-luxury-gold flex items-center justify-center shrink-0 border border-transparent dark:border-white/10">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-obsidian dark:text-white">
                Shree Shyam PVC Interior Workshop
              </h2>
              <address className="not-italic text-xs sm:text-sm text-charcoal-muted dark:text-slate-300 leading-relaxed mt-0.5 max-w-md">
                {settings.address}
              </address>
              <p className="text-[11px] text-slate-400 mt-1">
                Landmark: Near Ashutosh Tenament &amp; Moti Canal Road
              </p>
              <p className="text-[11px] text-stone-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                <span>{settings.workingHours || 'Mon - Sun: 9:00 AM - 9:00 PM'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAddress}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-obsidian dark:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-luxury-gold" />}
            <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={settings.googleMapsDirectionsUrl || settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-obsidian hover:bg-charcoal dark:bg-luxury-gold dark:hover:bg-luxury-goldDark text-white dark:text-obsidian text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all group"
          >
            <Navigation className="w-4 h-4 text-luxury-gold dark:text-obsidian group-hover:scale-110 transition-transform" />
            <span>Open Google Maps</span>
          </a>

          <a
            href={`tel:${settings.phone1}`}
            className="py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-obsidian dark:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-luxury-gold" />
            <span>Call Workshop</span>
          </a>

          <a
            href={`https://wa.me/${(settings.whatsappNumber || settings.phone1 || '918209836370').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.defaultWhatsAppMessage ? settings.defaultWhatsAppMessage() : 'Hello Shree Shyam PVC Interior, I want to visit your workshop')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Location</span>
          </a>
        </div>

        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 h-80 sm:h-96 relative bg-slate-100 dark:bg-slate-800 shadow-soft">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14690.697415494639!2d72.6456381!3d23.0000452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a26f634351%3A0x2a3e5c9472e39951!2sVastral%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Service Coverage Areas (Driven dynamically from Admin settings) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-elevated space-y-4">
        <div className="flex items-center gap-2 text-luxury-gold">
          <MapPin className="w-5 h-5" />
          <h3 className="font-serif font-bold text-base sm:text-lg text-obsidian dark:text-white">
            Areas We Serve Across Ahmedabad &amp; Gujarat
          </h3>
        </div>
        <p className="text-xs text-charcoal-muted dark:text-slate-400">
          We provide complimentary on-site laser measurements, free material estimates, and doorstep fabrication across the following locations:
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {(settings.serviceLocations || ['Vastral', 'Maninagar', 'Nikol', 'Naroda', 'Bopal', 'SG Highway', 'Satellite', 'Chandkheda', 'Gota', 'Odhav']).map((loc, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-obsidian dark:text-stone-200 flex items-center gap-1.5 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{loc}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
