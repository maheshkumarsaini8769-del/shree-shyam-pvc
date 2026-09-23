import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Layers } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-block p-4 rounded-3xl bg-warm-cream border border-warm-border">
          <span className="font-extrabold text-5xl sm:text-6xl text-brand-red font-mono">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
            Page Not Found
          </h1>
          <p className="text-sm text-charcoal-muted">
            Looks like this page doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black shadow-soft transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-warm-cream hover:bg-warm-border text-charcoal text-xs font-bold border border-warm-border transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
