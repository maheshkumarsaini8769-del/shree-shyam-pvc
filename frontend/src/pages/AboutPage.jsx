import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Clock,
  Headphones,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { images } from '../data/images';

export const AboutPage = () => {
  const { settings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR HERITAGE & CRAFTSMANSHIP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
          About Shree Shyam PVC Interior
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-1.5">
          Pioneering waterproof & termite-resistant architectural interiors in Vastral, Ahmedabad.
        </p>
      </div>

      {/* Authorized Signboard Board Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-elevated text-center space-y-4 relative overflow-hidden">
        <div className="inline-block px-6 py-2 rounded-xl bg-obsidian dark:bg-white/10 text-luxury-gold font-bold text-xs sm:text-sm tracking-wider uppercase shadow-soft border border-luxury-gold/30">
          KAKA PVC PROFILE AUTHORIZED FABRICATION
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-obsidian dark:text-white tracking-tight">
            Shree Shyam
          </h2>
          <h3 className="text-base sm:text-lg font-bold text-luxury-gold uppercase tracking-[0.25em]">
            PVC INTERIOR SOLUTIONS
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          {settings.address || 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad'}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-obsidian dark:text-white">
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            100% Waterproof
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Termite & Pest Proof
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            10-Year Warranty
          </span>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-soft space-y-3 text-xs sm:text-sm text-charcoal dark:text-slate-300 leading-relaxed">
          <h3 className="font-serif font-bold text-base text-obsidian dark:text-white">
            Why We Specialize in PVC
          </h3>
          <p>
            Shree Shyam PVC Interior is Ahmedabad's premier interior fabrication studio dedicated to eliminating the headaches of traditional wooden carpentry—such as moisture seepage, termite infestations, swollen door frames, and expensive maintenance.
          </p>
          <p>
            Using 100% virgin KAKA PVC profile extrusions, our modular installations are designed to withstand humid Ahmedabad kitchens and bathrooms while delivering modern luxury aesthetic finishes like Italian Marble, Teak Woodgrain, and Fluted Louver paneling.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-soft min-h-[220px]">
          <img
            src={images.hero}
            alt="Showroom Living Room Setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent flex items-end p-6">
            <p className="text-white font-serif font-bold text-sm">
              Custom fabrication workshop in Vastral with precision laser tools.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft space-y-1">
          <span className="text-2xl sm:text-4xl font-serif font-black text-obsidian dark:text-white block">5+</span>
          <span className="text-xs text-charcoal-muted dark:text-slate-400 font-bold block">Years Experience</span>
        </div>
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft space-y-1">
          <span className="text-2xl sm:text-4xl font-serif font-black text-luxury-goldDark dark:text-luxury-gold block">500+</span>
          <span className="text-xs text-charcoal-muted dark:text-slate-400 font-bold block">Happy Families</span>
        </div>
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft space-y-1">
          <span className="text-2xl sm:text-4xl font-serif font-black text-obsidian dark:text-white block">1000+</span>
          <span className="text-xs text-charcoal-muted dark:text-slate-400 font-bold block">Projects Completed</span>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col items-center text-center gap-2 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-luxury-gold flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-obsidian dark:text-white">Certified KAKA Material</span>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col items-center text-center gap-2 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-luxury-gold flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-obsidian dark:text-white">Affordable Turnkey Price</span>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col items-center text-center gap-2 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-luxury-gold flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-obsidian dark:text-white">7-Day On-Time Delivery</span>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col items-center text-center gap-2 shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-luxury-gold flex items-center justify-center">
            <Headphones className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-obsidian dark:text-white">Direct Owner Support</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-obsidian via-charcoal to-obsidian text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated border border-white/10">
        <div>
          <h4 className="font-serif font-bold text-base sm:text-lg">
            Ready to upgrade your home with waterproof PVC?
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Book a free site consultation or visit our Vastral workshop.
          </p>
        </div>

        <Link
          to="/book"
          className="px-6 py-3 rounded-xl bg-luxury-gold hover:bg-amber-400 text-obsidian text-xs font-black shrink-0 transition-colors shadow-gold-glow"
        >
          Book Free Visit
        </Link>
      </div>
    </div>
  );
};
