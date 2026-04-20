/**
 * ToolsHubSection — Homepage tool grid
 * Repositions claudebuddy.art from "Buddy checker" to "Claude Code developer toolkit".
 * Rendered near the bottom of the Home page, above the footer.
 */

import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";

// Accent colors cycle for the tool cards (CRT palette)
const ICON_COLORS = [
  "text-crt-green",
  "text-crt-amber",
  "text-crt-purple",
  "text-crt-green",
  "text-crt-blue",
  "text-crt-green",
  "text-crt-amber",
  "text-crt-green",
];

const BORDER_HOVER = [
  "hover:border-crt-green/50",
  "hover:border-crt-amber/50",
  "hover:border-crt-purple/50",
  "hover:border-crt-green/50",
  "hover:border-crt-blue/50",
  "hover:border-crt-green/50",
  "hover:border-crt-amber/50",
  "hover:border-crt-green/50",
];

export default function ToolsHubSection() {
  const { t, dict } = useI18n();

  return (
    <div className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-sm font-bold text-crt-green tracking-widest">
          {t("toolsHub.title")}
        </h2>
        <div className="flex-1 h-px bg-crt-green/15" />
      </div>
      <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
        {t("toolsHub.subtitle")}
      </p>

      {/* Tool grid: 2 cols on mobile, 4 on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {dict.toolsHub.tools.map((tool, i) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group border border-border/30 bg-card/20 p-3 transition-all ${BORDER_HOVER[i % BORDER_HOVER.length]}`}
          >
            {/* Icon + label row */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className={`text-base leading-none ${ICON_COLORS[i % ICON_COLORS.length]} group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {tool.label}
              </span>
            </div>
            {/* Description */}
            <p className="text-[10px] text-muted-foreground/60 leading-snug group-hover:text-muted-foreground transition-colors">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
