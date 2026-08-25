"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Award, CheckCircle2, HelpCircle } from "lucide-react";

const HONEY_PRICES_2026 = [
  {
    variety: "100% Pure Raw Wild Forest Honey",
    origin: "Swat Valley, KPK",
    size: "125g / 250g / 500g",
    priceRange: "Rs. 1,000 – Rs. 3,800",
    tasteProfile: "Rich, floral, golden amber",
    purityTest: "PCSIR Certified / 0% Sugar",
  },
  {
    variety: "Original Sidr (Beri) Honey (Small Bee)",
    origin: "Karak & Kohat, KPK",
    size: "125g / 250g / 500g",
    priceRange: "Rs. 1,200 – Rs. 4,500",
    tasteProfile: "Dark caramel, thick, potent medicinal",
    purityTest: "PCSIR Certified / Unheated",
  },
  {
    variety: "Kaghan Alpine Wildflower Honey",
    origin: "Kaghan Valley, KPK",
    size: "250g / 500g",
    priceRange: "Rs. 1,800 – Rs. 3,500",
    tasteProfile: "Light, herbal, crisp floral aroma",
    purityTest: "PCSIR Certified / Cold-extracted",
  },
  {
    variety: "Indus Riverine Acacia Honey",
    origin: "Attock & Punjab Basin",
    size: "250g / 500g",
    priceRange: "Rs. 1,500 – Rs. 3,200",
    tasteProfile: "Sweet, clear golden, slow crystallizing",
    purityTest: "PCSIR Certified / Raw & Unfiltered",
  },
];

const PROVEN_TESTS = [
  {
    title: "1. The Water Dissolve Test",
    desc: "Drop a teaspoon of Jungle Gold honey into a glass of cold water. Pure raw honey sinks straight to the bottom in a lump without dissolving immediately. Fake honey dissolves instantly into the water.",
  },
  {
    title: "2. The Thumb Stickiness Test",
    desc: "Put a drop of raw honey on your thumb. 100% pure honey stays concentrated in a round bead and does not run or spread across your skin like watery adulterated honey.",
  },
  {
    title: "3. Natural Crystallization (Sign of Pure Honey)",
    desc: "Unprocessed honey contains natural glucose that naturally forms soft crystals in cool weather. Commercial honey is heated past 70°C to stop this — destroying live enzymes and vitamins. Pure honey crystallizes naturally.",
  },
  {
    title: "4. PCSIR Laboratory Chemical Report",
    desc: "Jungle Gold honey is independently verified by the Pakistan Council of Scientific & Industrial Research (PCSIR). Reports confirm 0% added sugar syrup, 0% artificial colors, and intact live bee enzymes.",
  },
];

const CITIES = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Peshawar",
  "Faisalabad", "Multan", "Gujrat", "Sialkot", "Hyderabad", "Quetta", "Gujranwala"
];

