/**
 * BuddyResultCard - Full buddy result display with share card integration
 * Design: CRT Terminal card with glow borders
 * i18n: All labels via useI18n()
 */

import { useState, useCallback } from "react";
import { type BuddyResult, RARITY_STARS, SPECIES_DISPLAY, STAT_NAMES } from "@/lib/buddy-engine";
import { useI18n } from "@/contexts/I18nContext";
import type { ShareCardBuddyData } from "@/lib/share-card-renderer";
import BuddySprite from "./BuddySprite";
import StatBar from "./StatBar";
import ShareButton from "./ShareButton";
import ShareCardModal from "./ShareCardModal";

interface BuddyResultCardProps {
  buddy: BuddyResult;
}

const RARITY_LABEL_COLORS: Record<string, string> = {
  common: "text-[oklch(0.70_0.05_145)] border-[oklch(0.70_0.05_145)]/30",
  uncommon: "text-crt-green border-crt-green/30",
  rare: "text-crt-blue border-crt-blue/30",
  epic: "text-crt-purple border-crt-purple/30",
  legendary: "text-crt-gold border-crt-gold/30",
};

const RARITY_GLOW: Record<string, string> = {
  common: "",
  uncommon: "shadow-[0_0_8px_oklch(0.85_0.25_145_/_0.2)]",
  rare: "shadow-[0_0_12px_oklch(0.65_0.18_250_/_0.3)]",
  epic: "shadow-[0_0_12px_oklch(0.65_0.20_300_/_0.3)]",
  legendary: "shadow-[0_0_16px_oklch(0.82_0.18_90_/_0.4)]",
};

export default function BuddyResultCard({ buddy }: BuddyResultCardProps) {
  const { t } = useI18n();
  const [shareData, setShareData] = useState<ShareCardBuddyData | null>(null);

  const rarityDisplayName = t(`rarity.${buddy.rarity}`);

  const handleShare = useCallback(() => {
    const data: ShareCardBuddyData = {
      type: "buddy",
      buddy,
      labels: {
        title: t("share.resultTitle"),
        species: t("share.labelSpecies"),
        rarity: rarityDisplayName,
        stats: t("share.labelStats"),
        shiny: t("share.labelShiny"),
        hat: t("share.labelHat"),
        eyes: t("share.labelEyes"),
        watermark: t("share.watermark"),
        checkYours: t("share.checkYours"),
        petitionLine1: t("share.petitionLine1"),
        petitionLine2: t("share.petitionLine2"),
      },
    };
    setShareData(data);
  }, [buddy, t, rarityDisplayName]);

  return (
    <>
      <div
        className={`border border-border bg-card p-6 sm:p-8 animate-fade-in-up ${RARITY_GLOW[buddy.rarity]}`}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
          <span className="w-2.5 h-2.5 rounded-full bg-crt-red" />
          <span className="w-2.5 h-2.5 rounded-full bg-crt-amber" />
          <span className="w-2.5 h-2.5 rounded-full bg-crt-green" />
          <span className="ml-3 text-xs text-muted-foreground uppercase tracking-widest">
            {t("result.terminalTitle")}
          </span>
        </div>

        {/* Species & Rarity Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold glow-text tracking-tight">
              {SPECIES_DISPLAY[buddy.species]}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs uppercase tracking-widest px-2 py-0.5 border ${RARITY_LABEL_COLORS[buddy.rarity]}`}
              >
                {RARITY_STARS[buddy.rarity]} {rarityDisplayName}
              </span>
              {buddy.shiny && (
                <span className="text-xs uppercase tracking-widest px-2 py-0.5 border border-crt-gold/30 text-crt-gold shiny-sparkle">
                  ✦ {t("result.shinyBadge")}
                </span>
              )}
            </div>
          </div>
          {/* Share Button */}
          <ShareButton onClick={handleShare} />
        </div>

        {/* Sprite + Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* ASCII Sprite */}
          <div className="flex items-center justify-center bg-background/50 border border-border/30 p-6">
            <BuddySprite buddy={buddy} />
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
              {t("result.attributes")}
            </div>
            <DetailRow label={t("result.labelSpecies")} value={buddy.species} />
            <DetailRow label={t("result.labelRarity")} value={rarityDisplayName} />
            <DetailRow label={t("result.labelEyes")} value={buddy.eye} />
            <DetailRow
              label={t("result.labelHat")}
              value={buddy.hat === "none" ? t("result.hatNone") : buddy.hat}
            />
            <DetailRow
              label={t("result.labelShiny")}
              value={buddy.shiny ? t("result.shinyYes") : t("result.shinyNo")}
            />
            <DetailRow
              label={t("result.labelRarityPct")}
              value={
                buddy.rarity === "common"
                  ? "60%"
                  : buddy.rarity === "uncommon"
                    ? "25%"
                    : buddy.rarity === "rare"
                      ? "10%"
                      : buddy.rarity === "epic"
                        ? "4%"
                        : "1%"
              }
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
            {t("result.stats")}
          </div>
          {STAT_NAMES.map((name, i) => (
            <StatBar key={name} name={name} value={buddy.stats[name]} delay={i * 100} />
          ))}
        </div>
      </div>

      {/* Share Card Modal */}
      <ShareCardModal
        data={shareData}
        onClose={() => setShareData(null)}
      />
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/20">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
