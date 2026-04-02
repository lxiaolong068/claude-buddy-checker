/**
 * WebAppSchema - JSON-LD Structured Data for Home Page
 * Generates WebApplication + FAQPage + WebSite schemas
 * to help Google display rich snippets for the Buddy Checker tool
 */

import { useI18n } from "@/contexts/I18nContext";

const LANG_MAP: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ko: "ko-KR",
};

export default function WebAppSchema() {
  const { t, dict, locale } = useI18n();
  const inLanguage = LANG_MAP[locale] || "en-US";
  const siteUrl = "https://claudebuddy.art";

  // WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("meta.title"),
    url: siteUrl,
    description: t("meta.description"),
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage,
    availableLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Chinese", alternateName: "zh" },
      { "@type": "Language", name: "Korean", alternateName: "ko" },
    ],
    featureList: [
      "UUID-based buddy generation",
      "18 species identification",
      "5 rarity tiers analysis",
      "ASCII sprite preview",
      "Stat distribution calculation",
      "Social share card generation",
    ],
    screenshot: "https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/hero-crt-terminal-5fvRpoNY7GsFPkvdJ2QQKy.webp",
    author: {
      "@type": "Organization",
      name: "Claude Buddy Checker",
      url: siteUrl,
    },
    datePublished: "2026-04-01",
    dateModified: "2026-04-02",
    softwareVersion: "1.0.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // WebSite Schema with SearchAction
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Claude Buddy Checker",
    alternateName: ["Claude Buddy", "Buddy Checker", "Claude Code Buddy Checker"],
    url: siteUrl,
    description: t("meta.description"),
    inLanguage,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?uuid={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // FAQPage Schema from homepage FAQ items
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    inLanguage,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
