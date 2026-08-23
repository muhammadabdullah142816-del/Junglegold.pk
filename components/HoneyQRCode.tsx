"use client";
import Image from "next/image";

interface HoneyQRCodeProps {
  size?: number;
  className?: string;
}

// Uses the original uploaded QR PNG directly — zero re-rendering, guaranteed scannable.
// All honey theming is pure CSS wrapper only.
export default function HoneyQRCode({ size = 220, className = "" }: HoneyQRCodeProps) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Honey gradient outer ring */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #F5A623 0%, #C8860A 55%, #7A4A00 100%)",
          padding: "4px",
          boxShadow:
            "0 0 0 1px rgba(200,134,10,0.3), 0 0 24px rgba(200,134,10,0.45), 0 6px 32px rgba(0,0,0,0.5)",
          borderRadius: "16px",
        }}
      >
        {/* Warm inner background */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: "#FFF8E8",
            borderRadius: "12px",
            padding: "8px",
          }}
        >
          {/* Original QR PNG — untouched pixel data, always scannable */}
          <Image
            src="/qr-original.png"
            alt="Scan to watch wild honey harvesting videos"
            width={size - 32}
            height={size - 32}
            style={{
              display: "block",
              imageRendering: "pixelated",
            }}
            priority
          />
        </div>
      </div>

      {/* Corner amber glow dots */}
      {(
        [
          { top: "-6px", left: "-6px" },
          { top: "-6px", right: "-6px" },
          { bottom: "-6px", left: "-6px" },
          { bottom: "-6px", right: "-6px" },
        ] as React.CSSProperties[]
      ).map((pos, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            ...pos,
            background: "linear-gradient(135deg, #F5A623, #C8860A)",
            boxShadow: "0 0 8px rgba(245,166,35,0.9)",
          }}
        />
      ))}
    </div>
  );
}
