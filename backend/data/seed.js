const bcrypt = require('bcryptjs');
const store = require('../config/store');

const seedData = async () => {
  const usersCollection = store.getCollection('users');
  const servicesCollection = store.getCollection('services');
  const galleryCollection = store.getCollection('gallery');
  const faqsCollection = store.getCollection('faqs');
  const bookingsCollection = store.getCollection('bookings');
  const enquiriesCollection = store.getCollection('enquiries');

  // 1. Seed Admin User
  if (usersCollection.countDocuments({ role: 'admin' }) === 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    usersCollection.create({
      id: 'admin_1',
      name: 'Shree Shyam Admin',
      email: 'admin@shreeshyam.com',
      phone: '+91 8209836370',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('[Seed] Admin user created: admin@shreeshyam.com / admin123');
  }

  // 2. Seed Settings
  const existingSettings = store.getSettings();
  if (!existingSettings.businessName) {
    store.updateSettings({
      businessName: 'Shree Shyam PVC Interior',
      profileBrand: 'KAKA PVC PROFILE',
      address: 'Yogeshwar Residency, Opp. Ashutosh Tenament, Moti Canal Road, Vastral, Ahmedabad.',
      primaryPhone: '+91 8209836370',
      secondaryPhone: '+91 9828448936',
      whatsappNumber: '+918209836370',
      heroHeadline: 'Elegant Spaces For A Better Tomorrow',
      heroSubheadline: 'Premium PVC Interior Solutions For Home & Office',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382418',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14690.697415494639!2d72.6456381!3d23.0000452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a26f634351%3A0x2a3e5c9472e39951!2sVastral%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      workingHours: 'Monday - Saturday: 9:00 AM - 8:30 PM',
      footerAbout: 'Shree Shyam PVC Interior specializes in premium, durable, termite-proof, and water-resistant interior solutions for residential and commercial spaces in Vastral, Ahmedabad.'
    });
    console.log('[Seed] Default settings created');
  }

  // 3. Seed Services
  if (servicesCollection.countDocuments() === 0) {
    const services = [
      {
        id: 'pvc-modular-kitchen',
        slug: 'pvc-modular-kitchen',
        title: 'PVC Modular Kitchen',
        category: 'Kitchen',
        shortDescription: 'Modern, termite-proof, and 100% water-resistant modular kitchens tailored to your cooking space.',
        fullDescription: 'Upgrade your culinary space with our custom-crafted PVC modular kitchens. Built using premium KAKA PVC profiles, our kitchens resist water splashing, humidity, turmeric stains, and pests, ensuring lasting hygiene and elegance.',
        imageKey: 'kitchen',
        features: [
          '100% Waterproof and moisture resistant',
          'Termite and borer proof construction',
          'High load-bearing capacity cabinets',
          'Soft-close hinges and hydraulic fittings',
          'Available in glossy, matte, and wood grain finishes'
        ],
        availableDesigns: ['L-Shaped Kitchen', 'U-Shaped Kitchen', 'Straight Kitchen', 'Parallel Kitchen', 'Island Kitchen'],
        active: true,
        sortOrder: 1
      },
      {
        id: 'pvc-wardrobe',
        slug: 'pvc-wardrobe',
        title: 'PVC Wardrobe',
        category: 'Wardrobe',
        shortDescription: 'Spacious, elegant wardrobes that protect your clothing and valuables from dampness and termites.',
        fullDescription: 'Our customized PVC wardrobes combine generous storage with contemporary aesthetic charm. Perfectly structured with sliding or hinged doors, internal drawers, and organizers to suit your bedroom.',
        imageKey: 'wardrobe',
        features: [
          'Zero risk of fungal growth or damp odors',
          'Smooth sliding track systems & quiet doors',
          'Custom internal shelving, lockers, and hanging rods',
          'Scratch-resistant textured panel surfaces',
          'Available in 2-door, 3-door, 4-door, and floor-to-ceiling configurations'
        ],
        availableDesigns: ['Sliding Door Wardrobe', 'Hinged Door Wardrobe', 'Walk-in Wardrobe', 'Loft Integrated Wardrobe'],
        active: true,
        sortOrder: 2
      },
      {
        id: 'pvc-doors',
        slug: 'pvc-doors',
        title: 'PVC Doors & Frames',
        category: 'Doors',
        shortDescription: 'Heavy-duty, weather-resistant PVC doors ideal for bathrooms, balconies, bedrooms, and offices.',
        fullDescription: 'Engineered for tough moisture-prone environments, our PVC doors withstand daily water exposure without warping, swelling, or rotting. Fitted with durable locksets and matching PVC frames.',
        imageKey: 'doors',
        features: [
          'No warping, expansion, or shrinkage during monsoon',
          'Ideal for bathroom, toilet, and utility areas',
          'Lightweight yet strong multi-chamber design',
          'Zero painting or polishing required over time',
          'Available in printed decorative and plain solid textures'
        ],
        availableDesigns: ['Flush PVC Doors', 'Designer Embossed Doors', 'Panel Doors', 'Glazed Combination Doors'],
        active: true,
        sortOrder: 3
      },
      {
        id: 'pvc-wall-panels',
        slug: 'pvc-wall-panels',
        title: 'PVC Wall Panels & Ceilings',
        category: 'Wall Panels',
        shortDescription: 'Seamless wall and false ceiling cladding that conceals dampness and enhances room aesthetics.',
        fullDescription: 'Transform plain or damp walls into stunning accent spaces. PVC wall paneling and false ceilings insulate against heat, cover surface imperfections, and are easily wiped clean with a damp cloth.',
        imageKey: 'wallPanels',
        features: [
          'Instant remedy for damp walls and paint peeling',
          'Thermal insulation and acoustic dampening',
          'Interlocking tongue-and-groove joint system',
          'Fire retardant grade profile material',
          'Marble finish, wooden slat, and 3D textured choices'
        ],
        availableDesigns: ['Fluted Louver Panels', 'Marble Finish Sheets', 'Wooden Grain Ceiling', 'Geometric Feature Wall'],
        active: true,
        sortOrder: 4
      },
      {
        id: 'tv-unit-panels',
        slug: 'tv-unit-panels',
        title: 'TV Unit & Entertainment Panels',
        category: 'TV Unit',
        shortDescription: 'Sleek entertainment consoles and accent backdrops with integrated wire concealment.',
        fullDescription: 'Make your living room the centerpiece of your home. Our custom PVC TV units combine wall-mounted back panels, LED cove lighting channels, floating shelves, and media consoles without bulky wood weight.',
        imageKey: 'tvUnit',
        features: [
          'Hidden cable routing channels for neat visual appeal',
          'Floating console storage for set-top boxes and gaming units',
          'Backlit LED profile illumination options',
          'Zero termite decay around electronics',
          'Customizable for any TV screen size (32" to 85"+)'
        ],
        availableDesigns: ['Minimalist Floating Unit', 'Full Wall Slat Panel Unit', 'Marble & Wood Combo Backdrop', 'Compact Corner Unit'],
        active: true,
        sortOrder: 5
      },
      {
        id: 'office-interior',
        slug: 'office-interior',
        title: 'Office & Commercial Interior',
        category: 'Office',
        shortDescription: 'Professional, low-maintenance workstations, partitions, and conference interiors.',
        fullDescription: 'Equip your commercial or office environment with clean, cost-effective, and long-lasting PVC modular partitions, reception backdrops, and workstations. Designed for quick installation with minimal business downtime.',
        imageKey: 'office',
        features: [
          'Modular partitions for efficient space division',
          'Durable executive desks and cubicle separators',
          'Acoustic PVC ceiling panels for reduced office echo',
          'Rapid assembly and dust-free installation',
          'Professional corporate colors and clean lines'
        ],
        availableDesigns: ['Workstation Cubicles', 'Executive Cabin Interior', 'Conference Room Cladding', 'Reception Desk & Backdrop'],
        active: true,
        sortOrder: 6
      }
    ];

    services.forEach(s => servicesCollection.create(s));
    console.log('[Seed] Services created');
  }

  // 4. Seed Gallery (Centralized Image Registry aligned)
  if (galleryCollection.countDocuments() === 0) {
    const galleryItems = [
      {
        title: 'Modern L-Shaped Modular Kitchen',
        category: 'Kitchen',
        serviceId: 'pvc-modular-kitchen',
        imageKey: 'kitchen',
        altText: 'Glossy White & Charcoal PVC Modular Kitchen Setup',
        featured: true,
        sortOrder: 1
      },
      {
        title: '3-Door Sliding Bedroom Wardrobe',
        category: 'Wardrobe',
        serviceId: 'pvc-wardrobe',
        imageKey: 'wardrobe',
        altText: 'Textured Wood Finish PVC Wardrobe with Mirror Panel',
        featured: true,
        sortOrder: 2
      },
      {
        title: 'Waterproof Bathroom PVC Door',
        category: 'Doors',
        serviceId: 'pvc-doors',
        imageKey: 'doors',
        altText: 'Durable Solid PVC Door with Modern Handle Fitting',
        featured: true,
        sortOrder: 3
      },
      {
        title: 'Fluted Wooden Accent Wall Paneling',
        category: 'Wall Panels',
        serviceId: 'pvc-wall-panels',
        imageKey: 'wallPanels',
        altText: 'Interior Accent Wall using PVC Fluted Louver Panels',
        featured: true,
        sortOrder: 4
      },
      {
        title: 'Living Room TV Entertainment Unit',
        category: 'TV Unit',
        serviceId: 'tv-unit-panels',
        imageKey: 'tvUnit',
        altText: 'Contemporary TV Wall Unit with Floating Console',
        featured: true,
        sortOrder: 5
      },
      {
        title: 'Corporate Office Modular Partitioning',
        category: 'Office',
        serviceId: 'office-interior',
        imageKey: 'office',
        altText: 'PVC Office Workstations and Partition System',
        featured: true,
        sortOrder: 6
      }
    ];
    galleryItems.forEach(g => galleryCollection.create(g));
    console.log('[Seed] Gallery seeded');
  }

  // 5. Seed FAQs
  if (faqsCollection.countDocuments() === 0) {
    const faqs = [
      {
        question: 'Why choose PVC interior over conventional wood or plywood?',
        answer: 'PVC interior materials (such as KAKA PVC profiles) are 100% waterproof and 100% termite proof. Unlike plywood, PVC does not rot, swell, peel, or harbor pests in damp climates or wet areas like kitchens and bathrooms. It also requires zero polishing and is easy to clean with a damp cloth.',
        category: 'PVC Interior',
        active: true,
        sortOrder: 1
      },
      {
        question: 'Is the site visit and consultation really free?',
        answer: 'Yes! We provide a free, no-obligation site visit across Vastral and nearby areas in Ahmedabad. Our specialist visits your location, takes exact site measurements, shows profile swatches and catalog designs, and discusses your requirements.',
        category: 'Site Visit',
        active: true,
        sortOrder: 2
      },
      {
        question: 'How do I book a site visit?',
        answer: 'Simply tap the "Book Free Visit" button on our website. Choose the service you need (Kitchen, Wardrobe, Doors, etc.), enter your contact details and preferred date/time slot, and provide your address or share your location. You will receive an instant booking confirmation number to track your request.',
        category: 'Booking',
        active: true,
        sortOrder: 3
      },
      {
        question: 'Are PVC cabinets strong enough for heavy kitchen utensils?',
        answer: 'Yes. We utilize high-density multi-chamber KAKA PVC profiles engineered with internal ribs and structural reinforcement. Heavy kitchen pots, mixers, and stone countertops are safely supported when installed by our experienced fabricators.',
        category: 'Services',
        active: true,
        sortOrder: 4
      },
      {
        question: 'How long does a PVC interior project take to complete?',
        answer: 'Because PVC profiles are pre-finished and prefabricated with precision, on-site installation is much faster and cleaner than traditional woodwork. A standard kitchen or wardrobe is typically completed within 3 to 7 working days once designs and measurements are finalized.',
        category: 'Work Process',
        active: true,
        sortOrder: 5
      },
      {
        question: 'Can I choose different colors and wooden textures?',
        answer: 'Yes, we offer an extensive palette of surface finishes including natural teak, walnut, oak wooden textures, modern solid pastels, high-gloss whites, and matte textures.',
        category: 'Services',
        active: true,
        sortOrder: 6
      }
    ];
    faqs.forEach(f => faqsCollection.create(f));
    console.log('[Seed] FAQs seeded');
  }

  // 6. Seed Sample Initial Booking for demo/test visibility
  if (bookingsCollection.countDocuments() === 0) {
    bookingsCollection.create({
      id: 'bk_sample_1',
      bookingId: 'SSPI-104928',
      name: 'Ramesh Patel',
      phone: '+91 9825012345',
      serviceId: 'pvc-modular-kitchen',
      serviceName: 'PVC Modular Kitchen',
      preferredDate: '2026-09-25',
      preferredTime: '11:00 AM - 01:00 PM',
      city: 'Ahmedabad',
      area: 'Vastral',
      address: 'B-204, Shivalik Residency, Near Ratanpura Road',
      landmark: 'Opposite Vastral Metro Station',
      pincode: '382418',
      message: 'Looking for an L-shaped modular kitchen for our new 3BHK flat.',
      status: 'Confirmed',
      adminNotes: 'Spoke with customer. Confirmed visit for 11:30 AM.',
      statusHistory: [
        { status: 'Pending', timestamp: new Date(Date.now() - 86400000).toISOString(), note: 'Booking submitted online' },
        { status: 'Confirmed', timestamp: new Date(Date.now() - 43200000).toISOString(), note: 'Confirmed with customer by phone' }
      ]
    });
    console.log('[Seed] Sample booking seeded');
  }
};

module.exports = seedData;
