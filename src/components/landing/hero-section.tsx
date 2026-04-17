"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function AnimatedLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Background: looping video with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow pill */}
          <motion.div
            className="inline-flex items-center gap-2.5 border border-white/[0.08] rounded-full px-4 py-2 bg-white/[0.03] mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs uppercase tracking-[3px] text-white/50 font-medium">
              NYC &middot; Live Events
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7.5vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] mb-8 text-white">
            <AnimatedLine delay={0.5}>
              <span>Don&apos;t Just Go Out.</span>
            </AnimatedLine>
            <AnimatedLine delay={0.7}>
              <span className="text-accent">Stand Out.</span>
            </AnimatedLine>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-white/40 max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            NYC&apos;s best clubs, rooftops, and underground events. QR-coded tickets, delivered instant.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 bg-accent text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5"
            >
              Browse Events
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/admin/create-event"
              className="border border-white/[0.12] bg-white/[0.04] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-0.5"
            >
              Host an Event
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-10 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="text-[10px] uppercase tracking-[3px] text-white/30">Scroll</span>
        <div className="relative w-px h-12 bg-white/20 overflow-hidden">
          <motion.span
            className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
            initial={{ y: -4 }}
            animate={{ y: 48 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.22, 1, 0.36, 1],
              repeatDelay: 0.2,
            }}
          />
        </div>
      </motion.div>

      {/* Bottom fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
