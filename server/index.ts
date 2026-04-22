import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { generateSpeciesSvg, generateBlogSvg } from "./og-image.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

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

  // ── Static files — prerendered HTML for 57 known routes takes precedence.
  //    See scripts/prerender.mjs; source of truth is dist/public/sitemap.xml.
  app.use(express.static(staticPath));

  // ── SPA fallback for non-prerendered routes (e.g. /buddy/:uuid) ─────────────
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
