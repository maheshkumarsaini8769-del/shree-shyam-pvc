import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  CheckCircle2,
  Trash2,
  Edit,
  Save,
  MessageCircle,
  Clock
} from 'lucide-react';
import { api } from '../../services/api';

export const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  // Edit note modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editStatus, setEditStatus] = useState('New');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchEnquiries = () => {
    setLoading(true);
    api.adminGetEnquiries({ status: statusFilter })
      .then(data => setEnquiries(data))
      .catch(err => console.error('Error fetching enquiries:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const openManageModal = (enq) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status || 'New');
    setEditNotes(enq.notes || '');
  };

  const handleSave = async () => {
    if (!selectedEnquiry) return;
    setSaving(true);
    try {
      await api.adminUpdateEnquiry(selectedEnquiry.id, {
        status: editStatus,
        notes: editNotes
      });
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      alert('Error updating enquiry: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete enquiry from ${name}?`)) return;
    try {
      await api.adminDeleteEnquiry(id);
      fetchEnquiries();
    } catch (err) {
      alert('Error deleting enquiry: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            COMMUNICATION INBOX
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            General Inquiries
          </h1>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-warm-border bg-white text-xs font-semibold text-charcoal"
          >
            <option value="all">All Inquiries</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-warm-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            No customer inquiries found.
          </div>
        ) : (
          <div className="divide-y divide-warm-border/60">
            {enquiries.map((enq) => (
              <div key={enq.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-warm-white transition-colors">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-base text-charcoal">{enq.name}</span>
                    <a href={`tel:${enq.phone}`} className="text-xs font-semibold text-charcoal-muted hover:text-brand-red">
                      {enq.phone}
                    </a>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      enq.status === 'New'
                        ? 'bg-purple-100 text-purple-700'
                        : enq.status === 'Converted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-warm-cream text-charcoal'
                    }`}>
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-brand-brown">
                    Service: {enq.service}
                  </p>

                  {enq.message && (
                    <p className="text-xs text-charcoal-muted leading-relaxed bg-warm-cream/50 p-3 rounded-xl border border-warm-border/60">
                      "{enq.message}"
                    </p>
                  )}

                  {enq.notes && (
                    <p className="text-[11px] text-charcoal-muted font-medium">
                      <strong className="text-charcoal">Note:</strong> {enq.notes}
                    </p>
                  )}

                  <span className="text-[10px] text-charcoal-subtle block">
                    Received: {new Date(enq.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                  <a
                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${enq.name}, thank you for contacting Shree Shyam PVC Interior regarding ${enq.service}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-[#25D366] hover:bg-[#25D366]/10"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                  </a>

                  <button
                    onClick={() => openManageModal(enq)}
                    className="px-3 py-1.5 rounded-lg bg-warm-cream hover:bg-warm-border text-charcoal text-xs font-semibold"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(enq.id, enq.name)}
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

      {/* Edit Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-warm-border">
            <div className="flex items-center justify-between border-b border-warm-border pb-3">
              <h3 className="font-bold text-base text-charcoal">Update Inquiry</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-charcoal-muted hover:text-charcoal">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs font-semibold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">Follow-up Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Called customer. Wants to schedule on Sunday..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-white text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-warm-border">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-warm-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Updates'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
