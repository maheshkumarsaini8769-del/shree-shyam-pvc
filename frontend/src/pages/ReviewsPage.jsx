import React, { useState } from 'react';
import { Star, ArrowRight, CheckCircle2, Send, X, Sparkles } from 'lucide-react';
import { images } from '../data/images';
import { api } from '../services/api';

export const ReviewsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('Vastral, Ahmedabad');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(null);

  const [reviewList] = useState([
    {
      id: 1,
      name: 'Rakesh Patel',
      location: 'Vastral, Ahmedabad',
      service: 'PVC Modular Kitchen',
      avatar: images.avatar1,
      rating: 5,
      comment: 'Bahut hi accha work kiya. Kitchen ka finish bilkul luxury wood jaisa hai aur 100% waterproof hai. Fitting team very punctual and clean.'
    },
    {
      id: 2,
      name: 'Neha Shah',
      location: 'Ahmedabad',
      service: 'Master Sliding Wardrobe',
      avatar: images.avatar2,
      rating: 5,
      comment: 'Modular kitchen & bedroom wardrobe bilkul waisa bana jaise 3D design me dikhaya tha. KAKA PVC profile finish is truly superior.'
    },
    {
      id: 3,
      name: 'Amit Soni',
      location: 'Vastral, Ahmedabad',
      service: 'TV Unit & Acoustic Louvers',
      avatar: images.avatar3,
      rating: 5,
      comment: 'On-time 7 days me kaam complete kiya. Living room ka look poora transform ho gaya. Zero termites guarantee is a big peace of mind.'
    }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim()) return;
    setSubmitting(true);
    try {
      await api.submitReview({
        customerName: `${customerName} (${location})`,
        rating,
        reviewText
      });
      setSubmittedNotice('Thank you! Your verified review has been submitted for moderation.');
      setTimeout(() => {
        setShowModal(false);
        setSubmittedNotice(null);
        setCustomerName('');
        setReviewText('');
      }, 2000);
    } catch (err) {
      alert('Error submitting review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-gold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL CLIENT TESTIMONIALS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-obsidian dark:text-white">
            Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted dark:text-slate-400 mt-1.5">
            Verified ratings and feedback from Ahmedabad homeowners and commercial clients.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-obsidian dark:bg-luxury-gold text-white dark:text-obsidian text-xs font-bold hover:bg-charcoal dark:hover:bg-luxury-goldDark transition-colors self-start sm:self-auto shadow-sm"
        >
          <span className="text-luxury-goldLight dark:text-obsidian font-bold">Write a Review</span>
          <ArrowRight className="w-3.5 h-3.5 text-luxury-gold dark:text-obsidian" />
        </button>
      </div>

      {/* Aggregate Rating Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="text-4xl sm:text-5xl font-serif font-black text-obsidian dark:text-white">
            4.9
          </div>
          <div>
            <div className="flex items-center text-amber-400 gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs font-bold text-obsidian dark:text-white">
              Based on 120+ Verified Local Ahmedabad Reviews
            </p>
            <p className="text-[11px] text-slate-400">
              100% Verified Shree Shyam PVC Interior Customers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-center">
            <span className="block text-obsidian dark:text-white font-bold">98%</span>
            <span className="text-[10px] text-charcoal-muted dark:text-slate-400 font-normal">On-Time Delivery</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-center">
            <span className="block text-emerald-600 dark:text-emerald-400 font-bold">100%</span>
            <span className="text-[10px] text-charcoal-muted dark:text-slate-400 font-normal">Waterproof Rating</span>
          </div>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {reviewList.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-soft hover:shadow-elevated transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
                />
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-obsidian dark:text-white">{rev.name}</h3>
                  <p className="text-xs text-charcoal-muted dark:text-slate-400">{rev.location} • <span className="text-luxury-goldDark dark:text-luxury-gold font-semibold">{rev.service}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                  Verified
                </span>
              </div>
            </div>

            <div className="flex items-center text-amber-400">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-charcoal dark:text-slate-300 leading-relaxed">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-floating space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
              <h3 className="font-serif font-bold text-lg text-obsidian dark:text-white">
                Share Your Experience
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-obsidian dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedNotice ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{submittedNotice}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Bhai"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                    Location in Ahmedabad
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-obsidian dark:text-white block mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Tell us about the PVC finish, durability, and on-time installation..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-obsidian dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-obsidian dark:bg-luxury-gold text-white dark:text-obsidian text-xs font-bold hover:bg-charcoal dark:hover:bg-luxury-goldDark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-luxury-gold dark:text-obsidian" />
                  <span className="font-bold">{submitting ? 'Submitting...' : 'Post Review'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
