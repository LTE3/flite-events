"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const testimonials = [
  {
    quote: "PulseTix completely changed how we run events. We went from spreadsheets and DMs to a real platform overnight.",
    name: "Marcus Rivera",
    role: "Founder, Night District NYC",
  },
  {
    quote: "The promoter system is a game changer. My team of 12 promoters each have their own links — I see exactly who drives sales.",
    name: "Jasmine Cole",
    role: "Events Director, Vibe Collective",
  },
  {
    quote: "We outgrew Eventbrite pretty quickly. The fees were killing us and we had zero control. PulseTix gave us our brand back.",
    name: "Austin Banks",
    role: "Co-Founder, Rooftop Sessions",
  },
  {
    quote: "QR code scanning at the door is seamless. No more printed lists, no more arguments at the entrance. Just scan and go.",
    name: "Daniela Santos",
    role: "Operations, BK Warehouse Events",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [auto, next]);

  const t = testimonials[active];

  return (
    <section className="py-28 sm:py-40 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-16 sm:mb-20">
            What hosts say
          </p>
        </ScrollReveal>

        <div className="min-h-[280px] sm:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-[-0.02em] mb-10 max-w-5xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-accent rounded-full" />
                <div>
                  <p className="font-semibold text-base">{t.name}</p>
                  <p className="text-sm text-text-dim">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2 mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setAuto(false); }}
              aria-label={`Go to testimonial ${i + 1}`}
              className="relative h-1 flex-1 max-w-[80px] bg-white/10 rounded-full overflow-hidden"
            >
              {i === active && (
                <motion.div
                  className="absolute inset-0 bg-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: auto ? 6 : 0.3, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              )}
              {i < active && (
                <div className="absolute inset-0 bg-accent/40 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
