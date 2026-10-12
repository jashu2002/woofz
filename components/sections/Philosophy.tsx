"use client";

import React from "react";
import Image from "next/image";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Philosophy() {
  return (
    <section className="py-24 md:py-36 bg-ivory text-charcoal overflow-hidden border-t border-taupe/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeading
              label="THE WOOFE PHILOSOPHY"
              title="Your home is their home too."
            />

            <FadeIn direction="up" distance={30} duration={0.8} delay={0.2}>
              <div className="space-y-6 text-warm-gray font-light text-base sm:text-lg leading-relaxed max-w-xl">
                <p>
                  We believe pet furniture should never require a compromise in design. 
                  Every piece we create is designed to coexist with fine stoneware, architectural oak, and stonewashed linens.
                </p>
                <p>
                  By fusing Scandinavian minimalism with orthopedic canine ergonomics, 
                  WOofe crafts quiet, tactile resting spaces that feel as organic in your living room as your favorite designer lounge chair.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" distance={20} duration={0.6} delay={0.4}>
              <div className="pt-4 flex items-center gap-8 text-xs uppercase tracking-[0.16em] text-charcoal border-t border-taupe/60">
                <div>
                  <span className="block font-serif-display text-2xl text-terracotta">100%</span>
                  <span className="text-warm-gray text-[11px]">Organic Textiles</span>
                </div>
                <div className="w-[1px] h-8 bg-taupe/60" />
                <div>
                  <span className="block font-serif-display text-2xl text-terracotta">Supportive</span>
                  <span className="text-warm-gray text-[11px]">Comfort Foam</span>
                </div>
                <div className="w-[1px] h-8 bg-taupe/60" />
                <div>
                  <span className="block font-serif-display text-2xl text-terracotta">Zero</span>
                  <span className="text-warm-gray text-[11px]">Visual Compromise</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Editorial Image */}
          <div className="lg:col-span-5">
            <ImageReveal duration={1.2}>
              <div className="relative aspect-[4/5] w-full bg-sand rounded-sm overflow-hidden shadow-sm" data-cursor="view">
                <Image
                  src="/images/lifestyle/for_home.jpg"
                  alt="Minimalist living room with WOofe dog bed"
                  fill
                  className="object-cover"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
