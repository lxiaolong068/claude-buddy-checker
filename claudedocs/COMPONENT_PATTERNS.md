# Component Patterns & Conventions

> Key patterns used in this codebase. Read before creating new components.

---

## i18n in Components

All user-facing strings use `useI18n()`. No hardcoded strings in JSX.

```tsx
import { useI18n } from '@/contexts/I18nContext';

export default function MyComponent() {
  const { t, locale } = useI18n();
  return <p>{t('home.someKey')}</p>;
}
```

When a component needs to react to locale changes for side effects (e.g., updating `document.title`):
```tsx
useEffect(() => {
  document.title = t('meta.title');
}, [locale, t]);
```

---

## Rarity-Conditional Styling

Pattern used in `BuddyResultCard`, `SpeciesDetail`, etc.:

```tsx
const RARITY_COLORS: Record<string, string> = {
  common: 'text-[oklch(0.70_0.05_145)] border-[oklch(0.70_0.05_145)]/30',
  uncommon: 'text-crt-green border-crt-green/30',
  rare: 'text-crt-blue border-crt-blue/30',
  epic: 'text-crt-purple border-crt-purple/30',
  legendary: 'text-crt-gold border-crt-gold/30',
};

// Usage:
<span className={RARITY_COLORS[buddy.rarity]}>...</span>
```

---

## JSON-LD Schema Components

Schema components inject `<script type="application/ld+json">` into the document head using `dangerouslySetInnerHTML`. They are self-contained and accept typed props.

```tsx
// Usage pattern:
<WebAppSchema locale={locale} />
<FAQSchema items={faqItems} locale={locale} />
<ArticleSchema article={article} locale={locale} />
```

Place schema components near the top of page components, before visible JSX.

---

## ASCII Sprite Animation

`BuddySprite` handles frame cycling using `IDLE_SEQUENCE`:

```ts
// IDLE_SEQUENCE = [0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 2, 0, 0, 0]
// -1 means "use previous frame" (blink/wink effect)
```

The component accepts `buddy: BuddyResult` and renders `renderSprite(buddy, frame)` output as `<pre>` text. Animation interval is handled internally with `setInterval`.

---

## React 19 Compatibility

**Problem:** Radix UI components using `asChild` + internal `forwardRef` have issues with React 19's ref behavior.

**Pattern:** For tooltip-like overlays, use the custom `SpeciesTooltip` component (pure CSS/React, no Radix) instead of `@radix-ui/react-tooltip`.

**Symptoms:** Console errors about `forwardRef` or refs not working on Radix components — replace with custom implementation.

---

## Canvas Share Card

`share-card-renderer.ts` exports two functions:

```ts
renderBuddyShareCard(canvas: HTMLCanvasElement, data: ShareCardBuddyData): void
renderSpeciesShareCard(canvas: HTMLCanvasElement, data: ShareCardSpeciesData): void
```

`ShareCardModal` wraps a `<canvas>` element, calls the renderer on mount, and provides a download button. The output is always 1200×630 pixels.

Colors in the renderer are hardcoded constants (not CSS variables) because Canvas API doesn't read CSS custom properties.

---

## LazyImage

Use `LazyImage` for all below-the-fold images:

```tsx
<LazyImage
  src="https://..."
  alt="descriptive alt text"
  width={800}
  height={600}
  className="..."
/>
```

For hero/above-fold images, use a plain `<img>` with `loading="eager"` and `fetchPriority="high"`.

---

## Wouter Navigation

Use `Link` from `wouter` (not `react-router-dom`) for internal navigation:

```tsx
import { Link } from 'wouter';
<Link href="/species/duck">Duck</Link>
```

For programmatic navigation:
```tsx
import { useLocation } from 'wouter';
const [, setLocation] = useLocation();
setLocation('/species/duck');
```
