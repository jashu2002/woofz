"use client";

import React, { useState } from "react";
import { PRODUCTS, Product } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");

  const categories = ["ALL", "BEDS", "MATS", "CUSHIONS"];

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "BEDS") return product.id.includes("bed") || product.id.includes("nest");
    if (selectedCategory === "MATS") return product.id.includes("mat");
    if (selectedCategory === "CUSHIONS") return product.id.includes("cushion");
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="pt-32 pb-24 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Header */}
        <SectionHeading
          label="THE CATALOGUE"
          title="Designed for comfort."
          description="Explore our complete line of architectural dog beds, quilted floor mats, and heavy linen orthopedic cushions."
        />

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-y border-taupe/60 gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.16em] font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 transition-colors ${
                  selectedCategory === cat
                    ? "text-terracotta border-b border-terracotta"
                    : "text-warm-gray hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-warm-gray font-medium">
            <span>SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-charcoal font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">FEATURED</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredProducts.map((product, idx) => (
            <FadeIn key={product.id} direction="up" distance={30} delay={idx * 0.1}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
