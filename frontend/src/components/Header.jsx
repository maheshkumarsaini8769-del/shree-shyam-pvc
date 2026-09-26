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
  X,
  Utensils,
  Layers,
  Tv,
  DoorClosed,
  Building2,
  Calculator,
  CalendarCheck,
  Image,
  MapPin,
  Star,
  HelpCircle,
  PhoneCall,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from './BrandLogo';

const searchCatalog = [
  // Core PVC Services (Direct Deep Links)
  {
    id: 'srv-kitchen',
    name: 'PVC Modular Kitchen',
    category: 'Services',
    badge: '100% Waterproof',
    desc: 'Termite-proof modular kitchen with soft-close tandem drawers & lofts',
    path: '/services/pvc-modular-kitchen',
    icon: Utensils,
    keywords: ['kitchen', 'modular kitchen', 'pvc kitchen', 'trolley', 'cabinets', 'rasoi', 'cooking', 'kaka kitchen', 'drawers', 'baskets', 'shree shyam']
  },
  {
    id: 'srv-wardrobe',
    name: 'PVC Wardrobe & Lofts',
    category: 'Services',
    badge: 'Floor-to-Ceiling',
    desc: 'Modern sliding & openable wardrobes with moisture-proof lofts for bedrooms',
    path: '/services/pvc-wardrobe',
    icon: Layers,
    keywords: ['wardrobe', 'lofts', 'cupboard', 'almirah', 'sliding wardrobe', 'bedroom', 'storage', 'shutters']
  },
  {
    id: 'srv-tv-unit',
    name: 'PVC TV Unit & Acoustic Louvers',
    category: 'Services',
    badge: 'Trending Design',
    desc: 'Designer TV feature wall with fluted louvers, concealed LED channels & floating consoles',
    path: '/services/pvc-tv-unit',
    icon: Tv,
    keywords: ['tv', 'tv unit', 'television', 'louvers', 'fluted', 'wall panel', 'living room', 'acoustic', 'led cove']
  },
  {
    id: 'srv-doors',
    name: 'PVC Doors & Frames',
    category: 'Services',
    badge: 'Heavy Duty',
    desc: 'Heavy-duty 100% waterproof doors & chokhat frames for bathroom, bedroom & balcony',
    path: '/services/pvc-doors',
    icon: DoorClosed,
    keywords: ['door', 'doors', 'bathroom door', 'chokhat', 'frame', 'waterproof door', 'balcony']
  },
  {
    id: 'srv-wall-panels',
    name: 'PVC Wall Panels & Fluted Louvers',
    category: 'Services',
    badge: 'Interior Cladding',
    desc: 'Decorative fluted wall louvers, false ceiling rafters & faux marble sheet claddings',
    path: '/services/pvc-wall-panels',
    icon: Sparkles,
    keywords: ['wall panel', 'louvers', 'fluted panel', 'ceiling', 'marble sheet', 'charcoal sheet', 'wpc', 'rafters']
  },
  {
    id: 'srv-office',
    name: 'Office & Commercial Interior',
    category: 'Services',
    badge: 'Commercial',
    desc: 'Modular workstation partitions, executive cabins & reception front desks',
    path: '/services/pvc-office-interior',
    icon: Building2,
    keywords: ['office', 'commercial', 'cabin', 'workstation', 'partition', 'corporate', 'reception']
  },
  {
    id: 'srv-all',
    name: 'All Interior Services Catalog',
    category: 'Services',
    badge: 'Full Catalog',
    desc: 'Browse complete catalogue of PVC fabrication services, price list and details',
    path: '/services',
    icon: Layers,
    keywords: ['services', 'all services', 'catalogue', 'catalog', 'solutions', 'rate list', 'rates']
  },

  // Actions & Interactive Tools
  {
    id: 'act-calc',
    name: 'PVC Cost Calculator',
    category: 'Actions',
    badge: 'Instant Estimate',
    desc: 'Calculate accurate cost per sq. ft. for kitchen, wardrobe & TV panels',
    path: '/#calculator',
    icon: Calculator,
    keywords: ['calculator', 'cost', 'price', 'estimate', 'rate', 'sqft', 'budget', 'quotation', 'pricing']
  },
  {
    id: 'act-book',
    name: 'Book Free Site Measurement',
    category: 'Actions',
    badge: '100% Free Doorstep',
    desc: 'Schedule a free doorstep site measurement and laser consultation in Vastral / Ahmedabad',
    path: '/book',
    icon: CalendarCheck,
    keywords: ['book', 'visit', 'appointment', 'free', 'site visit', 'measurement', 'survey', 'free consultation']
  },
  {
    id: 'act-track',
    name: 'Track Booking Status',
    category: 'Actions',
    badge: 'Order Tracking',
    desc: 'Check live status of your interior site visit and installation progress',
    path: '/my-bookings',
    icon: Clock,
    keywords: ['track', 'my bookings', 'status', 'check booking', 'order status', 'account']
  },
  {
    id: 'act-wa',
    name: 'WhatsApp Quick Consultation',
    category: 'Actions',
    badge: 'Instant Reply',
    desc: 'Chat directly with master fabricator on WhatsApp for quotation & real photos',
    path: 'https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20want%20to%20inquire%20about%20PVC%20interior%20services',
    isExternal: true,
    icon: MessageSquare,
    keywords: ['whatsapp', 'chat', 'message', 'quote', 'enquiry', 'ask question', 'talk']
  },
  {
    id: 'act-call',
    name: 'Call Fabricator Directly',
    category: 'Actions',
    badge: 'Direct Call',
    desc: 'Call +91 82098 36370 for immediate assistance and fast site visit booking',
    path: 'tel:918209836370',
    isExternal: true,
    icon: PhoneCall,
    keywords: ['call', 'phone', 'contact number', 'mobile', 'speak', 'help']
  },

  // Explore Pages
  {
    id: 'exp-gallery',
    name: 'Project Photo Gallery',
    category: 'Explore',
    badge: '34+ Photos',
    desc: 'Real finished site photographs of kitchens, wardrobes & TV units in Ahmedabad',
    path: '/gallery',
    icon: Image,
    keywords: ['gallery', 'photos', 'work', 'projects', 'pictures', 'designs', 'real work', 'images']
  },
  {
    id: 'exp-reviews',
    name: 'Customer Reviews & Ratings',
    category: 'Explore',
    badge: '5.0 ★ Rated',
    desc: 'Read genuine reviews and 5-star ratings from verified Ahmedabad homeowners',
    path: '/reviews',
    icon: Star,
    keywords: ['reviews', 'ratings', 'testimonials', 'feedback', 'google reviews', 'stars']
  },
  {
    id: 'exp-location',
    name: 'Workshop Location & Directions',
    category: 'Explore',
    badge: 'Vastral, Ahmedabad',
    desc: 'Get Google Maps directions to our fabrication workshop in Vastral, Ahmedabad',
    path: '/location',
    icon: MapPin,
    keywords: ['location', 'address', 'vastral', 'ahmedabad', 'map', 'directions', 'shop', 'workshop', 'where']
  },
  {
    id: 'exp-faq',
    name: 'Frequently Asked Questions (FAQ)',
    category: 'Explore',
    badge: 'Help & Warranty',
    desc: 'Answers about PVC lifetime, termite resistance, water resistance & warranties',
    path: '/faq',
    icon: HelpCircle,
    keywords: ['faq', 'questions', 'help', 'warranty', 'termite proof', 'water resistant', 'price faq']
  },
  {
    id: 'exp-about',
    name: 'About Shree Shyam PVC',
    category: 'Explore',
    badge: 'Certified Team',
    desc: 'Learn about our 10+ years of craftsmanship and certified KAKA PVC materials',
    path: '/about',
    icon: Building2,
    keywords: ['about', 'team', 'company', 'kaka pvc', 'craftsmanship', 'experience', 'who we are']
  },
  {
    id: 'exp-contact',
    name: 'Contact Information',
    category: 'Explore',
    badge: 'Reach Us',
    desc: 'Contact numbers, workshop address, timing and inquiry form',
    path: '/contact',
    icon: PhoneCall,
    keywords: ['contact', 'email', 'phone', 'reach us', 'inquiry', 'message']
  }
];

