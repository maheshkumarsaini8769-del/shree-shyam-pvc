import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  PhoneCall,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { api } from '../services/api';

export const ContactPage = () => {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'PVC Modular Kitchen',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedWaUrl, setSubmittedWaUrl] = useState(null);
  const [successNotice, setSuccessNotice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setSubmitting(true);

    const waMsg = 
`*New Enquiry from Website - Shree Shyam PVC Interior*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${formData.name}
📞 *Phone Number:* ${formData.phone}
🏠 *Service Interested:* ${formData.service}
${formData.message ? `💬 *Requirement:* ${formData.message}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━
_Sent via Shree Shyam PVC Website_`;

    const waUrl = `https://wa.me/918209836370?text=${encodeURIComponent(waMsg)}`;
    setSubmittedWaUrl(waUrl);

    try {
      await api.submitEnquiry(formData);
      setSuccessNotice('Your enquiry has been received! Our workshop engineer will contact you shortly.');

      // Automatically launch WhatsApp so owner receives lead immediately
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 800);

      setFormData({ name: '', phone: '', service: 'PVC Modular Kitchen', message: '' });
    } catch (err) {
      // Even if backend fails, still open WhatsApp lead
      window.open(waUrl, '_blank');
      setSuccessNotice('Redirecting to WhatsApp to send your enquiry directly to the workshop owner.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DIRECT CONNECT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
          Contact Our Workshop
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-1.5">
          Have queries about PVC modular kitchens or wall panels? We are ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          {/* Call Us */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 text-luxury-gold flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h3 className="font-serif font-bold text-sm text-obsidian dark:text-white">Call Directly</h3>
              <div className="space-y-0.5">
                <a href={`tel:${settings.phone1}`} className="block font-bold text-obsidian dark:text-luxury-goldLight hover:text-luxury-gold transition-colors text-sm">
                  {settings.phone1}
                </a>
                <a href={`tel:${settings.phone2}`} className="block font-bold text-obsidian dark:text-luxury-goldLight hover:text-luxury-gold transition-colors text-sm">
                  {settings.phone2}
                </a>
              </div>
              <p className="text-[10px] text-slate-400">Available 9:00 AM - 8:30 PM (Mon - Sat)</p>
            </div>
          </div>

          {/* WhatsApp Direct */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-white" />
            </div>
            <div className="text-xs space-y-1">
              <h3 className="font-serif font-bold text-sm text-obsidian dark:text-white">WhatsApp Consultation</h3>
              <p className="text-charcoal-muted dark:text-slate-400 text-xs">
                Send your room dimensions or photos for an instant estimate.
              </p>
              <a
                href="https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20want%20to%20inquire%20about%20interior%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
              >
                Chat on WhatsApp (+91 8209836370) →
              </a>
            </div>
          </div>

          {/* Workshop Address */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 text-luxury-gold flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h3 className="font-serif font-bold text-sm text-obsidian dark:text-white">Workshop & Showroom</h3>
              <p className="text-charcoal dark:text-slate-300 leading-relaxed">
                {settings.address || 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad'}
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 text-luxury-gold flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h3 className="font-serif font-bold text-sm text-obsidian dark:text-white">Working Hours</h3>
              <p className="text-charcoal dark:text-slate-300 font-medium">Monday - Saturday: 9:00 AM - 8:30 PM</p>
              <p className="text-slate-400">Sunday: Closed for factory maintenance</p>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-elevated">
          <h2 className="font-serif font-bold text-xl text-obsidian dark:text-white mb-1">
            Send Us a Message
          </h2>
          <p className="text-xs text-charcoal-muted dark:text-slate-400 mb-6">
            Leave your contact details and our fabrication engineer will get back to you within 2 hours.
          </p>

          {successNotice ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 space-y-3.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-bold text-sm">Enquiry Sent Successfully!</span>
              </div>
              <p className="text-xs leading-relaxed">{successNotice}</p>
              
              {submittedWaUrl && (
                <a
                  href={submittedWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp to Confirm Lead With Workshop</span>
                </a>
              )}

              <button
                onClick={() => setSuccessNotice(null)}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 underline block pt-1"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                  Service Interested In
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold"
                >
                  <option>PVC Modular Kitchen</option>
                  <option>PVC Wardrobe Solutions</option>
                  <option>PVC Waterproof Doors</option>
                  <option>PVC Wall Panels & Ceilings</option>
                  <option>TV Unit & Louver Panels</option>
                  <option>Office Interior & Workstations</option>
                  <option>Full Home Interior Consultation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                  Your Message or Requirements (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe your room dimensions, location in Ahmedabad, or preferred designs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-obsidian hover:bg-charcoal dark:bg-luxury-gold dark:hover:bg-luxury-goldDark text-white dark:text-obsidian text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-luxury-gold dark:text-obsidian" />
                <span className="font-bold">{submitting ? 'Sending Request...' : 'Submit Enquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
