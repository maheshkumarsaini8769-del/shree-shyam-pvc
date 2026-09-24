/**
 * Pre-configured festive themes, banners, greetings and offers for Shree Shyam PVC Interior.
 * Enables 1-click festive activation from Admin Panel.
 */

export const FESTIVAL_PRESETS = {
  normal: {
    id: 'normal',
    name: 'Normal (Standard Everyday Theme)',
    icon: '🌟',
    badgeText: 'Ahmedabad Direct: All Companies PVC Material Work Available (KAKA, TAASA & Major Brands)',
    greeting: '',
    announcement: 'All Company PVC Material Work Available • KAKA, TAASA & All Major Brands • 10-Yr Guarantee • Free Ahmedabad Site Visit',
    offerTagline: 'Zero Wood Swelling • 100% Termite Proof • Factory-Direct Pricing in Vastral',
    discountPercent: 0,
    accentColor: '#C5A059',
    showFestiveBadge: false
  },
  diwali: {
    id: 'diwali',
    name: '🪔 Diwali Dhamaka (Deepavali Special)',
    icon: '🪔',
    badgeText: '🪔 Shubh Deepavali Mahotsav • Special Festival Offers Active',
    greeting: 'Happy Diwali & Prosperous New Year!',
    announcement: '🪔 Happy Diwali! Exclusive Festive Discount on Modular Kitchens & Wardrobes • Free On-Site Laser Measurement Across Ahmedabad',
    offerTagline: 'Diwali Festive Special: Free Premium Soft-Close Hardware Upgrade with Modular Kitchens',
    discountPercent: 15,
    accentColor: '#F59E0B',
    showFestiveBadge: true
  },
  holi: {
    id: 'holi',
    name: '🎨 Holi Celebration (Rangon Ka Tyohar)',
    icon: '🎨',
    badgeText: '🎨 Rangon Ka Tyohar • 100% Waterproof PVC Interior Special',
    greeting: 'Happy Holi! Celebrate with Joy & Color',
    announcement: '🎨 Happy Holi! Rang aur Paani se Befikar! 100% Waterproof PVC Modular Kitchens & Designer Wall Louvers',
    offerTagline: 'Holi Dhamaka: Special 10% Discount on Fluted Louvers & Acrylic Finish Kitchens',
    discountPercent: 10,
    accentColor: '#EC4899',
    showFestiveBadge: true
  },
  navratri: {
    id: 'navratri',
    name: '🚩 Navratri & Dussehra Mahotsav',
    icon: '🚩',
    badgeText: '🚩 Shubh Navratri & Dussehra Special Offers',
    greeting: 'Shubh Navratri! Maa Durga Bless Your Home',
    announcement: '🚩 Shubh Navratri! Festive Home Makeover in Just 7 Days with 100% Waterproof KAKA PVC Profiles',
    offerTagline: 'Navratri Booking Gift: Complimentary 3D Layout Consultation & Free Site Visit',
    discountPercent: 12,
    accentColor: '#EF4444',
    showFestiveBadge: true
  },
  newyear: {
    id: 'newyear',
    name: '🎉 New Year 2026 Celebration',
    icon: '🎉',
    badgeText: '🎉 New Year, New Home! 2026 Home Renovation Special',
    greeting: 'Happy New Year! New Beginnings for Your Home',
    announcement: '🎉 Happy New Year! Upgrade Your Home to Termite-Proof PVC Interiors • 10-Year Replacement Guarantee',
    offerTagline: 'New Year Early Bird Offer: Flat 10% Off on Full Home Turnkey PVC Interiors',
    discountPercent: 10,
    accentColor: '#6366F1',
    showFestiveBadge: true
  },
  republic: {
    id: 'republic',
    name: '🇮🇳 Independence & Republic Day (Azadi Offer)',
    icon: '🇮🇳',
    badgeText: '🇮🇳 Azadi Seep aur Deemak Se! Genuine KAKA PVC Interiors',
    greeting: 'Happy Independence & Republic Day!',
    announcement: '🇮🇳 Azadi Seep aur Deemak se! 100% Waterproof, Lifetime Termite-Proof PVC Interior Solutions',
    offerTagline: 'Patriotic Special: Complete Modular Kitchen Installation with 10-Year Warranty',
    discountPercent: 15,
    accentColor: '#10B981',
    showFestiveBadge: true
  },
  custom: {
    id: 'custom',
    name: '✨ Custom Festival / Seasonal Sale',
    icon: '✨',
    badgeText: 'Special Seasonal Discount Available Now',
    greeting: 'Special Festive Greeting',
    announcement: 'Limited Time Seasonal Offer on Custom PVC Interior Fabrication in Ahmedabad',
    offerTagline: 'Exclusive Savings on PVC Modular Kitchens, Wardrobes, & Louvers',
    discountPercent: 10,
    accentColor: '#C5A059',
    showFestiveBadge: true
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
    name: festivalMode.festivalName || preset.name,
    badgeText: festivalMode.badgeText || preset.badgeText,
    greeting: festivalMode.greeting || preset.greeting,
    announcement: festivalMode.announcement || preset.announcement,
    offerTagline: festivalMode.offerTagline || preset.offerTagline,
    discountPercent: festivalMode.discountPercent !== undefined ? festivalMode.discountPercent : preset.discountPercent,
    showFestiveBadge: festivalMode.showFestiveBadge !== undefined ? festivalMode.showFestiveBadge : preset.showFestiveBadge
  };
};
