/**
 * English translations for Claude Buddy Checker
 */

export const en = {
  meta: {
    title: "Claude Buddy Checker - Check Your Terminal Pet",
    description:
      "Check your Claude Code Buddy pet before it launches. Enter your UUID to discover your unique terminal companion's species, rarity, stats, and ASCII art.",
  },
  hero: {
    h1: "Check Your Claude Code Buddy",
    subtitle:
      "Claude Code ships with a hidden Tamagotchi-style pet system. Each user gets a unique buddy based on their account UUID. Enter yours below to discover your companion before launch.",
    imgAlt: "CRT terminal displaying ASCII pet creature",
  },
  privacy: {
    label: "SECURE",
    text: "All computation runs locally in your browser. Your UUID never leaves this page. AccountUuid and UserID are not credentials and cannot be used for authentication.",
  },
  input: {
    terminalTitle: "buddy_checker.sh",
    howToFind: "// How to find your UUID:",
    option1Label: "Option 1:",
    option1Text: "Ask Claude Code:",
    option1Code: "What is my accountUuid?",
    option2Label: "Option 2:",
    option2Text: "Run in terminal:",
    option2Code: "cat ~/.claude.json | grep accountUuid",
    placeholder: "acde070d-8c4c-4f0d-9d8a-162843c10333",
    buttonCheck: "CHECK BUDDY",
    buttonScanning: "SCANNING...",
    errorEmpty: "ERROR: No input provided. Enter your accountUuid or userID.",
    loading1: "$ Hashing UUID with FNV-1a...",
    loading2: "$ Seeding Mulberry32 PRNG...",
    loading3: "$ Rolling rarity, species, stats...",
  },
  result: {
    terminalTitle: "buddy_result.log",
    shinyBadge: "SHINY",
    attributes: "// ATTRIBUTES",
    labelSpecies: "SPECIES",
    labelRarity: "RARITY",
    labelEyes: "EYES",
    labelHat: "HAT",
    labelShiny: "SHINY",
    labelRarityPct: "RARITY %",
    shinyYes: "YES ✦",
    shinyNo: "NO",
    hatNone: "none",
    stats: "// STATS",
  },
  species: {
    title: "// ALL 18 SPECIES",
    gridAlt: "Grid of 6 Claude Code buddy species rendered in retro terminal style",
  },
  rarity: {
    title: "// RARITY TIERS",
    colRarity: "Rarity",
    colChance: "Chance",
    colStatFloor: "Stat Floor",
    colStars: "Stars",
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
  },
  howItWorks: {
    title: "// HOW IT WORKS",
    p1: 'Claude Code\'s buddy system uses a <strong>deterministic algorithm</strong> to generate your pet. Your <code>accountUuid</code> is concatenated with a salt (<code>friend-2026-401</code>), hashed via FNV-1a, and fed into a Mulberry32 PRNG.',
    p2: "The PRNG then sequentially rolls your <strong>rarity</strong> (weighted random), <strong>species</strong> (1 of 18), <strong>eyes</strong> (1 of 6), <strong>hat</strong> (common = none, others = 1 of 8), <strong>shiny</strong> (1% chance), and <strong>5 stats</strong> (with a peak and dump stat).",
    p3: "Because the algorithm is deterministic, your buddy will always be the same — you can check it here before the official launch.",
  },
  faq: {
    title: "// FAQ",
    items: [
      {
        q: "Is this official?",
        a: "No. This tool is built by the community based on the leaked Claude Code source. The buddy system was found in the npm package's .map file.",
      },
      {
        q: "Will my buddy change?",
        a: "No. The generation is deterministic — same UUID always produces the same buddy. Your buddy is already decided.",
      },
      {
        q: "What is a Shiny buddy?",
        a: "Shiny is a 1% chance variant that adds a sparkle effect to your buddy. It's purely cosmetic but extremely rare.",
      },
      {
        q: "When does the buddy system launch?",
        a: "According to the leaked source code, the /buddy command is set to activate on April 1st, 2026.",
      },
    ],
  },
  footer: {
    line1: "Built by the community. Not affiliated with Anthropic.",
    line2: "All computation is local. No data is collected or transmitted.",
  },
};
