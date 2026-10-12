"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ProductCard } from "@/components/products/ProductCard";
import { StickyProductBar } from "@/components/product/StickyProductBar";
import { Magnetic } from "@/components/animations/Magnetic";
import { Tilt3D } from "@/components/animations/Tilt3D";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-40 pb-24 px-6 text-center max-w-xl mx-auto">
        <h1 className="font-serif-display text-4xl mb-4">Product Not Found</h1>
        <p className="text-warm-gray mb-8">The requested item could not be located in our catalogue.</p>
        <Link href="/shop" className="text-xs uppercase tracking-[0.18em] font-medium text-terracotta underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(product.images.primary);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "care">("details");
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();

  const finalPrice = Math.round(product.price * selectedSize.priceMultiplier);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.images.primary,
      size: selectedSize.code,
      color: selectedColor.name,
    });
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <>
      <div className="pt-32 pb-24 bg-ivory text-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {/* Breadcrumb */}
          <div className="text-xs uppercase tracking-[0.16em] text-warm-gray flex items-center gap-2">
            <Link href="/shop" className="hover:text-charcoal transition-colors">
              SHOP
            </Link>
            <span>/</span>
            <span className="text-charcoal font-medium">{product.name}</span>
          </div>

          {/* Step 1: Editorial Title */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <FadeIn direction="up" distance={20}>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta block">
                {product.descriptor}
              </span>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={0.1}>
              <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl text-charcoal tracking-tight">
                {product.name}
              </h1>
            </FadeIn>
          </div>

          {/* Step 2: Massive Product Image Hero */}
          <FadeIn direction="up" distance={40} delay={0.2}>
            <Tilt3D maxDegree={1.5}>
              <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-sand shadow-lg" data-cursor="view">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-opacity duration-500"
                />
              </div>
            </Tilt3D>
          </FadeIn>

          {/* Gallery Thumbnails */}
          <div className="flex justify-center gap-4 max-w-xl mx-auto">
            {product.images.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`relative aspect-[4/3] w-24 rounded-sm overflow-hidden border-2 transition-all duration-400 ${
                  selectedImage === imgUrl
                    ? "border-terracotta scale-105 opacity-100"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={imgUrl} alt="Thumbnail view" fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Step 3: Purchase Controls Block */}
          <div className="max-w-2xl mx-auto text-center space-y-8 pt-4">
            <div className="space-y-2">
              <p className="text-sm font-light text-warm-gray">{product.descriptor}</p>
              <div className="font-serif-display text-4xl text-charcoal">
                {formatPrice(finalPrice)}
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-3 flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.16em] text-charcoal font-medium">
                COLOR: <span className="text-warm-gray font-normal">{selectedColor.name}</span>
              </span>
              <div className="flex gap-3">
                {product.colors.map((col) => (
                  <button
                    key={col.code}
                    onClick={() => setSelectedColor(col)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor.code === col.code ? "border-terracotta scale-110" : "border-taupe hover:border-charcoal"
                    }`}
                    aria-label={`Select color ${col.name}`}
                  >
                    <span className="w-6 h-6 rounded-full" style={{ backgroundColor: col.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex justify-between items-center text-xs uppercase tracking-[0.14em]">
                <span className="text-charcoal font-medium">SIZE: {selectedSize.label}</span>
                <span className="text-warm-gray">{selectedSize.dimensions}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s.code}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 px-4 border text-xs uppercase tracking-[0.14em] font-medium transition-all ${
                      selectedSize.code === s.code
                        ? "border-charcoal bg-sand/60 text-charcoal font-bold"
                        : "border-taupe text-warm-gray hover:border-charcoal hover:text-charcoal"
                    }`}
                  >
                    {s.label} ({s.code})
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="max-w-md mx-auto pt-2">
              <Magnetic strength={0.25}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddToCart}
                  className="w-full py-5 bg-espresso text-ivory text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-3 shadow-sm"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-terracotta" />
                      <span>ADDED TO CART</span>
                    </>
                  ) : (
                    <>
                      <span>ADD TO CART — {formatPrice(finalPrice)}</span>
                      <ArrowRight className="w-4 h-4 text-terracotta" />
                    </>
                  )}
                </motion.button>
              </Magnetic>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-center border-t border-taupe/60 text-[11px] text-warm-gray font-light max-w-md mx-auto">
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-4 h-4 text-terracotta" />
                <span>Complimentary Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-terracotta" />
                <span>30-Day Home Trial</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-terracotta" />
                <span>2-Year Warranty</span>
              </div>
            </div>

            {/* Expandable Specifications */}
            <div className="pt-6 border-t border-taupe/60 space-y-4 max-w-md mx-auto text-left">
              <div className="flex border-b border-taupe/60 gap-8 text-xs uppercase tracking-[0.14em] font-medium justify-center">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 transition-colors ${
                    activeTab === "details" ? "text-terracotta border-b-2 border-terracotta" : "text-warm-gray"
                  }`}
                >
                  DETAILS
                </button>
                <button
                  onClick={() => setActiveTab("materials")}
                  className={`pb-2 transition-colors ${
                    activeTab === "materials" ? "text-terracotta border-b-2 border-terracotta" : "text-warm-gray"
                  }`}
                >
                  MATERIALS
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-2 transition-colors ${
                    activeTab === "care" ? "text-terracotta border-b-2 border-terracotta" : "text-warm-gray"
                  }`}
                >
                  CARE
                </button>
              </div>

              <div className="text-xs text-warm-gray font-light leading-relaxed pt-2">
                {activeTab === "details" && (
                  <ul className="space-y-2">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-terracotta mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "materials" && (
                  <div className="space-y-2">
                    <p className="font-medium text-charcoal">Composition:</p>
                    <p>{product.materials.join(" • ")}</p>
                  </div>
                )}

                {activeTab === "care" && <p>{product.careInstructions}</p>}
              </div>
            </div>
          </div>

          {/* Step 4: Separator Line */}
          <div className="w-full h-[1px] bg-taupe/60 my-16" />

          {/* Step 5: MATERIAL Section */}
          <div className="py-16 bg-sand/30 p-8 md:p-16 rounded-sm border border-taupe/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta">MATERIAL</span>
                <h2 className="font-serif-display heading-h2 text-charcoal">Tactile. Soft. Considered.</h2>
                <p className="text-sm font-light text-warm-gray leading-relaxed">
                  Our custom bouclé wool blend is woven by master mills to achieve tactile warmth without snagging under daily claw friction.
                </p>
                <p className="text-xs font-medium text-terracotta uppercase tracking-[0.14em]">
                  ✓ CONCEPT SPECIFICATION: Designed for everyday durability.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ImageReveal duration={1.2}>
                  <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-sand shadow-sm" data-cursor="view">
                    <Image src="/images/materials/boucle.jpg" alt="Macro bouclé wool texture" fill className="object-cover" />
                  </div>
                </ImageReveal>
              </div>
            </div>
          </div>

          {/* Step 6: COMFORT Section */}
          <div className="space-y-12 py-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta">COMFORT</span>
              <h2 className="font-serif-display heading-h2 text-charcoal">Supportive comfort, thoughtfully designed.</h2>
              <p className="text-sm font-light text-warm-gray leading-relaxed">
                Dogs spend up to 14 hours a day resting. Our layered supportive foam cushion responds to body heat and balances weight distribution.
              </p>
            </div>
            <ImageReveal duration={1.3}>
              <div className="relative aspect-[21/9] w-full rounded-sm overflow-hidden bg-sand shadow-sm" data-cursor="view">
                <Image src="/images/lifestyle/for_them.jpg" alt="Dog resting on WOofe bed" fill className="object-cover" />
                {/* Ergonomic Curve Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-8">
                  <svg className="w-full h-24 stroke-terracotta/80 fill-none" viewBox="0 0 300 60">
                    <path d="M 10 30 Q 75 10 150 40 T 290 30" strokeWidth="2" strokeDasharray="6 4" />
                    <circle cx="150" cy="40" r="4" fill="#A56F55" />
                  </svg>
                </div>
              </div>
            </ImageReveal>
          </div>

          {/* Step 7: CRAFT Section */}
          <div className="py-16 bg-sand/30 p-8 md:p-16 rounded-sm border border-taupe/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <ImageReveal duration={1.3}>
                  <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-sand shadow-sm" data-cursor="view">
                    <Image src="/images/journal/journal_3.jpg" alt="Craftsmanship detail" fill className="object-cover" />
                  </div>
                </ImageReveal>
              </div>
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta">CRAFT</span>
                <h2 className="font-serif-display heading-h2 text-charcoal">Every detail has a purpose.</h2>
                <p className="text-sm font-light text-warm-gray leading-relaxed">
                  Saddle-stitched natural leather carry handles, double-needle topstitching, and recessed YKK brass zippers that protect hardwood floors.
                </p>
                <p className="text-xs font-medium text-terracotta uppercase tracking-[0.14em]">
                  ✓ Craft-led construction.
                </p>
              </div>
            </div>
          </div>

          {/* Step 8: LIFESTYLE Section */}
          <div className="py-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta">LIFESTYLE</span>
              <h2 className="font-serif-display heading-h2 text-charcoal">Proportions tuned for modern living spaces.</h2>
              <p className="text-sm font-light text-warm-gray leading-relaxed">
                Clean architectural silhouettes that harmoniously complement mid-century, modern Scandinavian, and contemporary plaster interiors.
              </p>
            </div>
            <ImageReveal duration={1.4}>
              <div className="relative aspect-[21/9] w-full rounded-sm overflow-hidden bg-sand shadow-lg" data-cursor="view">
                <Image src="/images/lifestyle/for_home.jpg" alt="WOofe bed in modern Scandinavian living room" fill className="object-cover" />
              </div>
            </ImageReveal>
          </div>

          {/* Step 9: Primary Visual Anchor Motif */}
          <div className="py-24 bg-espresso text-ivory text-center rounded-sm space-y-4 px-6">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta block">
              THE WOOFE HARMONY
            </span>
            <h2 className="font-serif-display heading-h2 text-ivory">
              Designed for dogs. <br />
              Designed for your home.
            </h2>
          </div>

          {/* Step 10: CONCEPT STORY Section */}
          <div className="max-w-4xl mx-auto text-center space-y-6 py-12">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta block">
              CONCEPT STORY
            </span>
            <blockquote className="font-serif-display text-2xl sm:text-4xl text-charcoal leading-tight">
              &ldquo;For the first time, our living room feels complete. The Bear Bed isn't just pet furniture — it is a piece of quiet Scandinavian sculpture that our dog refuses to leave.&rdquo;
            </blockquote>
            <p className="text-xs uppercase tracking-[0.18em] font-medium text-warm-gray">
              — Concept customer story
            </p>
          </div>

          {/* Step 12: RELATED PRODUCTS */}
          <div className="pt-16 border-t border-taupe/60 space-y-10">
            <h3 className="font-serif-display text-3xl text-charcoal">Complete the Sanctuary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 11: STICKY ADD TO CART */}
      <StickyProductBar
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        finalPrice={finalPrice}
      />
    </>
  );
}
