/**
 * Blog Index Page - CRT Terminal Style
 * Design: Grid of article cards with terminal aesthetics
 * Features: Search by keyword, sort by date/title, filter by tag
 * SEO: Optimized for blog listing with structured data
 */

type SortMode = "newest" | "oldest" | "titleAZ" | "titleZA";

import { useEffect, useMemo, useRef } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { getAllArticles, type BlogArticle, type DiscussionCategory } from "@/lib/blog-data";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import BlogListSchema from "@/components/BlogListSchema";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useQueryFilters } from "@/hooks/useQueryFilters";

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

function CategoryButton({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap flex items-center gap-1.5 ${
        active
          ? "border-crt-cyan/60 bg-crt-cyan/10 text-crt-cyan"
          : "border-border/40 text-muted-foreground/50 hover:border-crt-cyan/30 hover:text-muted-foreground/70"
      }`}
    >
      {children}
      <span className={`text-[9px] ${
        active ? "text-crt-cyan/60" : "text-muted-foreground/30"
      }`}>
        ({count})
      </span>
    </button>
  );
}

function ArticleCard({ article, searchQuery }: { article: BlogArticle; searchQuery: string }) {
  const { t, locale } = useI18n();
  const content = article.content[locale as keyof typeof article.content];

  // Highlight matching text in title and excerpt
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = text.split(regex);
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-crt-green/30 text-crt-green px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

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
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border transition-colors ${
                  searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase())
                    ? "border-crt-green/50 text-crt-green bg-crt-green/10"
                    : "border-crt-green/20 text-crt-green/70"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-crt-green transition-colors mb-2 leading-snug">
            {highlightText(content.title, searchQuery)}
          </h2>

          {/* Excerpt */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {highlightText(content.excerpt, searchQuery)}
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Collect all unique tags from articles
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((a) => a.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [articles]);

  // URL-synced filter state
  const {
    searchQuery,
    debouncedQuery,
    sortMode,
    activeCategory,
    activeTag,
    handleSearchChange,
    setSortMode,
    setActiveCategory,
    setActiveTag,
    clearSearch: clearSearchHook,
    clearAll,
  } = useQueryFilters(allTags);

  const clearSearch = () => {
    clearSearchHook();
    searchInputRef.current?.focus();
  };

  // Search + filter articles
  const searchedArticles = useMemo(() => {
    let result = articles;

    // Apply search query
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      result = result.filter((a) => {
        const content = a.content[locale as keyof typeof a.content];
        const titleMatch = content.title.toLowerCase().includes(q);
        const excerptMatch = content.excerpt.toLowerCase().includes(q);
        const tagMatch = a.tags.some((tag) => tag.toLowerCase().includes(q));
        const slugMatch = a.slug.toLowerCase().includes(q);
        return titleMatch || excerptMatch || tagMatch || slugMatch;
      });
    }

    // Apply category filter
    if (activeCategory) {
      result = result.filter((a) => a.discussionCategory === activeCategory);
    }

    // Apply tag filter
    if (activeTag) {
      result = result.filter((a) => a.tags.includes(activeTag));
    }

    return result;
  }, [articles, debouncedQuery, activeTag, activeCategory, locale]);

  // Sort filtered articles
  const sortedArticles = useMemo(() => {
    const arr = [...searchedArticles];
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
  }, [searchedArticles, sortMode, locale]);

  useEffect(() => {
    document.title = t("blog.indexTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("blog.indexMetaDesc"));
  }, [locale, t]);

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  const hasActiveFilters = debouncedQuery.trim() || activeTag || activeCategory;

  // Count articles per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length, guides: 0, 'deep-dives': 0, lore: 0 };
    articles.forEach((a) => {
      counts[a.discussionCategory] = (counts[a.discussionCategory] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    "/": (e) => {
      e.preventDefault();
      searchInputRef.current?.focus();
    },
    "Escape": () => {
      if (searchQuery || activeTag || activeCategory) {
        clearAll();
        searchInputRef.current?.blur();
      }
    },
  });

  const blogShortcuts = [
    { key: "/", label: t("shortcuts.search") },
    { key: "Esc", label: t("shortcuts.clear") },
  ];

  return (
    <div className="min-h-screen relative">
      <BlogListSchema articles={articles} locale={locale} />
      <div className="crt-scanlines" />
      <KeyboardShortcutsHelp shortcuts={blogShortcuts} />

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

        {/* ── Search & Sort & Filter Toolbar ── */}
        <div className="border border-border/50 bg-card/50 mb-6">
          {/* Toolbar Terminal Header */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/30">
            <span className="w-1.5 h-1.5 rounded-full bg-crt-green/60" />
            <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest">
              query_options
            </span>
          </div>

          <div className="p-3 space-y-3">
            {/* Search Row */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-crt-green/50 uppercase tracking-wider font-semibold min-w-[52px]">
                {t("blog.searchLabel")}:
              </span>
              <div className="flex-1 relative">
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-crt-green/40 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t("blog.searchPlaceholder")}
                  className="w-full bg-background/50 border border-border/40 text-xs text-foreground placeholder:text-muted-foreground/30 pl-8 pr-8 py-1.5 focus:outline-none focus:border-crt-green/50 transition-colors tracking-wide"
                  spellCheck={false}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-crt-red transition-colors"
                    title={t("blog.searchClear")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

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

            {/* Category Filter Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-crt-cyan/50 uppercase tracking-wider font-semibold min-w-[52px]">
                {t("blog.filterByCategory")}:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                <CategoryButton
                  active={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                  count={categoryCounts.all}
                >
                  {t("blog.categoryAll")}
                </CategoryButton>
                <CategoryButton
                  active={activeCategory === "guides"}
                  onClick={() => setActiveCategory(activeCategory === "guides" ? null : "guides")}
                  count={categoryCounts.guides}
                >
                  {t("blog.categoryGuides")}
                </CategoryButton>
                <CategoryButton
                  active={activeCategory === "deep-dives"}
                  onClick={() => setActiveCategory(activeCategory === "deep-dives" ? null : "deep-dives")}
                  count={categoryCounts["deep-dives"]}
                >
                  {t("blog.categoryDeepDives")}
                </CategoryButton>
                <CategoryButton
                  active={activeCategory === "lore"}
                  onClick={() => setActiveCategory(activeCategory === "lore" ? null : "lore")}
                  count={categoryCounts.lore}
                >
                  {t("blog.categoryLore")}
                </CategoryButton>
              </div>
            </div>

            {/* Tag Filter Row */}
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
                {debouncedQuery.trim() && (
                  <span className="ml-2 text-crt-green/50">
                    — grep "{debouncedQuery}"
                  </span>
                )}
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
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
              <ArticleCard key={article.slug} article={article} searchQuery={debouncedQuery} />
            ))}
          </div>
        ) : (
          <div className="border border-border bg-card p-8 text-center mb-12">
            <div className="text-crt-amber/60 text-sm mb-2">
              {debouncedQuery.trim()
                ? t("blog.searchNoResults")
                : t("blog.noArticles")}
            </div>
            {debouncedQuery.trim() && (
              <button
                onClick={clearSearch}
                className="text-xs text-crt-green/60 hover:text-crt-green uppercase tracking-wider transition-colors mt-2"
              >
                [{t("blog.searchClear")}]
              </button>
            )}
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
