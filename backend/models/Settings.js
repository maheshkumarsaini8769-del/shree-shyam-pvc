const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  // Business Branding
  businessName: {
    type: String,
    default: 'Shree Shyam PVC Interior'
  },
  tagline: {
    type: String,
    default: 'Premium KAKA PVC Profile & Interior Solutions'
  },
  profileBrand: {
    type: String,
    default: 'KAKA PVC PROFILE & TAASA'
  },

  // Contact Info
  primaryPhone: {
    type: String,
    default: '+91 8209836370'
  },
  secondaryPhone: {
    type: String,
    default: '+91 9828448936'
  },
  whatsappNumber: {
    type: String,
    default: '918209836370'
  },
  email: {
    type: String,
    default: 'maheshkumarsaini8769@gmail.com'
  },
  address: {
    type: String,
    default: 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad - 382418'
  },
  city: {
    type: String,
    default: 'Ahmedabad'
  },
  state: {
    type: String,
    default: 'Gujarat'
  },
  pincode: {
    type: String,
    default: '382418'
  },
  workingHours: {
    type: String,
    default: 'Monday to Sunday: 9:00 AM – 9:00 PM'
  },
  googleMapsUrl: {
    type: String,
    default: 'https://maps.google.com/?q=Vastral,+Ahmedabad,+Gujarat+382418'
  },
  googleReviewUrl: {
    type: String,
    default: 'https://maps.google.com/?q=Shree+Shyam+PVC+Interior+Vastral+Ahmedabad'
  },

  // Header & Announcement Bar
  announcementText: {
    type: String,
    default: 'All Company PVC Material Work Available • KAKA, TAASA & All Major Brands • 10-Yr Guarantee • Free Ahmedabad Site Visit'
  },
  announcementActive: {
    type: Boolean,
    default: true
  },
  emergencyNotice: {
    type: String,
    default: ''
  },
  heroBadgeText: {
    type: String,
    default: 'All Companies PVC Material Work Available (KAKA, TAASA & Major Brands)'
  },

  // Hero Section Customizer
  heroHeading: {
    type: String,
    default: "Fluted TV Units & Acoustic Louvers"
  },
  heroSubheading: {
    type: String,
    default: "Architectural charcoal & teak louvers with Italian Statuario marble PVC backings and floating consoles."
  },
  heroCtaPrimary: {
    type: String,
    default: "Book Free Site Measurement"
  },
  heroCtaSecondary: {
    type: String,
    default: "Explore Real Works"
  },

  // Pricing Calculator Rates
  pricingCalculator: {
    tvUnitRate: { type: Number, default: 480 },
    wardrobeRate: { type: Number, default: 520 },
    kitchenRate: { type: Number, default: 550 },
    fullHomeRate: { type: Number, default: 500 }
  },

  // Service Coverage Locations
  serviceLocations: {
    type: [String],
    default: [
      'Vastral', 'Maninagar', 'Nikol', 'Naroda',
      'Chandkheda', 'SG Highway', 'Bopal', 'Gota',
      'Satellite', 'Thaltej', 'Odhav', 'C.G. Road'
    ]
  },

  // Registration & Legal
  gstNumber: {
    type: String,
    default: '24AAAAA0000A1Z5'
  },
  footerCopyright: {
    type: String,
    default: '© 2026 Shree Shyam PVC Interior. All Rights Reserved. Crafted for Ahmedabad Homes.'
  },

  // About Us Content
  aboutHeading: {
    type: String,
    default: 'Crafting 100% Waterproof & Termite-Proof PVC Interiors Across Ahmedabad'
  },
  aboutSubheading: {
    type: String,
    default: 'Leading certified PVC interior artisans specializing in heavy-duty KAKA & TAASA profiles for residential and commercial spaces.'
  },
  aboutStory: {
    type: String,
    default: 'Shree Shyam PVC Interior was established with a singular vision: to eliminate the headaches of traditional wood interiors—water damage, termites, and frequent repainting. Based in Vastral, Ahmedabad, our experienced team provides end-to-end design, precision fabrication, and flawless on-site installation using certified PVC profiles.'
  },
  missionStatement: {
    type: String,
    default: 'To deliver lifelong, eco-friendly, zero-maintenance interior living spaces at factory-direct pricing with uncompromising structural craftsmanship.'
  },
  visionStatement: {
    type: String,
    default: 'To become Gujarat’s most trusted household name for modern waterproof modular kitchens, wardrobes, and acoustic louvers.'
  },
  yearsExperience: {
    type: Number,
    default: 12
  },
  completedProjects: {
    type: Number,
    default: 450
  },
  happyClients: {
    type: Number,
    default: 380
  },
  warrantyYears: {
    type: Number,
    default: 10
  },
  materialsDescription: {
    type: String,
    default: 'We work with all top certified brands including KAKA PVC, TAASA, Greenply PVC, and Alstone. High-density, lead-free PVC profiles with high flame-retardant and anti-termite grading.'
  },

  // Social Channels
  socialChannels: {
    instagram: {
      type: String,
      default: 'https://instagram.com/shreeshyampvc'
    },
    facebook: {
      type: String,
      default: 'https://facebook.com/shreeshyampvc'
    },
    youtube: {
      type: String,
      default: 'https://youtube.com/@shreeshyampvc'
    },
    whatsapp: {
      type: String,
      default: 'https://wa.me/918209836370'
    },
    linkedin: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    }
  },

  // Available PVC Brands & Details
  availableBrands: {
    type: [String],
    default: ['KAKA PVC PROFILE', 'TAASA', 'Greenply PVC', 'Alstone', 'Century PVC']
  },
  guaranteeDetails: {
    type: String,
    default: '100% Termite Proof & 100% Waterproof with 10 Years Warranty'
  },

  // 1-Click Festival Theme & Offer Presets
  festivalMode: {
    activeFestival: {
      type: String,
      default: 'normal' // 'normal', 'diwali', 'holi', 'navratri', 'newyear', 'republic', 'custom'
    },
    festivalName: {
      type: String,
      default: ''
    },
    greeting: {
      type: String,
      default: ''
    },
    announcement: {
      type: String,
      default: ''
    },
    offerTagline: {
      type: String,
      default: ''
    },
    badgeText: {
      type: String,
      default: ''
    },
    discountPercent: {
      type: Number,
      default: 0
    },
    autoSchedule: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    showFestiveBadge: {
      type: Boolean,
      default: true
    },
    showPopup: {
      type: Boolean,
      default: true
    },
    showCountdown: {
      type: Boolean,
      default: true
    },
    countdownEndDate: {
      type: String,
      default: ''
    },
    showAtmosphere: {
      type: Boolean,
      default: true
    },
    couponCode: {
      type: String,
      default: ''
    },
    enableCouponGame: {
      type: Boolean,
      default: true
    }
  }
}, { timestamps: true });

SettingsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
SettingsSchema.set('toJSON', { virtuals: true });
SettingsSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
