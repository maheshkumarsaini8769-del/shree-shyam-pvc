import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { BUSINESS_INFO } from '../data/businessInfo';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(BUSINESS_INFO);
  const [loading, setLoading] = useState(true);

  const refreshSettings = () => {
    return api.getSettings()
      .then(data => {
        if (data && data.businessName) {
          setSettings(prev => ({
            ...prev,
            ...data,
            name: data.businessName || prev.name,
            profileBrand: data.profileBrand || prev.profileBrand,
            address: data.address || prev.address,
            phone1: data.primaryPhone || prev.phone1,
            phone2: data.secondaryPhone || prev.phone2,
            whatsappNumber: (data.whatsappNumber || prev.whatsappNumber).replace(/[^0-9]/g, '')
          }));
        }
      })
      .catch(err => {
        console.warn('Could not fetch remote settings, using default business card constants', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
