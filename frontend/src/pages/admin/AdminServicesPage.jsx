import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { getImageByKey } from '../../data/images';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit / Add modal
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Kitchen',
    shortDescription: '',
    fullDescription: '',
    features: '',
    imageKey: 'kitchen',
    active: true
  });
  const [saving, setSaving] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    api.adminGetServices()
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: 'Kitchen',
      shortDescription: '',
      fullDescription: '',
      features: '',
      imageKey: 'kitchen',
      active: true
    });
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      category: service.category,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription || '',
      features: Array.isArray(service.features) ? service.features.join('\n') : '',
      imageKey: service.imageKey || 'kitchen',
      active: service.active !== false
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        features: formData.features.split('\n').filter(Boolean)
      };

      if (editingService) {
        await api.adminUpdateService(editingService.id, payload);
      } else {
        await api.adminCreateService(payload);
      }
      setShowModal(false);
      fetchServices();
    } catch (err) {
      alert('Error saving service: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.adminDeleteService(id);
      fetchServices();
    } catch (err) {
      alert('Error deleting service: ' + err.message);
    }
  };

  const handleToggleActive = async (service) => {
    try {
      await api.adminUpdateService(service.id, { active: !service.active });
      fetchServices();
    } catch (err) {
      alert('Error toggling status: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            CATALOG MANAGEMENT
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            PVC Interior Services
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover shadow-soft transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-warm-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            Loading services...
          </div>
        ) : (
          <div className="divide-y divide-warm-border/60">
            {services.map((service) => {
              const img = getImageByKey(service.imageKey);
              return (
                <div key={service.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-warm-white transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={img}
                      alt={service.title}
                      className="w-16 h-16 rounded-xl object-cover bg-warm-cream border border-warm-border shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red bg-brand-redLight px-2 py-0.5 rounded">
                          {service.category}
                        </span>
                        <h3 className="font-bold text-base text-charcoal">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-xs text-charcoal-muted mt-1 max-w-xl line-clamp-1">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      onClick={() => handleToggleActive(service)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        service.active !== false
                          ? 'bg-green-100 text-green-700'
                          : 'bg-warm-cream text-charcoal-muted'
                      }`}
                    >
                      {service.active !== false ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>{service.active !== false ? 'Active' : 'Disabled'}</span>
                    </button>

                    <button
                      onClick={() => openEditModal(service)}
                      className="p-2 rounded-lg text-charcoal-muted hover:text-charcoal hover:bg-warm-cream"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(service.id, service.title)}
                      className="p-2 rounded-lg text-charcoal-muted hover:text-brand-red hover:bg-red-50"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-warm-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-warm-border pb-3">
              <h3 className="font-bold text-base text-charcoal">
                {editingService ? 'Edit PVC Service' : 'Add New PVC Service'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-charcoal-muted hover:text-charcoal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PVC Modular Kitchen"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                  >
                    <option value="Kitchen">Kitchen</option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="Doors">Doors</option>
                    <option value="Wall Panels">Wall Panels</option>
                    <option value="TV Unit">TV Unit</option>
                    <option value="Office">Office</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                    Image Preset Key
                  </label>
                  <select
                    value={formData.imageKey}
                    onChange={(e) => setFormData({ ...formData, imageKey: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                  >
                    <option value="kitchen">kitchen</option>
                    <option value="wardrobe">wardrobe</option>
                    <option value="doors">doors</option>
                    <option value="wallPanels">wallPanels</option>
                    <option value="tvUnit">tvUnit</option>
                    <option value="office">office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary for cards and listings..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                  Full Description & Specifications
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed breakdown of profile quality, assembly, and finishes..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                  Features (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="100% Waterproof&#10;Termite and pest proof&#10;Soft-close hardware"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-warm-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-warm-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
