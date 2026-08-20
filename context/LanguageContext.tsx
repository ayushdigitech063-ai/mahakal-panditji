'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import hiDict from '@/locales/hi.json';
import enDict from '@/locales/en.json';

export type Language = 'hi' | 'en' | 'mr' | 'gu';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', label: 'English', flag: '🇬🇧' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', label: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', label: 'ગુજરાતી', flag: '🇮🇳' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => string;
}

const localeDictionaries: Record<Language, any> = {
  hi: hiDict,
  en: enDict,
  mr: hiDict, // Fallback to Hindi for Marathi
  gu: hiDict, // Fallback to Hindi for Gujarati
};

// Flatten helper for simple key lookup or dot notation (e.g. t('nav.home') or t('home'))
function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj) return undefined;
  
  // Try direct key first
  if (obj[path] && typeof obj[path] === 'string') return obj[path];
  
  // Try dot notation
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('hi');

  useEffect(() => {
    const savedLang = localStorage.getItem('mahakal_lang') as Language;
    if (savedLang && ['hi', 'en', 'mr', 'gu'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      setLanguageState('hi'); // Default Hindi
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mahakal_lang', lang);
  };

  const t = (keyPath: string): string => {
    const dict = localeDictionaries[language] || localeDictionaries['hi'];
    const val = getNestedValue(dict, keyPath);
    if (val) return val;

    // Fallback to English dictionary
    const fallbackVal = getNestedValue(localeDictionaries['en'], keyPath);
    if (fallbackVal) return fallbackVal;

    return keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
