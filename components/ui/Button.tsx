"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "dark" | "outline";
  className?: string;
  showArrow?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  showArrow = true,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isDark = variant === "dark";
  const isOutline = variant === "outline";

  const content = (
    <span
      className={cn(
        "group relative inline-flex items-center gap-3 text-xs md:text-sm font-medium tracking-[0.14em] uppercase transition-all duration-400 cursor-pointer select-none",
        isPrimary && "text-charcoal hover:text-espresso",
        isDark && "text-ivory hover:text-sand",
        isSecondary && "px-6 py-3 border border-taupe text-charcoal hover:bg-sand/40 hover:border-charcoal transition-colors duration-400",
        isOutline && "px-6 py-3 border border-taupe text-charcoal hover:border-charcoal hover:bg-sand/30",
        className
      )}
    >
      <span className="relative pb-1">
        {children}
        {/* Animated Underline for primary / text buttons */}
        {(isPrimary || isDark) && (
          <span
            className={cn(
              "absolute bottom-0 left-0 h-[1px] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isDark ? "bg-ivory" : "bg-charcoal",
              "w-[35%] group-hover:w-full"
            )}
          />
        )}
      </span>

      {showArrow && (
        <ArrowRight
          className={cn(
            "w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2",
            isDark ? "text-ivory" : "text-charcoal"
          )}
        />
      )}
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}
