# Content Authoring Guide

> Quick reference for adding or editing content in Claude Buddy Checker.

---

## Species Encyclopedia

### Files Involved

| File | Role |
|------|------|
| `client/src/lib/buddy-engine.ts` | ASCII art frames, eye substitution, SPECIES array |
| `client/src/lib/species-data.ts` | Metadata: tags, category, peakStat, related |
| `client/src/lib/species-faq.ts` | FAQ Q&A in EN/ZH/KO |
| `client/src/i18n/en|zh|ko.ts` | Any species-level i18n overrides |
| `client/public/sitemap.xml` | URL registration |

### ASCII Frame Format

Each species has 3 frames, each frame is an array of 5 strings (lines). Use `{E}` as the eye placeholder — it gets replaced at render time with the buddy's assigned eye character.

```ts
speciesName: [
  // Frame 0 (idle)
  ['            ',   // line 0: hat row (blank = hat injection point)
   '   .----.   ',   // line 1
   '  ( {E}  {E} )  ', // line 2: eyes go here
   '  (      )  ',   // line 3
   '   `----´   '], // line 4
  // Frame 1 (idle variant)
  [...],
  // Frame 2 (idle variant 2)
  [...],
]
```

All lines must be exactly 12 characters wide (padded with spaces). Hat injection happens at line 0 if that line is blank (all whitespace).

### SpeciesInfo Fields

```ts
{
  slug: 'newspecies',        // must match SPECIES array entry
  defaultFrame: 0,           // always 0
  defaultEye: '·',           // default display eye
  tags: ['tag1', 'tag2'],    // 2-3 personality descriptors
  category: 'animal',        // animal | creature | object | mythical
  peakStat: 'WISDOM',        // which stat tends to be highest
  related: ['duck', 'blob', 'cat'], // exactly 3 related species
}
```

### FAQ Format (`species-faq.ts`)

```ts
newspecies: {
  en: [
    { question: "What is a Newspecies buddy?", answer: "..." },
    { question: "How rare is a Newspecies?", answer: "..." },
    // 3-5 Q&A pairs
  ],
  zh: [ ... ],
  ko: [ ... ],
}
```

---

## Blog Articles

### Files Involved

| File | Role |
|------|------|
| `client/src/lib/blog-data.ts` | Article data and content |
| `client/public/sitemap.xml` | URL registration |

### Article Structure

```ts
{
  slug: 'my-article-slug',       // URL: /blog/my-article-slug
  publishedAt: '2026-04-03',     // ISO date
  updatedAt: '2026-04-03',       // optional
  readingTime: 5,                // estimated minutes
  tags: ['guide', 'tutorial'],   // used for filtering on BlogIndex
  coverImage: 'https://...',     // optional CDN URL
  content: {
    en: {
      title: 'Article Title',
      metaTitle: 'Article Title - Site Name 2026',  // 50-60 chars for SEO
      metaDescription: '...',   // 150-160 chars
      excerpt: '...',           // 1-2 sentence preview for blog card
      sections: [
        { heading: 'Section H2', body: '<p>HTML content...</p>' },
      ]
    },
    zh: { ... },
    ko: { ... },
  }
}
```

### Section Body HTML

Section bodies support HTML. Commonly used tags:
- `<p>` paragraphs
- `<strong>` bold
- `<code>` inline code
- `<pre><code>` code blocks
- `<h4>` sub-headings within a section
- `<ul><li>` lists
- `<a href="...">` links (internal links to `/species/slug` for SEO)

---

## i18n Keys

### Adding a New Key

1. Add the key to `client/src/i18n/en.ts` in the appropriate nested object.
2. Mirror the identical key structure in `zh.ts` and `ko.ts`.
3. Access via `t('path.to.key')` in components.

### Key Naming Conventions

```
meta.*          Page-level meta tags (title, description)
home.*          Homepage-specific strings
species.*       Species index/detail strings
blog.*          Blog index/post strings
rarity.*        Rarity display names (common, uncommon, etc.)
stat.*          Stat display names
share.*         Share card labels
input.*         Form input messages
nav.*           Navigation items
```

### Type Safety

`TranslationDict` is `typeof en` — adding a key to `en.ts` that doesn't exist in `zh.ts`/`ko.ts` will **not** cause a TypeScript error (they are typed as `typeof en` with potential mismatches). Always manually sync all three files.

---

## Sitemap

`client/public/sitemap.xml` — edit manually when adding routes.

Standard entry format:
```xml
<url>
  <loc>https://claudebuddy.app/species/newspecies</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```
