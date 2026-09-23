import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = () => {
  const [identifier, setIdentifier] = useState('admin@shreeshyam.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setErrorMsg('Please enter both identifier and password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const user = await login(identifier, password);
      if (user.role !== 'admin') {
        throw new Error('Access denied. Administrator privileges required.');
      }
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal p-4">
      <div className="max-w-md w-full bg-[#252523] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6 text-white">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-red text-white flex items-center justify-center font-bold text-xl mx-auto shadow-soft">
            SS
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Admin Management Portal
          </h1>
          <p className="text-xs text-white/60">
            Shree Shyam PVC Interior • Secure Administration
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-900/40 text-red-200 border border-red-500/40 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Admin Email or Mobile
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-redHover disabled:opacity-50 transition-colors shadow-soft"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-white/50 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
          <span>Protected route with JWT authentication & role-based authorization.</span>
        </div>
      </div>
    </div>
  );
};
