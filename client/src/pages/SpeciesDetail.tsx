/**
 * Species Detail Page - /species/:slug
 * CRT Terminal Style | Programmatic SEO page for each of the 18 buddy species
 * Design: Retro CRT terminal with phosphor green accents, scanline overlays
 * Includes: Share card generation via Canvas API
 */

import { useParams, Link, useLocation } from "wouter";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { SPECIES_DATA, ALL_SPECIES_SLUGS, type SpeciesInfo } from "@/lib/species-data";
import {
  BODIES,
  RARITIES,
  RARITY_WEIGHTS,
  RARITY_FLOOR,
  RARITY_STARS,
  STAT_NAMES,
  STAT_COLORS,
  type Species,
  type BuddyResult,
} from "@/lib/buddy-engine";
import BuddySprite from "@/components/BuddySprite";
import StatBar from "@/components/StatBar";
import ShareButton from "@/components/ShareButton";
import ShareCardModal from "@/components/ShareCardModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import type { ShareCardSpeciesData } from "@/lib/share-card-renderer";
import { SPECIES_FAQS } from "@/lib/species-faq";
import FAQSection from "@/components/FAQSection";
import ScrollToTop from "@/components/ScrollToTop";
import FAQSchema from "@/components/FAQSchema";
import SpeciesTooltip from "@/components/SpeciesTooltip";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";
import TableOfContents from "@/components/TableOfContents";
import type { TocItem } from "@/components/TableOfContents";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

/** Build a synthetic BuddyResult for display purposes */
function makeDemoBuddy(species: Species, info: SpeciesInfo): BuddyResult {
  const stats = {} as Record<(typeof STAT_NAMES)[number], number>;
  for (const s of STAT_NAMES) {
    stats[s] = s === info.peakStat ? 78 : 42;
  }
  return {
    rarity: "rare",
    species,
    eye: info.defaultEye,
    hat: "crown",
    shiny: false,
    stats,
  };
}

