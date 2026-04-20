/**
 * Share Card Canvas Renderer
 * Generates CRT terminal-style share images from BuddyResult data.
 * Supports two modes:
 *   1. Buddy Check Result Card (from UUID checker)
 *   2. Species Encyclopedia Card (from species detail page)
 *
 * Design: Pure black bg, phosphor green text, scan lines, glow effects
 * Output: 1200x630 PNG (optimized for Twitter/OG cards)
 */

import {
  type BuddyResult,
  type Species,
  type StatName,
  RARITY_STARS,
  STAT_NAMES,
  STAT_COLORS,
  SPECIES_DISPLAY,
  renderSprite,
} from "./buddy-engine";

// === Color Constants (matching CRT theme) ===

const COLORS = {
  bg: "#0d0d0d",
  cardBg: "#141414",
  green: "#33ff33",
  greenDim: "#1a8a1a",
  greenFaint: "#0d3d0d",
  amber: "#ffb000",
  red: "#d44040",
  blue: "#58a6ff",
  purple: "#af87ff",
  gold: "#ffc107",
  white: "#e0ffe0",
  muted: "#4a7a4a",
  border: "#1a5a1a",
};

const RARITY_COLORS: Record<string, string> = {
  common: "#6a9a6a",
  uncommon: "#33ff33",
  rare: "#58a6ff",
  epic: "#af87ff",
  legendary: "#ffc107",
};

const STAT_COLOR_MAP: Record<StatName, string> = {
  DEBUGGING: "#e06c60",
  PATIENCE: "#58a6ff",
  CHAOS: "#af87ff",
  WISDOM: "#ffc107",
  SNARK: "#4eba65",
};

// === Font Loading ===

let fontLoaded = false;

async function ensureFont(): Promise<void> {
  if (fontLoaded) return;
  try {
    await document.fonts.load('16px "JetBrains Mono"');
    fontLoaded = true;
  } catch {
    // Fallback to monospace
    fontLoaded = true;
  }
}

// === Helper Drawing Functions ===

function setFont(ctx: CanvasRenderingContext2D, size: number, weight: string = "normal") {
  ctx.font = `${weight} ${size}px "JetBrains Mono", monospace`;
}

function drawGlowText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string = COLORS.green,
  glowRadius: number = 6
) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = glowRadius;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawScanLines(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = "#000";
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 2);
  }
  ctx.restore();
}

function drawBorder(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string = COLORS.border
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

function drawDashedBorder(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string = COLORS.border
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.restore();
}

function drawStatBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  name: StatName,
  value: number
) {
  const barHeight = 14;
  const labelWidth = 90;
  const valueWidth = 35;
  const barX = x + labelWidth;
  const barW = width - labelWidth - valueWidth - 10;

  // Label
  setFont(ctx, 10, "bold");
  ctx.fillStyle = COLORS.muted;
  ctx.textAlign = "left";
  ctx.fillText(name, x, y + barHeight - 3);

  // Bar background
  ctx.fillStyle = COLORS.greenFaint;
  ctx.fillRect(barX, y, barW, barHeight);

  // Bar fill
  const fillW = Math.max(0, Math.min(barW, (value / 100) * barW));
  ctx.fillStyle = STAT_COLOR_MAP[name];
  ctx.fillRect(barX, y, fillW, barHeight);

  // Value
  setFont(ctx, 11, "bold");
  ctx.fillStyle = COLORS.white;
  ctx.textAlign = "right";
  ctx.fillText(String(value), x + width, y + barHeight - 3);
  ctx.textAlign = "left";
}

// === ASCII Sprite Renderer ===

function drawAsciiSprite(
  ctx: CanvasRenderingContext2D,
  buddy: BuddyResult,
  centerX: number,
  centerY: number,
  fontSize: number = 14
) {
  const lines = renderSprite(buddy, 0);
  setFont(ctx, fontSize, "normal");
  const lineHeight = fontSize * 1.3;
  const startY = centerY - (lines.length * lineHeight) / 2;

  ctx.textAlign = "center";
  lines.forEach((line, i) => {
    drawGlowText(ctx, line, centerX, startY + i * lineHeight, COLORS.green, 4);
  });
  ctx.textAlign = "left";
}

