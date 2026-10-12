"use client";

import React, { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 to 0.2
  className?: string;
}

export function Parallax({ children, speed = -0.15, className = "" }: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = registerGSAP();
    if (!targetRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.to(targetRef.current, {
        y: () => speed * 200,
        ease: "none",
        scrollTrigger: {
          trigger: targetRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={targetRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
