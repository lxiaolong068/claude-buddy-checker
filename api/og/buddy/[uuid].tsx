/**
 * Vercel Edge Function — Dynamic OG image for /buddy/:uuid
 * Generates a 1200×630 PNG CRT-terminal card per UUID.
 * Route: GET /api/og/buddy/{uuid}
 */

import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

// ── Deterministic Buddy Engine (inline subset — no DOM deps) ─────────────────
// Mirrors client/src/lib/buddy-engine.ts pure functions so Edge runtime
// can run them without importing browser-incompatible modules.

const RARITIES = ["common", "uncommon", "rare", "epic", "legendary"] as const;
type Rarity = (typeof RARITIES)[number];

const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 60, uncommon: 25, rare: 10, epic: 4, legendary: 1,
};
const RARITY_STARS: Record<Rarity, string> = {
  common: "★", uncommon: "★★", rare: "★★★", epic: "★★★★", legendary: "★★★★★",
};
const RARITY_FLOOR: Record<Rarity, number> = {
  common: 5, uncommon: 15, rare: 25, epic: 35, legendary: 50,
};

const SPECIES = [
  "duck","goose","blob","cat","dragon","octopus","owl","penguin",
  "turtle","snail","ghost","axolotl","capybara","cactus","robot",
  "rabbit","mushroom","chonk",
] as const;
type Species = (typeof SPECIES)[number];

const SPECIES_DISPLAY: Record<Species, string> = {
  duck:"Duck", goose:"Goose", blob:"Blob", cat:"Cat", dragon:"Dragon",
  octopus:"Octopus", owl:"Owl", penguin:"Penguin", turtle:"Turtle",
  snail:"Snail", ghost:"Ghost", axolotl:"Axolotl", capybara:"Capybara",
  cactus:"Cactus", robot:"Robot", rabbit:"Rabbit", mushroom:"Mushroom",
  chonk:"Chonk",
};

const HATS = ["none","crown","tophat","propeller","halo","wizard","beanie","tinyduck"] as const;
type Hat = (typeof HATS)[number];

const EYES = ["·","✦","×","◉","@","°"] as const;
const STAT_NAMES = ["DEBUGGING","PATIENCE","CHAOS","WISDOM","SNARK"] as const;
type StatName = (typeof STAT_NAMES)[number];

const SALT = "friend-2026-401";

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function rollRarity(rng: () => number): Rarity {
  const total = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let roll = rng() * total;
  for (const rarity of RARITIES) {
    roll -= RARITY_WEIGHTS[rarity];
    if (roll < 0) return rarity;
  }
  return "common";
}

function rollStats(rng: () => number, rarity: Rarity): Record<StatName, number> {
  const floor = RARITY_FLOOR[rarity];
  const peak  = pick(rng, STAT_NAMES);
  let dump    = pick(rng, STAT_NAMES);
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  const stats = {} as Record<StatName, number>;
  for (const name of STAT_NAMES) {
    if (name === peak)      stats[name] = Math.min(100, floor + 50 + Math.floor(rng() * 30));
    else if (name === dump) stats[name] = Math.max(1,   floor - 10 + Math.floor(rng() * 15));
    else                    stats[name] = floor + Math.floor(rng() * 40);
  }
  return stats;
}

function rollBuddy(userId: string) {
  const rng     = mulberry32(hashString(userId + SALT));
  const rarity  = rollRarity(rng);
  const species = pick(rng, SPECIES);
  const eye     = pick(rng, EYES);
  const hat     = rarity === "common" ? "none" : (pick(rng, HATS) as Hat);
  const shiny   = rng() < 0.01;
  const stats   = rollStats(rng, rarity);
  return { rarity, species, eye, hat, shiny, stats };
}

// ── Color palette (matches CRT theme) ────────────────────────────────────────

const RARITY_COLORS: Record<Rarity, string> = {
  common:    "#6a9a6a",
  uncommon:  "#33ff33",
  rare:      "#58a6ff",
  epic:      "#af87ff",
  legendary: "#ffc107",
};