// === Card Type Definitions ===

export interface ShareCardBuddyData {
  type: "buddy";
  buddy: BuddyResult;
  siteUrl?: string;
  showPetitionBadge?: boolean;   // renders "I HAD A BUDDY BEFORE v2.1.97" badge
  labels: {
    title: string;         // e.g. "YOUR BUDDY"
    species: string;       // e.g. "DRAGON"
    rarity: string;        // e.g. "Legendary"
    stats: string;         // e.g. "STATS"
    shiny: string;         // e.g. "SHINY"
    hat: string;           // e.g. "Hat"
    eyes: string;          // e.g. "Eyes"
    watermark: string;     // e.g. "claudebuddy.art"
    checkYours: string;    // e.g. "Check yours at"
    petitionLine1: string; // e.g. "I HAD A BUDDY BEFORE v2.1.97"
    petitionLine2: string; // e.g. "#BringBackBuddy"
  };
}

export interface ShareCardSpeciesData {
  type: "species";
  species: Species;
  buddy: BuddyResult;     // demo buddy for sprite rendering
  siteUrl?: string;
  labels: {
    title: string;         // e.g. "SPECIES GUIDE"
    speciesName: string;   // localized species name
    category: string;      // e.g. "Animal"
    description: string;   // species description
    peakStat: string;      // e.g. "Peak Stat"
    peakStatValue: string; // e.g. "DEBUGGING"
    tags: string[];        // e.g. ["#regenerative", "#aquatic"]
    watermark: string;
    checkYours: string;
  };
}

export type ShareCardData = ShareCardBuddyData | ShareCardSpeciesData;

// === Main Render Functions ===

/**
 * Render a Buddy Result share card (1200x630)
 */
