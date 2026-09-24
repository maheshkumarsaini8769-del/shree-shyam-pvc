import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Clock,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Search,
  X
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from './BrandLogo';

const searchablePages = [
  { name: 'Home', path: '/', keywords: ['home', 'main', 'homepage'] },
  { name: 'Services', path: '/services', keywords: ['services', 'pvc', 'interior', 'kitchen', 'wardrobe', 'tv unit'] },
  { name: 'Gallery', path: '/gallery', keywords: ['gallery', 'photos', 'work', 'projects'] },
  { name: 'About Us', path: '/about', keywords: ['about', 'team', 'company', 'kaka pvc'] },
  { name: 'Location', path: '/location', keywords: ['location', 'address', 'vastral', 'ahmedabad', 'map'] },
  { name: 'Reviews', path: '/reviews', keywords: ['reviews', 'ratings', 'testimonials', 'feedback'] },
  { name: 'FAQ', path: '/faq', keywords: ['faq', 'questions', 'help', 'price', 'warranty'] },
  { name: 'Contact', path: '/contact', keywords: ['contact', 'phone', 'call', 'email'] },
  { name: 'Book Free Visit', path: '/book', keywords: ['book', 'visit', 'appointment', 'free', 'site visit'] },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!searchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length < 1) {
      setSearchResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const results = searchablePages.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.keywords.some((k) => k.includes(lower))
    );
    setSearchResults(results);
  };

  const handleResultClick = (path) => {
    navigate(path);
    setSearchOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Location', path: '/location' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* EMERGENCY TOP NOTICE (Controlled via Admin) */}
        {settings.emergencyNotice && (
          <div className="bg-amber-600 text-white text-xs font-bold py-1 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-sm">
            <span>📢</span>
            <span>{settings.emergencyNotice}</span>
          </div>
        )}

        {/* TOP ANNOUNCEMENT BAR — Desktop only (Controlled via Admin) */}
        {settings.announcementActive !== false && (
          <div className={`hidden md:block bg-[#161514] text-stone-300 text-[10.5px] font-medium py-1 px-4 transition-all duration-300 border-b border-white/5 ${
            isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'opacity-100'
          }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-luxury-gold/15 text-luxury-gold font-bold border border-luxury-gold/30">
                  <Sparkles className="w-3 h-3 text-luxury-gold" />
                  <span>{settings.announcementText || 'All Company PVC Material Work Available • KAKA, TAASA & All Major Brands'}</span>
                </span>
                <span className="text-white/20">•</span>
                <span className="text-stone-300">
                  Vastral Workshop &amp; Free Laser Measurement
                </span>
              </div>
              <div className="flex items-center gap-4 text-stone-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-luxury-gold" />
                  <span>{settings.workingHours || 'Mon - Sat: 9:00 AM - 8:30 PM'}</span>
                </div>
                <span className="text-white/20">|</span>
                <a
                  href={`tel:${settings.phone1}`}
                  className="hover:text-luxury-gold font-bold flex items-center gap-1 transition-colors text-white"
                >
                  <Phone className="w-3 h-3 text-luxury-gold" />
                  <span>{settings.phone1}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MAIN HEADER BAR */}
        <div className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#161514]/95 backdrop-blur-xl shadow-sm py-2 border-b border-stone-200/80 dark:border-white/10'
            : 'bg-white/95 dark:bg-[#161514]/95 backdrop-blur-md py-2.5 border-b border-stone-200/80 dark:border-white/10'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ── MOBILE HEADER (Super clean, non-cluttered) ── */}
            <div className="flex items-center justify-between md:hidden">
              <Link to="/" className="flex items-center active:scale-95 transition-transform">
                <BrandLogo isDark={isDark} />
              </Link>

              {/* Right: Search & Theme Toggle with clean unified touch targets */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-stone-200 flex items-center justify-center border border-stone-200/80 dark:border-white/10 active:scale-90 transition-all"
                >
                  <Search className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 flex items-center justify-center border border-stone-200/80 dark:border-white/10 active:scale-90 transition-all"
                >
                  {isDark
                    ? <Sun className="w-4 h-4 text-luxury-gold" />
                    : <Moon className="w-4 h-4 text-stone-700" />
                  }
                </button>
              </div>
            </div>

            {/* ── DESKTOP HEADER (Clean, balanced button CSS) ── */}
            <div className="hidden md:flex items-center justify-between">
              <Link to="/" className="flex items-center group">
                <BrandLogo isDark={isDark} />
              </Link>

              <nav className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative px-3 py-1.5 text-[13px] font-semibold tracking-wide rounded-lg transition-all duration-200 ${
                        active
                          ? 'text-obsidian dark:text-luxury-goldLight bg-stone-100 dark:bg-white/10 font-bold'
                          : 'text-stone-600 dark:text-stone-300 hover:text-obsidian dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-luxury-gold rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Balanced, uniform action buttons on desktop */}
              <div className="flex items-center gap-2">
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  title="Search website"
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-white/10 flex items-center justify-center transition-all active:scale-90"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                  title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                  className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 border border-stone-200/80 dark:border-white/10 flex items-center justify-center transition-all active:scale-90"
                >
                  {isDark
                    ? <Sun className="w-4 h-4 text-luxury-gold" />
                    : <Moon className="w-4 h-4 text-stone-700" />
                  }
                </button>

                {/* WhatsApp Quick Chat */}
                <a
                  href="https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20am%20interested%20in%20PVC%20interior%20solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>

                {/* Primary CTA Button */}
                <Link
                  to="/book"
                  className="h-9 px-4.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-[#121212] text-xs font-black flex items-center gap-1.5 shadow-sm transition-all active:scale-95 group"
                >
                  <span>Book Free Visit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── SEARCH OVERLAY ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white/95 dark:bg-[#121212]/97 backdrop-blur-2xl"
          role="dialog"
          aria-label="Search"
        >
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-stone-200 dark:border-white/10 bg-white dark:bg-[#161514] shadow-sm">
            <Search className="w-5 h-5 text-luxury-gold shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search services, products, reviews, contact..."
              className="flex-1 bg-transparent text-sm sm:text-base text-obsidian dark:text-white placeholder-stone-400 dark:placeholder-stone-500 outline-none font-medium"
              autoComplete="off"
            />
            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Close Search"
              className="w-8 h-8 rounded-full bg-stone-100 dark:bg-white/10 flex items-center justify-center text-stone-600 dark:text-stone-300 active:scale-90 transition-transform shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-4 pb-24">
            {searchQuery.trim() === '' ? (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                  Quick Navigation
                </p>
                {searchablePages.map((page) => (
                  <button
                    key={page.path}
                    onClick={() => handleResultClick(page.path)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-stone-50 hover:bg-stone-100 dark:bg-white/5 dark:hover:bg-white/10 border border-stone-200/80 dark:border-white/8 text-left transition-all active:scale-[0.98]"
                  >
                    <span className="text-sm font-semibold text-obsidian dark:text-white">{page.name}</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0" />
                  </button>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                  {searchResults.length} Result{searchResults.length > 1 ? 's' : ''}
                </p>
                {searchResults.map((page) => (
                  <button
                    key={page.path}
                    onClick={() => handleResultClick(page.path)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-white dark:bg-white/8 hover:bg-stone-50 dark:hover:bg-white/12 border border-luxury-gold/30 dark:border-luxury-gold/20 text-left transition-all shadow-sm active:scale-[0.98]"
                  >
                    <div>
                      <span className="text-sm font-bold text-obsidian dark:text-white block">{page.name}</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">{page.path}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-luxury-gold shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">No results for "<span className="text-obsidian dark:text-white">{searchQuery}</span>"</p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Try: services, kitchen, wardrobe, book</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
