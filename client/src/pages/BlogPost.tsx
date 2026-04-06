/**
 * Blog Post Detail Page - CRT Terminal Style
 * Design: Long-form article with terminal aesthetics, TOC sidebar, and structured data
 * SEO: Full article schema, breadcrumbs, internal links
 */

import { useEffect, useMemo } from "react";
import { Link, useParams } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { getArticleBySlug, getAllArticles, getAdjacentArticles } from "@/lib/blog-data";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import ArticleSchema from "@/components/ArticleSchema";
import ScrollToTop from "@/components/ScrollToTop";
import GiscusComments from "@/components/GiscusComments";
import ReadingProgress from "@/components/ReadingProgress";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const article = getArticleBySlug(params.slug || "");
  const allArticles = getAllArticles();

  const content = useMemo(() => {
    if (!article) return null;
    return article.content[locale as keyof typeof article.content];
  }, [article, locale]);


  // Inject copy buttons into <pre> blocks after content renders
  useEffect(() => {
    const pres = document.querySelectorAll<HTMLElement>(".blog-content pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "COPY";
      btn.setAttribute("aria-label", "Copy code");
      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        const text = (code?.textContent ?? pre.textContent ?? "").trim();
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "COPIED!";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "COPY";
            btn.classList.remove("copied");
          }, 2000);
        } catch {
          btn.textContent = "ERR";
          setTimeout(() => { btn.textContent = "COPY"; }, 2000);
        }
      });
      pre.appendChild(btn);
    });
    return () => {
      document.querySelectorAll(".blog-content pre .copy-btn").forEach((btn) => btn.remove());
    };
  }, [content]);

  // Related articles (exclude current)
  const relatedArticles = useMemo(() => {
    return allArticles.filter((a) => a.slug !== params.slug).slice(0, 3);
  }, [allArticles, params.slug]);

  // Adjacent articles for series navigation
  const { prev: prevArticle, next: nextArticle } = useMemo(
    () => getAdjacentArticles(params.slug || ""),
    [params.slug]
  );

  useEffect(() => {
    if (content) {
      const slug = params.slug || "";
      const url = `https://claudebuddy.art/blog/${slug}`;

      document.title = content.metaTitle;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", content.metaDescription);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", content.metaTitle);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", content.metaDescription);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", url);

      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute("content", content.metaTitle);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", content.metaDescription);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", url);

      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      for (const loc of ["en", "zh", "ko", "x-default"]) {
        const link = document.createElement("link");
        link.rel = "alternate";
        link.setAttribute("hreflang", loc);
        link.href = url;
        document.head.appendChild(link);
      }
    }
    window.scrollTo(0, 0);

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [content, locale, params.slug]);

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
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
          <div className="border border-border bg-card p-8 text-center">
            <p className="text-crt-red text-sm">{t("blog.errorNotFound")}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {t("blog.errorNotFoundDesc")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Reading progress bar */}
      <ReadingProgress />

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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
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

        {/* Series Navigation */}
        {(prevArticle || nextArticle) && (
          <nav className="mb-8" aria-label="series navigation">
            <h2 className="text-xs font-bold text-crt-green uppercase tracking-widest mb-3">
              {t("blog.seriesNav")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Prev */}
              <div>
                {prevArticle ? (
                  <Link
                    href={`/blog/${prevArticle.slug}`}
                    className="flex flex-col gap-1 border border-border/40 bg-card/50 p-4 hover:border-crt-green/40 hover:bg-crt-green/5 transition-colors group h-full"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-crt-green/50 group-hover:text-crt-green/80 transition-colors">
                      {t("blog.prevArticle")}
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-crt-green transition-colors line-clamp-2 leading-snug">
                      {prevArticle.content[locale as keyof typeof prevArticle.content].title}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60 mt-auto pt-1">
                      {prevArticle.publishedAt}
                    </span>
                  </Link>
                ) : (
                  <div className="border border-border/20 bg-card/20 p-4 h-full flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest">
                      — {t("blog.prevArticle")} —
                    </span>
                  </div>
                )}
              </div>

              {/* Next */}
              <div>
                {nextArticle ? (
                  <Link
                    href={`/blog/${nextArticle.slug}`}
                    className="flex flex-col gap-1 border border-border/40 bg-card/50 p-4 hover:border-crt-green/40 hover:bg-crt-green/5 transition-colors group h-full sm:items-end sm:text-right"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-crt-green/50 group-hover:text-crt-green/80 transition-colors">
                      {t("blog.nextArticle")}
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-crt-green transition-colors line-clamp-2 leading-snug">
                      {nextArticle.content[locale as keyof typeof nextArticle.content].title}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60 mt-auto pt-1">
                      {nextArticle.publishedAt}
                    </span>
                  </Link>
                ) : (
                  <div className="border border-border/20 bg-card/20 p-4 h-full flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground/30 uppercase tracking-widest">
                      — {t("blog.nextArticle")} —
                    </span>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}

        {/* Comments */}
        <GiscusComments slug={params.slug || ""} />

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

      {/* Back to Top */}
      <ScrollToTop />
    </div>
  );
}
