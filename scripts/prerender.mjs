#!/usr/bin/env node
/**
 * Static prerender via headless Chromium snapshot.
 * Reads route list from dist/public/sitemap.xml, snapshots each route after
 * React hydration, strips debug attributes, writes hydrated HTML back to
 * dist/public/<route>/index.html.
 *
 * Backend selection (Vercel build env lacks libnspr4 for Playwright's bundled
 * Chromium, so we swap to @sparticuz/chromium + puppeteer-core there):
 *   - process.env.VERCEL is set on Vercel build → puppeteer-core + sparticuz
 *   - Otherwise (local dev / CI on Linux/macOS with libs) → playwright
 */

import express from "express";
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist", "public");
const SITEMAP = path.join(DIST, "sitemap.xml");
const SITE_ORIGIN = "https://www.claudebuddy.art";

const CONCURRENCY = 5;
const MAX_RETRIES = 2;
const NAV_TIMEOUT = 30000;
const HYDRATION_SETTLE_MS = 300;
const USER_AGENT =
  "Mozilla/5.0 (compatible; ClaudeBuddyPrerender/1.0; +https://claudebuddy.art)";
const VIEWPORT = { width: 1280, height: 800 };

const IS_VERCEL = !!process.env.VERCEL;

const STRICT_RULES = [
  { name: "home", test: (r) => r === "/", min: 4 },
  { name: "blog-detail", test: (r) => /^\/blog\/[^/]+$/.test(r), min: 3 },
  { name: "species-detail", test: (r) => /^\/species\/[^/]+$/.test(r), min: 1 },
];

function strictMinFor(route) {
  const rule = STRICT_RULES.find((r) => r.test(route));
  return rule ? rule.min : 0;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Browser adapter ─────────────────────────────────────────────────────────

async function makePuppeteerAdapter() {
  const puppeteer = (await import("puppeteer-core")).default;
  const chromium = (await import("@sparticuz/chromium")).default;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
    defaultViewport: VIEWPORT,
  });

  return {
    backend: "puppeteer+sparticuz",
    waitUntil: "networkidle0",
    async newPage() {
      const page = await browser.newPage();
      await page.setUserAgent(USER_AGENT);
      return page;
    },
    async close() {
      await browser.close();
    },
  };
}

async function makePlaywrightAdapter() {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: USER_AGENT,
    viewport: VIEWPORT,
  });
  return {
    backend: "playwright",
    waitUntil: "networkidle",
    async newPage() {
      return context.newPage();
    },
    async close() {
      await context.close();
      await browser.close();
    },
  };
}

async function makeAdapter() {
  return IS_VERCEL ? makePuppeteerAdapter() : makePlaywrightAdapter();
}

// ── Routes / IO ─────────────────────────────────────────────────────────────

async function readRoutes() {
  const xml = await fs.readFile(SITEMAP, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const routes = locs
    .map((u) => u.replace(SITE_ORIGIN, "") || "/")
    .filter((p) => !p.startsWith("/buddy/"));
  return Array.from(new Set(routes));
}

function routeToOutputPath(route) {
  if (route === "/") return path.join(DIST, "index.html");
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(DIST, clean, "index.html");
}

function startStaticServer() {
  const app = express();
  app.use(express.static(DIST));
  app.get("*", (_req, res) => res.sendFile(path.join(DIST, "index.html")));
  return new Promise((resolve) => {
    const server = createServer(app);
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: server.address().port });
    });
  });
}

function postProcessHtml(html) {
  return html
    .replace(/\s+data-loc="[^"]*"/g, "")
    .replace(/\s+data-manus-debug-loc="[^"]*"/g, "");
}

// ── Snapshot pipeline ───────────────────────────────────────────────────────

