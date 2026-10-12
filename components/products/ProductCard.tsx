"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Tilt3D } from "@/components/animations/Tilt3D";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col space-y-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="explore"
    >
      {/* Image Container with Crossfade & Scale */}
      <Tilt3D maxDegree={2.0}>
        <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] w-full bg-sand overflow-hidden rounded-sm">
          {/* Tag Badge */}
          {product.tag && (
            <span className="absolute top-4 left-4 z-10 text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1 bg-ivory/90 text-terracotta backdrop-blur-sm">
              {product.tag}
            </span>
          )}

          {/* Primary Image */}
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
            }`}
          />

          {/* Secondary Crossfade Image */}
          {product.images.secondary && (
            <Image
              src={product.images.secondary}
              alt={`${product.name} lifestyle view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
              }`}
            />
          )}
        </Link>
      </Tilt3D>

      {/* Product Details */}
      <div className="flex justify-between items-start pt-2">
        <div className="space-y-1">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif-display text-2xl text-charcoal group-hover:translate-x-1.5 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-warm-gray tracking-wide font-light">
            {product.descriptor}
          </p>
        </div>

        <span className="font-serif-display text-xl text-charcoal">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Action Link */}
      <div className="pt-1">
        <Link
          href={`/product/${product.slug}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-charcoal group-hover:text-terracotta transition-colors duration-400"
        >
          <span className="hover-underline-link">VIEW PRODUCT</span>
          <ArrowRight className="w-4 h-4 text-charcoal group-hover:text-terracotta group-hover:translate-x-2 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        </Link>
      </div>
    </div>
  );
}
