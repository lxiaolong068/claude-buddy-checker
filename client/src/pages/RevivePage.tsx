/**
 * RevivePage — /revive
 * Step-by-step MCP installation guide to restore Claude Buddy after v2.1.97 removal.
 * SEO target: "claude buddy MCP", "revive claude buddy", "bring back buddy MCP"
 */

import { useState, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { useHreflangLinks } from "@/hooks/useHreflangLinks";
import { SITE_URL } from "@/lib/constants";
import SiteHeader from "@/components/SiteHeader";

// ── Constants ─────────────────────────────────────────────────────────────────

const PETITION_URL    = "https://github.com/anthropics/claude-code/issues/45732";
const CONSOLIDATED_URL = "https://github.com/anthropics/claude-code/issues/45596";
const OPEN_SOURCE_URL  = "https://github.com/1270011/claude-buddy";

const CMD_FIND_UUID     = "cat ~/.claude.json | grep -E 'accountUuid|userID'";
const CMD_FIND_UUID_WIN = "Select-String 'accountUuid|userID' ~/.claude.json";
const CMD_NODE_VER      = "node --version";
const CMD_INSTALL       = "npx @1270011/claude-buddy install";
const CMD_MCP_LIST      = "claude mcp list";
const CMD_VERIFY        = "/buddy status";
const CMD_CLAUDE_MD     = "# At the start of each session, greet my Buddy\n/buddy status";

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyButton({ text, id, active }: { text: string; id: string; active: string | null }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text).catch(() => {})}
      className="shrink-0 px-1.5 py-0.5 text-[10px] border border-border/50 hover:border-crt-green/50 hover:text-crt-green transition-all font-mono"
    >
      {active === id ? "COPIED!" : "[CP]"}
    </button>
  );
}

// ── Code block ────────────────────────────────────────────────────────────────

function CodeBlock({ cmd, id, copied, onCopy }: {
  cmd:    string;
  id:     string;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <div className="flex items-start gap-1.5 mt-1.5">
      <code className="flex-1 text-crt-green bg-black/40 border border-border/30 px-2.5 py-2 text-[11px] font-mono whitespace-pre leading-relaxed break-all">
        {cmd}
      </code>
      <button
        onClick={() => onCopy(cmd, id)}
        className="shrink-0 mt-0.5 px-1.5 py-1 text-[10px] border border-border/50 hover:border-crt-green/50 hover:text-crt-green transition-all font-mono"
      >
        {copied === id ? "COPIED!" : "[CP]"}
      </button>
    </div>
  );
}

// ── Step card ─────────────────────────────────────────────────────────────────

