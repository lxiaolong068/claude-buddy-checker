/**
 * BlogListSchema - JSON-LD Structured Data for the Blog Index Page
 * Design: Generates Blog + ItemList schema for /blog listing
 * SEO: Helps search engines understand blog collection and article relationships
 */

import { useMemo } from "react";
import type { BlogArticle } from "@/lib/blog-data";

interface BlogListSchemaProps {
  articles: BlogArticle[];
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

const BLOG_DESC_MAP: Record<string, string> = {
  en: "Articles about Claude Code Buddy — species, algorithms, cosmetics, and tips.",
  zh: "关于 Claude Code Buddy 的文章——物种、算法、外观与技巧。",
  ko: "Claude Code Buddy에 관한 글 — 종족, 알고리즘, 외형, 팁.",
};

export default function BlogListSchema({
  articles,
  locale,
  baseUrl = "https://claudebuddy.art",
}: BlogListSchemaProps) {
  const schemas = useMemo(() => {
    const blogUrl = `${baseUrl}/blog`;
    const inLanguage = LOCALE_MAP[locale] || "en-US";
    const siteName = SITE_NAME_MAP[locale] || "Claude Buddy Checker";
    const blogDesc = BLOG_DESC_MAP[locale] || BLOG_DESC_MAP.en;

    // 1. Blog schema with blogPost array
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${blogUrl}#blog`,
      name: `${siteName} Blog`,
      description: blogDesc,
      url: blogUrl,
      inLanguage,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        name: siteName,
        url: baseUrl,
      },
      blogPost: articles.map((article) => {
        const c = article.content[locale as keyof typeof article.content];
        const imageUrl = article.coverImage || `${baseUrl}/og-image.png`;
        return {
          "@type": "BlogPosting",
          "@id": `${baseUrl}/blog/${article.slug}#article`,
          headline: c.title,
          description: c.excerpt,
          url: `${baseUrl}/blog/${article.slug}`,
          datePublished: `${article.publishedAt}T00:00:00+00:00`,
          dateModified: article.updatedAt
            ? `${article.updatedAt}T00:00:00+00:00`
            : `${article.publishedAt}T00:00:00+00:00`,
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
          },
          keywords: article.tags.join(", "),
          timeRequired: `PT${article.readingTime}M`,
        };
      }),
    };

    // 2. BreadcrumbList for /blog
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${blogUrl}#breadcrumb`,
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
          item: blogUrl,
        },
      ],
    };

    return [blogSchema, breadcrumbSchema];
  }, [articles, locale, baseUrl]);

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
