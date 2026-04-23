/**
 * ArticleSchema - JSON-LD Structured Data for Blog Articles
 * Design: Generates Article schema markup for Google Rich Snippets
 * Supports: Article, BreadcrumbList, WebSite, and FAQPage schemas
 * SEO: Helps search engines understand article content, authorship, and navigation
 */

import { useMemo } from "react";
import type { BlogArticle, ArticleContent } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/constants";

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

// Matches headings that indicate a FAQ section in any supported locale.
const FAQ_HEADING_RE =
  /(frequently\s+asked\s+questions|^faq$|常见问题|자주\s*묻는\s*질문|よくある質問)/i;

// Extracts Q/A pairs from a FAQ section body where each question is an <h4>
// followed by answer content (one or more <p>/<ul>/<pre> blocks) up to the
// next <h4>. Answers are stripped to plain text for Google FAQ compliance.
function extractFaqs(body: string): Array<{ q: string; a: string }> {
  // Heading and answer may both contain inline tags (e.g. <code>/clear</code>).
  // Match lazily so the first </h4> closes the question, then strip inline
  // HTML from both sides for a clean plain-text pair.
  const pattern = /<h4[^>]*>([\s\S]+?)<\/h4>\s*([\s\S]*?)(?=<h4[^>]*>|$)/g;
  const faqs: Array<{ q: string; a: string }> = [];
  let match;
  while ((match = pattern.exec(body)) !== null) {
    const q = match[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const a = match[2]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

export default function ArticleSchema({
  article,
  content,
  locale,
  baseUrl = SITE_URL,
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

    // 4. FAQPage Schema — only if article has a FAQ section with Q/A pairs
    const faqSection = content.sections.find((s) =>
      FAQ_HEADING_RE.test(s.heading)
    );
    const faqs = faqSection ? extractFaqs(faqSection.body) : [];
    const faqSchema =
      faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${articleUrl}#faq`,
            url: articleUrl,
            inLanguage,
            mainEntity: faqs.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: {
                "@type": "Answer",
                text: a,
              },
            })),
          }
        : null;

    const out: unknown[] = [articleSchema, breadcrumbSchema, webPageSchema];
    if (faqSchema) out.push(faqSchema);
    return out;
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
