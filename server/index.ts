import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { getSpeciesOgMeta, getBlogOgMeta, type OgMeta } from "../shared/og-meta.js";
import { generateSpeciesSvg, generateBlogSvg } from "./og-image.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── XML-safe escaping for meta attribute values ────────────────────────────────
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Inject page-specific OG meta tags into the index.html string ──────────────
function injectOgMeta(html: string, meta: OgMeta): string {
  return html
    // <title>
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    // meta description
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${esc(meta.description)}"`)
    // og:title
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${esc(meta.title)}"`)
    // og:description
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${esc(meta.description)}"`)
    // og:image  (custom SVG — works for Discord, Slack, Telegram, etc.)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*"/, `$1${esc(meta.ogImage)}"`)
    // og:url
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${esc(meta.url)}"`)
    // og:type
    .replace(/(<meta\s+property="og:type"\s+content=")[^"]*"/, `$1${esc(meta.type)}"`)
    // twitter:title
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*"/, `$1${esc(meta.title)}"`)
    // twitter:description
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${esc(meta.description)}"`)
    // twitter:image — raster hero image for Twitter/X compatibility
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*"/, `$1${esc(meta.twitterImage)}"`)
    // canonical
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*"/, `$1${esc(meta.url)}"`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Cache index.html at startup (it doesn't change between requests)
  const indexPath = path.join(staticPath, "index.html");
  let baseHtml = "";
  try {
    baseHtml = fs.readFileSync(indexPath, "utf-8");
  } catch {
    // Dev mode: file may not exist yet; will be re-read per request below
  }

  function getBaseHtml(): string {
    if (baseHtml) return baseHtml;
    try {
      baseHtml = fs.readFileSync(indexPath, "utf-8");
    } catch {
      /* ignore */
    }
    return baseHtml;
  }

  // ── OG image API ─────────────────────────────────────────────────────────────

  app.get("/api/og/species/:slug.svg", (req, res) => {
    const svg = generateSpeciesSvg(req.params.slug);
    if (!svg) return res.status(404).send("Not found");
    res
      .set("Content-Type", "image/svg+xml")
      .set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800")
      .send(svg);
  });

  app.get("/api/og/blog/:slug.svg", (req, res) => {
    const svg = generateBlogSvg(req.params.slug);
    if (!svg) return res.status(404).send("Not found");
    res
      .set("Content-Type", "image/svg+xml")
      .set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800")
      .send(svg);
  });

  // ── Static files ──────────────────────────────────────────────────────────────
  app.use(express.static(staticPath));

  // ── SPA catch-all with per-route meta injection ───────────────────────────────
  app.get("*", (req, res) => {
    const html = getBaseHtml();
    if (!html) {
      // Fallback: let Express find it (dev mode before first build)
      return res.sendFile(path.join(staticPath, "index.html"));
    }

    const urlPath = req.path;

    // /species/:slug
    const speciesMatch = urlPath.match(/^\/species\/([^/]+)\/?$/);
    if (speciesMatch) {
      const meta = getSpeciesOgMeta(speciesMatch[1]);
      if (meta) return res.set("Content-Type", "text/html").send(injectOgMeta(html, meta));
    }

    // /blog/:slug
    const blogMatch = urlPath.match(/^\/blog\/([^/]+)\/?$/);
    if (blogMatch) {
      const meta = getBlogOgMeta(blogMatch[1]);
      if (meta) return res.set("Content-Type", "text/html").send(injectOgMeta(html, meta));
    }

    // all other routes — serve index.html as-is
    res.set("Content-Type", "text/html").send(html);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
