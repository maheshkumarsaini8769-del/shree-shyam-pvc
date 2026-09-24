import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  Share2,
  Droplets,
  BugOff,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle
} from 'lucide-react';
import { api } from '../services/api';
import { images, getImageByKey } from '../data/images';
import { useSettings } from '../context/SettingsContext';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Italian Marble');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getServiceBySlug(slug)
      .then(data => {
        setService(data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center text-xs text-charcoal-muted dark:text-slate-400">
        Loading interior details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-obsidian dark:text-white">Service Not Found</h2>
        <Link to="/services" className="px-5 py-2.5 rounded-xl bg-obsidian dark:bg-white/10 text-white text-xs font-bold inline-block">
          Return to All Services
        </Link>
      </div>
    );
  }

  const serviceTitle = service.name || service.title || 'PVC Interior Solution';
  const mainPhoto = getImageByKey(service.image || service.imageKey || service.slug || service.name);

  const photoSet = [
    mainPhoto,
    images.kitchen2,
    images.wardrobe,
    images.tvUnit
  ];

  const colorSwatches = [
    { name: 'Italian Marble', bg: '#DFE7EA', border: '#B8C6CA' },
    { name: 'Pure White Gloss', bg: '#FFFFFF', border: '#CBD5E1' },
    { name: 'Natural Teak Wood', bg: '#8B5A2B', border: '#6D441D' },
    { name: 'Charcoal Matte', bg: '#1E293B', border: '#0F172A' },
    { name: 'Warm Cream Satin', bg: '#F5EBE1', border: '#E2D5C7' }
  ];

  const featureBadges = [
    { label: '100% Waterproof', icon: Droplets },
    { label: 'Termite Proof', icon: BugOff },
    { label: 'Easy to Clean', icon: Sparkles },
    { label: '10-Yr Guarantee', icon: ShieldCheck }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-28">
      {/* Top Bar: Back, Title, Share */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-obsidian dark:hover:text-white p-1 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          <span>Back to Services</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-obsidian dark:text-white transition-colors"
            aria-label="Add to favorites"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: service.title,
                  url: window.location.href
                }).catch(() => {});
              }
            }}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-obsidian dark:text-white transition-colors"
            aria-label="Share service"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo Gallery */}
        <div className="lg:col-span-7 space-y-3">
          {/* Main Display Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-soft">
            <img
              src={photoSet[selectedPhotoIndex] || photoSet[0]}
              alt={serviceTitle}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-obsidian/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
              KAKA PVC PROFILE
            </div>
          </div>

          {/* 4 Thumbnails Carousel */}
          <div className="grid grid-cols-4 gap-2.5">
            {photoSet.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                  selectedPhotoIndex === index
                    ? 'border-luxury-gold shadow-md scale-95'
                    : 'border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {featureBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-center gap-1.5 shadow-soft"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 text-luxury-gold flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-obsidian dark:text-white leading-tight">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Service Details & Booking Action */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-luxury-gold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM ARCHITECTURAL FABRICATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-obsidian dark:text-white">
              {serviceTitle}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-2 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-luxury-goldDark dark:text-luxury-gold uppercase tracking-wider block">
                Turnkey Verified Pricing
              </span>
              <span className="text-2xl font-serif font-black text-obsidian dark:text-white">
                ₹450 - ₹800
              </span>
              <span className="text-xs text-charcoal-muted dark:text-slate-400 ml-1">/ sq. ft.</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
              Free Site Visit
            </span>
          </div>

          {/* Color & Finish Swatches */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-obsidian dark:text-white uppercase tracking-wider">
                Available PVC Finishes:
              </label>
              <span className="text-xs font-bold text-luxury-goldDark dark:text-luxury-gold">
                {selectedColor}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {colorSwatches.map((swatch) => {
                const isSelected = selectedColor === swatch.name;
                return (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedColor(swatch.name)}
                    title={swatch.name}
                    style={{ backgroundColor: swatch.bg, borderColor: swatch.border }}
                    className={`w-9 h-9 rounded-full border-2 transition-all relative ${
                      isSelected ? 'ring-2 ring-luxury-gold ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-luxury-gold" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Advantages Checklist */}
          <div className="space-y-2 text-xs text-charcoal-light dark:text-slate-300 border-t border-slate-200 dark:border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Fabricated with genuine virgin KAKA PVC profile sheets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Zero borer, termite, or water damage warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Soft-close hydraulic hinges & telescopic channel fittings</span>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="space-y-2.5 pt-2">
            <Link
              to={`/book?service=${service.id}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-obsidian to-charcoal dark:from-luxury-gold dark:to-amber-500 hover:opacity-95 text-white dark:text-obsidian text-xs sm:text-sm font-black shadow-elevated transition-all active:scale-95"
            >
              <span className="text-luxury-goldLight dark:text-obsidian font-black">Book Free Site Visit & Measurement</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold dark:text-obsidian" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${settings.phone1}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-obsidian dark:text-white text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Call Specialist</span>
              </a>
              <a
                href={`https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20am%20inquiring%20about%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
