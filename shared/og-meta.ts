/**
 * og-meta.ts — Shared OG metadata for all routes
 * Works in both Node.js (server) and browser (client).
 * NO browser APIs used.
 */

const BASE = "https://claudebuddy.art";

/** Full og:image URL for a species or blog route */
export function speciesOgImageUrl(slug: string) {
  return `${BASE}/api/og/species/${slug}.svg`;
}
export function blogOgImageUrl(slug: string) {
  return `${BASE}/api/og/blog/${slug}.svg`;
}

// ── Species ───────────────────────────────────────────────────────��──────────

export interface SpeciesOgData {
  name: string;
  /** ~120 chars, first sentence of lore */
  description: string;
  category: string;
  peakStat: string;
  tags: string[];
  /** First animation frame with {E} replaced by the default eye · */
  art: string[];
}

export const SPECIES_OG: Record<string, SpeciesOgData> = {
  duck: {
    name: "Duck",
    description: "A friendly aquatic companion that waddles through your terminal with cheerful energy. Known for its patience and calm demeanor.",
    category: "Animal", peakStat: "PATIENCE",
    tags: ["#friendly", "#aquatic", "#cheerful"],
    art: ["            ", "    __      ", "  <(· )___  ", "   (  ._>   ", "    `--´    "],
  },
  goose: {
    name: "Goose",
    description: "A chaotic force of nature in your terminal. Fearless and loud, this buddy brings unpredictable energy to your coding sessions.",
    category: "Animal", peakStat: "CHAOS",
    tags: ["#chaotic", "#loud", "#fearless"],
    art: ["            ", "     (·>    ", "     ||     ", "   _(__)_   ", "    ^^^^    "],
  },
  blob: {
    name: "Blob",
    description: "An amorphous, mysterious creature that shifts and flows in your terminal. Calm and wise, it observes your code with otherworldly understanding.",
    category: "Creature", peakStat: "WISDOM",
    tags: ["#amorphous", "#calm", "#mysterious"],
    art: ["            ", "   .----.   ", "  ( ·  · )  ", "  (      )  ", "   `----´   "],
  },
  cat: {
    name: "Cat",
    description: "An independent and elegant companion. Curious by nature, it watches your code with keen eyes and occasionally offers snarky commentary.",
    category: "Animal", peakStat: "SNARK",
    tags: ["#independent", "#curious", "#elegant"],
    art: ["            ", "   /\\_/\\    ", "  ( ·   ·)  ", "  (  ω  )   ", "  (\")_(\")   "],
  },
  dragon: {
    name: "Dragon",
    description: "A powerful and majestic mythical creature. Ancient and wise, it brings formidable debugging power, breathing fire on bugs with efficiency.",
    category: "Mythical", peakStat: "DEBUGGING",
    tags: ["#powerful", "#ancient", "#wise"],
    art: ["            ", "  /^\\  /^\\  ", " <  ·  ·  > ", " (   ~~   ) ", "  `-vvvv-´  "],
  },
  octopus: {
    name: "Octopus",
    description: "An intelligent deep-sea dweller with eight arms ready to help. Its flexibility and wisdom make it an excellent multitasking companion.",
    category: "Animal", peakStat: "WISDOM",
    tags: ["#intelligent", "#flexible", "#deep-sea"],
    art: ["            ", "   .----.   ", "  ( ·  · )  ", "  (______)  ", "  /\\/\\/\\/\\  "],
  },
  owl: {
    name: "Owl",
    description: "A wise nocturnal observer. With keen eyes, it watches over your late-night coding sessions, offering wisdom and catching bugs others miss.",
    category: "Animal", peakStat: "WISDOM",
    tags: ["#wise", "#nocturnal", "#observer"],
    art: ["            ", "   /\\  /\\   ", "  ((·)(·))  ", "  (  ><  )  ", "   `----´   "],
  },
  penguin: {
    name: "Penguin",
    description: "A resilient and social arctic companion. It thrives in the coldest debugging sessions and brings patience and community to your terminal.",
    category: "Animal", peakStat: "PATIENCE",
    tags: ["#resilient", "#social", "#arctic"],
    art: ["            ", "  .---.     ", "  (·>·)     ", " /(   )\\    ", "  `---´     "],
  },
  turtle: {
    name: "Turtle",
    description: "A steady and armored ancient companion. Slow but incredibly persistent, it approaches every coding challenge with patience and determination.",
    category: "Animal", peakStat: "PATIENCE",
    tags: ["#steady", "#persistent", "#armored"],
    art: ["            ", "   _,--._   ", "  ( ·  · )  ", " /[______]\\ ", "  ``    ``  "],
  },
  snail: {
    name: "Snail",
    description: "A slow but persistent spiral-shelled companion. It leaves a trail of carefully reviewed code behind it, never rushing through a single line.",
    category: "Animal", peakStat: "PATIENCE",
    tags: ["#slow", "#persistent", "#careful"],
    art: ["            ", " ·    .--.  ", "  \\  ( @ )  ", "   \\_`--´   ", "  ~~~~~~~   "],
  },
  ghost: {
    name: "Ghost",
    description: "An ethereal and playful spirit. It phases through your terminal with spooky charm, bringing chaotic energy and the supernatural to your sessions.",
    category: "Creature", peakStat: "CHAOS",
    tags: ["#ethereal", "#playful", "#spooky"],
    art: ["            ", "   .----.   ", "  / ·  · \\  ", "  |      |  ", "  ~`~``~`~  "],
  },
  axolotl: {
    name: "Axolotl",
    description: "A regenerative aquatic wonder. Adorable and resilient, it can recover from any coding disaster — perfect for experimental projects.",
    category: "Creature", peakStat: "DEBUGGING",
    tags: ["#regenerative", "#adorable", "#resilient"],
    art: ["            ", "}~(______)~{", "}~(· .. ·)~{", "  ( .--. )  ", "  (_/  \\_)  "],
  },
  capybara: {
    name: "Capybara",
    description: "The chillest companion in the entire buddy system. Social and friendly, it brings a zen-like calm to even the most stressful debugging sessions.",
    category: "Animal", peakStat: "PATIENCE",
    tags: ["#chill", "#social", "#friendly"],
    art: ["            ", "  n______n  ", " ( ·    · ) ", " (   oo   ) ", "  `------´  "],
  },
  cactus: {
    name: "Cactus",
    description: "A prickly but resilient desert dweller. Don't let its thorns fool you — beneath that tough exterior lies a surprisingly snarky and loyal companion.",
    category: "Object", peakStat: "SNARK",
    tags: ["#prickly", "#resilient", "#desert"],
    art: ["            ", " n  ____  n ", " | |·  ·| | ", " |_|    |_| ", "   |    |   "],
  },
  robot: {
    name: "Robot",
    description: "A logical and efficient mechanical companion. It approaches every bug with cold, calculated precision, making it one of the best debugging partners.",
    category: "Object", peakStat: "DEBUGGING",
    tags: ["#logical", "#efficient", "#mechanical"],
    art: ["            ", "   .[||].   ", "  [ ·  · ]  ", "  [ ==== ]  ", "  `------´  "],
  },
  rabbit: {
    name: "Rabbit",
    description: "A quick and fluffy companion. Always alert and ready to hop into action, it brings chaotic but adorable energy to your terminal.",
    category: "Animal", peakStat: "CHAOS",
    tags: ["#quick", "#fluffy", "#alert"],
    art: ["            ", "   (\\__/)   ", "  ( ·  · )  ", " =(  ..  )= ", "  (\")__(\")  "],
  },
  mushroom: {
    name: "Mushroom",
    description: "A mysterious fungal companion from the forest floor. It grows on you over time, spreading wisdom and the unknown through your codebase.",
    category: "Creature", peakStat: "WISDOM",
    tags: ["#mysterious", "#fungal", "#wise"],
    art: ["            ", " .-o-OO-o-. ", "(__________)", "   |·  ·|   ", "   |____|   "],
  },
  chonk: {
    name: "Chonk",
    description: "A round, hefty, and utterly lovable companion. What it lacks in speed it makes up for in personality, delivering snarky commentary with every keystroke.",
    category: "Animal", peakStat: "SNARK",
    tags: ["#round", "#hefty", "#lovable"],
    art: ["            ", "  /\\    /\\  ", " ( ·    · ) ", " (   ..   ) ", "  `------´  "],
  },
};

