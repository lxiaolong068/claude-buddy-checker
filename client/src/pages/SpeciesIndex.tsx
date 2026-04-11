/**
 * Species Index Page - /species
 * CRT Terminal Style | Lists all 18 buddy species with filters and links
 * Design: Grid of ASCII art cards with category filters
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import { Link, useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { SPECIES_DATA, ALL_SPECIES_SLUGS } from "@/lib/species-data";
import { BODIES, type Species } from "@/lib/buddy-engine";
import ComparePanel from "@/components/ComparePanel";
import DailySpecies from "@/components/DailySpecies";
import ThemeToggle from "@/components/ThemeToggle";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";

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
      className={`px-2.5 py-1.5 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap ${
        active
          ? "border-[#33ff33]/60 bg-[#33ff33]/15 text-[#33ff33]"
          : "border-[#33ff33]/20 text-[#33ff33]/40 hover:border-[#33ff33]/35 hover:text-[#33ff33]/60 active:border-[#33ff33]/50 active:text-[#33ff33]/80"
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
      className={`px-2 py-1 text-[10px] uppercase tracking-wider border transition-all whitespace-nowrap ${
        active
          ? "border-[#ffd700]/60 bg-[#ffd700]/10 text-[#ffd700]"
          : "border-[#33ff33]/15 text-[#33ff33]/35 hover:border-[#ffd700]/30 hover:text-[#33ff33]/55 active:border-[#ffd700]/40 active:text-[#33ff33]/70"
      }`}
    >
      {children}
    </button>
  );
}

export default function SpeciesIndex() {
  const { t, locale } = useI18n();
  const [, navigate] = useLocation();
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [isRolling, setIsRolling] = useState(false);
  const [peakStatFilter, setPeakStatFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [selectedSlugs, setSelectedSlugs] = useState<Species[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleSelect = useCallback((slug: Species) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length >= 3
          ? prev
          : [...prev, slug]
    );
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Random species navigation with slot-machine animation
  const handleRandomSpecies = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    // Pick a random species
    const randomIndex = Math.floor(Math.random() * ALL_SPECIES_SLUGS.length);
    const target = ALL_SPECIES_SLUGS[randomIndex];
    // Brief animation delay then navigate
    setTimeout(() => {
      setIsRolling(false);
      navigate(`/species/${target}`);
    }, 600);
  }, [isRolling, navigate]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    // / — focus search input
    "/": (e) => {
      e.preventDefault();
      searchRef.current?.focus();
    },
    // Esc — clear search first, then clear selection
    // (ComparePanel handles its own Esc when open)
    "Escape": () => {
      if (showCompare) return;
      if (searchQuery) {
        setSearchQuery("");
        searchRef.current?.blur();
      } else if (selectedSlugs.length > 0) {
        setSelectedSlugs([]);
      }
    },
    // Enter — open compare panel when 2+ species selected
    "Enter": () => {
      if (!showCompare && selectedSlugs.length >= 2) {
        setShowCompare(true);
      }
    },
    // r — random species
    "r": () => {
      handleRandomSpecies();
    },
  });

  const speciesShortcuts = [
    { key: "/", label: t("shortcuts.search") },
    { key: "Esc", label: t("shortcuts.clear") },
    { key: "r", label: t("shortcuts.random") },
    { key: "Enter", label: "Compare" },
  ];

  // Update document title and meta description
  useEffect(() => {
    document.title = t("speciesIndex.title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t("speciesIndex.metaDesc"));
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `${SITE_URL}/species`);
  }, [t, locale]);

  useHreflangLinks(`${SITE_URL}/species`);

  const filtered = ALL_SPECIES_SLUGS.filter((s) => {
    const matchCat = filter === "all" || SPECIES_DATA[s].category === filter;
    const matchStat =
      peakStatFilter === "all" || SPECIES_DATA[s].peakStat === peakStatFilter;
    const speciesName = t(`speciesDetail.speciesNames.${s}`);
    const matchSearch =
      searchQuery === "" ||
      speciesName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchStat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff33] font-mono relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]" />
      <KeyboardShortcutsHelp shortcuts={speciesShortcuts} />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#33ff33]/20">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#33ff33]/60 hover:text-[#33ff33] transition-colors text-sm"
          >
            {t("speciesIndex.backHome")}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-[#33ff33]/40 text-xs">/species</span>
          </div>
        </div>
      </nav>

      <main className={`container max-w-6xl mx-auto px-4 pt-8 ${selectedSlugs.length > 0 ? "pb-28" : "pb-8"}`}>
        {/* Header */}
        <section
          className={`mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold tracking-wider mb-3">
                {t("speciesIndex.h1")}
              </h1>
              <p className="text-[#33ff33]/60 text-sm max-w-2xl leading-relaxed">
                {t("speciesIndex.subtitle")}
              </p>
            </div>
            <button
              onClick={handleRandomSpecies}
              disabled={isRolling}
              title={t("speciesIndex.randomExploreHint")}
              className={`group relative shrink-0 mt-1 px-4 py-2.5 border text-xs uppercase tracking-widest transition-all duration-300 overflow-hidden ${
                isRolling
                  ? "border-[#33ff33] bg-[#33ff33]/20 text-[#33ff33] cursor-wait"
                  : "border-[#33ff33]/30 text-[#33ff33]/60 hover:border-[#33ff33]/70 hover:text-[#33ff33] hover:bg-[#33ff33]/10 active:bg-[#33ff33]/20"
              }`}
            >
              {/* Animated background sweep on hover */}
              <span className="absolute inset-0 bg-[#33ff33]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative flex items-center gap-2">
                <span className={`inline-block transition-transform duration-500 ${isRolling ? "animate-spin" : "group-hover:rotate-180"}`}>
                  ⚄
                </span>
                {t("speciesIndex.randomExplore")}
              </span>
            </button>
          </div>
        </section>

        {/* Daily Species */}
        <section
          className={`mb-8 transition-all duration-700 delay-75 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <DailySpecies variant="species" />
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

              {/* Search Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-[#33ff33]/50 uppercase tracking-wider font-semibold min-w-[60px]">
                  {t("speciesIndex.searchLabel")}:
                </span>
                <div className="relative flex items-center flex-1 min-w-[120px] sm:flex-none sm:w-44">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("speciesIndex.searchPlaceholder")}
                    className="w-full bg-transparent border border-[#33ff33]/20 text-[#33ff33]/80 text-[10px] px-2 py-1 pr-8 outline-none placeholder:text-[#33ff33]/25 focus:border-[#33ff33]/50 transition-colors tracking-wider"
                  />
                  {/* Keyboard hint — hidden when input has value or is focused */}
                  {!searchQuery && (
                    <span className="pointer-events-none absolute right-2 text-[9px] text-[#33ff33]/20 font-mono select-none">
                      [/]
                    </span>
                  )}
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[10px] text-[#ff5555]/60 hover:text-[#ff5555] uppercase tracking-wider transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Results Count + Clear */}
              <div className="flex items-center justify-between pt-1 border-t border-[#33ff33]/10">
                <span className="text-[10px] text-[#33ff33]/35 tracking-wider">
                  <span className="text-[#33ff33]/70 font-semibold">
                    {filtered.length}
                  </span>{" "}
                  {t("speciesIndex.resultsCount")}
                </span>
                {(peakStatFilter !== "all" || searchQuery !== "") && (
                  <button
                    onClick={() => { setPeakStatFilter("all"); setSearchQuery(""); }}
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
              <SpeciesCard
                key={slug}
                slug={slug}
                index={idx}
                isSelected={selectedSlugs.includes(slug)}
                isDisabled={
                  selectedSlugs.length >= 3 && !selectedSlugs.includes(slug)
                }
                onToggle={toggleSelect}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#33ff33]/10 mt-12 py-6 text-center">
        <p className="text-[#33ff33]/30 text-xs">{t("footer.line1")}</p>
        <p className="text-[#33ff33]/20 text-xs mt-1">{t("footer.line2")}</p>
      </footer>

      {/* Compare Dock — slides in when at least 1 species selected */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 border-t border-[#33ff33]/30 bg-[#0a0a0a]/97 backdrop-blur transition-transform duration-300 ${
          selectedSlugs.length > 0 ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          {/* Count badge */}
          <span className="text-[10px] text-[#33ff33]/50 uppercase tracking-wider shrink-0">
            {selectedSlugs.length} {t("speciesIndex.compareSelected")}
          </span>

          {/* Selected species pills */}
          <div className="flex gap-1.5 flex-wrap flex-1">
            {selectedSlugs.map((slug) => (
              <span
                key={slug}
                className="flex items-center gap-1 text-[9px] text-[#33ff33]/70 border border-[#33ff33]/30 px-1.5 py-1"
              >
                {t(`speciesDetail.speciesNames.${slug}`)}
                <button
                  onClick={() => toggleSelect(slug)}
                  className="text-[#33ff33]/40 hover:text-[#ff5555] active:text-[#ff5555] transition-colors ml-0.5 p-1 -m-1"
                  aria-label="remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setSelectedSlugs([])}
              className="text-[10px] text-[#33ff33]/30 hover:text-[#33ff33]/60 transition-colors uppercase tracking-wider"
            >
              [{t("speciesIndex.compareClearAll")}]
            </button>
            <button
              onClick={() => selectedSlugs.length >= 2 && setShowCompare(true)}
              disabled={selectedSlugs.length < 2}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider border transition-all ${
                selectedSlugs.length >= 2
                  ? "border-[#33ff33]/60 bg-[#33ff33]/15 text-[#33ff33] hover:bg-[#33ff33]/25"
                  : "border-[#33ff33]/20 text-[#33ff33]/30 cursor-not-allowed"
              }`}
            >
              {selectedSlugs.length < 2
                ? t("speciesIndex.compareSelectMore")
                : <>{t("speciesIndex.compareOpen")} <span className="opacity-40 font-normal normal-case tracking-normal">[↵]</span></>}
            </button>
          </div>
        </div>
      </div>

      {/* Compare Panel Modal */}
      {showCompare && (
        <ComparePanel
          slugs={selectedSlugs}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}

function SpeciesCard({
  slug,
  index,
  isSelected,
  isDisabled,
  onToggle,
}: {
  slug: Species;
  index: number;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (slug: Species) => void;
}) {
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
    <div
      className={`relative border bg-[#0d1a0d]/40 transition-all group ${
        isSelected
          ? "border-[#33ff33]/60 bg-[#0d1a0d]/80"
          : isDisabled
            ? "border-[#33ff33]/8 opacity-50"
            : "border-[#33ff33]/15 hover:border-[#33ff33]/40 hover:bg-[#0d1a0d]/80 cursor-pointer"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => !isDisabled && onToggle(slug)}
    >
      {/* Select toggle — top-right corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) onToggle(slug);
        }}
        className={`absolute top-2 right-2 z-10 w-5 h-5 border text-[9px] flex items-center justify-center transition-all ${
          isSelected
            ? "border-[#33ff33]/80 bg-[#33ff33]/20 text-[#33ff33]"
            : isDisabled
              ? "border-[#33ff33]/10 text-transparent cursor-not-allowed"
              : "border-[#33ff33]/25 text-transparent hover:border-[#33ff33]/50 hover:text-[#33ff33]/50"
        }`}
        aria-label={isSelected ? "deselect" : "select for comparison"}
      >
        ✓
      </button>

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

        {/* View link — real navigation, stops card toggle propagation */}
        <div className="mt-3 text-center">
          <Link
            href={`/species/${slug}`}
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] text-[#33ff33]/30 hover:text-[#33ff33]/60 transition-colors"
          >
            {t("speciesIndex.viewDetails")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
