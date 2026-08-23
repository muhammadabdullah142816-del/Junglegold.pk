"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [fillDone, setFillDone] = useState(false);

  useEffect(() => {
    // After 2.2s trigger fill complete
    const fillTimer = setTimeout(() => setFillDone(true), 2200);
    // After 3s hide the splash entirely
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(fillTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#000000" }}
        >
          {/* Central jar + brand lock-up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* ─── SVG Honey Jar ─── */}
            <svg
              width="160"
              height="200"
              viewBox="0 0 180 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(0 12px 32px rgba(212,175,55,0.5))" }}
            >
              <defs>
                {/* Clip the honey inside jar walls */}
                <clipPath id="splash-jar-clip">
                  <path d="M 38 65 L 142 65 C 150 65 154 75 154 85 L 154 185 C 154 198 142 208 126 208 L 54 208 C 38 208 26 198 26 185 L 26 85 C 26 75 30 65 38 65 Z" />
                </clipPath>

                <linearGradient id="sp-honey" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5D061" />
                  <stop offset="50%" stopColor="#E8A020" />
                  <stop offset="100%" stopColor="#9C7B25" />
                </linearGradient>

                <linearGradient id="sp-stream" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#E8A020" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="sp-lid" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7A5228" />
                  <stop offset="50%" stopColor="#5C3D1E" />
                  <stop offset="100%" stopColor="#3E2A15" />
                </linearGradient>
              </defs>

              {/* Dipper rod above lid */}
              <rect x="86" y="2" width="8" height="22" rx="3" fill="url(#sp-lid)" />
              {/* Dipper ribs */}
              <ellipse cx="90" cy="10" rx="11" ry="2.5" fill="#D4AF37" opacity="0.9" />
              <ellipse cx="90" cy="17" rx="9" ry="2" fill="#E8A020" opacity="0.8" />

              {/* Honey stream pouring */}
              <motion.rect
                x="88" y="22" width="5" height="55"
                rx="2.5"
                fill="url(#sp-stream)"
                initial={{ scaleY: 0, opacity: 0, originY: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{ transformOrigin: "top" }}
              />

              {/* Drip droplet */}
              <motion.ellipse
                cx="90" cy="80" rx="4" ry="5"
                fill="#F5D061"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: 0.3, repeat: 3 }}
              />

              {/* Jar glass background */}
              <path
                d="M 38 65 L 142 65 C 150 65 154 75 154 85 L 154 185 C 154 198 142 208 126 208 L 54 208 C 38 208 26 198 26 185 L 26 85 C 26 75 30 65 38 65 Z"
                fill="rgba(15,45,31,0.35)"
              />

              {/* Honey filling up — clips to jar shape */}
              <g clipPath="url(#splash-jar-clip)">
                {/* Rising honey block — starts at bottom, rises up */}
                <motion.g
                  initial={{ y: 150 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2, delay: 0.3, ease: [0.2, 0.8, 0.4, 1] }}
                >
                  {/* Wavy honey surface */}
                  <motion.path
                    d="M 10 22 Q 50 12 90 22 T 170 22 L 170 160 L 10 160 Z"
                    fill="url(#sp-honey)"
                    animate={{
                      d: [
                        "M 10 22 Q 50 12 90 22 T 170 22 L 170 160 L 10 160 Z",
                        "M 10 16 Q 50 26 90 16 T 170 16 L 170 160 L 10 160 Z",
                        "M 10 22 Q 50 12 90 22 T 170 22 L 170 160 L 10 160 Z",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Honey shine gloss overlay */}
                  <rect x="10" y="22" width="160" height="30" fill="rgba(255,255,255,0.06)" />
                  {/* Bubbles */}
                  <motion.circle cx="55" cy="55" r="4" fill="rgba(255,255,255,0.35)"
                    animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.circle cx="115" cy="80" r="3" fill="rgba(255,255,255,0.25)"
                    animate={{ y: [5, -5, 5] }} transition={{ duration: 2.5, repeat: Infinity }} />
                  <motion.circle cx="75" cy="120" r="5" fill="rgba(255,255,255,0.2)"
                    animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity }} />
                </motion.g>
              </g>

              {/* Jar glass frame */}
              <path
                d="M 38 65 L 142 65 C 150 65 154 75 154 85 L 154 185 C 154 198 142 208 126 208 L 54 208 C 38 208 26 198 26 185 L 26 85 C 26 75 30 65 38 65 Z"
                fill="none"
                stroke="rgba(212,175,55,0.7)"
                strokeWidth="2.5"
              />

              {/* Left glass reflection */}
              <path d="M 36 80 Q 33 132 36 178" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />

              {/* Wooden lid */}
              <rect x="32" y="48" width="116" height="18" rx="5" fill="url(#sp-lid)" stroke="#D4AF37" strokeWidth="1.5" />
              <rect x="36" y="61" width="108" height="5" fill="#3E2A15" />
              <path d="M 34 57 Q 90 62 146 57" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Brand seal */}
              <circle cx="90" cy="140" r="23" fill="rgba(0,0,0,0.75)" stroke="#D4AF37" strokeWidth="1.5" />
              <text x="90" y="135" textAnchor="middle" fill="#D4AF37" fontSize="7" fontWeight="bold" letterSpacing="1.5">JUNGLE</text>
              <text x="90" y="147" textAnchor="middle" fill="#FDF6E3" fontSize="8.5" fontWeight="bold" letterSpacing="2">GOLD</text>
              <path d="M 78 152 L 102 152" stroke="#D4AF37" strokeWidth="0.8" />
            </svg>

            {/* Brand name & tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p
                className="text-3xl font-bold tracking-[0.3em] uppercase"
                style={{
                  background: "linear-gradient(90deg, #D4AF37 0%, #F5E9A3 40%, #E8A020 70%, #D4AF37 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 2.5s linear infinite",
                  fontFamily: "Georgia, serif",
                }}
              >
                Jungle Gold
              </p>
              <p className="text-xs tracking-[0.4em] uppercase mt-1" style={{ color: "rgba(212,175,55,0.6)" }}>
                100% Pure Wild Honey
              </p>
            </motion.div>

            {/* Fill-complete glow burst */}
            <AnimatePresence>
              {fillDone && (
                <motion.div
                  key="glow"
                  initial={{ scale: 0.5, opacity: 0.9 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 120,
                    height: 120,
                    background: "radial-gradient(circle, rgba(232,160,32,0.5) 0%, transparent 70%)",
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
