/**
 * /powerup Tracker Page — /powerup-tracker
 * Checklist of Claude Code /powerup gamification lessons.
 * Progress persisted in localStorage via storage.ts.
 * Marks the first non-Buddy interactive tool on claudebuddy.art.
 */

import { useState, useEffect, useCallback } from "react";
import {
  getPowerupProgress,
  completePowerupLesson,
  uncompletePowerupLesson,
  savePowerupProgress,
} from "@/lib/storage";
import { useI18n } from "@/contexts/I18nContext";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import SiteHeader from "@/components/SiteHeader";

// ── Lesson data ───────────────────────────────────────────────────────────────

interface Lesson {
  id:      string;
  chapter: "start" | "core" | "advanced" | "mastery";
  title:   string;
  desc:    string;
  xp:      number;
}

const LESSONS: Lesson[] = [
  // ── Getting Started ──────────────────────────────────────────────────────
  {
    id:      "install",
    chapter: "start",
    title:   "Install Claude Code",
    desc:    "Run `npm install -g @anthropic-ai/claude-code` and verify with `claude --version`.",
    xp:      10,
  },
  {
    id:      "first-session",
    chapter: "start",
    title:   "Start Your First Session",
    desc:    "Open a project directory and run `claude` to begin an interactive session.",
    xp:      10,
  },
  {
    id:      "slash-commands",
    chapter: "start",
    title:   "Discover Slash Commands",
    desc:    "Type `/help` in a Claude session to see all available slash commands.",
    xp:      15,
  },
  {
    id:      "powerup-intro",
    chapter: "start",
    title:   "Run /powerup for the First Time",
    desc:    "Enter `/powerup` in Claude Code v2.1.90+ to unlock the gamification tutorial.",
    xp:      20,
  },
  // ── Core Skills ──────────────────────────────────────────────────────────
  {
    id:      "claude-md",
    chapter: "core",
    title:   "Write Your CLAUDE.md",
    desc:    "Create a CLAUDE.md in your project root with project conventions and context.",
    xp:      25,
  },
  {
    id:      "memory-system",
    chapter: "core",
    title:   "Use the Memory System",
    desc:    "Learn `/memory add`, `/memory list`, and `/memory remove` to persist context across sessions.",
    xp:      25,
  },
  {
    id:      "plan-mode",
    chapter: "core",
    title:   "Enter Plan Mode",
    desc:    "Use `/plan` to let Claude propose a multi-step implementation before executing.",
    xp:      30,
  },
  {
    id:      "tool-permissions",
    chapter: "core",
    title:   "Configure Tool Permissions",
    desc:    "Open Claude Code settings and configure which tools are auto-approved vs. prompted.",
    xp:      20,
  },
  // ── Advanced ─────────────────────────────────────────────────────────────
  {
    id:      "hooks",
    chapter: "advanced",
    title:   "Set Up Pre/Post Hooks",
    desc:    "Configure hooks in settings.json to auto-run lint, tests, or formatters after edits.",
    xp:      40,
  },
  {
    id:      "mcp-server",
    chapter: "advanced",
    title:   "Connect an MCP Server",
    desc:    "Register an MCP server (e.g., Context7, Playwright) in your Claude Code config.",
    xp:      40,
  },
  {
    id:      "ide-extension",
    chapter: "advanced",
    title:   "Install the IDE Extension",
    desc:    "Install the Claude Code extension for VS Code or JetBrains and sync your session.",
    xp:      35,
  },
  {
    id:      "multi-agent",
    chapter: "advanced",
    title:   "Spawn a Sub-Agent",
    desc:    "Use the Agent tool in a session to delegate a subtask to a specialized agent.",
    xp:      45,
  },
  // ── Mastery ───────────────────────────────────────────────────────────────
  {
    id:      "custom-agent",
    chapter: "mastery",
    title:   "Write a Custom Agent Definition",
    desc:    "Create a `.claude/agents/` file defining a specialized agent persona for your workflow.",
    xp:      60,
  },
  {
    id:      "ci-integration",
    chapter: "mastery",
    title:   "Integrate Claude Code into CI",
    desc:    "Add Claude Code headless mode (`claude --print`) to your GitHub Actions or CI pipeline.",
    xp:      60,
  },
  {
    id:      "full-powerup",
    chapter: "mastery",
    title:   "Complete All /powerup Lessons",
    desc:    "Finish every lesson in the /powerup curriculum to unlock the Legendary XP badge.",
    xp:      100,
  },
];

const CHAPTER_ORDER: Array<Lesson["chapter"]> = ["start", "core", "advanced", "mastery"];

const CHAPTER_COLORS: Record<Lesson["chapter"], string> = {
  start:    "text-crt-green",
  core:     "text-crt-amber",
  advanced: "text-crt-blue",
  mastery:  "text-crt-purple",
};

