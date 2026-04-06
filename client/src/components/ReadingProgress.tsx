/**
 * ReadingProgress - CRT Terminal Style Reading Progress Bar
 * Design: Fixed top bar showing scroll progress through blog article
 * Performance: Uses requestAnimationFrame for smooth updates, passive scroll listener
 * Only renders on blog post pages
 */

import { useState, useEffect, useRef, useCallback } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      setVisible(false);
      return;
    }

    const pct = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    setProgress(pct);
    // Show bar after scrolling past 50px
    setVisible(scrollTop > 50);
  }, []);

  const handleScroll = useCallback(() => {
    // Throttle via rAF
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      updateProgress();
      rafRef.current = null;
    });
  }, [updateProgress]);

  useEffect(() => {
    // Initial calculation
    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, updateProgress]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      {/* Background track */}
      <div className="h-[3px] bg-border/20 w-full">
        {/* Progress fill */}
        <div
          className="h-full transition-[width] duration-75 ease-out"
          style={{
            width: `${progress}%`,
            background:
              progress >= 100
                ? "var(--crt-amber)"
                : "var(--crt-green)",
            boxShadow:
              progress >= 100
                ? "0 0 8px var(--crt-amber), 0 0 16px var(--crt-amber)"
                : "0 0 6px var(--crt-green), 0 0 12px var(--crt-green)",
          }}
        />
      </div>

      {/* Percentage indicator - appears on the right */}
      <div
        className={`absolute top-[5px] right-3 text-[9px] font-mono tracking-widest transition-opacity duration-200 ${
          visible && progress > 2 ? "opacity-70" : "opacity-0"
        }`}
        style={{
          color:
            progress >= 100
              ? "var(--crt-amber)"
              : "var(--crt-green)",
          textShadow:
            progress >= 100
              ? "0 0 4px var(--crt-amber)"
              : "0 0 4px var(--crt-green)",
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}
