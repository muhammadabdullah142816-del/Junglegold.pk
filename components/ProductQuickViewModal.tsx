"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  MessageCircle,
  Award
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/database";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({ product, onClose }: ProductQuickViewModalProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add, openDrawer } = useCart();

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : ["/products.jpg"];
  const currentVariant = product.variants?.[selectedVariantIdx] || product.variants?.[0];
  const inStock = currentVariant?.in_stock ?? true;

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923240917740";

  function handleAddToCart() {
    if (!currentVariant || !inStock) return;

    add({
      id: product!.id,
      title: product!.title,
      size: currentVariant.size,
      price: currentVariant.price,
      quantity: quantity,
      image: images[activeImgIdx] || images[0] || "/products.jpg",
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      openDrawer();
    }, 600);
  }

  function handleDirectWhatsApp() {
    if (!currentVariant) return;
    const msg = encodeURIComponent(
      `🍯 *Order Inquiry — Jungle Gold*\n` +
      `Product: ${product!.title}\n` +
      `Size: ${currentVariant.size}\n` +
      `Quantity: ${quantity}\n` +
      `Price: Rs. ${(currentVariant.price * quantity).toLocaleString()}\n\n` +
      `I want to confirm this order via Cash on Delivery!`
    );
    window.open(`https://api.whatsapp.com/send?phone=${wa}&text=${msg}`, "_blank");
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-forest-300 border border-gold/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-cream"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-gold text-cream hover:text-forest transition-all border border-gold/30 shadow-lg"
            aria-label="Close product view"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 p-4 sm:p-8 max-h-[85vh] overflow-y-auto">
            {/* Left: Interactive Media Gallery */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Main Image Stage */}
              <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-black/40 border border-gold/20 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[activeImgIdx]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== "/products.jpg") {
                      target.src = "/products.jpg";
                    }
                  }}
                />
                
                {/* Stock Badge */}
                <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold backdrop-blur-md border ${
                  inStock
                    ? "bg-green-900/90 text-green-300 border-green-500/40"
                    : "bg-red-900/90 text-red-300 border-red-500/40"
                }`}>
                  {inStock ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {inStock ? "In Stock" : "Sold Out"}
                </div>

                {/* Left/Right Carousel Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImgIdx((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-gold text-cream hover:text-forest transition-all shadow-md min-w-[36px] min-h-[36px] flex items-center justify-center"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImgIdx((prev) => (prev + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-gold text-cream hover:text-forest transition-all shadow-md min-w-[36px] min-h-[36px] flex items-center justify-center"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Strip */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        idx === activeImgIdx
                          ? "border-gold shadow-gold-glow scale-105"
                          : "border-gold/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== "/products.jpg") {
                            target.src = "/products.jpg";
                          }
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Purity Guarantee Trust Box */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl glass-card border border-gold/15 text-[11px] sm:text-xs text-cream/75">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="text-gold flex-shrink-0" size={16} />
                  <span>PCSIR Lab Tested</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Truck className="text-gold flex-shrink-0" size={16} />
                  <span>Free COD Nationwide</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Easy Order Configurator */}
            <div className="flex flex-col justify-between gap-6">
              <div>
                {/* Brand Tag */}
                <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-2">
                  <Award size={14} /> Jungle Gold Certified Raw Harvest
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-3">
                  {product.title}
                </h2>

                <p className="text-cream/70 text-sm sm:text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-forest-100/60 border border-gold/20 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cream/50 block mb-0.5">Price</span>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-gold">
                      Rs. {currentVariant ? (currentVariant.price * quantity).toLocaleString() : "---"}
                    </span>
                  </div>
                  {quantity > 1 && (
                    <span className="text-cream/50 text-xs">
                      (Rs. {currentVariant?.price.toLocaleString()} each)
                    </span>
                  )}
                </div>

                {/* Size / Variant Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-6">
                    <label className="text-xs uppercase tracking-wider text-cream/60 font-semibold block mb-3">
                      Select Bottle Size
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {product.variants.map((v, idx) => (
                        <button
                          key={v.id || idx}
                          onClick={() => setSelectedVariantIdx(idx)}
                          disabled={!v.in_stock}
                          className={`p-3 rounded-xl text-center border font-medium transition-all ${
                            idx === selectedVariantIdx
                              ? "bg-gold text-forest border-gold font-bold shadow-gold-glow scale-[1.02]"
                              : v.in_stock
                              ? "border-gold/30 bg-white/5 text-cream/80 hover:border-gold/70"
                              : "border-white/10 text-cream/20 bg-black/20 cursor-not-allowed line-through"
                          }`}
                        >
                          <div className="text-sm font-bold">{v.size}</div>
                          <div className="text-xs opacity-80 mt-0.5">Rs. {v.price.toLocaleString()}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-wider text-cream/60 font-semibold block mb-2">
                    Quantity
                  </label>
                  <div className="inline-flex items-center bg-white/5 border border-gold/20 rounded-xl overflow-hidden p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-gold/20 text-cream rounded-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-gold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg font-bold hover:bg-gold/20 text-cream rounded-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                {/* Add To Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!currentVariant || !inStock}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 text-base transition-all ${
                    inStock
                      ? added
                        ? "bg-green-600 text-white"
                        : "btn-honey-liquid text-forest shadow-lg hover:scale-[1.02]"
                      : "bg-white/10 text-cream/30 cursor-not-allowed"
                  }`}
                >
                  {added ? (
                    <>
                      <CheckCircle size={20} /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} /> Add to Cart — Rs. {(currentVariant ? currentVariant.price * quantity : 0).toLocaleString()}
                    </>
                  )}
                </button>

                {/* Instant 1-Tap WhatsApp Order */}
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm transition-all hover:scale-[1.01] shadow-md shadow-green-950/40"
                >
                  <MessageCircle size={18} />
                  Instant Order via WhatsApp (Cash on Delivery)
                </button>

                <p className="text-center text-cream/40 text-xs flex items-center justify-center gap-1.5 mt-1">
                  <Sparkles size={12} className="text-gold" /> Unpasteurized, 100% Organic & Naturally Filtered
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
