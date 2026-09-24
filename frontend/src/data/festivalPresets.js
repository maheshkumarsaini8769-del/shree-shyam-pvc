/**
 * Pre-configured festive themes, banners, greetings, atmospheric color schemes
 * and interactive festive popup offers for Shree Shyam PVC Interior.
 * Enables 1-click festive activation from Admin Panel.
 */

export const FESTIVAL_PRESETS = {
  normal: {
    id: 'normal',
    isFestive: false,
    themeKey: 'normal',
    name: 'Normal (Standard Everyday Theme)',
    themeName: 'Standard Luxury Theme',
    icon: '🏛️',
    decorIcons: [],
    badgeText: 'Ahmedabad Direct: All Companies PVC Material Work Available (KAKA, TAASA & Major Brands)',
    greeting: '',
    announcement: 'All Company PVC Material Work Available • KAKA, TAASA & All Major Brands • 10-Yr Guarantee • Free Ahmedabad Site Visit',
    offerTagline: 'Zero Wood Swelling • 100% Termite Proof • Factory-Direct Pricing in Vastral',
    discountPercent: 0,
    accentColor: '#C5A059',
    primaryGlow: 'rgba(197, 160, 89, 0.15)',
    showFestiveBadge: false,
    showPopup: false,
    modalTitle: 'Shree Shyam PVC Interior',
    modalSubtitle: 'Premium Modular PVC Kitchens, Wardrobes, & Wall Louvers',
    themeClasses: {
      barBg: 'bg-gradient-to-r from-[#121212] via-[#2A2318] to-[#121212] border-b border-luxury-gold/30 text-stone-200',
      ribbonBg: 'bg-white/5 border border-stone-200 dark:border-white/10',
      badgeBg: 'bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-200',
      popupHeaderBg: 'bg-gradient-to-r from-luxury-gold to-luxury-goldDark text-stone-950',
      buttonBg: 'bg-luxury-gold hover:bg-luxury-goldDark text-stone-950'
    },
    popupOfferHighlights: []
  },

  diwali: {
    id: 'diwali',
    isFestive: true,
    themeKey: 'diwali',
    name: 'Diwali Dhamaka',
    themeName: 'Deepavali Gold & Diya Glow',
    icon: '🪔',
    decorIcons: ['🪔', '✨', '🌟', '🪔'],
    badgeText: 'Shubh Deepavali Special • Festive Offers Active',
    greeting: 'Happy Diwali & Prosperous New Year!',
    announcement: '🪔 Happy Diwali! Special 15% Festive Discount on PVC Modular Kitchens & Wardrobes • Free Site Measurement Across Ahmedabad',
    offerTagline: 'Diwali Festive Special: Free Premium Hafele Soft-Close Hardware Upgrade on Kitchens',
    discountPercent: 15,
    accentColor: '#F59E0B',
    primaryGlow: 'rgba(245, 158, 11, 0.35)',
    showFestiveBadge: true,
    showPopup: true,
    modalTitle: 'Shubh Deepavali Festive Offer 🪔',
    modalSubtitle: 'Light up your home this Diwali with 100% Waterproof, Termite-Proof PVC Modular Furniture!',
    themeClasses: {
      barBg: 'bg-gradient-to-r from-[#1c0f02] via-[#381e05] to-[#190901] border-b border-amber-500/50 text-amber-200',
      ribbonBg: 'bg-gradient-to-r from-amber-950/80 via-amber-900/40 to-red-950/70 border border-amber-500/50 shadow-lg shadow-amber-500/10',
      badgeBg: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-stone-950 font-black shadow-md shadow-amber-500/20',
      popupHeaderBg: 'bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-stone-950',
      buttonBg: 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black shadow-lg shadow-amber-500/30'
    },
    popupOfferHighlights: [
      '🪔 Flat 15% Festive Discount on PVC Modular Kitchens & Wardrobes',
      '✨ Complimentary Soft-Close Hafele Hinges & Channel Upgrade',
      '📐 100% Free Laser Site Measurement Anywhere in Ahmedabad',
      '🛡️ 10-Year Full Replacement Guarantee & 0% Water Swelling'
    ]
  },

  holi: {
    id: 'holi',
    isFestive: true,
    themeKey: 'holi',
    name: 'Holi Rangotsav',
    themeName: 'Holi Gulal Vibrant Colors',
    icon: '🎨',
    decorIcons: ['🎨', '🌈', '✨', '🎨'],
    badgeText: 'Rangon Ka Tyohar • 100% Waterproof PVC Interior Special',
    greeting: 'Happy Holi! Celebrate with Joy & Vibrant Colors',
    announcement: '🎨 Happy Holi! Rang aur Paani se Befikar! 100% Waterproof PVC Modular Kitchens & Designer Wall Louvers',
    offerTagline: 'Holi Dhamaka: Flat 10% Discount on Fluted Louvers & Acrylic Finish Kitchens',
    discountPercent: 10,
    accentColor: '#EC4899',
    primaryGlow: 'rgba(236, 72, 153, 0.35)',
    showFestiveBadge: true,
    showPopup: true,
    modalTitle: 'Holi Rangotsav Special Dhamaka 🎨',
    modalSubtitle: 'Rang aur Paani se Befikar! 100% Waterproof, Washable & Stain-Resistant PVC Interiors',
    themeClasses: {
      barBg: 'bg-gradient-to-r from-[#20081d] via-[#380f31] to-[#150722] border-b border-pink-500/50 text-pink-200',
      ribbonBg: 'bg-gradient-to-r from-pink-950/80 via-purple-900/40 to-pink-950/70 border border-pink-500/50 shadow-lg shadow-pink-500/10',
      badgeBg: 'bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-white font-black shadow-md shadow-pink-500/20',
      popupHeaderBg: 'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white',
      buttonBg: 'bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 hover:from-pink-600 hover:to-purple-600 text-white font-black shadow-lg shadow-pink-500/30'
    },
    popupOfferHighlights: [
      '🎨 100% Stain-Proof & Washable Surfaces (Rang Ka Zero Asar)',
      '✨ Flat 10% Special Holi Savings on Fluted Louvers & UV Sheets',
      '📐 Complimentary On-Site Measurement & Color Consultation',
      '🛡️ 10-Year Replacement Guarantee Against Moisture & Termites'
    ]
  },

  navratri: {
    id: 'navratri',
    isFestive: true,
    themeKey: 'navratri',
    name: 'Navratri & Dussehra',
    themeName: 'Navratri Royal Festive',
    icon: '🌸',
    decorIcons: ['🌸', '🚩', '✨', '🌸'],
    badgeText: 'Shubh Navratri & Dussehra Special Offers Active',
    greeting: 'Shubh Navratri! Maa Durga Bless Your Home',
    announcement: '🌸 Shubh Navratri! Complete Home Makeover in Just 7 Days with 100% Waterproof KAKA PVC Profiles',
    offerTagline: 'Navratri Shubh Muhurat: Complimentary 3D Layout & Free Ahmedabad Site Visit',
    discountPercent: 12,
    accentColor: '#F43F5E',
    primaryGlow: 'rgba(244, 63, 94, 0.35)',
    showFestiveBadge: true,
    showPopup: true,
    modalTitle: 'Shubh Navratri & Dussehra Mahotsav 🌸',
    modalSubtitle: 'Bring auspicious elegance to your kitchen and living spaces this festive season!',
    themeClasses: {
      barBg: 'bg-gradient-to-r from-[#21060e] via-[#3d0c1b] to-[#1c0409] border-b border-rose-500/50 text-rose-200',
      ribbonBg: 'bg-gradient-to-r from-rose-950/80 via-rose-900/40 to-amber-950/70 border border-rose-500/50 shadow-lg shadow-rose-500/10',
      badgeBg: 'bg-gradient-to-r from-rose-500 via-red-500 to-amber-400 text-white font-black shadow-md shadow-rose-500/20',
      popupHeaderBg: 'bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 text-white',
      buttonBg: 'bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black shadow-lg shadow-rose-500/30'
    },
    popupOfferHighlights: [
      '🌸 Flat 12% Shubh Muhurat Discount on Virgin KAKA Profiles',
      '⚡ Quick 7-Day Turnaround for Navratri Home Makeovers',
      '📐 Free Precision Laser Measurement & 3D Layout Consultation',
      '🛡️ Lifetime Termite Proof • 10-Year Replacement Guarantee'
    ]
  },

  newyear: {
    id: 'newyear',
    isFestive: true,
    themeKey: 'newyear',
    name: 'New Year Celebration',
    themeName: 'New Year Midnight & Sparkle',
    icon: '🎆',
    decorIcons: ['🎆', '🎉', '🥂', '✨'],
    badgeText: 'New Year 2026 Home Renovation Special Active',
    greeting: 'Happy New Year! Fresh Beginnings for Your Home',
    announcement: '🎆 Happy New Year! Upgrade Your Home to Termite-Proof PVC Interiors • 10-Year Replacement Guarantee',
    offerTagline: 'New Year Early Bird Offer: Flat 10% Off on Full Home Turnkey PVC Interiors',
    discountPercent: 10,
    accentColor: '#6366F1',
    primaryGlow: 'rgba(99, 102, 241, 0.35)',
    showFestiveBadge: true,
    showPopup: true,
    modalTitle: 'New Year 2026 Home Renovation Special 🎆',
    modalSubtitle: 'Give your home a brand new look with luxury waterproof, maintenance-free PVC furniture!',
    themeClasses: {
      barBg: 'bg-gradient-to-r from-[#0a0f26] via-[#161f4c] to-[#070b1e] border-b border-indigo-500/50 text-indigo-200',
      ribbonBg: 'bg-gradient-to-r from-indigo-950/80 via-blue-900/40 to-purple-950/70 border border-indigo-500/50 shadow-lg shadow-indigo-500/10',
      badgeBg: 'bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white font-black shadow-md shadow-indigo-500/20',
      popupHeaderBg: 'bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white',
      buttonBg: 'bg-gradient-to-r from-indigo-500 via-blue-400 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-black shadow-lg shadow-indigo-500/30'
    },
    popupOfferHighlights: [
      '🎆 Flat 10% Early Bird Savings on Turnkey Modular Interiors',
      '✨ Premium Italian Statuario Marble UV Sheet Wall Panels',
      '📐 Instant Ahmedabad Site Visit & Formal Printed Estimate',
      '🛡️ 10-Year Replacement Warranty & High-Gloss Scratch Resistance'
    ]
  },

  republic: {
    id: 'republic',
    isFestive: true,
    themeKey: 'republic',
    name: 'Republic & Independence',
    themeName: 'Tiranga National Pride',
    icon: '🇮🇳',
    decorIcons: ['🇮🇳', '✨', '🕊️', '🇮🇳'],
    badgeText: 'Azadi Seep aur Deemak Se! Genuine KAKA PVC Interiors',
    greeting: 'Happy Independence & Republic Day!',
    announcement: '🇮🇳 Azadi Seep aur Deemak se! 100% Waterproof, Lifetime Termite-Proof PVC Interior Solutions',
    offerTagline: 'Patriotic Special: Complete Modular Kitchen Installation with 10-Year Warranty',
    discountPercent: 15,
    accentColor: '#10B981',
    primaryGlow: 'rgba(16, 185, 129, 0.35)',
    showFestiveBadge: true,
    showPopup: true,
    modalTitle: 'Azadi Seep aur Deemak Se Special 🇮🇳',
    modalSubtitle: 'Invest in 100% Indian KAKA & TAASA certified PVC profiles that never decay or swell!',
    themeClasses: {
      barBg: 'bg-gradient-to-r from-[#210f04] via-[#092418] to-[#04170d] border-b border-emerald-500/50 text-emerald-200',
      ribbonBg: 'bg-gradient-to-r from-orange-950/80 via-stone-900/60 to-emerald-950/80 border border-emerald-500/50 shadow-lg shadow-emerald-500/10',
      badgeBg: 'bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 text-stone-950 font-black shadow-md shadow-emerald-500/20',
      popupHeaderBg: 'bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-600 text-stone-950',
      buttonBg: 'bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 text-stone-950 font-black shadow-lg shadow-emerald-500/30'
    },
    popupOfferHighlights: [
      '🇮🇳 Flat 15% Desh Ka Bharosa Freedom Discount',
      '✨ 100% Made in India Certified Virgin Heavy-Duty Profiles',
      '📐 Free Ahmedabad Laser Site Measurement',
      '🛡️ 10-Year Complete Replacement Guarantee'
    ]
  },

  custom: {
    id: 'custom',
    isFestive: true,
    themeKey: 'custom',
    name: 'Special Festive Offer',
    themeName: 'Custom Festive Celebration',
    icon: '🎉',
    decorIcons: ['🎉', '✨', '🎁', '✨'],
    badgeText: 'Special Seasonal Discount Available Now',
    greeting: 'Special Festive Greetings!',
    announcement: 'Limited Time Seasonal Offer on Custom PVC Interior Fabrication in Ahmedabad',
    offerTagline: 'Exclusive Savings on PVC Modular Kitchens, Wardrobes, & Louvers',
    discountPercent: 10,
    accentColor: '#C5A059',
    primaryGlow: 'rgba(197, 160, 89, 0.35)',
    showFestiveBadge: true,
    showPopup: true,
    modalTitle: 'Exclusive Seasonal Celebration Offer 🎉',
    modalSubtitle: 'Special discounts and complimentary upgrades available on all PVC interior orders!',
    themeClasses: {
      barBg: 'bg-gradient-to-r from-[#1c1810] via-[#332918] to-[#15120c] border-b border-luxury-gold/50 text-amber-200',
      ribbonBg: 'bg-gradient-to-r from-amber-950/80 via-stone-900/60 to-amber-950/80 border border-luxury-gold/50 shadow-lg shadow-luxury-gold/10',
      badgeBg: 'bg-gradient-to-r from-amber-500 to-luxury-gold text-stone-950 font-black shadow-md shadow-luxury-gold/20',
      popupHeaderBg: 'bg-gradient-to-r from-luxury-gold via-amber-400 to-yellow-500 text-stone-950',
      buttonBg: 'bg-gradient-to-r from-luxury-gold via-amber-400 to-luxury-goldDark hover:brightness-110 text-stone-950 font-black shadow-lg shadow-luxury-gold/30'
    },
    popupOfferHighlights: [
      '🎉 Limited Time Seasonal Discount on Turnkey Fabrication',
      '✨ Free Hafele Soft-Close Hardware Upgrades',
      '📐 Complimentary Laser Site Measurement in Ahmedabad',
      '🛡️ 10-Year Comprehensive Replacement Warranty'
    ]
  }
};

