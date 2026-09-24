import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Phone, MessageCircle, ArrowRight, CheckCircle2, ShieldCheck, Gift, Copy, Check } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { FestiveCountdown } from './FestiveCountdown';

export const FestiveOfferModal = () => {
  const { settings } = useSettings();
  const fest = settings?.effectiveFestival;

  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [couponRevealed, setCouponRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if festival mode is active and not yet dismissed in current browser session
  useEffect(() => {
    if (!fest || !fest.isFestive || fest.showPopup === false) {
      setIsOpen(false);
      return;
    }

    const storageKey = `shree_shyam_fest_popup_seen_${fest.id}_${fest.discountPercent || 0}`;
    const hasSeen = sessionStorage.getItem(storageKey);

    if (!hasSeen) {
      // Small 1.2s delay for seamless initial page loading
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      // Keep floating trigger available so user can view offer whenever they wish
      setMinimized(true);
    }
  }, [fest?.id, fest?.isFestive, fest?.discountPercent, fest?.showPopup]);

  const handleClose = () => {
    setIsOpen(false);
    setMinimized(true);
    if (fest?.id) {
      const storageKey = `shree_shyam_fest_popup_seen_${fest.id}_${fest.discountPercent || 0}`;
      sessionStorage.setItem(storageKey, 'true');
    }
  };

  const handleReopen = () => {
    setIsOpen(true);
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!fest || !fest.isFestive || fest.showPopup === false) {
    return null;
  }

  const generatedCoupon = fest.couponCode || `${(fest.id || 'FEST').toUpperCase()}-${fest.discountPercent || '15'}OFF`;

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(generatedCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const phone = settings?.phone1 || '+91 8209836370';
  const whatsappNum = (settings?.whatsappNumber || '918209836370').replace(/[^0-9]/g, '');
  const cleanPhone = whatsappNum.startsWith('91') ? whatsappNum : `91${whatsappNum}`;
  const whatsappMsg = encodeURIComponent(
    `Hello Shree Shyam PVC Interior! I want to claim your ${fest.name} special offer on your website with Coupon Code: *${generatedCoupon}* (${fest.discountPercent > 0 ? `Flat ${fest.discountPercent}% OFF` : fest.offerTagline}). Please arrange a free laser site measurement for my home.`
  );

  return (
    <>
      {/* 1. FLOATING MINIMIZED FESTIVE BADGE (When popup is closed) */}
      {!isOpen && minimized && (
        <button
          onClick={handleReopen}
          aria-label="View Festive Offer"
          className="fixed bottom-20 left-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 font-black text-xs shadow-2xl hover:scale-105 active:scale-95 transition-transform border border-amber-300 animate-bounce"
        >
          <span className="text-base">{fest.icon || '🎁'}</span>
          <span className="hidden sm:inline font-serif tracking-wide">{fest.name}:</span>
          <span>{fest.discountPercent > 0 ? `Claim ${fest.discountPercent}% OFF` : 'Festive Offer'}</span>
        </button>
      )}

      {/* 2. FULL FESTIVE OFFER POPUP MODAL */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="festive-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-fade-in"
        >
          {/* Backdrop Blur with click-to-close */}
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg my-auto rounded-3xl overflow-hidden bg-[#121620] border-2 border-amber-500/50 shadow-2xl text-stone-100 flex flex-col z-10 max-h-[92vh] sm:max-h-[88vh]"
          >
            {/* Top Close Button for Mobile & Desktop (High Contrast & Big Touch Area) */}
            <button
              onClick={handleClose}
              type="button"
              aria-label="Close Festive Popup"
              className="absolute top-3.5 right-3.5 z-30 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white border-2 border-white/30 hover:border-white shadow-xl flex items-center justify-center active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Header Banner with Festive Mood */}
            <div className={`p-6 sm:p-7 relative overflow-hidden text-center ${fest.themeClasses?.popupHeaderBg || 'bg-gradient-to-r from-amber-600 to-orange-600 text-stone-950'}`}>
              {/* Decorative Subtle Glowing Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Decorative Emojis */}
              <div className="flex items-center justify-center gap-2 mb-2">
                {(fest.decorIcons && fest.decorIcons.length > 0 ? fest.decorIcons : ['🪔', '✨', '🌟', '🪔']).map((ic, i) => (
                  <span key={i} className="text-xl sm:text-2xl animate-pulse" style={{ animationDelay: `${i * 180}ms` }}>
                    {ic}
                  </span>
                ))}
              </div>

              <div className="inline-block px-3 py-0.5 rounded-full bg-black/25 text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-1.5 backdrop-blur-sm border border-white/20">
                {fest.name || 'Special Festive Celebration'}
              </div>

              <h2 id="festive-modal-title" className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight leading-snug drop-shadow-sm">
                {fest.modalTitle || fest.greeting || 'Shubh Festive Wishes!'}
              </h2>

              <p className="text-xs sm:text-sm font-medium opacity-90 max-w-sm mx-auto mt-1 leading-relaxed">
                {fest.modalSubtitle || fest.announcement}
              </p>

              {/* Big Discount Badge */}
              {Number(fest.discountPercent) > 0 && (
                <div className="mt-3.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-black/40 border border-white/30 backdrop-blur-md shadow-lg text-white">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    FLAT <strong className="text-amber-300 text-base sm:text-lg font-black">{fest.discountPercent}% OFF</strong> ON COMPLETE INTERIORS
                  </span>
                </div>
              )}
            </div>

            {/* Scrollable Body Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
              {/* LIVE COUNTDOWN TIMER FOR URGENCY */}
              {fest.showCountdown !== false && (
                <FestiveCountdown endDate={fest.countdownEndDate} variant="card" festivalName={fest.name} />
              )}

              {/* GAMIFIED COUPON REVEAL */}
              <div className="p-3.5 rounded-2xl bg-[#141B28] border border-amber-500/30 text-stone-200">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                    <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>Festive Voucher Code</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Valid for Ahmedabad projects</span>
                </div>

                {!couponRevealed ? (
                  <button
                    type="button"
                    onClick={() => setCouponRevealed(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-dashed border-amber-500/50 text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Tap to Unlock Your Festive Bonus Code 🎁</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-black/40 border border-amber-500/50">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-xs text-stone-400 font-mono">CODE:</span>
                      <span className="font-mono font-black text-sm text-amber-300 tracking-wider truncate">
                        {generatedCoupon}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCoupon}
                      className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Highlight Tagline Box */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{fest.icon || '🎁'}</span>
                <div>
                  <strong className="block text-white font-bold text-xs uppercase tracking-wide">
                    {fest.name} Exclusive Benefit:
                  </strong>
                  <p className="text-stone-300 text-xs mt-0.5 leading-relaxed">
                    {fest.offerTagline || 'Zero wood swelling, 100% termite-proof PVC modular interiors fabricated in Vastral, Ahmedabad.'}
                  </p>
                </div>
              </div>

              {/* Offer Bullet Highlights */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider font-mono">
                  Why Book During This Festival:
                </p>
                <div className="space-y-2">
                  {(fest.popupOfferHighlights && fest.popupOfferHighlights.length > 0 ? fest.popupOfferHighlights : [
                    '100% Waterproof & Termite-Proof Genuine Virgin PVC Profile',
                    'Complimentary Laser Site Measurement Across Ahmedabad',
                    '10-Year Replacement Guarantee & Formal Written Estimate',
                    'Direct Factory-Price Fabrication in Vastral, Ahmedabad'
                  ]).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[2.2]" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* WhatsApp Claim Button */}
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleClose}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Claim on WhatsApp</span>
                  </a>

                  {/* Book Site Visit Route */}
                  <Link
                    to="/book"
                    onClick={handleClose}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 ${fest.themeClasses?.buttonBg || 'bg-amber-500 hover:bg-amber-600 text-stone-950'}`}
                  >
                    <span>Book Free Site Visit</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>

                {/* Call directly fallback */}
                <div className="flex items-center justify-between text-[11px] text-stone-400 px-1 pt-1">
                  <span>Questions? Call owner direct:</span>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-mono font-bold text-amber-400 hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Guaranteed Mobile Close Bar (Makes sure mobile users NEVER get stuck!) */}
            <div className="p-3 bg-black/40 border-t border-white/10 text-center shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5 active:scale-98"
              >
                <X className="w-4 h-4 text-stone-400" />
                <span>Dismiss &amp; Continue to Website</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
