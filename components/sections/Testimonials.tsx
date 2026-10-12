"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/data/testimonials";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 md:py-36 bg-sand/30 text-charcoal overflow-hidden border-t border-taupe/40">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn direction="up" distance={20} className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta">
            OWNER VOICES
          </span>
        </FadeIn>

        {/* Editorial Quote Slider */}
        <div className="min-h-[260px] flex flex-col justify-between text-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <blockquote className="font-serif-display text-2xl sm:text-4xl md:text-5xl leading-tight font-normal text-charcoal max-w-4xl mx-auto">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.18em] font-medium text-charcoal">
                  — {current.author}, {current.location}
                </p>
                <p className="text-xs text-warm-gray font-light">
                  {current.dog} • {current.product}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Minimal Controls */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-taupe/60">
            <button
              onClick={handlePrev}
              className="p-2 text-charcoal hover:text-terracotta transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              {TESTIMONIALS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-400 rounded-full ${
                    idx === currentIndex ? "w-8 bg-terracotta" : "w-1.5 bg-taupe"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 text-charcoal hover:text-terracotta transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
