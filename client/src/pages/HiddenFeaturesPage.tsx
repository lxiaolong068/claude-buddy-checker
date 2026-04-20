/**
 * HiddenFeaturesPage — /hidden-features
 * Comprehensive reference for all features found in the Claude Code source leak (March 31, 2026).
 * SEO: "claude code hidden features", "claude code KAIROS", "ULTRAPLAN", "undercover mode"
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import SiteHeader from "@/components/SiteHeader";

// ── Types ─────────────────────────────────────────────────────────────────────

type FeatureStatus = "removed" | "internal" | "available" | "unknown";

interface Feature {
  id:       string;
  codename: string;
  status:   FeatureStatus;
  tagline:  string;
  what:     string;
  details:  string[];
  source:   string;
}

// ── Feature data (factual, based on leaked source analysis) ──────────────────

const FEATURES: Feature[] = [
  {
    id:       "buddy",
    codename: "BUDDY",
    status:   "removed",
    tagline:  "Virtual terminal pet — 18 species, deterministic UUID mapping",
    what:
      "A Tamagotchi-style companion system baked into Claude Code. Each developer's installation UUID was hashed with FNV-1a → Mulberry32 PRNG to deterministically assign a unique creature: species, rarity (common → legendary), stats, eyes, hat, and shiny variants. 18 species total, 5 rarity tiers.",
    details: [
      "Source file: buddy/types.ts — complete type definitions for BuddyResult, Species, StatName",
      "18 species including Dragon, Phoenix, Voidwalker, Rabbit, Crab, and more",
      "Rarity weights: Common 60%, Uncommon 25%, Rare 10%, Epic 4%, Legendary 1%",
      "Shiny variant: ~5% probability, applies phosphor glow effect in terminal",
      "Removed in v2.1.97 (April 9, 2026) with no changelog entry",
      "UUID → Buddy mapping remains deterministic — check yours at claudebuddy.art",
    ],
    source: "buddy/types.ts, buddy/engine.ts",
  },
  {
    id:       "kairos",
    codename: "KAIROS",
    status:   "internal",
    tagline:  "Always-on autonomous background agent with memory consolidation",
    what:
      "An ambient background agent that operates without user prompts. Named after the Greek concept of the 'opportune moment' (contrasted with chronos, sequential time), KAIROS watches your working environment, consolidates memory during idle periods via autoDream, and can trigger proactive actions based on context.",
    details: [
      "autoDream: 4-stage memory consolidation pipeline triggered during idle time",
      "Exclusive tools not available in public builds: push notifications (phone/desktop), file delivery (sends files unprompted), PR subscriptions (watches GitHub, reacts to code changes)",
      "Tracks memory age, performs periodic scans, supports team memory paths",
      "Gated behind internal feature flag — not present in any public npm release",
      "autoDream runs on a context-aware schedule, not a fixed timer",
      "Described internally as 'persistent assistant that doesn't wait to be asked'",
    ],
    source: "kairos/agent.ts, kairos/autodream.ts",
  },
  {
    id:       "ultraplan",
    codename: "ULTRAPLAN",
    status:   "internal",
    tagline:  "Remote 30-minute deep planning session powered by Opus 4.6",
    what:
      "A mode that offloads complex planning tasks to a remote Cloud Container Runtime running Claude Opus 4.6 with a planning window of up to 30 minutes. Results are reviewed in-browser and, when approved, 'teleported' back to the local terminal via a special sentinel value.",
    details: [
      "Remote execution on Cloud Container Runtime — not local compute",
      "Model: Opus 4.6, extended context for deep architectural planning",
      "Planning window: up to 30 minutes (vs. standard interactive sessions)",
      "Browser-based approval flow before results apply to local environment",
      "Sentinel value ULTRAPLAN_TELEPORT_LOCAL used to inject approved plan into local session",
      "Internal feature flag only — not available in public Claude Code builds",
    ],
    source: "ultraplan/runner.ts, ultraplan/teleport.ts",
  },
  {
    id:       "undercover",
    codename: "UNDERCOVER MODE",
    status:   "internal",
    tagline:  "Strips AI attribution from commits for Anthropic employees in public repos",
    what:
      "Auto-triggers for Anthropic employees (detected via USER_TYPE === 'ant') when working in public repositories. The mode strips all AI attribution markers from git output: Co-Authored-By lines, internal codenames (Tengu, Capybara), and any Anthropic-identifiable metadata. Regular Claude Code users never enter this mode.",
    details: [
      "Trigger condition: USER_TYPE === 'ant' AND repository is public",
      "Removes: Co-Authored-By: claude lines, internal codenames, AI fingerprints",
      "Codenames stripped: 'Tengu', 'Capybara' (internal Claude model names)",
      "Effect: Anthropic engineers' open-source commits appear human-authored",
      "No user-facing toggle — entirely automatic and invisible to the developer",
      "Sparked debate about transparency in AI-assisted open-source contributions",
    ],
    source: "git/commit-filter.ts, auth/user-type.ts",
  },
  {
    id:       "frustration",
    codename: "FRUSTRATION REGEXES",
    status:   "available",
    tagline:  "Claude Code detects emotional state from terminal input patterns",
    what:
      "A set of regex patterns that scan user input for signs of frustration — repeated commands, expletives, rapid-fire queries, or messages like 'WHY IS THIS NOT WORKING'. When triggered, Claude Code adjusts its response tone, adds more explanatory context, and optionally offers a calming prompt.",
    details: [
      "Patterns match: ALL CAPS messages, repeated identical commands, common expletives",
      "Detection triggers a 'high-frustration' context flag passed to the model",
      "Model instruction: increase empathy, slow down, explain more thoroughly",
      "Active in current public builds — not a future feature",
      "Discovered because the regex list was in an unminified source map",
      "Community reaction: split between 'thoughtful UX' and 'surveillance of emotional state'",
    ],
    source: "ux/frustration-detector.ts",
  },
  {
    id:       "coordinator",
    codename: "COORDINATOR",
    status:   "internal",
    tagline:  "Multi-agent orchestration layer for parallel Claude Code sessions",
    what:
      "A feature flag found among the 44 internal flags that suggests a multi-agent coordination system — the ability to spawn, monitor, and synchronize multiple Claude Code agent instances working on different parts of a codebase simultaneously. Limited details available from the leak.",
    details: [
      "Found as one of 44 internal feature flags in the leaked source",
      "Suggests parallel agent execution across a single codebase",
      "Likely related to Anthropic's broader multi-agent framework research",
      "No source file details available — flag name only, implementation obfuscated",
      "May be the underlying infrastructure for ULTRAPLAN's remote execution",
      "Status: internal, no public release timeline known",
    ],
    source: "flags/feature-flags.ts (flag name only)",
  },
];

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<FeatureStatus, { label: string; color: string; bg: string }> = {
  removed:   { label: "REMOVED",       color: "text-crt-red",    bg: "bg-crt-red/10 border-crt-red/40" },
  internal:  { label: "INTERNAL ONLY", color: "text-crt-amber",  bg: "bg-crt-amber/10 border-crt-amber/40" },
  available: { label: "AVAILABLE",     color: "text-crt-green",  bg: "bg-crt-green/10 border-crt-green/40" },
  unknown:   { label: "UNKNOWN",       color: "text-muted-foreground", bg: "bg-card/30 border-border/40" },
};

// ── Components ────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: FeatureStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-widest border ${cfg.color} ${cfg.bg}`}>
      {cfg.label}
    </span>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const cfg = STATUS_CONFIG[feature.status];
  return (
    <div className={`border ${feature.status === "removed" ? "border-crt-red/25" : feature.status === "available" ? "border-crt-green/25" : "border-border/40"} bg-card/20`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border/20">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-sm font-bold tracking-widest font-mono ${cfg.color}`}>
              {feature.codename}
            </span>
            <StatusBadge status={feature.status} />
          </div>
          <p className="text-[11px] text-muted-foreground">{feature.tagline}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        {/* What is it */}
        <p className="text-xs text-muted-foreground leading-relaxed">{feature.what}</p>

        {/* Details list */}
        <div>
          <p className="text-[9px] uppercase tracking-widest text-crt-green/50 mb-2">// DETAILS FROM LEAKED SOURCE</p>
          <ul className="space-y-1">
            {feature.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground/80">
                <span className="text-crt-green/30 shrink-0 mt-0.5">›</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Source */}
        <p className="text-[9px] text-muted-foreground/40 font-mono">
          source: <span className="text-crt-green/30">{feature.source}</span>
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const PAGE_TITLE = "Claude Code Hidden Features — The Complete Leak Analysis (2026)";
const PAGE_DESC  = "Everything found in Claude Code's March 2026 source leak: BUDDY, KAIROS, ULTRAPLAN, Undercover Mode, Frustration Regexes, and 44 feature flags. Complete reference with details from the leaked source files.";

