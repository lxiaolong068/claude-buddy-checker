/**
 * og-image.ts — SVG OG image generator (Node.js, no native deps)
 *
 * Generates 1200×630 SVG cards in CRT terminal style for:
 *   - /api/og/species/:slug.svg  → species encyclopedia card
 *   - /api/og/blog/:slug.svg     → blog post card
 *
 * Compatibility: Discord ✓ · Slack ✓ · Telegram ✓ · iMessage ✓
 *                Twitter/X uses the raster hero fallback (twitter:image)
 */

import { SPECIES_OG, BLOG_OG } from "../shared/og-meta.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Escape XML special chars so SVG text is valid. */
function x(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Wrap a string into lines of at most `max` chars, splitting on spaces. */
function wrap(text: string, max: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length <= max) {
      cur = test;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── Common SVG fragments ───────────────────────────────────────────────────────

const DEFS = `<defs>
  <filter id="glow" x="-15%" y="-15%" width="130%" height="130%">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-color="#33ff33" flood-opacity="0.45" result="fc"/>
    <feComposite in="fc" in2="blur" operator="in" result="cb"/>
    <feMerge><feMergeNode in="cb"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="glow-sm" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur stdDeviation="1.5" result="blur"/>
    <feFlood flood-color="#33ff33" flood-opacity="0.3" result="fc"/>
    <feComposite in="fc" in2="blur" operator="in" result="cb"/>
    <feMerge><feMergeNode in="cb"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <pattern id="scan" width="1200" height="4" patternUnits="userSpaceOnUse">
    <rect y="0" width="1200" height="2" fill="transparent"/>
    <rect y="2" width="1200" height="2" fill="rgba(0,0,0,0.10)"/>
  </pattern>
</defs>`;

function svgBase(body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
${DEFS}
<!-- background -->
<rect width="1200" height="630" fill="#0d0d0d"/>
<!-- scan lines -->
<rect width="1200" height="630" fill="url(#scan)"/>
<!-- outer border -->
<rect x="1" y="1" width="1198" height="628" fill="none" stroke="#1a4a1a" stroke-width="1.5"/>
<rect x="6" y="6" width="1188" height="618" fill="none" stroke="#0f2e0f" stroke-width="1"/>
${body}
</svg>`;
}

function headerBar(right: string): string {
  return `<!-- header bar -->
<rect x="1" y="1" width="1198" height="48" fill="#0a1800"/>
<rect x="1" y="49" width="1198" height="1" fill="#1a4a1a"/>
<text x="40" y="32" font-family="monospace" font-size="13" fill="#2a7a2a" font-weight="bold">CLAUDE BUDDY CHECKER</text>
<text x="1160" y="32" font-family="monospace" font-size="12" fill="#1a5a1a" text-anchor="end">${x(right)}</text>`;
}

function footerBar(left: string): string {
  return `<!-- footer bar -->
<rect x="1" y="581" width="1198" height="48" fill="#0a1800"/>
<rect x="1" y="581" width="1198" height="1" fill="#1a4a1a"/>
<text x="40" y="614" font-family="monospace" font-size="11" fill="#1a5a1a">${x(left)}</text>
<text x="1160" y="614" font-family="monospace" font-size="10" fill="#0f3a0f" text-anchor="end">CLAUDE BUDDY CHECKER · claudebuddy.art</text>`;
}

// ── Species card ──────────────────────────────────────────────────────────────

export function generateSpeciesSvg(slug: string): string | null {
  const d = SPECIES_OG[slug];
  if (!d) return null;

  // Description: wrap at 52 chars, max 4 lines
  const descLines = wrap(d.description, 52).slice(0, 4);

  // ASCII art: center in right box (box x=726..1186, center=956)
  const artX = 956;
  const artStartY = 230;
  const artLineH = 24;

  const artSvg = d.art
    .map((line, i) => {
      const trimmed = line.trimEnd();
      if (!trimmed) return "";
      return `<text x="${artX}" y="${artStartY + i * artLineH}" font-family="monospace" font-size="17" fill="#33ff33" filter="url(#glow-sm)" text-anchor="middle">${x(trimmed)}</text>`;
    })
    .filter(Boolean)
    .join("\n");

  // Stat colour
  const statColors: Record<string, string> = {
    DEBUGGING: "#e06c60", PATIENCE: "#58a6ff", CHAOS: "#af87ff",
    WISDOM: "#ffc107", SNARK: "#4eba65",
  };
  const statColor = statColors[d.peakStat] ?? "#33ff33";

  const descSvg = descLines
    .map((line, i) =>
      `<text x="40" y="${318 + i * 23}" font-family="monospace" font-size="13" fill="#3a8a3a">${x(line)}</text>`
    )
    .join("\n");

  const tagsSvg = d.tags
    .map((tag, i) =>
      `<text x="${40 + i * 130}" y="263" font-family="monospace" font-size="12" fill="#1a6a1a">${x(tag)}</text>`
    )
    .join("\n");

  return svgBase(`
${headerBar(`claudebuddy.art/species/${slug}`)}

<!-- left column: species info (x=40..700) -->
<text x="40" y="92" font-family="monospace" font-size="10" fill="#1a5a1a" letter-spacing="2">SPECIES FILE ——————————</text>

<!-- species name with glow -->
<text x="40" y="175" font-family="monospace" font-size="68" font-weight="bold" fill="#33ff33" filter="url(#glow)">${x(d.name.toUpperCase())}</text>

<!-- category + peak stat -->
<text x="40" y="210" font-family="monospace" font-size="13" fill="#2a8a2a">CATEGORY: <tspan fill="#3a9a3a">${x(d.category.toUpperCase())}</tspan>  ·  PEAK STAT: <tspan fill="${statColor}">${x(d.peakStat)}</tspan></text>

<!-- tags -->
${tagsSvg}

<!-- divider -->
<line x1="40" y1="278" x2="700" y2="278" stroke="#1a4a1a" stroke-width="1"/>

<!-- description -->
${descSvg}

<!-- right column: ASCII art box (x=726..1186) -->
<rect x="726" y="62" width="460" height="508" fill="#080f08" stroke="#1a4a1a" stroke-width="1"/>
<rect x="726" y="62" width="460" height="32" fill="#0a1800"/>
<rect x="726" y="94" width="460" height="1" fill="#1a4a1a"/>
<text x="956" y="84" font-family="monospace" font-size="10" fill="#1a5a1a" letter-spacing="2" text-anchor="middle">◈ ASCII PROFILE</text>

<!-- ASCII art -->
${artSvg}

<!-- species attribute badges (bottom of right box) -->
<rect x="756" y="490" width="130" height="22" fill="#0a1800" stroke="#1a4a1a" stroke-width="1"/>
<text x="821" y="505" font-family="monospace" font-size="10" fill="#2a7a2a" text-anchor="middle">${x(d.category.toUpperCase())}</text>
<rect x="910" y="490" width="130" height="22" fill="#0a1800" stroke="${statColor}44" stroke-width="1"/>
<text x="975" y="505" font-family="monospace" font-size="10" fill="${statColor}" text-anchor="middle">${x(d.peakStat)}</text>

${footerBar(`claudebuddy.art/species/${slug}`)}
`);
}

// ── Blog card ─────────────────────────────────────────────────────────────────

export function generateBlogSvg(slug: string): string | null {
  const d = BLOG_OG[slug];
  if (!d) return null;

  // Title: wrap at 44 chars, max 2 lines
  const titleLines = wrap(d.title, 44).slice(0, 2);
  // Excerpt: wrap at 68 chars, max 3 lines
  const excerptLines = wrap(d.excerpt, 68).slice(0, 3);

  const titleSvg = titleLines
    .map((line, i) =>
      `<text x="60" y="${190 + i * 58}" font-family="monospace" font-size="48" font-weight="bold" fill="#33ff33" filter="url(#glow)">${x(line)}</text>`
    )
    .join("\n");

  const excerptStartY = titleLines.length > 1 ? 340 : 290;
  const excerptSvg = excerptLines
    .map((line, i) =>
      `<text x="60" y="${excerptStartY + i * 24}" font-family="monospace" font-size="14" fill="#3a8a3a">${x(line)}</text>`
    )
    .join("\n");

  const tagsSvg = d.tags
    .slice(0, 5)
    .map((tag, i) =>
      `<text x="${60 + i * 140}" y="140" font-family="monospace" font-size="13" fill="#1a6a1a">${x(tag)}</text>`
    )
    .join("\n");

  const metaY = excerptStartY + excerptLines.length * 24 + 32;

  return svgBase(`
${headerBar("claudebuddy.art/blog")}

<!-- decorative corner glyphs -->
<text x="60" y="115" font-family="monospace" font-size="11" fill="#1a5a1a" letter-spacing="2">BLOG POST ——————————————————————————</text>

<!-- tags -->
${tagsSvg}

<!-- title -->
${titleSvg}

<!-- divider -->
<line x1="60" y1="${excerptStartY - 18}" x2="1140" y2="${excerptStartY - 18}" stroke="#1a4a1a" stroke-width="1"/>

<!-- excerpt -->
${excerptSvg}

<!-- metadata row -->
<text x="60" y="${metaY}" font-family="monospace" font-size="12" fill="#2a7a2a">${d.readingTime} MIN READ</text>
<text x="${60 + 140}" y="${metaY}" font-family="monospace" font-size="12" fill="#1a5a1a">·</text>
<text x="${60 + 160}" y="${metaY}" font-family="monospace" font-size="12" fill="#1a5a1a">${x(d.publishedAt)}</text>

<!-- right side ASCII accent -->
<text x="1100" y="350" font-family="monospace" font-size="60" fill="#0f2e0f" text-anchor="middle">{ }</text>
<text x="1100" y="420" font-family="monospace" font-size="28" fill="#0d220d" text-anchor="middle">&gt;_</text>

${footerBar(`claudebuddy.art/blog/${slug}`)}
`);
}
