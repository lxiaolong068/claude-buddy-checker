/**
 * SpeciesListSchema — JSON-LD for the /species index page.
 * Emits CollectionPage + ItemList + BreadcrumbList so Google can surface
 * the 18-species catalog as a rich list result for "claude buddy list /
 * types / all" intent.
 */

import { useMemo } from "react";
import { ALL_SPECIES_SLUGS } from "@/lib/species-data";
import { SITE_URL } from "@/lib/constants";
import { useI18n } from "@/contexts/I18nContext";

const LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ko: "ko-KR",
  ja: "ja-JP",
};

const SITE_NAME_MAP: Record<string, string> = {
  en: "Claude Buddy Checker",
  zh: "Claude Buddy 查询器",
  ko: "Claude Buddy 체커",
  ja: "Claude Buddy チェッカー",
};

interface SpeciesListSchemaProps {
  pageName: string;
  pageDescription: string;
  baseUrl?: string;
}

export default function SpeciesListSchema({
  pageName,
  pageDescription,
  baseUrl = SITE_URL,
}: SpeciesListSchemaProps) {
  const { t, locale } = useI18n();

  const schemas = useMemo(() => {
    const pageUrl = `${baseUrl}/species`;
    const inLanguage = LOCALE_MAP[locale] || "en-US";
    const siteName = SITE_NAME_MAP[locale] || "Claude Buddy Checker";

    const itemListId = `${pageUrl}#itemlist`;

    const collectionPage = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      name: pageName,
      description: pageDescription,
      url: pageUrl,
      inLanguage,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        name: siteName,
        url: baseUrl,
      },
      mainEntity: { "@id": itemListId },
    };

    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": itemListId,
      name: pageName,
      description: pageDescription,
      url: pageUrl,
      numberOfItems: ALL_SPECIES_SLUGS.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: ALL_SPECIES_SLUGS.map((slug, i) => {
        const speciesUrl = `${baseUrl}/species/${slug}`;
        const name = t(`speciesDetail.speciesNames.${slug}`);
        return {
          "@type": "ListItem",
          position: i + 1,
          url: speciesUrl,
          name,
        };
      }),
    };

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: baseUrl },
        { "@type": "ListItem", position: 2, name: pageName, item: pageUrl },
      ],
    };

    return [collectionPage, itemList, breadcrumb];
  }, [pageName, pageDescription, locale, t, baseUrl]);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
