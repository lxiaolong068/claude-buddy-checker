import { useEffect } from "react";

const LOCALES = ["en", "zh", "ko", "ja", "x-default"] as const;

export function useHreflangLinks(url: string) {
  useEffect(() => {
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
