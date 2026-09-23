import React from 'react';
import logoImg from '../assets/logo.jpg';

export const BrandLogo = ({ isDark = false, className = '', showText = true, size = 'default' }) => {
  const primaryColor = isDark ? '#FFFFFF' : '#0B0F17';

  const sizeClasses = {
    sm: 'w-8 h-8',
    default: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12'
  }[size] || 'w-9 h-9 sm:w-10 sm:h-10';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* 3D Gold & Wood Logo Emblem */}
      <div className={`relative ${sizeClasses} rounded-full overflow-hidden shrink-0 shadow-md ring-1 ring-luxury-gold/50 transition-transform duration-300 hover:scale-105`}>
        <img
          src={logoImg}
          alt="Shree Shyam PVC Interior Logo"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Typography Lockup */}
      {showText && (
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
            <span className="text-[8px] text-stone-400">•</span>
            <span className={`text-[8.5px] font-semibold tracking-wider uppercase leading-none ${isDark ? 'text-stone-300' : 'text-stone-500'}`}>
              VASTRAL
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
