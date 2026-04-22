import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import {
  SPECIES,
  RARITIES,
  RARITY_STARS,
  renderSprite,
  type BuddyResult,
} from "@/lib/buddy-engine";
import { getCollection, type CollectionEntry } from "@/lib/storage";
import { useI18n } from "@/contexts/I18nContext";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import SiteHeader from "@/components/SiteHeader";
import PageSchema from "@/components/PageSchema";

// ── Rarity styles ────────────────────────────────────────────────────────────

const RARITY_TEXT: Record<string, string> = {
  common:    "text-crt-green",
  uncommon:  "glow-text",
  rare:      "text-crt-blue",
  epic:      "text-crt-purple",
  legendary: "glow-text-amber",
};

const RARITY_BAR: Record<string, string> = {
  common:    "bg-crt-green/50",
  uncommon:  "bg-crt-green",
  rare:      "bg-crt-blue",
  epic:      "bg-crt-purple",
  legendary: "bg-crt-gold",
};

// ── Mini sprite (static frame 0) ─────────────────────────────────────────────

function MiniSprite({ entry }: { entry: CollectionEntry }) {
  const buddy: BuddyResult = {
    species: entry.species,
    rarity:  entry.rarity,
    shiny:   entry.shiny,
    hat:     entry.hat,
    eye:     entry.eye,
    stats:   entry.stats,
  };
  const lines = renderSprite(buddy, 0);
  return (
    <pre
      className={`text-[7px] leading-tight font-mono select-none whitespace-pre ${RARITY_TEXT[entry.rarity]} ${entry.shiny ? "shiny-sparkle" : ""}`}
      style={{
        textShadow:
          entry.rarity === "rare"
            ? "0 0 3px rgba(88,166,255,0.5)"
            : entry.rarity === "epic"
              ? "0 0 3px rgba(175,135,255,0.5)"
              : undefined,
      }}
    >
      {lines.join("\n")}
    </pre>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CollectionPage() {
  const { t } = useI18n();
  const [entries, setEntries] = useState<CollectionEntry[]>([]);

  useHreflangLinks(`${SITE_URL}/collection`);

  const loadCollection = useCallback(() => {
    setEntries(getCollection().entries);
  }, []);

  useEffect(() => {
    loadCollection();
    window.addEventListener("buddy-query", loadCollection);
    return () => window.removeEventListener("buddy-query", loadCollection);
  }, [loadCollection]);

  // Most recent entry per species (entries are newest-first)
  const bySpecies = new Map<string, CollectionEntry>();
  for (const e of entries) {
    if (!bySpecies.has(e.species)) bySpecies.set(e.species, e);
  }

  // Rarity counts across all queries
  const rarityCounts: Record<string, number> = Object.fromEntries(
    RARITIES.map((r) => [r, 0])
  );
  for (const e of entries) rarityCounts[e.rarity] = (rarityCounts[e.rarity] || 0) + 1;

  const discoveredCount = bySpecies.size;
  const totalEntries   = entries.length;

  return (
    <div className="min-h-screen bg-background">
      <PageSchema
        pageUrl={`${SITE_URL}/collection`}
        name={t("collection.title")}
        description={t("collection.subtitle")}
        breadcrumbs={[
          { name: "Home", path: "" },
          { name: "Collection", path: "/collection" },
        ]}
      />
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-4 py-8 font-mono">

        {/* ── Header ── */}
        <div className="mb-6">
          <h1 className="text-2xl text-crt-green glow-text tracking-widest">
            {t("collection.title")}
          </h1>
          <p className="text-crt-green/50 text-xs mt-1">
            {t("collection.subtitle")}
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className="border border-crt-green/20 bg-crt-green/5 rounded px-4 py-3 mb-8 flex gap-8 text-xs">
          <div>
            <span className="text-crt-green/50">{t("collection.speciesProgress")}: </span>
            <span className="text-crt-green font-bold">{discoveredCount}</span>
            <span className="text-crt-green/40"> / 18</span>
          </div>
          <div>
            <span className="text-crt-green/50">{t("collection.total")}: </span>
            <span className="text-crt-green font-bold">{totalEntries}</span>
          </div>
        </div>

        {/* ── 18-species grid ── */}
        <h2 className="text-crt-green/70 text-xs uppercase tracking-widest mb-3">
          {t("collection.speciesProgress")}
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-10">
          {SPECIES.map((species) => {
            const entry       = bySpecies.get(species);
            const isDiscovered = !!entry;
            return (
              <div
                key={species}
                className={`border rounded p-2 text-center transition-colors flex flex-col items-center gap-0.5 ${
                  isDiscovered
                    ? "border-crt-green/30 bg-crt-green/5"
                    : "border-crt-green/10 opacity-25"
                }`}
              >
                {isDiscovered ? (
                  <>
                    <MiniSprite entry={entry!} />
                    <div className={`text-[8px] uppercase font-bold mt-0.5 ${RARITY_TEXT[entry!.rarity]}`}>
                      {species}
                    </div>
                    <div className="text-[7px] text-crt-green/40 leading-none">
                      {RARITY_STARS[entry!.rarity]}
                    </div>
                    {entry!.shiny && (
                      <div className="text-[7px] text-crt-gold shiny-sparkle leading-none">
                        ✦
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-[10px] text-crt-green/20 py-2 leading-none">
                      {t("collection.undiscovered")}
                    </div>
                    <div className="text-[8px] text-crt-green/15 uppercase">
                      {species}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Rarity distribution ── */}
        <h2 className="text-crt-green/70 text-xs uppercase tracking-widest mb-3">
          {t("collection.rarityProgress")}
        </h2>
        <div className="border border-crt-green/20 bg-crt-green/5 rounded p-4 mb-10 space-y-3">
          {RARITIES.map((rarity) => {
            const count = rarityCounts[rarity] || 0;
            const pct   = totalEntries > 0 ? (count / totalEntries) * 100 : 0;
            return (
              <div key={rarity} className="flex items-center gap-3 text-xs">
                <div className={`w-20 uppercase ${RARITY_TEXT[rarity]}`}>{rarity}</div>
                <div className="flex-1 h-1.5 bg-crt-green/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${RARITY_BAR[rarity]} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-6 text-right text-crt-green/50">{count}</div>
              </div>
            );
          })}
        </div>

        {/* ── Recent discoveries ── */}
        <h2 className="text-crt-green/70 text-xs uppercase tracking-widest mb-3">
          {t("collection.recentDiscoveries")}
        </h2>

        {entries.length === 0 ? (
          <div className="border border-crt-green/20 rounded p-8 text-center">
            <p className="text-crt-green/40 text-sm mb-4">{t("collection.empty")}</p>
            <Link
              href="/"
              className="text-crt-green text-xs border border-crt-green/40 px-4 py-2 rounded hover:bg-crt-green/10 transition-colors"
            >
              {t("collection.goCheck")}
            </Link>
          </div>
        ) : (
          <div className="space-y-1.5">
            {entries.slice(0, 20).map((entry) => (
              <div
                key={entry.uuid}
                className="border border-crt-green/15 bg-crt-green/3 rounded px-4 py-2 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`uppercase font-bold ${RARITY_TEXT[entry.rarity]}`}>
                    {entry.species}
                  </span>
                  {entry.shiny && (
                    <span className="text-crt-gold shiny-sparkle text-[10px]">
                      {t("collection.shinyBadge")}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-crt-green/40">
                  <span className={`text-[10px] ${RARITY_TEXT[entry.rarity]}`}>
                    {RARITY_STARS[entry.rarity]}
                  </span>
                  <span>{new Date(entry.discoveredAt).toLocaleDateString()}</span>
                  <span className="hidden sm:inline text-crt-green/20 font-mono">
                    {entry.uuid.slice(0, 8)}…
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
