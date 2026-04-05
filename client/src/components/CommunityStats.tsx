/**
 * CommunityStats Component
 * Design: CRT terminal style, two-column layout (global | personal)
 * Performance: lazy-loaded, memoized, minimal re-renders
 * Data: global stats from deterministic seed, personal from localStorage
 */

import { useState, useEffect, useMemo, memo } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { getGlobalStats, getUserStats, type GlobalStats, type UserStats } from "@/lib/community-stats";

// ─── Animated Counter ────────────────────────────────────────────
function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    const start = performance.now();
    const startVal = 0;
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(startVal + (value - startVal) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{display.toLocaleString()}</>;
}

// ─── Rarity Bar (horizontal stacked) ─────────────────────────────
const RarityBar = memo(function RarityBar({ data }: { data: GlobalStats["rarityBreakdown"] }) {
  return (
    <div className="flex h-4 w-full overflow-hidden border border-border/30">
      {data.map((r) => (
        <div
          key={r.rarity}
          className="h-full transition-all duration-700 relative group"
          style={{ width: `${r.percentage}%`, backgroundColor: r.color }}
          title={`${r.rarity}: ${r.percentage}%`}
        >
          {r.percentage >= 10 && (
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-black/70 font-bold uppercase">
              {r.percentage}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
});

// ─── Species Mini Bar ────────────────────────────────────────────
const SpeciesMiniBar = memo(function SpeciesMiniBar({
  species,
  percentage,
  maxPercentage,
  rank,
}: {
  species: string;
  percentage: number;
  maxPercentage: number;
  rank: number;
}) {
  const barWidth = (percentage / maxPercentage) * 100;
  const isTop3 = rank <= 3;

  return (
    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono">
      <span className={`w-4 text-right ${isTop3 ? "text-crt-amber" : "text-muted-foreground"}`}>
        {rank}.
      </span>
      <span className={`w-16 sm:w-20 uppercase truncate ${isTop3 ? "text-crt-green" : "text-muted-foreground"}`}>
        {species}
      </span>
      <div className="flex-1 h-2.5 bg-secondary/30 overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${barWidth}%`,
            backgroundColor: isTop3 ? "var(--crt-green)" : "var(--crt-green-dim, rgba(51,255,51,0.3))",
          }}
        />
      </div>
      <span className="w-10 text-right text-muted-foreground">{percentage}%</span>
    </div>
  );
});

// ─── Stat Row ────────────────────────────────────────────────────
function StatRow({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/10 last:border-0">
      <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider">{label}</span>
      <span className={`text-xs sm:text-sm font-mono ${highlight ? "text-crt-amber" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────
export default function CommunityStats() {
  const { t } = useI18n();
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load: only compute stats when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    const el = document.getElementById("community-stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute stats only when visible
  useEffect(() => {
    if (!isVisible) return;
    // Use requestIdleCallback for non-critical computation
    const compute = () => {
      setGlobalStats(getGlobalStats());
      setUserStats(getUserStats());
    };
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(compute);
    } else {
      setTimeout(compute, 50);
    }
  }, [isVisible]);

  // Listen for new queries (custom event from Home page)
  useEffect(() => {
    const handler = () => {
      setUserStats(getUserStats());
    };
    window.addEventListener("buddy-query", handler);
    return () => window.removeEventListener("buddy-query", handler);
  }, []);

  // Top 6 species for display
  const topSpecies = useMemo(() => {
    if (!globalStats) return [];
    return globalStats.speciesPopularity.slice(0, 6);
  }, [globalStats]);

  const maxPercentage = topSpecies[0]?.percentage || 1;

  // Format date
  const formatDate = (ts: number | null) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div id="community-stats-section" className="mb-12">
      <h2 className="text-lg font-bold glow-text mb-4">
        {t("communityStats.title")}
      </h2>

      {/* Skeleton while loading */}
      {!globalStats ? (
        <div className="border border-border bg-card p-6 animate-pulse">
          <div className="h-4 bg-secondary/30 rounded w-1/3 mb-4" />
          <div className="h-20 bg-secondary/20 rounded mb-4" />
          <div className="h-4 bg-secondary/30 rounded w-1/2" />
        </div>
      ) : (
        <div className="border border-border bg-card overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-secondary/10">
            <span className="w-2 h-2 rounded-full bg-crt-red" />
            <span className="w-2 h-2 rounded-full bg-crt-amber" />
            <span className="w-2 h-2 rounded-full bg-crt-green" />
            <span className="ml-2 text-[10px] text-muted-foreground uppercase tracking-widest">
              community_stats.sh
            </span>
            <span className="ml-auto text-[10px] text-crt-green/40 font-mono">
              {new Date().toISOString().split("T")[0]}
            </span>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {/* Left: Global Stats */}
            <div className="p-4 sm:p-5">
              <div className="text-[10px] text-crt-green uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crt-green animate-pulse" />
                {t("communityStats.globalTitle")}
              </div>

              {/* Big Numbers */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="border border-border/20 bg-secondary/10 p-3">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                    {t("communityStats.totalChecked")}
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-crt-green">
                    <AnimatedNumber value={globalStats.totalBuddiesChecked} />
                  </div>
                </div>
                <div className="border border-border/20 bg-secondary/10 p-3">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                    {t("communityStats.activeExplorers")}
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-crt-amber">
                    <AnimatedNumber value={globalStats.activeExplorers} duration={2000} />
                  </div>
                </div>
              </div>

              {/* Species Ranking */}
              <div className="mb-4">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  {t("communityStats.speciesRanking")}
                </div>
                <div className="space-y-1">
                  {topSpecies.map((s, i) => (
                    <SpeciesMiniBar
                      key={s.species}
                      species={s.species}
                      percentage={s.percentage}
                      maxPercentage={maxPercentage}
                      rank={i + 1}
                    />
                  ))}
                </div>
              </div>

              {/* Rarity Pool */}
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                  {t("communityStats.rarityPool")}
                </div>
                <RarityBar data={globalStats.rarityBreakdown} />
                <div className="flex justify-between mt-1.5 text-[9px] text-muted-foreground font-mono">
                  {globalStats.rarityBreakdown.map((r) => (
                    <span key={r.rarity} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 inline-block" style={{ backgroundColor: r.color }} />
                      {r.rarity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Personal Stats */}
            <div className="p-4 sm:p-5">
              <div className="text-[10px] text-crt-amber uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="font-mono">&gt;_</span>
                {t("communityStats.yourStats")}
              </div>

              {userStats && userStats.totalQueries > 0 ? (
                <div>
                  <StatRow
                    label={t("communityStats.yourQueries")}
                    value={userStats.totalQueries}
                    highlight
                  />
                  <StatRow
                    label={t("communityStats.uniqueUuids")}
                    value={userStats.uniqueUuids}
                  />
                  <StatRow
                    label={t("communityStats.favoriteSpecies")}
                    value={userStats.favoriteSpecies?.toUpperCase() || "—"}
                    highlight
                  />
                  <StatRow
                    label={t("communityStats.rarestFind")}
                    value={userStats.rarestFind?.toUpperCase() || "—"}
                  />
                  <StatRow
                    label={t("communityStats.firstSeen")}
                    value={formatDate(userStats.firstQueryDate)}
                  />

                  {/* Personal species distribution mini chart */}
                  {Object.keys(userStats.speciesDistribution).length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/20">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                        {t("communityStats.speciesRanking")}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(userStats.speciesDistribution)
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 8)
                          .map(([species, count]) => (
                            <span
                              key={species}
                              className="inline-flex items-center gap-1 text-[10px] font-mono border border-border/30 bg-secondary/20 px-2 py-0.5"
                            >
                              <span className="text-crt-green uppercase">{species}</span>
                              <span className="text-muted-foreground">x{count}</span>
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <pre className="text-crt-green/30 text-[10px] leading-tight mb-3 select-none">{`  .----.
 ( ·  · )
 (      )
  \`----´`}</pre>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                    {t("communityStats.noQueries")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-2 border-t border-border/20 bg-secondary/5">
            <p className="text-[9px] text-muted-foreground/60 font-mono">
              {t("communityStats.disclaimer")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
