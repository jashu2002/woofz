"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";

interface StoryStep {
  num: string;
  category: string;
  title: string;
  description: string;
  image: string;
  callout: string;
  hotspots?: { title: string; text: string; x: number; y: number }[];
  showSvgLines?: boolean;
  showErgonomicCurve?: boolean;
}

const STORY_STEPS: StoryStep[] = [
  {
    num: "01",
    category: "01 / MATERIAL",
    title: "Tactile bouclé and organic Belgian linen.",
    description:
      "We source high-abrasion textiles woven specifically to withstand claws while retaining the warm, inviting hand-feel of haute-couture upholstery.",
    image: "/images/materials/boucle.jpg",
    callout: "CONCEPT SPECIFICATION: Designed for everyday durability.",
    hotspots: [
      {
        title: "Bouclé Loops",
        text: "Custom woven spun wool blend repelling claw snags.",
        x: 40,
        y: 45,
      },
      {
        title: "Breathable Core",
        text: "Allows continuous air circulation during sleep.",
        x: 68,
        y: 35,
      },
    ],
  },
  {
    num: "02",
    category: "02 / COMFORT",
    title: "Supportive comfort, thoughtfully designed.",
    description:
      "Engineered to relieve canine hip pressure and spinal misalignment. High-density support base capped with gel-infused memory foam.",
    image: "/images/lifestyle/for_them.jpg",
    callout: "Optimal Joint Realignment & REM Support",
    showErgonomicCurve: true,
  },
  {
    num: "03",
    category: "03 / CRAFT",
    title: "Hand-stitched leather & concealed hardware.",
    description:
      "Vegetable-tanned calfskin carry handles, double-needle stitched seams, and recessed YKK brass zippers that protect hardwood floors.",
    image: "/images/journal/journal_3.jpg",
    callout: "Craft-led construction.",
    showSvgLines: true,
  },
  {
    num: "04",
    category: "04 / DESIGN",
    title: "Proportions tuned for modern living spaces.",
    description:
      "Clean architectural silhouettes that harmoniously complement mid-century, modern Scandinavian, and contemporary plaster interiors.",
    image: "/images/lifestyle/for_home.jpg",
    callout: "Designed for the Home, Not the Pet Shop",
  },
];

export function ProductStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<{ title: string; text: string } | null>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    if (!sectionRef.current || !pinnedRef.current || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop && !prefersReducedMotion) {
      const ctx = gsap.context(() => {
        const slides = gsap.utils.toArray<HTMLElement>(".story-panel");
        const totalWidth = containerRef.current!.scrollWidth - window.innerWidth;

        gsap.to(slides, {
          xPercent: -100 * (slides.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: pinnedRef.current,
            scrub: 1,
            end: () => `+=${totalWidth * 1.2}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const idx = Math.min(Math.floor(progress * slides.length), slides.length - 1);
              setActiveIdx(idx);
            },
          },
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-espresso text-ivory overflow-hidden relative"
      data-cursor="drag"
    >
      <div ref={pinnedRef} className="py-24 md:py-36 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <SectionHeading
          label="SIGNATURE STORYTELLING"
          title="THE DETAILS MATTER"
          description="Every curve, stitch, and foam density is intentionally refined."
          dark
        />
      </div>

      {/* Desktop Horizontal Scroll Container / Mobile Vertical Sequence */}
      <div className="lg:h-[72vh] flex items-center">
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full px-6 md:px-12 lg:w-max will-change-transform"
        >
          {STORY_STEPS.map((step, idx) => (
            <div
              key={step.num}
              className="story-panel w-full lg:w-[75vw] max-w-5xl flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal/80 p-8 md:p-12 rounded-sm border border-warm-gray/20 shadow-2xl relative"
            >
              {/* Left Image Showcase with Technical SVG Overlays */}
              <div className="lg:col-span-7 relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-sand/10">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-700"
                />

                {/* Hotspot Markers for Step 01 */}
                {step.hotspots &&
                  step.hotspots.map((spot, sIdx) => (
                    <div
                      key={sIdx}
                      className="absolute z-20"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      onMouseEnter={() => setActiveHotspot(spot)}
                      onMouseLeave={() => setActiveHotspot(null)}
                    >
                      <button className="relative flex items-center justify-center p-3 focus:outline-none">
                        <span className="absolute w-5 h-5 rounded-full bg-terracotta/40 animate-ping" />
                        <span className="relative w-3 h-3 rounded-full bg-terracotta border-2 border-ivory" />
                      </button>
                      <AnimatePresence>
                        {activeHotspot?.title === spot.title && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-ivory text-charcoal rounded-sm text-xs shadow-xl z-30 pointer-events-none"
                          >
                            <p className="font-semibold text-terracotta">{spot.title}</p>
                            <p className="font-light text-warm-gray">{spot.text}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                {/* Ergonomic Curve Overlay for Step 02 */}
                {step.showErgonomicCurve && (
                  <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-8">
                    <svg className="w-full h-24 stroke-terracotta/80 fill-none" viewBox="0 0 300 60">
                      <path
                        d="M 10 30 Q 75 10 150 40 T 290 30"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                      />
                      <circle cx="150" cy="40" r="4" fill="#A56F55" />
                    </svg>
                  </div>
                )}

                {/* SVG Technical Drawing Lines for Step 03 */}
                {step.showSvgLines && (
                  <div className="absolute inset-0 z-10 pointer-events-none p-6">
                    <svg className="w-full h-full stroke-terracotta fill-none" viewBox="0 0 400 300">
                      {/* Animated Line 1 */}
                      <path
                        d="M 50 80 L 150 140 L 250 140"
                        strokeWidth="1.5"
                        className={`path-draw ${activeIdx === 2 ? "active" : ""}`}
                      />
                      <circle cx="50" cy="80" r="3" fill="#A56F55" />
                      <text x="260" y="144" fill="#F4F0E8" fontSize="10" fontFamily="sans-serif">
                        SADDLE STITCH SEAM
                      </text>

                      {/* Animated Line 2 */}
                      <path
                        d="M 100 240 L 200 190 L 300 190"
                        strokeWidth="1.5"
                        className={`path-draw ${activeIdx === 2 ? "active" : ""}`}
                      />
                      <circle cx="100" cy="240" r="3" fill="#A56F55" />
                      <text x="310" y="194" fill="#F4F0E8" fontSize="10" fontFamily="sans-serif">
                        YKK BRASS ZIPPER
                      </text>
                    </svg>
                  </div>
                )}
              </div>

              {/* Right Text Description */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta">
                  {step.category}
                </span>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl leading-tight text-ivory">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base font-light text-taupe/90 leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-4 border-t border-warm-gray/30">
                  <span className="text-xs uppercase tracking-[0.16em] text-sand/90 font-medium">
                    ✓ {step.callout}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
}
