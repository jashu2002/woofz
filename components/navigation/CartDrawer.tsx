"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  const freeShippingThreshold = 250;
  const progressToFreeShipping = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-charcoal/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-[101] h-full w-full max-w-md bg-ivory text-charcoal shadow-2xl flex flex-col justify-between border-l border-taupe"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-taupe flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-terracotta" />
                <h3 className="font-serif-display text-2xl tracking-wide">Your Cart ({cartCount})</h3>
              </div>
              <button
                onClick={closeCart}
                className="p-2 -mr-2 text-charcoal hover:text-terracotta transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-6 py-4 bg-sand/40 border-b border-taupe text-xs">
              {remainingForFreeShipping > 0 ? (
                <p className="text-warm-gray">
                  Add <span className="font-medium text-charcoal">{formatPrice(remainingForFreeShipping)}</span> more for complimentary express delivery.
                </p>
              ) : (
                <p className="text-terracotta font-medium tracking-wide uppercase">
                  ✓ You have unlocked complimentary express shipping
                </p>
              )}
              <div className="w-full bg-taupe/40 h-1 mt-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-terracotta h-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-warm-gray py-12">
                  <p className="font-serif-display text-2xl text-charcoal mb-2">Your cart is empty</p>
                  <p className="text-sm font-light mb-8 max-w-xs">
                    Explore our curated collection of architectural dog furniture designed for your home.
                  </p>
                  <button
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase text-charcoal hover:text-terracotta pb-1 border-b border-charcoal"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 pb-6 border-b border-taupe/60">
                    <div className="relative w-20 h-24 bg-sand rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-display text-lg text-charcoal leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="text-warm-gray hover:text-terracotta text-xs transition-colors p-1"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-warm-gray mt-1">
                          Size: {item.size} • Color: {item.color}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-taupe rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-sand transition-colors text-charcoal"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-sand transition-colors text-charcoal"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-serif-display text-base text-charcoal">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 border-t border-taupe bg-sand/20 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-[0.14em] text-warm-gray font-medium">
                    Subtotal
                  </span>
                  <span className="font-serif-display text-2xl text-charcoal">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-[11px] text-warm-gray">
                  Taxes calculated at checkout. Free 30-day trial & home delivery.
                </p>
                <button
                  onClick={() => alert("Checkout flow is simulated in this concept redesign.")}
                  className="w-full py-4 bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium hover:bg-charcoal transition-colors duration-300 flex items-center justify-center gap-3"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-terracotta" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