async function snapshotRoute(adapter, baseUrl, route) {
  const page = await adapter.newPage();
  try {
    await page.goto(baseUrl + route, {
      waitUntil: adapter.waitUntil,
      timeout: NAV_TIMEOUT,
    });
    await sleep(HYDRATION_SETTLE_MS);

    const stats = await page.evaluate(() => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      return {
        jsonLdCount: scripts.length,
        title: document.title,
        hasCanonical: !!document.querySelector('link[rel="canonical"]'),
        hasOgImage: !!document.querySelector('meta[property="og:image"]'),
      };
    });

    const expected = strictMinFor(route);
    if (stats.jsonLdCount < expected) {
      throw new Error(
        `JSON-LD below threshold for ${route}: got ${stats.jsonLdCount}, expected >= ${expected}`
      );
    }
    if (!stats.hasCanonical) throw new Error(`missing canonical for ${route}`);
    if (!stats.hasOgImage) throw new Error(`missing og:image for ${route}`);
    stats.schemaWarning = expected === 0 && stats.jsonLdCount === 0;

    const rawHtml = await page.content();
    const html = postProcessHtml(rawHtml);
    return { html, stats };
  } finally {
    await page.close();
  }
}

async function withRetry(label, fn) {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_RETRIES) {
        console.log(`  ↻ retry ${attempt + 1}/${MAX_RETRIES} — ${label}`);
      }
    }
  }
  throw lastErr;
}

async function processBatch(adapter, baseUrl, batch) {
  return Promise.all(
    batch.map(async (route) => {
      const started = Date.now();
      try {
        const { html, stats } = await withRetry(route, () =>
          snapshotRoute(adapter, baseUrl, route)
        );
        const out = routeToOutputPath(route);
        await fs.mkdir(path.dirname(out), { recursive: true });
        await fs.writeFile(out, html, "utf8");
        return {
          route,
          status: "ok",
          ms: Date.now() - started,
          size: html.length,
          ...stats,
        };
      } catch (err) {
        return {
          route,
          status: "fail",
          ms: Date.now() - started,
          error: err.message,
        };
      }
    })
  );
}

async function main() {
  const tStart = Date.now();
  console.log("▶ prerender start");

  const routes = await readRoutes();
  console.log(`  routes: ${routes.length} (source: sitemap.xml)`);

  const { server, port } = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  const adapter = await makeAdapter();
  console.log(`  backend: ${adapter.backend}`);

  const results = [];
  try {
    for (let i = 0; i < routes.length; i += CONCURRENCY) {
      const batch = routes.slice(i, i + CONCURRENCY);
      const batchResults = await processBatch(adapter, baseUrl, batch);
      results.push(...batchResults);
      const done = Math.min(i + CONCURRENCY, routes.length);
      console.log(`  ${done}/${routes.length}`);
    }
  } finally {
    await adapter.close();
    server.close();
  }

  const ok = results.filter((r) => r.status === "ok");
  const failed = results.filter((r) => r.status === "fail");
  const totalMs = Date.now() - tStart;

  console.log("");
  console.log("─".repeat(60));
  console.log(`✓ ok     : ${ok.length}/${results.length}`);
  console.log(`✗ failed : ${failed.length}`);
  console.log(
    `Σ elapsed: ${(totalMs / 1000).toFixed(1)}s  (avg ${(
      totalMs / results.length
    ).toFixed(0)}ms/route)`
  );
  if (ok.length > 0) {
    const avgLd = ok.reduce((s, r) => s + r.jsonLdCount, 0) / ok.length;
    const avgSize = ok.reduce((s, r) => s + r.size, 0) / ok.length / 1024;
    console.log(
      `⌀ JSON-LD/page ≈ ${avgLd.toFixed(1)}  |  HTML size ≈ ${avgSize.toFixed(
        1
      )} KB`
    );
  }

  const warnings = ok.filter((r) => r.schemaWarning);
  if (warnings.length > 0) {
    console.log("");
    console.log(`⚠ ${warnings.length} pages prerendered with 0 JSON-LD (Phase 1C to fix):`);
    for (const w of warnings) console.log(`    ${w.route}`);
  }

  if (failed.length > 0) {
    console.log("");
    console.log("FAILURES:");
    for (const f of failed) console.log(`  ✗ ${f.route} — ${f.error}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("✗ prerender crashed:", err);
  process.exit(1);
});
