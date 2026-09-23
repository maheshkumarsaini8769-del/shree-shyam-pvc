import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Image, CalendarCheck, MoreHorizontal } from 'lucide-react';

export const BottomNav = ({ onOpenMore }) => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home, exact: true },
    { name: 'Services', path: '/services', icon: LayoutGrid },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Book', path: '/book', icon: CalendarCheck },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-obsidian/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-white/10 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] pb-safe transition-colors"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
                  isActive
                    ? 'text-obsidian dark:text-white font-bold'
                    : 'text-charcoal-muted dark:text-slate-400 hover:text-obsidian dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative p-1">
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4px] text-luxury-goldDark' : 'stroke-[1.8px]'}`} />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                    )}
                  </div>
                  <span className={`text-[11px] mt-0.5 leading-tight tracking-tight ${isActive ? 'text-obsidian font-bold' : ''}`}>
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* More Tab */}
        <button
          onClick={onOpenMore}
          aria-label="Open More Menu"
          className="flex flex-col items-center justify-center flex-1 h-full py-1 text-charcoal-muted hover:text-obsidian active:scale-95 transition-transform"
        >
          <div className="p-1">
            <MoreHorizontal className="w-5 h-5 stroke-[1.8px]" />
          </div>
          <span className="text-[11px] mt-0.5 leading-tight tracking-tight">More</span>
        </button>
      </div>
    </nav>
  );
};
