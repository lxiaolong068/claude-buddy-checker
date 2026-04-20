import type { Rarity, Species, Hat, StatName } from "./buddy-engine";

// ── Storage Keys ──────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  COLLECTION: "buddy-collection",
  POWERUP_PROGRESS: "buddy-powerup-progress",
  PREFERENCES: "buddy-preferences",
} as const;

// ── Collection ────────────────────────────────────────────────────────────────

export interface CollectionEntry {
  uuid: string;
  species: Species;
  rarity: Rarity;
  shiny: boolean;
  hat: Hat;
  eye: string;
  stats: Record<StatName, number>;
  discoveredAt: string; // ISO date string
}

export interface Collection {
  entries: CollectionEntry[];
}

export function getCollection(): Collection {
  return loadJson<Collection>(STORAGE_KEYS.COLLECTION, { entries: [] });
}

export function saveCollection(collection: Collection): void {
  saveJson(STORAGE_KEYS.COLLECTION, collection);
}

export function addToCollection(entry: CollectionEntry): void {
  const collection = getCollection();
  const exists = collection.entries.some((e) => e.uuid === entry.uuid);
  if (!exists) {
    collection.entries.unshift(entry);
    saveCollection(collection);
  }
}

export function getDiscoveredSpecies(): Set<Species> {
  const collection = getCollection();
  return new Set(collection.entries.map((e) => e.species));
}

// ── Powerup Progress ──────────────────────────────────────────────────────────

export interface PowerupLesson {
  id: string;
  completedAt: string; // ISO date string
}

export interface PowerupProgress {
  completedLessons: PowerupLesson[];
  startedAt: string | null; // ISO date string, null if never started
}

export function getPowerupProgress(): PowerupProgress {
  return loadJson<PowerupProgress>(STORAGE_KEYS.POWERUP_PROGRESS, {
    completedLessons: [],
    startedAt: null,
  });
}

export function savePowerupProgress(progress: PowerupProgress): void {
  saveJson(STORAGE_KEYS.POWERUP_PROGRESS, progress);
}

export function completePowerupLesson(lessonId: string): void {
  const progress = getPowerupProgress();
  const alreadyDone = progress.completedLessons.some((l) => l.id === lessonId);
  if (!alreadyDone) {
    const now = new Date().toISOString();
    if (!progress.startedAt) progress.startedAt = now;
    progress.completedLessons.push({ id: lessonId, completedAt: now });
    savePowerupProgress(progress);
  }
}

export function uncompletePowerupLesson(lessonId: string): void {
  const progress = getPowerupProgress();
  progress.completedLessons = progress.completedLessons.filter(
    (l) => l.id !== lessonId
  );
  savePowerupProgress(progress);
}

// ── Preferences ───────────────────────────────────────────────────────────────

export interface Preferences {
  showSpriteAnimation: boolean;
  shareCardStyle: "minimal" | "full";
}

const DEFAULT_PREFERENCES: Preferences = {
  showSpriteAnimation: true,
  shareCardStyle: "full",
};

export function getPreferences(): Preferences {
  return loadJson<Preferences>(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES);
}

export function savePreferences(prefs: Partial<Preferences>): void {
  const current = getPreferences();
  saveJson(STORAGE_KEYS.PREFERENCES, { ...current, ...prefs });
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or private browsing — silently ignore
  }
}
