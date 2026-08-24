"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle, XCircle, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/database";

import ProductSchema from "@/components/schema/ProductSchema";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<string | null>(null);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const { add, openDrawer } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    loadProducts();
  }, []);

  // Initialize selected variants and images
  useEffect(() => {
    if (products.length > 0) {
      setSelectedVariant((prev) => {
        const next = { ...prev };
        products.forEach((p) => { if (next[p.id] === undefined) next[p.id] = 0; });
        return next;
      });
      setSelectedImage((prev) => {
        const next = { ...prev };
        products.forEach((p) => { if (next[p.id] === undefined) next[p.id] = 0; });
        return next;
      });
    }
  }, [products]);

  function handleAdd(e: React.MouseEvent, productId: string) {
    e.stopPropagation();
    const product = products.find((p) => p.id === productId)!;
    const variantIdx = selectedVariant[productId] || 0;
    const variant = product.variants[variantIdx];
    if (!variant || !variant.in_stock) return;

    const imgIdx = selectedImage[productId] || 0;
    const images = product.images?.length > 0 ? product.images : ["/products.jpg"];

    add({
      id: product.id,
      title: product.title,
      size: variant.size,
      price: variant.price,
      quantity: 1,
      image: images[imgIdx] || images[0] || "/products.jpg",
    });

    setAdded(productId + variant.size);
    openDrawer(); // Automatically open the cart drawer
    setTimeout(() => setAdded(null), 2000);
  }

  function nextImage(e: React.MouseEvent, productId: string, length: number) {
    e.stopPropagation();
    setSelectedImage(s => ({ ...s, [productId]: ((s[productId] || 0) + 1) % length }));
  }
  function prevImage(e: React.MouseEvent, productId: string, length: number) {
    e.stopPropagation();
    setSelectedImage(s => ({ ...s, [productId]: ((s[productId] || 0) - 1 + length) % length }));
  }

  return (
    <section id="products" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <ProductSchema products={products} />
      
      {/* Product Full View Modal */}
      {activeModalProduct && (
        <ProductQuickViewModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">Fresh Harvest Collection</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream mb-4">Choose Your Honey</h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => {
            const variantIdx = selectedVariant[product.id] || 0;
            const variant = product.variants?.[variantIdx];
            const justAdded = added === (product.id + (variant?.size || ""));
            const images = product.images?.length > 0 ? product.images : ["/products.jpg"];
            const imgIdx = selectedImage[product.id] || 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                onClick={() => setActiveModalProduct(product)}
                className="glass-card rounded-2xl overflow-hidden product-card-hover group flex flex-col cursor-pointer border border-gold/20 hover:border-gold/60"
              >
                {/* Image Gallery */}
                <div className="relative h-64 overflow-hidden bg-black/20 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[imgIdx]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== "/products.jpg") {
                        target.src = "/products.jpg";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-80" />
                  
                  {/* View Details Hover/Tap Badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] pointer-events-none">
                    <span className="flex items-center gap-2 bg-gold/95 text-forest font-bold px-4 py-2 rounded-full text-xs shadow-lg uppercase tracking-wider">
                      <Eye size={16} /> View Details
                    </span>
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => prevImage(e, product.id, images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-gold text-white hover:text-forest rounded-full p-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-10 min-w-[36px] min-h-[36px] flex items-center justify-center"
                        aria-label="Previous product image"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={(e) => nextImage(e, product.id, images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-gold text-white hover:text-forest rounded-full p-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-10 min-w-[36px] min-h-[36px] flex items-center justify-center"
                        aria-label="Next product image"
                      >
                        <ChevronRight size={18} />
                      </button>
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {images.map((_, dotIdx) => (
                          <div key={dotIdx} className={`h-1.5 rounded-full transition-all ${dotIdx === imgIdx ? "bg-gold w-4" : "bg-white/50 w-1.5"}`} />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {variant && (
                    <div className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md z-10 ${variant.in_stock ? "bg-green-900/80 text-green-300 border border-green-500/30" : "bg-red-900/80 text-red-300 border border-red-500/30"}`}>
                      {variant.in_stock ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {variant.in_stock ? "In Stock" : "Sold Out"}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-cream mb-2 group-hover:text-gold transition-colors">{product.title}</h3>
                    <p className="text-cream/60 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                  </div>

                  {/* Size selector */}
                  {product.variants && product.variants.length > 0 && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <p className="text-cream/40 text-xs uppercase tracking-wider mb-2">Select Size</p>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((v, idx) => (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariant((s) => ({ ...s, [product.id]: idx }))}
                            disabled={!v.in_stock}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
                              ${idx === variantIdx
                                ? "bg-gold text-forest border-gold font-bold shadow-gold-glow"
                                : v.in_stock
                                ? "border-gold/30 text-cream/70 hover:border-gold/60 hover:text-cream"
                                : "border-white/10 text-cream/20 cursor-not-allowed line-through bg-black/20"
                              }`}
                          >
                            {v.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div>
                      <span className="text-gold font-serif text-2xl font-bold">
                        Rs. {variant ? variant.price.toLocaleString() : "---"}
                      </span>
                      <span className="text-cream/30 text-xs ml-1">/ {variant ? variant.size : ""}</span>
                    </div>
                    <button
                      onClick={(e) => handleAdd(e, product.id)}
                      disabled={!variant || !variant.in_stock}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 cursor-pointer shadow-lg
                        ${(variant && variant.in_stock)
                          ? justAdded
                            ? "bg-green-600 text-white scale-95"
                            : "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-400 text-stone-950 shadow-amber-500/30 border border-yellow-200/80 hover:scale-105"
                          : "bg-white/5 text-cream/20 cursor-not-allowed"
                        }`}
                    >
                      {justAdded ? <><CheckCircle size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
