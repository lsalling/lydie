import { BLOG_ENABLED, TEMPLATE_MARKETPLACE_ENABLED } from "../config/features";
import { generateSitemapIndex, sitemapHeaders } from "./sitemap-utils.js";

export const prerender = true;

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const sitemaps = [
    { path: "sitemap-pages.xml", lastmod: today },
    ...(TEMPLATE_MARKETPLACE_ENABLED ? [{ path: "sitemap-templates.xml", lastmod: today }] : []),
    ...(BLOG_ENABLED ? [{ path: "sitemap-blog.xml", lastmod: today }] : []),
    { path: "sitemap-tools.xml", lastmod: today },
  ];

  const sitemapIndex = generateSitemapIndex(sitemaps);

  return new Response(sitemapIndex, {
    headers: sitemapHeaders,
  });
}
