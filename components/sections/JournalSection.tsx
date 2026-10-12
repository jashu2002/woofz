"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

export function JournalSection() {
  return (
    <section className="py-24 md:py-36 bg-ivory text-charcoal border-t border-taupe/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <SectionHeading
            label="CURATED ESSAYS"
            title="THE WOOFE JOURNAL"
            description="Explorations in canine behavior, interior architecture, and textile craftsmanship."
          />
          <FadeIn direction="up" distance={20}>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-charcoal hover:text-terracotta transition-colors"
            >
              <span className="hover-underline-link">READ ALL ESSAYS</span>
              <ArrowRight className="w-4 h-4 text-terracotta" />
            </Link>
          </FadeIn>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {JOURNAL_ARTICLES.map((article, idx) => (
            <FadeIn key={article.id} direction="up" distance={30} delay={idx * 0.15}>
              <Link href={`/journal#${article.slug}`} className="group block space-y-6" data-cursor="view">
                <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-sand">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-terracotta font-medium">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span className="text-warm-gray">{article.readTime}</span>
                  </div>

                  <h3 className="font-serif-display text-2xl leading-snug text-charcoal group-hover:translate-x-1.5 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {article.title}
                  </h3>

                  <p className="text-xs text-warm-gray font-light line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-charcoal group-hover:text-terracotta transition-colors">
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-4 h-4 text-charcoal group-hover:text-terracotta group-hover:translate-x-2 transition-transform duration-400" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
