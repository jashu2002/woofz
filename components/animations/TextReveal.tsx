"use client";

import React, { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  as: Component = "span",
  delay = 0,
  stagger = 0.08,
}: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".reveal-word");

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(words, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        stagger: stagger,
        delay: delay,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    );
  }, [text, delay, stagger]);

  const words = text.split(" ");

  return (
    <Component ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="reveal-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
