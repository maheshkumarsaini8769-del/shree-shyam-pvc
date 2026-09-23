import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Calendar, Phone } from 'lucide-react';
import { api } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { Link } from 'react-router-dom';

export const FaqPage = () => {
  const { settings } = useSettings();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const categories = ['All', 'PVC Interior', 'Site Visit', 'Booking', 'Services', 'Work Process'];

  useEffect(() => {
    api.getFaqs()
      .then(data => {
        setFaqs(data);
      })
      .catch(err => {
        console.error('Error fetching FAQs:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category?.toLowerCase() === activeCategory.toLowerCase());

  const toggleAccordion = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-10 pb-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-luxury-gold uppercase">
          QUESTIONS & CLARIFICATIONS
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-obsidian dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-charcoal-muted dark:text-slate-400 leading-relaxed">
          Learn about waterproof PVC profiles, termite protection, free site consultations, and installation timelines in Ahmedabad.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 justify-start sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenFaqIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-obsidian dark:bg-luxury-gold text-white dark:text-obsidian shadow-soft'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-charcoal-muted dark:text-slate-300 border border-slate-200 dark:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {loading ? (
          <div className="text-center py-12 text-sm text-charcoal-muted dark:text-slate-400">
            Loading FAQs...
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-center text-sm text-charcoal-muted dark:text-slate-400">
            No questions found in this category.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-soft overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-obsidian dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-obsidian dark:text-white shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-luxury-goldLight/20 text-luxury-goldDark dark:text-luxury-gold' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-charcoal dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/10 pt-4 animate-fadeIn">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                    {faq.category && (
                      <span className="inline-block mt-3 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-luxury-goldDark dark:text-luxury-gold uppercase tracking-wider">
                        {faq.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still have questions banner */}
      <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-base text-obsidian dark:text-white">Have a specific question about your layout?</h3>
          <p className="text-xs text-charcoal-muted dark:text-slate-400 mt-0.5">Call our workshop or schedule a free in-person site measurement.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${settings.phone1}`}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-obsidian dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Call {settings.phone1}
          </a>
          <Link
            to="/book"
            className="px-4 py-2.5 rounded-xl bg-obsidian dark:bg-luxury-gold text-white dark:text-obsidian text-xs font-bold hover:bg-charcoal dark:hover:bg-luxury-goldDark transition-colors"
          >
            Book Free Visit
          </Link>
        </div>
      </div>
    </div>
  );
};
