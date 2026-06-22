import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { en } from './locales/en';
import { uk } from './locales/uk';
import type { Locale } from './config/site';

const dictionaries = { uk, en };
type Dictionary = typeof uk;
type I18nValue = { locale: Locale; t: Dictionary; toggleLocale: () => void };
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('locale') as Locale) || 'uk');
  const value = useMemo(() => ({ locale, t: dictionaries[locale], toggleLocale: () => setLocale((current) => { const next = current === 'uk' ? 'en' : 'uk'; localStorage.setItem('locale', next); document.documentElement.lang = next; return next; }) }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
};
