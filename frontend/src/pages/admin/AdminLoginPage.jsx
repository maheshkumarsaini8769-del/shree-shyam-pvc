import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSwitchAccount = () => {
    localStorage.removeItem('sspi_token');
    localStorage.removeItem('sspi_user');
    if (logout) logout();
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Clear any old session before authenticating
      localStorage.removeItem('sspi_token');
      localStorage.removeItem('sspi_user');

      // 2. Authenticate credentials against backend MongoDB
      const data = await api.login({ identifier: email.trim(), password });
      
      if (!data.user || (data.user.role !== 'admin' && data.user.role !== 'superadmin')) {
        localStorage.removeItem('sspi_token');
        localStorage.removeItem('sspi_user');
        if (logout) logout();
        setError('Yeh account admin panel ke liye authorized nahi hai. Kripya authorized admin email use karein.');
        setLoading(false);
        return;
      }

      // 3. Save new valid token and user
      localStorage.setItem('sspi_token', data.token);
      localStorage.setItem('sspi_user', JSON.stringify(data.user));
      if (login) {
        await login(data.user, data.token);
      }
      
      navigate('/admin', { replace: true });
    } catch (err) {
      // Ensure bad login never preserves old token
      localStorage.removeItem('sspi_token');
      localStorage.removeItem('sspi_user');
      if (logout) logout();
      setError(err.message || 'Login failed. Kripya apna authorized email aur password check karein.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4 selection:bg-luxury-gold selection:text-obsidian">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(197,160,89,0.08),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to website */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </button>

          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Authority Whitelist Active</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#121824] border border-white/10 rounded-2xl p-7 sm:p-8 shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-luxury-gold/70 shadow-2xl shadow-luxury-gold/20 hover:scale-105 transition-transform duration-300">
              <img src={logoImg} alt="Shree Shyam PVC Interior Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
              Shree Shyam PVC Admin
            </h1>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
              Authorized Management Portal & CMS Control Center
            </p>
          </div>

          {user && (user.role === 'admin' || user.role === 'superadmin') && (
            <div className="mb-5 p-3.5 rounded-xl bg-amber-500/10 border border-luxury-gold/40 text-stone-200 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pehle se logged in hain: <strong className="text-luxury-gold">{user.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="px-3 py-1.5 rounded-lg bg-luxury-gold hover:bg-luxury-goldDark text-obsidian font-bold text-xs shadow-sm transition-all"
                >
                  Dashboard Kholein →
                </button>
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-300 font-semibold text-xs transition-all"
                >
                  Logout / Doosra Account Check Karein
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs font-medium flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-300">
                  Authorized Admin Email or Phone
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('maheshkumarsaini8769@gmail.com');
                    setPassword('mahesh99830');
                  }}
                  className="text-[10px] text-luxury-gold hover:underline font-mono"
                >
                  ⚡ Autofill Superadmin
                </button>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder="maheshkumarsaini8769@gmail.com or 8209836370"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A2232] border border-white/10 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/60 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-300 block mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder="Enter your assigned password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#1A2232] border border-white/10 text-white placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/60 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-goldDark text-obsidian text-xs sm:text-sm font-black transition-all active:scale-[0.98] shadow-lg shadow-luxury-gold/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating with MongoDB...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Secure Admin Login</span>
                </>
              )}
            </button>
          </form>

          {/* System Security Notice */}
          <div className="mt-6 pt-5 border-t border-white/5 text-[11px] text-stone-400 leading-relaxed text-center">
            <p className="flex items-center justify-center gap-1 text-stone-300 mb-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Role-Based Email Whitelist Protected
            </p>
            <p className="text-stone-500">
              Only emails approved by the superadmin can access this system. To request access, contact the owner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLoginPage;
