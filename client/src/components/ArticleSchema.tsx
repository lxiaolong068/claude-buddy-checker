/**
 * ArticleSchema - JSON-LD Structured Data for Blog Articles
 * Design: Generates Article schema markup for Google Rich Snippets
 * Supports: Article, BreadcrumbList, WebSite, and FAQPage schemas
 * SEO: Helps search engines understand article content, authorship, and navigation
 */

import { useMemo } from "react";
import type { BlogArticle, ArticleContent } from "@/lib/blog-data";

interface ArticleSchemaProps {
  article: BlogArticle;
  content: ArticleContent;
  locale: string;
  baseUrl?: string;
}

const LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ko: "ko-KR",
};

const SITE_NAME_MAP: Record<string, string> = {
  en: "Claude Buddy Checker",
  zh: "Claude Buddy 查询器",
  ko: "Claude Buddy 체커",
};

export default function ArticleSchema({
  article,
  content,
  locale,
  baseUrl = "https://www.claudebuddy.art",
}: ArticleSchemaProps) {
  const schemas = useMemo(() => {
    const articleUrl = `${baseUrl}/blog/${article.slug}`;
    const inLanguage = LOCALE_MAP[locale] || "en-US";
    const siteName = SITE_NAME_MAP[locale] || "Claude Buddy Checker";

    // Extract plain text from first section for description
    const wordCount = content.sections.reduce((acc, section) => {
      const text = section.body.replace(/<[^>]*>/g, "");
      return acc + text.split(/\s+/).length;
    }, 0);

    // Extract headings for article sections
    const articleSections = content.sections.map((section, i) => ({
      "@type": "WebPageElement" as const,
      name: section.heading,
      url: `${articleUrl}#section-${i}`,
    }));

    const imageUrl = article.coverImage || `${baseUrl}/og-image.png`;

    // 1. Main BlogPosting Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${articleUrl}#article`,
      headline: content.title,
      description: content.metaDescription,
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
      thumbnailUrl: imageUrl,
      datePublished: `${article.publishedAt}T00:00:00+00:00`,
      dateModified: article.updatedAt
        ? `${article.updatedAt}T00:00:00+00:00`
        : `${article.publishedAt}T00:00:00+00:00`,
      author: {
        "@type": "Organization",
        name: "Claude Buddy Checker",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Claude Buddy Checker",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon.ico`,
          width: 48,
          height: 48,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      wordCount,
      timeRequired: `PT${article.readingTime}M`,
      inLanguage,
      articleSection: article.tags[0] ?? "Guide",
      keywords: article.tags.join(", "),
      about: article.tags.map((tag) => ({
        "@type": "Thing",
        name: tag,
      })),
      isPartOf: {
        "@type": "Blog",
        "@id": `${baseUrl}/blog#blog`,
        name: `${siteName} Blog`,
        url: `${baseUrl}/blog`,
      },
      hasPart: articleSections,
    };

    // 2. BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${articleUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: siteName,
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: content.title,
          item: articleUrl,
        },
      ],
    };

    // 3. WebPage Schema with speakable
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": articleUrl,
      url: articleUrl,
      name: content.metaTitle,
      description: content.metaDescription,
      inLanguage,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        name: siteName,
        url: baseUrl,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: article.coverImage || `${baseUrl}/og-image.png`,
      },
      breadcrumb: {
        "@id": `${articleUrl}#breadcrumb`,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["article h1", "article header"],
      },
    };

    return [articleSchema, breadcrumbSchema, webPageSchema];
  }, [article, content, locale, baseUrl]);

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
