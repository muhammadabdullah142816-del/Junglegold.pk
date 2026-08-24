"use client";
import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, clear, total } = useCart();
  const [checkout, setCheckout] = useState(false);

  function handleClose() {
    setCheckout(false);
    onClose();
  }

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
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md h-[100dvh] max-h-[100dvh] bg-forest-300 border-l border-gold/20 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-5 border-b border-gold/15 bg-forest-400/80">
              <div>
                <h2 className="font-serif text-xl font-bold text-cream">
                  {checkout ? "Checkout" : "Your Cart"}
                </h2>
                <p className="text-cream/40 text-xs">{items.length} item{items.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                {!checkout && items.length > 0 && (
                  <button
                    onClick={clear}
                    className="text-xs text-cream/40 hover:text-red-400 transition-colors px-2 py-1 rounded border border-white/5 hover:border-red-400/30"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-cream/60 hover:text-gold transition-colors rounded-lg"
                  aria-label="Close cart drawer"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* COD Banner */}
            <div className="bg-gold/10 border-b border-gold/20 px-5 py-2.5 flex items-center gap-2 text-xs text-gold font-medium">
              <Truck size={16} className="flex-shrink-0" />
              <span>Cash on Delivery (COD) Available Nationwide Across Pakistan</span>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 overscroll-contain">
              {checkout ? (
                <div className="pb-8">
                  <button
                    onClick={() => setCheckout(false)}
                    className="mb-4 text-xs font-bold text-gold hover:text-honey flex items-center gap-1.5 transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
                  >
                    ← Back to Cart
                  </button>
                  <CheckoutForm onSuccess={handleClose} />
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                  <ShoppingBag size={48} className="text-cream/20" />
                  <p className="text-cream/40">Your cart is empty.</p>
                  <button
                    onClick={handleClose}
                    className="min-h-[48px] text-gold text-sm underline underline-offset-2 font-medium px-4 py-2 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {items.map((item) => (
                    <div key={item.id + item.size} className="relative flex gap-3 p-3 glass-card rounded-xl group border border-gold/15">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black/20">
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
                        <p className="text-cream/40 text-xs mb-1.5 font-medium">{item.size}</p>
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
                              className="w-7 h-7 flex items-center justify-center rounded-md text-cream/70 hover:text-gold hover:bg-white/10 transition-all border border-white/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="text-sm font-bold w-6 text-center text-cream">{item.quantity}</span>
                            <button
                              onClick={() => setQty(item.id, item.size, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md text-cream/70 hover:text-gold hover:bg-white/10 transition-all border border-white/10"
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="text-gold font-bold text-sm">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {/* Remove item button */}
                      <button
                        onClick={() => remove(item.id, item.size)}
                        className="absolute top-2.5 right-2.5 p-1 rounded-full text-cream/30 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                        aria-label={`Remove ${item.title} (${item.size}) from cart`}
                        title="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Fixed Bottom Footer */}
            {!checkout && items.length > 0 && (
              <div className="flex-shrink-0 p-4 sm:p-5 border-t border-gold/20 bg-forest-400/95 backdrop-blur-md space-y-3 z-20 pb-[max(1.25rem,env(safe-area-inset-bottom,1.25rem))]">
                <div className="flex justify-between items-center">
                  <span className="text-cream/60 text-xs sm:text-sm font-medium">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-gold">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={handleClose}
                    className="w-1/3 min-h-[48px] border border-gold/30 hover:border-gold/60 text-cream/80 hover:text-cream font-semibold py-3 rounded-xl transition-all text-xs sm:text-sm cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setCheckout(true)}
                    className="w-2/3 min-h-[48px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-stone-950 font-black text-sm sm:text-base py-3 px-4 rounded-xl shadow-lg shadow-amber-500/40 border border-yellow-200/80 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Checkout →</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
