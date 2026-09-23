import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { SideDrawer } from '../components/SideDrawer';
import { Footer } from '../components/Footer';

export const PublicLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#121212] text-obsidian dark:text-[#F5F4F0] transition-colors duration-300">
      {/* Sticky Header */}
      <Header onOpenMenu={() => setIsDrawerOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Mobile Bottom Nav */}
      <BottomNav onOpenMore={() => setIsDrawerOpen(true)} />

      {/* Mobile Side Drawer */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};
