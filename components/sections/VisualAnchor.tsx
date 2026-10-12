"use client";

import React from "react";
import { FadeIn } from "@/components/animations/FadeIn";

interface VisualAnchorProps {
  statement?: string;
  substatement?: string;
}

export function VisualAnchor({
  statement = "Soft enough for them.",
  substatement = "Beautiful enough for you.",
}: VisualAnchorProps) {
  return (
    <section className="py-28 md:py-44 bg-ivory text-charcoal flex items-center justify-center text-center overflow-hidden border-t border-taupe/40">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-4 sm:space-y-6">
        <FadeIn direction="up" distance={30} duration={0.9} delay={0.1}>
          <p className="font-serif-display heading-h2 font-normal tracking-tight text-charcoal">
            {statement}
          </p>
        </FadeIn>

        <FadeIn direction="up" distance={30} duration={0.9} delay={0.35}>
          <p className="font-serif-display heading-h2 font-normal tracking-tight text-terracotta italic">
            {substatement}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
