import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F141E] flex items-center justify-center text-luxury-gold">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-stone-400">Verifying Admin Authority...</p>
        </div>
      </div>
    );
  }

  const token = localStorage.getItem('sspi_token');
  const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

  if (!token || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};
export default AdminRoute;
