import { useCallback } from "react";
import { useI18n } from "@/contexts/I18nContext";

const LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ko: "ko-KR",
};

/**
 * Returns a date formatter that respects the current app locale.
 * Centralizes the locale → BCP47 tag mapping for all components.
 */
export function useLocalizedDate() {
  const { locale } = useI18n();
  const bcp47 = LOCALE_MAP[locale] ?? "en-US";

  return useCallback(
    (date: Date | number | null, options?: Intl.DateTimeFormatOptions) => {
      if (date === null) return "—";
      return new Date(date).toLocaleDateString(bcp47, options);
    },
    [bcp47]
  );
}
