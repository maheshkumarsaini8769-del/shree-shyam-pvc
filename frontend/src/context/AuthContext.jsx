import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sspi_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sspi_token');
    if (token) {
      api.getMe()
        .then(res => {
          setUser(res.user);
          localStorage.setItem('sspi_user', JSON.stringify(res.user));
        })
        .catch(() => {
          localStorage.removeItem('sspi_token');
          localStorage.removeItem('sspi_user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (identifierOrUser, passwordOrToken) => {
    if (typeof identifierOrUser === 'object' && identifierOrUser !== null) {
      if (passwordOrToken) localStorage.setItem('sspi_token', passwordOrToken);
      localStorage.setItem('sspi_user', JSON.stringify(identifierOrUser));
      setUser(identifierOrUser);
      return identifierOrUser;
    }
    const data = await api.login({ identifier: identifierOrUser, password: passwordOrToken });
    localStorage.setItem('sspi_token', data.token);
    localStorage.setItem('sspi_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async (userData) => {
    const data = await api.register(userData);
    localStorage.setItem('sspi_token', data.token);
    localStorage.setItem('sspi_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('sspi_token');
    localStorage.removeItem('sspi_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' || user?.role === 'superadmin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
