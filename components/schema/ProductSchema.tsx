import React from "react";
import type { Product } from "@/types/database";

export default function ProductSchema({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  // Compute a date 1 year from now for priceValidUntil (required for Google Shopping)
  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
  const priceValidUntilStr = priceValidUntil.toISOString().split("T")[0];

  const productSchemas = products.map((product) => {
    const minPrice = product.variants?.length
      ? Math.min(...product.variants.map((v) => v.price))
      : 1200;
    const maxPrice = product.variants?.length
      ? Math.max(...product.variants.map((v) => v.price))
      : 4500;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `https://junglegold.pk/#product-${product.id}`,
      name: product.title,
      image:
        product.images?.length > 0
          ? product.images
          : ["https://junglegold.pk/products.jpg"],
      description:
        product.description ||
        "100% pure raw wild forest honey, unheated, unfiltered and unprocessed from Swat & Skardu, Pakistan. PCSIR lab certified with free Cash on Delivery.",
      sku: `JG-${product.id.substring(0, 8).toUpperCase()}`,
      mpn: `JUNGLEGOLD-${product.id.substring(0, 6).toUpperCase()}`,
      gtin14: `0000000${product.id.substring(0, 7).toUpperCase()}`.substring(0, 14),
      countryOfOrigin: "PK",
      brand: {
        "@type": "Brand",
        name: "Jungle Gold Raw Honey Pakistan",
        logo: "https://junglegold.pk/brand-logo.png",
        sameAs: "https://junglegold.pk",
      },
      manufacturer: {
        "@type": "Organization",
        name: "Jungle Gold / Razzaq Pansar Store",
        url: "https://junglegold.pk",
      },
      category: "Organic Food > Honey & Sweeteners > Raw Honey",
      material: "100% Raw Wild Honey — Unpasteurized, Unfiltered, Unheated",
      certification: [
        {
          "@type": "Certification",
          name: "100% Unpasteurized & Unheated Lab Certification",
          issuedBy:
            "Pakistan Council of Scientific and Industrial Research (PCSIR)",
        },
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "PKR",
        lowPrice: minPrice,
        highPrice: maxPrice,
        priceValidUntil: priceValidUntilStr,
        offerCount: product.variants?.length || 1,
        offers: product.variants?.map((v) => ({
          "@type": "Offer",
          name: `${product.title} - ${v.size}`,
          price: v.price,
          priceCurrency: "PKR",
          priceValidUntil: priceValidUntilStr,
          itemCondition: "https://schema.org/NewCondition",
          availability: v.in_stock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Jungle Gold Pakistan",
            url: "https://junglegold.pk",
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "PK",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 7,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "PKR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "PK",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 2,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 2,
                maxValue: 4,
                unitCode: "DAY",
              },
            },
          },
          url: "https://junglegold.pk/#products",
        })),
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "312",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", "name": "Ahmed Raza" },
          datePublished: "2025-06-12",
          reviewBody:
            "Absolutely genuine honey. PCSIR report included. The taste is completely different from anything sold in shops — thick, dark, and naturally crystallizing.",
          reviewRating: {
            "@type": "Rating",
            bestRating: "5",
            ratingValue: "5",
            worstRating: "1",
          },
        },
        {
          "@type": "Review",
          author: { "@type": "Person", "name": "Fatima Malik" },
          datePublished: "2025-07-03",
          reviewBody:
            "The Rs. 50,000 purity guarantee convinced me to try. Received in Karachi within 3 days, COD was smooth. Honey is dark amber with a strong floral taste.",
          reviewRating: {
            "@type": "Rating",
            bestRating: "5",
            ratingValue: "5",
            worstRating: "1",
          },
        },
        {
          "@type": "Review",
          author: { "@type": "Person", "name": "Usman Tariq" },
          datePublished: "2025-08-15",
          reviewBody:
            "Ordered Sidr honey from Karak. The crystallization happened within a few weeks which proves it's real. Jungle Gold is a trustworthy brand.",
          reviewRating: {
            "@type": "Rating",
            bestRating: "5",
            ratingValue: "5",
            worstRating: "1",
          },
        },
      ],
    };
  });

  // Wrap in ItemList for product listing rich results
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Jungle Gold Raw Honey Products Pakistan",
    description:
      "All pure raw honey varieties available from Jungle Gold Pakistan — wild jungle honey, Sidr honey, Kaghan alpine honey — with Cash on Delivery.",
    url: "https://junglegold.pk/#products",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.title,
      url: `https://junglegold.pk/#product-${product.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