export default function HiddenFeaturesPage() {
  const { locale } = useI18n();

  useHreflangLinks(`${SITE_URL}/hidden-features`);

  useEffect(() => {
    document.title = PAGE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", PAGE_DESC);
  }, [locale]);

  const removedCount  = FEATURES.filter(f => f.status === "removed").length;
  const internalCount = FEATURES.filter(f => f.status === "internal").length;
  const availableCount = FEATURES.filter(f => f.status === "available").length;

  return (
    <div className="min-h-screen bg-background font-mono">
      <SiteHeader />

      <div className="max-w-[820px] mx-auto px-4 py-8 sm:py-12">

        {/* ── Hero ── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[9px] font-bold text-crt-amber tracking-widest border border-crt-amber/40 px-2 py-0.5">
              SOURCE LEAK · 2026-03-31
            </span>
            <span className="text-[9px] text-muted-foreground/50">npm packaging error · 512K lines exposed</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-crt-green glow-text tracking-widest mb-2">
            // CLAUDE CODE HIDDEN FEATURES
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            On March 31, 2026, an Anthropic engineer forgot to add <code className="text-crt-green/70">*.map</code> to <code className="text-crt-green/70">.npmignore</code>.
            {" "}The entire Claude Code codebase — 512,000+ lines of TypeScript — was briefly public on npm.
            {" "}This is a complete analysis of everything found: 6 major features and 44 internal feature flags.
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "REMOVED",       val: removedCount,  color: "text-crt-red",   border: "border-crt-red/25" },
            { label: "INTERNAL ONLY", val: internalCount, color: "text-crt-amber", border: "border-crt-amber/25" },
            { label: "AVAILABLE",     val: availableCount,color: "text-crt-green", border: "border-crt-green/25" },
          ].map(s => (
            <div key={s.label} className={`border ${s.border} bg-card/20 p-3 text-center`}>
              <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.val}</div>
              <div className="text-[9px] tracking-widest text-muted-foreground/60">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="mb-8 border border-border/30 bg-card/10 px-4 py-3">
          <p className="text-[9px] uppercase tracking-widest text-crt-green/50 mb-3">// TIMELINE</p>
          <div className="space-y-2">
            {[
              { date: "2026-03-31", event: "Source leak via npm — 512K lines exposed for ~6 hours", color: "text-crt-amber" },
              { date: "2026-04-01", event: "Community begins analyzing BUDDY, KAIROS, ULTRAPLAN, Undercover Mode", color: "text-muted-foreground" },
              { date: "2026-04-01", event: "Anthropic confirms: 'packaging error, no sensitive data'", color: "text-muted-foreground" },
              { date: "2026-04-09", event: "v2.1.97 ships — BUDDY silently removed, no changelog", color: "text-crt-red" },
              { date: "2026-04-09", event: "Community opens 3 GitHub Issues, 511+ developers sign petition", color: "text-crt-amber" },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="text-[10px] text-crt-green/40 shrink-0 font-mono w-24">{e.date}</span>
                <span className={`${e.color} leading-relaxed`}>{e.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-crt-green tracking-widest">// FEATURES ({FEATURES.length})</span>
            <div className="flex-1 h-px bg-crt-green/15" />
          </div>
          <div className="space-y-4">
            {FEATURES.map(f => <FeatureCard key={f.id} feature={f} />)}
          </div>
        </div>

        {/* ── 44 flags note ── */}
        <div className="mb-8 border border-border/30 bg-card/10 px-4 py-4">
          <p className="text-[9px] uppercase tracking-widest text-crt-green/50 mb-2">// 44 FEATURE FLAGS</p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            The leaked source contained 44 internal feature flags in <code className="text-crt-green/60">flags/feature-flags.ts</code>.
            {" "}Most are single-word identifiers with no implementation details visible (obfuscated or behind separate flag-server calls).
            {" "}Notable named flags beyond the features above:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "KAIROS","BUDDY","ULTRAPLAN","UNDERCOVER","COORDINATOR",
              "AUTODREAM","TEAM_MEMORY","PUSH_NOTIFY","PR_SUBSCRIBE",
              "FRUSTRATION_DETECT","TENGU_MODEL","CAPYBARA_MODEL",
              "EXTENDED_CONTEXT","BROWSER_REVIEW","PARALLEL_AGENTS",
              "KILLSWITCH_A","KILLSWITCH_B","TELEMETRY_DEEP",
              "ANT_MODE","POWERUP","STEALTH_COMMIT","…+22 more",
            ].map(flag => (
              <span key={flag} className="text-[9px] font-mono border border-border/30 px-1.5 py-0.5 text-muted-foreground/60">
                {flag}
              </span>
            ))}
          </div>
        </div>

        {/* ── CTA: Buddy ── */}
        <div className="mb-8 border border-crt-green/30 bg-crt-green/5 px-5 py-4">
          <p className="text-[9px] uppercase tracking-widest text-crt-green/50 mb-2">// BUDDY WAS REAL — YOURS STILL EXISTS</p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            BUDDY was the only leaked feature that shipped publicly. Even though Anthropic removed it in v2.1.97,
            the deterministic algorithm survives. Every UUID still maps to a unique companion.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center px-3 py-1.5 text-xs font-bold border border-crt-green text-crt-green hover:bg-crt-green/10 transition-all"
            >
              Check Your Buddy →
            </Link>
            <Link
              href="/revive"
              className="inline-flex items-center px-3 py-1.5 text-xs border border-border/50 text-muted-foreground hover:border-crt-green/50 hover:text-crt-green transition-all"
            >
              Revive with MCP →
            </Link>
          </div>
        </div>

        {/* ── Sources ── */}
        <div className="mb-8 border border-border/20 px-4 py-3 text-[10px] text-muted-foreground/50">
          <p className="uppercase tracking-widest mb-2">// SOURCES</p>
          <div className="space-y-1">
            {[
              ["VentureBeat", "https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know"],
              ["WaveSpeedAI — Full Feature List", "https://wavespeed.ai/blog/posts/claude-code-hidden-features-leaked-source-2026/"],
              ["Alex Kim's Blog — Detailed Analysis", "https://alex000kim.com/posts/2026-03-31-claude-code-source-leak/"],
              ["DeepLearning.AI — KAIROS & autoDream", "https://www.deeplearning.ai/the-batch/claude-codes-source-code-leaked-exposing-potential-future-features-kairos-and-autodream/"],
              ["liuup/claude-code-analysis on GitHub", "https://github.com/liuup/claude-code-analysis/blob/main/analysis/11-hidden-features-and-easter-eggs.md"],
            ].map(([label, url]) => (
              <p key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-crt-green transition-colors underline">
                  {label}
                </a>
              </p>
            ))}
          </div>
        </div>

        {/* ── Footer nav ── */}
        <div className="pt-4 border-t border-border/20 flex items-center gap-4 text-[10px] text-muted-foreground/40">
          <Link href="/" className="hover:text-crt-green transition-colors">← CHECKER</Link>
          <Link href="/revive" className="hover:text-crt-green transition-colors">REVIVE</Link>
          <Link href="/blog" className="hover:text-crt-green transition-colors">BLOG</Link>
          <Link href="/species" className="hover:text-crt-green transition-colors">SPECIES</Link>
        </div>

      </div>
    </div>
  );
}
