"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HoneyJarFillingAnimation() {
  const [fillKey, setFillKey] = useState(0);

  return (
    <div
      onClick={() => setFillKey((prev) => prev + 1)}
      className="relative flex flex-col items-center justify-center cursor-pointer group select-none py-4"
      title="Click to replay honey fill!"
    >
      <svg
        width="180"
        height="220"
        viewBox="0 0 180 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_10px_25px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300"
      >
        <defs>
          {/* Glass Jar Outline Clip Path */}
          <clipPath id="jar-inner-clip">
            <path d="M 38 65 L 142 65 C 150 65 154 75 154 85 L 154 185 C 154 198 142 208 126 208 L 54 208 C 38 208 26 198 26 185 L 26 85 C 26 75 30 65 38 65 Z" />
          </clipPath>

          {/* Liquid Honey Gradients */}
          <linearGradient id="honey-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="40%" stopColor="#E8A020" />
            <stop offset="85%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9C7B25" />
          </linearGradient>

          <linearGradient id="honey-stream-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E8A020" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="lid-wood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A5228" />
            <stop offset="50%" stopColor="#5C3D1E" />
            <stop offset="100%" stopColor="#3E2A15" />
          </linearGradient>
        </defs>

        {/* Honey Dipper Stick above the Jar */}
        <g className="animate-pulse">
          <rect x="85" y="0" width="10" height="25" rx="3" fill="url(#lid-wood)" />
          {/* Dipper Ribs */}
          <ellipse cx="90" cy="12" rx="12" ry="3" fill="#D4AF37" />
          <ellipse cx="90" cy="18" rx="10" ry="2.5" fill="#E8A020" />
        </g>

        {/* Smooth Honey Stream Pouring Down */}
        <motion.rect
          x="87"
          y="20"
          width="6"
          height="160"
          rx="3"
          fill="url(#honey-stream-grad)"
          initial={{ opacity: 0.2, scaleY: 0.5 }}
          animate={{ opacity: [0.7, 1, 0.7], scaleY: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Falling Honey Droplets */}
        <circle cx="90" cy="40" r="3" fill="#F5D061" className="animate-ping opacity-75" />
        <circle cx="90" cy="55" r="2.5" fill="#E8A020" />

        {/* Jar Glass Outer Shadow & Background */}
        <path
          d="M 38 65 L 142 65 C 150 65 154 75 154 85 L 154 185 C 154 198 142 208 126 208 L 54 208 C 38 208 26 198 26 185 L 26 85 C 26 75 30 65 38 65 Z"
          fill="rgba(15, 45, 31, 0.45)"
          stroke="rgba(212, 175, 55, 0.3)"
          strokeWidth="2"
        />

        {/* Smooth Honey Filling Layer inside Jar */}
        <g clipPath="url(#jar-inner-clip)">
          <motion.g
            key={fillKey}
            initial={{ y: 140 }}
            animate={{ y: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            {/* Animated Liquid Surface Waves */}
            <motion.path
              d="M 10 20 Q 50 10, 90 20 T 170 20 L 170 160 L 10 160 Z"
              fill="url(#honey-gradient)"
              animate={{
                d: [
                  "M 10 20 Q 50 10, 90 20 T 170 20 L 170 160 L 10 160 Z",
                  "M 10 15 Q 50 25, 90 15 T 170 15 L 170 160 L 10 160 Z",
                  "M 10 20 Q 50 10, 90 20 T 170 20 L 170 160 L 10 160 Z",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Honey Bubble Effects */}
            <circle cx="50" cy="50" r="3" fill="rgba(255,255,255,0.4)" />
            <circle cx="120" cy="70" r="4" fill="rgba(255,255,255,0.3)" />
            <circle cx="70" cy="110" r="5" fill="rgba(255,255,255,0.2)" />
          </motion.g>
        </g>

        {/* Jar Glass Highlights & Outline Frame */}
        <path
          d="M 38 65 L 142 65 C 150 65 154 75 154 85 L 154 185 C 154 198 142 208 126 208 L 54 208 C 38 208 26 198 26 185 L 26 85 C 26 75 30 65 38 65 Z"
          fill="none"
          stroke="rgba(212, 175, 55, 0.6)"
          strokeWidth="3"
        />

        {/* Left Side Glass Reflection Line */}
        <path
          d="M 36 78 Q 33 130 36 180"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Wooden Jar Lid & Neck Ribbons */}
        <rect x="32" y="48" width="116" height="18" rx="5" fill="url(#lid-wood)" stroke="#D4AF37" strokeWidth="1.5" />
        <rect x="36" y="61" width="108" height="6" fill="#3E2A15" />
        {/* Twine String tied on Lid */}
        <path d="M 34 57 Q 90 62 146 57" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" />

        {/* Brand Emblem Seal on Jar */}
        <g transform="translate(90, 135)">
          <circle r="22" fill="rgba(15, 45, 31, 0.85)" stroke="#D4AF37" strokeWidth="1.5" />
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            fill="#D4AF37"
            fontSize="7"
            fontWeight="bold"
            letterSpacing="1"
          >
            JUNGLE
          </text>
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#FDF6E3"
            fontSize="8"
            fontWeight="bold"
            letterSpacing="1.5"
          >
            GOLD
          </text>
          <path d="M -10 11 L 10 11" stroke="#D4AF37" strokeWidth="0.8" />
        </g>
      </svg>

      <span className="mt-2 text-gold/60 text-xs font-semibold tracking-widest uppercase flex items-center gap-1 group-hover:text-gold transition-colors">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        100% Pure Raw Honey
      </span>
    </div>
  );
}
