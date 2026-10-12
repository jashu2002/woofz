"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuLinks = [
    { label: "SHOP COLLECTION", href: "/shop" },
    { label: "OUR PHILOSOPHY", href: "/about" },
    { label: "THE JOURNAL", href: "/journal" },
  ];

  const containerVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at 90% 40px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 90% 40px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30, filter: "blur(4px)" },
    open: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={containerVariants}
          className="fixed inset-0 z-[90] bg-espresso text-ivory flex flex-col justify-between p-8 md:p-12 overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center border-b border-warm-gray/30 pb-6">
            <span className="font-serif-display text-2xl tracking-widest text-ivory">WOofe</span>
            <button
              onClick={onClose}
              className="p-2 text-ivory hover:text-terracotta transition-colors"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-8 my-auto">
            <span className="text-[11px] uppercase tracking-[0.2em] text-terracotta font-medium">
              NAVIGATION
            </span>

            {menuLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between font-serif-display text-3xl sm:text-4xl text-ivory hover:text-sand transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-6 h-6 text-terracotta opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Footer Info */}
          <div className="border-t border-warm-gray/30 pt-6 space-y-4 text-xs text-taupe/80 font-light">
            <div className="flex justify-between">
              <span>DESIGNED FOR THE HOME</span>
              <span>COPENHAGEN / AMSTERDAM</span>
            </div>
            <p className="text-[11px] text-warm-gray">
              Unofficial Concept Redesign for WOofe.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
