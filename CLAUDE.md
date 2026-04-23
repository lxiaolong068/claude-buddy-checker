# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
npm run dev        # Start Vite dev server on port 3000 (use --host flag, already configured)
npm run build      # Vite build → ESbuild bundles Express server → dist/
npm run start      # Production: NODE_ENV=production node dist/index.js
npm run check      # TypeScript type checking (tsc --noEmit)
npm run format     # Prettier formatting
```

No test runner is configured (Vitest is a dev dependency but no test files exist yet).

## Architecture Overview

**Claude Buddy Checker** is a React 19 + Vite SPA with an Express server for production static file serving. All computation is client-side — there is no backend API, database, or authentication.

### Routing & Entry Points

- **Router**: Wouter (not React Router) — lightweight client-side router
- **`client/src/App.tsx`**: Route definitions (`/`, `/species`, `/species/:id`, `/blog`, `/blog/:slug`)
- **`client/src/main.tsx`**: React entry, wraps app in `ThemeContext` + `I18nProvider`
- **`server/index.ts`**: Express server — serves `dist/public/` and catch-all to `index.html`

### Core Business Logic (`client/src/lib/`)

| File | Purpose |
|------|---------|
| `buddy-engine.ts` | Deterministic buddy generation: FNV-1a hash on UUID → Mulberry32 PRNG → species, rarity, stats, cosmetics |
| `species-data.ts` | 18 species definitions (tags, lore, peak stats, ASCII art frames) |
| `species-faq.ts` | FAQ database for all 18 species in EN/ZH/KO |
| `blog-data.ts` | 3 blog articles with EN/ZH/KO frontmatter and body content |
| `share-card-renderer.ts` | Canvas API rendering for 1200×630 social share PNG cards |

### State & Providers

- **`I18nContext.tsx`**: `t()` and `dict` — locale stored in localStorage, auto-detected from browser, updates `<html lang>` and hreflang meta tags. Supported locales: `en`, `zh`, `ko`.
- **`ThemeContext`**: Dark mode only (CRT terminal theme).

### Path Aliases

```
@/*       → client/src/*
@shared/* → shared/*
```

### Styling System

- **Tailwind CSS v4** (uses Vite plugin, not PostCSS — no `tailwind.config.js`)
- **CRT terminal aesthetic**: phosphor green (`oklch(0.85 0.25 145)`) on near-black background, JetBrains Mono font exclusively
- Custom CSS vars defined in `client/src/index.css` (crt-green, crt-amber, crt-red, crt-blue, crt-purple, crt-gold)
- Scan line overlay applied globally via `::after` on `.crt-scanlines` class

### UI Components

- **shadcn/ui** components are in `client/src/components/ui/` (New York style, no RSC)
- **Custom components** in `client/src/components/` — 70+ components total
- Radix UI primitives used directly for anything without a shadcn wrapper
- **React 19 compatibility note**: Some Radix UI components (e.g., tooltips) were replaced with pure CSS/React implementations to avoid React 19 ref forwarding issues

### SEO Architecture

Pages emit JSON-LD structured data via dedicated components:
- `WebAppSchema`, `ArticleSchema`, `FAQSchema`, `BreadcrumbSchema`
- Dynamic meta tags (OG, Twitter) set per-page
- Hreflang alternate links updated by `I18nProvider`
- `client/public/sitemap.xml` (24 URLs) and `robots.txt` are static files

### Build Output

```
dist/
  public/     # Vite frontend build (served as static files)
  index.js    # ESbuild-bundled Express server (ESM format)
```

## Key Conventions

- **All new species** require entries in: `species-data.ts`, `species-faq.ts`, and species-specific i18n keys in all three locale files
- **All user-facing strings** must use the `t()` hook — no hardcoded strings in JSX
- **ASCII sprite frames** in species-data are 12-frame arrays used by `BuddySprite.tsx` for animation
- **Rarity tiers**: common → uncommon → rare → epic → legendary (probability weights in `buddy-engine.ts`)
- The `.manus-logs/` directory (created by the Vite debug plugin) should not be committed

## Vercel Operations

This project deploys on Vercel. For any Vercel-related task (deploy, env vars, project config, log tailing, domain/alias management, etc.), invoke the Vercel CLI directly — do **not** ask the user to run it manually.

**Token**: `VERCEL_TOKEN` lives in `.env.local` (gitignored). Never echo it, never commit it, never include it in PR descriptions, commit messages, or any file tracked by git.

**Invocation pattern** (inline, per-command):

```bash
VERCEL_TOKEN=$(grep '^VERCEL_TOKEN=' .env.local | cut -d= -f2-) npx vercel <command>
```

Prefer `npx vercel` to avoid relying on a global install. Pass `--yes` to skip prompts in non-interactive contexts. For destructive operations (`vercel remove`, domain changes, production env mutations), still confirm with the user first per the Safety Rules.
