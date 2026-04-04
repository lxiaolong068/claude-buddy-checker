/**
 * Blog Index Page - CRT Terminal Style
 * Design: Grid of article cards with terminal aesthetics
 * Features: Sort by date/title, filter by tag
 * SEO: Optimized for blog listing with structured data
 */

type SortMode = "newest" | "oldest" | "titleAZ" | "titleZA";

import { useEffect, useState, useMemo } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { getAllArticles, type BlogArticle } from "@/lib/blog-data";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import BlogListSchema from "@/components/BlogListSchema";

/* ── Sort/Filter Button Components ── */
function SortButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap ${
        active
          ? "border-crt-green/60 bg-crt-green/15 text-crt-green"
          : "border-border/50 text-muted-foreground/60 hover:border-crt-green/30 hover:text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function TagButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap ${
        active
          ? "border-crt-amber/60 bg-crt-amber/10 text-crt-amber"
          : "border-border/40 text-muted-foreground/50 hover:border-crt-amber/30 hover:text-muted-foreground/70"
      }`}
    >
      {children}
    </button>
  );
}

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

  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags from articles
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((a) => a.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [articles]);

  // Filter articles by tag
  const filteredArticles = useMemo(() => {
    if (!activeTag) return articles;
    return articles.filter((a) => a.tags.includes(activeTag));
  }, [articles, activeTag]);

  // Sort filtered articles
  const sortedArticles = useMemo(() => {
    const arr = [...filteredArticles];
    switch (sortMode) {
      case "newest":
        return arr.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      case "oldest":
        return arr.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        );
      case "titleAZ": {
        return arr.sort((a, b) => {
          const titleA =
            a.content[locale as keyof typeof a.content].title.toLowerCase();
          const titleB =
            b.content[locale as keyof typeof b.content].title.toLowerCase();
          return titleA.localeCompare(titleB);
        });
      }
      case "titleZA": {
        return arr.sort((a, b) => {
          const titleA =
            a.content[locale as keyof typeof a.content].title.toLowerCase();
          const titleB =
            b.content[locale as keyof typeof b.content].title.toLowerCase();
          return titleB.localeCompare(titleA);
        });
      }
      default:
        return arr;
    }
  }, [filteredArticles, sortMode, locale]);

  useEffect(() => {
    document.title = t("blog.indexTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("blog.indexMetaDesc"));
  }, [locale, t]);

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="min-h-screen relative">
      <BlogListSchema articles={articles} locale={locale} />
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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold glow-text mb-3">
            {t("blog.indexH1")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("blog.indexSubtitle")}
          </p>
        </div>

        {/* ── Sort & Filter Toolbar ── */}
        <div className="border border-border/50 bg-card/50 mb-6">
          {/* Toolbar Terminal Header */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/30">
            <span className="w-1.5 h-1.5 rounded-full bg-crt-green/60" />
            <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest">
              query_options
            </span>
          </div>

          <div className="p-3 space-y-3">
            {/* Sort Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-crt-green/50 uppercase tracking-wider font-semibold min-w-[52px]">
                {t("blog.sortBy")}:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                <SortButton
                  active={sortMode === "newest"}
                  onClick={() => setSortMode("newest")}
                >
                  {t("blog.sortNewest")}
                </SortButton>
                <SortButton
                  active={sortMode === "oldest"}
                  onClick={() => setSortMode("oldest")}
                >
                  {t("blog.sortOldest")}
                </SortButton>
                <SortButton
                  active={sortMode === "titleAZ"}
                  onClick={() => setSortMode("titleAZ")}
                >
                  {t("blog.sortTitleAZ")}
                </SortButton>
                <SortButton
                  active={sortMode === "titleZA"}
                  onClick={() => setSortMode("titleZA")}
                >
                  {t("blog.sortTitleZA")}
                </SortButton>
              </div>
            </div>

            {/* Filter Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-crt-amber/50 uppercase tracking-wider font-semibold min-w-[52px]">
                {t("blog.filterByTag")}:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                <TagButton
                  active={activeTag === null}
                  onClick={() => setActiveTag(null)}
                >
                  {t("blog.filterAll")}
                </TagButton>
                {allTags.map((tag) => (
                  <TagButton
                    key={tag}
                    active={activeTag === tag}
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </TagButton>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between pt-1 border-t border-border/20">
              <span className="text-[10px] text-muted-foreground/40 tracking-wider">
                <span className="text-crt-green/70 font-semibold">
                  {sortedArticles.length}
                </span>{" "}
                {t("blog.resultsCount")}
              </span>
              {activeTag && (
                <button
                  onClick={() => setActiveTag(null)}
                  className="text-[10px] text-crt-red/60 hover:text-crt-red uppercase tracking-wider transition-colors"
                >
                  [{t("blog.clearFilter")}]
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {sortedArticles.length > 0 ? (
          <div className="space-y-4 mb-12">
            {sortedArticles.map((article) => (
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
