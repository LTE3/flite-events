"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[700px] flex items-center overflow-hidden">
      {/* Background: Ken Burns crossfading images */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
          alt="NYC Nightlife"
          fill
          className="object-cover animate-ken-burns-1"
          priority
        />
        <div className="absolute inset-0 animate-crossfade">
          <Image
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80"
            alt="NYC Party"
            fill
            className="object-cover animate-ken-burns-2"
          />
        </div>
        <div className="absolute inset-0 animate-crossfade" style={{ animationDelay: "8s" }}>
          <Image
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
            alt="NYC Concert"
            fill
            className="object-cover animate-ken-burns-1"
            style={{ animationDelay: "3s" }}
          />
        </div>
      </motion.div>

      {/* Overlay: heavy gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 border border-white/10 bg-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-medium tracking-[2px] uppercase text-white/60">NYC Nightlife</span>
          </motion.div>

          {/* Headline — Syne, left-aligned, massive */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] font-800 leading-[0.9] mb-6 tracking-[-0.02em]">
            <AnimatedWord word="Don't" delay={0.4} />{" "}
            <AnimatedWord word="Just" delay={0.5} />{" "}
            <AnimatedWord word="Go" delay={0.6} />{" "}
            <AnimatedWord word="Out." delay={0.7} />
            <br />
            <motion.span
              className="accent-text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Stand Out.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-white/50 mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            Exclusive access to the hottest clubs, rooftop parties, and underground events across NYC — with instant QR code tickets.
          </motion.p>

          {/* CTAs — solid colors, no gradient spam */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
          >
            <Link
              href="/events"
              className="group px-8 py-4 bg-accent text-white font-semibold text-base rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 flex items-center gap-2"
            >
              Find Events <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/admin/create-event"
              className="px-8 py-4 rounded-full font-semibold text-base border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Host an Event
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
