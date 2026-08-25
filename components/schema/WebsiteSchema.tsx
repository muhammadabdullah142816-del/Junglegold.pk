"use client";

export default function WebsiteSchema() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://junglegold-pk-three.vercel.app");

  const schema = [
    // ── WebSite with Google Site Name & SearchAction ──
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Jungle Gold",
      "alternateName": [
        "Jungle Gold Pakistan",
        "JungleGold",
        "JungleGold.pk",
        "جنگل گولڈ",
        "Jungle Gold Raw Honey"
      ],
      "description":
        "100% pure raw jungle honey and organic Sidr honey online in Pakistan with nationwide Cash on Delivery. PCSIR lab certified.",
      "inLanguage": "en-PK",
      "publisher": {
        "@id": `${baseUrl}/#organization`,
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/#products?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    // ── BreadcrumbList for homepage ──
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": `${baseUrl}/#products`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "About Us",
          "item": `${baseUrl}/about`,
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Our Legacy",
          "item": `${baseUrl}/legacy`,
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Our Team",
          "item": `${baseUrl}/team`,
        },
      ],
    },

    // ── Speakable (Voice Search: Google Assistant, Siri, Alexa) ──
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${baseUrl}/#webpage`,
      "url": baseUrl,
      "name": "Jungle Gold — 100% Pure Raw Honey in Pakistan",
      "isPartOf": { "@id": `${baseUrl}/#website` },
      "about": { "@id": `${baseUrl}/#organization` },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".speakable"],
      },
      "inLanguage": "en-PK",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