export default function HoneyInPakistanGuide() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-forest-900/60 relative border-t border-gold/15" id="honey-in-pakistan">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/25 mb-4">
            🇵🇰 The Complete Guide &amp; Price List 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 leading-tight">
            100% Pure Raw Honey in Pakistan
          </h2>
          <p className="text-gold/90 font-serif text-base sm:text-lg italic mb-3">
            پاکستان میں خالص قدرتی شہد — براہ راست جنگل سے
          </p>
          <p className="text-cream/70 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Looking for <strong>original, unadulterated honey in Pakistan</strong>? Jungle Gold delivers laboratory-certified, cold-extracted raw wild forest honey &amp; Sidr (Beri) honey across Pakistan with <strong>Cash on Delivery (COD)</strong> and a <strong>Rs. 50,000 Purity Guarantee</strong>.
          </p>
        </motion.div>

        {/* 3 Core Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="glass-card p-6 rounded-2xl border border-gold/25 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-cream mb-1">PCSIR Lab Certified</h3>
              <p className="text-cream/60 text-xs sm:text-sm leading-relaxed">
                Tested by the Pakistan Council of Scientific &amp; Industrial Research. Zero sugar syrup, zero heating.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gold/25 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-cream mb-1">Rs. 50,000 Guarantee</h3>
              <p className="text-cream/60 text-xs sm:text-sm leading-relaxed">
                If independent lab testing proves any adulteration in our honey, we refund 100% and pay Rs. 50,000.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gold/25 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-cream mb-1">Nationwide COD Delivery</h3>
              <p className="text-cream/60 text-xs sm:text-sm leading-relaxed">
                Fast 2-4 day door-to-door Cash on Delivery to Lahore, Karachi, Islamabad, and every city in Pakistan.
              </p>
            </div>
          </div>
        </div>

        {/* 2026 Honey Price Table in Pakistan (Targeting Google Featured Snippets) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-dark rounded-2xl p-6 sm:p-8 border border-gold/30 mb-14 shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                Pure Honey Price in Pakistan (2026 Rate List)
              </h3>
              <p className="text-cream/60 text-xs sm:text-sm mt-1">
                Verified pure raw honey rates with nationwide delivery options
              </p>
            </div>
            <a
              href="#products"
              className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 text-stone-950 font-black px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
            >
              Order Online (COD) →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-cream/80 border-collapse">
              <thead>
                <tr className="border-b border-gold/20 text-gold font-serif text-xs sm:text-sm uppercase tracking-wider">
                  <th className="py-3 px-3">Honey Variety</th>
                  <th className="py-3 px-3">Harvest Origin</th>
                  <th className="py-3 px-3">Jar Sizes</th>
                  <th className="py-3 px-3">Price (PKR)</th>
                  <th className="py-3 px-3">Lab Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {HONEY_PRICES_2026.map((item) => (
                  <tr key={item.variety} className="hover:bg-gold/5 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-cream">{item.variety}</td>
                    <td className="py-3.5 px-3 text-gold/80">{item.origin}</td>
                    <td className="py-3.5 px-3 text-cream/70">{item.size}</td>
                    <td className="py-3.5 px-3 font-bold text-amber-400">{item.priceRange}</td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-green-400 font-medium bg-green-950/40 px-2 py-0.5 rounded-full border border-green-800/40">
                        <CheckCircle2 size={12} /> {item.purityTest}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* How to test pure honey in Pakistan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 items-center">
          <div>
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">
              Buyer Protection Guide
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-4">
              How to Test Pure Honey at Home in Pakistan
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Over 80% of commercial supermarket honey in Pakistan is heat-pasteurized or adulterated with sugar syrup. Here is how you can verify 100% pure raw honey at home:
            </p>
            <div className="space-y-4">
              {PROVEN_TESTS.map((test) => (
                <div key={test.title} className="glass-card p-4 rounded-xl border border-gold/15">
                  <h4 className="font-serif font-bold text-gold text-sm sm:text-base mb-1">{test.title}</h4>
                  <p className="text-cream/65 text-xs sm:text-sm leading-relaxed">{test.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidr vs Jungle Honey Comparison */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-gold/30">
            <h3 className="font-serif text-2xl font-bold text-cream mb-3">
              Sidr (Beri) Honey vs. Wild Jungle Honey
            </h3>
            <p className="text-cream/70 text-xs sm:text-sm leading-relaxed mb-6">
              Which type of raw honey in Pakistan should you choose?
            </p>

            <div className="space-y-5">
              <div className="border-l-2 border-amber-400 pl-4">
                <h4 className="font-serif font-bold text-gold text-base">Original Sidr (Beri) Honey</h4>
                <p className="text-cream/65 text-xs sm:text-sm mt-1 leading-relaxed">
                  Harvested from ancient Sidr (Jujube) wild trees in Karak and Kohat. Known globally for its unmatched antibacterial, immune-boosting, and digestive healing properties. Rich, thick, and dark amber with a butterscotch finish.
                </p>
              </div>

              <div className="border-l-2 border-emerald-400 pl-4">
                <h4 className="font-serif font-bold text-cream text-base">Wild Jungle Multi-Flower Honey</h4>
                <p className="text-cream/65 text-xs sm:text-sm mt-1 leading-relaxed">
                  Harvested from untouched high-altitude forests of Swat Valley. Bees forage naturally on hundreds of wild medicinal herbs and mountain wildflowers. Rich in live bee pollen, bioflavonoids, and natural enzymes.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href="#products"
                  className="w-full text-center bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-black px-6 py-3 rounded-xl text-sm hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
                >
                  Shop Both Varieties Online
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cities Delivery Coverage */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-gold/20 text-center">
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-2">
            Delivering Pure Honey Across All Major Cities in Pakistan
          </h4>
          <p className="text-cream/60 text-xs sm:text-sm max-w-2xl mx-auto mb-6">
            Get 100% pure raw Sidr &amp; wild honey delivered directly to your doorstep within 2–4 business days via Cash on Delivery (COD).
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {CITIES.map((city) => (
              <span key={city} className="glass-card px-3.5 py-1.5 rounded-full text-xs text-cream/80 border border-gold/20 font-medium">
                📍 {city}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
