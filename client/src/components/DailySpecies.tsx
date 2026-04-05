/**
 * DailySpecies - "Species of the Day" component
 * Uses a date-based seed to deterministically pick one species per day.
 * CRT terminal style, shows ASCII art, name, category, peak stat, and link.
 */

import { useMemo } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { SPECIES_DATA, ALL_SPECIES_SLUGS } from "@/lib/species-data";
import { BODIES, type Species } from "@/lib/buddy-engine";

/** Simple date-based hash to pick a species index */
function getDailySpeciesIndex(totalSpecies: number): number {
  const now = new Date();
  // Use UTC date to ensure consistency across timezones
  const dateStr = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % totalSpecies;
}

interface DailySpeciesProps {
  /** "home" uses card/border semantic colors; "species" uses raw #33ff33 colors */
  variant?: "home" | "species";
}

export default function DailySpecies({ variant = "home" }: DailySpeciesProps) {
  const { t } = useI18n();

  const dailySlug = useMemo(() => {
    const idx = getDailySpeciesIndex(ALL_SPECIES_SLUGS.length);
    return ALL_SPECIES_SLUGS[idx];
  }, []);

  const info = SPECIES_DATA[dailySlug];
  const speciesName = t(`speciesDetail.speciesNames.${dailySlug}`);
  const categoryKey = `speciesDetail.category${info.category.charAt(0).toUpperCase() + info.category.slice(1)}`;
  const categoryName = t(categoryKey);

  const ascii = BODIES[dailySlug as Species][0]
    .map((line) => line.replaceAll("{E}", info.defaultEye))
    .join("\n");

  const isHome = variant === "home";

  return (
    <Link
      href={`/species/${dailySlug}`}
      className={`block border transition-all group ${
        isHome
          ? "border-border bg-card hover:border-crt-green/50"
          : "border-[#33ff33]/20 bg-[#0d1a0d]/40 hover:border-[#33ff33]/50 hover:bg-[#0d1a0d]/80"
      }`}
    >
      {/* Terminal header bar */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 border-b ${
          isHome ? "border-border bg-card" : "border-[#33ff33]/15 bg-[#0d1a0d]"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isHome ? "bg-crt-green/60" : "bg-[#33ff33]/60"
          }`}
        />
        <span
          className={`text-[9px] uppercase tracking-widest ${
            isHome ? "text-muted-foreground" : "text-[#33ff33]/40"
          }`}
        >
          {t("dailySpecies.header")}
        </span>
        <span
          className={`ml-auto text-[9px] ${
            isHome ? "text-crt-green/40" : "text-[#33ff33]/30"
          }`}
        >
          {new Date().toLocaleDateString("en-CA")}
        </span>
      </div>

      <div className="p-4 flex items-center gap-4">
        {/* ASCII Art */}
        <pre
          className={`text-[9px] leading-[11px] shrink-0 transition-colors ${
            isHome
              ? "text-muted-foreground group-hover:text-crt-green"
              : "text-[#33ff33]/50 group-hover:text-[#33ff33]/80"
          }`}
        >
          {ascii}
        </pre>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-bold tracking-wider mb-1 transition-colors ${
              isHome
                ? "text-foreground group-hover:text-crt-green"
                : "text-[#33ff33]/80 group-hover:text-[#33ff33]"
            }`}
          >
            {speciesName}
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span
              className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                isHome
                  ? "border-border text-muted-foreground"
                  : "border-[#33ff33]/20 text-[#33ff33]/50"
              }`}
            >
              {categoryName}
            </span>
            <span
              className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                isHome
                  ? "border-[#ffd700]/20 text-[#ffd700]/70"
                  : "border-[#ffd700]/20 text-[#ffd700]/60"
              }`}
            >
              ★ {info.peakStat}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {info.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[8px] ${
                  isHome ? "text-muted-foreground/60" : "text-[#33ff33]/30"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
          <p
            className={`mt-2 text-[10px] uppercase tracking-wider transition-colors ${
              isHome
                ? "text-crt-green/40 group-hover:text-crt-green/70"
                : "text-[#33ff33]/30 group-hover:text-[#33ff33]/60"
            }`}
          >
            {t("dailySpecies.viewProfile")} →
          </p>
        </div>
      </div>
    </Link>
  );
}
