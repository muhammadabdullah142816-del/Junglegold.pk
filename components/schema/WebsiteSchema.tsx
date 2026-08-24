"use client";

export default function WebsiteSchema() {
  const schema = [
    // ── WebSite with SearchAction (enables Google Sitelinks search box) ──
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://junglegold.pk/#website",
      "url": "https://junglegold.pk",
      "name": "Jungle Gold — Pure Raw Honey Pakistan",
      "description":
        "Buy 100% pure raw jungle honey and organic Sidr honey online in Pakistan with Cash on Delivery. Harvested from Swat, Karak & Attock. PCSIR lab certified.",
      "inLanguage": "en-PK",
      "publisher": {
        "@id": "https://junglegold.pk/#organization",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://junglegold.pk/#products?q={search_term_string}",
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
          "item": "https://junglegold.pk",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": "https://junglegold.pk/#products",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Our Story",
          "item": "https://junglegold.pk/#story",
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Our Legacy",
          "item": "https://junglegold.pk/legacy",
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "About Us",
          "item": "https://junglegold.pk/about",
        },
      ],
    },

    // ── Speakable (Voice Search: Google Assistant, Siri, Alexa) ──
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://junglegold.pk/#webpage",
      "url": "https://junglegold.pk",
      "name": "Jungle Gold — 100% Pure Raw Jungle Honey Pakistan",
      "isPartOf": { "@id": "https://junglegold.pk/#website" },
      "about": { "@id": "https://junglegold.pk/#organization" },
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
