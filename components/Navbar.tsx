"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count, drawerOpen, openDrawer, closeDrawer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/#products", label: "Products", icon: "🍯" },
    { href: "/#story", label: "Our Story", icon: "🌿" },
    { href: "/legacy", label: "Legacy", icon: "📜" },
    { href: "/team", label: "Our Team", icon: "👥" },
    { href: "/#reviews", label: "Reviews", icon: "⭐" },
    { href: "/#contact", label: "Contact", icon: "📍" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-dark border-b border-gold/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand-logo.png"
              alt="Jungle Gold Raw Wild Forest Honey Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-contain transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
            />
            <div className="leading-tight">
              <div className="font-serif text-lg sm:text-xl font-bold text-gold tracking-wide">Jungle Gold</div>
              <div className="text-cream/50 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase">Raw Wild Honey</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-cream/75 hover:text-gold text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile menu trigger */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => openDrawer()}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-cream/80 hover:text-gold transition-colors rounded-xl hover:bg-white/5 active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute top-1 right-1 bg-gold text-forest text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-gold-glow">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-cream/80 hover:text-gold transition-colors rounded-xl hover:bg-white/5 active:scale-95"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu with backdrop */}
        {menuOpen && (
          <div className="md:hidden border-t border-gold/15 bg-forest-200/98 backdrop-blur-xl px-4 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 mb-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-cream/85 hover:text-gold hover:bg-white/5 text-base font-medium transition-all"
                >
                  <span className="text-lg">{l.icon}</span>
                  <span>{l.label}</span>
                </Link>
              ))}
            </div>

            {/* Quick WhatsApp Action inside Mobile Menu */}
            <a
              href="https://wa.me/923240917740?text=Hi%20Jungle%20Gold!%20I%20want%20to%20order%20pure%20raw%20honey."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-950/40 transition-all"
            >
              <span>💬 Order via WhatsApp</span>
            </a>
          </div>
        )}
      </nav>

      <CartDrawer open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
