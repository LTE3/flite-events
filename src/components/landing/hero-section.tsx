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
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            background: i % 3 === 0 ? "#6C63FF" : i % 3 === 1 ? "#00E5A0" : "#ffffff",
            boxShadow: i % 3 === 0
              ? "0 0 6px 2px rgba(108,99,255,0.6)"
              : i % 3 === 1
              ? "0 0 6px 2px rgba(0,229,160,0.6)"
              : "0 0 4px 1px rgba(255,255,255,0.4)",
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + "s",
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
        initial={{ y: "120%", rotateX: -90, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: "0%", rotateX: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.9,
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
    <motion.span
      className="relative inline-block"
      animate={{
        textShadow: [
          "0 0 20px rgba(108,99,255,0.5), 0 0 60px rgba(108,99,255,0.3), 0 0 100px rgba(0,229,160,0.2)",
          "0 0 40px rgba(108,99,255,0.8), 0 0 80px rgba(108,99,255,0.5), 0 0 120px rgba(0,229,160,0.4)",
          "0 0 20px rgba(108,99,255,0.5), 0 0 60px rgba(108,99,255,0.3), 0 0 100px rgba(0,229,160,0.2)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
    >
      <span className="gradient-text">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 40, filter: "blur(16px)", scale: 0.5 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}

function AnimatedStat({ num, label, delay }: { num: string; label: string; delay: number }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 40, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, type: "spring", bounce: 0.3 }}
    >
      <motion.p
        className="text-3xl sm:text-4xl font-black"
        initial={{ filter: "blur(12px)" }}
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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Layer 1: Parallax Ken Burns images */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
          alt="NYC Nightlife"
          fill
          className="object-cover animate-ken-burns-1 saturate-[1.3]"
          priority
        />
        <div className="absolute inset-0 animate-crossfade">
          <Image
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80"
            alt="NYC Party"
            fill
            className="object-cover animate-ken-burns-2 saturate-[1.3]"
          />
        </div>
        <div className="absolute inset-0 animate-crossfade" style={{ animationDelay: "8s" }}>
          <Image
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
            alt="NYC Concert"
            fill
            className="object-cover animate-ken-burns-1 saturate-[1.3]"
            style={{ animationDelay: "3s" }}
          />
        </div>
      </motion.div>

      {/* Layer 2: Dark overlays — less dark so aurora shows through */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black z-[1]" />

      {/* Layer 3: Aurora blobs — NOW MUCH MORE VISIBLE */}
      <AuroraBackground />

      {/* Layer 4: Color-tinted stars */}
      <TwinklingStars />

      {/* Layer 5: Dual spotlights — BIGGER */}
      <Spotlight className="-top-20 -left-20 md:left-40 md:-top-10 z-[2]" fill="#6C63FF" />
      <Spotlight className="top-0 -right-40 md:right-20 md:-top-10 z-[2]" fill="#00E5A0" />

      {/* Layer 6: More meteors */}
      <div className="absolute inset-0 overflow-hidden z-[2] pointer-events-none">
        <Meteors number={25} />
      </div>

      {/* Layer 7: Interactive particles */}
      <ParticleField className="z-[3]" />

      {/* Layer 8: Noise + vignette */}
      <div className="noise absolute inset-0 z-[4]" />
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)" }}
      />

      {/* Animated color sweep across bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 z-[6]"
        style={{
          background: "linear-gradient(90deg, #6C63FF, #00E5A0, #FF3CAA, #6C63FF)",
          backgroundSize: "300% 100%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{ y: contentY, opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full mb-10 border border-accent/30 bg-accent/10 backdrop-blur-xl"
          initial={{ opacity: 0, y: 30, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-2 shadow-[0_0_10px_rgba(0,229,160,0.8)]" />
          </span>
          <span className="text-xs font-bold tracking-[3px] uppercase text-white/80">NYC&apos;s Premier Nightlife Platform</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-8xl lg:text-[6.5rem] font-black leading-[0.88] mb-8 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <AnimatedWord word="Don't" delay={0.5} />{" "}
          <AnimatedWord word="Just" delay={0.65} />{" "}
          <AnimatedWord word="Go" delay={0.8} />{" "}
          <AnimatedWord word="Out." delay={0.95} />
          <br />
          <GlowingGradientText text="Stand Out." delay={1.2} />
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-white/70 mb-14 max-w-2xl mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Exclusive access to the hottest clubs, rooftop parties, and underground events across Manhattan, Brooklyn, and Queens — with instant QR code tickets.
        </motion.p>

        {/* CTA — with BREATHING GLOW */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9 }}
        >
          <MagneticButton strength={0.3}>
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(108,99,255,0.4), 0 0 60px rgba(108,99,255,0.2)",
                  "0 0 40px rgba(108,99,255,0.7), 0 0 80px rgba(108,99,255,0.4), 0 0 120px rgba(0,229,160,0.2)",
                  "0 0 20px rgba(108,99,255,0.4), 0 0 60px rgba(108,99,255,0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full"
            >
              <Link
                href="/events"
                className="group px-12 py-5 gradient-bg text-black font-extrabold text-lg rounded-full transition-all duration-300 hover:-translate-y-1.5 active:translate-y-0 flex items-center gap-3 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Find Events <ArrowRight size={20} strokeWidth={3} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
              </Link>
            </motion.div>
          </MagneticButton>
          <MagneticButton strength={0.3}>
            <Link
              href="/admin/create-event"
              className="px-12 py-5 rounded-full font-extrabold text-lg border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Host an Event
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats — BIGGER */}
        <div className="flex items-center justify-center gap-12 sm:gap-20">
          <AnimatedStat num="500+" label="Events Hosted" delay={2.1} />
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <AnimatedStat num="25K+" label="Tickets Sold" delay={2.3} />
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <AnimatedStat num="4.9★" label="Rating" delay={2.5} />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-accent to-accent-2"
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.span
          className="text-[10px] uppercase tracking-[3px] text-text-dim/50"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
