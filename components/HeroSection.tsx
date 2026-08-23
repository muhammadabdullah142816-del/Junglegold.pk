"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Zap, ChevronDown } from "lucide-react";
function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function HeroSection() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923240917740";
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "junglegold.pk";
  const fb = process.env.NEXT_PUBLIC_FACEBOOK_PAGE || "junglegold.pk";

  const defaultWaMsg = encodeURIComponent("Hi Jungle Gold! I want to order 100% pure raw wild honey.");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hex-pattern pt-20 pb-12">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/jpegmini_optimized/IMG_0690.jpg"
          alt="Jungle Gold wild honey jar in nature"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest" />
      </div>

      {/* Floating hex decorations */}
      <div className="absolute top-1/4 left-8 w-24 h-24 rounded-full border border-gold/20 animate-float opacity-30 hidden lg:block" />
      <div className="absolute bottom-1/3 right-12 w-16 h-16 rounded-full border border-gold/15 animate-float opacity-20 hidden lg:block" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

          {/* Scroll Down Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer"
              tabIndex={0}
              aria-label="Scroll to Products"
              onClick={() => {
                const target = document.getElementById('products');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const target = document.getElementById('products');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <ChevronDown size={24} className="text-gold animate-bounce" />
            </motion.div>
        
        {/* Top Fresh Harvest Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm text-gold mb-6 border border-gold/30"
        >
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          Fresh Harvest — Limited Stock Available
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6"
        >
          <span className="gold-shimmer">100% Raw &amp;</span>
          <br />
          <span className="text-cream">Untreated</span>
          <br />
          <span className="text-gold/90">Wild Forest</span>
          <br />
          <span className="text-cream/90">Honey</span>
        </motion.h1>

        {/* Urdu tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="urdu-text text-gold/85 text-base sm:text-lg mb-4"
        >
          خالص شہد — براہ راست جنگل سے
        </motion.p>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-cream/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Cold-extracted from the ancient wild forests of Swat, Karak &amp; Attock.
          Zero heat. Zero additives. Just pure, wild honey the way nature intended.
        </motion.p>

        {/* ⚡ Social Instant Order Banner in Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-3.5 sm:p-5 rounded-2xl border border-gold/30 mb-6 sm:mb-8 max-w-2xl mx-auto shadow-2xl shadow-gold/10"
        >
          <div className="flex items-center justify-center gap-1.5 text-gold text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Zap size={15} className="animate-bounce text-amber-400 flex-shrink-0" />
            <span>Instant 1-Tap Ordering</span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* WhatsApp CTA */}
            <a
              href={`https://api.whatsapp.com/send?phone=${wa}&text=${defaultWaMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-green-900/30"
            >
              <MessageCircle size={17} className="flex-shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>

            {/* Instagram CTA */}
            <a
              href={`https://ig.me/m/${ig}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-pink-900/30"
            >
              <InstagramIcon size={17} className="flex-shrink-0" />
              <span className="truncate">Instagram</span>
            </a>

            {/* Facebook CTA */}
            <a
              href={`https://m.me/${fb}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-900/30"
            >
              <FacebookIcon size={17} className="flex-shrink-0" />
              <span className="truncate">Messenger</span>
            </a>
          </div>
        </motion.div>

        {/* Catalog CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-sm sm:max-w-none mx-auto"
        >
          <a
            href="#products"
            className="w-full sm:w-auto btn-honey-liquid text-forest font-bold px-7 py-3.5 sm:py-4 rounded-full text-base sm:text-lg hover:scale-105 active:scale-95 transition-all text-center"
          >
            🍯 Explore Products
          </a>
          <a
            href="#story"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-card border border-gold/30 text-cream/80 hover:text-gold hover:border-gold/60 font-medium px-6 py-3.5 sm:py-4 rounded-full text-sm transition-all text-center"
          >
            Our Story →
          </a>
        </motion.div>

        {/* Trust stats: 2x2 grid on mobile, row on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-lg md:max-w-none mx-auto text-center"
        >
          {[
            { val: "100%", label: "Raw & Unfiltered" },
            { val: "8+", label: "Forest Origins" },
            { val: "Rs.50K", label: "Purity Guarantee" },
            { val: "0", label: "Additives or Heat" },
          ].map((s) => (
            <div key={s.label} className="glass-card sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-white/5 sm:border-0 flex flex-col gap-0.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">{s.val}</span>
              <span className="text-cream/60 text-[10px] sm:text-xs uppercase tracking-wider font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest to-transparent" />
    </section>
  );
}
