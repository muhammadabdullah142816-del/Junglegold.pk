"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function StickyMobileBar() {
  const { count, openDrawer, drawerOpen } = useCart();

  if (drawerOpen) return null;

  const handleOrderClick = () => {
    // If cart has items, open cart drawer directly; otherwise navigate/scroll to products
    if (count > 0) {
      openDrawer();
    } else {
      const productsElem = document.getElementById("products");
      if (productsElem) {
        productsElem.scrollIntoView({ behavior: "smooth" });
      } else {
        // We are on another page (e.g. /team or /legacy), redirect to home products section
        window.location.href = "/#products";
      }
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-forest-400/95 border-t border-gold/30 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-2xl backdrop-blur-lg">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-gold font-serif text-sm font-bold leading-tight">Jungle Gold Honey</span>
          <span className="text-cream/70 text-[11px] flex items-center gap-1 font-medium mt-0.5">
            <span>🚚</span> Free COD Nationwide
          </span>
        </div>

        <button
          onClick={handleOrderClick}
          className="flex-1 min-h-[46px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-stone-950 font-black px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/40 border border-yellow-200/80 flex items-center justify-center gap-2 text-sm cursor-pointer transition-all"
        >
          <ShoppingBag size={17} />
          <span>{count > 0 ? `Checkout (${count})` : "Order Now (COD)"}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
