import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const BASE_URL = "https://www.claudebuddy.art";
const LOCALES = ["en", "zh", "ko", "ja"] as const;

export interface ArticleMeta {
  slug: string;
  publishedAt: string;
  title: string;
}

export interface SitemapPluginOptions {
  articles: ArticleMeta[];
  speciesSlugs: string[];
  outDir: string;
}

function hreflangAlts(url: string): string {
  return LOCALES.map(
    (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`
  ).join("\n") + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />`;
}

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangAlts(loc)}
  </url>`;
}

function generateSitemap(options: SitemapPluginOptions): string {
  const today = new Date().toISOString().slice(0, 10);
  const entries: string[] = [];

  // Homepage
  entries.push(urlEntry(`${BASE_URL}/`, today, "weekly", "1.0"));

  // Species index
  entries.push(urlEntry(`${BASE_URL}/species`, today, "weekly", "0.9"));

  // Species detail pages
  for (const slug of options.speciesSlugs) {
    entries.push(urlEntry(`${BASE_URL}/species/${slug}`, today, "monthly", "0.8"));
  }

  // Tool pages
  entries.push(urlEntry(`${BASE_URL}/powerup-tracker`, today, "weekly", "0.8"));
  entries.push(urlEntry(`${BASE_URL}/collection`, today, "weekly", "0.7"));
  entries.push(urlEntry(`${BASE_URL}/compare`, today, "weekly", "0.7"));

  // Blog index
  entries.push(urlEntry(`${BASE_URL}/blog`, today, "weekly", "0.9"));

  // Blog articles
  for (const article of options.articles) {
    const lastmod = article.publishedAt ?? today;
    entries.push(urlEntry(`${BASE_URL}/blog/${article.slug}`, lastmod, "monthly", "0.7"));
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${entries.join("\n\n")}

</urlset>`;
}

function generateRssFeed(options: SitemapPluginOptions): string {
  const today = new Date().toUTCString();
  const items = options.articles
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 20)
    .map(
      (article) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${BASE_URL}/blog/${article.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Claude Buddy — AI DevTools Gamification</title>
    <link>${BASE_URL}</link>
    <description>The home of AI developer tools gamification. Guides, deep dives, and lore about Claude Buddy and the gamification ecosystem.</description>
    <language>en</language>
    <lastBuildDate>${today}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function generateSitemapPlugin(options: SitemapPluginOptions): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    closeBundle() {
      const sitemapXml = generateSitemap(options);
      const feedXml = generateRssFeed(options);

      fs.mkdirSync(options.outDir, { recursive: true });
      fs.writeFileSync(path.join(options.outDir, "sitemap.xml"), sitemapXml, "utf-8");
      fs.writeFileSync(path.join(options.outDir, "feed.xml"), feedXml, "utf-8");

      const urlCount = (sitemapXml.match(/<url>/g) ?? []).length;
      console.log(`\n✓ sitemap.xml generated: ${urlCount} URLs`);
      console.log(`✓ feed.xml generated: RSS 2.0\n`);
    },
  };
}
