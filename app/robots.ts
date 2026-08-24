import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://junglegold-pk-three.vercel.app");

  return {
    rules: [
      // Main rule: allow all public pages, block admin and raw API
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
      },
      // AI/GEO bots — allow everything including /api/keepalive for context
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Amazonbot",
          "anthropic-ai",
          "Bytespider",
          "CCBot",
          "ChatGPT-User",
          "cohere-ai",
          "Diffbot",
          "FacebookBot",
          "facebookexternalhit",
          "ImagesiftBot",
          "omgili",
          "omgilibot",
        ],
        allow: "/",
        disallow: ["/admin/"],
      },
      // Standard search engine bots — full access
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "Yandex", "Baidu"],
        allow: "/",
        disallow: ["/admin/"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
