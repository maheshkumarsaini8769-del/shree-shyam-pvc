import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Phone,
  ShieldCheck,
  Droplets,
  Star,
  CheckCircle2,
  Compass,
  Flame,
  Zap,
  Clock,
  Check,
  MessageCircle,
  Eye
} from 'lucide-react';
import { images } from '../data/images';
import { useSettings } from '../context/SettingsContext';

export const HeroSection = ({ onOpenShowreel }) => {
  const { settings } = useSettings();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [progress, setProgress] = useState(0);

  const [isAmbientNight, setIsAmbientNight] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [quickEstimate, setQuickEstimate] = useState('tv');

  const slides = [
    {
      id: 'tv-unit',
      code: 'tv',
      category: 'LIVING ROOM SPECIALTY',
      shortTitle: 'TV Unit & Louvers',
      title: 'Fluted TV Units & Acoustic Louvers',
      subtitle: 'Architectural charcoal & teak louvers with Italian Statuario marble PVC backings and floating consoles.',
      image: images.tvUnit || images.hero,
      statNumber: '150+',
      statLabel: 'Installed in Ahmedabad',
      badge: 'Bestseller in Ahmedabad',
      priceRange: '₹18,000 - ₹45,000',
      timeframe: '4-6 Days Delivery',
      features: ['Acoustic Louver Panels', 'Statuario Marble Sheet', 'Concealed LED Troughs', 'Soft-Close Drawers'],
      swatches: [
        { name: 'Smoked Walnut', color: '#5C4033', texture: 'Natural Woodgrain' },
        { name: 'Statuario Marble', color: '#E8E8E8', texture: 'High-Gloss UV' },
        { name: 'Charcoal Louver', color: '#2B2B2B', texture: 'Matte Fluted Slat' },
        { name: 'Champagne Brass', color: '#C5A059', texture: 'Metallic Trim' }
      ],
      hotspots: [
        { id: 1, x: 26, y: 34, title: 'Fluted Acoustic Louver', spec: '100% Termite Proof • Acoustic Sound Dampening' },
        { id: 2, x: 66, y: 44, title: 'Italian Statuario Marble Sheet', spec: 'UV Gloss Coated • 0% Water Absorption' },
        { id: 3, x: 48, y: 78, title: 'Floating Entertainment Console', spec: 'Hafele Soft-Close Drawers • Concealed Trough' }
      ]
    },
    {
      id: 'kitchen',
      code: 'kitchen',
      category: '100% WATERPROOF INTERIOR',
      shortTitle: 'Modular Kitchen',
      title: 'Luxury PVC Modular Kitchens',
      subtitle: 'Zero wood swelling, lifetime termite immunity, boiling-water resistance, and heavy-duty tandem drawer systems.',
      image: images.kitchen,
      statNumber: '10 Yrs',
      statLabel: 'Immersion Warranty',
      badge: 'Zero Swelling Guarantee',
      priceRange: '₹65,000 - ₹1,40,000',
      timeframe: '7-10 Days Delivery',
      features: ['100% Virgin KAKA Profile', 'Termite & Borer Immune', 'Soft-Close Tandem Baskets', 'Oil & Stain Washable'],
      swatches: [
        { name: 'High-Gloss Cream', color: '#FFFDD0', texture: 'Mirror Acrylic' },
        { name: 'Basalt Charcoal', color: '#333333', texture: 'Matte Anti-Fingerprint' },
        { name: 'Warm Teakwood', color: '#82522C', texture: 'Warm Teak Grain' },
        { name: 'Alabaster White', color: '#F4F4F0', texture: 'Seamless Core' }
      ],
      hotspots: [
        { id: 1, x: 30, y: 42, title: 'Virgin KAKA PVC Cabinets', spec: 'Washable with water • Lifetime zero rotting' },
        { id: 2, x: 74, y: 64, title: 'Soft-Close Tandem Drawers', spec: '45kg Heavy-duty load tested • Smooth glide' },
        { id: 3, x: 52, y: 22, title: 'Hydraulic Overhead Liftups', spec: 'Easy touch lift • Silent soft landing' }
      ]
    },
    {
      id: 'wardrobe',
      code: 'wardrobe',
      category: 'BEDROOM STORAGE SYSTEM',
      shortTitle: 'Sliding Wardrobes',
      title: 'Master Sliding Wardrobes & Lofts',
      subtitle: 'Floor-to-ceiling storage with ceiling lofts (mala), integrated dressing mirrors, and internal safety lockers.',
      image: images.wardrobe,
      statNumber: '500+',
      statLabel: 'Ahmedabad Homes',
      badge: 'Custom Height & Mala',
      priceRange: '₹38,000 - ₹85,000',
      timeframe: '5-7 Days Delivery',
      features: ['Ceiling Storage Lofts', 'Integrated Dresser Mirror', 'Anti-Jump Sliding Track', 'Lockable Cash Drawers'],
      swatches: [
        { name: 'Teal & White', color: '#1A535C', texture: 'Designer Duo' },
        { name: 'Champagne Matte', color: '#DFBA73', texture: 'Satin Sheen' },
        { name: 'Natural Oak', color: '#A07855', texture: 'Textured Teak' },
        { name: 'Blush & White', color: '#E0A899', texture: 'Contemporary Blend' }
      ],
      hotspots: [
        { id: 1, x: 36, y: 18, title: 'Ceiling Storage Loft (Mala)', spec: 'Full ceiling height • Zero hinge sagging' },
        { id: 2, x: 72, y: 50, title: 'Integrated Dressing Unit', spec: 'Full length bevel mirror with hidden shelves' },
        { id: 3, x: 26, y: 68, title: 'Heavy-Duty Sliding Track', spec: 'Silent nylon rollers • Anti-jump lock' }
      ]
    },
    {
      id: 'wall-panels',
      code: 'wall',
      category: 'DECORATIVE CLADDING',
      shortTitle: 'Wall Louvers',
      title: 'Acoustic Wall Panels & Ceilings',
      subtitle: 'Seamless 3D fluted panels, moisture-proof ceiling louvers, and decorative PVC wall paneling with zero repainting.',
      image: images.wallPanels,
      statNumber: '100%',
      statLabel: 'Maintenance-Free',
      badge: 'Zero Repainting Needed',
      priceRange: '₹65 - ₹120 / sq.ft',
      timeframe: '2-3 Days Delivery',
      features: ['3D Wave Slat Louvers', 'Moisture Resistant', 'Quick 24-Hr Installation', 'Sound Dampening'],
      swatches: [
        { name: 'Charcoal Acoustic', color: '#1F2421', texture: 'Sound-Barrier' },
        { name: 'Scandinavian Pine', color: '#C8A882', texture: 'Nordic Grain' },
        { name: 'Pure Onyx White', color: '#F8F9FA', texture: 'Interlocking White' },
        { name: 'Smoked Teak', color: '#6A4A3C', texture: 'Rich Deep Wood' }
      ],
      hotspots: [
        { id: 1, x: 38, y: 36, title: '3D Wave Acoustic Profile', spec: 'Absorbs echo • Elegant vertical lines' },
        { id: 2, x: 76, y: 26, title: 'Interlocking Tongue-and-Groove', spec: 'Zero gap joints • No visible nail marks' },
        { id: 3, x: 50, y: 72, title: 'Fire-Retardant PVC Compound', spec: 'Self-extinguishing KAKA profile rating' }
      ]
    }
  ];

  const current = slides[activeSlide];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const totalDuration = 5500;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((s) => (s + 1) % slides.length);
          setActiveSwatch(0);
          setActiveHotspot(null);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, slides.length, activeSlide]);

  const handleSelectSlide = (idx) => {
    setActiveSlide(idx);
    setActiveSwatch(0);
    setActiveHotspot(null);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setActiveSwatch(0);
    setActiveHotspot(null);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setActiveSwatch(0);
    setActiveHotspot(null);
    setProgress(0);
  };

  const estimatePresets = [
    { key: 'tv', label: 'TV Unit', size: '8x7 ft', est: '₹18,000 - ₹35,000', days: '4-5 Days' },
    { key: 'kitchen', label: 'Kitchen', size: '10x8 ft', est: '₹65,000 - ₹1.2L', days: '7-10 Days' },
    { key: 'wardrobe', label: 'Wardrobe', size: '7x7 ft', est: '₹38,000 - ₹68,000', days: '5-7 Days' },
    { key: 'wall', label: 'Louvers', size: '120 sq.ft', est: '₹8,500 - ₹16,000', days: '2-3 Days' }
  ];

  const activeEstimate = estimatePresets.find((p) => p.key === quickEstimate) || estimatePresets[0];

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-[#F7F5F0] dark:from-[#121212] dark:via-[#161514] dark:to-[#121212] border-b border-stone-200/80 dark:border-white/10 transition-colors duration-300 !mt-0 !pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Ambient Lighting Atmosphere */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-luxury-gold/10 dark:bg-luxury-gold/5 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 pb-8 sm:py-10 lg:py-14">
        
        {/* TOP NOTICE: Mobile & Desktop Real-Time Consulting Signal */}
        <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100/90 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-[11px] sm:text-xs font-semibold text-stone-700 dark:text-stone-300 shadow-sm max-w-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">
              <strong className="text-obsidian dark:text-white">Ahmedabad Direct:</strong> Free laser measurement & finish samples
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-1.5 text-luxury-gold">
              <ShieldCheck className="w-4 h-4 text-luxury-gold" />
              <span className="text-obsidian dark:text-stone-200">100% Virgin KAKA Profile</span>
            </div>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <div className="flex items-center gap-1.5 text-luxury-gold">
              <Droplets className="w-4 h-4 text-luxury-gold" />
              <span className="text-obsidian dark:text-stone-200">Zero Water Swelling</span>
            </div>
          </div>
        </div>

        {/* HERO CONTENT CONTAINER: Flex-col on mobile, 2-Col Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
          
          {/* TEXT & CTAS (Order 1 on mobile, left 6 cols on desktop) */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-5">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxury-gold/15 text-luxury-goldDark dark:text-luxury-gold text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-luxury-gold/30">
              <Sparkles className="w-3 h-3 text-luxury-gold shrink-0" />
              <span className="truncate">{current.category}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-obsidian dark:text-white tracking-tight leading-[1.18] sm:leading-[1.14]">
              {current.title.split('&').map((part, i) => (
                <React.Fragment key={i}>
                  {i === 0 ? (
                    part
                  ) : (
                    <>
                      &amp;{' '}
                      <span className="italic font-normal text-transparent bg-gradient-to-r from-luxury-gold via-amber-400 to-luxury-goldLight bg-clip-text">
                        {part.trim()}
                      </span>
                    </>
                  )}
                </React.Fragment>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-stone-600 dark:text-stone-300 font-normal leading-relaxed line-clamp-2 sm:line-clamp-none max-w-xl">
              {current.subtitle}
            </p>

            {/* Feature Checklist (Desktop only or clean single row on mobile) */}
            <div className="hidden sm:grid grid-cols-2 gap-2 pt-1">
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-stone-700 dark:text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold shrink-0 stroke-[2.2]" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* MOBILE QUICK SHOWCASE CARD (Rendered here on Mobile, Hidden on Desktop) */}
            <div className="block lg:hidden my-3">
              <div className={`relative rounded-2xl overflow-hidden shadow-soft border transition-all duration-300 bg-stone-900 ${
                isAmbientNight
                  ? 'border-amber-400/60 shadow-[0_0_30px_rgba(217,119,6,0.3)]'
                  : 'border-stone-200 dark:border-white/15'
              }`}>
                {/* 16:10 / 4:3 Aspect Ratio Container for mobile perfection */}
                <div className="relative aspect-[16/11] w-full overflow-hidden select-none">
                  <img
                    key={current.id}
                    src={current.image}
                    alt={current.title}
                    className={`w-full h-full object-cover object-center transition-all duration-500 ${
                      isAmbientNight ? 'brightness-90 contrast-110 saturate-110' : ''
                    }`}
                    loading="eager"
                  />

                  {/* Ambient Night Overlay */}
                  {isAmbientNight && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/70 via-amber-600/20 to-transparent mix-blend-color-dodge pointer-events-none transition-opacity duration-500" />
                  )}

                  {/* Gentle Dark Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-transparent to-black/30 pointer-events-none" />

                  {/* Mobile Top Bar: Badge + Ambient Toggle */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-1 pointer-events-auto">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {current.badge}
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsAmbientNight(!isAmbientNight)}
                      className={`px-2 py-1 rounded-lg backdrop-blur-md border text-[10px] font-bold flex items-center gap-1 transition-all ${
                        isAmbientNight
                          ? 'bg-amber-500/35 border-amber-400 text-amber-200 shadow-sm'
                          : 'bg-black/60 border-white/20 text-white/90'
                      }`}
                    >
                      {isAmbientNight ? <Zap className="w-3 h-3 text-amber-300 fill-amber-300" /> : <Flame className="w-3 h-3 text-amber-400" />}
                      <span>{isAmbientNight ? 'LED ON' : '3000K LED'}</span>
                    </button>
                  </div>

                  {/* Mobile Bottom Info Capsule */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between gap-2 bg-black/75 backdrop-blur-lg px-3 py-2 rounded-xl border border-white/15">
                    <div className="truncate">
                      <span className="text-[11px] font-bold text-white block truncate">
                        {current.shortTitle}
                      </span>
                      <span className="text-[10px] text-luxury-gold font-medium block">
                        {current.priceRange} • {current.timeframe}
                      </span>
                    </div>

                    {/* Quick Slide Arrow Navigators */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={handlePrev}
                        aria-label="Previous"
                        className="p-1 rounded-md bg-white/15 active:bg-white/30 text-white transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-[10px] text-white/80 px-1">
                        0{activeSlide + 1}
                      </span>
                      <button
                        onClick={handleNext}
                        aria-label="Next"
                        className="p-1 rounded-md bg-white/15 active:bg-white/30 text-white transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Material Swatches Ribbon (Neat & Clean Below Photo) */}
                <div className="p-2.5 bg-stone-900 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {current.swatches.map((sw, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setActiveSwatch(sIdx)}
                        className={`w-5 h-5 rounded-full border transition-all shrink-0 ${
                          activeSwatch === sIdx
                            ? 'border-luxury-gold scale-125 ring-2 ring-luxury-gold/50'
                            : 'border-white/30 opacity-70'
                        }`}
                        style={{ backgroundColor: sw.color }}
                        title={sw.name}
                      />
                    ))}
                    <span className="text-[10px] font-medium text-stone-300 ml-1.5 truncate max-w-[130px]">
                      {current.swatches[activeSwatch]?.name}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase font-bold text-luxury-gold shrink-0">
                    KAKA Profile
                  </span>
                </div>
              </div>
            </div>

            {/* CTAS: Mobile Optimized Full-Width Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <Link
                to="/book"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-[#121212] text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 group text-center"
              >
                <span>Book Free Site Visit</span>
                <ArrowRight className="w-4 h-4 text-[#121212] group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <a
                  href={`https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20am%20interested%20in%20a%20free%20quote`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenShowreel}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/15 text-obsidian dark:text-white border border-stone-200 dark:border-white/10 text-xs font-semibold transition-all active:scale-95"
                >
                  <Play className="w-3 h-3 fill-current text-luxury-gold" />
                  <span>Showreel</span>
                </button>
              </div>
            </div>

            {/* INSTANT FABRICATION ESTIMATOR CAPSULE */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-stone-100/90 dark:bg-[#1A1918]/90 border border-stone-200 dark:border-white/10 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-stone-600 dark:text-stone-300">
                <span className="flex items-center gap-1 text-obsidian dark:text-white">
                  <Clock className="w-3.5 h-3.5 text-luxury-gold" />
                  Instant Factory Estimator
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" /> Direct Fitting
                </span>
              </div>

              {/* Segmented Control Selector */}
              <div className="grid grid-cols-4 gap-1 bg-stone-200/60 dark:bg-white/5 p-1 rounded-xl">
                {estimatePresets.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setQuickEstimate(preset.key)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all text-center truncate ${
                      quickEstimate === preset.key
                        ? 'bg-white dark:bg-stone-800 text-obsidian dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                        : 'text-stone-600 dark:text-stone-400 hover:text-obsidian dark:hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Output Display & 1-Click WhatsApp Trigger */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-200/80 dark:border-white/10">
                <div className="truncate">
                  <span className="text-xs sm:text-sm font-bold text-obsidian dark:text-white font-serif block">
                    {activeEstimate.est}
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] text-stone-500 dark:text-stone-400 block truncate">
                    Ready in {activeEstimate.days} ({activeEstimate.size})
                  </span>
                </div>

                <a
                  href={`https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20want%20price%20details%20for%20${encodeURIComponent(activeEstimate.label)}%20(${encodeURIComponent(activeEstimate.size)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-luxury-gold hover:bg-luxury-goldDark text-[#121212] text-[10px] sm:text-[11px] font-black shrink-0 shadow-sm transition-all active:scale-95"
                >
                  <span>Get Estimate</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Trust Mini-Bar (Compact for Mobile) */}
            <div className="pt-2 flex items-center justify-between sm:justify-start gap-4 sm:gap-6 border-t border-stone-200/80 dark:border-white/10">
              <div>
                <p className="text-lg sm:text-2xl font-serif font-black text-obsidian dark:text-white">{current.statNumber}</p>
                <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-medium">{current.statLabel}</p>
              </div>
              <div className="h-7 w-px bg-stone-200 dark:bg-white/10" />
              <div>
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">4.9/5 Rating (120+ Reviews)</p>
              </div>
            </div>
          </div>

          {/* DESKTOP SHOWCASE DECK (Visible only on Large Screens lg:col-span-6) */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div className={`relative rounded-3xl overflow-hidden shadow-floating border transition-all duration-500 bg-stone-900 group ${
              isAmbientNight
                ? 'border-amber-400/50 shadow-[0_0_50px_rgba(217,119,6,0.3)]'
                : 'border-stone-200 dark:border-white/15'
            }`}>
              {/* Dynamic Showcase Image */}
              <div className="relative h-[490px] w-full overflow-hidden select-none">
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105 animate-fade-in-up ${
                    isAmbientNight ? 'brightness-90 contrast-110 saturate-110' : ''
                  }`}
                  loading="eager"
                />

                {/* Ambient Night Warm Cove Lighting Overlay */}
                {isAmbientNight && (
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/70 via-amber-600/20 to-amber-900/10 mix-blend-color-dodge pointer-events-none transition-opacity duration-700 animate-fade-in-up" />
                )}

                {/* Dark Smoked Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/30 to-transparent pointer-events-none" />

                {/* TOP BAR OVERLAY: Quality Badge & Ambiance Toggle */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-auto">
                  <div className="px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{current.badge}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAmbientNight(!isAmbientNight)}
                      className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                        isAmbientNight
                          ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                          : 'bg-black/60 border-white/20 text-white/90 hover:bg-black/80'
                      }`}
                      title="Toggle Concealed LED Lighting Simulation"
                    >
                      {isAmbientNight ? (
                        <>
                          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                          <span>3000K LED: ON</span>
                        </>
                      ) : (
                        <>
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>3000K LED: OFF</span>
                        </>
                      )}
                    </button>

                    <div className="px-2.5 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold shadow-sm">
                      <span className="text-luxury-gold">0{activeSlide + 1}</span>/0{slides.length}
                    </div>
                  </div>
                </div>

                {/* PULSING ARCHITECTURAL HOTSPOTS (Desktop Only) */}
                {current.hotspots.map((spot) => {
                  const isHovered = activeHotspot === spot.id;
                  return (
                    <div
                      key={spot.id}
                      className="absolute z-20"
                      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    >
                      <div className="relative group/spot">
                        <div className="absolute -inset-2 rounded-full bg-luxury-gold/50 animate-ping opacity-75 pointer-events-none" />

                        <button
                          type="button"
                          onClick={() => setActiveHotspot(isHovered ? null : spot.id)}
                          onMouseEnter={() => setActiveHotspot(spot.id)}
                          onMouseLeave={() => setActiveHotspot(null)}
                          className={`relative w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg transition-transform transform ${
                            isHovered
                              ? 'scale-125 bg-luxury-gold text-[#121212] ring-4 ring-luxury-gold/40'
                              : 'bg-[#121212]/90 backdrop-blur-md border border-luxury-gold text-luxury-gold hover:scale-110'
                          }`}
                          aria-label={`View spec: ${spot.title}`}
                        >
                          <span className="font-mono text-[9px] font-black">{spot.id}</span>
                        </button>

                        <div
                          className={`absolute z-30 bottom-full mb-3 left-1/2 -translate-x-1/2 w-60 p-3 rounded-2xl bg-[#161514]/95 backdrop-blur-xl border border-luxury-gold/40 shadow-2xl transition-all duration-200 pointer-events-auto ${
                            isHovered
                              ? 'opacity-100 scale-100 translate-y-0'
                              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <div className="flex items-center justify-between text-luxury-gold text-[10px] font-bold uppercase tracking-wider mb-1">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-luxury-gold" />
                              Spec Detail
                            </span>
                            <span className="text-white/40 font-mono">0{spot.id}</span>
                          </div>
                          <p className="text-xs font-bold text-white leading-snug">{spot.title}</p>
                          <p className="text-[11px] text-stone-300 mt-1 leading-snug font-normal">{spot.spec}</p>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#161514] -mt-px" />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* BOTTOM FLOATING BAR: Material Swatches & Navigation */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-black/70 backdrop-blur-xl p-3.5 rounded-2xl border border-white/15 shadow-xl">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-stone-400 block">
                      Finish Swatch • {current.swatches[activeSwatch]?.texture}
                    </span>
                    <span className="text-xs font-bold text-white block">
                      {current.swatches[activeSwatch]?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {current.swatches.map((sw, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setActiveSwatch(sIdx)}
                        aria-label={`Select ${sw.name} finish`}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          activeSwatch === sIdx
                            ? 'border-luxury-gold scale-110 shadow-sm ring-2 ring-luxury-gold/50'
                            : 'border-white/30 hover:border-white/60 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: sw.color }}
                        title={`${sw.name} - ${sw.texture}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 border-l border-white/20 pl-3">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Project"
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next Project"
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Card Overlay */}
            <div className="absolute -bottom-4 -left-6 z-30 p-3.5 rounded-2xl bg-white dark:bg-[#1A1918] border border-stone-200 dark:border-white/15 shadow-floating flex items-center gap-3 max-w-[240px]">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/15 text-luxury-gold flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-luxury-gold" />
              </div>
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-obsidian dark:text-white block">Custom 3D Layout</span>
                <span className="text-stone-500 dark:text-stone-400 text-[10px]">Laser-accurate room measurements in Ahmedabad</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Horizontal Slide Selector Tabs (Clean on Mobile, Tabs on Desktop) */}
        <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-stone-200/80 dark:border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {slides.map((slide, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`group relative text-left p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 border ${
                    isActive
                      ? 'bg-white dark:bg-[#1A1918] border-luxury-gold shadow-soft ring-1 ring-luxury-gold/30'
                      : 'bg-stone-50/70 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border-stone-200/80 dark:border-white/10'
                  }`}
                >
                  {/* Linear Progress Bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-stone-200 dark:bg-white/10 rounded-t-xl sm:rounded-t-2xl overflow-hidden">
                      <div
                        className="h-full bg-luxury-gold transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                    <span className={`text-[9.5px] sm:text-[10px] font-mono font-bold ${
                      isActive ? 'text-luxury-goldDark dark:text-luxury-gold' : 'text-stone-400'
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-stone-400 truncate">
                      {slide.priceRange}
                    </span>
                  </div>

                  <p className={`font-serif text-xs sm:text-sm font-bold truncate ${
                    isActive ? 'text-obsidian dark:text-white' : 'text-stone-700 dark:text-stone-300'
                  }`}>
                    {slide.shortTitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
