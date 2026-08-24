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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md h-full h-[100dvh] glass-card-dark border-l border-gold/20 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gold/10">
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
                  className="min-w-[48px] min-h-[48px] p-2 flex items-center justify-center text-cream/60 hover:text-gold transition-colors rounded-lg"
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
            <div className="flex-1 overflow-y-auto p-5">
              {checkout ? (
                <div>
                  <button
                    onClick={() => setCheckout(false)}
                    className="mb-4 text-xs font-semibold text-gold/80 hover:text-gold flex items-center gap-1.5 transition-colors"
                  >
                    ← Back to Cart
                  </button>
                  <CheckoutForm onSuccess={handleClose} />
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-cream/20" />
                  <p className="text-cream/40">Your cart is empty.</p>
                  <button
                    onClick={handleClose}
                    className="min-h-[48px] text-gold text-sm underline underline-offset-2 font-medium px-4 py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.id + item.size} className="relative flex gap-3 p-3 glass-card rounded-xl group">
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
                        <p className="text-cream/40 text-xs mb-2">{item.size}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  remove(item.id, item.size);
                                } else {
                                  setQty(item.id, item.size, item.quantity - 1);
                                }
                              }}
                              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md text-cream/60 hover:text-gold hover:bg-white/10 transition-all border border-white/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => setQty(item.id, item.size, item.quantity + 1)}
                              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md text-cream/60 hover:text-gold hover:bg-white/10 transition-all border border-white/10"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-gold font-bold text-sm">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {/* Cancel / Remove Single Item Button */}
                      <button
                        onClick={() => remove(item.id, item.size)}
                        className="absolute top-2.5 right-2.5 p-1 rounded-full text-cream/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
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

            {/* Footer */}
            {!checkout && items.length > 0 && (
              <div className="p-5 border-t border-gold/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cream/60 text-sm">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-gold">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
                <p className="text-cream/40 text-xs">Cash on Delivery available nationwide.</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleClose}
                    className="w-1/3 min-h-[50px] border border-gold/30 hover:border-gold/60 text-cream/80 hover:text-cream font-semibold py-3 rounded-xl transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setCheckout(true)}
                    className="w-2/3 min-h-[50px] btn-gold-prominent font-extrabold py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                  >
                    Proceed to Checkout →
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
