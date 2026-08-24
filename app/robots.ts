import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
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
    sitemap: "https://junglegold.pk/sitemap.xml",
    host: "https://junglegold.pk",
  };
}

