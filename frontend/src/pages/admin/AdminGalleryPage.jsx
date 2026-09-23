import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Star, Check } from 'lucide-react';
import { api } from '../../services/api';
import { getImageByKey } from '../../data/images';

export const AdminGalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Kitchen',
    imageKey: 'kitchen',
    featured: false
  });
  const [saving, setSaving] = useState(false);

  const fetchGallery = () => {
    setLoading(true);
    api.getGallery()
      .then(data => setGallery(data))
      .catch(err => console.error('Error fetching gallery:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.adminCreateGalleryItem(formData);
      setShowModal(false);
      setFormData({ title: '', category: 'Kitchen', imageKey: 'kitchen', featured: false });
      fetchGallery();
    } catch (err) {
      alert('Error adding gallery image: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete image "${title}"?`)) return;
    try {
      await api.adminDeleteGalleryItem(id);
      fetchGallery();
    } catch (err) {
      alert('Error deleting image: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            PORTFOLIO MANAGER
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            Work Gallery Manager
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover shadow-soft transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Image to Gallery</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-charcoal-muted text-sm">
            Loading gallery...
          </div>
        ) : gallery.map((item) => {
          const img = getImageByKey(item.imageKey);
          return (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-warm-border shadow-soft group flex flex-col justify-between">
              <div className="aspect-[4/3] bg-warm-cream overflow-hidden relative">
                <img src={img} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-charcoal/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="absolute top-2 right-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              <div className="p-3 flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-charcoal truncate">{item.title}</span>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 rounded-lg text-charcoal-muted hover:text-brand-red hover:bg-red-50 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-warm-border">
            <div className="flex items-center justify-between border-b border-warm-border pb-3">
              <h3 className="font-bold text-base text-charcoal">Add Gallery Visual</h3>
              <button onClick={() => setShowModal(false)} className="text-charcoal-muted hover:text-charcoal">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern U-Shaped Kitchen Setup"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Category *</label>
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
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Assigned Image Asset</label>
                <select
                  value={formData.imageKey}
                  onChange={(e) => setFormData({ ...formData, imageKey: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                >
                  <option value="kitchen">kitchen (Kitchen Cabinetry)</option>
                  <option value="wardrobe">wardrobe (Wardrobe Sliding)</option>
                  <option value="doors">doors (Waterproof PVC Door)</option>
                  <option value="wallPanels">wallPanels (Louver Wall Panel)</option>
                  <option value="tvUnit">tvUnit (TV Entertainment Console)</option>
                  <option value="office">office (Office Partitions)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-brand-red rounded"
                />
                <label htmlFor="featured" className="font-semibold text-charcoal cursor-pointer">
                  Feature on Home Page Carousel
                </label>
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
                  {saving ? 'Adding...' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
