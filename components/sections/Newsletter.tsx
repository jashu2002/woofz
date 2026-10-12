"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitted");
  };

  return (
    <section className="py-24 md:py-32 bg-sand/40 text-charcoal border-t border-taupe/40">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
        <FadeIn direction="up" distance={20}>
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-terracotta block">
            STAY INFORMED
          </span>
        </FadeIn>

        <FadeIn direction="up" distance={30} delay={0.1}>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-charcoal">
            Make room for comfort.
          </h2>
        </FadeIn>

        <FadeIn direction="up" distance={30} delay={0.2}>
          <p className="text-base md:text-lg text-warm-gray font-light max-w-lg mx-auto">
            Receive private release invitations, architectural pet design essays, and material stories directly in your inbox.
          </p>
        </FadeIn>

        <FadeIn direction="up" distance={30} delay={0.3}>
          {status === "submitted" ? (
            <div className="p-6 bg-ivory text-terracotta border border-taupe rounded-sm max-w-md mx-auto">
              <p className="font-serif-display text-xl mb-1">Welcome to WOofe.</p>
              <p className="text-xs text-warm-gray">You are subscribed to our private journal updates.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-5 py-4 bg-ivory border border-taupe text-charcoal text-sm focus:outline-none focus:border-terracotta transition-colors placeholder:text-warm-gray/60"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-espresso text-ivory text-xs uppercase tracking-[0.18em] font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
              >
                <span>JOIN</span>
                <ArrowRight className="w-4 h-4 text-terracotta" />
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
