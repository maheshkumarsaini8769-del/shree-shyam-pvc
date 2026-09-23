import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/my-bookings';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setErrorMsg('Please enter your email or phone, and password.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      await login(identifier, password);
      navigate(from);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-warm-border shadow-soft space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-brand-red uppercase">
            ACCOUNT ACCESS
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            Customer Login
          </h1>
          <p className="text-xs text-charcoal-muted">
            Access your bookings and saved consultation history
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 text-brand-red text-xs font-semibold flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Phone Number or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. 9825012345 or email@domain.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black disabled:opacity-50 transition-colors shadow-soft"
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-warm-border/60 text-center space-y-2 text-xs">
          <p className="text-charcoal-muted">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-brand-red hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-charcoal-muted">
            Just want to track a visit?{' '}
            <Link to="/my-bookings" className="font-bold text-charcoal hover:underline">
              Track by phone number
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
