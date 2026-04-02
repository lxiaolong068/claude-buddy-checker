/**
 * I18n Context - Lightweight internationalization for Claude Buddy Checker
 * Supports: en (English), zh (简体中文), ko (한국어)
 * Uses React Context + localStorage persistence
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { en } from "@/i18n/en";
import { zh } from "@/i18n/zh";
import { ko } from "@/i18n/ko";

export type Locale = "en" | "zh" | "ko";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  ko: "한국어",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "EN",
  zh: "中",
  ko: "한",
};

// Flat translation dictionary type
export type TranslationDict = typeof en;

const dictionaries: Record<Locale, TranslationDict> = { en, zh, ko };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dict: TranslationDict;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return path;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

function detectLocale(): Locale {
  // Check localStorage
  const stored = localStorage.getItem("buddy-locale");
  if (stored && (stored === "en" || stored === "zh" || stored === "ko")) {
    return stored as Locale;
  }
  // Check browser language
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ko")) return "ko";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("buddy-locale", newLocale);
    document.documentElement.lang = newLocale === "zh" ? "zh-CN" : newLocale;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
  }, [locale]);

  const dict = dictionaries[locale];

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(dict as unknown as Record<string, unknown>, key);
    },
    [dict]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
