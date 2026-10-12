"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { registerGSAP } from "@/lib/gsap";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Magnetic } from "@/components/animations/Magnetic";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Desktop Mouse Depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 24 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      const isWide = window.innerWidth >= 1024;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsDesktop(isWide && !reducedMotion);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const { gsap } = registerGSAP();
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      // Step 2 & 3: Hero Image Scale 1.10 -> 1.00 & opacity 0.85 -> 1.00
      gsap.fromTo(
        imageRef.current,
        { scale: 1.10, opacity: 0.85 },
        {
          scale: 1.0,
          opacity: 1.0,
          duration: 1.6,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );

      // 4-Layer Depth Scroll Parallax
      if (window.innerWidth >= 768) {
        const ctx = gsap.context(() => {
          // Layer 1: Background Image (-60px)
          gsap.to(imageRef.current, {
            y: -60,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // Layer 2: Foreground Element (-85px)
          if (foregroundRef.current) {
            gsap.to(foregroundRef.current, {
              y: -85,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          // Layer 3: Typography (-110px)
          gsap.to(textRef.current, {
            y: -110,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "60% top",
              scrub: true,
            },
          });
        });

        return () => ctx.revert();
      }
    }

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct * 3); // rotateY ±1.5deg
    mouseY.set(-yPct * 3); // rotateX ±1.5deg
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[720px] flex items-center justify-center overflow-hidden bg-ivory pt-20 perspective-1000"
      data-cursor="view"
    >
      {/* Layer 1: Background Image Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div ref={imageRef} className="relative w-full h-full will-change-transform">
          <Image
            src="/images/hero/hero_lifestyle.jpg"
            alt="WOofe luxury dog bed in Scandinavian interior"
            fill
            priority
            quality={92}
            className="object-cover object-center brightness-[0.94]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/30 to-transparent md:bg-gradient-to-r md:from-ivory/80 md:via-ivory/40 md:to-transparent" />
        </div>
      </motion.div>

      {/* Layer 2: Subtle Foreground Floating Accent */}
      <div ref={foregroundRef} className="absolute right-12 bottom-24 z-10 hidden lg:block opacity-30 pointer-events-none">
        <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-charcoal rotate-90 block">
          COPENHAGEN • 2026
        </span>
      </div>

      {/* Layer 3: Hero Content Box */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex items-center">
        <div ref={textRef} className="max-w-2xl text-charcoal space-y-6 pt-12 md:pt-0">
          {/* Small Label */}
          <FadeIn direction="up" distance={20} duration={0.6} delay={0.2}>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-terracotta inline-block">
              DESIGNED FOR COMFORT
            </span>
          </FadeIn>

          {/* Main Oversized Serif Heading */}
          <h1 className="font-serif-display heading-hero font-normal tracking-tight text-charcoal">
            <TextReveal as="span" text="A softer place to rest." delay={0.4} stagger={0.1} />
          </h1>

          {/* Primary Visual Anchor Statement */}
          <FadeIn direction="up" distance={30} duration={0.8} delay={1.1}>
            <p className="text-base sm:text-lg md:text-xl font-light text-warm-gray leading-relaxed max-w-md">
              Designed for dogs. <br className="hidden sm:inline" />
              Designed for your home.
            </p>
          </FadeIn>

          {/* CTA Button with Magnetic Pull */}
          <FadeIn direction="up" distance={30} duration={0.8} delay={1.3}>
            <div className="pt-4">
              <Magnetic strength={0.28}>
                <Button href="/shop" variant="primary">
                  EXPLORE COLLECTION →
                </Button>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Layer 4: Looping Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.25em] text-warm-gray font-medium">
          SCROLL
        </span>
        <div className="animate-bounce duration-2000">
          <ArrowDown className="w-4 h-4 text-terracotta" />
        </div>
      </div>
    </section>
  );
}
