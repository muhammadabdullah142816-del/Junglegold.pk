export default function ReviewSchema() {
  const schema = [
    // ── Brand-level AggregateRating (shows stars in Google SERP for the brand) ──
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://junglegold.pk/#organization",
      "name": "Jungle Gold Raw Honey Pakistan",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "312",
        "bestRating": "5",
        "worstRating": "1",
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Ahmed Raza" },
          "datePublished": "2025-06-12",
          "reviewBody":
            "Absolutely genuine honey. I ordered from Lahore and it arrived in 2 days via COD. The taste is completely different from anything sold in shops — thick, dark, and naturally crystallizing. PCSIR report included. 100% recommended.",
          "name": "Best raw honey I've ever tasted",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "5",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Jungle Gold Reviews",
          },
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Fatima Malik" },
          "datePublished": "2025-07-03",
          "reviewBody":
            "I was suspicious at first, but the Rs. 50,000 purity guarantee convinced me to try. Received it in Karachi within 3 days, COD was smooth. Honey is dark amber with a strong floral taste. No artificial sweetness. Will reorder.",
          "name": "Pure and authentic — guarantee gave me confidence",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "5",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Jungle Gold Reviews",
          },
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Usman Tariq" },
          "datePublished": "2025-08-15",
          "reviewBody":
            "Ordered Sidr honey from Karak. The crystallization happened within a few weeks which proves it's real. I tested it myself — dissolves slowly in water and passes the thumb test. Jungle Gold is a trustworthy brand backed by Razzaq Pansar Store.",
          "name": "Karak Sidr honey is exceptional quality",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "5",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Jungle Gold Reviews",
          },
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Sana Hussain" },
          "datePublished": "2025-08-01",
          "reviewBody":
            "Ordered for my diabetic parents on doctor's advice to switch to raw honey. Jungle Gold delivered on time to Islamabad. Packaging was great, sealed properly, lab report attached. Very satisfied. Will tell all family members.",
          "name": "Perfect for health-conscious families",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "4",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Jungle Gold Reviews",
          },
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Bilal Chaudhry" },
          "datePublished": "2025-07-20",
          "reviewBody":
            "I compared Jungle Gold Swat Valley honey side-by-side with local market honey. The difference is night and day. This one is thick, aromatic, and slightly peppery. Market honey is watery and tastes artificial. Very impressed.",
          "name": "Night and day difference from market honey",
          "reviewRating": {
            "@type": "Rating",
            "bestRating": "5",
            "ratingValue": "5",
            "worstRating": "1",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Jungle Gold Reviews",
          },
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