export async function renderBuddyShareCard(data: ShareCardBuddyData): Promise<HTMLCanvasElement> {
  await ensureFont();

  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const { buddy, labels } = data;
  const rarityColor = RARITY_COLORS[buddy.rarity] || COLORS.green;

  // === Background ===
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle vignette
  const vg = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 700);
  vg.addColorStop(0, "transparent");
  vg.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // === Terminal Window Frame ===
  const mx = 30, my = 25;
  drawBorder(ctx, mx, my, W - mx * 2, H - my * 2, COLORS.border);

  // Terminal header bar
  const headerH = 36;
  ctx.fillStyle = COLORS.cardBg;
  ctx.fillRect(mx + 1, my + 1, W - mx * 2 - 2, headerH);
  drawBorder(ctx, mx, my, W - mx * 2, headerH + 1, COLORS.border);

  // Traffic lights
  const dotY = my + headerH / 2;
  [COLORS.red, COLORS.amber, COLORS.green].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(mx + 20 + i * 18, dotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });

  // Terminal title
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.muted;
  ctx.textAlign = "center";
  ctx.fillText("buddy_result.sh", W / 2, dotY + 4);
  ctx.textAlign = "left";

  // Content area background
  const contentY = my + headerH + 1;
  const contentH = H - my * 2 - headerH - 1;
  ctx.fillStyle = COLORS.cardBg;
  ctx.fillRect(mx + 1, contentY, W - mx * 2 - 2, contentH - 1);

  // === Left Panel: ASCII Sprite ===
  const leftW = 380;
  const spriteAreaX = mx + 1;
  const spriteAreaY = contentY + 20;
  const spriteAreaW = leftW;
  const spriteAreaH = contentH - 40;

  drawDashedBorder(ctx, spriteAreaX + 15, spriteAreaY, spriteAreaW - 30, spriteAreaH, COLORS.border);

  // Species name above sprite
  setFont(ctx, 28, "bold");
  drawGlowText(ctx, SPECIES_DISPLAY[buddy.species].toUpperCase(), spriteAreaX + spriteAreaW / 2 - ctx.measureText(SPECIES_DISPLAY[buddy.species].toUpperCase()).width / 2, spriteAreaY + 40, rarityColor, 8);

  // Rarity badge
  const rarityText = `${RARITY_STARS[buddy.rarity]} ${labels.rarity.toUpperCase()}`;
  setFont(ctx, 12, "bold");
  const rarityTextW = ctx.measureText(rarityText).width;
  const badgeX = spriteAreaX + (spriteAreaW - rarityTextW - 20) / 2;
  const badgeY = spriteAreaY + 52;
  ctx.fillStyle = rarityColor + "18";
  ctx.fillRect(badgeX, badgeY, rarityTextW + 20, 22);
  ctx.strokeStyle = rarityColor + "50";
  ctx.lineWidth = 1;
  ctx.strokeRect(badgeX, badgeY, rarityTextW + 20, 22);
  ctx.fillStyle = rarityColor;
  ctx.fillText(rarityText, badgeX + 10, badgeY + 16);

  // Shiny badge
  if (buddy.shiny) {
    const shinyText = `✦ ${labels.shiny}`;
    setFont(ctx, 10, "bold");
    const shinyW = ctx.measureText(shinyText).width;
    const shinyX = spriteAreaX + (spriteAreaW - shinyW - 16) / 2;
    const shinyY = badgeY + 28;
    ctx.fillStyle = COLORS.gold + "20";
    ctx.fillRect(shinyX, shinyY, shinyW + 16, 18);
    ctx.strokeStyle = COLORS.gold + "50";
    ctx.strokeRect(shinyX, shinyY, shinyW + 16, 18);
    ctx.fillStyle = COLORS.gold;
    ctx.fillText(shinyText, shinyX + 8, shinyY + 13);
  }

  // ASCII Sprite
  drawAsciiSprite(ctx, buddy, spriteAreaX + spriteAreaW / 2, spriteAreaY + spriteAreaH / 2 + 30, 16);

  // === Right Panel: Stats & Details ===
  const rightX = mx + leftW + 20;
  const rightW = W - mx * 2 - leftW - 40;
  let curY = contentY + 30;

  // Section: Title
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(`// ${labels.title}`, rightX, curY);
  curY += 30;

  // Details grid
  const details = [
    { label: labels.species, value: SPECIES_DISPLAY[buddy.species] },
    { label: labels.rarity, value: `${RARITY_STARS[buddy.rarity]} ${labels.rarity}` },
    { label: labels.eyes, value: buddy.eye },
    { label: labels.hat, value: buddy.hat === "none" ? "—" : buddy.hat },
  ];

  details.forEach((d) => {
    setFont(ctx, 11, "normal");
    ctx.fillStyle = COLORS.muted;
    ctx.fillText(d.label.toUpperCase(), rightX, curY);
    setFont(ctx, 12, "bold");
    ctx.fillStyle = COLORS.white;
    ctx.textAlign = "right";
    ctx.fillText(d.value, rightX + rightW, curY);
    ctx.textAlign = "left";

    // Separator line
    curY += 6;
    ctx.strokeStyle = COLORS.border + "60";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(rightX, curY);
    ctx.lineTo(rightX + rightW, curY);
    ctx.stroke();
    curY += 16;
  });

  // Section: Stats
  curY += 10;
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(`// ${labels.stats}`, rightX, curY);
  curY += 20;

  STAT_NAMES.forEach((name) => {
    drawStatBar(ctx, rightX, curY, rightW, name, buddy.stats[name]);
    curY += 22;
  });

  // === Petition Badge (optional) ===
  if (data.showPetitionBadge) {
    const footerLineY = H - my - 30;
    drawPetitionBadge(ctx, rightX, footerLineY - 8, rightW, labels.petitionLine1, labels.petitionLine2);
  }

  // === Footer / Watermark ===
  const footerY = H - my - 30;
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.greenDim;
  ctx.textAlign = "center";
  ctx.fillText(`${labels.checkYours} ${labels.watermark}`, W / 2, footerY);
  ctx.textAlign = "left";

  // Scan lines overlay
  drawScanLines(ctx, W, H);

  // Corner accents
  drawCornerAccents(ctx, mx, my, W - mx * 2, H - my * 2, rarityColor);

  return canvas;
}

