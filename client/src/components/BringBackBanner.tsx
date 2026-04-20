/**
 * BringBackBanner - Community petition banner for /buddy restoration
 * Matches CRT terminal aesthetic (phosphor green / amber on near-black)
 * Links to GitHub Issues tracking the community petition
 */

import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

// Live petition stats — update these manually as issue counts grow
const PETITION_STATS = {
  issues: 3,
  supporters: 511,
  issueUrl: "https://github.com/anthropics/claude-code/issues/45732",
  consolidatedUrl: "https://github.com/anthropics/claude-code/issues/45596",
};

export default function BringBackBanner() {
  const { t } = useI18n();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="mb-6 border border-crt-amber/60 bg-crt-amber/5 relative overflow-hidden"
      role="alert"
      aria-label={t("bringBack.ariaLabel")}
    >
      {/* Animated scan line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crt-amber/60 to-transparent" />

      <div className="px-4 py-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-crt-amber text-xs font-bold tracking-widest uppercase animate-pulse">
              ▶ {t("bringBack.tag")}
            </span>
            <span className="text-border/60 text-xs">|</span>
            <span className="text-xs text-muted-foreground font-mono">
              {t("bringBack.removed")}
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground/40 hover:text-muted-foreground text-xs px-1 transition-colors"
            aria-label={t("bringBack.dismiss")}
          >
            [×]
          </button>
        </div>

        {/* Main message */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          <span className="text-crt-amber font-semibold">{t("bringBack.headline")}</span>
          {" — "}
          {t("bringBack.body")}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-3 text-xs font-mono">
          <span className="text-crt-green">
            <span className="opacity-60">ISSUES //</span>{" "}
            <span className="font-bold">{PETITION_STATS.issues}</span>
          </span>
          <span className="text-crt-amber">
            <span className="opacity-60">SUPPORTERS //</span>{" "}
            <span className="font-bold">{PETITION_STATS.supporters}+</span>
          </span>
          <span className="text-muted-foreground/40 hidden sm:inline">
            github.com/anthropics/claude-code
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-2">
          <a
            href={PETITION_STATS.issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-crt-amber text-crt-amber hover:bg-crt-amber hover:text-black transition-all duration-150 font-mono tracking-wider"
          >
            ★ {t("bringBack.ctaSign")}
          </a>
          <a
            href={PETITION_STATS.consolidatedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border/50 text-muted-foreground hover:border-crt-amber/50 hover:text-crt-amber transition-all duration-150 font-mono"
          >
            {t("bringBack.ctaView")} →
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crt-amber/30 to-transparent" />
    </div>
  );
}
