"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AuroraBackground } from "./aurora-bg";
import { ParticleField } from "./particle-field";
import { Spotlight } from "@/components/ui/spotlight";
import { Meteors } from "@/components/ui/meteors";
import { MagneticButton } from "@/components/motion/magnetic-button";

function TwinklingStars() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + "px",
            height: Math.random() * 2 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + "s",
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotateX: -80, opacity: 0 }}
        animate={{ y: "0%", rotateX: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

function GlowingGradientText({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="gradient-text relative">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 30, filter: "blur(12px)", scale: 0.8 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      {/* Glow behind text */}
      <motion.span
        className="absolute inset-0 gradient-text blur-2xl opacity-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 2, delay: delay + 0.5, ease: "easeOut" }}
        aria-hidden
      >
        {text}
      </motion.span>
    </span>
  );
}

function AnimatedStat({ num, label, delay }: { num: string; label: string; delay: number }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <motion.p
        className="text-2xl sm:text-3xl font-black"
        initial={{ filter: "blur(10px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      >
        {num}
      </motion.p>
      <p className="text-[11px] uppercase tracking-[2px] text-text-dim mt-1">{label}</p>
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Layer 1: Parallax Ken Burns images */}
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

      {/* Layer 2: Heavy dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/8 to-accent-2/5 z-[1]" />

      {/* Layer 3: Aurora animated blobs */}
      <AuroraBackground />

      {/* Layer 4: Twinkling stars */}
      <TwinklingStars />

      {/* Layer 5: Spotlight beam */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 z-[2]" fill="#6C63FF" />
      <Spotlight className="-top-40 right-0 md:right-60 md:-top-20 z-[2]" fill="#00E5A0" />

      {/* Layer 6: Meteors */}
      <div className="absolute inset-0 overflow-hidden z-[2] pointer-events-none">
        <Meteors number={15} />
      </div>

      {/* Layer 7: Interactive particles */}
      <ParticleField className="z-[3]" />

      {/* Layer 8: Noise texture */}
      <div className="noise absolute inset-0 z-[4]" />

      {/* Layer 9: Radial vignette */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Content */}
      <motion.div className="relative z-10 max-w-5xl mx-auto text-center" style={{ y: contentY, opacity }}>
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-5 py-2 glass-strong rounded-full mb-10"
          initial={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-2" />
          </span>
          <span className="text-xs font-semibold tracking-[2px] uppercase text-text-dim">NYC&apos;s Premier Nightlife Platform</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.92] mb-7">
          <AnimatedWord word="Don't" delay={0.5} />{" "}
          <AnimatedWord word="Just" delay={0.6} />{" "}
          <AnimatedWord word="Go" delay={0.7} />{" "}
          <AnimatedWord word="Out." delay={0.8} />
          <br />
          <GlowingGradientText text="Stand Out." delay={1.1} />
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-text-dim/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
        >
          Exclusive access to the hottest clubs, rooftop parties, and underground events across Manhattan, Brooklyn, and Queens — with instant QR code tickets.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <MagneticButton strength={0.25}>
            <Link
              href="/events"
              className="group px-10 py-4 gradient-bg text-black font-bold text-base rounded-full transition-all duration-300 hover:shadow-[0_0_60px_rgba(108,99,255,0.6)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Find Events <ArrowRight size={18} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <Link
              href="/admin/create-event"
              className="px-10 py-4 glass-strong rounded-full font-bold text-base hover:bg-white/[0.12] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Host an Event
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 sm:gap-16">
          <AnimatedStat num="500+" label="Events Hosted" delay={2.0} />
          <AnimatedStat num="25K+" label="Tickets Sold" delay={2.2} />
          <AnimatedStat num="4.9★" label="Rating" delay={2.4} />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-accent to-accent-2"
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.span
          className="text-[10px] uppercase tracking-[3px] text-text-dim/50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
