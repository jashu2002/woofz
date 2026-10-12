"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export function Footer() {
  return (
    <footer className="bg-espresso text-ivory pt-24 pb-12 border-t border-warm-gray/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        {/* Large Statement Banner */}
        <div className="pb-16 border-b border-warm-gray/20 text-center md:text-left">
          <FadeIn direction="up" distance={30}>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta block mb-4">
              ARCHITECTURAL CANINE FURNITURE
            </span>
          </FadeIn>
          <FadeIn direction="up" distance={40} delay={0.1}>
            <h2 className="font-serif-display heading-h2 text-ivory max-w-3xl">
              MAKE ROOM FOR COMFORT.
            </h2>
          </FadeIn>
        </div>

        {/* Top Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-warm-gray/20">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <Link
              href="/"
              className="font-serif-display text-4xl tracking-widest text-ivory hover:text-sand transition-colors block"
            >
              WOofe
            </Link>
            <p className="text-sm font-light text-taupe/80 max-w-sm leading-relaxed">
              Luxury furniture for dogs, designed for the home. Combining Scandinavian restraint, orthopedic ergonomics, and human-grade textiles.
            </p>
            <div className="text-xs text-warm-gray tracking-widest uppercase">
              Copenhagen • Amsterdam • Stockholm
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta block">
              NAVIGATION
            </span>
            <ul className="space-y-3 text-sm font-light text-taupe/90">
              <li>
                <Link href="/shop" className="hover:text-ivory hover-underline-link transition-colors">
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ivory hover-underline-link transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-ivory hover-underline-link transition-colors">
                  The Journal
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-ivory hover-underline-link transition-colors">
                  Contact & Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta block">
              SOCIAL & EDITORIAL
            </span>
            <ul className="space-y-3 text-sm font-light text-taupe/90">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-ivory hover-underline-link transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-terracotta" />
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-ivory hover-underline-link transition-colors"
                >
                  <span>Pinterest</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-terracotta" />
                </a>
              </li>
              <li>
                <a
                  href="https://architecturaldigest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-ivory hover-underline-link transition-colors"
                >
                  <span>Architectural Press</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-terracotta" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-warm-gray font-light gap-4">
          <p>© {new Date().getFullYear()} WOofe. Independent Concept Redesign — Not affiliated with or commissioned by WOofe.</p>
          <div className="flex gap-6">
            <span className="hover:text-taupe transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-taupe transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-taupe transition-colors cursor-pointer">Sustainability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
