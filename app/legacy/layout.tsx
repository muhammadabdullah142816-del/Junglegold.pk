import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Legacy — Razzaq Pansar Store & Jungle Gold Pure Raw Honey | Est. 1995 Pakistan",
  description:
    "Discover the 30-year legacy of Jungle Gold and Razzaq Pansar Store — Pakistan's most trusted pure raw honey and natural wellness brand since 1995. Founded in Gujrat, Punjab. PCSIR certified.",
  keywords: [
    "Razzaq Pansar Store legacy Pakistan",
    "Jungle Gold honey history",
    "pure honey brand Pakistan 1995",
    "trusted honey seller Pakistan",
    "natural honey Pakistan legacy",
    "Gujrat Punjab honey brand",
    "original raw honey Pakistan history",
    "authentic honey brand Pakistan since 1995",
  ],
  alternates: {
    canonical: "https://junglegold.pk/legacy",
  },
  openGraph: {
    title: "Our Legacy — Razzaq Pansar Store & Jungle Gold Pure Raw Honey | Est. 1995 Pakistan",
    description:
      "30 years of authentic raw honey and natural wellness. Jungle Gold is backed by Razzaq Pansar Store — trusted in Pakistan since 1995 with PCSIR lab certification and a Rs. 50,000 purity guarantee.",
    url: "https://junglegold.pk/legacy",
    siteName: "Jungle Gold Pure Raw Honey Pakistan",
    images: [
      {
        url: "https://junglegold.pk/harvest.jpg",
        width: 1200,
        height: 630,
        alt: "Jungle Gold Legacy — Wild Honey Harvest from Swat Valley Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
