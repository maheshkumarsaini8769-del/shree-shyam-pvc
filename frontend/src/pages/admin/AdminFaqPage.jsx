import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { api } from '../../services/api';

export const AdminFaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'PVC Interior',
    active: true
  });
  const [saving, setSaving] = useState(false);

  const fetchFaqs = () => {
    setLoading(true);
    api.adminGetFaqs()
      .then(data => setFaqs(data))
      .catch(err => console.error('Error fetching FAQs:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openAddModal = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '', category: 'PVC Interior', active: true });
    setShowModal(true);
  };

  const openEditModal = (f) => {
    setEditingFaq(f);
    setFormData({
      question: f.question,
      answer: f.answer,
      category: f.category || 'General',
      active: f.active !== false
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingFaq) {
        await api.adminUpdateFaq(editingFaq.id, formData);
      } else {
        await api.adminCreateFaq(formData);
      }
      setShowModal(false);
      fetchFaqs();
    } catch (err) {
      alert('Error saving FAQ: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this FAQ question?')) return;
    try {
      await api.adminDeleteFaq(id);
      fetchFaqs();
    } catch (err) {
      alert('Error deleting FAQ: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            KNOWLEDGE BASE
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            FAQ Management
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover shadow-soft transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-warm-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            Loading FAQs...
          </div>
        ) : (
          <div className="divide-y divide-warm-border/60">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-warm-white transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-warm-cream text-charcoal font-bold text-[10px] uppercase">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-sm text-charcoal">{faq.question}</h3>
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed pl-1 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => openEditModal(faq)}
                    className="p-2 rounded-lg text-charcoal-muted hover:text-charcoal hover:bg-warm-cream"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 rounded-lg text-charcoal-muted hover:text-brand-red hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-warm-border">
            <div className="flex items-center justify-between border-b border-warm-border pb-3">
              <h3 className="font-bold text-base text-charcoal">
                {editingFaq ? 'Edit FAQ' : 'Add FAQ'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-charcoal-muted hover:text-charcoal">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Is the site visit free?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                >
                  <option value="PVC Interior">PVC Interior</option>
                  <option value="Site Visit">Site Visit</option>
                  <option value="Booking">Booking</option>
                  <option value="Services">Services</option>
                  <option value="Work Process">Work Process</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Accurate, factual explanation..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
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
                  {saving ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
