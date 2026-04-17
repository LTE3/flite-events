"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    <section className="py-28 sm:py-36 bg-bg-card/50 relative">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-4">Testimonials</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em]">
              What hosts are saying
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {/* Stars */}
              <div className="flex gap-1 justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.35] tracking-tight mb-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/[0.08] flex items-center justify-center text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-base">{t.name}</p>
                  <p className="text-sm text-text-dim">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.04] hover:border-white/[0.16] transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.04] hover:border-white/[0.16] transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setIsAutoPlaying(false); }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === active ? "bg-accent" : "bg-white/10 hover:bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
