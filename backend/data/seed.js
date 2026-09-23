const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const AuthorizedAdmin = require('../models/AuthorizedAdmin');
const Settings = require('../models/Settings');
const Service = require('../models/Service');
const Review = require('../models/Review');
const Faq = require('../models/Faq');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');
const Gallery = require('../models/Gallery');

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

    // 5. Seed Initial Bookings
    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0) {
      await Booking.create([
        {
          bookingId: 'SSPI-782194',
          name: 'Jignesh Prajapati',
          phone: '+91 9825123456',
          serviceName: 'PVC Modular Kitchen',
          preferredDate: '2026-09-26',
          preferredTime: '11:00 AM - 01:00 PM',
          city: 'Ahmedabad',
          area: 'Vastral',
          address: 'A-402, Shivam Greens, Near Moti Canal Road',
          message: 'L-shape kitchen design quotation chahiye with KAKA profile and hydraulic fittings.',
          status: 'Confirmed',
          adminNotes: 'Site visit confirmed with master carpenter. Samples carried.',
          statusHistory: [
            { status: 'Pending', note: 'Booking received online' },
            { status: 'Confirmed', note: 'Client called and site visit time confirmed.' }
          ]
        },
        {
          bookingId: 'SSPI-419823',
          name: 'Pooja Trivedi',
          phone: '+91 9428567890',
          serviceName: 'Master Sliding Wardrobe',
          preferredDate: '2026-09-27',
          preferredTime: '03:00 PM - 05:00 PM',
          city: 'Ahmedabad',
          area: 'Maninagar',
          address: 'B-12, Radhe Krishna Bungalows, Near Railway Station',
          message: 'Bedroom sliding wardrobe 10ft height with lofts and mirror finish panel.',
          status: 'Pending',
          adminNotes: '',
          statusHistory: [{ status: 'Pending', note: 'Booking request received online' }]
        },
        {
          bookingId: 'SSPI-904312',
          name: 'Hardik Vaghela',
          phone: '+91 9726345678',
          serviceName: 'TV Unit & Acoustic Louvers',
          preferredDate: '2026-09-24',
          preferredTime: '10:00 AM - 12:00 PM',
          city: 'Ahmedabad',
          area: 'Nikol',
          address: 'C-204, Devnandan Heights, SP Ring Road',
          message: 'Living room wall louver panel with LED strips and floating console.',
          status: 'Completed',
          adminNotes: 'Work completed and customer fully satisfied. Full payment received.',
          statusHistory: [
            { status: 'Pending', note: 'Online lead' },
            { status: 'Confirmed', note: 'Measurement taken' },
            { status: 'Completed', note: 'Installation completed in 5 days' }
          ]
        }
      ]);
      console.log('[Seed] Default bookings created in MongoDB');
    }

    // 6. Seed Initial Enquiries
    const enquiryCount = await Enquiry.countDocuments();
    if (enquiryCount === 0) {
      await Enquiry.create([
        {
          name: 'Sunil Thakor',
          phone: '+91 9924112233',
          service: 'Full Home PVC Interior (3BHK)',
          message: 'New flat in Vastral, complete interior quote required including kitchen, wardrobes & doors.',
          status: 'New',
          notes: ''
        },
        {
          name: 'Alka Mehta',
          phone: '+91 9825445566',
          service: 'PVC Bathroom Doors',
          message: 'Need 4 waterproof PVC doors replacement for bungalow.',
          status: 'Contacted',
          notes: 'Quotation sent via WhatsApp. Client will confirm on Sunday.'
        }
      ]);
      console.log('[Seed] Default enquiries created in MongoDB');
    }

    // 7. Seed Initial FAQs
    const faqCount = await Faq.countDocuments();
    if (faqCount === 0) {
      await Faq.create([
        {
          question: 'Are PVC interiors really 100% waterproof and termite proof?',
          answer: 'Yes, absolutely. Unlike wood or MDF which absorbs water and rots, certified KAKA and TAASA PVC profiles have zero organic matter, making them completely immune to water soaking, warping, and termite infestation for decades.',
          category: 'Materials & Durability',
          order: 1
        },
        {
          question: 'Which PVC profile brands do you work with?',
          answer: 'We provide certified work using KAKA PVC PROFILE, TAASA, Greenply PVC, Alstone, and Century PVC. Customers can choose their preferred brand and thickness according to their budget.',
          category: 'Brands & Choice',
          order: 2
        },
        {
          question: 'What is the warranty period for PVC modular kitchens & wardrobes?',
          answer: 'We offer an official 10-year warranty against termites, borer infestation, and water swelling, backed by professional craftsmanship and genuine hardware.',
          category: 'Warranty',
          order: 3
        },
        {
          question: 'How fast can you complete a modular kitchen or full flat interior?',
          answer: 'A standard PVC modular kitchen is typically fabricated and installed within 4 to 7 working days, minimizing disruption to your daily routine.',
          category: 'Installation Speed',
          order: 4
        }
      ]);
      console.log('[Seed] Default FAQs created in MongoDB');
    }

    // 8. Seed Initial Gallery Real Work Items
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.create([
        {
          title: "PVC Wardrobe Internal Storage & Drawers",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_01.jpg",
          description: "Internal view showing lockable drawers, deep shelving, and TAASA profile sheets",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Glossy Turquoise & White Wardrobe with Dressing Mirror",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_02.jpg",
          description: "Modern dual-tone PVC wardrobe with attached dressing mirror and drawer unit",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "4-Door Glossy Turquoise PVC Wardrobe",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_03.jpg",
          description: "Seamless glossy finished bedroom wardrobe with sleek gold profile handles",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Sky Blue Full Wall PVC Wardrobe with Upper Lofts",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_04.jpg",
          description: "Floor-to-ceiling storage with top loft cabinets (mala) touching ceiling",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Fluted Louver & Marble PVC TV Unit",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_05.jpg",
          description: "Vertical wooden fluted louvers paired with white Italian marble PVC sheet & floating console",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Curved Woodgrain Accent TV Unit",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_06.jpg",
          description: "Contemporary curved backboard with blush pink surround and 2-drawer floating console",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Large Living Room TV Unit with Glass Display Tower",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_07.jpg",
          description: "Black marble top floating unit with tall illuminated glass display tower",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Full Wall Fluted Louver Paneling & TV Console",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_08.jpg",
          description: "Grey and wood striped vertical louvers with floating dual-tone 4-drawer console",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Warm Backlit Woodgrain TV Unit",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_09.jpg",
          description: "Ambient LED spotlights, rich woodgrain PVC panels, and floating storage console",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Black & Gold Marble PVC Wall Unit",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_10.jpg",
          description: "High-gloss marble PVC paneling with protective film and floating 3-drawer console",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Vertical Louver TV Wall with Display Rack",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_11.jpg",
          description: "Textured acoustic louver wall with floating marble-top console and 5-tier side rack",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Grand Living Room Wooden Showcase TV Unit",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_12.jpg",
          description: "Full wall wooden finish entertainment unit with 6 drawers, false ceiling cove lights, and side towers",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Charcoal Fluted Louver TV Unit with Glass Rack",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_13.jpg",
          description: "Dark acoustic fluted louvers, white marble PVC backing, and 6-tier display tower",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Minimalist Wood Louver TV Wall with Console",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_14.jpg",
          description: "Clean vertical wood louver panel with white marble center TV mount",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Luxury Backlit TV Console with Illuminated Tower",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_15.jpg",
          description: "Warm under-glow LED lights, marble sheet backing, and illuminated glass showcase",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Modern Grey Fluted Wall Panels with Glowing Cubbies",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_16.jpg",
          description: "Sleek grey PVC wall panels, floating console, and 3 warm backlit display boxes",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Classic Full Height TV Showcase with Glass Cabinet",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_17.jpg",
          description: "Full height entertainment unit with tall glass showcase and storage drawers",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Teak Finish TV Unit with Fluted Louver Accent",
          category: "TV Unit",
          imageUrl: "/assets/real-work/real_work_18.jpg",
          description: "Vertical dark louvers, white TV panel, floating console, and 5-tier open shelf tower",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Ocean Teal Full Wall PVC Wardrobe with Lofts",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_19.jpg",
          description: "Spacious 6-door teal blue PVC wardrobe with upper ceiling loft storage",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Slate Grey PVC Wardrobe with Center Mirror",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_20.jpg",
          description: "3-door modern matte slate grey bedroom wardrobe with integrated dressing mirror",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Rich Teak Woodgrain PVC Wardrobe with White Band",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_21.jpg",
          description: "Classic woodgrain texture PVC wardrobe with contrasting white accent band",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Designer Off-White & Blush Pink Wardrobe with Curved Mirror",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_22.jpg",
          description: "Custom bedroom wardrobe with curved blush pink handles and semi-circular dressing mirror",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Compact 3-Door Dual Tone PVC Wardrobe",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_23.jpg",
          description: "Space-efficient bedroom wardrobe with contrasting grey vertical stripe",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Sliding 2-Door Dual Tone Wardrobe with Lofts",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_24.jpg",
          description: "Smooth sliding shutter PVC wardrobe (glossy white + textured grey) with 4 top lofts",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Corner L-Shaped Glossy Pink PVC Wardrobe",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_25.jpg",
          description: "Floor-to-ceiling corner wardrobe with high-gloss pastel finish and top lofts",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Inside View of 2-Door Wardrobe with Lockers",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_26.jpg",
          description: "Interior compartments with lockable drawers, clothes hanging space, and shelves",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Minimalist Matte Grey 3-Door PVC Wardrobe",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_27.jpg",
          description: "Contemporary flat-panel slate grey PVC wardrobe with clean black handles",
          isRealWork: true,
          tag: "On-Site Installation"
        },
        {
          title: "Full Room Glossy Nude Pink PVC Wardrobe Setup",
          category: "Wardrobe",
          imageUrl: "/assets/real-work/real_work_28.jpg",
          description: "Large wall-to-wall glossy modular PVC wardrobe under final assembly in Ahmedabad",
          isRealWork: true,
          tag: "On-Site Installation"
        }
      ]);
      console.log('[Seed] Default 28 real work gallery items created in MongoDB');
    }

    console.log('[Seed] MongoDB initialization completed successfully.');
  } catch (err) {
    console.error('[Seed Error]', err);
  }
};

module.exports = seedData;

if (require.main === module) {
  require('dotenv').config();
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    seedData().then(() => {
      console.log('Seeding finished, exiting.');
      process.exit(0);
    });
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
}

