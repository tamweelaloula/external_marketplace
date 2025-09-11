'use client';
import { createContext, useCallback, useContext, useState, ReactNode } from 'react';

import ar from '@/i18n/ar';
import en from '@/i18n/en';

const locales = { ar, en };

export type LanguageCode = 'en' | 'ar';

export interface Language {
  dir: 'ltr' | 'rtl';
  name: string;
  code: LanguageCode;
  shortname: string;
}

export const LANGUAGES: Record<LanguageCode, Language> = {
  en: {
    dir: 'ltr',
    name: 'English',
    code: 'en',
    shortname: 'EN',
  },
  ar: {
    dir: 'rtl',
    name: 'العربية',
    code: 'ar',
    shortname: 'AR',
  },
};

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const resolvePath = (bucket: Record<string, any>, path: string): any =>
  path.split('.').reduce((obj, key) => obj?.[key], bucket);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationContextProvider = ({ children }: TranslationProviderProps) => {
  const [language, setLanguage] = useState<Language>(LANGUAGES.en);

  const translate = useCallback((key: string): string => {
    try {
      return resolvePath(locales[language.code], key) || key;
    } catch {
      return key;
    }
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within a <TranslationContextProvider>.');
  }

  return context;
};
