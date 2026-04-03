/**
 * ThemeToggle - CRT-styled day/night mode switch
 * Design: Terminal button matching LanguageSwitcher aesthetic
 */

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, switchable } = useTheme();

  if (!switchable || !toggleTheme) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs uppercase tracking-wider text-muted-foreground hover:text-crt-green hover:border-crt-green/40 transition-all"
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      title={isDark ? "Switch to day mode" : "Switch to night mode"}
    >
      <span className="text-crt-green">{isDark ? "☾" : "☀"}</span>
      <span>{isDark ? "night" : "day"}</span>
    </button>
  );
}
