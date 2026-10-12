"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-ivory text-charcoal space-y-24 md:space-y-36">
      {/* Header Hero */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-6">
        <FadeIn direction="up" distance={20}>
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta">
            OUR PURPOSE
          </span>
        </FadeIn>
        <FadeIn direction="up" distance={30} delay={0.1}>
          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl leading-tight">
            Elevating pet lifestyle to an architectural standard.
          </h1>
        </FadeIn>
        <FadeIn direction="up" distance={30} delay={0.2}>
          <p className="text-base sm:text-lg text-warm-gray font-light max-w-2xl mx-auto leading-relaxed">
            Founded in Copenhagen in 2024, WOofe was born out of a desire to eliminate the visual noise of traditional pet products and create quiet, tactile furniture for modern homes.
          </p>
        </FadeIn>
      </div>

      {/* Main Studio Image */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ImageReveal duration={1.3}>
          <div className="relative aspect-[21/9] w-full bg-sand rounded-sm overflow-hidden" data-cursor="view">
            <Image
              src="/images/lifestyle/for_home.jpg"
              alt="WOofe Copenhagen studio interior"
              fill
              className="object-cover"
            />
          </div>
        </ImageReveal>
      </div>

      {/* Philosophy Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-taupe/60">
          <FadeIn direction="up" distance={30} delay={0.1} className="space-y-4">
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
              01 / CANINE WELLBEING
            </span>
            <h3 className="font-serif-display text-2xl">Orthopedic Ergonomics</h3>
            <p className="text-sm font-light text-warm-gray leading-relaxed">
              We collaborate with European veterinary orthopedists to calculate density curves that relieve hip pressure and promote restorative REM sleep for dogs of all sizes.
            </p>
          </FadeIn>

          <FadeIn direction="up" distance={30} delay={0.2} className="space-y-4">
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
              02 / MATERIAL RIGOR
            </span>
            <h3 className="font-serif-display text-2xl">High-Performance Textiles</h3>
            <p className="text-sm font-light text-warm-gray leading-relaxed">
              Every bouclé, linen, and canvas fabric undergoes 50,000 double-rub claw tests. Washable, stain-resistant, and tactile without sacrificing beauty.
            </p>
          </FadeIn>

          <FadeIn direction="up" distance={30} delay={0.3} className="space-y-4">
            <span className="text-xs uppercase tracking-[0.18em] text-terracotta font-semibold">
              03 / ARCHITECTURAL HARMONY
            </span>
            <h3 className="font-serif-display text-2xl">Designed for the Home</h3>
            <p className="text-sm font-light text-warm-gray leading-relaxed">
              We select warm ivory, soft sand, deep charcoal, and subtle terracotta tones so our beds seamlessly complement plaster walls and mid-century teak.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Contact & Studio Info */}
      <div id="contact" className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-sand/40 p-10 md:p-16 rounded-sm border border-taupe/60 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionHeading
              label="STUDIO & PRESS"
              title="Connect with our design team."
              description="For press inquiries, trade programs, or custom size requests, our Copenhagen studio is at your service."
            />
            <Button href="mailto:studio@woofe-concept.com" variant="primary">
              EMAIL OUR STUDIO →
            </Button>
          </div>

          <div className="space-y-6 text-sm text-warm-gray font-light">
            <div className="border-b border-taupe/60 pb-4">
              <p className="font-medium text-charcoal uppercase tracking-wider text-xs mb-1">COPENHAGEN STUDIO</p>
              <p>Store Strandstræde 18, 1255 København K, Denmark</p>
            </div>
            <div className="border-b border-taupe/60 pb-4">
              <p className="font-medium text-charcoal uppercase tracking-wider text-xs mb-1">AMSTERDAM SHOWROOM</p>
              <p>Keizersgracht 482, 1016 GD Amsterdam, Netherlands</p>
            </div>
            <div>
              <p className="font-medium text-charcoal uppercase tracking-wider text-xs mb-1">PRESS & TRADE</p>
              <p>press@woofe-concept.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
