'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import esMessages from '@/locales/es.json';
import enMessages from '@/locales/en.json';

type Locale = 'es' | 'en';

interface Messages {
  navbar: {
    company: string;
    scheduleConsultation: string;
  };
  hero: {
    title: string;
    titleHighlight: string;
    description: string;
    exploreButton: string;
    demoButton: string;
  };
  framework: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaButton: string;
    panelBrand: string;
    panelTitle: string;
    layers: {
      semantic: {
        title: string;
        features: string[];
      };
      kinetic: {
        title: string;
        features: string[];
      };
      dynamic: {
        title: string;
        features: string[];
      };
    };
  };
  services: {
    title: string;
    subtitle: string;
    aiDecisions: {
      title: string;
      description: string;
    };
    automation: {
      title: string;
      description: string;
    };
    predictive: {
      title: string;
      description: string;
    };
    learnMore: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    company: string;
    rights: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
}

interface LanguageContextType {
  locale: Locale;
  messages: Messages;
  changeLocale: (newLocale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messagesMap: Record<Locale, Messages> = {
  es: esMessages as Messages,
  en: enMessages as Messages,
};

const STORAGE_KEY = 'panda-locale';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es');
  const [messages, setMessages] = useState<Messages>(messagesMap.es);
  const [isClient, setIsClient] = useState(false);

  // Load locale from localStorage on mount (client-side only)
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale;
      if (savedLocale && (savedLocale === 'es' || savedLocale === 'en')) {
        setLocale(savedLocale);
        setMessages(messagesMap[savedLocale]);
      }
    }
  }, []);

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    setMessages(messagesMap[newLocale]);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, messages, changeLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}