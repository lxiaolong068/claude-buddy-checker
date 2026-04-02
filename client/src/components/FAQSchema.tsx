/**
 * FAQSchema Component
 * Generates JSON-LD FAQPage structured data for species detail pages
 * Helps Google display FAQ rich snippets in search results
 * 
 * Design: CRT Terminal / Retro Phosphor Green
 */

import { useI18n } from "@/contexts/I18nContext";
import type { FAQ } from "@/lib/species-faq";

interface FAQSchemaProps {
  faqs: FAQ[];
  pageUrl: string;
  speciesName: string;
}

export default function FAQSchema({ faqs, pageUrl, speciesName }: FAQSchemaProps) {
  const { locale } = useI18n();

  const langMap: Record<string, string> = {
    en: "en-US",
    zh: "zh-CN",
    ko: "ko-KR",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
    "inLanguage": langMap[locale] || "en-US",
    "url": pageUrl,
    "name": `${speciesName} - Frequently Asked Questions`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
