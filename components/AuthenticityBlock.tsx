"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Thermometer, Droplets, Shield, QrCode } from "lucide-react";
import HoneyQRCode from "./HoneyQRCode";

const ORIGINS = [
  // ── KPK ──
  {
    name: 'Swat Valley',
    region: 'KPK',
    desc: 'Wild mountain forests at 1,000–2,000m. Bees harvest from untouched wildflower meadows and ancient Sidr trees.',
    emoji: '🏔️',
  },
  {
    name: 'Karak',
    region: 'KPK',
    desc: 'Heartland of prized Sidr (Beri) honey. Jujube trees bloom in winter, yielding thick, dark, rare honey.',
    emoji: '🌿',
  },
  {
    name: 'Kohat',
    region: 'KPK',
    desc: 'Rocky foothills with wild acacia and seasonal wildflowers — a uniquely aromatic multi-floral honey.',
    emoji: '🪨',
  },
  {
    name: 'Kaghan Valley',
    region: 'KPK',
    desc: 'Glacier-fed alpine meadows. Short harvest window concentrates intense flavour from high-altitude wildflowers.',
    emoji: '🏕️',
  },
  {
    name: 'Dir & Chitral',
    region: 'KPK',
    desc: 'Remote high passes rich in wild thyme and acacia — a stronghold of traditional beekeeping for centuries.',
    emoji: '🌲',
  },
  // ── Punjab ──
  {
    name: 'Attock',
    region: 'Punjab',
    desc: 'Indus riverine belt where bees thrive on acacia, mustard, and seasonal wildflowers year-round.',
    emoji: '🌊',
  },
  {
    name: 'Rawalpindi Hills',
    region: 'Punjab',
    desc: 'Forested hillsides with diverse seasonal flora. Light, fragrant multi-floral honey harvested twice yearly.',
    emoji: '🌳',
  },
  {
    name: 'Changa Manga',
    region: 'Punjab',
    desc: "Pakistan's largest planted forest. Rich flora produces a light, distinctively floral honey loved for daily use.",
    emoji: '🍃',
  },
];

function CrystallizationModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-dark rounded-2xl p-8 max-w-lg w-full border border-gold/30 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-cream/40 hover:text-gold transition-colors">
          <X size={20} />
        </button>

        <div className="mb-4">
          <Image
            src="/crystallization.jpg"
            alt="Raw honey crystallizing naturally"
            width={460}
            height={220}
            className="w-full h-44 object-cover rounded-xl mb-5"
          />
        </div>

        <h3 className="font-serif text-2xl font-bold text-cream mb-2">
          Why Does Our Honey Crystallize?
        </h3>
        <p className="text-gold text-sm mb-5 italic">This is a <strong>sign of purity</strong>, not a defect.</p>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="p-2 bg-gold/10 rounded-lg flex-shrink-0"><Shield size={18} className="text-gold" /></div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Raw honey contains natural glucose that forms crystals over time. Processed honey is heated to prevent this — which destroys enzymes, antioxidants, and flavour.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="p-2 bg-gold/10 rounded-lg flex-shrink-0"><Thermometer size={18} className="text-gold" /></div>
            <p className="text-cream/70 text-sm leading-relaxed">
              <strong className="text-cream">To reliquefy:</strong> Place the jar in warm water (not hot, max 40°C) for 15–20 minutes. Stir gently. Never microwave — it destroys the goodness.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="p-2 bg-gold/10 rounded-lg flex-shrink-0"><Droplets size={18} className="text-gold" /></div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Crystallized honey is equally nutritious. Many customers prefer it — it spreads like butter and has a deeper, richer flavour.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AuthenticityBlock() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 hex-pattern relative">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">Where the Honey Comes From</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-4">
              Rooted in the Wild
            </h2>
            <div className="gold-divider max-w-xs mx-auto mb-6" />
            <p className="text-cream/50 max-w-xl mx-auto text-sm leading-relaxed">
              Every jar of Jungle Gold is traceable to a specific forest and harvest season.
              No blending. No mixing origins.
            </p>
          </motion.div>

          {/* Two-column: image + featured origins */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 shadow-2xl"
            >
              <Image
                src="/harvest.jpg"
                alt="Wild honey harvest in Swat Valley Pakistan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                <p className="font-serif text-base sm:text-lg font-bold text-cream">Traditional Wild Harvest</p>
                <p className="text-cream/70 text-xs sm:text-sm">Swat · Karak · Kohat · Kaghan · Attock · Changa Manga</p>
              </div>
            </motion.div>

            <div className="flex flex-col gap-3 sm:gap-4">
              {ORIGINS.slice(0, 4).map((o, i) => (
                <motion.div
                  key={o.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card rounded-xl p-4 sm:p-5 flex gap-3.5 sm:gap-4 hover:border-gold/40 transition-colors border border-transparent"
                >
                  <span className="text-2xl sm:text-3xl flex-shrink-0">{o.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-cream">{o.name}</h3>
                      <div className="flex items-center gap-1 text-gold/70 text-[11px] sm:text-xs font-semibold">
                        <MapPin size={10} />
                        {o.region}
                      </div>
                    </div>
                    <p className="text-cream/60 text-xs sm:text-sm leading-relaxed">{o.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ALL honey-rich regions grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 sm:mb-16"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream text-center mb-2">
              Honey-Rich Wild Terrains
            </h3>
            <p className="text-cream/50 text-xs sm:text-sm text-center mb-6 sm:mb-8">
              Pristine harvest zones in Khyber Pakhtunkhwa &amp; Punjab
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {ORIGINS.map((o, i) => (
                <motion.div
                  key={o.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-xl p-4 hover:border-gold/40 border border-transparent transition-all hover:bg-gold/5 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{o.emoji}</span>
                    <div>
                      <p className="font-serif font-bold text-cream text-sm">{o.name}</p>
                      <span className="text-gold/60 text-[11px] flex items-center gap-0.5">
                        <MapPin size={9} />
                        {o.region}
                      </span>
                    </div>
                  </div>
                  <p className="text-cream/55 text-xs leading-relaxed group-hover:text-cream/70 transition-colors">
                    {o.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Purity guarantee banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="honey-drip glass-card-dark rounded-2xl p-6 sm:p-8 text-center border border-gold/20 mb-10 sm:mb-12"
          >
            <p className="font-serif text-2xl sm:text-4xl font-bold text-gold mb-2 sm:mb-3">
              Rs. 50,000 Purity Guarantee
            </p>
            <p className="text-cream/70 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed mb-3">
              We guarantee every jar is 100% pure. If independent lab testing finds any adulteration,
              we will refund your entire order plus pay Rs. 50,000.
            </p>
            <p className="text-gold/85 text-xs tracking-wide font-medium">
              🌿 Backed by the legacy &amp; trust of Razzaq Pansar Store.
            </p>
          </motion.div>

          {/* QR Code + Crystallization row */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-center">
            {/* Honey-Themed QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-gold/20 text-center w-full max-w-xs sm:max-w-none"
            >
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <QrCode size={16} className="text-gold" />
                <span className="text-gold text-xs uppercase tracking-[0.2em] font-medium">Watch Us Harvest</span>
              </div>
              <div className="flex justify-center mb-3">
                <HoneyQRCode size={180} className="sm:hidden" />
                <HoneyQRCode size={200} className="hidden sm:inline-block" />
              </div>
              <p className="text-cream font-serif text-sm font-semibold mb-1">See the Wild Harvest</p>
              <p className="text-cream/60 text-xs max-w-[210px] mx-auto leading-relaxed mb-3">
                Scan to watch real footage of our beekeepers harvesting wild honey from untouched forests.
              </p>
              {/* Decoded URL shown beneath the QR */}
              <a
                href="https://drive.google.com/drive/folders/1GgXT6_BaX3922L_Qw5qpzl5A1Rvk6ghs?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold/80 hover:text-gold transition-colors text-[11px] underline underline-offset-2 leading-snug max-w-[220px] mx-auto"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                drive.google.com/harvesting-videos
              </a>
            </motion.div>

            {/* Crystallization trigger */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-cream/50 text-xs sm:text-sm mb-3">Noticed your honey crystallizing?</p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/10 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-95"
              >
                🔬 Learn About Natural Crystallization
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {modalOpen && <CrystallizationModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