export default function SpeciesDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as Species;
  const { t, locale } = useI18n();
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);
  const [shareData, setShareData] = useState<ShareCardSpeciesData | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const handleRandomNext = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    // Pick a random species that is different from the current one
    const others = ALL_SPECIES_SLUGS.filter((s) => s !== slug);
    const target = others[Math.floor(Math.random() * others.length)];
    setTimeout(() => {
      setIsRolling(false);
      navigate(`/species/${target}`);
    }, 500);
  }, [isRolling, slug, navigate]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    "r": () => { handleRandomNext(); },
  });

  const detailShortcuts = [
    { key: "r", label: t("shortcuts.random") },
  ];

  const info = SPECIES_DATA[slug];

  // Table of Contents items for sidebar navigation
  const tocItems: TocItem[] = useMemo(() => [
    { id: "toc-ascii", label: t("speciesDetail.tocAscii"), icon: "█" },
    { id: "toc-overview", label: t("speciesDetail.tocOverview"), icon: "▶" },
    { id: "toc-stats", label: t("speciesDetail.tocStats"), icon: "▓" },
    { id: "toc-rarity", label: t("speciesDetail.tocRarity"), icon: "☆" },
    { id: "toc-related", label: t("speciesDetail.tocRelated"), icon: "≡" },
    { id: "toc-faq", label: t("speciesDetail.tocFaq"), icon: "?" },
    { id: "toc-cta", label: t("speciesDetail.tocCta"), icon: "▷" },
  ], [t]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update document title and meta for SEO
  useEffect(() => {
    if (info) {
      const name = t(`speciesDetail.speciesNames.${slug}`);
      const title = `${name} ${t("speciesDetail.metaTitleSuffix")}`;
      const desc = `${t("speciesDetail.metaDescPrefix")} ${name} ${t("speciesDetail.metaDescSuffix")}`;
      const url = `https://www.claudebuddy.art/species/${slug}`;

      document.title = title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", desc);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", desc);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", url);

      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute("content", title);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", desc);

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

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [info, slug, t, locale]);

  const demoBuddy = useMemo(() => info ? makeDemoBuddy(slug, info) : null, [slug, info]);

  const speciesName = info ? t(`speciesDetail.speciesNames.${slug}`) : "";
  const speciesDesc = info ? t(`speciesDetail.speciesDesc.${slug}`) : "";
  const categoryKey = info ? `speciesDetail.category${info.category.charAt(0).toUpperCase() + info.category.slice(1)}` as string : "";
  const categoryName = info ? t(categoryKey) : "";

  const handleShare = useCallback(() => {
    if (!info || !demoBuddy) return;
    const data: ShareCardSpeciesData = {
      type: "species",
      species: slug,
      buddy: demoBuddy,
      labels: {
        title: t("share.speciesTitle"),
        speciesName,
        category: categoryName,
        description: speciesDesc,
        peakStat: t("share.labelPeakStat"),
        peakStatValue: info.peakStat,
        tags: info.tags.map((tag) => `#${tag}`),
        watermark: t("share.watermark"),
        checkYours: t("share.checkYours"),
      },
    };
    setShareData(data);
  }, [info, demoBuddy, slug, speciesName, categoryName, speciesDesc, t]);

  if (!info || !demoBuddy) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#33ff33] font-mono text-xl mb-4">
            {t("speciesDetail.errorNotFound")}
          </p>
          <Link
            href="/"
            className="text-[#33ff33]/70 hover:text-[#33ff33] underline font-mono"
          >
            {t("speciesDetail.backToChecker")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff33] font-mono relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />
      <KeyboardShortcutsHelp shortcuts={detailShortcuts} />
      <TableOfContents items={tocItems} title={t("speciesDetail.tocTitle")} />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#33ff33]/20">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/species"
              className="text-[#33ff33]/60 hover:text-[#33ff33] transition-colors text-sm"
            >
              {t("speciesDetail.backToIndex")}
            </Link>
            <span className="text-[#33ff33]/30">|</span>
            <Link
              href="/"
              className="text-[#33ff33]/60 hover:text-[#33ff33] transition-colors text-sm"
            >
              {t("speciesDetail.backToChecker")}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <span className="text-[#33ff33]/40 text-xs hidden sm:inline">
              /species/{slug}
            </span>
          </div>
        </div>
      </nav>

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Hero: Species Name + ASCII Art */}
        <section
          id="toc-ascii"
          className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider">
              <span className="text-[#33ff33]/50">{">"}</span> {speciesName.toUpperCase()}
            </h1>
            {/* Share Button */}
            <ShareButton onClick={handleShare} variant="secondary" />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-2 py-0.5 border border-[#33ff33]/30 text-[#33ff33]/70 text-xs uppercase">
              {categoryName}
            </span>
            {info.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-[#33ff33]/15 text-[#33ff33]/50 text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ASCII Art Display */}
            <div className="border border-[#33ff33]/20 bg-[#0d1a0d]/60 p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-6 bg-[#0d1a0d] border-b border-[#33ff33]/20 flex items-center px-3">
                <span className="text-[#33ff33]/50 text-[10px]">
                  {t("speciesDetail.sectionAscii")}
                </span>
              </div>
              <div className="pt-6 flex items-center justify-center min-h-[200px]">
                <div className="scale-150 md:scale-[1.8]">
                  <BuddySprite buddy={demoBuddy} />
                </div>
              </div>
              {/* Show all 3 animation frames */}
              <div className="mt-6 pt-4 border-t border-[#33ff33]/10">
                <p className="text-[10px] text-[#33ff33]/40 mb-2">ANIMATION FRAMES:</p>
                <div className="flex justify-center gap-6">
                  {BODIES[slug].map((frame, i) => (
                    <pre
                      key={i}
                      className="text-[8px] leading-[10px] text-[#33ff33]/50"
                    >
                      {frame
                        .map((line) => line.replaceAll("{E}", info.defaultEye))
                        .join("\n")}
                    </pre>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div id="toc-overview" className="space-y-4">
              <div className="border border-[#33ff33]/20 bg-[#0d1a0d]/60 p-5 relative">
                <div className="absolute top-0 left-0 right-0 h-6 bg-[#0d1a0d] border-b border-[#33ff33]/20 flex items-center px-3">
                  <span className="text-[#33ff33]/50 text-[10px]">
                    {t("speciesDetail.sectionOverview")}
                  </span>
                </div>
                <div className="pt-6">
                  <p className="text-[#33ff33]/80 text-sm leading-relaxed mb-4">
                    {speciesDesc}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-[#33ff33]/10 pb-1">
                      <span className="text-[#33ff33]/50">{t("speciesDetail.labelCategory")}</span>
                      <span className="text-[#33ff33]">{categoryName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#33ff33]/10 pb-1">
                      <span className="text-[#33ff33]/50">{t("speciesDetail.labelPeakStat")}</span>
                      <span style={{ color: STAT_COLORS[info.peakStat as keyof typeof STAT_COLORS] }}>
                        {info.peakStat}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#33ff33]/10 pb-1">
                      <span className="text-[#33ff33]/50">{t("speciesDetail.labelTotalSpecies")}</span>
                      <span className="text-[#33ff33]">18</span>
                    </div>
                    <div className="flex justify-between border-b border-[#33ff33]/10 pb-1">
                      <span className="text-[#33ff33]/50">{t("speciesDetail.labelHatChance")}</span>
                      <span className="text-[#33ff33]">40%</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-[#33ff33]/50">{t("speciesDetail.labelShinyChance")}</span>
                      <span className="text-[#ffd700]">{t("speciesDetail.shinyNote")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stat Tendencies */}
        <section
          id="toc-stats"
          className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="border border-[#33ff33]/20 bg-[#0d1a0d]/60 p-5 relative">
            <div className="absolute top-0 left-0 right-0 h-6 bg-[#0d1a0d] border-b border-[#33ff33]/20 flex items-center px-3">
              <span className="text-[#33ff33]/50 text-[10px]">
                {t("speciesDetail.sectionStats")}
              </span>
            </div>
            <div className="pt-6 space-y-3">
              {STAT_NAMES.map((stat, i) => (
                <StatBar
                  key={stat}
                  name={stat}
                  value={stat === info.peakStat ? 78 : 42}
                  delay={i * 100}
                />
              ))}
              <p className="text-[10px] text-[#33ff33]/40 mt-3">
                * {t("speciesDetail.hatNote")}
              </p>
            </div>
          </div>
        </section>

        {/* Rarity Breakdown */}
        <section
          id="toc-rarity"
          className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="border border-[#33ff33]/20 bg-[#0d1a0d]/60 p-5 relative">
            <div className="absolute top-0 left-0 right-0 h-6 bg-[#0d1a0d] border-b border-[#33ff33]/20 flex items-center px-3">
              <span className="text-[#33ff33]/50 text-[10px]">
                {t("speciesDetail.sectionRarity")}
              </span>
            </div>
            <div className="pt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#33ff33]/20">
                    <th className="text-left py-2 text-[#33ff33]/60 font-normal">
                      {t("rarity.colRarity")}
                    </th>
                    <th className="text-center py-2 text-[#33ff33]/60 font-normal">
                      {t("rarity.colChance")}
                    </th>
                    <th className="text-center py-2 text-[#33ff33]/60 font-normal">
                      {t("rarity.colStatFloor")}
                    </th>
                    <th className="text-right py-2 text-[#33ff33]/60 font-normal">
                      {t("rarity.colStars")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RARITIES.map((rarity) => {
                    const colorMap: Record<string, string> = {
                      common: "#33ff33",
                      uncommon: "#58a6ff",
                      rare: "#af87ff",
                      epic: "#ff6b6b",
                      legendary: "#ffd700",
                    };
                    return (
                      <tr
                        key={rarity}
                        className="border-b border-[#33ff33]/10"
                      >
                        <td className="py-2" style={{ color: colorMap[rarity] }}>
                          {t(`rarity.${rarity}`)}
                        </td>
                        <td className="py-2 text-center text-[#33ff33]/70">
                          {RARITY_WEIGHTS[rarity]}%
                        </td>
                        <td className="py-2 text-center text-[#33ff33]/70">
                          {RARITY_FLOOR[rarity]}
                        </td>
                        <td className="py-2 text-right" style={{ color: colorMap[rarity] }}>
                          {RARITY_STARS[rarity]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="text-[10px] text-[#33ff33]/40 mt-3">
                * {t("speciesDetail.rarityNote")}
              </p>
            </div>
          </div>
        </section>

        {/* Related Species — Enhanced Recommendation Module */}
        <section
          id="toc-related"
          className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="border border-[#33ff33]/20 bg-[#0d1a0d]/60 p-5 relative">
            <div className="absolute top-0 left-0 right-0 h-6 bg-[#0d1a0d] border-b border-[#33ff33]/20 flex items-center px-3">
              <span className="text-[#33ff33]/50 text-[10px]">
                {t("speciesDetail.sectionRelated")}
              </span>
            </div>
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {info.related.map((relSlug) => {
                const relInfo = SPECIES_DATA[relSlug];
                const relName = t(`speciesDetail.speciesNames.${relSlug}`);
                const relDesc = t(`speciesDetail.speciesDesc.${relSlug}`);
                const relFrames = BODIES[relSlug];
                const relAscii = relFrames[0]
                  .map((line) => line.replaceAll("{E}", relInfo.defaultEye))
                  .join("\n");

                // Compute similarity reasons
                const reasons: string[] = [];
                if (relInfo.category === info.category) {
                  reasons.push(t("speciesDetail.relatedSameCategory"));
                }
                if (relInfo.peakStat === info.peakStat) {
                  reasons.push(t("speciesDetail.relatedSamePeakStat"));
                }
                const sharedTags = info.tags.filter((tag) => relInfo.tags.includes(tag));
                if (sharedTags.length > 0) {
                  reasons.push(`${t("speciesDetail.relatedSharedTags")}: ${sharedTags.map(t => `#${t}`).join(" ")}`);
                }

                const relCategoryKey = `speciesDetail.category${relInfo.category.charAt(0).toUpperCase() + relInfo.category.slice(1)}` as string;
                const peakColor = STAT_COLORS[relInfo.peakStat as keyof typeof STAT_COLORS] || "#33ff33";

                return (
                  <SpeciesTooltip
                    key={relSlug}
                    relInfo={relInfo}
                    relName={relName}
                    relDesc={relDesc}
                    currentTags={info.tags}
                  >
                    <Link
                      href={`/species/${relSlug}`}
                      className="block border border-[#33ff33]/15 bg-[#0a0a0a]/50 p-4 hover:border-[#33ff33]/40 hover:bg-[#0d1a0d]/80 transition-all group relative overflow-hidden"
                    >
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(51,255,51,0.04)_0%,transparent_70%)]" />

                      {/* ASCII Art */}
                      <pre className="text-[9px] leading-[11px] text-[#33ff33]/50 group-hover:text-[#33ff33]/80 transition-colors text-center mb-3">
                        {relAscii}
                      </pre>

                      {/* Species Name */}
                      <p className="text-center text-sm font-bold text-[#33ff33]/80 group-hover:text-[#33ff33] transition-colors tracking-wider">
                        {relName.toUpperCase()}
                      </p>

                      {/* Category + Peak Stat row */}
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="px-1.5 py-0.5 border border-[#33ff33]/20 text-[#33ff33]/50 text-[9px] uppercase">
                          {t(relCategoryKey)}
                        </span>
                        <span
                          className="px-1.5 py-0.5 border text-[9px] uppercase"
                          style={{ borderColor: `${peakColor}40`, color: peakColor }}
                        >
                          {t("speciesDetail.relatedPeakStat")}: {relInfo.peakStat}
                        </span>
                      </div>

                      {/* Personality tags */}
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        {relInfo.tags.map((tag) => {
                          const isShared = info.tags.includes(tag);
                          return (
                            <span
                              key={tag}
                              className={`text-[8px] px-1 py-px ${
                                isShared
                                  ? "text-[#33ff33]/80 border border-[#33ff33]/30 bg-[#33ff33]/5"
                                  : "text-[#33ff33]/30"
                              }`}
                            >
                              #{tag}
                            </span>
                          );
                        })}
                      </div>

                      {/* Similarity reasons */}
                      {reasons.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#33ff33]/10">
                          <p className="text-[8px] text-[#33ff33]/40 text-center leading-relaxed">
                            {reasons.join(" \u00b7 ")}
                          </p>
                        </div>
                      )}

                      {/* View link */}
                      <p className="text-center text-[10px] text-[#33ff33]/30 group-hover:text-[#33ff33]/60 transition-colors mt-2">
                        {t("speciesDetail.viewSpecies")} \u2192
                      </p>
                    </Link>
                  </SpeciesTooltip>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="toc-faq"
          className={`transition-all duration-700 delay-[350ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <FAQSection
            faqs={SPECIES_FAQS[slug]?.[locale as "en" | "zh" | "ko"] || SPECIES_FAQS[slug]?.en || []}
            speciesName={speciesName}
          />
        </section>

        {/* CTA: Check Your Buddy + Random Next */}
        <section
          id="toc-cta"
          className={`transition-all duration-700 delay-[450ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="border border-[#33ff33]/30 bg-[#0d1a0d]/80 p-6 text-center">
            <p className="text-[#33ff33]/70 mb-4">
              {t("speciesDetail.tryChecker")}{" "}
              <span className="text-[#33ff33] font-bold">{speciesName}</span>?
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[#33ff33] text-[#0a0a0a] font-bold text-sm hover:bg-[#44ff44] transition-colors tracking-wider"
              >
                {t("speciesDetail.tryCheckerBtn")}
              </Link>
              <button
                onClick={handleRandomNext}
                disabled={isRolling}
                title={t("speciesDetail.randomNextHint")}
                className={`group relative px-5 py-3 border text-sm font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden ${
                  isRolling
                    ? "border-[#33ff33] bg-[#33ff33]/20 text-[#33ff33] cursor-wait"
                    : "border-[#33ff33]/40 text-[#33ff33]/70 hover:border-[#33ff33] hover:text-[#33ff33] hover:bg-[#33ff33]/10"
                }`}
              >
                <span className="absolute inset-0 bg-[#33ff33]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative flex items-center gap-2">
                  <span className={`inline-block transition-transform duration-500 ${isRolling ? "animate-spin" : "group-hover:rotate-180"}`}>
                    ⚄
                  </span>
                  {t("speciesDetail.randomNext")}
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#33ff33]/10 mt-12 py-6 text-center">
        <p className="text-[#33ff33]/30 text-xs">{t("footer.line1")}</p>
        <p className="text-[#33ff33]/20 text-xs mt-1">{t("footer.line2")}</p>
      </footer>

      {/* FAQ Schema */}
      <FAQSchema
        faqs={SPECIES_FAQS[slug]?.[locale as "en" | "zh" | "ko"] || SPECIES_FAQS[slug]?.en || []}
        pageUrl={`https://www.claudebuddy.art/species/${slug}`}
        speciesName={speciesName}
      />

      {/* Share Card Modal */}
      <ShareCardModal
        data={shareData}
        onClose={() => setShareData(null)}
      />

      {/* Back to Top */}
      <ScrollToTop />
    </div>
  );
}
