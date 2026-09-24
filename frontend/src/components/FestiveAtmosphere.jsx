import React, { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';

export const FestiveAtmosphere = () => {
  const { settings } = useSettings();
  const fest = settings?.effectiveFestival;
  const canvasRef = useRef(null);

  const isFestive = fest && fest.isFestive && fest.showAtmosphere !== false;

  useEffect(() => {
    if (!isFestive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle color palettes depending on active festival
    const festivalId = fest.id || 'diwali';
    let palette = ['#F59E0B', '#FBBF24', '#D97706', '#FEF3C7', '#EF4444']; // Diwali warm gold / diya embers

    if (festivalId === 'holi') {
      palette = ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']; // Holi vibrant gulal
    } else if (festivalId === 'navratri') {
      palette = ['#F43F5E', '#FB7185', '#F59E0B', '#FCD34D', '#E11D48']; // Navratri auspicious rose & marigold
    } else if (festivalId === 'newyear') {
      palette = ['#6366F1', '#818CF8', '#C7D2FE', '#F59E0B', '#38BDF8']; // New year midnight & champagne
    } else if (festivalId === 'republic') {
      palette = ['#FF9933', '#FFFFFF', '#138808', '#F59E0B']; // Tiranga
    }

    const particleCount = width < 768 ? 20 : 38; // Lightweight for mobile
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2,
        color: palette[Math.floor(Math.random() * palette.length)],
        vx: (Math.random() - 0.5) * 0.6,
        vy: festivalId === 'diwali' ? -(Math.random() * 0.7 + 0.3) : (Math.random() * 0.6 + 0.2), // Diwali rises like embers, others float softly
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulseVal += p.pulseSpeed;

        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.2;
        const safeAlpha = Math.max(0.05, Math.min(0.85, currentAlpha));

        // Wrap around bounds
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = safeAlpha;
        ctx.shadowBlur = p.radius * 3.5;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFestive, fest?.id, fest?.showAtmosphere]);

  if (!isFestive) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 opacity-70 dark:opacity-50 transition-opacity duration-1000"
    />
  );
};
