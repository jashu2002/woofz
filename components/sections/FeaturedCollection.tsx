"use client";

import React from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

export function FeaturedCollection() {
  return (
    <section className="py-24 md:py-36 bg-ivory text-charcoal border-t border-taupe/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <SectionHeading
            label="FEATURED COLLECTION"
            title="Made for slow mornings."
            description="Bespoke dog furniture engineered with Scandinavian restraint and human-grade luxury textiles."
          />
        </div>

        {/* Product Grid with Generous Whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
          {PRODUCTS.map((product, idx) => (
            <FadeIn key={product.id} direction="up" distance={40} delay={idx * 0.15}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
