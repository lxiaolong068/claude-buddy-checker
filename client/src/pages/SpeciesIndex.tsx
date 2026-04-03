/**
 * Species Index Page - /species
 * CRT Terminal Style | Lists all 18 buddy species with filters and links
 * Design: Grid of ASCII art cards with category filters
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { SPECIES_DATA, ALL_SPECIES_SLUGS } from "@/lib/species-data";
import { BODIES, type Species } from "@/lib/buddy-engine";

type CategoryFilter = "all" | "animal" | "creature" | "mythical" | "object";

const FILTERS: { key: CategoryFilter; labelKey: string }[] = [
  { key: "all", labelKey: "speciesIndex.filterAll" },
  { key: "animal", labelKey: "speciesIndex.filterAnimal" },
  { key: "creature", labelKey: "speciesIndex.filterCreature" },
  { key: "mythical", labelKey: "speciesIndex.filterMythical" },
  { key: "object", labelKey: "speciesIndex.filterObject" },
];

const PEAK_STATS = ["PATIENCE", "CHAOS", "WISDOM", "SNARK", "DEBUGGING"] as const;

function CategoryButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap ${
        active
          ? "border-[#33ff33]/60 bg-[#33ff33]/15 text-[#33ff33]"
          : "border-[#33ff33]/20 text-[#33ff33]/40 hover:border-[#33ff33]/35 hover:text-[#33ff33]/60"
      }`}
    >
      {children}
    </button>
  );
}

function PeakStatButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap ${
        active
          ? "border-[#ffd700]/60 bg-[#ffd700]/10 text-[#ffd700]"
          : "border-[#33ff33]/15 text-[#33ff33]/35 hover:border-[#ffd700]/30 hover:text-[#33ff33]/55"
      }`}
    >
      {children}
    </button>
  );
}

export default function SpeciesIndex() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [peakStatFilter, setPeakStatFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update document title
  useEffect(() => {
    document.title = t("speciesIndex.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("speciesIndex.metaDesc"));
    }
  }, [t, locale]);

  const filtered = ALL_SPECIES_SLUGS.filter((s) => {
    const matchCat = filter === "all" || SPECIES_DATA[s].category === filter;
    const matchStat =
      peakStatFilter === "all" || SPECIES_DATA[s].peakStat === peakStatFilter;
    return matchCat && matchStat;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff33] font-mono relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#33ff33]/20">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#33ff33]/60 hover:text-[#33ff33] transition-colors text-sm"
          >
            {t("speciesIndex.backHome")}
          </Link>
          <span className="text-[#33ff33]/40 text-xs">/species</span>
        </div>
      </nav>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <section
          className={`mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider mb-3">
            {t("speciesIndex.h1")}
          </h1>
          <p className="text-[#33ff33]/60 text-sm max-w-2xl leading-relaxed">
            {t("speciesIndex.subtitle")}
          </p>
        </section>

        {/* Filter Toolbar */}
        <section
          className={`mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="border border-[#33ff33]/20 bg-[#0d1a0d]/30">
            {/* Toolbar Header */}
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#33ff33]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#33ff33]/60" />
              <span className="text-[9px] text-[#33ff33]/40 uppercase tracking-widest">
                query_options
              </span>
            </div>

            <div className="p-3 space-y-3">
              {/* Category Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-[#33ff33]/50 uppercase tracking-wider font-semibold min-w-[60px]">
                  {t("speciesIndex.filterByCategory")}:
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {FILTERS.map(({ key, labelKey }) => (
                    <CategoryButton
                      key={key}
                      active={filter === key}
                      onClick={() => setFilter(key)}
                    >
                      {t(labelKey)}
                      <span className="ml-1 opacity-40">
                        (
                        {key === "all"
                          ? ALL_SPECIES_SLUGS.length
                          : ALL_SPECIES_SLUGS.filter(
                              (s) => SPECIES_DATA[s].category === key
                            ).length}
                        )
                      </span>
                    </CategoryButton>
                  ))}
                </div>
              </div>

              {/* Peak Stat Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-[#ffd700]/50 uppercase tracking-wider font-semibold min-w-[60px]">
                  {t("speciesIndex.filterByPeakStat")}:
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  <PeakStatButton
                    active={peakStatFilter === "all"}
                    onClick={() => setPeakStatFilter("all")}
                  >
                    {t("speciesIndex.peakStatAll")}
                  </PeakStatButton>
                  {PEAK_STATS.map((stat) => (
                    <PeakStatButton
                      key={stat}
                      active={peakStatFilter === stat}
                      onClick={() => setPeakStatFilter(stat)}
                    >
                      {t(`speciesIndex.peakStat${stat}`)}
                    </PeakStatButton>
                  ))}
                </div>
              </div>

              {/* Results Count + Clear */}
              <div className="flex items-center justify-between pt-1 border-t border-[#33ff33]/10">
                <span className="text-[10px] text-[#33ff33]/35 tracking-wider">
                  <span className="text-[#33ff33]/70 font-semibold">
                    {filtered.length}
                  </span>{" "}
                  {t("speciesIndex.resultsCount")}
                </span>
                {peakStatFilter !== "all" && (
                  <button
                    onClick={() => setPeakStatFilter("all")}
                    className="text-[10px] text-[#ff5555]/60 hover:text-[#ff5555] uppercase tracking-wider transition-colors"
                  >
                    [{t("speciesIndex.clearFilter")}]
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Species Grid */}
        <section
          className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((slug, idx) => (
              <SpeciesCard key={slug} slug={slug} index={idx} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#33ff33]/10 mt-12 py-6 text-center">
        <p className="text-[#33ff33]/30 text-xs">{t("footer.line1")}</p>
        <p className="text-[#33ff33]/20 text-xs mt-1">{t("footer.line2")}</p>
      </footer>
    </div>
  );
}

function SpeciesCard({ slug, index }: { slug: Species; index: number }) {
  const { t } = useI18n();
  const info = SPECIES_DATA[slug];
  const frames = BODIES[slug];
  const ascii = frames[0]
    .map((line) => line.replaceAll("{E}", info.defaultEye))
    .join("\n");

  const speciesName = t(`speciesDetail.speciesNames.${slug}`);

  const rarityColors: Record<string, string> = {
    animal: "#33ff33",
    creature: "#58a6ff",
    mythical: "#af87ff",
    object: "#ffd700",
  };

  return (
    <Link
      href={`/species/${slug}`}
      className="block border border-[#33ff33]/15 bg-[#0d1a0d]/40 hover:border-[#33ff33]/40 hover:bg-[#0d1a0d]/80 transition-all group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-4">
        {/* ASCII Art */}
        <pre className="text-[10px] leading-[12px] text-[#33ff33]/50 group-hover:text-[#33ff33]/80 transition-colors text-center mb-3 min-h-[60px] flex items-center justify-center">
          {ascii}
        </pre>

        {/* Divider */}
        <div className="border-t border-[#33ff33]/10 mb-3" />

        {/* Species Info */}
        <div className="text-center">
          <h2 className="text-sm font-bold text-[#33ff33]/80 group-hover:text-[#33ff33] transition-colors mb-1">
            {speciesName}
          </h2>
          <span
            className="text-[10px] uppercase"
            style={{ color: rarityColors[info.category] || "#33ff33" }}
          >
            {t(`speciesDetail.category${info.category.charAt(0).toUpperCase() + info.category.slice(1)}`)}
          </span>
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {info.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] text-[#33ff33]/30 border border-[#33ff33]/10 px-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* View link */}
        <div className="mt-3 text-center">
          <span className="text-[10px] text-[#33ff33]/30 group-hover:text-[#33ff33]/60 transition-colors">
            {t("speciesIndex.viewDetails")} →
          </span>
        </div>
      </div>
    </Link>
  );
}
