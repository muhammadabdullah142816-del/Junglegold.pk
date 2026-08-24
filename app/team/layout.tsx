import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team — Beekeepers & Experts Behind Jungle Gold Pure Raw Honey Pakistan",
  description:
    "Meet the dedicated beekeepers, quality experts, and team members behind Jungle Gold — Pakistan's most trusted PCSIR-certified raw honey brand. Operating from Swat, Karak, Kaghan Valley and Gujrat Punjab.",
  keywords: [
    "Jungle Gold team Pakistan",
    "raw honey beekeepers Pakistan",
    "Swat Valley honey experts",
    "Karak Sidr honey producers",
    "pure honey team Pakistan",
    "Jungle Gold Pakistan operators",
    "authentic honey specialists Pakistan",
    "Razzaq Pansar Store team",
  ],
  alternates: {
    canonical: "https://junglegold.pk/team",
  },
  openGraph: {
    title: "Our Team — Beekeepers & Experts Behind Jungle Gold Pure Raw Honey Pakistan",
    description:
      "The dedicated experts and traditional beekeepers behind Pakistan's most certified raw honey brand. Jungle Gold — backed by 30 years of Razzaq Pansar Store trust.",
    url: "https://junglegold.pk/team",
    siteName: "Jungle Gold Pure Raw Honey Pakistan",
    images: [
      {
        url: "https://junglegold.pk/brand-logo.png",
        width: 1200,
        height: 630,
        alt: "Jungle Gold Team — Raw Honey Experts Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
