import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ArrowRight,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { images } from '../data/images';
import { realWorkImages } from '../data/realWorkImages';

import { api } from '../services/api';

export const GalleryPage = () => {
  const [searchParams] = useSearchParams();
  const currentCat = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(currentCat);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dbGalleryItems, setDbGalleryItems] = useState([]);

  // Studio showroom items
  const showroomItems = [
    { id: 'sh-01', title: 'Modular Kitchen with Warm Ambient LED Lighting', category: 'Kitchen', img: images.kitchen, description: 'High-gloss acrylic finish with soft-close tandem boxes', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-02', title: 'Kitchen Island & Storage Cabinets', category: 'Kitchen', img: images.kitchen2, description: 'Deep pull-out tandem drawers with organizer compartments', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-03', title: 'Kitchen Breakfast Bar & Island', category: 'Kitchen', img: images.kitchen3, description: 'White gloss & walnut woodgrain PVC island with pendant lights', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-04', title: 'Tall Pantry Storage Cabinet', category: 'Kitchen', img: images.kitchen4, description: 'Multi-tier chrome pull-out wire baskets and spice storage', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-05', title: 'Waterproof Solid PVC Door', category: 'Doors', img: images.doors, description: 'Heavy-duty embossed door with CNC decorative groove design', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-06', title: 'Modern PVC Corporate Workstations', category: 'Office', img: images.office, description: 'Acoustic modular workstation partitions and desk dividers', isRealWork: false, tag: 'Studio Design' },
  ];

  React.useEffect(() => {
    api.getGallery().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item, idx) => ({
          id: item.id || item._id || `db-${idx}`,
          title: item.title,
          category: item.category,
          img: item.imageUrl?.startsWith('/assets/real-work/') 
            ? (realWorkImages.find(r => r.img.includes(item.imageUrl.split('/').pop().replace('.jpg', '')))?.img || item.imageUrl)
            : item.imageUrl,
          description: item.description || '',
          isRealWork: item.isRealWork !== false,
          tag: item.tag || 'On-Site Installation'
        }));
        setDbGalleryItems(mapped);
      }
    }).catch(() => {});
  }, []);

  // Combine real work (priority) + studio items
  const allGalleryItems = dbGalleryItems.length > 0 ? [...dbGalleryItems, ...showroomItems] : [...realWorkImages, ...showroomItems];

  const categories = [
    { id: 'All', label: 'All Projects (34)' },
    { id: 'RealWork', label: '🔨 On-Site Work (28)' },
    { id: 'TV Unit', label: '📺 TV Units & Louvers (14)' },
    { id: 'Wardrobe', label: '🚪 Wardrobes & Lofts (14)' },
    { id: 'Kitchen', label: '🍳 Modular Kitchen (4)' },
    { id: 'Doors', label: '🚪 Doors & Office' }
  ];

  const filteredItems = allGalleryItems.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'RealWork') return item.isRealWork;
    if (activeCategory === 'TV Unit') return item.category === 'TV Unit';
    if (activeCategory === 'Wardrobe') return item.category === 'Wardrobe';
    if (activeCategory === 'Kitchen') return item.category === 'Kitchen';
    if (activeCategory === 'Doors') return item.category === 'Doors' || item.category === 'Office';
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
      setZoomLevel(1);
    }
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
      setZoomLevel(1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-28">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 dark:border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-luxury-goldDark dark:text-luxury-gold mb-1">
            <Camera className="w-3.5 h-3.5 text-luxury-gold" />
            <span>REAL WORK ARCHIVE • VASTRAL &amp; AHMEDABAD</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
            Our Work Gallery
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl leading-relaxed">
            Authentic photographs of PVC wardrobes with upper lofts, fluted louver TV units, Italian marble sheets, and modular kitchens fabricated by Shree Shyam PVC Interior.
          </p>
        </div>

        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-[#121212] text-xs font-black shadow-sm transition-all active:scale-95 self-start sm:self-auto"
        >
          <span>Book Free Visit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Category Pills */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-luxury-gold text-[#121212] shadow-sm font-black'
                  : 'bg-stone-100 hover:bg-stone-200 dark:bg-white/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-[#1A1918] border border-stone-200/80 dark:border-white/10 shadow-sm hover:shadow-floating transition-all duration-300 flex flex-col hover:-translate-y-1"
          >
            {/* Image Container with Zoom Scale Effect */}
            <div className="relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-luxury-goldLight">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to view HD zoom</span>
                </span>
              </div>

              {/* Top Tag Badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  item.isRealWork
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black/70 backdrop-blur-md text-white'
                }`}>
                  {item.isRealWork ? '✓ Real Site Work' : item.category}
                </span>
              </div>
            </div>

            {/* Description Card */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-serif font-bold text-sm text-obsidian dark:text-white group-hover:text-luxury-goldDark dark:group-hover:text-luxury-gold transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-white/10 flex items-center justify-between text-[11px]">
                <span className="font-bold text-luxury-goldDark dark:text-luxury-gold">
                  KAKA PVC PROFILE
                </span>
                <span className="font-bold text-stone-400 dark:text-stone-500 group-hover:text-obsidian dark:group-hover:text-white transition-colors">
                  Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in-up"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={showPrev}
            className="absolute left-3 sm:left-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={showNext}
            className="absolute right-3 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#161514] rounded-2xl overflow-hidden border border-white/15 shadow-2xl text-white flex flex-col max-h-[92vh]"
          >
            {/* Image Preview with Interactive Zoom Toggle */}
            <div
              className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[460px] cursor-zoom-in"
              onClick={() => setZoomLevel(prev => (prev === 1 ? 1.8 : 1))}
            >
              <img
                src={filteredItems[selectedImageIndex]?.img}
                alt={filteredItems[selectedImageIndex]?.title}
                className="max-h-[65vh] w-auto object-contain transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              />

              {/* Zoom Instruction Floating Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-stone-300 border border-white/15">
                {zoomLevel === 1 ? 'Tap to Zoom 1.8x' : 'Tap to Reset Zoom'}
              </div>
            </div>

            {/* Lightbox Caption Footer */}
            <div className="p-4 sm:p-5 bg-[#1A1918] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-luxury-gold/15 text-luxury-gold text-[10px] font-bold uppercase border border-luxury-gold/30">
                    {filteredItems[selectedImageIndex]?.category}
                  </span>
                  {filteredItems[selectedImageIndex]?.isRealWork && (
                    <span className="text-[10px] font-bold text-emerald-400">
                      ✓ Authentic On-Site Photo
                    </span>
                  )}
                </div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-white">
                  {filteredItems[selectedImageIndex]?.title}
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  {filteredItems[selectedImageIndex]?.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-stone-500 mr-2">
                  {selectedImageIndex + 1} / {filteredItems.length}
                </span>
                <Link
                  to="/book"
                  onClick={closeLightbox}
                  className="px-4 py-2 rounded-xl bg-luxury-gold text-[#121212] text-xs font-black hover:bg-luxury-goldDark transition-colors shadow-sm"
                >
                  Book Free Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
