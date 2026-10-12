"use client";

import React, { useEffect, useRef } from "react";
import { registerGSAP } from "@/lib/gsap";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function ImageReveal({ children, className = "", duration = 1.2 }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGSAP();
    if (!containerRef.current || !imageWrapperRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
      gsap.set(imageWrapperRef.current, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: duration,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageWrapperRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1.0,
          duration: duration,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [duration]);

  return (
    <div ref={containerRef} className={`overflow-hidden will-change-transform ${className}`}>
      <div ref={imageWrapperRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
