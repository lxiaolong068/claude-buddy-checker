/**
 * Community Stats Engine (Pure Frontend - Plan B)
 * 
 * Performance considerations:
 * - localStorage reads are synchronous but fast (~0.1ms)
 * - All computations are O(n) where n = user's query count (typically < 100)
 * - Global counter uses date-based seed (zero computation cost)
 * - Debounced writes to avoid excessive localStorage access
 */

import { SPECIES, RARITIES, RARITY_WEIGHTS, type Species, type Rarity } from "./buddy-engine";

// ─── Types ───────────────────────────────────────────────────────
export interface QueryRecord {
  uuid: string;
  species: Species;
  rarity: string;
  timestamp: number;
}

export interface UserStats {
  totalQueries: number;
  uniqueUuids: number;
  speciesDistribution: Record<string, number>;
  rarityDistribution: Record<string, number>;
  firstQueryDate: number | null;
  lastQueryDate: number | null;
  favoriteSpecies: string | null;
  rarestFind: string | null;
}

export interface GlobalStats {
  totalBuddiesChecked: number;
  activeExplorers: number;
  speciesPopularity: Array<{ species: string; percentage: number }>;
  rarityBreakdown: Array<{ rarity: string; percentage: number; color: string }>;
}

// ─── Constants ───────────────────────────────────────────────────
const STORAGE_KEY = "claude-buddy-query-history";
const MAX_RECORDS = 200; // Cap to prevent localStorage bloat

// Global counter seed parameters
// Base count: simulated starting point (as if site launched earlier)
const BASE_COUNT = 12_847;
const LAUNCH_DATE = new Date("2025-12-01").getTime();
const DAILY_GROWTH_BASE = 73; // Average daily new queries
const GROWTH_VARIANCE = 0.3; // ±30% daily variance

// Rarity colors for display
const RARITY_COLORS: Record<string, string> = {
  common: "#6b7280",
  uncommon: "#22c55e",
  rare: "#3b82f6",
  epic: "#a855f7",
  legendary: "#f59e0b",
};

// ─── Deterministic Pseudo-Random (seeded) ────────────────────────
function seededRandom(seed: number): number {
  // Simple mulberry32
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// ─── localStorage Helpers (with error handling) ──────────────────
function isValidQueryRecord(obj: unknown): obj is QueryRecord {
  if (typeof obj !== "object" || obj === null) return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.uuid === "string" &&
    typeof r.species === "string" &&
    typeof r.rarity === "string" &&
    typeof r.timestamp === "number"
  );
}

function readHistory(): QueryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidQueryRecord);
  } catch {
    return [];
  }
}

function writeHistory(records: QueryRecord[]): void {
  try {
    // Keep only the most recent MAX_RECORDS
    const trimmed = records.slice(-MAX_RECORDS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

// ─── Public API ──────────────────────────────────────────────────

/**
 * Record a new buddy query. Call this after rollBuddy().
 * Debounce-safe: deduplicates same UUID within 1 second.
 */
export function recordQuery(uuid: string, species: Species, rarity: string): void {
  const history = readHistory();
  const now = Date.now();

  // Deduplicate: skip if same UUID queried within last 1s
  const recent = history[history.length - 1];
  if (recent && recent.uuid === uuid && now - recent.timestamp < 1000) {
    return;
  }

  history.push({ uuid, species, rarity, timestamp: now });
  writeHistory(history);
}

/**
 * Get user's personal stats from localStorage.
 * Lightweight: processes only local history.
 */
export function getUserStats(): UserStats {
  const history = readHistory();

  if (history.length === 0) {
    return {
      totalQueries: 0,
      uniqueUuids: 0,
      speciesDistribution: {},
      rarityDistribution: {},
      firstQueryDate: null,
      lastQueryDate: null,
      favoriteSpecies: null,
      rarestFind: null,
    };
  }

  const uuidSet = new Set(history.map((r) => r.uuid));
  const speciesCounts: Record<string, number> = {};
  const rarityCounts: Record<string, number> = {};

  for (const record of history) {
    speciesCounts[record.species] = (speciesCounts[record.species] || 0) + 1;
    rarityCounts[record.rarity] = (rarityCounts[record.rarity] || 0) + 1;
  }

  // Find favorite species (most queried)
  let favoriteSpecies: string | null = null;
  let maxCount = 0;
  for (const [species, count] of Object.entries(speciesCounts)) {
    if (count > maxCount) {
      maxCount = count;
      favoriteSpecies = species;
    }
  }

  // Find rarest find
  const rarityOrder = ["legendary", "epic", "rare", "uncommon", "common"];
  let rarestFind: string | null = null;
  for (const r of rarityOrder) {
    if (rarityCounts[r]) {
      rarestFind = r;
      break;
    }
  }

  return {
    totalQueries: history.length,
    uniqueUuids: uuidSet.size,
    speciesDistribution: speciesCounts,
    rarityDistribution: rarityCounts,
    firstQueryDate: history[0].timestamp,
    lastQueryDate: history[history.length - 1].timestamp,
    favoriteSpecies,
    rarestFind,
  };
}

/**
 * Get simulated global community stats.
 * Uses deterministic seed based on current UTC date.
 * Zero network cost, consistent across all users on the same day.
 */
export function getGlobalStats(): GlobalStats {
  const now = Date.now();
  const daysSinceLaunch = Math.max(0, Math.floor((now - LAUNCH_DATE) / 86_400_000));

  // Calculate total buddies checked using seeded daily growth
  let totalBuddiesChecked = BASE_COUNT;
  for (let day = 0; day <= daysSinceLaunch; day++) {
    const dailySeed = day * 31 + 7;
    const variance = 1 + (seededRandom(dailySeed) - 0.5) * 2 * GROWTH_VARIANCE;
    // Growth accelerates slightly over time (viral effect)
    const growthMultiplier = 1 + day * 0.002;
    totalBuddiesChecked += Math.floor(DAILY_GROWTH_BASE * variance * growthMultiplier);
  }

  // Active explorers: ~5-15% of total, varies by hour
  const hourSeed = Math.floor(now / 3_600_000);
  const activeRatio = 0.05 + seededRandom(hourSeed) * 0.10;
  const activeExplorers = Math.floor(totalBuddiesChecked * activeRatio);

  // Species popularity: based on mathematical probability (equal 1/18 each)
  // but with slight simulated variance for visual interest
  const daySeed = Math.floor(now / 86_400_000);
  const speciesPopularity = SPECIES.map((s, i) => {
    const base = 100 / SPECIES.length; // ~5.56%
    const variance = (seededRandom(daySeed * 100 + i) - 0.5) * 2; // ±1%
    return {
      species: s,
      percentage: Math.round((base + variance) * 10) / 10,
    };
  }).sort((a, b) => b.percentage - a.percentage);

  // Rarity breakdown: derived from RARITY_WEIGHTS (single source of truth)
  const rarityBreakdown = RARITIES.map((rarity: Rarity) => ({
    rarity,
    percentage: RARITY_WEIGHTS[rarity],
    color: RARITY_COLORS[rarity],
  }));

  return {
    totalBuddiesChecked,
    activeExplorers,
    speciesPopularity,
    rarityBreakdown,
  };
}

/**
 * Clear all local query history.
 */
export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silently fail
  }
}
