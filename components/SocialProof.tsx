"use client";
import { motion } from "framer-motion";
import { Star, BadgeCheck, FlaskConical, Award } from "lucide-react";

const REVIEWS = [
  {
    name: "Asad Mehmood",
    city: "Lahore",
    stars: 5,
    text: "The Skardu Sidr is unlike anything I've tasted. Dense, dark, and incredibly aromatic. Worth every rupee.",
  },
  {
    name: "Fatima Zahra",
    city: "Karachi",
    stars: 5,
    text: "Ordered for my parents. My mother said it reminded her of honey from her village 40 years ago. That's the highest compliment.",
  },
  {
    name: "Dr. Bilal Khan",
    city: "Islamabad",
    stars: 5,
    text: "As someone who tests food quality, I can confirm the purity is real. Crystallized perfectly after two weeks — textbook raw honey.",
  },
];

const TRUST_BADGES = [
  { icon: <BadgeCheck size={24} />, label: "Lab Verified Pure" },
  { icon: <FlaskConical size={24} />, label: "Zero Additives" },
  { icon: <Award size={24} />, label: "Direct from Source" },
];

const IG_POSTS = [
  "/jpegmini_optimized/IMG_0645.jpg",
  "/jpegmini_optimized/IMG_0682.jpg",
  "/jpegmini_optimized/IMG_0655.jpg",
  "/jpegmini_optimized/IMG_0695.jpg",
  "/jpegmini_optimized/IMG_0677.jpg",
  "/jpegmini_optimized/IMG_0720.jpg",
];

export default function SocialProof() {
  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8 mb-12 sm:mb-16 lg:mb-24"
        >
          {TRUST_BADGES.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 sm:gap-3 glass-card px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-5 rounded-full border border-gold/20 text-gold shadow-md"
            >
              <div className="flex-shrink-0">{b.icon}</div>
              <span className="text-cream text-xs sm:text-sm lg:text-base font-medium">{b.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <p className="text-gold text-xs sm:text-sm lg:text-base uppercase tracking-[0.25em] mb-3 lg:mb-4">Real Customers. Real Results.</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-cream mb-4">What They&apos;re Saying</h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </motion.div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-8 mb-14 sm:mb-16 lg:mb-24">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8 border border-gold/10 hover:border-gold/30 transition-colors flex flex-col"
            >
              <div className="flex gap-1 mb-3 lg:mb-4">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={15} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="italic text-cream/75 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 lg:mb-6 flex-1">&ldquo;{r.text.replace(/'/g, "&apos;")}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm flex-shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-cream text-sm lg:text-base font-semibold leading-tight">{r.name}</p>
                  <p className="text-cream/40 text-xs lg:text-sm">{r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <a
            href="https://instagram.com/junglegoldofficials"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-honey transition-colors font-medium text-sm sm:text-base lg:text-lg mb-3 lg:mb-4"
          >
            <span className="text-lg">📸</span>
            @junglegoldofficials
          </a>
          <p className="text-cream/65 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed px-2">
            &ldquo;When you buy from Jungle Gold, you aren&apos;t just buying honey. You&apos;re preserving the ancient craft of our local honey hunters and supporting a community living in harmony with nature.&rdquo;
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 lg:gap-3">
          {IG_POSTS.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/junglegoldofficials"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer border border-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Jungle Gold Instagram post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors duration-300" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
