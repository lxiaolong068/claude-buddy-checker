/**
 * StatBar - Terminal-style stat bar with color coding
 * Design: CRT Terminal aesthetic
 */

import { type StatName, STAT_COLORS } from "@/lib/buddy-engine";

interface StatBarProps {
  name: StatName;
  value: number;
  delay?: number;
}

export default function StatBar({ name, value, delay = 0 }: StatBarProps) {
  const color = STAT_COLORS[name];
  const barWidth = Math.min(100, Math.max(0, value));

  return (
    <div
      className="flex items-center gap-3 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="w-24 text-xs uppercase tracking-wider opacity-70 shrink-0">
        {name}
      </span>
      <div className="flex-1 h-3 bg-secondary/50 border border-border/50 relative overflow-hidden">
        <div
          className="h-full stat-bar-animate"
          style={{
            width: `${barWidth}%`,
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}60, 0 0 12px ${color}30`,
            animationDelay: `${delay + 200}ms`,
          }}
        />
      </div>
      <span
        className="w-8 text-right text-xs font-semibold tabular-nums"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}
