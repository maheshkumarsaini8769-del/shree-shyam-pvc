import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { getImageByKey } from '../data/images';
import { useSettings } from '../context/SettingsContext';

export const ServicesPage = () => {
  const { settings } = useSettings();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceSubtitles = {
    'PVC Modular Kitchen': 'Waterproof, Modern & Durable with soft-close hardware',
    'PVC Wardrobe': 'Floor-to-ceiling custom sliding & hinged shutters with top lofts',
    'PVC Doors & Frames': 'Heavy-duty 100% waterproof bathroom & bedroom doors',
    'PVC Doors': 'Heavy-duty 100% waterproof bathroom & bedroom doors',
    'PVC Wall Panels & Ceilings': 'Fluted acoustic louvers & faux Italian marble cladding',
    'PVC Wall Panels': 'Fluted acoustic louvers & faux Italian marble cladding',
    'TV Unit & Entertainment Panels': 'Contemporary floating consoles with LED backlight cove',
    'TV Unit & Panels': 'Contemporary floating consoles with LED backlight cove',
    'Office & Commercial Interior': 'Modular workstation partitions & executive conference rooms',
    'Office Interior': 'Modular workstation partitions & executive conference rooms'
  };

  useEffect(() => {
    api.getServices()
      .then(data => setServices(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="text-center sm:text-left border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PORTFOLIO & SOLUTIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
          Our Interior Services
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-1.5 max-w-xl">
          Complete turn-key PVC fabrication using genuine virgin KAKA PVC profiles with 10-year warranty in Vastral & Ahmedabad.
        </p>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="text-center py-16 text-xs text-charcoal-muted dark:text-slate-400">
          Loading interior catalog...
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => {
            const img = getImageByKey(service.imageKey || service.id);
            const sub = serviceSubtitles[service.title] || service.category || 'High Quality PVC Fabrication';

            return (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-soft hover:shadow-elevated transition-all duration-300 gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Photo Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-white/10">
                    <img
                      src={img}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-luxury-goldDark dark:text-luxury-gold bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/20 uppercase">
                        KAKA PVC
                      </span>
                      <span className="text-xs font-bold text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">₹450 - ₹800 / sq. ft.</span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-obsidian dark:text-white group-hover:text-luxury-goldDark dark:group-hover:text-luxury-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-charcoal-muted dark:text-slate-400 mt-1 line-clamp-1 sm:line-clamp-2">
                      {sub}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-none border-slate-100 dark:border-white/10 shrink-0">
                  <span className="text-xs font-bold text-obsidian dark:text-white sm:hidden">
                    View Specifications
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-white/10 group-hover:bg-obsidian dark:group-hover:bg-luxury-gold group-hover:text-white dark:group-hover:text-obsidian text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5 stroke-[2]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Floating Free Consultation Bar */}
      <div className="pt-4">
        <div className="rounded-2xl bg-gradient-to-r from-obsidian via-charcoal to-obsidian text-white p-5 sm:p-6 shadow-elevated border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-luxury-gold text-obsidian flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                Book a Free Site Measurement & Consultation
              </h4>
              <p className="text-xs text-slate-300">
                Our specialist visits your home with real KAKA PVC swatches and catalogs.
              </p>
            </div>
          </div>

          <Link
            to="/book"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-luxury-gold hover:bg-amber-400 text-obsidian text-xs font-black text-center transition-all shadow-gold-glow shrink-0"
          >
            Book Free Visit
          </Link>
        </div>
      </div>
    </div>
  );
};
