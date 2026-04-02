/**
 * Blog Index Page - CRT Terminal Style
 * Design: Grid of article cards with terminal aesthetics
 * SEO: Optimized for blog listing with structured data
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { getAllArticles, type BlogArticle } from "@/lib/blog-data";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function ArticleCard({ article }: { article: BlogArticle }) {
  const { t, locale } = useI18n();
  const content = article.content[locale as keyof typeof article.content];

  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="border border-border bg-card hover:border-crt-green/40 transition-all group cursor-pointer">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
          <span className="w-2 h-2 rounded-full bg-crt-red" />
          <span className="w-2 h-2 rounded-full bg-crt-amber" />
          <span className="w-2 h-2 rounded-full bg-crt-green" />
          <span className="ml-2 text-[10px] text-muted-foreground uppercase tracking-widest">
            {article.slug}.md
          </span>
        </div>

        <div className="p-4 sm:p-5">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
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
          <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-crt-green transition-colors mb-2 leading-snug">
            {content.title}
          </h2>

          {/* Excerpt */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {content.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 uppercase tracking-wider">
            <span>
              {t("blog.publishedOn")} {article.publishedAt}
            </span>
            <span>
              {article.readingTime} {t("blog.readingTime")}
            </span>
          </div>

          {/* Read More */}
          <div className="mt-4 pt-3 border-t border-border/30">
            <span className="text-xs text-crt-green/60 group-hover:text-crt-green transition-colors uppercase tracking-wider">
              {t("blog.readMore")} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogIndex() {
  const { t, locale } = useI18n();
  const articles = getAllArticles();

  useEffect(() => {
    document.title = t("blog.indexTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("blog.indexMetaDesc"));
  }, [locale, t]);

  return (
    <div className="min-h-screen relative">
      <div className="crt-scanlines" />

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
          </div>
          <LanguageSwitcher />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold glow-text mb-3">
            {t("blog.indexH1")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("blog.indexSubtitle")}
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="space-y-4 mb-12">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground mb-12">
            {t("blog.noArticles")}
          </div>
        )}

        {/* CTA */}
        <div className="border border-crt-green/20 bg-crt-green/5 p-6 text-center mb-12">
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
