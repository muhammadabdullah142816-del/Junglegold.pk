"use client";

import { useEffect, useState } from "react";

export default function HoneyBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Ambient Honey Ambient Light Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-gold/10 blur-[130px] animate-float-slow" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-honey/10 blur-[140px] animate-float" />

      {/* Floating Golden Pollen Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-gold to-honey opacity-60 shadow-[0_0_10px_#D4AF37]"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${(i * 8.3 + Math.random() * 5) % 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pollen-float-up ${12 + (i % 5) * 3}s linear infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
