"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const testimonials = [
  {
    quote: "PulseTix completely changed how we run events. We went from spreadsheets and DMs to a real platform overnight. Our ticket sales doubled in the first month.",
    name: "Marcus Rivera",
    role: "Founder, Night District NYC",
    avatar: "MR",
  },
  {
    quote: "The promoter system is a game changer. My team of 12 promoters each have their own links, I can see exactly who's driving sales, and payouts are automatic.",
    name: "Jasmine Cole",
    role: "Events Director, Vibe Collective",
    avatar: "JC",
  },
  {
    quote: "We outgrew Eventbrite pretty quickly. The fees were killing us and we had zero control over the experience. PulseTix gave us our brand back.",
    name: "Austin Banks",
    role: "Co-Founder, Rooftop Sessions",
    avatar: "AB",
  },
  {
    quote: "QR code scanning at the door is seamless. No more printed lists, no more arguments at the entrance. Just scan and go. Our door team loves it.",
    name: "Daniela Santos",
    role: "Operations, BK Warehouse Events",
    avatar: "DS",
  },
  {
    quote: "I was skeptical about switching platforms mid-season but the migration was painless. Within a week we had everything running smoother than before.",
    name: "Kevin Okafor",
    role: "Promoter, Afrobeats NYC",
    avatar: "KO",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  function go(dir: number) {
    setIsAutoPlaying(false);
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }

  const t = testimonials[active];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="mb-20">
            <p className="text-xs font-bold uppercase tracking-[4px] text-accent mb-4">Testimonials</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Trusted by NYC&apos;s <span className="accent-text">Top Hosts</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Big quote */}
        <div className="relative min-h-[300px]">
          {/* Giant quote mark */}
          <Quote size={120} className="absolute -top-6 -left-4 text-accent/10 rotate-180" strokeWidth={1} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text — BIG */}
              <blockquote className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.3] mb-10 max-w-4xl tracking-tight">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-lg">{t.name}</p>
                  <p className="text-sm text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="absolute right-0 top-0 flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/[0.08] hover:border-white/20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setIsAutoPlaying(false); }}
              className="relative h-1 flex-1 rounded-full bg-white/10 overflow-hidden"
            >
              {i === active && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  key={`progress-${active}`}
                />
              )}
              {i < active && (
                <div className="absolute inset-0 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