const STAT_BAR_COLORS: Record<StatName, string> = {
  DEBUGGING: "#e06c60",
  PATIENCE:  "#58a6ff",
  CHAOS:     "#af87ff",
  WISDOM:    "#ffc107",
  SNARK:     "#4eba65",
};

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req: Request) {
  const pathParts = new URL(req.url).pathname.split("/");
  const uuid      = decodeURIComponent(pathParts[pathParts.length - 1] ?? "");

  const buddy       = rollBuddy(uuid);
  const rarityColor = RARITY_COLORS[buddy.rarity];
  const species     = SPECIES_DISPLAY[buddy.species];
  const shortId     = uuid.slice(0, 12);

  return new ImageResponse(
    (
      <div
        style={{
          display:         "flex",
          width:           "100%",
          height:          "100%",
          backgroundColor: "#0d0d0d",
          fontFamily:      "monospace",
          padding:         "28px",
          boxSizing:       "border-box",
        }}
      >
        {/* Outer terminal frame */}
        <div
          style={{
            display:        "flex",
            flexDirection:  "column",
            width:          "100%",
            border:         "1px solid #1a5a1a",
            padding:        "0",
            overflow:       "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display:         "flex",
              alignItems:      "center",
              gap:             8,
              backgroundColor: "#141414",
              borderBottom:    "1px solid #1a5a1a",
              padding:         "10px 18px",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#d44040" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#ffb000" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#33ff33" }} />
            <span style={{ color: "#4a7a4a", fontSize: 12, marginLeft: 12, letterSpacing: 1 }}>
              buddy_result.sh — {shortId}…
            </span>
          </div>

          {/* Body */}
          <div style={{ display: "flex", flex: 1, backgroundColor: "#141414" }}>

            {/* Left panel: species identity */}
            <div
              style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                justifyContent: "center",
                width:          380,
                borderRight:    "1px dashed #1a5a1a",
                padding:        "32px 24px",
                gap:            12,
              }}
            >
              {/* Large species name */}
              <div
                style={{
                  color:      rarityColor,
                  fontSize:   48,
                  fontWeight: "bold",
                  letterSpacing: 3,
                  textAlign:  "center",
                  textShadow: `0 0 20px ${rarityColor}80`,
                }}
              >
                {species.toUpperCase()}
              </div>

              {/* Rarity badge */}
              <div
                style={{
                  display:         "flex",
                  alignItems:      "center",
                  gap:             6,
                  border:          `1px solid ${rarityColor}50`,
                  backgroundColor: `${rarityColor}15`,
                  padding:         "4px 14px",
                  color:           rarityColor,
                  fontSize:        13,
                  letterSpacing:   2,
                }}
              >
                {RARITY_STARS[buddy.rarity]}
                &nbsp;
                {buddy.rarity.toUpperCase()}
              </div>

              {/* Eye / Hat details */}
              <div
                style={{
                  display:    "flex",
                  gap:        20,
                  color:      "#4a7a4a",
                  fontSize:   12,
                  marginTop:  8,
                }}
              >
                <span>eye: {buddy.eye}</span>
                <span>hat: {buddy.hat}</span>
              </div>

              {/* Shiny badge */}
              {buddy.shiny && (
                <div
                  style={{
                    color:      "#ffc107",
                    fontSize:   13,
                    letterSpacing: 2,
                    textShadow: "0 0 12px #ffc10780",
                  }}
                >
                  ✦ SHINY
                </div>
              )}
            </div>

            {/* Right panel: stats */}
            <div
              style={{
                display:       "flex",
                flexDirection: "column",
                flex:          1,
                padding:       "32px 28px",
                justifyContent: "center",
                gap:           16,
              }}
            >
              <div style={{ color: "#4a7a4a", fontSize: 11, letterSpacing: 3, marginBottom: 4 }}>
                // STATS
              </div>

              {STAT_NAMES.map((stat) => (
                <div
                  key={stat}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{ color: "#4a7a4a", fontSize: 11, width: 90, letterSpacing: 1 }}
                  >
                    {stat}
                  </span>

                  {/* Bar track */}
                  <div
                    style={{
                      display:         "flex",
                      flex:            1,
                      height:          12,
                      backgroundColor: "#0d3d0d",
                    }}
                  >
                    {/* Bar fill */}
                    <div
                      style={{
                        width:           `${buddy.stats[stat]}%`,
                        height:          "100%",
                        backgroundColor: STAT_BAR_COLORS[stat],
                        opacity:         0.85,
                      }}
                    />
                  </div>

                  <span
                    style={{
                      color:     "#e0ffe0",
                      fontSize:  12,
                      width:     32,
                      textAlign: "right",
                    }}
                  >
                    {buddy.stats[stat]}
                  </span>
                </div>
              ))}

              {/* Footer watermark */}
              <div
                style={{
                  color:      "#1a8a1a",
                  fontSize:   11,
                  letterSpacing: 2,
                  marginTop:  16,
                  textAlign:  "right",
                }}
              >
                claudebuddy.art
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
    }
  );
}
