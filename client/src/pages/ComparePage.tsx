/**
 * Compare Page — /compare
 * Side-by-side stat comparison of two Buddies via UUID inputs.
 * Pre-filled from ?a= query param (linked from BuddyProfilePage).
 * RadarChart via recharts.
 */

import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  rollBuddy,
  SPECIES_DISPLAY,
  RARITY_STARS,
  STAT_NAMES,
  renderSprite,
  type BuddyResult,
} from "@/lib/buddy-engine";
import { useI18n } from "@/contexts/I18nContext";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";

// ── Rarity colors ─────────────────────────────────────────────────────────────

const RARITY_TEXT: Record<string, string> = {
  common:    "text-crt-green",
  uncommon:  "glow-text",
  rare:      "text-crt-blue",
  epic:      "text-crt-purple",
  legendary: "glow-text-amber",
};

// ── Mini sprite ───────────────────────────────────────────────────────────────

function MiniSprite({ buddy }: { buddy: BuddyResult }) {
  const lines = renderSprite(buddy, 0);
  return (
    <pre
      className={`text-[9px] leading-tight font-mono select-none whitespace-pre ${RARITY_TEXT[buddy.rarity]}`}
    >
      {lines.join("\n")}
    </pre>
  );
}

// ── Buddy summary card ────────────────────────────────────────────────────────

