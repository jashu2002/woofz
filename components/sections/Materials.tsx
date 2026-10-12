"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

interface Hotspot {
  id: string;
  title: string;
  detail: string;
  x: number; // percentage
  y: number; // percentage
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "weave",
    title: "Tactile Bouclé Weave",
    detail: "CONCEPT SPECIFICATION: Designed for everyday durability.",
    x: 35,
    y: 42,
  },
  {
    id: "washable",
    title: "Stain-Resistant Treatment",
    detail: "Eco-friendly nano-coating repels liquid spills and canine dander.",
    x: 65,
    y: 30,
  },
  {
    id: "breathable",
    title: "Breathable Organic Weave",
    detail: "Allows continuous air dissipation to prevent overheating during sleep.",
    x: 52,
    y: 68,
  },
];

export function Materials() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <section className="py-24 md:py-36 bg-ivory text-charcoal overflow-hidden border-t border-taupe/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Left */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              label="MATERIAL & CRAFT"
              title="Soft enough for them. Beautiful enough for you."
              description="Our custom bouclé wool blend is woven by master mills to achieve tactile warmth without snagging under daily claw friction."
            />

            <FadeIn direction="up" distance={20} duration={0.6} delay={0.3}>
              <div className="space-y-4 pt-4 border-t border-taupe/60 text-sm text-warm-gray font-light">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-terracotta" />
                  <span>Machine washable at 30°C delicate cycle</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-terracotta" />
                  <span>Considered materials for everyday living.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-terracotta" />
                  <span>Pre-shrunk organic linen and wool fibers</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Interactive Macro Image Right */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" distance={30} duration={0.8}>
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-sand shadow-sm" data-cursor="view">
                <Image
                  src="/images/materials/boucle.jpg"
                  alt="Macro bouclé wool fabric texture"
                  fill
                  className="object-cover"
                />

                {/* Hotspot Dots */}
                {HOTSPOTS.map((spot) => {
                  const isActive = activeHotspot?.id === spot.id;
                  return (
                    <div
                      key={spot.id}
                      className="absolute z-20"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      onMouseEnter={() => setActiveHotspot(spot)}
                      onMouseLeave={() => setActiveHotspot(null)}
                    >
                      {/* Pulse Dot */}
                      <button
                        className="relative flex items-center justify-center p-3 group focus:outline-none"
                        aria-label={`Hotspot: ${spot.title}`}
                      >
                        <span className="absolute w-6 h-6 rounded-full bg-terracotta/30 animate-ping" />
                        <span className="relative w-3.5 h-3.5 rounded-full bg-terracotta border-2 border-ivory transition-transform duration-300 group-hover:scale-125" />
                      </button>

                      {/* Floating Editorial Tooltip */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-ivory/95 backdrop-blur-md text-charcoal rounded-sm shadow-xl border border-taupe z-30 pointer-events-none"
                          >
                            <span className="text-[10px] uppercase tracking-[0.16em] text-terracotta font-semibold block mb-1">
                              TEXTILE FEATURE
                            </span>
                            <h4 className="font-serif-display text-base mb-1">{spot.title}</h4>
                            <p className="text-xs text-warm-gray font-light leading-normal">{spot.detail}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
