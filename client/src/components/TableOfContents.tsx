/**
 * TableOfContents - Sidebar navigation for Species Detail page
 * CRT Terminal Style | Sticky sidebar with section anchors and active state tracking
 * Design: Minimal vertical nav with phosphor green accents, scroll-spy highlighting
 * Performance: Uses IntersectionObserver for efficient scroll tracking
 */

import { useState, useEffect, useCallback, useMemo } from "react";

export interface TocItem {
  id: string;
  label: string;
  icon?: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
}

export default function TableOfContents({ items, title = "INDEX" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const ids = items.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by position, pick the one closest to the top
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Track scroll progress
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
        // Show TOC after scrolling past 150px
        setIsVisible(scrollTop > 150);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 56; // sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  }, []);

  // Compute active index for progress line
  const activeIndex = useMemo(() => {
    const idx = items.findIndex((item) => item.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [items, activeId]);

  return (
    <aside
      className={`hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      <div className="relative border border-[#33ff33]/20 bg-[#0a0a0a]/95 backdrop-blur-sm w-48">
        {/* Terminal title bar */}
        <div className="h-6 bg-[#0d1a0d] border-b border-[#33ff33]/20 flex items-center px-3 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
          <span className="text-[#33ff33]/50 text-[9px] ml-2 uppercase tracking-wider">
            {title}
          </span>
        </div>

        <div className="p-3 relative">
          {/* Vertical progress track */}
          <div className="absolute left-3 top-3 bottom-3 w-px bg-[#33ff33]/10">
            {/* Active segment */}
            <div
              className="absolute left-0 top-0 w-full bg-[#33ff33]/40 transition-all duration-300"
              style={{
                height: `${items.length > 1 ? (activeIndex / (items.length - 1)) * 100 : 0}%`,
              }}
            />
          </div>

          {/* TOC items */}
          <nav className="space-y-0.5 pl-4">
            {items.map((item, i) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left py-1.5 px-2 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 relative group block ${
                    isActive
                      ? "text-[#33ff33] bg-[#33ff33]/8"
                      : "text-[#33ff33]/35 hover:text-[#33ff33]/70 hover:bg-[#33ff33]/4"
                  }`}
                  title={item.label}
                >
                  {/* Active indicator dot */}
                  <span
                    className={`absolute -left-[13px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 transition-all duration-200 ${
                      isActive
                        ? "bg-[#33ff33] shadow-[0_0_4px_#33ff33]"
                        : "bg-[#33ff33]/15 group-hover:bg-[#33ff33]/40"
                    }`}
                  />
                  {/* Icon + Label */}
                  <span className="flex items-center gap-1.5">
                    {item.icon && (
                      <span className={`text-[9px] ${isActive ? "opacity-100" : "opacity-50"}`}>
                        {item.icon}
                      </span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Scroll progress bar at bottom */}
          <div className="mt-3 pt-2 border-t border-[#33ff33]/10">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-[#33ff33]/10 relative">
                <div
                  className="absolute left-0 top-0 h-full bg-[#33ff33]/50 transition-all duration-150"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[8px] text-[#33ff33]/40 tabular-nums w-7 text-right">
                {Math.round(progress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
