"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "./aurora-bg";
import { ParticleField } from "./particle-field";
import { TextReveal, GradientTextReveal, CountUp } from "@/components/motion/text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Layer 1: Ken Burns background images */}
      <div className="absolute inset-0">
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
      </div>

      {/* Layer 2: Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent-2/5" />

      {/* Layer 3: Aurora blobs */}
      <AuroraBackground />

      {/* Layer 4: Interactive particles */}
      <ParticleField className="z-[1]" />

      {/* Layer 5: Noise texture */}
      <div className="noise absolute inset-0 z-[2]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-5 py-2 glass-strong rounded-full mb-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-2" />
          </span>
          <span className="text-xs font-semibold tracking-[2px] uppercase text-text-dim">NYC&apos;s Premier Nightlife Platform</span>
        </motion.div>

        {/* Headline with word-by-word reveal */}
        <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.92] mb-7">
          <TextReveal text="Don't Just Go Out." delay={0.4} />
          <br />
          <GradientTextReveal text="Stand Out." delay={0.9} />
        </h1>

        {/* Subtitle with blur-in */}
        <motion.p
          className="text-lg sm:text-xl text-text-dim/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Exclusive access to the hottest clubs, rooftop parties, and underground events across Manhattan, Brooklyn, and Queens — with instant QR code tickets.
        </motion.p>

        {/* CTA buttons with magnetic effect */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <MagneticButton strength={0.2}>
            <Link
              href="/events"
              className="px-10 py-4 gradient-bg text-black font-bold text-base rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(108,99,255,0.6)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Find Events <ArrowRight size={18} />
              </span>
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              href="/admin/create-event"
              className="px-10 py-4 glass-strong rounded-full font-bold text-base hover:bg-white/[0.1] transition-all duration-300 hover:-translate-y-1"
            >
              Host an Event
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Stats with count-up */}
        <motion.div
          className="flex items-center justify-center gap-10 sm:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          {[
            { num: "500+", label: "Events Hosted" },
            { num: "25K+", label: "Tickets Sold" },
            { num: "4.9★", label: "Rating" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-black">
                <CountUp target={stat.num} delay={2 + i * 0.2} />
              </p>
              <p className="text-[11px] uppercase tracking-[2px] text-text-dim mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          className="w-5 h-9 rounded-full border border-white/15 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2.5 rounded-full bg-gradient-to-b from-accent to-accent-2"
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
