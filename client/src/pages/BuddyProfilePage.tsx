/**
 * Buddy Profile Page — /buddy/:uuid
 * Permanent shareable URL for any UUID's deterministic Buddy.
 * Reuses BuddyResultCard for full display + share card generation.
 * Meta tags set client-side; OG image wired to Edge Function (Task 3.5).
 */

import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "wouter";
import {
  rollBuddy,
  SPECIES_DISPLAY,
  RARITY_STARS,
  STAT_NAMES,
} from "@/lib/buddy-engine";
import BuddyResultCard from "@/components/BuddyResultCard";
import { useI18n } from "@/contexts/I18nContext";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import SiteHeader from "@/components/SiteHeader";

// ── JSON-LD breadcrumb ────────────────────────────────────────────────────────

function BreadcrumbSchema({ uuid }: { uuid: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Buddy Profile", item: `${SITE_URL}/buddy/${uuid}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BuddyProfilePage() {
  const params  = useParams<{ uuid: string }>();
  const uuid    = params.uuid ?? "";
  const { t }   = useI18n();
  const [copied, setCopied] = useState(false);

  // Deterministic — no async, no loading state
  const buddy = rollBuddy(uuid);
  const species = SPECIES_DISPLAY[buddy.species];
  const pageUrl = `${SITE_URL}/buddy/${uuid}`;
  const shinyTag = buddy.shiny ? " ✦ SHINY" : "";

  // ── Preset social share copy ─────────────────────────────────────────────────
  const twitterText = `My Claude Code Buddy: ${buddy.rarity} ${species}${shinyTag}! Discover yours 👇 #MyClaudeBuddy #ClaudeCode`;
  const redditTitle = `My Claude Code Buddy is a ${buddy.rarity} ${species}${shinyTag} — found via claudebuddy.art`;

  const twitterUrl  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(pageUrl)}`;
  const redditUrl   = `https://reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(redditTitle)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

  const canWebShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  useHreflangLinks(pageUrl);

  // Dynamic meta tags per UUID
  useEffect(() => {
    const shortId = uuid.slice(0, 8);
    const topStat = STAT_NAMES.reduce((a, b) =>
      buddy.stats[a] >= buddy.stats[b] ? a : b
    );

    document.title = `${species} (${buddy.rarity}) — ${shortId}… | claudebuddy.art`;

    const desc = `UUID ${shortId}… is a ${buddy.rarity} ${species} Buddy with ${topStat} affinity${buddy.shiny ? " ✦ SHINY" : ""}. Discovered via claudebuddy.art — the eternal record of every Claude Code Buddy.`;

    const setMeta = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute("content", val);

    setMeta('meta[name="description"]',          desc);
    setMeta('meta[property="og:title"]',         `${species} Buddy — ${shortId}… | claudebuddy.art`);
    setMeta('meta[property="og:description"]',   desc);
    setMeta('meta[property="og:url"]',           pageUrl);
    setMeta('meta[property="og:image"]',         `${SITE_URL}/api/og/buddy/${uuid}`);
    setMeta('meta[name="twitter:title"]',        `${species} Buddy — ${shortId}…`);
    setMeta('meta[name="twitter:description"]',  desc);
    setMeta('meta[name="twitter:image"]',        `${SITE_URL}/api/og/buddy/${uuid}`);
  }, [uuid, buddy, species, pageUrl]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = pageUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [pageUrl]);

  const handleWebShare = useCallback(async () => {
    try {
      await navigator.share({
        title: `${species}${shinyTag} Buddy — claudebuddy.art`,
        text: `My Claude Code Buddy is a ${buddy.rarity} ${species}${shinyTag}! Check yours:`,
        url: pageUrl,
      });
    } catch {
      // User dismissed or API unavailable — ignore
    }
  }, [species, shinyTag, buddy.rarity, pageUrl]);

  if (!uuid) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono">
        <p className="text-crt-red text-sm">ERROR: No UUID provided</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <BreadcrumbSchema uuid={uuid} />

      <div className="max-w-2xl mx-auto px-4 py-8 font-mono">

        {/* ── Header ── */}
        <div className="mb-6">
          <h1 className="text-xl text-crt-green glow-text tracking-widest">
            {t("buddyProfile.title")}
          </h1>

          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="text-crt-green/30">{t("buddyProfile.uuidLabel")}</span>
            <span className="text-crt-green/50 font-mono break-all">{uuid}</span>
          </div>
        </div>

        {/* ── Buddy card (full display with share) ── */}
        <BuddyResultCard buddy={buddy} />

        {/* ── Actions row ── */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleCopyLink}
            className={`text-xs border px-4 py-2 rounded transition-colors font-mono ${
              copied
                ? "border-crt-green/60 bg-crt-green/10 text-crt-green"
                : "border-crt-green/30 text-crt-green/70 hover:border-crt-green/60 hover:text-crt-green"
            }`}
          >
            {copied ? t("buddyProfile.linkCopied") : t("buddyProfile.copyLink")}
          </button>

          <Link
            href={`/compare?a=${uuid}`}
            className="text-xs border border-crt-amber/30 text-crt-amber/70 hover:border-crt-amber/60 hover:text-crt-amber px-4 py-2 rounded transition-colors"
          >
            {t("buddyProfile.compareWith")}
          </Link>
        </div>

        {/* ── Social share ── */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-crt-green/25 uppercase tracking-widest mr-1 select-none">
            {t("buddyProfile.shareSection")}
          </span>

          {canWebShare && (
            <button
              onClick={handleWebShare}
              className="text-[10px] border border-crt-green/20 text-crt-green/50 hover:border-crt-green/50 hover:text-crt-green px-3 py-1.5 rounded transition-colors font-mono"
            >
              ↑ SHARE
            </button>
          )}

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] border border-crt-green/20 text-crt-green/50 hover:border-crt-green/50 hover:text-crt-green px-3 py-1.5 rounded transition-colors font-mono"
          >
            X / TWITTER
          </a>

          <a
            href={redditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] border border-crt-amber/20 text-crt-amber/50 hover:border-crt-amber/50 hover:text-crt-amber px-3 py-1.5 rounded transition-colors font-mono"
          >
            REDDIT
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] border border-crt-blue/20 text-crt-blue/50 hover:border-crt-blue/50 hover:text-crt-blue px-3 py-1.5 rounded transition-colors font-mono"
          >
            LINKEDIN
          </a>
        </div>

        {/* ── Permanent note ── */}
        <p className="mt-6 text-xs text-crt-green/30 border-t border-crt-green/10 pt-4">
          {t("buddyProfile.permanentNote")}
        </p>

        {/* ── Rarity stars visual separator ── */}
        <div className="mt-3 text-crt-green/20 text-xs text-center tracking-widest select-none">
          {RARITY_STARS[buddy.rarity]}
        </div>

      </div>
    </div>
  );
}
