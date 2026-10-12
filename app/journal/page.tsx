"use client";

import React, { useState } from "react";
import Image from "next/image";
import { JOURNAL_ARTICLES, JournalArticle } from "@/data/journal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, X } from "lucide-react";

export default function JournalPage() {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const featured = JOURNAL_ARTICLES[0];
  const secondaryArticles = JOURNAL_ARTICLES.slice(1);

  return (
    <div className="pt-32 pb-24 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Header */}
        <SectionHeading
          label="THE WOOFE JOURNAL"
          title="Essays on rest, space & living with dogs."
          description="A collection of editorial writings exploring canine behavior, interior architecture, and textile craftsmanship."
        />

        {/* Featured Article Banner */}
        <FadeIn direction="up" distance={40}>
          <div
            onClick={() => setActiveArticle(featured)}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 bg-sand/40 p-6 md:p-10 rounded-sm border border-taupe/60 cursor-pointer overflow-hidden"
            data-cursor="view"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-sand">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-terracotta font-semibold">
                  <span>FEATURED ESSAY</span>
                  <span>•</span>
                  <span className="text-warm-gray">{featured.readTime}</span>
                </div>

                <h2 className="font-serif-display text-3xl sm:text-4xl text-charcoal group-hover:translate-x-1.5 transition-transform duration-400">
                  {featured.title}
                </h2>

                <p className="text-sm font-light text-warm-gray leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-taupe/60 flex items-center justify-between">
                <span className="text-xs text-warm-gray font-light">By {featured.author}</span>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-charcoal group-hover:text-terracotta transition-colors">
                  <span>READ ESSAY</span>
                  <ArrowRight className="w-4 h-4 text-terracotta group-hover:translate-x-2 transition-transform duration-400" />
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          {secondaryArticles.map((article, idx) => (
            <FadeIn key={article.id} direction="up" distance={30} delay={idx * 0.15}>
              <div
                onClick={() => setActiveArticle(article)}
                className="group block space-y-6 cursor-pointer"
                data-cursor="view"
              >
                <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-sand">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-terracotta font-semibold">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span className="text-warm-gray">{article.readTime}</span>
                  </div>

                  <h3 className="font-serif-display text-2xl text-charcoal group-hover:translate-x-1.5 transition-transform duration-400">
                    {article.title}
                  </h3>

                  <p className="text-xs text-warm-gray font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-charcoal group-hover:text-terracotta transition-colors">
                    <span>READ ESSAY</span>
                    <ArrowRight className="w-4 h-4 text-terracotta group-hover:translate-x-2 transition-transform duration-400" />
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-[100] bg-charcoal/50 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-ivory text-charcoal p-8 md:p-12 rounded-sm shadow-2xl space-y-8 my-auto border border-taupe">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 text-charcoal hover:text-terracotta transition-colors"
              aria-label="Close article"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-3 border-b border-taupe/60 pb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-terracotta font-semibold">
                {activeArticle.category} • {activeArticle.readTime}
              </span>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-charcoal">
                {activeArticle.title}
              </h1>
              <p className="text-xs text-warm-gray font-light">
                By {activeArticle.author} • Published {activeArticle.date}
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full bg-sand rounded-sm overflow-hidden">
              <Image src={activeArticle.image} alt={activeArticle.title} fill className="object-cover" />
            </div>

            <div className="space-y-6 text-sm md:text-base font-light text-warm-gray leading-relaxed">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-taupe/60 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-3 bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium hover:bg-charcoal transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