/**
 * Returns the currently effective festival based on active setting and optional auto-schedule dates.
 */
export const getEffectiveFestival = (festivalMode = {}) => {
  const activeKey = festivalMode.activeFestival || 'normal';

  // If set to normal, no festival active
  if (activeKey === 'normal') {
    return FESTIVAL_PRESETS.normal;
  }

  // If auto-schedule is enabled, check date range
  if (festivalMode.autoSchedule && festivalMode.startDate && festivalMode.endDate) {
    const today = new Date().toISOString().slice(0, 10);
    if (today < festivalMode.startDate || today > festivalMode.endDate) {
      // Out of scheduled range, fall back to normal
      return FESTIVAL_PRESETS.normal;
    }
  }

  // Get base preset
  const preset = FESTIVAL_PRESETS[activeKey] || FESTIVAL_PRESETS.normal;

  // Merge any custom overrides provided by admin
  return {
    ...preset,
    id: activeKey,
    isFestive: activeKey !== 'normal',
    name: festivalMode.festivalName || preset.name,
    badgeText: festivalMode.badgeText || preset.badgeText,
    greeting: festivalMode.greeting || preset.greeting,
    announcement: festivalMode.announcement || preset.announcement,
    offerTagline: festivalMode.offerTagline || preset.offerTagline,
    discountPercent: festivalMode.discountPercent !== undefined ? festivalMode.discountPercent : preset.discountPercent,
    showFestiveBadge: festivalMode.showFestiveBadge !== undefined ? festivalMode.showFestiveBadge : preset.showFestiveBadge,
    showPopup: festivalMode.showPopup !== undefined ? festivalMode.showPopup : preset.showPopup
  };
};
