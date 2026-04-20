/**
 * Home Page - Claude Buddy Checker
 * Design: Retro CRT Terminal (phosphor green on black)
 * Layout: Narrow centered column simulating 80-col terminal
 * i18n: All user-facing text via useI18n()
 */

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import { Link } from "wouter";
import { rollBuddy, type BuddyResult, SPECIES } from "@/lib/buddy-engine";
import { getAllArticles } from "@/lib/blog-data";
import BuddyResultCard from "@/components/BuddyResultCard";
import TypewriterText from "@/components/TypewriterText";
import { useI18n } from "@/contexts/I18nContext";
import SiteHeader from "@/components/SiteHeader";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import WebAppSchema from "@/components/WebAppSchema";
import LazyImage from "@/components/LazyImage";
import DailySpecies from "@/components/DailySpecies";
import CommunityStats from "@/components/CommunityStats";
import { recordQuery } from "@/lib/community-stats";
import { addToCollection } from "@/lib/storage";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";
import BringBackBanner from "@/components/BringBackBanner";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/hero-crt-terminal-5fvRpoNY7GsFPkvdJ2QQKy.webp";
const GRID_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/buddy-showcase-grid-dzj2bCjKycQ4bgSaUeRV58.webp";

const ASCII_LOGO = `
 ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗  
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 ██████╗ ██╗   ██╗██████╗ ██████╗ ██╗   ██╗
 ██╔══██╗██║   ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
 ██████╔╝██║   ██║██║  ██║██║  ██║ ╚████╔╝ 
 ██╔══██╗██║   ██║██║  ██║██║  ██║  ╚██╔╝  
 ██████╔╝╚██████╔╝██████╔╝██████╔╝   ██║   
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   
`.trim();

