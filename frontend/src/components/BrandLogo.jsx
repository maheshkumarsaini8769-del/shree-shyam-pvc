import React from 'react';

export const BrandLogo = ({ isDark = false, className = '' }) => {
  const primaryColor = isDark ? '#FFFFFF' : '#0B0F17';
  const goldColor = '#C59A33';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Architectural House / PVC Geometry Emblem */}
      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105 ${
        isDark ? 'bg-white/10 border border-white/15' : 'bg-obsidian text-luxury-gold shadow-sm'
      }`}>
        <svg
          width="26"
          height="22"
          viewBox="0 0 54 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Architectural Gable Roof */}
          <path
            d="M4 24L27 6L50 24"
            stroke={goldColor}
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* PVC Horizontal Louvers */}
          <line x1="16" y1="16" x2="38" y2="16" stroke={isDark ? '#FFFFFF' : '#E5C065'} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="12" y1="21" x2="42" y2="21" stroke={goldColor} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="8" y1="26" x2="46" y2="26" stroke={isDark ? '#FFFFFF' : '#E5C065'} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col text-left">
        <span
          style={{ color: primaryColor }}
          className="font-serif font-black text-base sm:text-lg tracking-tight leading-none"
        >
          SHREE SHYAM
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.24em] text-luxury-gold uppercase leading-none">
            PVC INTERIOR
          </span>
          <span className="text-[8px] text-charcoal-muted">•</span>
          <span className={`text-[8.5px] font-semibold tracking-wider uppercase leading-none ${isDark ? 'text-white/60' : 'text-charcoal-muted'}`}>
            VASTRAL
          </span>
        </div>
      </div>
    </div>
  );
};
