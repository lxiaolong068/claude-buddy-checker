/**
 * ScrollToTop - CRT Terminal Style Floating Button
 * Design: Phosphor green bordered button fixed at bottom-right
 * Behavior: Appears after scrolling 400px, smooth scroll to top on click
 * Features: Fade-in/out animation, scanline texture, ASCII arrow glyph
 */

import { useState, useEffect, useCallback } from "react";

const SCROLL_THRESHOLD = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-[10000]
        w-10 h-10
        flex items-center justify-center
        border border-crt-green/50
        bg-black/80 backdrop-blur-sm
        text-crt-green
        transition-all duration-300 ease-in-out
        hover:border-crt-green hover:bg-crt-green/10
        hover:shadow-[0_0_12px_rgba(51,255,51,0.3)]
        active:scale-90
        ${visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      {/* ASCII-style up arrow */}
      <span className="text-sm font-bold leading-none tracking-tighter select-none">
        ^
      </span>

      {/* Subtle scanline overlay */}
      <span
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(51,255,51,0.08) 1px, rgba(51,255,51,0.08) 2px)",
        }}
      />
    </button>
  );
}
