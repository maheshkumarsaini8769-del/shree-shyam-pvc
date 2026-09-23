import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Layers,
  Image,
  MessageSquare,
  Star,
  HelpCircle,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const AdminLayout = () => {
  const { user, loading, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      api.adminGetDashboardStats().then(data => setStats(data)).catch(() => {});
    }
  }, [isAdmin, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal text-white text-sm">
        Verifying administrator credentials...
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const navLinks = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    {
      label: 'Bookings',
      path: '/admin/bookings',
      icon: CalendarCheck,
      badge: stats?.metrics?.pending > 0 ? stats.metrics.pending : null
    },
    {
      label: 'Enquiries',
      path: '/admin/enquiries',
      icon: MessageSquare,
      badge: stats?.metrics?.newEnquiries > 0 ? stats.metrics.newEnquiries : null
    },
    { label: 'Services', path: '/admin/services', icon: Layers },
    { label: 'Gallery', path: '/admin/gallery', icon: Image },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'FAQs', path: '/admin/faq', icon: HelpCircle },
    { label: 'Content & Settings', path: '/admin/settings', icon: Settings },
    { label: 'Notifications', path: '/admin/notifications', icon: Bell }
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-warm-white text-charcoal flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-charcoal text-white shrink-0 border-r border-charcoal-light">
        <div className="p-6 border-b border-white/10">
          <Link to="/" target="_blank" className="flex items-center justify-between group">
            <div>
              <div className="font-extrabold text-base tracking-tight text-white">
                Shree Shyam
              </div>
              <div className="text-[10px] font-bold tracking-widest text-brand-red uppercase">
                ADMIN PORTAL
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 text-sm">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  active
                    ? 'bg-brand-red text-white shadow-soft font-bold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-charcoal">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs">
          <div className="truncate pr-2">
            <p className="font-bold text-white truncate">{user.name}</p>
            <p className="text-white/50 text-[10px]">Workshop Admin</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-lg text-white/60 hover:text-brand-red hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Admin Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Admin Bar */}
        <header className="lg:hidden bg-charcoal text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="text-center">
            <span className="font-extrabold text-sm text-white block leading-none">
              Shree Shyam Admin
            </span>
            <span className="text-[10px] text-brand-red font-bold uppercase tracking-wider">
              Management
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 text-white/70 hover:text-brand-red"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-charcoal text-white p-4 border-b border-white/10 space-y-1 text-sm shadow-xl">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                    active ? 'bg-brand-red text-white' : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-charcoal">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Admin Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
