/**
 * Home Page - Claude Buddy Checker
 * Design: Retro CRT Terminal (phosphor green on black)
 * Layout: Narrow centered column simulating 80-col terminal
 */

import { useState, useRef, useCallback } from "react";
import { rollBuddy, type BuddyResult, SPECIES } from "@/lib/buddy-engine";
import BuddyResultCard from "@/components/BuddyResultCard";
import TypewriterText from "@/components/TypewriterText";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/hero-crt-terminal-5fvRpoNY7GsFPkvdJ2QQKy.webp";
const GRID_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/buddy-showcase-grid-dzj2bCjKycQ4bgSaUeRV58.webp";

const ASCII_LOGO = `
 ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗  
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 ██████╗ ██╗   ██╗██████╗ ██████╗ ██╗   ██╗
 ██╔══██╗██║   ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
 ██████╔╝██║   ██║██║  ██║██║  ██║ ╚████╔╝ 
 ██╔══██╗██║   ██║██║  ██║██║  ██║  ╚██╔╝  
 ██████╔╝╚██████╔╝██████╔╝██████╔╝   ██║   
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   
`.trim();

export default function Home() {
  const [uuid, setUuid] = useState("");
  const [buddy, setBuddy] = useState<BuddyResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = useCallback(() => {
    const trimmed = uuid.trim();
    if (!trimmed) {
      setError("ERROR: No input provided. Enter your accountUuid or userID.");
      return;
    }
    setError("");
    setIsLoading(true);
    setShowResult(false);

    // Simulate terminal processing delay
    setTimeout(() => {
      const result = rollBuddy(trimmed);
      setBuddy(result);
      setIsLoading(false);
      setShowResult(true);
      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 800);
  }, [uuid]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div className="min-h-screen relative">
      {/* CRT Scan Lines Overlay */}
      <div className="crt-scanlines" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ASCII Logo */}
        <div className="mb-8 overflow-hidden">
          <pre className="text-[6px] sm:text-[8px] md:text-[10px] leading-none font-mono text-center glow-text select-none whitespace-pre">
            {ASCII_LOGO}
          </pre>
        </div>

        {/* Hero Image */}
        <div className="mb-8 border border-border glow-border overflow-hidden">
          <img
            src={HERO_IMG}
            alt="CRT terminal displaying ASCII pet creature"
            className="w-full h-auto opacity-90"
            width={2752}
            height={1536}
            loading="eager"
          />
        </div>

        {/* Tagline */}
        <div className="mb-8 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold glow-text mb-3">
            Check Your Claude Code Buddy
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Claude Code ships with a hidden Tamagotchi-style pet system.
            Each user gets a unique buddy based on their account UUID.
            Enter yours below to discover your companion before launch.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="mb-6 border border-border/30 bg-card/50 px-4 py-3 text-xs text-muted-foreground">
          <span className="text-crt-green font-semibold">SECURE</span>
          {" // "}All computation runs locally in your browser. Your UUID never leaves this page.
          AccountUuid and UserID are not credentials and cannot be used for authentication.
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="border border-border bg-card p-4 sm:p-6">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
              <span className="w-2.5 h-2.5 rounded-full bg-crt-red" />
              <span className="w-2.5 h-2.5 rounded-full bg-crt-amber" />
              <span className="w-2.5 h-2.5 rounded-full bg-crt-green" />
              <span className="ml-3 text-xs text-muted-foreground uppercase tracking-widest">
                buddy_checker.sh
              </span>
            </div>

            {/* How to find UUID */}
            <div className="mb-4 text-xs text-muted-foreground space-y-2">
              <p className="text-crt-green">// How to find your UUID:</p>
              <p>
                <span className="text-crt-amber">Option 1:</span> Ask Claude Code:{" "}
                <code className="text-foreground bg-secondary/50 px-1.5 py-0.5">
                  What is my accountUuid?
                </code>
              </p>
              <p>
                <span className="text-crt-amber">Option 2:</span> Run in terminal:{" "}
                <code className="text-foreground bg-secondary/50 px-1.5 py-0.5">
                  cat ~/.claude.json | grep accountUuid
                </code>
              </p>
            </div>

            {/* Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center border border-border bg-background px-3 py-2 focus-within:border-crt-green/50 focus-within:glow-border transition-all">
                <span className="text-crt-green mr-2 text-sm shrink-0">&gt;_</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={uuid}
                  onChange={(e) => setUuid(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="acde070d-8c4c-4f0d-9d8a-162843c10333"
                  className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <button
                onClick={handleCheck}
                disabled={isLoading}
                className="px-6 py-2 bg-crt-green/10 border border-crt-green/40 text-crt-green text-sm font-semibold uppercase tracking-wider hover:bg-crt-green/20 hover:border-crt-green/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isLoading ? "SCANNING..." : "CHECK BUDDY"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-3 text-xs text-crt-red">
                {error}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="mt-4 text-xs text-muted-foreground space-y-1">
                <TypewriterText text="$ Hashing UUID with FNV-1a..." speed={20} />
                <br />
                <TypewriterText text="$ Seeding Mulberry32 PRNG..." speed={20} />
                <br />
                <TypewriterText text="$ Rolling rarity, species, stats..." speed={20} />
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {showResult && buddy && (
          <div ref={resultRef} className="mb-12">
            <BuddyResultCard buddy={buddy} />
          </div>
        )}

        {/* Species Grid Section */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            // ALL {SPECIES.length} SPECIES
          </h2>
          <div className="border border-border glow-border overflow-hidden mb-4">
            <img
              src={GRID_IMG}
              alt="Grid of 6 Claude Code buddy species rendered in retro terminal style"
              className="w-full h-auto opacity-90"
              width={2528}
              height={1696}
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SPECIES.map((s) => (
              <div
                key={s}
                className="text-center text-xs py-2 px-1 border border-border/30 bg-card/30 uppercase tracking-wider text-muted-foreground hover:text-crt-green hover:border-crt-green/30 transition-colors"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Rarity Table */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            // RARITY TIERS
          </h2>
          <div className="border border-border bg-card overflow-hidden">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="text-left px-4 py-3 uppercase tracking-wider">Rarity</th>
                  <th className="text-left px-4 py-3 uppercase tracking-wider">Chance</th>
                  <th className="text-left px-4 py-3 uppercase tracking-wider">Stat Floor</th>
                  <th className="text-left px-4 py-3 uppercase tracking-wider">Stars</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Common", chance: "60%", floor: "5", stars: "★", cls: "rarity-common" },
                  { name: "Uncommon", chance: "25%", floor: "15", stars: "★★", cls: "rarity-uncommon" },
                  { name: "Rare", chance: "10%", floor: "25", stars: "★★★", cls: "rarity-rare" },
                  { name: "Epic", chance: "4%", floor: "35", stars: "★★★★", cls: "rarity-epic" },
                  { name: "Legendary", chance: "1%", floor: "50", stars: "★★★★★", cls: "rarity-legendary" },
                ].map((r) => (
                  <tr key={r.name} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className={`px-4 py-3 font-semibold uppercase ${r.cls}`}>{r.name}</td>
                    <td className="px-4 py-3">{r.chance}</td>
                    <td className="px-4 py-3">{r.floor}</td>
                    <td className={`px-4 py-3 ${r.cls}`}>{r.stars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            // HOW IT WORKS
          </h2>
          <div className="border border-border bg-card p-4 sm:p-6 text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              Claude Code's buddy system uses a <span className="text-foreground">deterministic algorithm</span> to generate your pet.
              Your <code className="text-crt-amber bg-secondary/50 px-1">accountUuid</code> is concatenated with a salt
              (<code className="text-crt-amber bg-secondary/50 px-1">friend-2026-401</code>), hashed via FNV-1a,
              and fed into a Mulberry32 PRNG.
            </p>
            <p>
              The PRNG then sequentially rolls your <span className="text-foreground">rarity</span> (weighted random),{" "}
              <span className="text-foreground">species</span> (1 of 18),{" "}
              <span className="text-foreground">eyes</span> (1 of 6),{" "}
              <span className="text-foreground">hat</span> (common = none, others = 1 of 8),{" "}
              <span className="text-foreground">shiny</span> (1% chance), and{" "}
              <span className="text-foreground">5 stats</span> (with a peak and dump stat).
            </p>
            <p>
              Because the algorithm is deterministic, your buddy will always be the same — you can check it here before the official launch.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-lg font-bold glow-text mb-4">
            // FAQ
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Is this official?",
                a: "No. This tool is built by the community based on the leaked Claude Code source. The buddy system was found in the npm package's .map file.",
              },
              {
                q: "Will my buddy change?",
                a: "No. The generation is deterministic — same UUID always produces the same buddy. Your buddy is already decided.",
              },
              {
                q: "What is a Shiny buddy?",
                a: "Shiny is a 1% chance variant that adds a sparkle effect to your buddy. It's purely cosmetic but extremely rare.",
              },
              {
                q: "When does the buddy system launch?",
                a: "According to the leaked source code, the /buddy command is set to activate on April 1st, 2026.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-border/30 bg-card/50 p-4">
                <p className="text-sm font-semibold text-crt-amber mb-1">
                  &gt; {item.q}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/30 pt-6 pb-8 text-center text-xs text-muted-foreground space-y-2">
          <p>
            Built by the community. Not affiliated with Anthropic.
          </p>
          <p>
            All computation is local. No data is collected or transmitted.
          </p>
          <p className="text-crt-green/40">
            {"> "}EOF
          </p>
        </footer>
      </div>
    </div>
  );
}
