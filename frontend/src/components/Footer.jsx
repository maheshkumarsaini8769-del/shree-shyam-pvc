import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ShieldCheck, ArrowRight, Sparkles, Clock, Heart } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { BrandLogo } from './BrandLogo';

export const Footer = () => {
  const { settings } = useSettings();

  const servicesList = [
    { name: 'PVC Modular Kitchen', path: '/services/pvc-modular-kitchen' },
    { name: 'PVC Wardrobe Solutions', path: '/services/pvc-wardrobe' },
    { name: 'PVC Waterproof Doors', path: '/services/pvc-doors' },
    { name: 'PVC Wall Panels & Fluting', path: '/services/pvc-wall-panels' },
    { name: 'TV Entertainment Units', path: '/services/tv-unit-panels' },
    { name: 'Office & Commercial Setup', path: '/services/office-interior' }
  ];

  const quickLinks = [
    { name: 'Home Showcase', path: '/' },
    { name: 'All Services', path: '/services' },
    { name: 'Photo Gallery', path: '/gallery' },
    { name: 'Book Free Visit', path: '/book' },
    { name: 'Track Booking Status', path: '/my-bookings' },
    { name: 'About Shree Shyam', path: '/about' },
    { name: 'Location & Map', path: '/location' },
    { name: 'Client Testimonials', path: '/reviews' },
    { name: 'Frequently Asked Questions', path: '/faq' },
    { name: 'Contact & Showroom', path: '/contact' }
  ];

  return (
    <footer className="bg-obsidian text-slate-300 pt-16 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          {/* 1. Brand Info & Certification */}
          <div className="space-y-4">
            <BrandLogo isDark={true} />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Ahmedabad's trusted specialist in 100% waterproof, termite-proof and maintenance-free interior fabrication using genuine virgin KAKA PVC profiles.
            </p>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-luxury-goldLight font-medium">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                <span>KAKA PVC PROFILE Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Mon - Sat: 9:00 AM - 8:30 PM</span>
              </div>
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {quickLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-luxury-goldLight transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-luxury-gold opacity-80" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. PVC Services */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Interior Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {servicesList.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="hover:text-luxury-goldLight transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-luxury-gold opacity-80" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Address */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Workshop & Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {settings.address || 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <div className="space-x-2">
                  <a href={`tel:${settings.phone1}`} className="hover:text-white font-bold text-slate-200">
                    {settings.phone1}
                  </a>
                  <span>/</span>
                  <a href={`tel:${settings.phone2}`} className="hover:text-white font-bold text-slate-200">
                    {settings.phone2}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20am%20looking%20for%20an%20interior%20quote`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Shree Shyam PVC Interior. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-slate-400 transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-slate-400 transition-colors">
              FAQ
            </Link>
            <span>•</span>
            <Link to="/location" className="hover:text-slate-400 transition-colors">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
