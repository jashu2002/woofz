"use client";

import React from "react";
import Image from "next/image";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Parallax } from "@/components/animations/Parallax";

export function ParallaxBanner() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-sand my-12" data-cursor="view">
      <Parallax speed={-0.12} className="relative w-full h-full">
        <ImageReveal duration={1.3} className="w-full h-full">
          <Image
            src="/images/lifestyle/for_them.jpg"
            alt="Dog resting on WOofe luxury bed"
            fill
            className="object-cover object-center brightness-95"
          />
        </ImageReveal>
      </Parallax>
      <div className="absolute inset-0 bg-charcoal/20" />
      <div className="absolute inset-0 flex items-center justify-center text-center p-6">
        <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl text-ivory tracking-wide max-w-3xl leading-tight">
          Quiet luxury for every daily ritual.
        </h2>
      </div>
    </section>
  );
}