// ── Blog ──────────────────────────────────────────────────────────────────────

export interface BlogOgData {
  title: string;
  metaDescription: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
}

export const BLOG_OG: Record<string, BlogOgData> = {
  "how-to-find-your-claude-code-buddy": {
    title: "How to Find Your Claude Code Buddy",
    metaDescription: "Step-by-step guide to finding your Claude Code Buddy terminal pet. Learn how to get your UUID, check your buddy's species, rarity, and stats.",
    excerpt: "Claude Code has a hidden Tamagotchi-style pet system. Every user gets a unique companion based on their account UUID.",
    tags: ["#guide", "#tutorial", "#buddy"],
    readingTime: 5,
    publishedAt: "2026-04-01",
  },
  "claude-code-buddy-rarity-guide": {
    title: "Claude Code Buddy Rarity Guide",
    metaDescription: "Complete guide to Claude Code Buddy rarity tiers. Learn exact drop rates, stat floors, cosmetic unlocks, and what makes Legendary buddies special.",
    excerpt: "Not all buddies are equal. With 5 rarity tiers from Common (60%) to Legendary (1%), rarity determines stat floors and cosmetic options.",
    tags: ["#rarity", "#guide", "#stats", "#legendary"],
    readingTime: 7,
    publishedAt: "2026-04-02",
  },
  "all-18-claude-buddy-species-ranked": {
    title: "All 18 Claude Buddy Species Ranked",
    metaDescription: "Complete ranking of all 18 Claude Code Buddy species. Tier list with analysis of stats, personality, ASCII art, and which species is best for you.",
    excerpt: "From the mighty Dragon to the lovable Chonk — we rank every Claude Code Buddy species across multiple dimensions.",
    tags: ["#ranking", "#species", "#tier-list"],
    readingTime: 10,
    publishedAt: "2026-04-02",
  },
  "claude-buddy-stats-system-deep-dive": {
    title: "Claude Code Buddy Stats Deep Dive — Understanding the 5 Personality Attributes",
    metaDescription: "Deep dive into Claude Code Buddy's 5 personality stats: Debugging, Patience, Chaos, Wisdom, and Snark. Learn how stats are generated, species affinities, and what makes a perfect buddy.",
    excerpt: "Every Claude Code Buddy has 5 personality stats that define its character. But how are they generated? Which species excels at what? Let's break it all down.",
    tags: ["#stats", "#attributes", "#deep-dive", "#debugging", "#wisdom"],
    readingTime: 8,
    publishedAt: "2026-04-04",
  },
  "claude-buddy-cosmetics-guide-hats-eyes-shiny": {
    title: "Claude Code Buddy Cosmetics Guide — Hats, Eyes & Shiny Effects",
    metaDescription: "Complete guide to Claude Code Buddy cosmetics: 6 eye styles, 8 hat types, and the ultra-rare 1% shiny effect. Learn drop rates, visual previews, and how to get the rarest combinations.",
    excerpt: "Your buddy's look is defined by three cosmetic layers: eyes, hats, and shiny status. Learn the exact probabilities and discover the rarest possible combinations.",
    tags: ["#cosmetics", "#hats", "#eyes", "#shiny", "#probability"],
    readingTime: 7,
    publishedAt: "2026-04-04",
  },
};

// ── OgMeta helper ─────────────────────────────────────────────────────────────

export interface OgMeta {
  title: string;
  description: string;
  url: string;
  /** SVG image URL (works on Discord, Slack, Telegram, etc.) */
  ogImage: string;
  /** Raster fallback for Twitter/X */
  twitterImage: string;
  type: "website" | "article";
}

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/hero-crt-terminal-5fvRpoNY7GsFPkvdJ2QQKy.webp";

export function getSpeciesOgMeta(slug: string): OgMeta | null {
  const d = SPECIES_OG[slug];
  if (!d) return null;
  return {
    title: `${d.name} — Claude Buddy Species Guide | claudebuddy.art`,
    description: d.description,
    url: `${BASE}/species/${slug}`,
    ogImage: speciesOgImageUrl(slug),
    twitterImage: HERO_IMAGE,
    type: "website",
  };
}

export function getBlogOgMeta(slug: string): OgMeta | null {
  const d = BLOG_OG[slug];
  if (!d) return null;
  return {
    title: d.title,
    description: d.metaDescription,
    url: `${BASE}/blog/${slug}`,
    ogImage: blogOgImageUrl(slug),
    twitterImage: HERO_IMAGE,
    type: "article",
  };
}
