import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Jungle Gold — Pure Raw Honey Brand Pakistan | Razzaq Pansar Store Legacy",
  description:
    "Learn about Jungle Gold, Pakistan's trusted pure raw honey brand. Backed by 30 years of Razzaq Pansar Store legacy since 1995. PCSIR lab certified, harvesting from Swat, Karak & Kaghan. Rs. 50,000 purity guarantee. Nationwide COD.",
  keywords: [
    "about Jungle Gold honey Pakistan",
    "Razzaq Pansar Store honey",
    "pure raw honey brand Pakistan",
    "PCSIR certified honey Pakistan",
    "trusted honey seller Pakistan",
    "who is Jungle Gold",
    "Jungle Gold Pakistan review",
    "Gujrat Punjab honey Pakistan",
  ],
  alternates: {
    canonical: "https://junglegold.pk/about",
  },
  openGraph: {
    title: "About Jungle Gold — Pure Raw Honey Brand Pakistan | Razzaq Pansar Store Legacy",
    description:
      "30 years of trust, purity, and wild honey expertise. Jungle Gold is Pakistan's most verified raw honey brand with PCSIR lab certification and a Rs. 50,000 purity guarantee.",
    url: "https://junglegold.pk/about",
    siteName: "Jungle Gold Pure Raw Honey Pakistan",
    images: [
      {
        url: "https://junglegold.pk/brand-logo.png",
        width: 1200,
        height: 630,
        alt: "Jungle Gold — Pure Raw Honey Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

const TRUST_STATS = [
  { val: "1995", label: "Year Founded" },
  { val: "30+", label: "Years of Trust" },
  { val: "8+", label: "Harvest Origins" },
  { val: "312+", label: "Verified Reviews" },
  { val: "4.9★", label: "Average Rating" },
  { val: "Rs.50K", label: "Purity Guarantee" },
];

const VALUES = [
  {
    icon: "🔬",
    title: "PCSIR Lab Certified",
    desc: "Every batch is independently tested by the Pakistan Council of Scientific and Industrial Research. Reports verify zero sugar syrup, zero heat treatment, and intact natural pollen.",
  },
  {
    icon: "🌿",
    title: "Zero Processing",
    desc: "Our honey is cold-extracted and bottled directly from hive to jar. No pasteurization, no ultra-filtration, no additives, no preservatives. Ever.",
  },
  {
    icon: "🏔️",
    title: "Traceable Origins",
    desc: "Every jar is labeled with its specific forest origin and harvest season — from Swat's mountain meadows to Karak's ancient Sidr trees. No blending. No mystery.",
  },
  {
    icon: "🛡️",
    title: "Rs. 50,000 Purity Guarantee",
    desc: "If any independent lab finds any adulteration in your jar, we refund your full order AND pay you Rs. 50,000. Our confidence is backed by 30 years of reputation.",
  },
  {
    icon: "🚚",
    title: "Nationwide Cash on Delivery",
    desc: "No advance payment ever. We deliver to Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Faisalabad, Multan, Gujrat, and all cities across Pakistan.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Legacy Since 1995",
    desc: "Jungle Gold is backed by Razzaq Pansar Store — a trusted name in authentic herbal and natural wellness products for over 30 years in Gujrat, Punjab, Pakistan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-forest pb-20">
        {/* Hero */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-forest/90 z-0" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex justify-center mb-6">
              <ol className="flex items-center gap-2 text-xs text-cream/50">
                <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
                <li className="text-cream/30">/</li>
                <li className="text-gold font-medium">About Us</li>
              </ol>
            </nav>
            <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-3">Est. 1995 — Gujrat, Pakistan</p>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cream mb-4 sm:mb-6 leading-tight">
              About Jungle Gold
            </h1>
            <p className="text-cream/70 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
              We are Pakistan&apos;s most transparent and certified pure raw honey brand — backed by over
              30 years of trust from Razzaq Pansar Store. Every jar we sell is <strong className="text-gold">PCSIR lab tested</strong>,
              traceable to a specific forest, and guaranteed authentic with a <strong className="text-cream">Rs. 50,000 purity guarantee</strong>.
            </p>
          </div>
        </section>

        {/* Trust Stats */}
        <section className="py-12 px-4" aria-label="Trust Statistics">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRUST_STATS.map((s) => (
              <div
                key={s.label}
                className="glass-card p-4 rounded-xl border border-gold/20 text-center"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gold block">{s.val}</span>
                <span className="text-cream/60 text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 block">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4" aria-label="Our Story">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold text-sm uppercase tracking-[0.25em] mb-3">Our Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">
                From Forest to Your Family
              </h2>
              <div className="w-16 h-px bg-gold/40 mx-auto" />
            </div>
            <div className="glass-card rounded-2xl p-8 sm:p-10 border border-gold/20 space-y-5 text-cream/80 leading-relaxed text-sm sm:text-base">
              <p>
                In <strong className="text-gold">1995</strong>, Razzaq Pansar Store was founded in <strong className="text-cream">Gujrat, Punjab, Pakistan</strong> — a small but fiercely trusted shop supplying authentic herbal remedies, traditional medicines, and natural food products to families across the region.
              </p>
              <p>
                For decades, our customers kept asking one question: <em className="text-gold">&quot;Can you find us real, pure honey — the kind that doesn&apos;t crystallize because of chemicals, the kind our grandparents used?&quot;</em>
              </p>
              <p>
                So we set out to find it. Our team built direct relationships with traditional beekeepers across Pakistan&apos;s most pristine forest regions — from the wild mountain meadows of <strong className="text-cream">Swat Valley</strong> to the ancient Sidr (Jujube) tree groves of <strong className="text-cream">Karak</strong>, and the glacier-fed meadows of <strong className="text-cream">Kaghan Valley</strong>.
              </p>
              <p>
                Every beekeeping family we work with uses <strong className="text-cream">traditional methods</strong> — no synthetic feed, no antibiotic treatments, no commercial hive management. Bees forage freely from untouched wild flora. Honey is harvested at peak season and cold-extracted without heat.
              </p>
              <p>
                We send every single batch to <strong className="text-gold">PCSIR (Pakistan Council of Scientific and Industrial Research)</strong> for independent laboratory verification. If a batch doesn&apos;t pass, it doesn&apos;t ship. That&apos;s our standard — and it&apos;s non-negotiable.
              </p>
              <p>
                <strong className="text-cream">Jungle Gold</strong> was born from this commitment: pure, raw, verified honey with a Rs. 50,000 purity guarantee and free Cash on Delivery to every corner of Pakistan.
              </p>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-12 px-4" aria-label="Our Values and Commitments">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-3">
                Why Jungle Gold?
              </h2>
              <p className="text-cream/50 text-sm max-w-xl mx-auto">
                Six pillars that make us Pakistan&apos;s most trusted raw honey brand.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map((v) => (
                <article key={v.title} className="glass-card rounded-2xl p-6 border border-gold/15 hover:border-gold/40 transition-all">
                  <span className="text-3xl mb-4 block">{v.icon}</span>
                  <h3 className="font-serif text-lg font-bold text-cream mb-2">{v.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{v.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 text-center" aria-label="Order Now">
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8 border border-gold/20">
            <p className="text-gold font-serif text-xl font-bold mb-2">خالص شہد — براہ راست جنگل سے</p>
            <p className="text-cream/70 text-sm mb-6">Pure Honey — Direct from the Forest</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#products"
                className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-stone-950 font-black px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/30 text-sm"
              >
                🍯 Shop Pure Raw Honey
              </Link>
              <Link
                href="/legacy"
                className="glass-card border border-gold/30 text-cream/80 hover:text-gold hover:border-gold/60 font-medium px-6 py-4 rounded-full text-sm transition-all"
              >
                Our 30-Year Legacy →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
