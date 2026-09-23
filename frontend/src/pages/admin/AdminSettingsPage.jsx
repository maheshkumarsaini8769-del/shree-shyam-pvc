import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

export const AdminSettingsPage = () => {
  const { settings, refreshSettings } = useSettings();
  const [formData, setFormData] = useState({
    businessName: '',
    profileBrand: '',
    address: '',
    primaryPhone: '',
    secondaryPhone: '',
    whatsappNumber: '',
    heroHeadline: '',
    heroSubheadline: '',
    workingHours: '',
    mapEmbedUrl: '',
    footerAbout: ''
  });

  const [saving, setSaving] = useState(false);
  const [successNotice, setSuccessNotice] = useState(null);
  const [errorNotice, setErrorNotice] = useState(null);

  useEffect(() => {
    api.getSettings().then(data => {
      setFormData({
        businessName: data.businessName || settings.name,
        profileBrand: data.profileBrand || settings.profileBrand,
        address: data.address || settings.address,
        primaryPhone: data.primaryPhone || settings.phone1,
        secondaryPhone: data.secondaryPhone || settings.phone2 || '',
        whatsappNumber: data.whatsappNumber || settings.whatsappNumber,
        heroHeadline: data.heroHeadline || 'Elegant Spaces For A Better Tomorrow',
        heroSubheadline: data.heroSubheadline || 'Premium PVC Interior Solutions For Home & Office',
        workingHours: data.workingHours || 'Monday - Saturday: 9:00 AM - 8:30 PM',
        mapEmbedUrl: data.mapEmbedUrl || '',
        footerAbout: data.footerAbout || ''
      });
    });
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessNotice(null);
    setErrorNotice(null);

    try {
      await api.adminUpdateSettings(formData);
      await refreshSettings();
      setSuccessNotice('Settings and content updated successfully!');
    } catch (err) {
      setErrorNotice(err.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
          CMS & CONFIGURATION
        </span>
        <h1 className="text-2xl font-extrabold text-charcoal">
          Website Content & Workshop Settings
        </h1>
        <p className="text-xs text-charcoal-muted mt-1">
          Update business card contact points, hero slogans, and working hours across the public website.
        </p>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {errorNotice && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-brand-red text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorNotice}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-border shadow-soft space-y-6 text-xs">
        {/* Brand Information */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider border-b border-warm-border pb-2">
            1. Brand & Business Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white font-semibold text-charcoal text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Profile Brand Identity
              </label>
              <input
                type="text"
                value={formData.profileBrand}
                onChange={(e) => setFormData({ ...formData, profileBrand: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white font-semibold text-charcoal text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers from Card */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider border-b border-warm-border pb-2">
            2. Contact Phone Numbers & WhatsApp
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                value={formData.primaryPhone}
                onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Secondary Phone Number
              </label>
              <input
                type="text"
                value={formData.secondaryPhone}
                onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Physical Address */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider border-b border-warm-border pb-2">
            3. Address & Working Hours
          </h2>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Workshop / Office Address
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Working Hours
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Google Maps Embed URL
              </label>
              <input
                type="text"
                value={formData.mapEmbedUrl}
                onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider border-b border-warm-border pb-2">
            4. Hero Page Headlines
          </h2>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Hero Supporting Subheadline
            </label>
            <input
              type="text"
              value={formData.heroSubheadline}
              onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-warm-border flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover disabled:opacity-50 shadow-soft"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
