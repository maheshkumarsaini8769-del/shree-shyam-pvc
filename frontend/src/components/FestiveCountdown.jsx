import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

export const FestiveCountdown = ({ endDate, variant = 'card', festivalName = 'Festive Offer' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    // Determine target end time
    let targetTime = null;
    if (endDate && !isNaN(new Date(endDate).getTime())) {
      targetTime = new Date(endDate).getTime();
    } else {
      // Default to 4 days rolling festive urgency if specific date is not set
      const now = new Date();
      targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 23, 59, 59).getTime();
    }

    const calculate = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
        <span>Offer ending today! Contact workshop now.</span>
      </div>
    );
  }

  // COMPACT VARIANT (For Top Notice Bar / Hero Ribbon)
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-amber-300 shrink-0">
        <Clock className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
        <span>Ends in:</span>
        <span className="px-1 py-0.5 rounded bg-black/40 border border-amber-500/30 text-white">
          {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
          {String(timeLeft.hours).padStart(2, '0')}h:
          {String(timeLeft.minutes).padStart(2, '0')}m:
          {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  // CARD VARIANT (For Festive Modal Popup)
  return (
    <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/30 shadow-inner">
      <div className="flex items-center justify-between gap-2 mb-2 text-[10.5px] font-bold text-amber-300 uppercase tracking-wider font-mono">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400 animate-bounce" />
          <span>Limited Time Offer:</span>
        </span>
        <span className="text-stone-400 normal-case">Book before timer expires</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
        <div className="bg-[#181F2E]/90 border border-white/10 rounded-xl p-1.5 shadow-sm">
          <span className="block text-base sm:text-lg font-black text-amber-300 leading-none">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-stone-400 mt-1">Days</span>
        </div>

        <div className="bg-[#181F2E]/90 border border-white/10 rounded-xl p-1.5 shadow-sm">
          <span className="block text-base sm:text-lg font-black text-white leading-none">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-stone-400 mt-1">Hours</span>
        </div>

        <div className="bg-[#181F2E]/90 border border-white/10 rounded-xl p-1.5 shadow-sm">
          <span className="block text-base sm:text-lg font-black text-white leading-none">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-stone-400 mt-1">Mins</span>
        </div>

        <div className="bg-[#181F2E]/90 border border-white/10 rounded-xl p-1.5 shadow-sm">
          <span className="block text-base sm:text-lg font-black text-amber-400 leading-none animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-stone-400 mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
};
