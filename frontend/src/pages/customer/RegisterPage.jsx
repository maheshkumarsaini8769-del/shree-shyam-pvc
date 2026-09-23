import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      await register(formData);
      navigate('/my-bookings');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-warm-border shadow-soft space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-brand-red uppercase">
            NEW CUSTOMER
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal">
            Create Account
          </h1>
          <p className="text-xs text-charcoal-muted">
            Manage your interior site bookings in one place
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
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Patel"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Mobile Number *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-charcoal-muted">+91</span>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="9825012345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-warm-border bg-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-warm-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover disabled:opacity-50 transition-colors shadow-soft"
          >
            <span>{submitting ? 'Creating Account...' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-warm-border/60 text-center text-xs text-charcoal-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-charcoal hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
