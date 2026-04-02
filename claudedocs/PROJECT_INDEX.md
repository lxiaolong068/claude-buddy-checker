# Claude Buddy Checker — Project Index

> Generated knowledge base for AI-assisted development. Last updated: 2026-04-03.

---

## Table of Contents

1. [Project Purpose](#1-project-purpose)
2. [System Architecture](#2-system-architecture)
3. [Data Flow](#3-data-flow)
4. [Core Engine API](#4-core-engine-api)
5. [Data Models](#5-data-models)
6. [Pages & Routes](#6-pages--routes)
7. [Component Inventory](#7-component-inventory)
8. [Internationalization System](#8-internationalization-system)
9. [SEO Architecture](#9-seo-architecture)
10. [Styling Reference](#10-styling-reference)
11. [Adding New Content](#11-adding-new-content)
12. [Build Pipeline](#12-build-pipeline)

---

## 1. Project Purpose

**Claude Buddy Checker** is a client-side tool that lets Claude Code users look up their deterministically generated "Buddy" — a terminal pet assigned via a hash of their account UUID. The site combines:

- A UUID → Buddy lookup tool (homepage)
- An 18-species encyclopedia with programmatic SEO pages (`/species/:slug`)
- A blog with how-to guides and ranking articles (`/blog/:slug`)
- Social sharing via Canvas-generated 1200×630 PNG cards

All computation is **client-only**. There is no backend API, database, or user authentication.

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────┐
│                  Browser (SPA)                   │
│                                                  │
│  React 19 + Wouter + Tailwind CSS v4             │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Pages   │  │Components│  │  lib/ (logic) │  │
│  │ /        │  │BuddyCard │  │ buddy-engine  │  │
│  │ /species │  │BuddySprite│ │ species-data  │  │
│  │ /species/│  │ShareCard │  │ blog-data     │  │
│  │ /blog    │  │FAQSection│  │ species-faq   │  │
│  │ /blog/   │  │LazyImage │  │ share-card-   │  │
│  └──────────┘  └──────────┘  │  renderer     │  │
│                               └───────────────┘  │
│  ┌──────────────────┐  ┌──────────────────────┐  │
│  │  I18nContext     │  │  ThemeContext         │  │
│  │  en/zh/ko dicts  │  │  dark mode (default) │  │
│  └──────────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────┘
           │
           ▼ (production)
┌─────────────────────────────────────────────────┐
│  Express server (dist/index.js)                  │
│  Serves dist/public/ + catch-all → index.html   │
└─────────────────────────────────────────────────┘
```

---

## 3. Data Flow

### UUID → Buddy Generation

```
User inputs UUID
      │
      ▼
rollBuddy(userId)                [buddy-engine.ts]
      │
      ├─ hashString(userId + SALT)   → FNV-1a hash (uint32)
      │
      ├─ mulberry32(hash)            → PRNG seeded deterministically
      │
      ├─ rollRarity(rng)             → weighted pick (60/25/10/4/1)
      ├─ pick(rng, SPECIES)          → one of 18 species
      ├─ pick(rng, EYES)             → one of 6 eye chars
      ├─ rarity !== 'common'         → pick hat (else 'none')
      ├─ rng() < 0.01                → shiny flag
      └─ rollStats(rng, rarity)      → 5 stats with floor/peak/dump
             │
             ▼
        BuddyResult { rarity, species, eye, hat, shiny, stats }
             │
             ▼
      BuddyResultCard (display)
      BuddySprite (ASCII animation)
      ShareCardModal (Canvas PNG)
```

### Species Page Flow

```
/species/:slug
      │
      ▼
SpeciesDetail.tsx
      │
      ├─ SPECIES_DATA[slug]          [species-data.ts]
      ├─ SPECIES_FAQ[slug][locale]   [species-faq.ts]
      ├─ rollBuddy(exampleUUID)      → demo buddy for display
      └─ JSON-LD: FAQSchema, BreadcrumbSchema, WebAppSchema
```

### Blog Page Flow

```
/blog/:slug
      │
      ▼
BlogPost.tsx
      │
      ├─ BLOG_ARTICLES.find(slug)    [blog-data.ts]
      ├─ article.content[locale]     → title, sections, meta
      └─ JSON-LD: ArticleSchema, BreadcrumbSchema
```

---

## 4. Core Engine API

**File:** `client/src/lib/buddy-engine.ts`

### Constants

| Export | Type | Description |
|--------|------|-------------|
| `RARITIES` | `readonly string[]` | `['common','uncommon','rare','epic','legendary']` |
| `RARITY_WEIGHTS` | `Record<Rarity,number>` | `{common:60, uncommon:25, rare:10, epic:4, legendary:1}` |
| `RARITY_FLOOR` | `Record<Rarity,number>` | Minimum stat value per rarity tier |
| `RARITY_STARS` | `Record<Rarity,string>` | ★ display strings |
| `SPECIES` | `readonly string[]` | 18 species slugs |
| `EYES` | `readonly string[]` | 6 eye characters (`·`, `✦`, `×`, `◉`, `@`, `°`) |
| `HATS` | `readonly string[]` | 8 hat types (none + 7) |
| `STAT_NAMES` | `readonly string[]` | `['DEBUGGING','PATIENCE','CHAOS','WISDOM','SNARK']` |
| `STAT_COLORS` | `Record<StatName,string>` | Hex colors per stat for chart rendering |
| `SALT` | `string` | `'friend-2026-401'` — hash salt |
| `BODIES` | `Record<Species,string[][]>` | 3-frame ASCII art per species (lines × frames) |
| `HAT_LINES` | `Record<Hat,string>` | Single ASCII line for each hat |
| `IDLE_SEQUENCE` | `number[]` | Frame sequence for idle animation |
| `SPECIES_DISPLAY` | `Record<Species,string>` | Human-readable species names |

### Functions

```ts
rollBuddy(userId: string): BuddyResult
// Main entry point. Seeds PRNG from FNV-1a(userId + SALT).
// Always returns the same result for the same input.

renderSprite(buddy: BuddyResult, frame?: number): string[]
// Returns array of ASCII lines for a given animation frame.
// Substitutes {E} placeholders with buddy.eye.
// Injects hat line at index 0 if empty.
```

### Types

```ts
interface BuddyResult {
  rarity: Rarity;         // 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  species: Species;       // one of 18 species slugs
  eye: string;            // character for eye placeholder {E}
  hat: Hat;               // 'none' | 'crown' | 'tophat' | 'propeller' | 'halo' | 'wizard' | 'beanie' | 'tinyduck'
  shiny: boolean;         // 1% chance, visual-only flag
  stats: Record<StatName, number>; // DEBUGGING/PATIENCE/CHAOS/WISDOM/SNARK → 1–100
}
```

---

## 5. Data Models

### SpeciesInfo (`client/src/lib/species-data.ts`)

```ts
interface SpeciesInfo {
  slug: Species;
  defaultFrame: number;         // 0 (display frame for encyclopedia)
  defaultEye: string;           // '·' for most species
  tags: string[];               // personality descriptors
  category: 'animal'|'creature'|'object'|'mythical';
  peakStat: string;             // DEBUGGING|PATIENCE|CHAOS|WISDOM|SNARK
  related: Species[];           // 3 related species for internal linking
}
```

**18 species with categories:**
- `animal`: duck, goose, cat, octopus, owl, penguin, turtle, snail, capybara, rabbit
- `creature`: blob, ghost, axolotl, chonk
- `object`: cactus, robot, mushroom
- `mythical`: dragon

### BlogArticle (`client/src/lib/blog-data.ts`)

```ts
interface BlogArticle {
  slug: string;
  publishedAt: string;          // ISO date
  updatedAt?: string;
  readingTime: number;          // minutes
  tags: string[];
  coverImage?: string;
  content: { en: ArticleContent; zh: ArticleContent; ko: ArticleContent; };
}

interface ArticleContent {
  title: string;
  metaTitle: string;            // for <title> tag (longer, SEO optimized)
  metaDescription: string;      // for meta description
  excerpt: string;              // blog card summary
  sections: ArticleSection[];   // { heading, body: HTML string }
}
```

**3 published articles:**
- `how-to-find-your-claude-code-buddy` — UUID guide
- `claude-code-buddy-rarity-rankings` — rarity tier list
- `best-species-for-developers` — species guide (tags vary)

### ShareCardBuddyData (`client/src/lib/share-card-renderer.ts`)

```ts
// Two modes for the share card renderer:
type ShareCardBuddyData =
  | { type: 'buddy'; buddy: BuddyResult; labels: Record<string, string> }
  | { type: 'species'; species: Species; labels: Record<string, string> };
```

---

## 6. Pages & Routes

| Route | Component | Key Data Sources |
|-------|-----------|------------------|
| `/` | `Home.tsx` | `rollBuddy()`, `getAllArticles()` |
| `/species` | `SpeciesIndex.tsx` | `SPECIES_DATA` (all 18 entries) |
| `/species/:slug` | `SpeciesDetail.tsx` | `SPECIES_DATA[slug]`, `SPECIES_FAQ[slug]` |
| `/blog` | `BlogIndex.tsx` | `BLOG_ARTICLES` |
| `/blog/:slug` | `BlogPost.tsx` | `BLOG_ARTICLES.find(slug)` |
| `*` | `NotFound.tsx` | — |

**Helper functions in blog-data.ts:**
```ts
getAllArticles(): BlogArticle[]         // sorted by publishedAt desc
getArticleBySlug(slug): BlogArticle | undefined
```

---

## 7. Component Inventory

### Custom Components (`client/src/components/`)

| Component | Purpose |
|-----------|---------|
| `BuddyResultCard` | Full result display: species, rarity, stats, share button |
| `BuddySprite` | Animated ASCII sprite with IDLE_SEQUENCE timing |
| `StatBar` | Single stat row with label + colored progress bar |
| `ShareButton` | Trigger button that opens ShareCardModal |
| `ShareCardModal` | Dialog wrapping Canvas-based PNG generator |
| `FAQSection` | Accordion FAQ with i18n content |
| `LazyImage` | IntersectionObserver lazy load with skeleton + fade |
| `ScrollToTop` | Fixed button appearing after 400px scroll |
| `SpeciesTooltip` | CRT-style hover tooltip for related species cards |
| `TypewriterText` | Character-by-character reveal animation |
| `LanguageSwitcher` | EN/中/한 toggle buttons |
| `ErrorBoundary` | Top-level React error boundary |
| `WebAppSchema` | JSON-LD WebApplication structured data |
| `ArticleSchema` | JSON-LD Article structured data |
| `FAQSchema` | JSON-LD FAQPage structured data |

### shadcn/ui Components (`client/src/components/ui/`)

Standard shadcn/ui library (New York style). Key ones used in this project:
- `accordion` — FAQ sections
- `dialog` — Share card modal
- `badge` — Species category + rarity tags
- `button` — All CTAs
- `separator` — Section dividers
- `tooltip` — (replaced with custom CSS in some places for React 19 compat)

> **React 19 note:** Radix UI tooltip with `asChild` + `forwardRef` has known issues in React 19. The `SpeciesTooltip` component uses a pure CSS/React implementation instead.

---

## 8. Internationalization System

**Provider:** `client/src/contexts/I18nContext.tsx`

### Usage

```tsx
import { useI18n } from '@/contexts/I18nContext';

function MyComponent() {
  const { t, dict, locale, setLocale } = useI18n();
  return <p>{t('home.hero.title')}</p>;
}
```

### Key Exports from Context

| Export | Type | Description |
|--------|------|-------------|
| `t(key)` | `(key: string) => string` | Dot-notation key lookup with fallback to key string |
| `dict` | `TranslationDict` | Entire translation object for current locale |
| `locale` | `'en' \| 'zh' \| 'ko'` | Current active locale |
| `setLocale(locale)` | `(locale: Locale) => void` | Change locale, persists to localStorage |

### Locale Detection Priority

1. `localStorage.getItem('buddy-locale')`
2. `navigator.language` (zh* → zh, ko* → ko, else → en)

### Translation Files

- `client/src/i18n/en.ts` — English (source of truth, TypeScript typed)
- `client/src/i18n/zh.ts` — Simplified Chinese
- `client/src/i18n/ko.ts` — Korean

`TranslationDict` type is derived from `typeof en`, so TypeScript enforces all locales match the EN structure.

### FAQ Translations

Species FAQs are stored separately in `client/src/lib/species-faq.ts` as:
```ts
SPECIES_FAQ: Record<Species, Record<Locale, { question: string; answer: string }[]>>
```

Blog article translations are inline in `blog-data.ts` under `content.en/zh/ko`.

---

## 9. SEO Architecture

### Structured Data Components

| Component | Schema Type | Used On |
|-----------|-------------|---------|
| `WebAppSchema` | `WebApplication` | Homepage, Species pages |
| `ArticleSchema` | `Article` | Blog post pages |
| `FAQSchema` | `FAQPage` | Species detail pages |
| (inline) | `BreadcrumbList` | Species detail, Blog post |

All schemas are rendered as `<script type="application/ld+json">` via `dangerouslySetInnerHTML`.

### Meta Tag Strategy

Each page sets `document.title` and `meta[name="description"]` via `useEffect` on locale change. OG/Twitter card tags are defined in `client/index.html` with defaults, overridden per-page.

### Hreflang

`I18nProvider` dynamically updates `<html lang>` and hreflang alternate links in `<head>` when locale changes.

### Static SEO Files

- `client/public/sitemap.xml` — 24 URLs (home + 18 species + 3 blog + 2 index pages)
- `client/public/robots.txt` — allows all crawlers

### Image SEO

- `LazyImage` component enforces explicit `width`/`height` (CLS prevention)
- Hero image uses `fetchPriority="high"` + eager loading + `<link rel="preload">`
- Grid images use lazy loading with 200px `rootMargin`
- CDN preconnect in `index.html` for CloudFront

---

## 10. Styling Reference

### CRT Color Palette (CSS Variables in `client/src/index.css`)

| Variable | Value | Use |
|----------|-------|-----|
| `--crt-green` | `oklch(0.85 0.25 145)` | Primary text, borders, UI |
| `--crt-amber` | `oklch(0.80 0.15 70)` | Warnings, highlights |
| `--crt-red` | `oklch(0.65 0.22 25)` | Errors, DEBUGGING stat |
| `--crt-blue` | `oklch(0.65 0.18 250)` | Rare rarity, PATIENCE stat |
| `--crt-purple` | `oklch(0.65 0.20 300)` | Epic rarity, CHAOS stat |
| `--crt-gold` | `oklch(0.82 0.18 90)` | Legendary rarity, WISDOM stat |

### Rarity Color Mapping

```
common    → muted green (oklch 0.70 0.05 145)
uncommon  → crt-green
rare      → crt-blue
epic      → crt-purple
legendary → crt-gold
```

### Typography

JetBrains Mono is the only font. It's loaded via `@import` in `index.css`. All text is monospace.

### Scan Line Effect

Applied via CSS `::after` on elements with class `crt-scanlines`. Creates a subtle horizontal line pattern using `linear-gradient`.

### Glow Effects

Rarity-based glow via Tailwind `shadow-[]` arbitrary values:
- `rare`: `shadow-[0_0_12px_oklch(0.65_0.18_250_/_0.3)]`
- `epic`: `shadow-[0_0_12px_oklch(0.65_0.20_300_/_0.3)]`
- `legendary`: `shadow-[0_0_16px_oklch(0.82_0.18_90_/_0.4)]`

---

## 11. Adding New Content

### Adding a New Species

1. **`buddy-engine.ts`** — Add slug to `SPECIES` const array and `SPECIES_DISPLAY` record. Add ASCII frames to `BODIES` (3 frame arrays of 5 lines each, use `{E}` for eyes).

2. **`species-data.ts`** — Add `SpeciesInfo` entry to `SPECIES_DATA` with `slug`, `tags`, `category`, `peakStat`, `related` (3 species).

3. **`species-faq.ts`** — Add FAQ array under the new slug for all 3 locales (`en`, `zh`, `ko`).

4. **i18n files** — Add any species-specific translation keys needed in `en.ts`, `zh.ts`, `ko.ts`.

5. **`sitemap.xml`** — Add `/species/[slug]` entry.

### Adding a New Blog Article

1. **`blog-data.ts`** — Add `BlogArticle` object to `BLOG_ARTICLES` array with content for all 3 locales. Sections use HTML strings.

2. **`sitemap.xml`** — Add `/blog/[slug]` entry.

### Adding a New Locale

1. Create `client/src/i18n/[locale].ts` matching the `TranslationDict` shape from `en.ts`.
2. Add to `dictionaries` in `I18nContext.tsx`.
3. Update `LOCALE_LABELS` and `LOCALE_FLAGS` records.
4. Add `Locale` union type.
5. Add `detectLocale()` browser language mapping.
6. Add locale entries to `SPECIES_FAQ` for all species.
7. Add locale `content` fields to all `BLOG_ARTICLES`.

---

## 12. Build Pipeline

### Development

```bash
pnpm dev        # Vite dev server, port 3000, hot reload
```

The Vite dev server includes:
- `vitePluginManusDebugCollector` — receives browser console/network/session logs via `POST /__manus__/logs`, writes to `.manus-logs/` (dev only)
- `vitePluginManusRuntime` — Manus-specific runtime injection
- `jsxLocPlugin` — adds source location attributes to JSX elements

### Production Build

```bash
pnpm build
# Step 1: vite build → dist/public/ (static frontend)
# Step 2: esbuild server/index.ts → dist/index.js (ESM Node bundle)
```

### Production Start

```bash
pnpm start      # NODE_ENV=production node dist/index.js
```

Express serves `dist/public/` as static files. All unknown routes return `index.html` (client-side routing).

### Package Manager

This project uses **pnpm** (v10). `pnpm-lock.yaml` should be committed. Notable pnpm config:
- `wouter@3.7.1` has a patch applied (`patches/wouter@3.7.1.patch`)
- `tailwindcss>nanoid` overridden to `3.3.7` (security)

### TypeScript

```bash
pnpm check      # tsc --noEmit (type-check without emitting)
```

Covers `client/src/`, `server/`, and `shared/` via `tsconfig.json` includes. Strict mode enabled. Module resolution: `bundler`.
