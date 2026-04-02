/**
 * Home Page - Claude Buddy Checker
 * Design: Retro CRT Terminal (phosphor green on black)
 * Layout: Narrow centered column simulating 80-col terminal
 * i18n: All user-facing text via useI18n()
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { rollBuddy, type BuddyResult, SPECIES } from "@/lib/buddy-engine";
import BuddyResultCard from "@/components/BuddyResultCard";
import TypewriterText from "@/components/TypewriterText";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/contexts/I18nContext";

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

  // Update document title when locale changes
  useEffect(() => {
    document.title = t("meta.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("meta.description"));
    }
  }, [locale, t]);

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
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 800);
  }, [uuid, t]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCheck();
  };

  const rarityRows = [
    { name: t("rarity.common"), chance: "60%", floor: "5", stars: "★", cls: "rarity-common" },
    { name: t("rarity.uncommon"), chance: "25%", floor: "15", stars: "★★", cls: "rarity-uncommon" },
    { name: t("rarity.rare"), chance: "10%", floor: "25", stars: "★★★", cls: "rarity-rare" },
    { name: t("rarity.epic"), chance: "4%", floor: "35", stars: "★★★★", cls: "rarity-epic" },
    { name: t("rarity.legendary"), chance: "1%", floor: "50", stars: "★★★★★", cls: "rarity-legendary" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* CRT Scan Lines Overlay */}
      <div className="crt-scanlines" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Top Bar: Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* ASCII Logo */}
        <div className="mb-8 overflow-hidden">
          <pre className="text-[6px] sm:text-[8px] md:text-[10px] leading-none font-mono text-center glow-text select-none whitespace-pre">
            {ASCII_LOGO}
          </pre>
        </div>

        {/* Hero Image */}
        <div className="mb-8 border border-border glow-border overflow-hidden">
          <img
            src={HERO_IMG}
            alt={t("hero.imgAlt")}
            className="w-full h-auto opacity-90"
            width={2752}
            height={1536}
            loading="eager"
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
            <div className="mb-4 text-xs text-muted-foreground space-y-2">
              <p className="text-crt-green">{t("input.howToFind")}</p>
              <p>
                <span className="text-crt-amber">{t("input.option1Label")}</span> {t("input.option1Text")}{" "}
                <code className="text-foreground bg-secondary/50 px-1.5 py-0.5">
                  {t("input.option1Code")}
                </code>
              </p>
              <p>
                <span className="text-crt-amber">{t("input.option2Label")}</span> {t("input.option2Text")}{" "}
                <code className="text-foreground bg-secondary/50 px-1.5 py-0.5">
                  {t("input.option2Code")}
                </code>
              </p>
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
              </div>
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

        {/* Species Grid Section */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            {t("species.title")}
          </h2>
          <div className="border border-border glow-border overflow-hidden mb-4">
            <img
              src={GRID_IMG}
              alt={t("species.gridAlt")}
              className="w-full h-auto opacity-90"
              width={2528}
              height={1696}
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SPECIES.map((s) => (
              <div
                key={s}
                className="text-center text-xs py-2 px-1 border border-border/30 bg-card/30 uppercase tracking-wider text-muted-foreground hover:text-crt-green hover:border-crt-green/30 transition-colors"
              >
                {s}
              </div>
            ))}
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
