import { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://junglegold.pk";

  let products: Product[] = [];
  try {
    products = await fetchProducts();
  } catch (err) {
    console.error("Sitemap fetchProducts error:", err);
  }

  // Product entries — expose product image URLs for Google Image indexing
  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/#products`,
    lastModified: new Date(product.created_at || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: product.images?.length
      ? product.images
      : [`${baseUrl}/products.jpg`],
  }));

  // De-duplicate product URLs (multiple products all map to /#products)
  const uniqueProductUrls = productUrls.length > 0 ? [productUrls[0]] : [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
      images: [
        `${baseUrl}/hero-jar.jpg`,
        `${baseUrl}/brand-logo.png`,
        `${baseUrl}/harvest.jpg`,
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [`${baseUrl}/brand-logo.png`],
    },
    {
      url: `${baseUrl}/legacy`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: [`${baseUrl}/harvest.jpg`],
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...uniqueProductUrls,
  ];
}