const popularSearches = [
  'PVC Modular Kitchen',
  'PVC Wardrobe',
  'TV Unit & Louvers',
  'Cost Calculator',
  'Book Free Visit',
  'Photo Gallery',
  'Vastral Location'
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [topBarDismissed, setTopBarDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('sspi_top_bar_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { toggleTheme, isDark } = useTheme();

  const handleDismissTopBar = (e) => {
    if (e) e.stopPropagation();
    setTopBarDismissed(true);
    try {
      sessionStorage.setItem('sspi_top_bar_dismissed', 'true');
    } catch {}
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          // Hysteresis deadband: activate at 65px, deactivate when near top (< 20px) to prevent vibration
          if (sy > 65) {
            setIsScrolled(true);
          } else if (sy < 20) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcuts (Ctrl+K to open, ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && searchOpen) {
        e.preventDefault();
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Body scroll lock & autofocus when search opens/closes
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
      setSearchCategory('All');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  // Close search when route changes
  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  const filteredResults = searchCatalog.filter((item) => {
    if (searchCategory !== 'All' && item.category !== searchCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const handleItemSelect = (item) => {
    setSearchOpen(false);
    if (item.isExternal) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
    } else if (item.path.startsWith('/#')) {
      navigate('/');
      const targetId = item.path.replace('/#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      navigate(item.path);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev - 1 + filteredResults.length) % filteredResults.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleItemSelect(filteredResults[selectedIndex]);
      }
    }
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
      {/* ── TOP ANNOUNCEMENT / FESTIVAL BAR (Scrolls with page, cut option included) ── */}
      {!topBarDismissed && (
        <div className="w-full relative z-30">
          {/* EMERGENCY TOP NOTICE (Controlled via Admin) */}
          {settings.emergencyNotice && (
            <div className="bg-amber-600 text-white text-xs font-bold py-1 px-4 text-center tracking-wide flex items-center justify-between gap-2 shadow-sm">
              <div className="flex-1 flex items-center justify-center gap-2">
                <span>📢</span>
                <span>{settings.emergencyNotice}</span>
              </div>
              <button
                onClick={handleDismissTopBar}
                title="Cut / Close Notice"
                aria-label="Close Notice"
                className="w-5 h-5 rounded-full hover:bg-black/20 flex items-center justify-center text-white/90 hover:text-white transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* TOP ANNOUNCEMENT / FESTIVAL BAR — Desktop only */}
          {settings.announcementActive !== false && (() => {
            const fest = settings.effectiveFestival || {};
            const isFestiveActive = fest.id && fest.id !== 'normal';

            return (
              <div className={`hidden md:block text-[10.5px] font-medium py-1 px-4 border-b ${
                isFestiveActive
                  ? (fest.themeClasses?.barBg || 'bg-gradient-to-r from-[#1c0f02] via-[#381e05] to-[#190901] border-amber-500/50 text-amber-200')
                  : 'bg-[#161514] border-white/5 text-stone-200'
              }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 truncate">
                    {isFestiveActive ? (
                      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10.5px] shadow-sm shrink-0 ${
                        fest.themeClasses?.badgeBg || 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        <span>{fest.icon || '🪔'}</span>
                        <span>{fest.greeting || fest.name}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-luxury-gold/15 text-luxury-gold font-bold border border-luxury-gold/30 shrink-0">
                        <Sparkles className="w-3 h-3 text-luxury-gold" />
                        <span>Certified Quality</span>
                      </span>
                    )}
                    <span className="text-white/20 shrink-0">•</span>
                    <span className={`truncate ${isFestiveActive ? 'text-amber-100 dark:text-amber-200 font-semibold' : 'text-stone-300'}`}>
                      {isFestiveActive ? fest.announcement : (settings.announcementText || 'All Company PVC Material Work Available • KAKA, TAASA & All Major Brands')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-stone-300 shrink-0">
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
                    <span className="text-white/20">|</span>
                    {/* Cut / Close Button */}
                    <button
                      onClick={handleDismissTopBar}
                      title="Cut / Close Bar"
                      aria-label="Close Announcement Bar"
                      className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Mobile Festive Announcement Strip */}
          {(() => {
            const fest = settings.effectiveFestival || {};
            if (!fest.id || fest.id === 'normal') return null;
            return (
              <div className={`md:hidden text-[10.5px] font-bold py-1.5 px-3 flex items-center justify-between border-b shadow-sm ${
                fest.themeClasses?.barBg || 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-200 border-amber-500/30'
              }`}>
                <span className="flex items-center gap-1.5 truncate">
                  <span className="text-xs">{fest.icon || '🪔'}</span>
                  <span className="truncate">{fest.greeting || fest.announcement}</span>
                </span>
                <div className="flex items-center gap-2 shrink-0 ml-1.5">
                  {fest.discountPercent > 0 && (
                    <span className={`px-1.5 py-0.5 rounded font-black text-[9px] ${
                      fest.themeClasses?.badgeBg || 'bg-amber-500 text-obsidian'
                    }`}>
                      {fest.discountPercent}% OFF
                    </span>
                  )}
                  {/* Cut / Close Button */}
                  <button
                    onClick={handleDismissTopBar}
                    aria-label="Close Festive Bar"
                    className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-white/80 active:scale-90"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ── STICKY MAIN NAVBAR — Rock Solid, Zero Height Changes, Zero Vibration ── */}
      <header className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-white/98 dark:bg-[#161514]/98 backdrop-blur-md shadow-md border-b border-stone-200/80 dark:border-white/10'
          : 'bg-white dark:bg-[#161514] border-b border-stone-200/80 dark:border-white/10'
      }`}>
        {/* MAIN HEADER BAR */}
        <div className={`w-full transition-all duration-200 ${
          isScrolled ? 'py-2' : 'py-2.5'
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

      {/* ── SEARCH OVERLAY (Modern Command Palette Modal) ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-start items-center bg-black/60 dark:bg-black/80 backdrop-blur-md px-3 pt-3 sm:pt-16 pb-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Search Shree Shyam PVC"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div
            className="w-full max-w-2xl bg-white dark:bg-[#1A1918] rounded-2xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[82vh] transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Search Input Bar */}
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-stone-200 dark:border-white/10 bg-white dark:bg-[#1E1D1B] shrink-0">
              <Search className="w-5 h-5 text-luxury-gold shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search modular kitchen, wardrobe, calculator, reviews..."
                className="flex-1 bg-transparent text-sm sm:text-base text-obsidian dark:text-white placeholder-stone-400 dark:placeholder-stone-500 outline-none font-medium"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  title="Clear Search"
                  aria-label="Clear Search Input"
                  className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-stone-500 dark:text-stone-300 transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-stone-200 dark:border-white/10">
                <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-stone-100 dark:bg-white/10 text-stone-500 dark:text-stone-400 rounded border border-stone-200 dark:border-white/10 shadow-xs">
                  ESC
                </kbd>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close Search Dialog"
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-stone-600 dark:text-stone-300 active:scale-95 transition-all shrink-0 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-stone-100 dark:border-white/5 bg-stone-50/70 dark:bg-[#161514] overflow-x-auto no-scrollbar shrink-0">
              {['All', 'Services', 'Actions', 'Explore'].map((cat) => {
                const active = searchCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSearchCategory(cat);
                      setSelectedIndex(0);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-obsidian dark:bg-luxury-gold text-white dark:text-obsidian shadow-xs'
                        : 'bg-white dark:bg-white/5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 border border-stone-200/60 dark:border-white/5'
                    }`}
                  >
                    {cat === 'All' ? 'All Results' : cat === 'Services' ? 'Interior Services' : cat === 'Actions' ? 'Tools & Contact' : 'Pages & Gallery'}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Results & Recommendations Container */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {/* If query is empty: show Popular Searches quick tags */}
              {!searchQuery.trim() && (
                <div className="mb-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-luxury-gold" />
                    <span>Popular Suggestions</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          searchInputRef.current?.focus();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-luxury-gold/15 hover:text-luxury-goldDark dark:bg-white/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 text-xs font-semibold border border-stone-200/80 dark:border-white/5 transition-all active:scale-95"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results count header */}
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 pt-1 px-1">
                <span>{searchQuery.trim() ? `${filteredResults.length} Result${filteredResults.length === 1 ? '' : 's'} Found` : 'Recommended For You'}</span>
                <span className="hidden sm:inline-block text-[10px] lowercase text-stone-400">use ↑ ↓ to navigate, enter to open</span>
              </div>

              {/* Results List */}
              {filteredResults.length > 0 ? (
                <div className="space-y-1.5">
                  {filteredResults.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer text-left transition-all ${
                          isSelected
                            ? 'bg-amber-50/90 dark:bg-luxury-gold/15 border-2 border-luxury-gold shadow-xs'
                            : 'bg-stone-50/70 hover:bg-stone-100/90 dark:bg-white/5 dark:hover:bg-white/8 border border-stone-200/70 dark:border-white/5'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-luxury-gold text-obsidian'
                              : 'bg-white dark:bg-white/10 text-stone-700 dark:text-stone-200 border border-stone-200/80 dark:border-white/10'
                          }`}>
                            <Icon className="w-4 h-4 stroke-[2.2px]" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-obsidian dark:text-white truncate">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-luxury-gold/15 text-luxury-goldDark dark:text-luxury-gold border border-luxury-gold/30 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 text-stone-400 dark:text-stone-500">
                          {item.isExternal ? (
                            <ExternalLink className="w-4 h-4 text-luxury-gold" />
                          ) : (
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-luxury-gold translate-x-1' : ''}`} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 px-4 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-white/5 flex items-center justify-center mx-auto text-stone-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-obsidian dark:text-white">
                      No results found for "{searchQuery}"
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                      Try searching for kitchen, wardrobe, tv unit, calculator, or talk directly to our fabricator.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <a
                      href="https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20have%20an%20interior%20requirement"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      <span>Ask on WhatsApp</span>
                    </a>
                    <a
                      href="tel:918209836370"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs font-black shadow-sm transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call +91 82098 36370</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status / Shortcut Bar */}
            <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#141312] border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Ahmedabad & Vastral On-Site Fabrication</span>
              </span>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-stone-600 hover:text-obsidian dark:text-stone-400 dark:hover:text-white font-medium hover:underline"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
