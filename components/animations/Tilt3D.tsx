"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxDegree?: number;
}

export function Tilt3D({ children, className = "", maxDegree = 2.5 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotateX(-yPct * maxDegree * 2);
    setRotateY(xPct * maxDegree * 2);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}
