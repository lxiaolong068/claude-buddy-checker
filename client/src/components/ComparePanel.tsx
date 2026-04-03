/**
 * ComparePanel - Side-by-side species comparison modal
 * Shows stats (demo values), category, peak stat, and tags for 2-3 selected species
 * CRT Terminal aesthetic with full-screen overlay
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import {
  STAT_NAMES,
  STAT_COLORS,
  BODIES,
  type Species,
  type StatName,
} from "@/lib/buddy-engine";
import { SPECIES_DATA } from "@/lib/species-data";

interface ComparePanelProps {
  slugs: Species[];
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  animal: "#33ff33",
  creature: "#58a6ff",
  mythical: "#af87ff",
  object: "#ffd700",
};

function getDemoStats(peakStat: string): Record<string, number> {
  return Object.fromEntries(STAT_NAMES.map((s) => [s, s === peakStat ? 78 : 42]));
}

export default function ComparePanel({ slugs, onClose }: ComparePanelProps) {
  const { t } = useI18n();

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Max value per stat across all selected species (for highlighting)
  const maxPerStat = Object.fromEntries(
    STAT_NAMES.map((stat) => {
      const vals = slugs.map((s) => getDemoStats(SPECIES_DATA[s].peakStat)[stat]);
      return [stat, Math.max(...vals)];
    })
  );

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0a0a0a]/97 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-w-4xl mx-auto my-4 sm:my-8 px-4 pb-8">
        <div className="border border-[#33ff33]/30 bg-[#0a0a0a]">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#33ff33]/20">
            <span className="w-2 h-2 rounded-full bg-[#ff5555]" />
            <span className="w-2 h-2 rounded-full bg-[#ffd700]" />
            <span className="w-2 h-2 rounded-full bg-[#33ff33]" />
            <span className="ml-2 text-[10px] text-[#33ff33]/50 uppercase tracking-widest flex-1">
              {t("comparePanel.title")}
            </span>
            <button
              onClick={onClose}
              className="text-[10px] text-[#33ff33]/40 hover:text-[#33ff33] active:text-[#33ff33] transition-colors uppercase tracking-wider px-2 py-1.5 -my-1.5 -mr-1"
            >
              [{t("comparePanel.close")}]
            </button>
          </div>

          {/* Comparison Table */}
          <div className="relative">
            {/* Right-fade scroll hint — visible on small screens to indicate horizontal scroll */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 md:hidden" />
          <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse">
              <colgroup>
                <col style={{ width: "72px", minWidth: "72px" }} />
                {slugs.map((s) => (
                  <col key={s} style={{ minWidth: "160px" }} />
                ))}
              </colgroup>

              {/* Header: ASCII + Name + Category */}
              <thead>
                <tr>
                  <th />
                  {slugs.map((slug) => {
                    const info = SPECIES_DATA[slug];
                    const ascii = BODIES[slug][0]
                      .map((line) => line.replaceAll("{E}", info.defaultEye))
                      .join("\n");
                    return (
                      <th
                        key={slug}
                        className="text-center px-3 py-3 border-l border-[#33ff33]/15 font-normal"
                      >
                        <pre className="text-[8px] leading-[10px] text-[#33ff33]/55 mb-2 inline-block text-left">
                          {ascii}
                        </pre>
                        <div className="text-[11px] font-bold text-[#33ff33]/90 mb-0.5">
                          {t(`speciesDetail.speciesNames.${slug}`)}
                        </div>
                        <span
                          className="text-[9px] uppercase tracking-wider"
                          style={{ color: CATEGORY_COLORS[info.category] }}
                        >
                          {t(
                            `speciesDetail.category${info.category.charAt(0).toUpperCase() + info.category.slice(1)}`
                          )}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {/* Peak Stat Row */}
                <tr className="border-t border-[#33ff33]/15">
                  <td className="text-[9px] text-[#33ff33]/40 uppercase tracking-wider py-2.5 pr-2">
                    {t("comparePanel.rowPeakStat")}
                  </td>
                  {slugs.map((slug) => {
                    const { peakStat } = SPECIES_DATA[slug];
                    const color = STAT_COLORS[peakStat as StatName] ?? "#33ff33";
                    return (
                      <td
                        key={slug}
                        className="text-center px-3 py-2.5 border-l border-[#33ff33]/15"
                      >
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color }}
                        >
                          {peakStat}
                        </span>
                      </td>
                    );
                  })}
                </tr>

                {/* Stat Rows */}
                {STAT_NAMES.map((stat) => {
                  const color = STAT_COLORS[stat];
                  return (
                    <tr key={stat} className="border-t border-[#33ff33]/8">
                      <td
                        className="text-[9px] uppercase tracking-wider py-2 pr-2"
                        style={{ color: `${color}80` }}
                      >
                        {stat}
                      </td>
                      {slugs.map((slug) => {
                        const val = getDemoStats(SPECIES_DATA[slug].peakStat)[stat];
                        const isHighest = val === maxPerStat[stat];
                        return (
                          <td
                            key={slug}
                            className="px-3 py-1.5 border-l border-[#33ff33]/8"
                          >
                            <div className="flex items-center gap-1.5">
                              <div className="flex-1 h-1.5 bg-[#33ff33]/8">
                                <div
                                  style={{
                                    width: `${val}%`,
                                    backgroundColor: color,
                                    opacity: isHighest ? 1 : 0.35,
                                  }}
                                  className="h-full"
                                />
                              </div>
                              <span
                                className="text-[9px] w-5 text-right tabular-nums shrink-0"
                                style={{ color: isHighest ? color : `${color}55` }}
                              >
                                {val}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Tags Row */}
                <tr className="border-t border-[#33ff33]/15">
                  <td className="text-[9px] text-[#33ff33]/40 uppercase tracking-wider py-2.5 pr-2 align-top">
                    {t("comparePanel.rowTags")}
                  </td>
                  {slugs.map((slug) => (
                    <td
                      key={slug}
                      className="px-3 py-2.5 border-l border-[#33ff33]/15"
                    >
                      <div className="flex flex-wrap gap-1 justify-center">
                        {SPECIES_DATA[slug].tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] text-[#33ff33]/40 border border-[#33ff33]/15 px-1 py-0.5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Action Row */}
                <tr className="border-t border-[#33ff33]/15">
                  <td />
                  {slugs.map((slug) => (
                    <td
                      key={slug}
                      className="text-center px-3 py-2.5 border-l border-[#33ff33]/15"
                    >
                      <Link
                        href={`/species/${slug}`}
                        onClick={onClose}
                        className="text-[10px] text-[#33ff33]/50 hover:text-[#33ff33] transition-colors uppercase tracking-wider"
                      >
                        {t("comparePanel.viewDetails")}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          </div>

          {/* Footer Note */}
          <div className="px-4 pb-3 pt-1 border-t border-[#33ff33]/10">
            <p className="text-[9px] text-[#33ff33]/20 italic">
              * {t("comparePanel.demoNote")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
