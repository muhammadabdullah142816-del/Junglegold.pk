import React from "react";
import type { Product } from "@/types/database";

export default function ProductSchema({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  // Compute priceValidUntil (1 year from now) as required by Google Search
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split("T")[0];

  const schemas = products.map((product) => {
    const minPrice = product.variants?.length
      ? Math.min(...product.variants.map((v) => v.price))
      : 1200;
    const maxPrice = product.variants?.length
      ? Math.max(...product.variants.map((v) => v.price))
      : 4500;

    const images =
      product.images && product.images.length > 0
        ? product.images
        : ["https://junglegold.pk/products.jpg"];

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `https://junglegold.pk/#product-${product.id}`,
      name: product.title,
      image: images,
      description:
        product.description ||
        "100% pure raw wild forest honey, unheated, unfiltered and unpasteurized from Swat & Skardu, Pakistan. PCSIR lab certified with free nationwide Cash on Delivery.",
      sku: `JG-${product.id.substring(0, 8).toUpperCase()}`,
      mpn: `JUNGLEGOLD-${product.id.substring(0, 6).toUpperCase()}`,
      brand: {
        "@type": "Brand",
        name: "Jungle Gold",
      },
      category: "Organic Food > Honey & Sweeteners > Raw Honey",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "PKR",
        lowPrice: minPrice,
        highPrice: maxPrice,
        priceValidUntil: priceValidUntil,
        offerCount: product.variants?.length || 1,
        offers: product.variants?.map((v) => ({
          "@type": "Offer",
          name: `${product.title} (${v.size})`,
          price: v.price,
          priceCurrency: "PKR",
          priceValidUntil: priceValidUntil,
          itemCondition: "https://schema.org/NewCondition",
          availability: v.in_stock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: "https://junglegold.pk/#products",
          seller: {
            "@type": "Organization",
            name: "Jungle Gold Raw Honey Pakistan",
          },
        })),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "48",
        bestRating: "5",
        worstRating: "1",
      },
    };
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
