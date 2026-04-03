/**
 * NotFound - CRT Terminal Style 404 Page
 * Design: Phosphor green terminal aesthetic with ASCII art and typewriter boot sequence
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import TypewriterText from "@/components/TypewriterText";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

const ASCII_404 = `
 ██╗  ██╗  ██████╗  ██╗  ██╗
 ██║  ██║ ██╔═████╗ ██║  ██║
 ███████║ ██║██╔██║ ███████║
 ╚════██║ ████╔╝██║ ╚════██║
      ██║ ╚██████╔╝      ██║
      ╚═╝  ╚═════╝       ╚═╝`.trim();

const ASCII_BUDDY = `
   .---------.
  /  X     X  \\
 |    _____    |
 |   /     \\   |
  \\ | LOST  | /
   '---------'
    |  | |  |
    '--' '--'`.trim();

const BOOT_LINES = [
  { text: "CLAUDE BUDDY OS v4.0.4 — ROUTE RESOLUTION MODULE", color: "text-[#33ff33]" },
  { text: 'Resolving path...', color: "text-muted-foreground" },
  { text: "ERROR 0x404: Path not found in routing table", color: "text-crt-red" },
  { text: "SIGNOTFOUND raised — process 0xdeadbeef", color: "text-crt-amber" },
  { text: "Core dump written to /dev/null", color: "text-muted-foreground" },
  { text: "Attempting buddy recovery...", color: "text-muted-foreground" },
  { text: "FATAL: Buddy unreachable. Wandering the void.", color: "text-crt-red" },
];

export default function NotFound() {
  const [location] = useLocation();
  const [visibleLines, setVisibleLines] = useState(1);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) {
      setAllDone(true);
      return;
    }
    const delay = visibleLines === 0 ? 100 : 420;
    const timer = setTimeout(() => setVisibleLines((n) => n + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono crt-scanlines flex flex-col">

      {/* Nav */}
      <nav className="border-b border-border/40 px-4 py-2 flex justify-between items-center shrink-0">
        <Link
          href="/"
          className="text-[#33ff33]/70 text-xs uppercase tracking-widest hover:text-[#33ff33] transition-colors"
        >
          ~/claudebuddy.art
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-7">

          {/* ASCII 404 */}
          <pre
            className="text-crt-red text-[10px] sm:text-xs leading-tight whitespace-pre text-center select-none overflow-x-auto"
            aria-label="404"
          >
            {ASCII_404}
          </pre>

          {/* Terminal boot sequence */}
          <div className="border border-border/50 bg-card/30 p-4 space-y-1 text-xs">
            <p className="text-muted-foreground/50 mb-2 truncate">
              $ kernel --resolve <span className="text-[#33ff33]/60">"{location}"</span>
            </p>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <p key={i} className={line.color}>
                {i === visibleLines - 1 && !allDone ? (
                  <TypewriterText text={line.text} speed={14} />
                ) : (
                  line.text
                )}
              </p>
            ))}
            {allDone && (
              <p className="text-muted-foreground/40 mt-2 animate-pulse">
                █
              </p>
            )}
          </div>

          {/* Lost buddy ASCII */}
          <div className="text-center">
            <pre className="inline-block text-[#33ff33]/50 text-[10px] leading-snug whitespace-pre select-none">
              {ASCII_BUDDY}
            </pre>
            <p className="text-muted-foreground/40 text-[10px] mt-1 uppercase tracking-widest">
              LOST_BUDDY.EXE — last seen: unknown sector
            </p>
          </div>

          {/* Return CTA */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground text-xs">
              The requested route does not exist in this terminal session.
            </p>
            <Link
              href="/"
              className="inline-block border border-[#33ff33]/50 text-[#33ff33] px-7 py-2.5 text-xs uppercase tracking-widest hover:bg-[#33ff33]/10 hover:border-[#33ff33]/80 active:bg-[#33ff33]/20 transition-all"
            >
              ← return to home
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 py-2 text-center shrink-0">
        <span className="text-muted-foreground/30 text-[10px] uppercase tracking-widest">
          error code: 0x404 · process terminated · exit status 1
        </span>
      </footer>

    </div>
  );
}
