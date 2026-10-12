"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function Cursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "explore" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkIsDesktop = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isWideScreen = window.innerWidth >= 1024;
      setIsDesktop(isWideScreen && !hasTouch && !reducedMotion);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorExplore = target.closest("[data-cursor='explore']");
      const cursorView = target.closest("[data-cursor='view']");
      const cursorDrag = target.closest("[data-cursor='drag']");
      const cursorLink = target.closest("a, button, [role='button'], input, textarea");

      if (cursorExplore) {
        setCursorVariant("explore");
        setCursorText("EXPLORE");
      } else if (cursorView) {
        setCursorVariant("view");
        setCursorText("VIEW");
      } else if (cursorDrag) {
        setCursorVariant("drag");
        setCursorText("DRAG");
      } else if (cursorLink) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isDesktop || !isVisible) return null;

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#242321",
      border: "0px solid transparent",
    },
    hover: {
      height: 36,
      width: 36,
      backgroundColor: "rgba(165, 111, 85, 0.15)",
      border: "1px solid #A56F55",
    },
    view: {
      height: 64,
      width: 64,
      backgroundColor: "#242321",
      border: "1px solid #F4F0E8",
    },
    explore: {
      height: 68,
      width: 68,
      backgroundColor: "#A56F55",
      border: "1px solid #F4F0E8",
    },
    drag: {
      height: 64,
      width: 64,
      backgroundColor: "#24211E",
      border: "1px solid #F4F0E8",
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full text-center mix-blend-normal"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {(cursorVariant === "view" || cursorVariant === "explore" || cursorVariant === "drag") && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-[10px] font-semibold tracking-[0.2em] text-ivory uppercase select-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
