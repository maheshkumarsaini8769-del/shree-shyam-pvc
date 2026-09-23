import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Home,
  LayoutGrid,
  Image,
  CalendarCheck,
  Info,
  Star,
  PhoneCall,
  HelpCircle,
  Lock,
  FileText,
  RotateCcw,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const SideDrawer = ({ isOpen, onClose }) => {
  const { settings } = useSettings();
  const { isAdmin } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLinkClick = (path) => {
    onClose();
    navigate(path);
  };

  const menuItems = [
    { label: 'Home Showcase', icon: Home, path: '/' },
    { label: 'Our Services', icon: LayoutGrid, path: '/services' },
    { label: 'Work Gallery', icon: Image, path: '/gallery' },
    { label: 'Book Free Visit', icon: CalendarCheck, path: '/book' },
    { label: 'About Shree Shyam', icon: Info, path: '/about' },
    { label: 'Customer Reviews', icon: Star, path: '/reviews' },
    { label: 'Contact & Location', icon: PhoneCall, path: '/contact' },
    { label: 'FAQ', icon: HelpCircle, path: '/faq' },
    { label: 'Privacy Policy', icon: Lock, path: '/privacy-policy' },
    { label: 'Terms & Conditions', icon: FileText, path: '/terms-and-conditions' },
    { label: 'Cancellation / Refund', icon: RotateCcw, path: '/cancellation-refund' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 max-w-[320px] w-full bg-obsidian text-slate-200 shadow-2xl flex flex-col justify-between z-50 animate-slide-right border-r border-white/10">
        {/* Header with Theme Toggle */}
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <BrandLogo isDark={true} />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme Mode"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-luxury-gold transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-luxury-gold" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close Menu"
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleLinkClick(item.path)}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Icon className="w-4 h-4 text-luxury-gold shrink-0 stroke-[1.8]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => handleLinkClick(isAdmin ? '/admin' : '/admin/login')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5"
            >
              <span>{isAdmin ? 'Admin Dashboard' : 'Admin Portal Login'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </div>

        {/* Bottom Contact Help Box */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 fill-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-white">Need Consultation?</p>
              <p className="text-[10px] text-slate-400 truncate">Chat with interior expert</p>
            </div>
            <a
              href="https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20need%20design%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shrink-0"
            >
              Chat
            </a>
          </div>

          <div className="text-center">
            <p className="text-[11px] italic font-serif text-luxury-goldLight">
              "Better Interiors, Happier Lives"
            </p>
            <p className="text-[9px] text-slate-500 mt-0.5">Vastral, Ahmedabad • KAKA PVC</p>
          </div>
        </div>
      </div>
    </div>
  );
};
