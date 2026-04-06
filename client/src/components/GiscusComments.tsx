/**
 * GiscusComments — CRT-styled comment section powered by GitHub Discussions
 *
 * Features:
 *   - Reactive language switching (en / zh-CN / ko)
 *   - Reactive theme switching (custom CRT dark / light CSS)
 *   - Lazy-loaded iframe for performance
 *   - Custom CRT wrapper styling
 *   - Dynamic discussion category routing per article type
 *   - Maps blog pathname for per-article discussions
 */

import Giscus from "@giscus/react";
import { useI18n, type Locale } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import type { DiscussionCategory } from "@/lib/blog-data";

/** Map our app locale codes to Giscus-supported lang codes */
const GISCUS_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ko: "ko",
};

/**
 * Custom Giscus CRT theme CSS URLs hosted on GitHub (public repo).
 *
 * Giscus loads the theme inside its own cross-origin iframe, so the CSS must
 * be served from a publicly accessible URL with proper CORS headers.
 * jsDelivr CDN proxies GitHub files with correct Content-Type and CORS headers.
 */
const GISCUS_THEME_URLS: Record<string, string> = {
  dark: "https://cdn.jsdelivr.net/gh/lxiaolong068/claude-buddy-checker@main/client/public/giscus-themes/giscus-crt-dark.css",
  light: "https://cdn.jsdelivr.net/gh/lxiaolong068/claude-buddy-checker@main/client/public/giscus-themes/giscus-crt-light.css",
};

function getGiscusTheme(theme: string): string {
  return GISCUS_THEME_URLS[theme] || GISCUS_THEME_URLS.dark;
}

/**
 * Map discussion category types to GitHub Discussion category names and IDs.
 * These IDs correspond to the categories created in the GitHub repo's Discussions settings.
 */
const DISCUSSION_CATEGORIES: Record<DiscussionCategory, { name: string; id: string }> = {
  guides: {
    name: "Blog Guides",
    id: "DIC_kwDOR3xHS84C6Kk4",
  },
  "deep-dives": {
    name: "Blog Deep Dives",
    id: "DIC_kwDOR3xHS84C6Kk_",
  },
  lore: {
    name: "Blog Lore",
    id: "DIC_kwDOR3xHS84C6KlG",
  },
};

interface GiscusCommentsProps {
  /** The blog article slug, used as the discussion mapping term */
  slug: string;
  /** The discussion category for this article */
  discussionCategory?: DiscussionCategory;
}

export default function GiscusComments({ slug, discussionCategory = "guides" }: GiscusCommentsProps) {
  const { locale, t } = useI18n();
  const { theme } = useTheme();

  const category = DISCUSSION_CATEGORIES[discussionCategory];

  return (
    <section className="mb-12" aria-label="comments">
      {/* Section header */}
      <h2 className="text-sm font-bold text-crt-green uppercase tracking-widest mb-4">
        {t("blog.commentsTitle")}
      </h2>

      {/* CRT-styled container */}
      <div className="border border-border/40 bg-card/30 p-4 sm:p-6">
        {/* Terminal-style header bar */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
          <span className="w-2 h-2 rounded-full bg-crt-green/60" />
          <span className="w-2 h-2 rounded-full bg-crt-amber/60" />
          <span className="w-2 h-2 rounded-full bg-crt-red/60" />
          <span className="ml-2 text-[10px] text-muted-foreground/50 uppercase tracking-widest font-mono">
            github_discussions.sh
          </span>
        </div>

        {/* Login hint */}
        <p className="text-[11px] text-muted-foreground/50 mb-4 uppercase tracking-wider">
          {t("blog.commentsHint")}
        </p>

        {/* Giscus widget */}
        <Giscus
          id="giscus-comments"
          repo="lxiaolong068/claude-buddy-checker"
          repoId="R_kgDOR3xHSw"
          category={category.name}
          categoryId={category.id}
          mapping="specific"
          term={slug}
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme={getGiscusTheme(theme)}
          lang={GISCUS_LANG[locale]}
          loading="lazy"
        />
      </div>
    </section>
  );
}
