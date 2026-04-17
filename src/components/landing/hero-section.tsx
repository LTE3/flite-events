"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* Full-screen video background */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/2022395/2022395-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Heavy dark overlay — text readability first */}
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

      {/* Accent line at very top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent z-20" />

      {/* Main content — vertically centered */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Top line — live indicator */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-sm tracking-wide text-white/60 font-medium">
              New York City
            </span>
            <span className="h-px flex-1 bg-white/10 max-w-[120px]" />
          </motion.div>

          {/* Giant headline — takes up most of the screen */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.85] tracking-[-0.04em] text-white mb-8">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              EVERY
            </motion.span>
            <motion.span
              className="block text-accent"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              NIGHT
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              OUT.
            </motion.span>
          </h1>

          {/* Subtitle + CTA row */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-white/40 text-lg sm:text-xl max-w-md leading-relaxed">
              Clubs, rooftops, warehouse parties. Every door in the city — one&nbsp;ticket.
            </p>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/events"
                className="group inline-flex items-center gap-3 bg-accent text-black font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
              >
                Browse Events
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/admin/create-event"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 font-semibold px-7 py-4 rounded-full text-base transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Host
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
