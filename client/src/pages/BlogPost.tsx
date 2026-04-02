/**
 * Blog Post Detail Page - CRT Terminal Style
 * Design: Long-form article with terminal aesthetics, TOC sidebar, and structured data
 * SEO: Full article schema, breadcrumbs, internal links
 */

import { useEffect, useMemo } from "react";
import { Link, useParams } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { getArticleBySlug, getAllArticles } from "@/lib/blog-data";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ArticleSchema from "@/components/ArticleSchema";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const article = getArticleBySlug(params.slug || "");
  const allArticles = getAllArticles();

  const content = useMemo(() => {
    if (!article) return null;
    return article.content[locale as keyof typeof article.content];
  }, [article, locale]);

  // Related articles (exclude current)
  const relatedArticles = useMemo(() => {
    return allArticles.filter((a) => a.slug !== params.slug).slice(0, 3);
  }, [allArticles, params.slug]);

  useEffect(() => {
    if (content) {
      document.title = content.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", content.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [content, locale]);

  if (!article || !content) {
    return (
      <div className="min-h-screen relative">
        <div className="crt-scanlines" />
        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-crt-green transition-colors uppercase tracking-wider"
            >
              {t("blog.backToBlog")}
            </Link>
            <LanguageSwitcher />
          </div>
          <div className="border border-border bg-card p-8 text-center">
            <p className="text-crt-red text-sm">ERROR: Article not found</p>
            <p className="text-xs text-muted-foreground mt-2">
              The requested post does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="crt-scanlines" />

      {/* JSON-LD Article Schema */}
      {content && (
        <ArticleSchema article={article} content={content} locale={locale} />
      )}

      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              className="text-muted-foreground hover:text-crt-green transition-colors uppercase tracking-wider"
            >
              {t("blog.backToChecker")}
            </Link>
            <span className="text-border">/</span>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-crt-green transition-colors uppercase tracking-wider"
            >
              {t("blog.backToBlog")}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-crt-green/20 text-crt-green/70"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold glow-text mb-4 leading-tight">
              {content.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground/60 uppercase tracking-wider">
              <span>
                {t("blog.publishedOn")} {article.publishedAt}
              </span>
              {article.updatedAt && (
                <span>
                  {t("blog.updatedOn")} {article.updatedAt}
                </span>
              )}
              <span>
                {article.readingTime} {t("blog.readingTime")}
              </span>
            </div>
          </header>

          {/* Table of Contents */}
          <nav className="mb-8 border border-border bg-card p-4">
            <h2 className="text-xs font-bold text-crt-green uppercase tracking-widest mb-3">
              {t("blog.tableOfContents")}
            </h2>
            <ol className="space-y-1.5">
              {content.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-xs text-muted-foreground hover:text-crt-green transition-colors flex items-start gap-2"
                  >
                    <span className="text-crt-green/40 shrink-0">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Article Body */}
          <div className="space-y-8 mb-12">
            {content.sections.map((section, i) => (
              <section key={i} id={`section-${i}`} className="scroll-mt-8">
                <h2 className="text-base sm:text-lg font-bold text-crt-amber mb-4 flex items-start gap-2">
                  <span className="text-crt-green/30 text-sm shrink-0">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  {section.heading}
                </h2>
                <div
                  className="blog-content text-sm text-muted-foreground leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </section>
            ))}
          </div>
        </article>

        {/* CTA */}
        <div className="border border-crt-green/20 bg-crt-green/5 p-6 text-center mb-8">
          <p className="text-sm text-muted-foreground mb-4">
            {t("blog.tryChecker")}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-crt-green/10 border border-crt-green/40 text-crt-green text-sm font-semibold uppercase tracking-wider hover:bg-crt-green/20 hover:border-crt-green/60 transition-all"
          >
            {t("blog.tryCheckerBtn")}
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-bold text-crt-green uppercase tracking-widest mb-4">
              {t("blog.relatedArticles")}
            </h2>
            <div className="space-y-3">
              {relatedArticles.map((ra) => {
                const raContent =
                  ra.content[locale as keyof typeof ra.content];
                return (
                  <Link
                    key={ra.slug}
                    href={`/blog/${ra.slug}`}
                    className="block border border-border/30 bg-card/50 p-4 hover:border-crt-green/30 transition-colors group"
                  >
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-crt-green transition-colors">
                      {raContent.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {raContent.excerpt}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-border/30 pt-6 pb-8 text-center text-xs text-muted-foreground space-y-2">
          <p>{t("footer.line1")}</p>
          <p>{t("footer.line2")}</p>
          <p className="text-crt-green/40">{"> "}EOF</p>
        </footer>
      </div>
    </div>
  );
}
