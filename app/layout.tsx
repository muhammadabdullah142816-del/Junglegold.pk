import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import OrganizationSchema from "@/components/schema/OrganizationSchema";
import FAQSchema from "@/components/schema/FAQSchema";
import WebsiteSchema from "@/components/schema/WebsiteSchema";
import StickyMobileBar from "@/components/StickyMobileBar";
import HoneyBackground from "@/components/HoneyBackground";
import IntroSplash from "@/components/IntroSplash";



const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://junglegold.pk"),
  title: {
    default: "100% Pure Raw Honey in Pakistan | Buy Best Organic & Sidr Honey Online — Jungle Gold",
    template: "%s | Jungle Gold — Pure Honey in Pakistan",
  },
  description:
    "Buy 100% pure raw honey in Pakistan online at the best honey price in Pakistan (Lahore, Karachi, Islamabad, Rawalpindi, Gujrat). Original unpasteurized Sidr & wild forest honey. PCSIR lab certified with nationwide Cash on Delivery (COD) & Rs. 50,000 purity guarantee.",
  keywords: [
    "honey in Pakistan",
    "pure honey in Pakistan",
    "raw honey in Pakistan",
    "best honey in Pakistan",
    "original honey in Pakistan",
    "pure honey price in Pakistan",
    "honey price in Pakistan",
    "Sidr honey Pakistan",
    "buy honey online Pakistan",
    "organic honey in Pakistan",
    "wild jungle honey Pakistan",
    "Sidr Beri honey Swat",
    "original sidr honey Lahore",
    "pure raw honey Karachi",
    "natural honey Islamabad",
    "natural honey delivery Pakistan",
    "Jungle Gold honey",
    "Razzaq Pansar Store raw honey",
    "Karak Sidr honey buy online",
    "Kaghan valley honey Pakistan",
    "PCSIR certified honey Pakistan",
    "Sidr honey benefits Pakistan",
    "شہد پاکستان",
    "خالص شہد پاکستان",
    "قدرتی شہد جنگل",
  ],
  alternates: {
    canonical: "https://junglegold.pk",
    languages: {
      "en-pk": "https://junglegold.pk",
      "x-default": "https://junglegold.pk",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Jungle Gold — 100% Pure Raw Jungle Honey & Organic Sidr Honey Pakistan | Buy Online PK",
    description: "Unfiltered, unpasteurized organic raw wild honey harvested from natural hives in Swat, Karak & Kaghan. PCSIR lab certified. Rs. 50,000 purity guarantee. Free Cash on Delivery across Lahore, Karachi, Islamabad.",
    url: "https://junglegold.pk",
    siteName: "Jungle Gold Pure Raw Honey Pakistan",
    images: [
      {
        url: "https://junglegold.pk/brand-logo.png",
        width: 1200,
        height: 630,
        alt: "Jungle Gold Pure Raw Jungle Honey Pakistan — PCSIR Lab Certified",
        type: "image/png",
      },
      {
        url: "https://junglegold.pk/hero-jar.jpg",
        width: 1200,
        height: 630,
        alt: "Jungle Gold wild honey jar — 100% pure raw forest honey from Swat Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
    countryName: "Pakistan",
    emails: ["junglegoldofficials@gmail.com"],
    phoneNumbers: ["+92-324-0917740"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jungle Gold — 100% Pure Raw Jungle Honey & Organic Sidr Honey Pakistan | Buy Online PK",
    description: "Unfiltered, unpasteurized organic raw wild honey from Swat, Karak & Kaghan. PCSIR certified. Rs. 50,000 purity guarantee. Free COD nationwide.",
    images: ["https://junglegold.pk/hero-jar.jpg"],
    site: "@junglegoldpk",
    creator: "@junglegoldpk",
  },
  verification: {
    google: "google0ccaa1cfd930e732",
  },
  icons: {
    icon: [
      { url: "/brand-logo.png", type: "image/png", sizes: "512x512" },
      { url: "/brand-logo.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/brand-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/brand-logo.png",
  },
  category: "food",
  classification: "Organic Food > Honey",
  other: {
    "msvalidate.01": "junglegold-bing-verify",
    "rating": "General",
    "revisit-after": "7 days",
    "language": "English",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Jungle Gold Honey",
    "application-name": "Jungle Gold",
    "theme-color": "#1a2e1a",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Favicon & Google Search Result Brand Logo */}
        <link rel="icon" type="image/png" sizes="512x512" href="/brand-logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/brand-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/brand-logo.png" />
        <link rel="shortcut icon" href="/brand-logo.png" />

        {/* Geo tags */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="geo.position" content="32.5742;74.0754" />
        <meta name="ICBM" content="32.5742, 74.0754" />
        <meta name="geo.country" content="PK" />

        {/* hreflang */}
        <link rel="alternate" hrefLang="en-pk" href="https://junglegold.pk" />
        <link rel="alternate" hrefLang="x-default" href="https://junglegold.pk" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <OrganizationSchema />
        <FAQSchema />
        <WebsiteSchema />
      </head>
      <body className="pb-28 md:pb-0 bg-forest text-cream min-h-screen relative overflow-x-hidden">
        <IntroSplash />
        <HoneyBackground />
        <CartProvider>
          <div className="relative z-10">{children}</div>
          <StickyMobileBar />
        </CartProvider>
      </body>
    </html>
  );
}

