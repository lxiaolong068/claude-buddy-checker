/**
 * GA4 event helper — thin wrapper around window.gtag.
 *
 * No-ops when gtag is missing (Vite dev, prerender static server, Vercel
 * preview URLs — see client/index.html hostname guard). Safe to call from
 * anywhere; never throws.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", name, params || {});
  } catch {
    // Swallow — analytics must never break the app.
  }
}
