/**
 * Claude Code Buddy Generation Engine
 * Reverse-engineered from the leaked Claude Code source.
 * All computation is client-side — no data leaves the browser.
 */

// === Constants ===

export const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const;
export type Rarity = (typeof RARITIES)[number];

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1,
};

export const RARITY_STARS: Record<Rarity, string> = {
  common: '\u2605',
  uncommon: '\u2605\u2605',
  rare: '\u2605\u2605\u2605',
  epic: '\u2605\u2605\u2605\u2605',
  legendary: '\u2605\u2605\u2605\u2605\u2605',
};

export const RARITY_FLOOR: Record<Rarity, number> = {
  common: 5,
  uncommon: 15,
  rare: 25,
  epic: 35,
  legendary: 50,
};

export const SPECIES = [
  'duck', 'goose', 'blob', 'cat', 'dragon', 'octopus', 'owl', 'penguin',
  'turtle', 'snail', 'ghost', 'axolotl', 'capybara', 'cactus', 'robot',
  'rabbit', 'mushroom', 'chonk',
] as const;
export type Species = (typeof SPECIES)[number];

export const EYES = ['\u00b7', '\u2726', '\u00d7', '\u25c9', '@', '\u00b0'] as const;

export const HATS = ['none', 'crown', 'tophat', 'propeller', 'halo', 'wizard', 'beanie', 'tinyduck'] as const;
export type Hat = (typeof HATS)[number];

export const STAT_NAMES = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SNARK'] as const;
export type StatName = (typeof STAT_NAMES)[number];

export const STAT_COLORS: Record<StatName, string> = {
  DEBUGGING: '#e06c60',
  PATIENCE: '#58a6ff',
  CHAOS: '#af87ff',
  WISDOM: '#ffc107',
  SNARK: '#4eba65',
};

export const SALT = 'friend-2026-401';

// === FNV-1a Hash ===

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// === Mulberry32 PRNG ===

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

// === Roll Logic ===

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
  return 'common';
}

function rollStats(rng: () => number, rarity: Rarity): Record<StatName, number> {
  const floor = RARITY_FLOOR[rarity];
  const peak = pick(rng, STAT_NAMES);
  let dump = pick(rng, STAT_NAMES);
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  const stats = {} as Record<StatName, number>;
  for (const name of STAT_NAMES) {
    if (name === peak) stats[name] = Math.min(100, floor + 50 + Math.floor(rng() * 30));
    else if (name === dump) stats[name] = Math.max(1, floor - 10 + Math.floor(rng() * 15));
    else stats[name] = floor + Math.floor(rng() * 40);
  }
  return stats;
}

// === Buddy Result Type ===

export interface BuddyResult {
  rarity: Rarity;
  species: Species;
  eye: string;
  hat: Hat;
  shiny: boolean;
  stats: Record<StatName, number>;
}

// === Main Roll Function ===

export function rollBuddy(userId: string): BuddyResult {
  const rng = mulberry32(hashString(userId + SALT));
  const rarity = rollRarity(rng);
  const species = pick(rng, SPECIES);
  const eye = pick(rng, EYES);
  const hat = rarity === 'common' ? 'none' : (pick(rng, HATS) as Hat);
  const shiny = rng() < 0.01;
  const stats = rollStats(rng, rarity);
  return { rarity, species, eye, hat, shiny, stats };
}

// === ASCII Sprite Data ===

