"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

export function ForThemForHome() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <section className="py-24 md:py-36 bg-ivory text-charcoal overflow-hidden border-t border-taupe/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn direction="up" distance={20}>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta inline-block mb-3">
              HARMONIOUS COEXISTENCE
            </span>
          </FadeIn>
          <FadeIn direction="up" distance={30} delay={0.1}>
            <h2 className="font-serif-display heading-h2 text-charcoal">
              Designed for them. Designed for your home.
            </h2>
          </FadeIn>
        </div>

        {/* Interactive Split Screen Slider */}
        <div className="relative w-full h-[520px] md:h-[620px] flex flex-col md:flex-row overflow-hidden rounded-sm bg-sand">
          {/* Left Panel: FOR THEM */}
          <motion.div
            layout
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-1/2 md:h-full overflow-hidden cursor-pointer group"
            style={{
              width:
                hoveredSide === "left"
                  ? "65%"
                  : hoveredSide === "right"
                  ? "35%"
                  : "50%",
            }}
            onMouseEnter={() => setHoveredSide("left")}
            onMouseLeave={() => setHoveredSide(null)}
            data-cursor="view"
          >
            <Image
              src="/images/lifestyle/for_them.jpg"
              alt="Whippet dog resting comfortably on WOofe luxury bed"
              fill
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            {/* Stable Typography Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent flex items-end p-8 md:p-12">
              <div className="text-ivory space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-terracotta font-medium block">
                  CANINE ERGONOMICS
                </span>
                <h3 className="font-serif-display text-3xl md:text-5xl">FOR THEM</h3>
                <p className="text-xs md:text-sm text-taupe/90 font-light max-w-xs leading-relaxed">
                  Pressure-relieving orthopedic memory foam and protective bolster wall enclosure.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider Line */}
          <div className="hidden md:block w-[1px] h-full bg-ivory/40 z-10" />

          {/* Right Panel: FOR YOUR HOME */}
          <motion.div
            layout
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-1/2 md:h-full overflow-hidden cursor-pointer group"
            style={{
              width:
                hoveredSide === "right"
                  ? "65%"
                  : hoveredSide === "left"
                  ? "35%"
                  : "50%",
            }}
            onMouseEnter={() => setHoveredSide("right")}
            onMouseLeave={() => setHoveredSide(null)}
            data-cursor="view"
          >
            <Image
              src="/images/lifestyle/for_home.jpg"
              alt="Luxury Scandinavian living room decor"
              fill
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            {/* Stable Typography Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent flex items-end p-8 md:p-12">
              <div className="text-ivory space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-terracotta font-medium block">
                  INTERIOR ARCHITECTURE
                </span>
                <h3 className="font-serif-display text-3xl md:text-5xl">FOR YOUR HOME</h3>
                <p className="text-xs md:text-sm text-taupe/90 font-light max-w-xs leading-relaxed">
                  Tactile bouclé wool and muted warm palettes that seamlessly elevate contemporary decor.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
