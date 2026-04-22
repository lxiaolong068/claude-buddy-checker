import { useEffect } from "react";

const LOCALES = ["en", "zh", "ko", "ja", "x-default"] as const;

// Sets canonical + hreflang alternates for the current route.
// Without canonical override, non-prerendered routes inherit the shell's
// root-pointing canonical, causing Google to merge them into the homepage.
export function useHreflangLinks(url: string) {
  useEffect(() => {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    for (const loc of LOCALES) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.setAttribute("hreflang", loc);
      link.href = url;
      document.head.appendChild(link);
    }
    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [url]);
}