const CHAPTER_BORDER: Record<Lesson["chapter"], string> = {
  start:    "border-crt-green/30",
  core:     "border-crt-amber/30",
  advanced: "border-crt-blue/30",
  mastery:  "border-crt-purple/30",
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PowerupTrackerPage() {
  const { t } = useI18n();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [startedAt, setStartedAt]       = useState<string | null>(null);
  const [timestamps, setTimestamps]     = useState<Record<string, string>>({});

  useHreflangLinks(`${SITE_URL}/powerup-tracker`);

  useEffect(() => {
    document.title = "/powerup Tracker — claudebuddy.art";
  }, []);

  const loadProgress = useCallback(() => {
    const progress = getPowerupProgress();
    const ids      = new Set(progress.completedLessons.map((l) => l.id));
    const ts: Record<string, string> = {};
    for (const l of progress.completedLessons) ts[l.id] = l.completedAt;
    setCompletedIds(ids);
    setStartedAt(progress.startedAt);
    setTimestamps(ts);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const handleToggle = useCallback(
    (id: string) => {
      if (completedIds.has(id)) {
        uncompletePowerupLesson(id);
      } else {
        completePowerupLesson(id);
      }
      loadProgress();
    },
    [completedIds, loadProgress]
  );

  const handleReset = useCallback(() => {
    if (!window.confirm(t("powerupTracker.resetConfirm"))) return;
    savePowerupProgress({ completedLessons: [], startedAt: null });
    loadProgress();
  }, [t, loadProgress]);

  const totalLessons    = LESSONS.length;
  const completedCount  = completedIds.size;
  const totalXP         = LESSONS.filter((l) => completedIds.has(l.id)).reduce((s, l) => s + l.xp, 0);
  const maxXP           = LESSONS.reduce((s, l) => s + l.xp, 0);
  const progressPct     = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="max-w-2xl mx-auto px-4 py-8 font-mono">

        {/* ── Header ── */}
        <div className="mb-6">
          <h1 className="text-xl text-crt-green glow-text tracking-widest">
            {t("powerupTracker.title")}
          </h1>
          <p className="text-crt-green/40 text-xs mt-1">
            {t("powerupTracker.subtitle")}
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div className="border border-crt-green/20 bg-crt-green/5 rounded p-4 mb-8">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-crt-green/60">
              {t("powerupTracker.progress")}: {completedCount}/{totalLessons}{" "}
              <span className="text-crt-green/40">({progressPct}%)</span>
            </span>
            <span className="text-crt-amber">
              XP: {totalXP} / {maxXP}
            </span>
          </div>
          <div className="w-full h-2 bg-crt-green/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-crt-green transition-all duration-700 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {startedAt && (
            <div className="mt-2 text-[10px] text-crt-green/30">
              {t("powerupTracker.started")} {new Date(startedAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* ── Lessons by chapter ── */}
        {CHAPTER_ORDER.map((chapter) => {
          const lessons = LESSONS.filter((l) => l.chapter === chapter);
          const doneInChapter = lessons.filter((l) => completedIds.has(l.id)).length;
          return (
            <div key={chapter} className="mb-8">
              <div className={`flex items-center justify-between text-xs uppercase tracking-widest mb-3 ${CHAPTER_COLORS[chapter]}`}>
                <span>{t(`powerupTracker.chapters.${chapter}`)}</span>
                <span className="text-crt-green/30">
                  {doneInChapter}/{lessons.length}
                </span>
              </div>

              <div className="space-y-2">
                {lessons.map((lesson) => {
                  const done = completedIds.has(lesson.id);
                  const ts   = timestamps[lesson.id];
                  return (
                    <div
                      key={lesson.id}
                      className={`border rounded p-3 transition-all cursor-pointer select-none ${
                        done
                          ? `${CHAPTER_BORDER[chapter]} bg-crt-green/5 opacity-70`
                          : "border-crt-green/15 hover:border-crt-green/30"
                      }`}
                      onClick={() => handleToggle(lesson.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div
                          className={`mt-0.5 w-4 h-4 border rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                            done
                              ? `${CHAPTER_BORDER[chapter]} ${CHAPTER_COLORS[chapter]}`
                              : "border-crt-green/30"
                          }`}
                        >
                          {done && <span className="text-[10px] leading-none">✓</span>}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold ${done ? "line-through opacity-60" : "text-crt-green"}`}>
                            {lesson.title}
                          </div>
                          <div className="text-[10px] text-crt-green/40 mt-0.5 leading-relaxed">
                            {lesson.desc}
                          </div>
                          {done && ts && (
                            <div className={`text-[9px] mt-1 ${CHAPTER_COLORS[lesson.chapter]}`}>
                              {t("powerupTracker.lessonDone")}: {new Date(ts).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        {/* XP badge */}
                        <div
                          className={`text-[9px] border px-1.5 py-0.5 rounded shrink-0 ${
                            done
                              ? `${CHAPTER_BORDER[chapter]} ${CHAPTER_COLORS[chapter]} opacity-60`
                              : "border-crt-green/20 text-crt-green/40"
                          }`}
                        >
                          +{lesson.xp} XP
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── Reset button ── */}
        {completedCount > 0 && (
          <div className="border-t border-crt-green/10 pt-6 text-center">
            <button
              onClick={handleReset}
              className="text-xs text-crt-red/50 hover:text-crt-red border border-crt-red/20 hover:border-crt-red/40 px-4 py-2 rounded transition-colors"
            >
              {t("powerupTracker.reset")}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
