"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "@/lib/cart";

interface StickyProductBarProps {
  product: Product;
  selectedSize: { code: string; label: string; dimensions: string; priceMultiplier: number };
  selectedColor: { code: string; name: string; hex: string };
  finalPrice: number;
}

export function StickyProductBar({
  product,
  selectedSize,
  selectedColor,
  finalPrice,
}: StickyProductBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    setIsAdded(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.images.primary,
      size: selectedSize.code,
      color: selectedColor.name,
    });
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-taupe p-4 shadow-xl"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left Product Metadata */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 bg-sand rounded-sm overflow-hidden hidden sm:block">
                <img src={product.images.primary} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif-display text-lg text-charcoal leading-tight">{product.name}</h4>
                <p className="text-xs text-warm-gray">
                  Size: {selectedSize.label} • Color: {selectedColor.name}
                </p>
              </div>
            </div>

            {/* Right Price & Add CTA */}
            <div className="flex items-center gap-6">
              <span className="font-serif-display text-xl text-charcoal hidden sm:inline">
                {formatPrice(finalPrice)}
              </span>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAdd}
                className="px-6 py-3.5 bg-espresso text-ivory text-xs uppercase tracking-[0.16em] font-medium hover:bg-charcoal transition-colors flex items-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-terracotta" />
                    <span>ADDED TO CART</span>
                  </>
                ) : (
                  <>
                    <span>ADD — {formatPrice(finalPrice)}</span>
                    <ArrowRight className="w-4 h-4 text-terracotta" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