export const BODIES: Record<Species, string[][]> = {
  duck: [
    ['            ', '    __      ', '  <({E} )___  ', '   (  ._>   ', '    `--\u00b4    '],
    ['            ', '    __      ', '  <({E} )___  ', '   (  ._>   ', '    `--\u00b4~   '],
    ['            ', '    __      ', '  <({E} )___  ', '   (  .__>  ', '    `--\u00b4    '],
  ],
  goose: [
    ['            ', '     ({E}>    ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
    ['            ', '    ({E}>     ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
    ['            ', '     ({E}>>   ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
  ],
  blob: [
    ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (      )  ', '   `----\u00b4   '],
    ['            ', '  .------.  ', ' (  {E}  {E}  ) ', ' (        ) ', '  `------\u00b4  '],
    ['            ', '    .--.    ', '   ({E}  {E})   ', '   (    )   ', '    `--\u00b4    '],
  ],
  cat: [
    ['            ', '   /\\_/\\    ', '  ( {E}   {E})  ', '  (  \u03c9  )   ', '  (")_(")   '],
    ['            ', '   /\\_/\\    ', '  ( {E}   {E})  ', '  (  \u03c9  )   ', '  (")_(")~  '],
    ['            ', '   /\\-/\\    ', '  ( {E}   {E})  ', '  (  \u03c9  )   ', '  (")_(")   '],
  ],
  dragon: [
    ['            ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (   ~~   ) ', '  `-vvvv-\u00b4  '],
    ['            ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (        ) ', '  `-vvvv-\u00b4  '],
    ['   ~    ~   ', '  /^\\  /^\\  ', ' <  {E}  {E}  > ', ' (   ~~   ) ', '  `-vvvv-\u00b4  '],
  ],
  octopus: [
    ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
    ['            ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  \\/\\/\\/\\/  '],
    ['     o      ', '   .----.   ', '  ( {E}  {E} )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
  ],
  owl: [
    ['            ', '   /\\  /\\   ', '  (({E})({E}))  ', '  (  ><  )  ', '   `----\u00b4   '],
    ['            ', '   /\\  /\\   ', '  (({E})({E}))  ', '  (  ><  )  ', '   .----.   '],
    ['            ', '   /\\  /\\   ', '  (({E})(-))  ', '  (  ><  )  ', '   `----\u00b4   '],
  ],
  penguin: [
    ['            ', '  .---.     ', '  ({E}>{E})     ', ' /(   )\\    ', '  `---\u00b4     '],
    ['            ', '  .---.     ', '  ({E}>{E})     ', ' |(   )|    ', '  `---\u00b4     '],
    ['  .---.     ', '  ({E}>{E})     ', ' /(   )\\    ', '  `---\u00b4     ', '   ~ ~      '],
  ],
  turtle: [
    ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[______]\\ ', '  ``    ``  '],
    ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[______]\\ ', '   ``  ``   '],
    ['            ', '   _,--._   ', '  ( {E}  {E} )  ', ' /[======]\\ ', '  ``    ``  '],
  ],
  snail: [
    ['            ', ' {E}    .--.  ', '  \\  ( @ )  ', '   \\_`--\u00b4   ', '  ~~~~~~~   '],
    ['            ', '  {E}   .--.  ', '  |  ( @ )  ', '   \\_`--\u00b4   ', '  ~~~~~~~   '],
    ['            ', ' {E}    .--.  ', '  \\  ( @  ) ', '   \\_`--\u00b4   ', '   ~~~~~~   '],
  ],
  ghost: [
    ['            ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  ~`~``~`~  '],
    ['            ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  `~`~~`~`  '],
    ['    ~  ~    ', '   .----.   ', '  / {E}  {E} \\  ', '  |      |  ', '  ~~`~~`~~  '],
  ],
  axolotl: [
    ['            ', '}~(______)~{', '}~({E} .. {E})~{', '  ( .--. )  ', '  (_/  \\_)  '],
    ['            ', '~}(______){~', '~}({E} .. {E}){~', '  ( .--. )  ', '  (_/  \\_)  '],
    ['            ', '}~(______)~{', '}~({E} .. {E})~{', '  (  --  )  ', '  ~_/  \\_~  '],
  ],
  capybara: [
    ['            ', '  n______n  ', ' ( {E}    {E} ) ', ' (   oo   ) ', '  `------\u00b4  '],
    ['            ', '  n______n  ', ' ( {E}    {E} ) ', ' (   Oo   ) ', '  `------\u00b4  '],
    ['    ~  ~    ', '  u______n  ', ' ( {E}    {E} ) ', ' (   oo   ) ', '  `------\u00b4  '],
  ],
  cactus: [
    ['            ', ' n  ____  n ', ' | |{E}  {E}| | ', ' |_|    |_| ', '   |    |   '],
    ['            ', '    ____    ', ' n |{E}  {E}| n ', ' |_|    |_| ', '   |    |   '],
    [' n        n ', ' |  ____  | ', ' | |{E}  {E}| | ', ' |_|    |_| ', '   |    |   '],
  ],
  robot: [
    ['            ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ ==== ]  ', '  `------\u00b4  '],
    ['            ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ -==- ]  ', '  `------\u00b4  '],
    ['     *      ', '   .[||].   ', '  [ {E}  {E} ]  ', '  [ ==== ]  ', '  `------\u00b4  '],
  ],
  rabbit: [
    ['            ', '   (\\__/)   ', '  ( {E}  {E} )  ', ' =(  ..  )= ', '  (")__(")  '],
    ['            ', '   (|__/)   ', '  ( {E}  {E} )  ', ' =(  ..  )= ', '  (")__(")  '],
    ['            ', '   (\\__/)   ', '  ( {E}  {E} )  ', ' =( .  . )= ', '  (")__(")  '],
  ],
  mushroom: [
    ['            ', ' .-o-OO-o-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
    ['            ', ' .-O-oo-O-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
    ['   . o  .   ', ' .-o-OO-o-. ', '(__________)', '   |{E}  {E}|   ', '   |____|   '],
  ],
  chonk: [
    ['            ', '  /\\    /\\  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------\u00b4  '],
    ['            ', '  /\\    /|  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------\u00b4  '],
    ['            ', '  /\\    /\\  ', ' ( {E}    {E} ) ', ' (   ..   ) ', '  `------\u00b4~ '],
  ],
};

export const HAT_LINES: Record<Hat, string> = {
  none: '',
  crown: '   \\^^^/    ',
  tophat: '   [___]    ',
  propeller: '    -+-     ',
  halo: '   (   )    ',
  wizard: '    /^\\     ',
  beanie: '   (___)    ',
  tinyduck: '    ,>      ',
};

// === Render Sprite ===

export function renderSprite(buddy: BuddyResult, frame: number = 0): string[] {
  const frames = BODIES[buddy.species];
  const body = frames[frame % frames.length].map((line) =>
    line.replaceAll('{E}', buddy.eye)
  );
  const lines = [...body];
  if (buddy.hat !== 'none' && !lines[0].trim()) {
    lines[0] = HAT_LINES[buddy.hat];
  }
  if (!lines[0].trim() && frames.every((f) => !f[0].trim())) {
    lines.shift();
  }
  return lines;
}

// === Species Display Names ===

export const SPECIES_DISPLAY: Record<Species, string> = {
  duck: 'Duck',
  goose: 'Goose',
  blob: 'Blob',
  cat: 'Cat',
  dragon: 'Dragon',
  octopus: 'Octopus',
  owl: 'Owl',
  penguin: 'Penguin',
  turtle: 'Turtle',
  snail: 'Snail',
  ghost: 'Ghost',
  axolotl: 'Axolotl',
  capybara: 'Capybara',
  cactus: 'Cactus',
  robot: 'Robot',
  rabbit: 'Rabbit',
  mushroom: 'Mushroom',
  chonk: 'Chonk',
};

// === Idle Animation Sequence ===

export const IDLE_SEQUENCE = [0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 2, 0, 0, 0];
