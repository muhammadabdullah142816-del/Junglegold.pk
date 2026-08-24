"use client";
import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, clear, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-lg h-[100dvh] max-h-[100dvh] bg-forest-300 border-l border-gold/20 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-5 border-b border-gold/15 bg-forest-400/90">
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-cream">
                  Your Order &amp; Checkout
                </h2>
                <p className="text-cream/40 text-xs">
                  {items.length === 0 ? "0 items" : `${items.reduce((s, i) => s + i.quantity, 0)} jar(s) in order`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clear}
                    className="text-xs text-cream/40 hover:text-red-400 transition-colors px-2 py-1 rounded border border-white/5 hover:border-red-400/30 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-cream/60 hover:text-gold transition-colors rounded-lg cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Free COD Nationwide Banner */}
            <div className="bg-gold/10 border-b border-gold/20 px-4 sm:px-5 py-2.5 flex items-center gap-2 text-xs text-gold font-medium">
              <Truck size={16} className="flex-shrink-0" />
              <span>🚚 Free Nationwide Cash on Delivery (COD)</span>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 overscroll-contain space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4 text-center py-12">
                  <ShoppingBag size={48} className="text-cream/20" />
                  <p className="text-cream/40">Your cart is empty.</p>
                  <button
                    onClick={onClose}
                    className="min-h-[48px] text-gold text-sm underline underline-offset-2 font-medium px-4 py-2 cursor-pointer"
                  >
                    Explore Pure Honey →
                  </button>
                </div>
              ) : (
                <>
                  {/* Selected Items Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold/80">
                        Selected Products ({items.reduce((s, i) => s + i.quantity, 0)})
                      </span>
                      <span className="text-xs text-cream/40 font-mono">
                        Subtotal: Rs. {total.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {items.map((item) => (
                        <div
                          key={item.id + item.size}
                          className="relative flex gap-3 p-3 glass-card rounded-xl group border border-gold/15 bg-white/[0.02]"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-black/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image || "/products.jpg"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (target.src !== "/products.jpg") {
                                  target.src = "/products.jpg";
                                }
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0 pr-6">
                            <p className="font-serif text-sm font-bold text-cream truncate">{item.title}</p>
                            <p className="text-cream/40 text-xs mb-1 font-medium">{item.size}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    if (item.quantity <= 1) {
                                      remove(item.id, item.size);
                                    } else {
                                      setQty(item.id, item.size, item.quantity - 1);
                                    }
                                  }}
                                  className="w-6 h-6 flex items-center justify-center rounded text-cream/70 hover:text-gold hover:bg-white/10 transition-all border border-white/10"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-xs font-bold w-5 text-center text-cream">{item.quantity}</span>
                                <button
                                  onClick={() => setQty(item.id, item.size, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded text-cream/70 hover:text-gold hover:bg-white/10 transition-all border border-white/10"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <span className="text-gold font-bold text-xs sm:text-sm">
                                Rs. {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {/* Remove item button */}
                          <button
                            onClick={() => remove(item.id, item.size)}
                            className="absolute top-2 right-2 p-1 rounded-full text-cream/30 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                            aria-label={`Remove ${item.title} (${item.size}) from cart`}
                            title="Remove item"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="gold-divider opacity-30" />

                  {/* Direct Delivery & Checkout Form */}
                  <CheckoutForm onSuccess={onClose} />
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
