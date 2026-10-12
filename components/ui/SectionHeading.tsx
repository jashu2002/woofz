"use client";

import React from "react";
import { FadeIn } from "@/components/animations/FadeIn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  dark?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
  dark = false,
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "text-center items-center mx-auto"
      : align === "right"
      ? "text-right items-end ml-auto"
      : "text-left items-start";

  return (
    <div className={`flex flex-col max-w-3xl ${alignment} ${className}`}>
      {label && (
        <FadeIn direction="up" distance={20} duration={0.6}>
          <span
            className={`text-[11px] md:text-[13px] uppercase font-medium tracking-[0.18em] mb-4 inline-block ${
              dark ? "text-sand/80" : "text-terracotta"
            }`}
          >
            {label}
          </span>
        </FadeIn>
      )}

      <FadeIn direction="up" distance={30} duration={0.8} delay={0.1}>
        <h2
          className={`font-serif-display font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight ${
            dark ? "text-ivory" : "text-charcoal"
          } ${titleClassName}`}
        >
          {title}
        </h2>
      </FadeIn>

      {description && (
        <FadeIn direction="up" distance={30} duration={0.8} delay={0.2}>
          <p
            className={`mt-6 text-base md:text-lg leading-relaxed font-light ${
              dark ? "text-taupe/90" : "text-warm-gray"
            }`}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
