/**
 * Species Encyclopedia Data
 * Detailed information for each of the 18 Claude Code Buddy species.
 * Used for programmatic SEO species pages at /species/:slug
 */

import type { Species, Rarity } from "./buddy-engine";

export interface SpeciesInfo {
  slug: Species;
  /** Default ASCII frame index to display (0) */
  defaultFrame: number;
  /** Default eye for display */
  defaultEye: string;
  /** Personality tags */
  tags: string[];
  /** Lore / flavor category */
  category: "animal" | "creature" | "object" | "mythical";
  /** Base stat tendency: which stat tends to be highest */
  peakStat: string;
  /** Related species slugs for internal linking */
  related: Species[];
}

export const SPECIES_DATA: Record<Species, SpeciesInfo> = {
  duck: {
    slug: "duck",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["friendly", "aquatic", "cheerful"],
    category: "animal",
    peakStat: "PATIENCE",
    related: ["goose", "penguin", "capybara"],
  },
  goose: {
    slug: "goose",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["chaotic", "loud", "fearless"],
    category: "animal",
    peakStat: "CHAOS",
    related: ["duck", "chonk", "owl"],
  },
  blob: {
    slug: "blob",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["amorphous", "calm", "mysterious"],
    category: "creature",
    peakStat: "WISDOM",
    related: ["ghost", "mushroom", "axolotl"],
  },
  cat: {
    slug: "cat",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["independent", "curious", "elegant"],
    category: "animal",
    peakStat: "SNARK",
    related: ["rabbit", "chonk", "owl"],
  },
  dragon: {
    slug: "dragon",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["powerful", "ancient", "majestic"],
    category: "mythical",
    peakStat: "DEBUGGING",
    related: ["ghost", "robot", "turtle"],
  },
  octopus: {
    slug: "octopus",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["intelligent", "flexible", "deep-sea"],
    category: "animal",
    peakStat: "WISDOM",
    related: ["snail", "axolotl", "blob"],
  },
  owl: {
    slug: "owl",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["wise", "nocturnal", "observant"],
    category: "animal",
    peakStat: "WISDOM",
    related: ["cat", "ghost", "penguin"],
  },
  penguin: {
    slug: "penguin",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["resilient", "social", "arctic"],
    category: "animal",
    peakStat: "PATIENCE",
    related: ["duck", "turtle", "robot"],
  },
  turtle: {
    slug: "turtle",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["steady", "armored", "ancient"],
    category: "animal",
    peakStat: "PATIENCE",
    related: ["snail", "dragon", "capybara"],
  },
  snail: {
    slug: "snail",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["slow", "persistent", "spiral"],
    category: "animal",
    peakStat: "PATIENCE",
    related: ["turtle", "mushroom", "blob"],
  },
  ghost: {
    slug: "ghost",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["ethereal", "spooky", "playful"],
    category: "mythical",
    peakStat: "CHAOS",
    related: ["blob", "dragon", "mushroom"],
  },
  axolotl: {
    slug: "axolotl",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["regenerative", "aquatic", "adorable"],
    category: "animal",
    peakStat: "DEBUGGING",
    related: ["octopus", "capybara", "blob"],
  },
  capybara: {
    slug: "capybara",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["chill", "social", "friendly"],
    category: "animal",
    peakStat: "PATIENCE",
    related: ["duck", "axolotl", "chonk"],
  },
  cactus: {
    slug: "cactus",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["prickly", "resilient", "desert"],
    category: "object",
    peakStat: "SNARK",
    related: ["mushroom", "robot", "turtle"],
  },
  robot: {
    slug: "robot",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["logical", "mechanical", "efficient"],
    category: "object",
    peakStat: "DEBUGGING",
    related: ["cactus", "dragon", "penguin"],
  },
  rabbit: {
    slug: "rabbit",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["quick", "fluffy", "alert"],
    category: "animal",
    peakStat: "CHAOS",
    related: ["cat", "chonk", "duck"],
  },
  mushroom: {
    slug: "mushroom",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["fungal", "mysterious", "forest"],
    category: "object",
    peakStat: "WISDOM",
    related: ["cactus", "ghost", "blob"],
  },
  chonk: {
    slug: "chonk",
    defaultFrame: 0,
    defaultEye: "·",
    tags: ["round", "hefty", "lovable"],
    category: "animal",
    peakStat: "SNARK",
    related: ["capybara", "cat", "blob"],
  },
};

/** All species slugs as an ordered array */
export const ALL_SPECIES_SLUGS = Object.keys(SPECIES_DATA) as Species[];
