/**
 * LanguageSwitcher - CRT-styled language selector
 * Design: Terminal dropdown with phosphor glow
 */

import { useState, useRef, useEffect } from "react";
import { useI18n, LOCALE_LABELS, LOCALE_FLAGS, type Locale } from "@/contexts/I18nContext";

const LOCALES: Locale[] = ["en", "zh", "ko", "ja"];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs uppercase tracking-wider text-muted-foreground hover:text-crt-green hover:border-crt-green/40 transition-all"
        aria-label="Switch language"
      >
        <span className="text-crt-green font-semibold">{LOCALE_FLAGS[locale]}</span>
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 border border-border bg-card shadow-lg min-w-[140px]">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                l === locale
                  ? "text-crt-green bg-secondary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
              }`}
            >
              <span className="font-semibold w-5">{LOCALE_FLAGS[l]}</span>
              <span>{LOCALE_LABELS[l]}</span>
              {l === locale && <span className="ml-auto text-crt-green">*</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
