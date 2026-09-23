import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Play,
  Droplets,
  BugOff,
  Clock,
  Compass,
  ChevronRight,
  Star,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Calculator,
  Sparkles,
  X,
  Layers,
  Award,
  Flame,
  Check,
  Building2,
  Palette,
  Camera,
  ZoomIn
} from 'lucide-react';
import { images, getImageByKey } from '../data/images';
import { useSettings } from '../context/SettingsContext';
import { api } from '../services/api';
import { HeroSection } from '../components/HeroSection';

export const HomePage = () => {
  const { settings } = useSettings();
  const [services, setServices] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Scroll tracking states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Interactive Livspace-style room & finish calculator
  const [selectedRoom, setSelectedRoom] = useState('tv-unit');
  const [selectedFinish, setSelectedFinish] = useState('louver');
  const [sqft, setSqft] = useState(120);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowFloatingBar(currentScrollY > 350);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const defaultHomeReviews = [
    {
      id: 1,
      name: 'Rakesh Patel',
      location: 'Vastral, Ahmedabad',
      serviceUsed: 'PVC Modular Kitchen',
      rating: 5,
      comment: 'Bahut hi accha work kiya. Kitchen ka finish bilkul luxury wood jaisa hai aur 100% waterproof hai. Inhone KAKA profile use ki jiska finish bohot solid hai.'
    },
    {
      id: 2,
      name: 'Neha Shah',
      location: 'Maninagar, Ahmedabad',
      serviceUsed: 'Master Sliding Wardrobe',
      rating: 5,
      comment: 'Modular kitchen & bedroom wardrobe bilkul waisa bana jaise 3D design me dikhaya tha. Humne TAASA aur KAKA dono company profile sample dekhe the, fitting ekdum perfect hui hai.'
    },
    {
      id: 3,
      name: 'Amit Soni',
      location: 'Vastral, Ahmedabad',
      serviceUsed: 'TV Unit & Acoustic Louvers',
      rating: 5,
      comment: 'On-time 6 days me kaam complete kiya. Living room ka look poora transform ho gaya. Zero termites guarantee is a big peace of mind. Highly recommended!'
    }
  ];

  const [reviews, setReviews] = useState(defaultHomeReviews);

  useEffect(() => {
    Promise.all([
      api.getServices().catch(() => []),
      api.getReviews().catch(() => [])
    ]).then(([servicesData, reviewsData]) => {
      setServices(servicesData);
      if (Array.isArray(reviewsData) && reviewsData.length > 0) {
        const formatted = reviewsData.map((r, i) => ({
          id: r.id || `api-${i}`,
          name: r.customerName ? r.customerName.split('(')[0].trim() : 'Verified Client',
          location: r.customerName && r.customerName.includes('(') ? r.customerName.split('(')[1].replace(')', '') : 'Ahmedabad',
          serviceUsed: r.serviceUsed || 'Custom PVC Interior',
          rating: r.rating || 5,
          comment: r.reviewText || r.comment
        }));
        setReviews([...formatted, ...defaultHomeReviews].slice(0, 6));
      }
    });
  }, []);

  const roomTypes = [
    { id: 'tv-unit', name: 'TV Unit & Louvers', defaultSqft: 100, rate: settings?.pricingCalculator?.tvUnitRate || 480, icon: '📺' },
    { id: 'wardrobe', name: 'Wardrobe with Lofts', defaultSqft: 150, rate: settings?.pricingCalculator?.wardrobeRate || 520, icon: '🚪' },
    { id: 'kitchen', name: 'Modular Kitchen', defaultSqft: 120, rate: settings?.pricingCalculator?.kitchenRate || 550, icon: '🍳' },
    { id: 'full-home', name: 'Full 2BHK/3BHK Flat', defaultSqft: 550, rate: settings?.pricingCalculator?.fullHomeRate || 500, icon: '🏠' }
  ];

  const finishTypes = [
    { id: 'louver', name: 'Fluted Acoustic Louver', multiplier: 1.2, desc: '3D vertical slats with warm hidden LED strip glow' },
    { id: 'marble', name: 'Italian Marble Sheet', multiplier: 1.15, desc: 'High-gloss Statuario white or black gold marble' },
    { id: 'woodgrain', name: 'Rich Teak Woodgrain', multiplier: 1.05, desc: 'Natural organic wood finish texture' },
    { id: 'charcoal', name: 'Matte Charcoal & Pink', multiplier: 1.1, desc: 'Contemporary dual-tone anti-fingerprint surface' }
  ];

  const currentRoom = roomTypes.find((r) => r.id === selectedRoom) || roomTypes[0];
  const currentFinish = finishTypes.find((f) => f.id === selectedFinish) || finishTypes[0];

  const baseRate = Math.round(currentRoom.rate * currentFinish.multiplier);
  const estimatedExact = sqft * baseRate;

  const trustBadges = [
    {
      title: '100% Waterproof',
      desc: 'Completely immune to dampness, moisture, and kitchen steam.',
      icon: Droplets,
      badge: 'Zero Swelling'
    },
    {
      title: 'Termite & Borer Proof',
      desc: 'Engineered synthetic PVC profile never rots or attracts pests.',
      icon: BugOff,
      badge: 'Lifetime Immune'
    },
    {
      title: 'Upper Lofts & Fluted Louvers',
      desc: 'Custom ceiling-high storage lofts (mala) and 3D acoustic wall slats.',
      icon: Sparkles,
      badge: 'Custom Sizing'
    },
    {
      title: 'KAKA PVC Certified',
      desc: 'Fabricated with 100% genuine virgin KAKA PVC profile extrusions.',
      icon: ShieldCheck,
      badge: '10-Yr Guarantee'
    }
  ];

  const comparisonData = [
    {
      feature: 'Moisture & Water Damage',
      pvc: '100% Waterproof (Washable with water)',
      wood: 'Swells, rots & delaminates over time',
      pvcWins: true
    },
    {
      feature: 'Termite & Pest Attack',
      pvc: 'Zero Termite Risk (Inorganic polymer)',
      wood: 'High Risk (Requires annual chemical spray)',
      pvcWins: true
    },
    {
      feature: 'Upper Lofts & Mala Storage',
      pvc: 'Lightweight & sturdy, no sagging',
      wood: 'Heavy weight causes hinge failure',
      pvcWins: true
    },
    {
      feature: 'Periodic Maintenance',
      pvc: 'Zero Repainting & Zero Polishing Needed',
      wood: 'Needs expensive re-polishing every 2-3 years',
      pvcWins: true
    },
    {
      feature: 'Fire Safety',
      pvc: 'Self-Extinguishing & Flame Retardant',
      wood: 'Highly flammable cellulosic fuel',
      pvcWins: true
    }
  ];

  return (
    <div className="pb-20 relative">
      {/* 1. SCROLL PROGRESS INDICATOR */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200/50 dark:bg-white/10 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-luxury-gold via-amber-400 to-luxury-goldDark transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. DYNAMIC ARCHITECTURAL HERO SECTION (Interactive 21st.dev / Origin-Style Deck) */}
      <HeroSection onOpenShowreel={() => setShowVideoModal(true)} />

      {/* Rest of Page Sections with consistent spacing */}
      <div className="space-y-16 sm:space-y-24 mt-12 sm:mt-16">

      {/* 3. CORE VALUE PILLARS (Dark & Light Adaptive) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-luxury-gold flex items-center justify-center group-hover:bg-obsidian dark:group-hover:bg-luxury-gold group-hover:text-luxury-gold dark:group-hover:text-obsidian transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-charcoal-light dark:text-slate-300 uppercase border border-slate-200 dark:border-white/10">
                      {badge.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-obsidian dark:text-white mb-1.5 group-hover:text-luxury-goldDark dark:group-hover:text-luxury-gold transition-colors">
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.5 ALL COMPANIES PVC MATERIAL WORK AVAILABLE (PROMINENT ATTACHMENT) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-stone-900 via-[#1F1E1D] to-stone-900 border border-luxury-gold/40 text-white shadow-floating flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-2xl bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40 flex items-center justify-center shrink-0">
              <Layers className="w-7 h-7 text-luxury-gold" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40">
                  Certified Fabrication
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  ✓ 100% Genuine Profiles
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-2xl text-white">
                All Companies PVC Material Work Available
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                Hum <strong>KAKA PVC PROFILE</strong>, <strong>TAASA</strong>, aur sabhi leading certified brands ke PVC profiles aur high-gloss sheets me custom fabrication aur fitting karte hain. Customer apni pasand aur budget ke according koi bhi company material choose kar sakte hain.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/services"
              className="flex-1 sm:flex-none text-center px-5 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-[#121212] text-xs font-black shadow-sm transition-all active:scale-95"
            >
              Explore Services
            </Link>
            <a
              href="https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20want%20to%20inquire%20about%20All%20Company%20PVC%20Material%20options%20and%20rates"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none text-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all active:scale-95"
            >
              Ask Material Rates
            </a>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SHOWROOM CATALOG (With High-End Studio Photography) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL CATALOG</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
                Signature Interior Categories
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-obsidian dark:text-luxury-gold hover:text-luxury-gold transition-colors"
            >
              <span>View All 6 Categories</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => {
              const photoUrl = getImageByKey(service.imageKey || service.id);
              return (
                <div
                  key={service.id}
                  className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-soft hover:shadow-floating transition-all duration-500 flex flex-col hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={photoUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-obsidian/90 backdrop-blur-md text-[10px] font-bold text-obsidian dark:text-white uppercase tracking-wider shadow-sm">
                        KAKA PVC Certified
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-medium text-luxury-goldLight">Starting at</p>
                      <p className="text-sm font-serif font-bold text-white">₹450 - ₹800 / sq. ft.</p>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-obsidian dark:text-white group-hover:text-luxury-goldDark dark:group-hover:text-luxury-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {service.shortDesc || service.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                      <Link
                        to={`/services/${service.id}`}
                        className="text-xs font-bold text-charcoal dark:text-slate-300 hover:text-luxury-gold inline-flex items-center gap-1 group/btn"
                      >
                        <span>Specifications & Colors</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        to={`/book?service=${service.id}`}
                        className="px-3.5 py-1.5 rounded-lg bg-obsidian dark:bg-white/10 hover:bg-charcoal dark:hover:bg-white/20 text-white text-xs font-bold transition-colors"
                      >
                        Book Visit
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LIVSPACE-STYLE INTERACTIVE COST & FINISH ESTIMATOR */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-obsidian via-charcoal to-obsidian text-white p-6 sm:p-10 lg:p-14 shadow-floating border border-white/10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-luxury-gold/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxury-gold/20 text-luxury-goldLight text-[11px] font-bold tracking-wider uppercase border border-luxury-gold/30 mb-2">
                    <Calculator className="w-3.5 h-3.5 text-luxury-goldLight" />
                    <span>LIVSPACE-STYLE ESTIMATOR</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                    Instant Cost Calculator
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Calculate verified turnkey PVC interior cost based on room type, material finish, and carpet area.
                  </p>
                </div>

                {/* 1. Room Type Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                    1. Select Room / Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {roomTypes.map((room) => {
                      const isSelected = selectedRoom === room.id;
                      return (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => {
                            setSelectedRoom(room.id);
                            setSqft(room.defaultSqft);
                          }}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            isSelected
                              ? 'bg-luxury-gold/20 border-luxury-gold text-white shadow-soft scale-105'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-xl block mb-1">{room.icon}</span>
                          <span className="text-xs font-bold block">{room.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Finish Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                    2. Choose Premium PVC Surface Texture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {finishTypes.map((finish) => {
                      const isSelected = selectedFinish === finish.id;
                      return (
                        <button
                          key={finish.id}
                          type="button"
                          onClick={() => setSelectedFinish(finish.id)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            isSelected
                              ? 'bg-luxury-gold/20 border-luxury-gold text-white'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{finish.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-luxury-gold" />}
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {finish.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Area Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      3. Approximate Area / Surface Size
                    </label>
                    <span className="text-sm font-bold text-luxury-goldLight bg-white/10 px-3 py-0.5 rounded-lg">
                      {sqft} sq. ft.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>50 sq. ft. (TV console)</span>
                    <span>500 sq. ft.</span>
                    <span>1,000 sq. ft. (Full Flat)</span>
                  </div>
                </div>
              </div>

              {/* Right Output Card */}
              <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Estimated Project Cost
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-serif font-black text-luxury-goldLight">
                      ₹{estimatedExact.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-300">approx. total</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Rate range: ₹450 to ₹800 per sq. ft. based on accessories & custom hinges.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-200 border-y border-white/15 py-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Virgin KAKA PVC Profiles</span>
                    </span>
                    <span className="font-semibold text-white">Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Termite & Water Resistance</span>
                    </span>
                    <span className="font-semibold text-white">100% Lifetime</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>On-Site Laser Measurement</span>
                    </span>
                    <span className="font-semibold text-emerald-400">FREE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Expert Fabrication & Setup</span>
                    </span>
                    <span className="font-semibold text-white">7 to 10 Days</span>
                  </div>
                </div>

                <Link
                  to={`/book?service=${selectedRoom}&area=${sqft}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-luxury-gold hover:bg-amber-400 text-obsidian text-xs sm:text-sm font-black shadow-gold-glow transition-all active:scale-95"
                >
                  <span>Lock This Estimate & Book Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[10px] text-center text-slate-400">
                  Zero advance booking fee. Free home consultation in Vastral & Ahmedabad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PVC VS TRADITIONAL WOOD COMPARISON MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold block mb-1">
              SMART HOMEOWNER CHOICE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
              Why KAKA PVC Beats Traditional Wood
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-2">
              See why hundreds of Ahmedabad homeowners are replacing rotting plywood with high-grade synthetic PVC interior profiles.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[620px] rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-soft overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                    <th className="py-4 px-6 font-serif font-bold text-obsidian dark:text-white">Interior Feature</th>
                    <th className="py-4 px-6 font-serif font-bold text-luxury-goldDark dark:text-luxury-gold bg-amber-50/50 dark:bg-amber-500/10">
                      Shree Shyam (KAKA PVC)
                    </th>
                    <th className="py-4 px-6 font-serif font-bold text-charcoal-muted dark:text-slate-400">
                      Traditional Wood / MDF
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-obsidian dark:text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span>{row.feature}</span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-emerald-800 dark:text-emerald-400 bg-amber-50/20 dark:bg-amber-500/5">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{row.pvc}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-charcoal-muted dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <X className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>{row.wood}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BEFORE & AFTER TRANSFORMATION SHOWCASE (Studio Photos) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-luxury-gold uppercase tracking-widest block">
                TRANSFORMATION SHOWCASE
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Turn Damp Damaged Walls Into Luxury Marble Louvers
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ahmedabad's climate causes peeling paint, damp seepage, and termite decay in regular walls. Shree Shyam PVC installs solid waterproof cladding in hours without wet cement or dust.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-luxury-gold font-serif font-bold text-base">Zero Demolition</p>
                  <p className="text-[11px] text-slate-300">Direct installation over existing walls.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-luxury-gold font-serif font-bold text-base">Same-Day Finish</p>
                  <p className="text-[11px] text-slate-300">Ready to use living spaces within 24 hrs.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-obsidian text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  <span>Explore 34+ Real Projects in Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 group">
                <img
                  src={images.wallPanels}
                  alt="PVC Wall Cladding Finished"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-luxury-goldLight">
                  Fluted Louver & Marble Wall
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 group">
                <img
                  src={images.kitchen}
                  alt="PVC Modular Kitchen Finished"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-luxury-goldLight">
                  Waterproof Modular Kitchen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED CUSTOMER REVIEWS (Always visible to everyone) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-stone-200 dark:border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold block mb-1">
                VERIFIED TESTIMONIALS
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
                Trusted by 500+ Ahmedabad Families
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-[#121212] text-xs font-black shadow-sm transition-all active:scale-95"
              >
                <span>Write a Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/reviews"
                className="inline-flex items-center gap-1 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-obsidian dark:hover:text-white transition-colors"
              >
                <span>View All Reviews</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1A1918] border border-stone-200/90 dark:border-white/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ✓ Verified Client
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-100 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/20 text-luxury-goldDark dark:text-luxury-gold font-bold font-serif flex items-center justify-center border border-luxury-gold/30 shrink-0 text-sm">
                    {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-obsidian dark:text-white leading-tight">{rev.name}</h4>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                      {rev.serviceUsed} • {rev.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SHOWROOM VISIT & LOCATION BAR */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-obsidian dark:bg-white/10 text-luxury-gold flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-obsidian dark:text-white">
                Visit Our Workshop & Experience Center
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-0.5">
                {settings.address || 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad'}
              </p>
              <p className="text-[11px] text-charcoal-light dark:text-slate-300 font-semibold mt-1">
                Mon - Sat: 9:00 AM - 8:30 PM | Direct Hotline: {settings.phone1} / {settings.phone2}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/location"
              className="flex-1 md:flex-none text-center px-5 py-2.5 rounded-xl bg-obsidian dark:bg-white/10 text-white text-xs font-bold hover:bg-charcoal dark:hover:bg-white/20 transition-colors"
            >
              Get Directions
            </Link>
            <a
              href={`https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20want%20to%20visit%20your%20Vastral%20workshop`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* 10. SCROLL-TRIGGERED FLOATING BOTTOM ACTION BAR (Desktop only, mobile uses BottomNav) */}
      {showFloatingBar && (
        <div className="hidden md:block fixed md:bottom-6 left-4 right-4 max-w-xl mx-auto z-40 animate-fade-in-up">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-obsidian/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/15 text-white shadow-floating flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">Shree Shyam PVC Interior</p>
                <p className="text-[10px] text-luxury-goldLight truncate">Free Site Measurement in Vastral</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${settings.phone1}`}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                <span className="hidden sm:inline">Call Now</span>
              </a>

              <a
                href="https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20am%20interested%20in%20a%20free%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <Link
                to="/book"
                className="px-3.5 py-1.5 rounded-xl bg-luxury-gold hover:bg-amber-400 text-obsidian text-xs font-black transition-colors shadow-gold-glow"
              >
                Book Visit
              </Link>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* 11. VIDEO SHOWREEL MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full max-w-3xl bg-obsidian rounded-2xl overflow-hidden border border-white/20 shadow-floating">
            <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-luxury-gold" />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Shree Shyam PVC Fabrication & Work Showreel
                </span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={images.hero}
                alt="Showreel Preview"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white space-y-3">
                <span className="w-16 h-16 rounded-full bg-luxury-gold text-obsidian flex items-center justify-center shadow-gold-glow animate-pulse">
                  <Play className="w-7 h-7 fill-obsidian ml-1" />
                </span>
                <p className="font-serif font-bold text-lg">PVC Fabrication & Installation Quality</p>
                <p className="text-xs text-slate-300 max-w-md">
                  Real video tour of finished modular kitchens and fluted louvers installed in Ahmedabad.
                </p>
              </div>
            </div>

            <div className="p-4 bg-charcoal flex items-center justify-between text-xs text-slate-300">
              <span>Visit our Vastral workshop for full live catalogue.</span>
              <Link
                to="/book"
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 rounded-lg bg-luxury-gold text-obsidian font-bold hover:bg-amber-400 transition-colors"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