/**
 * Render a Species Encyclopedia share card (1200x630)
 */
export async function renderSpeciesShareCard(data: ShareCardSpeciesData): Promise<HTMLCanvasElement> {
  await ensureFont();

  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const { buddy, labels } = data;

  // === Background ===
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, W, H);

  const vg = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 700);
  vg.addColorStop(0, "transparent");
  vg.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // === Terminal Frame ===
  const mx = 30, my = 25;
  drawBorder(ctx, mx, my, W - mx * 2, H - my * 2, COLORS.border);

  const headerH = 36;
  ctx.fillStyle = COLORS.cardBg;
  ctx.fillRect(mx + 1, my + 1, W - mx * 2 - 2, headerH);
  drawBorder(ctx, mx, my, W - mx * 2, headerH + 1, COLORS.border);

  const dotY = my + headerH / 2;
  [COLORS.red, COLORS.amber, COLORS.green].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(mx + 20 + i * 18, dotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });

  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.muted;
  ctx.textAlign = "center";
  ctx.fillText("species_guide.sh", W / 2, dotY + 4);
  ctx.textAlign = "left";

  const contentY = my + headerH + 1;
  const contentH = H - my * 2 - headerH - 1;
  ctx.fillStyle = COLORS.cardBg;
  ctx.fillRect(mx + 1, contentY, W - mx * 2 - 2, contentH - 1);

  // === Left: Large ASCII Sprite ===
  const leftW = 420;
  const spriteAreaX = mx + 1;
  const spriteAreaY = contentY + 15;
  const spriteAreaH = contentH - 30;

  drawDashedBorder(ctx, spriteAreaX + 15, spriteAreaY, leftW - 30, spriteAreaH, COLORS.border);

  // Species name
  setFont(ctx, 32, "bold");
  const nameText = `> ${labels.speciesName.toUpperCase()}`;
  drawGlowText(ctx, nameText, spriteAreaX + 30, spriteAreaY + 45, COLORS.green, 10);

  // Category + tags
  setFont(ctx, 11, "bold");
  let tagX = spriteAreaX + 30;
  const tagY = spriteAreaY + 62;

  // Category badge
  ctx.fillStyle = COLORS.green + "20";
  const catW = ctx.measureText(labels.category.toUpperCase()).width + 14;
  ctx.fillRect(tagX, tagY, catW, 20);
  ctx.strokeStyle = COLORS.green + "40";
  ctx.lineWidth = 1;
  ctx.strokeRect(tagX, tagY, catW, 20);
  ctx.fillStyle = COLORS.green;
  ctx.fillText(labels.category.toUpperCase(), tagX + 7, tagY + 14);
  tagX += catW + 8;

  // Tags
  setFont(ctx, 10, "normal");
  labels.tags.slice(0, 3).forEach((tag) => {
    ctx.fillStyle = COLORS.muted;
    ctx.fillText(tag, tagX, tagY + 14);
    tagX += ctx.measureText(tag).width + 10;
  });

  // Large ASCII sprite
  drawAsciiSprite(ctx, buddy, spriteAreaX + leftW / 2, spriteAreaY + spriteAreaH / 2 + 30, 18);

  // === Right: Description + Stats ===
  const rightX = mx + leftW + 20;
  const rightW = W - mx * 2 - leftW - 40;
  let curY = contentY + 35;

  // Title
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(`// ${labels.title}`, rightX, curY);
  curY += 25;

  // Description (word-wrapped)
  setFont(ctx, 12, "normal");
  ctx.fillStyle = COLORS.white;
  const descLines = wrapText(ctx, labels.description, rightW);
  descLines.slice(0, 5).forEach((line) => {
    ctx.fillText(line, rightX, curY);
    curY += 18;
  });
  curY += 15;

  // Peak stat
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(labels.peakStat.toUpperCase(), rightX, curY);
  setFont(ctx, 13, "bold");
  ctx.fillStyle = COLORS.amber;
  ctx.textAlign = "right";
  ctx.fillText(labels.peakStatValue, rightX + rightW, curY);
  ctx.textAlign = "left";
  curY += 8;
  ctx.strokeStyle = COLORS.border + "60";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(rightX, curY);
  ctx.lineTo(rightX + rightW, curY);
  ctx.stroke();
  curY += 20;

  // Stats
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.muted;
  ctx.fillText("// STAT TENDENCIES", rightX, curY);
  curY += 20;

  STAT_NAMES.forEach((name) => {
    drawStatBar(ctx, rightX, curY, rightW, name, buddy.stats[name]);
    curY += 22;
  });

  // === Footer ===
  const footerY = H - my - 30;
  setFont(ctx, 11, "normal");
  ctx.fillStyle = COLORS.greenDim;
  ctx.textAlign = "center";
  ctx.fillText(`${labels.checkYours} ${labels.watermark}`, W / 2, footerY);
  ctx.textAlign = "left";

  // Scan lines
  drawScanLines(ctx, W, H);

  // Corner accents
  drawCornerAccents(ctx, mx, my, W - mx * 2, H - my * 2, COLORS.green);

  return canvas;
}

