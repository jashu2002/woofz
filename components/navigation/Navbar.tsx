"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isScrolled
            ? "bg-ivory/90 backdrop-blur-md border-b border-taupe/60 py-4 shadow-sm"
            : "bg-transparent py-6 md:py-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif-display text-2xl md:text-3xl tracking-widest text-charcoal hover:text-terracotta transition-colors duration-300"
          >
            WOofe
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.18em] font-medium text-charcoal hover:text-terracotta hover-underline-link transition-colors"
            >
              SHOP
            </Link>
            <Link
              href="/journal"
              className="text-xs uppercase tracking-[0.18em] font-medium text-charcoal hover:text-terracotta hover-underline-link transition-colors"
            >
              JOURNAL
            </Link>
            <Link
              href="/about"
              className="text-xs uppercase tracking-[0.18em] font-medium text-charcoal hover:text-terracotta hover-underline-link transition-colors"
            >
              ABOUT
            </Link>
          </nav>

          {/* Right Actions: Cart & Mobile Menu Toggle */}
          <div className="flex items-center space-x-6">
            <button
              onClick={openCart}
              className="group flex items-center space-x-2 text-xs uppercase tracking-[0.18em] font-medium text-charcoal hover:text-terracotta transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-charcoal group-hover:text-terracotta transition-colors" />
              <span>CART ({cartCount})</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center space-x-2 text-xs uppercase tracking-[0.18em] font-medium text-charcoal p-1"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