export default function Home() {
  const { t, dict, locale } = useI18n();
  const [uuid, setUuid] = useState("");
  const [buddy, setBuddy] = useState<BuddyResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // UUID format detection
  const uuidHint = useMemo(() => {
    const v = uuid.trim();
    if (!v) return null;
    // Standard UUID format (accountUuid)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)) {
      return { type: "uuid" as const, key: "input.detectedUuid" };
    }
    // Long hex string (userID) — 32+ hex chars without dashes
    if (/^[0-9a-f]{32,}$/i.test(v)) {
      return { type: "userId" as const, key: "input.detectedUserId" };
    }
    // Any other non-empty string
    if (v.length > 0) {
      return { type: "anon" as const, key: "input.detectedAnon" };
    }
    return null;
  }, [uuid]);

  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 1500);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 1500);
    }
  }, []);

  // Update document title and meta description when locale changes
  useEffect(() => {
    document.title = t("meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("meta.description"));
    }
  }, [locale, t]);

  useHreflangLinks(`${SITE_URL}/`);

  const handleCheck = useCallback(() => {
    const trimmed = uuid.trim();
    if (!trimmed) {
      setError(t("input.errorEmpty"));
      return;
    }
    setError("");
    setIsLoading(true);
    setShowResult(false);

    setTimeout(() => {
      const result = rollBuddy(trimmed);
      setBuddy(result);
      setIsLoading(false);
      setShowResult(true);
      // Record query for community stats (non-blocking)
      recordQuery(trimmed, result.species, result.rarity);
      addToCollection({ uuid: trimmed, species: result.species, rarity: result.rarity, shiny: result.shiny, hat: result.hat, eye: result.eye, stats: result.stats, discoveredAt: new Date().toISOString() });
      window.dispatchEvent(new CustomEvent("buddy-query"));
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 800);
  }, [uuid, t]);

  const handleRandom = useCallback(() => {
    const randomUuid = crypto.randomUUID();
    setUuid(randomUuid);
    setError("");
    setIsLoading(true);
    setShowResult(false);
    setTimeout(() => {
      const result = rollBuddy(randomUuid);
      setBuddy(result);
      setIsLoading(false);
      setShowResult(true);
      recordQuery(randomUuid, result.species, result.rarity);
      addToCollection({ uuid: randomUuid, species: result.species, rarity: result.rarity, shiny: result.shiny, hat: result.hat, eye: result.eye, stats: result.stats, discoveredAt: new Date().toISOString() });
      window.dispatchEvent(new CustomEvent("buddy-query"));
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 800);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCheck();
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    "/": (e) => {
      e.preventDefault();
      inputRef.current?.focus();
    },
    "Escape": () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
  });

  const homeShortcuts = [
    { key: "/", label: t("shortcuts.search") },
    { key: "Esc", label: t("shortcuts.clear") },
  ];

  const rarityRows = [
    { name: t("rarity.common"), chance: "60%", floor: "5", stars: "★", cls: "rarity-common" },
    { name: t("rarity.uncommon"), chance: "25%", floor: "15", stars: "★★", cls: "rarity-uncommon" },
    { name: t("rarity.rare"), chance: "10%", floor: "25", stars: "★★★", cls: "rarity-rare" },
    { name: t("rarity.epic"), chance: "4%", floor: "35", stars: "★★★★", cls: "rarity-epic" },
    { name: t("rarity.legendary"), chance: "1%", floor: "50", stars: "★★★★★", cls: "rarity-legendary" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* JSON-LD Structured Data */}
      <WebAppSchema />
      <SiteHeader />

      {/* CRT Scan Lines Overlay */}
      <div className="crt-scanlines" />
      <KeyboardShortcutsHelp shortcuts={homeShortcuts} />

      {/* Main Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ASCII Logo */}
        <div className="mb-8 overflow-hidden">
          <pre className="text-[6px] sm:text-[8px] md:text-[10px] leading-none font-mono text-center glow-text select-none whitespace-pre">
            {ASCII_LOGO}
          </pre>
        </div>

        {/* Hero Image */}
        <div className="mb-8 border border-border glow-border overflow-hidden">
          <LazyImage
            src={HERO_IMG}
            alt={t("hero.imgAlt")}
            width={2752}
            height={1536}
            priority={true}
          />
        </div>

        {/* Tagline */}
        <div className="mb-8 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold glow-text mb-3">
            {t("hero.h1")}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="mb-6 border border-border/30 bg-card/50 px-4 py-3 text-xs text-muted-foreground">
          <span className="text-crt-green font-semibold">{t("privacy.label")}</span>
          {" // "}
          {t("privacy.text")}
        </div>

        {/* Bring Back Buddy — Community Petition Banner */}
        <BringBackBanner />

        {/* Input Section */}
        <div className="mb-8">
          <div className="border border-border bg-card p-4 sm:p-6">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
              <span className="w-2.5 h-2.5 rounded-full bg-crt-red" />
              <span className="w-2.5 h-2.5 rounded-full bg-crt-amber" />
              <span className="w-2.5 h-2.5 rounded-full bg-crt-green" />
              <span className="ml-3 text-xs text-muted-foreground uppercase tracking-widest">
                {t("input.terminalTitle")}
              </span>
            </div>

            {/* How to find UUID */}
            <div className="mb-4 text-xs text-muted-foreground space-y-1.5">
              <p className="text-crt-green">{t("input.howToFind")}</p>
              <div>
                <p>
                  <span className="text-crt-amber">{t("input.option1Label")}</span> {t("input.option1Text")}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <code className="text-foreground bg-secondary/50 px-1.5 py-0.5 text-[11px] break-all flex-1">
                    {t("input.option1Code")}
                  </code>
                  <button
                    onClick={() => handleCopy(t("input.option1Code"), "cmd1")}
                    className="shrink-0 px-1.5 py-0.5 text-[10px] border border-border/50 hover:border-crt-green/50 hover:text-crt-green transition-all"
                    title={t("input.copyCmd")}
                  >
                    {copiedCmd === "cmd1" ? t("input.copied") : "[CP]"}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <code className="text-muted-foreground/60 bg-secondary/30 px-1.5 py-0.5 text-[10px] break-all flex-1">
                    {t("input.option1Win")}
                  </code>
                  <button
                    onClick={() => handleCopy("Select-String 'accountUuid|userID' ~\\.claude.json", "cmd1win")}
                    className="shrink-0 px-1.5 py-0.5 text-[10px] border border-border/50 hover:border-crt-green/50 hover:text-crt-green transition-all"
                    title={t("input.copyCmd")}
                  >
                    {copiedCmd === "cmd1win" ? t("input.copied") : "[CP]"}
                  </button>
                </div>
              </div>
              <div>
                <p>
                  <span className="text-crt-amber">{t("input.option2Label")}</span> {t("input.option2Text")}{" "}
                  <code className="text-foreground bg-secondary/50 px-1.5 py-0.5">
                    {t("input.option2Code")}
                  </code>
                </p>
                <p className="text-muted-foreground/60 text-[10px] mt-0.5">
                  {t("input.option2Hint")}
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center border border-border bg-background px-3 py-2 focus-within:border-crt-green/50 focus-within:glow-border transition-all">
                <span className="text-crt-green mr-2 text-sm shrink-0">&gt;_</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={uuid}
                  onChange={(e) => setUuid(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("input.placeholder")}
                  className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
                {/* Keyboard hint — shown only when input is empty */}
                {!uuid && (
                  <span className="pointer-events-none text-[10px] text-muted-foreground/25 font-mono select-none shrink-0 ml-1">
                    [/]
                  </span>
                )}
                {/* Random UUID dice button */}
                <button
                  onClick={handleRandom}
                  disabled={isLoading}
                  title={t("input.randomUuid")}
                  className="ml-2 shrink-0 text-muted-foreground/40 hover:text-crt-amber transition-colors disabled:opacity-30"
                  aria-label={t("input.randomUuid")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <path d="M16 8h.01M12 12h.01M8 16h.01M8 8h.01M16 16h.01"/>
                  </svg>
                </button>
              </div>

              {/* UUID format detection hint */}
              {uuidHint && (
                <div className={`text-[10px] mt-1 font-mono transition-all ${
                  uuidHint.type === "uuid" ? "text-crt-green" :
                  uuidHint.type === "userId" ? "text-crt-amber" :
                  "text-muted-foreground/60"
                }`}>
                  {uuidHint.type === "uuid" && "✓ "}
                  {uuidHint.type === "userId" && "✓ "}
                  {uuidHint.type === "anon" && "⚠ "}
                  {t(uuidHint.key)}
                </div>
              )}
              <button
                onClick={handleCheck}
                disabled={isLoading}
                className="px-6 py-2 bg-crt-green/10 border border-crt-green/40 text-crt-green text-sm font-semibold uppercase tracking-wider hover:bg-crt-green/20 hover:border-crt-green/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isLoading ? t("input.buttonScanning") : t("input.buttonCheck")}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-3 text-xs text-crt-red">
                {error}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="mt-4 text-xs text-muted-foreground space-y-1">
                <TypewriterText text={t("input.loading1")} speed={20} />
                <br />
                <TypewriterText text={t("input.loading2")} speed={20} />
                <br />
                <TypewriterText text={t("input.loading3")} speed={20} />
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {showResult && buddy && (
          <div ref={resultRef} className="mb-12">
            <BuddyResultCard buddy={buddy} />
          </div>
        )}

        {/* Daily Species */}
        <div className="mb-12">
          <DailySpecies variant="home" />
        </div>

        {/* Species Grid Section */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            {t("species.title")}
          </h2>
          <div className="border border-border glow-border overflow-hidden mb-4">
            <LazyImage
              src={GRID_IMG}
              alt={t("species.gridAlt")}
              width={2528}
              height={1696}
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SPECIES.map((s) => (
              <Link
                key={s}
                href={`/species/${s}`}
                className="text-center text-xs py-2 px-1 border border-border/30 bg-card/30 uppercase tracking-wider text-muted-foreground hover:text-crt-green hover:border-crt-green/30 transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/species"
              className="inline-block text-xs text-crt-green/60 hover:text-crt-green border border-crt-green/20 hover:border-crt-green/40 px-4 py-2 transition-all"
            >
              {t("speciesIndex.viewDetails")} → /species
            </Link>
          </div>
        </div>

        {/* Rarity Table */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            {t("rarity.title")}
          </h2>
          <div className="border border-border bg-card overflow-hidden">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="text-left px-4 py-3 uppercase tracking-wider">{t("rarity.colRarity")}</th>
                  <th className="text-left px-4 py-3 uppercase tracking-wider">{t("rarity.colChance")}</th>
                  <th className="text-left px-4 py-3 uppercase tracking-wider">{t("rarity.colStatFloor")}</th>
                  <th className="text-left px-4 py-3 uppercase tracking-wider">{t("rarity.colStars")}</th>
                </tr>
              </thead>
              <tbody>
                {rarityRows.map((r) => (
                  <tr key={r.name} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className={`px-4 py-3 font-semibold uppercase ${r.cls}`}>{r.name}</td>
                    <td className="px-4 py-3">{r.chance}</td>
                    <td className="px-4 py-3">{r.floor}</td>
                    <td className={`px-4 py-3 ${r.cls}`}>{r.stars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Community Stats */}
        <CommunityStats />

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            {t("howItWorks.title")}
          </h2>
          <div className="border border-border bg-card p-4 sm:p-6 text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p dangerouslySetInnerHTML={{
              __html: t("howItWorks.p1")
                .replace(/<code>/g, '<code class="text-crt-amber bg-secondary/50 px-1">')
                .replace(/<strong>/g, '<span class="text-foreground">')
                .replace(/<\/strong>/g, '</span>')
            }} />
            <p dangerouslySetInnerHTML={{
              __html: t("howItWorks.p2")
                .replace(/<strong>/g, '<span class="text-foreground">')
                .replace(/<\/strong>/g, '</span>')
            }} />
            <p>{t("howItWorks.p3")}</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            {t("faq.title")}
          </h2>
          <div className="space-y-3">
            {dict.faq.items.map((item, i) => (
              <div key={i} className="border border-border/30 bg-card/50 p-4">
                <p className="text-sm font-semibold text-crt-amber mb-1">
                  &gt; {item.q}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Blog Posts */}
        <div className="mb-12">
          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold glow-text">
              {t("blog.latestTitle")}
            </h2>
            <Link
              href="/blog"
              className="text-[10px] uppercase tracking-wider text-crt-green/50 hover:text-crt-green border border-crt-green/15 hover:border-crt-green/40 px-3 py-1.5 transition-all"
            >
              {t("blog.viewAll")} →
            </Link>
          </div>

          <div className="space-y-4">
            {getAllArticles().slice(0, 3).map((article, idx) => {
              const ac = article.content[locale as keyof typeof article.content];
              const pubDate = new Date(article.publishedAt);
              const dateStr = pubDate.toLocaleDateString(
                locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-US",
                { year: "numeric", month: "short", day: "numeric" }
              );
              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block border border-border bg-card p-4 sm:p-5 hover:border-crt-green/50 transition-all group"
                >
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="text-crt-green/60">{idx === 0 ? "►" : "·"}</span>
                    <time dateTime={article.publishedAt}>{dateStr}</time>
                    <span className="text-border">·</span>
                    <span>{article.readingTime} {t("blog.minRead")}</span>
                    <span className="text-border">·</span>
                    <div className="flex items-center gap-1.5">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 border border-crt-green/15 text-crt-green/50 group-hover:border-crt-green/30 group-hover:text-crt-green/70 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-foreground group-hover:text-crt-green transition-colors mb-2 leading-snug">
                    {ac.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {ac.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-wider text-crt-green/40 group-hover:text-crt-green transition-colors">
                    <span>{t("blog.readMore")}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/30 pt-6 pb-8 text-center text-xs text-muted-foreground space-y-2">
          <p>{t("footer.line1")}</p>
          <p>{t("footer.line2")}</p>
          <p className="text-crt-green/40">
            {"> "}EOF
          </p>
        </footer>
      </div>
    </div>
  );
}
