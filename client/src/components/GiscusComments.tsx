/**
 * GiscusComments — CRT-styled comment section powered by GitHub Discussions
 *
 * Features:
 *   - Reactive language switching (en / zh-CN / ko)
 *   - Reactive theme switching (dark_dimmed / light)
 *   - Lazy-loaded iframe for performance
 *   - Custom CRT wrapper styling
 *   - Maps blog pathname for per-article discussions
 */

import Giscus from "@giscus/react";
import { useI18n, type Locale } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";

/** Map our app locale codes to Giscus-supported lang codes */
const GISCUS_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ko: "ko",
};

/** Map our theme to Giscus theme names */
function getGiscusTheme(theme: string): string {
  return theme === "light" ? "light" : "dark_dimmed";
}

interface GiscusCommentsProps {
  /** The blog article slug, used as the discussion mapping term */
  slug: string;
}

export default function GiscusComments({ slug }: GiscusCommentsProps) {
  const { locale, t } = useI18n();
  const { theme } = useTheme();

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
          category="Announcements"
          categoryId="DIC_kwDOR3xHS84C6FXK"
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
