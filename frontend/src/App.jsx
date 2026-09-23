import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BookingPage } from './pages/BookingPage';
import { BookingTrackPage } from './pages/BookingTrackPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LocationPage } from './pages/LocationPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Customer Pages
import { LoginPage } from './pages/customer/LoginPage';
import { RegisterPage } from './pages/customer/RegisterPage';
import { MyBookingsPage } from './pages/customer/MyBookingsPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminFaqPage } from './pages/admin/AdminFaqPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <Routes>
          {/* Public & Customer Routes under PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/booking/:id" element={<BookingTrackPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* Customer accounts & tracking */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />

            {/* Legal */}
            <Route path="/privacy-policy" element={<LegalPage />} />
            <Route path="/terms-and-conditions" element={<LegalPage />} />
            <Route path="/cancellation-refund" element={<LegalPage />} />

            {/* 404 */}
            <Route path="/404" element={<NotFoundPage />} />
          </Route>

          {/* Admin Login (standalone) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Routes under AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="bookings/:id" element={<AdminBookingsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="services/new" element={<AdminServicesPage />} />
            <Route path="services/:id/edit" element={<AdminServicesPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="faq" element={<AdminFaqPage />} />
            <Route path="content" element={<AdminSettingsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
          </Route>

          {/* Catch all fallback */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </SettingsProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
