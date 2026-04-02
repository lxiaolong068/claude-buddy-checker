/**
 * SpeciesTooltip - CRT-style floating tooltip for related species cards
 * Pure CSS/React implementation (no Radix dependency for React 19 compat)
 * Shows species overview, stat bars, and personality traits on hover
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { STAT_NAMES, STAT_COLORS } from "@/lib/buddy-engine";
import type { SpeciesInfo } from "@/lib/species-data";
import { useI18n } from "@/contexts/I18nContext";

interface SpeciesTooltipProps {
  relInfo: SpeciesInfo;
  relName: string;
  relDesc: string;
  currentTags: string[];
  children: React.ReactNode;
}

export default function SpeciesTooltip({
  relInfo,
  relName,
  relDesc,
  currentTags,
  children,
}: SpeciesTooltipProps) {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const relCategoryKey = `speciesDetail.category${relInfo.category.charAt(0).toUpperCase() + relInfo.category.slice(1)}` as string;

  // Build stat tendencies
  const relStats = STAT_NAMES.map((s) => ({
    name: s,
    value: s === relInfo.peakStat ? 78 : 42,
    color: STAT_COLORS[s],
  }));

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    // If not enough space above (tooltip ~280px height), show below
    setPosition(rect.top > 300 ? "top" : "bottom");
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    showTimeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, 350);
  }, [calculatePosition]);

  const handleMouseLeave = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 150);
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`
          absolute left-1/2 -translate-x-1/2 w-72 z-[10001] pointer-events-none
          transition-all duration-200 ease-out
          ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"}
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          ${position === "top"
            ? (isVisible ? "translate-y-0" : "translate-y-2")
            : (isVisible ? "translate-y-0" : "-translate-y-2")
          }
        `}
        style={{ transformOrigin: position === "top" ? "bottom center" : "top center" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="border border-[#33ff33]/40 bg-[#0a0a0a]/95 backdrop-blur-sm shadow-[0_0_20px_rgba(51,255,51,0.15),0_0_40px_rgba(51,255,51,0.05)] font-mono relative overflow-hidden pointer-events-auto">
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_2px)]" />

          {/* Title bar */}
          <div className="border-b border-[#33ff33]/30 bg-[#0d1a0d] px-3 py-1.5 flex items-center justify-between relative">
            <span className="text-[#33ff33] text-[10px] font-bold tracking-wider">
              {relName.toUpperCase()}
            </span>
            <span className="text-[#33ff33]/40 text-[9px]">
              [{t(relCategoryKey).toUpperCase()}]
            </span>
          </div>

          {/* Content body */}
          <div className="p-3 space-y-2.5 relative">
            {/* Description excerpt */}
            <p className="text-[#33ff33]/60 text-[10px] leading-relaxed line-clamp-2">
              {relDesc}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#33ff33]/20 to-transparent" />

            {/* Stat bars mini */}
            <div className="space-y-1">
              <p className="text-[#33ff33]/40 text-[8px] uppercase tracking-widest mb-1">
                {t("speciesDetail.tooltipStats")}
              </p>
              {relStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <span className="text-[8px] w-16 text-[#33ff33]/40 uppercase tracking-wider shrink-0">
                    {stat.name}
                  </span>
                  <div className="flex-1 h-1.5 bg-[#33ff33]/5 border border-[#33ff33]/10 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: isVisible ? `${stat.value}%` : "0%",
                        backgroundColor: stat.color,
                        boxShadow: `0 0 4px ${stat.color}40`,
                        transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: isVisible ? "0.1s" : "0s",
                      }}
                    />
                  </div>
                  <span
                    className="text-[8px] w-5 text-right tabular-nums"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#33ff33]/20 to-transparent" />

            {/* Traits row */}
            <div>
              <p className="text-[#33ff33]/40 text-[8px] uppercase tracking-widest mb-1">
                {t("speciesDetail.tooltipTraits")}
              </p>
              <div className="flex flex-wrap gap-1">
                {relInfo.tags.map((tag) => {
                  const isShared = currentTags.includes(tag);
                  return (
                    <span
                      key={tag}
                      className={`text-[8px] px-1 py-px ${
                        isShared
                          ? "text-[#33ff33]/90 border border-[#33ff33]/40 bg-[#33ff33]/10"
                          : "text-[#33ff33]/40 border border-[#33ff33]/10"
                      }`}
                    >
                      #{tag}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom glow line */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#33ff33]/30 to-transparent" />

            {/* Click hint */}
            <p className="text-[#33ff33]/30 text-[8px] text-center tracking-wider">
              {t("speciesDetail.viewSpecies")} FULL PROFILE →
            </p>
          </div>

          {/* Arrow indicator */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 border-[#33ff33]/40 bg-[#0a0a0a]/95 rotate-45 ${
              position === "top"
                ? "bottom-0 translate-y-1/2 border-b border-r"
                : "top-0 -translate-y-1/2 border-t border-l"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