function StepCard({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border/40 bg-card/30 p-4 sm:p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="shrink-0 w-7 h-7 border border-crt-green/40 bg-crt-green/10 text-crt-green text-xs font-bold flex items-center justify-center font-mono">
          {num}
        </span>
        <h3 className="text-sm font-bold text-crt-green tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ── Why item ──────────────────────────────────────────────────────────────────

function WhyItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3 py-3 border-b border-border/20 last:border-0">
      <span className="text-crt-green text-lg shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-bold text-crt-green tracking-wide mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── FAQ item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/20 last:border-0">
      <button
        className="w-full text-left py-3 flex items-start justify-between gap-2 hover:text-crt-green transition-colors group"
        onClick={() => setOpen(v => !v)}
      >
        <span className="text-xs font-mono text-muted-foreground group-hover:text-crt-green transition-colors">{q}</span>
        <span className="text-crt-green/40 text-xs shrink-0 font-mono">{open ? "[-]" : "[+]"}</span>
      </button>
      {open && (
        <p className="text-xs text-muted-foreground pb-3 leading-relaxed pl-2 border-l border-crt-green/20">
          {a}
        </p>
      )}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-bold text-crt-green tracking-widest font-mono">{label}</span>
      <div className="flex-1 h-px bg-crt-green/15" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RevivePage() {
  const { t, locale } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  useHreflangLinks(`${SITE_URL}/revive`);

  useEffect(() => {
    document.title = t("revive.pageTitle");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("revive.metaDesc"));
  }, [locale, t]);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }, []);

  return (
    <div className="min-h-screen bg-background font-mono">
      <SiteHeader />

      <div className="max-w-[760px] mx-auto px-4 py-8 sm:py-12">

        {/* ── Hero ── */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-crt-green glow-text tracking-widest mb-2">
            {t("revive.h1")}
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
            {t("revive.subtitle")}
          </p>
        </div>

        {/* ── Alert: petition ── */}
        <div className="mb-8 border border-crt-amber/50 bg-crt-amber/5 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-[10px] font-bold text-crt-amber tracking-widest animate-pulse shrink-0">
            ▶ {t("revive.alertTag")}
          </span>
          <span className="text-xs text-muted-foreground flex-1">{t("revive.alertText")}</span>
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-crt-amber hover:underline shrink-0 font-bold"
          >
            {t("revive.alertCta")}
          </a>
        </div>

        {/* ── Section 1: Before you start ── */}
        <div className="mb-10">
          <SectionTitle label={t("revive.sec1Title")} />
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            {t("revive.sec1Body")}
          </p>

          <div className="space-y-2">
            <p className="text-[10px] text-crt-green/60 uppercase tracking-widest">{t("revive.cmdFindUuid")}</p>
            <CodeBlock cmd={CMD_FIND_UUID}     id="uuid-mac"  copied={copied} onCopy={handleCopy} />
            <p className="text-[10px] text-crt-green/40 uppercase tracking-widest mt-3">{t("revive.cmdFindUuidWin")}</p>
            <CodeBlock cmd={CMD_FIND_UUID_WIN} id="uuid-win"  copied={copied} onCopy={handleCopy} />
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 text-xs border border-crt-green/40 text-crt-green hover:bg-crt-green/10 transition-all"
          >
            {t("revive.checkFirst")}
          </Link>
        </div>

        {/* ── Section 2: Installation steps ── */}
        <div className="mb-10">
          <SectionTitle label={t("revive.sec2Title")} />
          <div className="space-y-3">

            <StepCard num={1} title={t("revive.step1Title")}>
              <p className="text-xs text-muted-foreground mb-2">{t("revive.step1Desc")}</p>
              <CodeBlock cmd={CMD_NODE_VER} id="node-ver" copied={copied} onCopy={handleCopy} />
              <p className="text-[10px] text-crt-green/40 mt-2">{t("revive.step1Skip")}</p>
            </StepCard>

            <StepCard num={2} title={t("revive.step2Title")}>
              <p className="text-xs text-muted-foreground mb-2">{t("revive.step2Desc")}</p>
              <CodeBlock cmd={CMD_INSTALL} id="install" copied={copied} onCopy={handleCopy} />
            </StepCard>

            <StepCard num={3} title={t("revive.step3Title")}>
              <p className="text-xs text-muted-foreground">{t("revive.step3Desc")}</p>
            </StepCard>

            <StepCard num={4} title={t("revive.step4Title")}>
              <p className="text-xs text-muted-foreground mb-2">{t("revive.step4Desc")}</p>
              <CodeBlock cmd={CMD_VERIFY} id="verify" copied={copied} onCopy={handleCopy} />
              <p className="text-[10px] text-crt-green/50 mt-3 leading-relaxed">
                ✓ {t("revive.step4Success")}
              </p>
            </StepCard>

            <StepCard num={5} title={t("revive.step5Title")}>
              <p className="text-xs text-muted-foreground mb-2">{t("revive.step5Desc")}</p>
              <CodeBlock cmd={CMD_CLAUDE_MD} id="claudemd" copied={copied} onCopy={handleCopy} />
            </StepCard>

          </div>
        </div>

        {/* ── Section 3: Why MCP ── */}
        <div className="mb-10">
          <SectionTitle label={t("revive.sec3Title")} />
          <div className="border border-border/30 bg-card/20 px-4 divide-y divide-border/20">
            <WhyItem icon="🔒" title={t("revive.whyItem1Title")} desc={t("revive.whyItem1Desc")} />
            <WhyItem icon="⚙️" title={t("revive.whyItem2Title")} desc={t("revive.whyItem2Desc")} />
            <WhyItem icon="★" title={t("revive.whyItem3Title")} desc={t("revive.whyItem3Desc")} />
          </div>
          <a
            href={OPEN_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs text-crt-green/60 hover:text-crt-green transition-colors"
          >
            {t("revive.openSource")}
          </a>
        </div>

        {/* ── Section 4: Troubleshooting ── */}
        <div className="mb-10">
          <SectionTitle label={t("revive.sec4Title")} />
          <div className="border border-border/30 bg-card/20 px-4">
            <FaqItem q={t("revive.faq1Q")} a={t("revive.faq1A")} />
            <FaqItem q={t("revive.faq2Q")} a={t("revive.faq2A")} />
            <FaqItem q={t("revive.faq3Q")} a={t("revive.faq3A")} />
            <FaqItem q={t("revive.faq4Q")} a={t("revive.faq4A")} />
          </div>
        </div>

        {/* ── Section 5: Petition CTA ── */}
        <div className="border border-crt-amber/40 bg-crt-amber/5 p-5">
          <SectionTitle label={t("revive.sec5Title")} />
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            {t("revive.petitionBody")}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold border border-crt-amber text-crt-amber hover:bg-crt-amber hover:text-black transition-all tracking-wider"
            >
              {t("revive.petitionCta")}
            </a>
            <a
              href={CONSOLIDATED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs border border-border/50 text-muted-foreground hover:border-crt-amber/50 hover:text-crt-amber transition-all"
            >
              {t("revive.petitionConsolidated")}
            </a>
          </div>
        </div>

        {/* ── Footer nav ── */}
        <div className="mt-8 pt-4 border-t border-border/20 flex items-center gap-4 text-[10px] text-muted-foreground/40">
          <Link href="/" className="hover:text-crt-green transition-colors">← CHECKER</Link>
          <Link href="/blog/where-did-my-claude-buddy-go-mcp-revival-guide" className="hover:text-crt-green transition-colors">BLOG POST</Link>
          <a href={OPEN_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-crt-green transition-colors">GITHUB</a>
        </div>

      </div>
    </div>
  );
}
