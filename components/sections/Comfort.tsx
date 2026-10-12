"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { ImageReveal } from "@/components/animations/ImageReveal";

export function Comfort() {
  return (
    <section className="py-24 md:py-36 bg-ivory text-charcoal border-t border-taupe/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="lg:col-span-6">
            <ImageReveal duration={1.2}>
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-sand" data-cursor="view">
                <Image
                  src="/images/products/bear_bed_alt.jpg"
                  alt="Italian Greyhound sleeping on WOofe Bear Bed"
                  fill
                  className="object-cover"
                />
              </div>
            </ImageReveal>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-8">
            <SectionHeading
              label="RESTFUL ERGONOMICS"
              title="Rest that restores their energy."
              description="A dog spends up to 14 hours a day sleeping. Our pressure-relieving foam core cushions heavy hip points, while the raised perimeter supports the cervical spine."
            />

            <FadeIn direction="up" distance={30} delay={0.2}>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-taupe/60">
                <div>
                  <h4 className="font-serif-display text-xl text-terracotta mb-1">Dual-Zone Foam</h4>
                  <p className="text-xs text-warm-gray font-light">Supports both deep REM sleep and light lounging rest.</p>
                </div>
                <div>
                  <h4 className="font-serif-display text-xl text-terracotta mb-1">Thermal Flow</h4>
                  <p className="text-xs text-warm-gray font-light">Gel-infused layers regulate body heat during warm afternoons.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