function BuddySummaryCard({
  buddy,
  uuid,
  label,
  color,
}: {
  buddy: BuddyResult;
  uuid: string;
  label: string;
  color: string;
}) {
  const { t } = useI18n();
  return (
    <div
      className={`border rounded p-4 flex flex-col items-center gap-2 bg-background/50`}
      style={{ borderColor: `${color}40` }}
    >
      <div className="text-xs text-crt-green/40 uppercase tracking-widest">{label}</div>
      <MiniSprite buddy={buddy} />
      <div className={`text-sm font-bold uppercase tracking-wider ${RARITY_TEXT[buddy.rarity]}`}>
        {SPECIES_DISPLAY[buddy.species]}
      </div>
      <div className="text-xs" style={{ color }}>
        {RARITY_STARS[buddy.rarity]} {buddy.rarity}
      </div>
      {buddy.shiny && (
        <div className="text-[10px] text-crt-gold shiny-sparkle">✦ SHINY</div>
      )}
      <Link
        href={`/buddy/${uuid}`}
        className="text-[10px] text-crt-green/50 hover:text-crt-green mt-1 transition-colors"
      >
        {t("compare.viewProfile")}
      </Link>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ComparePage() {
  const { t } = useI18n();

  // Pre-fill UUID A from ?a= query param (linked from BuddyProfilePage)
  const [uuidA, setUuidA] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("a") ?? "";
  });
  const [uuidB, setUuidB] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("b") ?? "";
  });

  useHreflangLinks(`${SITE_URL}/compare`);

  useEffect(() => {
    document.title = "Buddy Compare — claudebuddy.art";
  }, []);

  // Compute buddies only when both UUIDs are filled
  const buddyA = uuidA.trim() ? rollBuddy(uuidA.trim()) : null;
  const buddyB = uuidB.trim() ? rollBuddy(uuidB.trim()) : null;
  const canCompare = !!(buddyA && buddyB);

  // Radar chart data
  const radarData = canCompare
    ? STAT_NAMES.map((stat) => ({
        stat,
        A: buddyA!.stats[stat],
        B: buddyB!.stats[stat],
      }))
    : [];

  // Stat win counts
  const winsA = canCompare
    ? STAT_NAMES.filter((s) => buddyA!.stats[s] > buddyB!.stats[s]).length
    : 0;
  const winsB = canCompare
    ? STAT_NAMES.filter((s) => buddyB!.stats[s] > buddyA!.stats[s]).length
    : 0;

  const colorA = "#33ff33";
  const colorB = "#58a6ff";

  return (
    <div className="min-h-screen bg-background">
      <PageSchema
        pageUrl={`${SITE_URL}/compare`}
        name={t("compare.title")}
        description={t("compare.subtitle")}
        breadcrumbs={[
          { name: "Home", path: "" },
          { name: "Compare Buddies", path: "/compare" },
        ]}
      />
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 py-8 font-mono">

        {/* ── Header ── */}
        <div className="mb-6">
          <h1 className="text-xl text-crt-green glow-text tracking-widest">{t("compare.title")}</h1>
          <p className="text-crt-green/40 text-xs mt-1">{t("compare.subtitle")}</p>
        </div>

        {/* ── UUID inputs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* UUID A */}
          <div>
            <label className="block text-xs text-crt-green/50 uppercase tracking-wider mb-1">
              {t("compare.labelA")}
            </label>
            <input
              type="text"
              value={uuidA}
              onChange={(e) => setUuidA(e.target.value)}
              placeholder={t("compare.placeholder")}
              className="w-full bg-background border border-crt-green/30 text-crt-green text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-crt-green/70 placeholder:text-crt-green/20"
              style={{ borderColor: uuidA.trim() ? `${colorA}50` : undefined }}
            />
          </div>
          {/* UUID B */}
          <div>
            <label className="block text-xs text-crt-green/50 uppercase tracking-wider mb-1">
              {t("compare.labelB")}
            </label>
            <input
              type="text"
              value={uuidB}
              onChange={(e) => setUuidB(e.target.value)}
              placeholder={t("compare.placeholder")}
              className="w-full bg-background border border-crt-blue/30 text-crt-green text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-crt-blue/70 placeholder:text-crt-green/20"
              style={{ borderColor: uuidB.trim() ? `${colorB}50` : undefined }}
            />
          </div>
        </div>

        {/* ── Comparison results ── */}
        {!canCompare ? (
          <div className="border border-crt-green/15 rounded p-8 text-center text-crt-green/30 text-sm">
            {t("compare.enterBoth")}
          </div>
        ) : (
          <>
            {/* Side-by-side buddy cards */}
            <div className="grid grid-cols-3 gap-4 mb-8 items-center">
              <BuddySummaryCard buddy={buddyA!} uuid={uuidA.trim()} label={t("compare.labelA")} color={colorA} />

              {/* VS divider */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-crt-green/30 text-lg font-bold tracking-widest">
                  {t("compare.vsLabel")}
                </div>
                <div className="text-xs text-crt-green/40 text-center">
                  <div style={{ color: colorA }}>A: {winsA} {t("compare.statWins")}</div>
                  <div style={{ color: colorB }}>B: {winsB} {t("compare.statWins")}</div>
                </div>
              </div>

              <BuddySummaryCard buddy={buddyB!} uuid={uuidB.trim()} label={t("compare.labelB")} color={colorB} />
            </div>

            {/* Radar chart */}
            <div className="border border-crt-green/20 bg-crt-green/3 rounded p-4 mb-6">
              <div className="text-xs text-crt-green/60 uppercase tracking-widest mb-4">
                {t("compare.radarTitle")}
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData} outerRadius={110}>
                  <PolarGrid stroke="#1a5a1a" strokeOpacity={0.5} />
                  <PolarAngleAxis
                    dataKey="stat"
                    tick={{ fill: "#4a7a4a", fontSize: 10, fontFamily: "monospace" }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#4a7a4a", fontSize: 8 }}
                    tickCount={4}
                  />
                  <Radar
                    name={SPECIES_DISPLAY[buddyA!.species]}
                    dataKey="A"
                    stroke={colorA}
                    fill={colorA}
                    fillOpacity={0.15}
                  />
                  <Radar
                    name={SPECIES_DISPLAY[buddyB!.species]}
                    dataKey="B"
                    stroke={colorB}
                    fill={colorB}
                    fillOpacity={0.15}
                  />
                  <Legend
                    wrapperStyle={{ fontFamily: "monospace", fontSize: 11, color: "#4a7a4a" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#141414",
                      border: "1px solid #1a5a1a",
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#33ff33",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Stat-by-stat breakdown */}
            <div className="space-y-2">
              {STAT_NAMES.map((stat) => {
                const vA = buddyA!.stats[stat];
                const vB = buddyB!.stats[stat];
                const winner = vA > vB ? "A" : vB > vA ? "B" : null;
                return (
                  <div key={stat} className="flex items-center gap-3 text-xs">
                    <div
                      className="w-4 text-center text-[10px] font-bold"
                      style={{ color: winner === "A" ? colorA : "transparent" }}
                    >
                      ▶
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      {/* A bar */}
                      <div className="flex-1 flex justify-end items-center gap-1">
                        <span className="text-crt-green/60 w-6 text-right">{vA}</span>
                        <div className="w-24 h-2 bg-crt-green/10 rounded-full overflow-hidden flex justify-end">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${vA}%`,
                              backgroundColor: colorA,
                              opacity: winner === "A" ? 1 : 0.4,
                            }}
                          />
                        </div>
                      </div>
                      {/* Stat name */}
                      <div className="w-20 text-center text-crt-green/50 uppercase text-[10px]">{stat}</div>
                      {/* B bar */}
                      <div className="flex-1 flex items-center gap-1">
                        <div className="w-24 h-2 bg-crt-green/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${vB}%`,
                              backgroundColor: colorB,
                              opacity: winner === "B" ? 1 : 0.4,
                            }}
                          />
                        </div>
                        <span className="text-crt-green/60 w-6">{vB}</span>
                      </div>
                    </div>
                    <div
                      className="w-4 text-center text-[10px] font-bold"
                      style={{ color: winner === "B" ? colorB : "transparent" }}
                    >
                      ◀
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
