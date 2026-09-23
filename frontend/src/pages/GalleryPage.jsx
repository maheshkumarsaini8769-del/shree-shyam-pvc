import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ZoomIn,
  ArrowRight,
  CheckCircle2,
  Camera,
  Layers,
  Maximize2
} from 'lucide-react';
import { images } from '../data/images';
import { realWorkImages } from '../data/realWorkImages';

export const GalleryPage = () => {
  const [searchParams] = useSearchParams();
  const currentCat = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(currentCat);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Studio showroom items
  const showroomItems = [
    { id: 'sh-01', title: 'Modular Kitchen with Warm Ambient LED Lighting', category: 'Kitchen', img: images.kitchen, description: 'High-gloss acrylic finish with soft-close tandem boxes', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-02', title: 'Kitchen Island & Storage Cabinets', category: 'Kitchen', img: images.kitchen2, description: 'Deep pull-out tandem drawers with organizer compartments', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-03', title: 'Kitchen Breakfast Bar & Island', category: 'Kitchen', img: images.kitchen3, description: 'White gloss & walnut woodgrain PVC island with pendant lights', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-04', title: 'Tall Pantry Storage Cabinet', category: 'Kitchen', img: images.kitchen4, description: 'Multi-tier chrome pull-out wire baskets and spice storage', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-05', title: 'Waterproof Solid PVC Door', category: 'Doors', img: images.doors, description: 'Heavy-duty embossed door with CNC decorative groove design', isRealWork: false, tag: 'Studio Design' },
    { id: 'sh-06', title: 'Modern PVC Corporate Workstations', category: 'Office', img: images.office, description: 'Acoustic modular workstation partitions and desk dividers', isRealWork: false, tag: 'Studio Design' },
  ];

  // Combine real work (priority) + studio items
  const allGalleryItems = [...realWorkImages, ...showroomItems];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
            <Camera className="w-3.5 h-3.5 text-luxury-gold" />
            <span>REAL WORK ARCHIVE • VASTAL & AHMEDABAD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian">
            Our Work Gallery
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5 max-w-2xl leading-relaxed">
            Authentic photographs of PVC wardrobes with upper lofts, fluted louver TV units, Italian marble sheets, and modular kitchens fabricated by Shree Shyam PVC Interior.
          </p>
        </div>

        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-obsidian text-white text-xs font-bold hover:bg-charcoal transition-all shadow-md active:scale-95 self-start sm:self-auto"
        >
          <span className="text-luxury-goldLight">Book Free Visit</span>
          <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
        </Link>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                isSelected
                  ? 'bg-obsidian text-white shadow-soft ring-2 ring-luxury-gold scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-obsidian'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid with High Zoom Hover Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-soft hover:shadow-floating transition-all duration-500 flex flex-col hover:-translate-y-1.5"
          >
            {/* Image Container with Zoom Scale Effect */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-luxury-goldLight">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to view HD zoom</span>
                </span>
              </div>

              {/* Top Tag */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  item.isRealWork
                    ? 'bg-emerald-700 text-white'
                    : 'bg-obsidian/80 backdrop-blur-md text-white'
                }`}>
                  {item.isRealWork ? '✓ Real Site Work' : item.category}
                </span>
              </div>
            </div>

            {/* Description Card */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h3 className="font-serif font-bold text-sm text-obsidian group-hover:text-luxury-goldDark transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-charcoal-muted mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-luxury-goldDark">
                  KAKA PVC PROFILE
                </span>
                <span className="font-bold text-slate-400 group-hover:text-obsidian transition-colors">
                  Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Zoom Controls */}
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
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={showPrev}
            className="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={showNext}
            className="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-obsidian rounded-2xl overflow-hidden border border-white/20 shadow-floating text-white flex flex-col max-h-[92vh]"
          >
            {/* Image Preview with Interactive Zoom Toggle */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-auto min-h-[50vh] max-h-[70vh] p-2">
              <img
                src={filteredItems[selectedImageIndex].img}
                alt={filteredItems[selectedImageIndex].title}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[68vh] w-auto object-contain transition-transform duration-300 cursor-zoom-in"
                onClick={() => setZoomLevel(prev => (prev === 1 ? 1.5 : 1))}
              />

              {/* Floating Zoom Indicator Button */}
              <button
                type="button"
                onClick={() => setZoomLevel(prev => (prev === 1 ? 1.5 : 1))}
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5 text-luxury-gold" />
                <span>{zoomLevel > 1 ? 'Reset Zoom (1x)' : 'Zoom In (1.5x)'}</span>
              </button>
            </div>

            {/* Bottom Meta & Action Bar */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-charcoal border-t border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-wider">
                    {filteredItems[selectedImageIndex].isRealWork ? '✓ Real On-Site Installation' : 'Studio Design'} • {filteredItems[selectedImageIndex].category}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-[10px] text-slate-400">
                    {selectedImageIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  {filteredItems[selectedImageIndex].title}
                </h3>
                <p className="text-xs text-slate-300">
                  {filteredItems[selectedImageIndex].description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/918209836370?text=Hello%20Shree%20Shyam%20PVC,%20I%20saw%20this%20design%20in%20your%20gallery:%20${encodeURIComponent(filteredItems[selectedImageIndex].title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  WhatsApp This Design
                </a>
                <Link
                  to="/book"
                  onClick={closeLightbox}
                  className="px-4 py-2.5 rounded-xl bg-luxury-gold hover:bg-amber-400 text-obsidian text-xs font-black transition-colors shadow-gold-glow"
                >
                  Get Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
