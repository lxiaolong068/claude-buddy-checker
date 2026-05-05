#!/usr/bin/env node
/**
 * IndexNow ping — notify Bing/Yandex/Naver/Seznam about sitemap URLs.
 * Reads dist/public/sitemap.xml, extracts every <loc>, POSTs the list to
 * https://api.indexnow.org/IndexNow.
 *
 * Gated by VERCEL_ENV=production so preview/local builds never burn quota.
 * Set INDEXNOW_FORCE=1 to override the gate (useful for one-off manual ping).
 *
 * Always exits 0: a transient IndexNow outage must not break the deploy.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.resolve(__dirname, "..", "dist", "public", "sitemap.xml");

const HOST = "www.claudebuddy.art";
const KEY = "fd9f42ca11dd61d7a2de5598ebae48c2";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

function shouldRun() {
  if (process.env.INDEXNOW_FORCE === "1") return { run: true, reason: "INDEXNOW_FORCE=1" };
  if (process.env.VERCEL && process.env.VERCEL_ENV === "production") {
    return { run: true, reason: "Vercel production" };
  }
  return {
    run: false,
    reason: `not production (VERCEL=${process.env.VERCEL ?? "unset"}, VERCEL_ENV=${process.env.VERCEL_ENV ?? "unset"})`,
  };
}

async function main() {
  const gate = shouldRun();
  if (!gate.run) {
    console.log(`[indexnow] skipping — ${gate.reason}. Set INDEXNOW_FORCE=1 to override.`);
    return;
  }
  console.log(`[indexnow] running — ${gate.reason}`);

  let sitemap;
  try {
    sitemap = await readFile(SITEMAP_PATH, "utf-8");
  } catch (err) {
    console.warn(`[indexnow] sitemap.xml not found at ${SITEMAP_PATH} — skip (${err.code})`);
    return;
  }

  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(`https://${HOST}/`));

  if (urls.length === 0) {
    console.warn("[indexnow] no eligible URLs in sitemap — skip");
    return;
  }

  console.log(`[indexnow] pinging ${urls.length} URL${urls.length === 1 ? "" : "s"} → ${ENDPOINT}`);

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => "");
    if (res.status === 200 || res.status === 202) {
      console.log(`[indexnow] ✓ ${res.status} ${res.statusText} — ${urls.length} URLs accepted`);
    } else {
      console.warn(`[indexnow] ⚠ ${res.status} ${res.statusText}${text ? ` — ${text.slice(0, 200)}` : ""}`);
    }
  } catch (err) {
    console.warn(`[indexnow] ⚠ network error: ${err.message}`);
  }
}

main().catch((err) => {
  console.warn(`[indexnow] ⚠ unexpected: ${err.message}`);
  process.exitCode = 0;
});