// === Petition Badge ===

/**
 * Draws the "I HAD A BUDDY BEFORE v2.1.97" amber badge
 * positioned at bottom-right of the right content panel.
 */
function drawPetitionBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  line1: string,
  line2: string
) {
  const badgeH = 52;
  const bx = x;
  const by = y - badgeH;

  // Background fill
  ctx.save();
  ctx.fillStyle = COLORS.amber + "12";
  ctx.fillRect(bx, by, w, badgeH);

  // Top accent line
  ctx.fillStyle = COLORS.amber + "80";
  ctx.fillRect(bx, by, w, 1);

  // Border
  ctx.strokeStyle = COLORS.amber + "50";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(bx + 0.5, by + 0.5, w - 1, badgeH - 1);
  ctx.setLineDash([]);

  // Left accent bar
  ctx.fillStyle = COLORS.amber;
  ctx.fillRect(bx, by, 3, badgeH);

  // Line 1: main text
  setFont(ctx, 13, "bold");
  ctx.shadowColor = COLORS.amber;
  ctx.shadowBlur = 6;
  ctx.fillStyle = COLORS.amber;
  ctx.textAlign = "left";
  ctx.fillText(line1, bx + 14, by + 20);

  // Line 2: hashtag
  setFont(ctx, 11, "normal");
  ctx.shadowBlur = 3;
  ctx.fillStyle = COLORS.amber + "cc";
  ctx.fillText(line2, bx + 14, by + 38);

  // Star icon top-right
  setFont(ctx, 16, "bold");
  ctx.shadowBlur = 8;
  ctx.fillStyle = COLORS.amber;
  ctx.textAlign = "right";
  ctx.fillText("★", bx + w - 14, by + 28);

  ctx.restore();
}

// === Utility: Word Wrap ===

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// === Utility: Corner Accents ===

function drawCornerAccents(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  const len = 12;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  // Top-left
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  // Top-right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.stroke();

  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + len, y + h);
  ctx.stroke();

  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}

// === Export Utilities ===

/**
 * Download canvas as PNG
 */
export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Copy canvas to clipboard (if supported)
 */
export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!blob) return false;
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Share via Web Share API (if supported)
 */
export async function shareCanvas(canvas: HTMLCanvasElement, title: string, text: string): Promise<boolean> {
  try {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!blob) return false;
    const file = new File([blob], "claude-buddy.png", { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title, text, files: [file] });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
