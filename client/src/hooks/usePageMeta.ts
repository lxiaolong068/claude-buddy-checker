import { useEffect } from "react";

const LOCALES = ["en", "zh", "ko", "ja", "x-default"] as const;

interface PageMetaInput {
  url: string;
  title: string;
  description: string;
}

// Sets per-route title, description, canonical, hreflang alternates, and the
// OG/Twitter pair captured by the prerender snapshot. Replaces useHreflangLinks
// plus the ad-hoc document.title / setAttribute blocks scattered across pages.
export function usePageMeta({ url, title, description }: PageMetaInput) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);

    document
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((el) => el.remove());
    for (const loc of LOCALES) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.setAttribute("hreflang", loc);
      link.href = url;
      document.head.appendChild(link);
    }

    return () => {
      document
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((el) => el.remove());
    };
  }, [url, title, description]);
}
