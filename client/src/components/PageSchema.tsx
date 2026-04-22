/**
 * PageSchema — emits WebPage + BreadcrumbList JSON-LD for list/tool pages
 * that don't fit specialized schemas (Article, FAQPage, WebApplication).
 * Breadcrumb chain starts at SITE_URL and ends at the current page URL.
 */

import { useI18n } from "@/contexts/I18nContext";
import { SITE_URL } from "@/lib/constants";

interface Crumb {
  name: string;
  path: string; // absolute path starting with /, or empty for site root
}

interface PageSchemaProps {
  pageUrl: string;
  name: string;
  description: string;
  breadcrumbs: Crumb[];
}

const LANG_MAP: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ko: "ko-KR",
  ja: "ja-JP",
};

export default function PageSchema({
  pageUrl,
  name,
  description,
  breadcrumbs,
}: PageSchemaProps) {
  const { locale } = useI18n();
  const inLanguage = LANG_MAP[locale] || "en-US";

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: pageUrl,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: "claudebuddy.art",
    },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path ? `${SITE_URL}${c.path}` : SITE_URL,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
}
