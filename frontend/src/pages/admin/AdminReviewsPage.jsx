import React, { useState, useEffect } from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { api } from '../../services/api';

export const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchReviews = () => {
    setLoading(true);
    api.adminGetReviews({ status: statusFilter })
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching admin reviews:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.adminUpdateReview(id, { status });
      fetchReviews();
    } catch (err) {
      alert('Error updating review status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await api.adminDeleteReview(id);
      fetchReviews();
    } catch (err) {
      alert('Error deleting review: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            FEEDBACK MODERATION
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            Review Moderation Queue
          </h1>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-warm-border bg-white text-xs font-semibold text-charcoal"
          >
            <option value="all">All Reviews</option>
            <option value="Pending">Pending Moderation</option>
            <option value="Approved">Approved (Public)</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-warm-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 text-sm text-charcoal-muted">
            No reviews matching filter.
          </div>
        ) : (
          <div className="divide-y divide-warm-border/60">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-warm-white transition-colors">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-charcoal">{rev.customerName}</span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      rev.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : rev.status === 'Rejected'
                        ? 'bg-red-100 text-brand-red'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rev.status}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    "{rev.reviewText}"
                  </p>

                  <div className="text-[11px] text-charcoal-subtle flex items-center gap-2">
                    {rev.serviceUsed && <span>Service: <strong>{rev.serviceUsed}</strong></span>}
                    <span>•</span>
                    <span>Date: {new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {rev.status !== 'Approved' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'Approved')}
                      className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {rev.status !== 'Rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'Rejected')}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 rounded-lg text-charcoal-muted hover:text-brand-red hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
