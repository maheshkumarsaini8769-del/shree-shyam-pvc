import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { SideDrawer } from '../components/SideDrawer';
import { Footer } from '../components/Footer';
import { FestiveOfferModal } from '../components/FestiveOfferModal';
import { FestiveAtmosphere } from '../components/FestiveAtmosphere';
import { useSettings } from '../context/SettingsContext';

export const PublicLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { settings } = useSettings();
  const fest = settings?.effectiveFestival;

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#121212] text-obsidian dark:text-[#F5F4F0] transition-colors duration-300 relative ${
      fest?.isFestive ? `festive-active festive-theme-${fest.id}` : ''
    }`}>
      {/* Full Website Background Architectural Square Box Grid */}
      <div className="fixed inset-0 architectural-grid pointer-events-none z-0" aria-hidden="true" />

      {/* Subtle Atmospheric Festival Aura for Diwali / Holi / Navratri */}
      {fest?.isFestive && (
        <div
          className="fixed top-0 left-0 right-0 h-48 pointer-events-none z-0 opacity-40 dark:opacity-20 transition-all duration-700 blur-[90px]"
          style={{ background: fest.primaryGlow || 'rgba(245, 158, 11, 0.25)' }}
        />
      )}

      {/* Floating Sparkles & Festive Particles */}
      <FestiveAtmosphere />

      {/* Sticky Header */}
      <Header onOpenMenu={() => setIsDrawerOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Mobile Bottom Nav */}
      <BottomNav onOpenMore={() => setIsDrawerOpen(true)} />

      {/* Mobile Side Drawer */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Interactive Festive Offer Modal Popup with Guaranteed Mobile Close Button */}
      <FestiveOfferModal />
    </div>
  );
};

export default PublicLayout;
