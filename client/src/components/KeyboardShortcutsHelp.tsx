/**
 * KeyboardShortcutsHelp - CRT Terminal Style Keyboard Shortcuts Overlay
 * Design: Floating panel showing available keyboard shortcuts
 * Toggle: Press ? to show/hide
 */

import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";

interface ShortcutEntry {
  key: string;
  label: string;
}

interface Props {
  shortcuts: ShortcutEntry[];
}

export default function KeyboardShortcutsHelp({ shortcuts }: Props) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if ((e.target as HTMLElement)?.isContentEditable) return;

      if (e.key === "?") {
        e.preventDefault();
        setVisible((v) => !v);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setVisible(false);
      }
    }
    window.addEventListener("keydown", handler, { capture: true });
    return () => window.removeEventListener("keydown", handler, { capture: true });
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Panel */}
      <div className="fixed z-[201] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] max-w-[90vw]">
        {/* Terminal window frame */}
        <div className="border border-[var(--crt-green)]/40 bg-[#0a0a0a] shadow-[0_0_30px_rgba(51,255,51,0.1)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[var(--crt-green)]/20 bg-[var(--crt-green)]/5">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[10px] font-mono text-[var(--crt-green)]/60 tracking-widest uppercase">
              shortcuts.sh
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-xs font-mono text-[var(--crt-green)] tracking-widest mb-3 uppercase">
              // {t("shortcuts.title")}
            </h3>

            <div className="space-y-2">
              {shortcuts.map((s) => (
                <div key={s.key} className="flex items-center justify-between">
                  <kbd className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 text-[11px] font-mono border border-[var(--crt-green)]/30 bg-[var(--crt-green)]/5 text-[var(--crt-green)] rounded-sm shadow-[0_1px_0_var(--crt-green)/20]">
                    {s.key}
                  </kbd>
                  <span className="text-xs font-mono text-[var(--crt-green)]/70 tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <kbd className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 text-[11px] font-mono border border-[var(--crt-green)]/30 bg-[var(--crt-green)]/5 text-[var(--crt-green)] rounded-sm shadow-[0_1px_0_var(--crt-green)/20]">
                  ?
                </kbd>
                <span className="text-xs font-mono text-[var(--crt-green)]/70 tracking-wide">
                  {t("shortcuts.title")}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--crt-green)]/10">
              <p className="text-[10px] font-mono text-[var(--crt-green)]/40 text-center tracking-wider">
                ESC {t("shortcuts.clear").toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
