const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const AuthorizedAdmin = require('../models/AuthorizedAdmin');
const Settings = require('../models/Settings');
const Service = require('../models/Service');
const Review = require('../models/Review');
const Faq = require('../models/Faq');

const seedData = async () => {
  try {
    await connectDB();

    // 1. Seed or Update Superadmin Email Authority
    const superadminEmail = 'maheshkumarsaini8769@gmail.com';
    const superadminPass = 'mahesh99830';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(superadminPass, salt);

    // Upsert AuthorizedAdmin
    let authAdmin = await AuthorizedAdmin.findOne({ email: superadminEmail });
    if (!authAdmin) {
      authAdmin = await AuthorizedAdmin.create({
        email: superadminEmail,
        name: 'Mahesh Kumar Saini',
        password: hashedPassword,
        role: 'superadmin',
        status: 'active',
        addedBy: 'initial_system'
      });
      console.log(`[Seed] AuthorizedAdmin created: ${superadminEmail}`);
    } else {
      // Ensure password is up to date
      authAdmin.password = hashedPassword;
      authAdmin.status = 'active';
      authAdmin.role = 'superadmin';
      await authAdmin.save();
      console.log(`[Seed] AuthorizedAdmin updated: ${superadminEmail}`);
    }

    // Upsert User model
    let adminUser = await User.findOne({ email: superadminEmail });
    if (!adminUser) {
      await User.create({
        name: 'Mahesh Kumar Saini',
        email: superadminEmail,
        phone: '+91 8209836370',
        password: hashedPassword,
        role: 'superadmin',
        isAuthorizedAdmin: true
      });
      console.log(`[Seed] Superadmin User created: ${superadminEmail}`);
    } else {
      adminUser.password = hashedPassword;
      adminUser.role = 'superadmin';
      adminUser.isAuthorizedAdmin = true;
      await adminUser.save();
    }

    // 2. Seed Default Settings if not present
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        businessName: 'Shree Shyam PVC Interior',
        tagline: 'Premium KAKA PVC Profile & Interior Solutions',
        profileBrand: 'KAKA PVC PROFILE & TAASA',
        primaryPhone: '+91 8209836370',
        secondaryPhone: '+91 9828448936',
        whatsappNumber: '918209836370',
        email: 'maheshkumarsaini8769@gmail.com',
        address: 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad - 382418',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '382418',
        workingHours: 'Monday - Sunday: 9:00 AM – 9:00 PM',
        googleMapsUrl: 'https://maps.google.com/?q=Vastral,+Ahmedabad,+Gujarat+382418',
        announcementText: 'All Company PVC Material Work Available • KAKA, TAASA & All Major Brands • 10-Yr Guarantee • Free Ahmedabad Site Visit',
        announcementActive: true,
        emergencyNotice: '',
        heroBadgeText: 'Ahmedabad Direct: All Companies PVC Material Work Available (KAKA, TAASA & Major Brands)',
        aboutHeading: 'Crafting 100% Waterproof & Termite-Proof PVC Interiors Across Ahmedabad',
        aboutSubheading: 'Leading certified PVC interior artisans specializing in heavy-duty KAKA & TAASA profiles for residential and commercial spaces.',
        aboutStory: 'Shree Shyam PVC Interior was established with a singular vision: to eliminate the headaches of traditional wood interiors—water damage, termites, and frequent repainting. Based in Vastral, Ahmedabad, our experienced team provides end-to-end design, precision fabrication, and flawless on-site installation using certified PVC profiles.',
        missionStatement: 'To deliver lifelong, eco-friendly, zero-maintenance interior living spaces at factory-direct pricing with uncompromising structural craftsmanship.',
        visionStatement: 'To become Gujarat’s most trusted household name for modern waterproof modular kitchens, wardrobes, and acoustic louvers.',
        yearsExperience: 12,
        completedProjects: 450,
        happyClients: 380,
        warrantyYears: 10,
        materialsDescription: 'We work with all top certified brands including KAKA PVC, TAASA, Greenply PVC, and Alstone. High-density, lead-free PVC profiles with high flame-retardant and anti-termite grading.',
        socialChannels: {
          instagram: 'https://instagram.com/shreeshyampvc',
          facebook: 'https://facebook.com/shreeshyampvc',
          youtube: 'https://youtube.com/@shreeshyampvc',
          whatsapp: 'https://wa.me/918209836370',
          linkedin: '',
          twitter: ''
        },
        availableBrands: ['KAKA PVC PROFILE', 'TAASA', 'Greenply PVC', 'Alstone', 'Century PVC'],
        guaranteeDetails: '100% Termite Proof & 100% Waterproof with 10 Years Warranty'
      });
      console.log('[Seed] Settings document created in MongoDB');
    }

    // 3. Seed Initial Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.create([
        {
          slug: 'pvc-modular-kitchen',
          name: 'PVC Modular Kitchen',
          shortDescription: 'Modern, termite-proof, and 100% water-resistant modular kitchens tailored to your cooking space.',
          description: 'Custom-crafted PVC modular kitchens built using premium KAKA & TAASA profiles. Resists water splashing, humidity, turmeric stains, and pests.',
          startingPrice: 480,
          priceUnit: 'sq.ft',
          features: ['100% Waterproof', 'Termite-Proof', 'Heavy Load Bearing', 'Soft Close Hydraulic', '10-Yr Warranty'],
          status: 'Active'
        },
        {
          slug: 'pvc-wardrobe',
          name: 'PVC Wardrobe & Lofts',
          shortDescription: 'Spacious, elegant wardrobes that protect your clothing and valuables from dampness and termites.',
          description: 'Customized sliding and hinged wardrobes with lofts, internal lockers, and smooth acoustic track systems.',
          startingPrice: 520,
          priceUnit: 'sq.ft',
          features: ['Zero Dampness', 'Acoustic Louvers', 'Sliding & Hinged', 'Anti-Fingerprint', 'Custom Compartments'],
          status: 'Active'
        },
        {
          slug: 'pvc-tv-unit',
          name: 'PVC TV Unit & Acoustic Wall Louvers',
          shortDescription: 'Designer TV feature walls with fluted louvers, concealed LED channels, and floating consoles.',
          description: 'Living room luxury TV backdrops with charcoal louvers, Italian marble sheets, and integrated ambient lighting.',
          startingPrice: 420,
          priceUnit: 'sq.ft',
          features: ['Fluted Louver Slats', 'Marble Finish Sheet', 'Concealed LED Wire Channels', 'Floating Drawer Units'],
          status: 'Active'
        },
        {
          slug: 'pvc-doors',
          name: 'PVC Doors & Frames',
          shortDescription: 'Heavy-duty waterproof doors for bathrooms, balconies, bedrooms, and utility areas.',
          description: 'Weather-proof PVC doors that never expand, warp, or rot during heavy monsoons.',
          startingPrice: 320,
          priceUnit: 'sq.ft',
          features: ['Zero Warping', 'Bathroom & Balcony Safe', 'Stainless Steel Hinges', 'Waterproof Core'],
          status: 'Active'
        }
      ]);
      console.log('[Seed] Default services created in MongoDB');
    }

    // 4. Seed Initial Reviews
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      await Review.create([
        {
          customerName: 'Rakesh Patel',
          location: 'Vastral, Ahmedabad',
          rating: 5,
          reviewText: 'Bahut hi accha work kiya. Kitchen ka finish bilkul luxury wood jaisa hai aur 100% waterproof hai. KAKA profile ki quality bohot solid hai.',
          serviceUsed: 'PVC Modular Kitchen',
          status: 'Approved',
          adminReply: {
            text: 'Thank you Rakesh ji for trusting Shree Shyam PVC Interior! We are delighted you loved the finish.',
            repliedAt: new Date(),
            repliedBy: 'Mahesh Kumar Saini'
          }
        },
        {
          customerName: 'Neha Shah',
          location: 'Maninagar, Ahmedabad',
          rating: 5,
          reviewText: 'Modular kitchen & bedroom wardrobe bilkul waisa bana jaise 3D design me dikhaya tha. Humne TAASA aur KAKA dono samples dekhe the, fitting ekdum perfect hui.',
          serviceUsed: 'Master Sliding Wardrobe',
          status: 'Approved',
          adminReply: {
            text: 'Thank you Neha ji! Our team always ensures exact precision as committed.',
            repliedAt: new Date(),
            repliedBy: 'Shree Shyam PVC Team'
          }
        },
        {
          customerName: 'Amit Soni',
          location: 'Vastral, Ahmedabad',
          rating: 5,
          reviewText: 'On-time 6 days me kaam complete kiya. Living room ka look poora transform ho gaya. Zero termites guarantee is a big peace of mind. Highly recommended!',
          serviceUsed: 'TV Unit & Acoustic Louvers',
          status: 'Approved',
          adminReply: {
            text: 'Dhanyawad Amit ji! Aapka santosh hi hamara vishwas hai.',
            repliedAt: new Date(),
            repliedBy: 'Mahesh Kumar Saini'
          }
        }
      ]);
      console.log('[Seed] Default reviews with replies created in MongoDB');
    }

    console.log('[Seed] MongoDB initialization completed successfully.');
  } catch (err) {
    console.error('[Seed Error]', err);
  }
};

module.exports = seedData;
