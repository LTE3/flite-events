"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const videos = [
  { name: "Celebration Crowd (OG fire one)", src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4", poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80" },
  { name: "Nightclub Dancing", src: "https://videos.pexels.com/video-files/4043975/4043975-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "DJ Turntables Close-Up", src: "https://videos.pexels.com/video-files/4043976/4043976-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "DJ Performing in Club", src: "https://videos.pexels.com/video-files/16476271/16476271-hd_1920_1080_60fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Rave Party Crowd", src: "https://videos.pexels.com/video-files/14670415/14670415-hd_1920_1080_24fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "People Partying at Club", src: "https://videos.pexels.com/video-files/9003382/9003382-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Concert Crowd Phone Lights", src: "https://videos.pexels.com/video-files/12695733/12695733-hd_1920_1080_24fps.mp4", poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80" },
  { name: "DJ + Dancing Crowd", src: "https://videos.pexels.com/video-files/3582369/3582369-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "DJ Mixer Close-Up", src: "https://videos.pexels.com/video-files/4043984/4043984-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "DJ Playing to Crowd", src: "https://videos.pexels.com/video-files/7722351/7722351-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Party Scene", src: "https://videos.pexels.com/video-files/2022395/2022395-uhd_2560_1440_30fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Nightclub Dancing 2", src: "https://videos.pexels.com/video-files/7269151/7269151-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Party Dancing", src: "https://videos.pexels.com/video-files/9006058/9006058-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Disco Crowd Dancing", src: "https://videos.pexels.com/video-files/3580092/3580092-hd_1920_1080_24fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Disco Ball Hall", src: "https://videos.pexels.com/video-files/2487916/2487916-hd_1920_1080_24fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "DJ Booth in Club", src: "https://videos.pexels.com/video-files/4022268/4022268-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Rave Crowd Neon", src: "https://videos.pexels.com/video-files/9455256/9455256-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Rooftop Dancing", src: "https://videos.pexels.com/video-files/7502734/7502734-hd_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80" },
  { name: "Concert Crowd 2", src: "https://videos.pexels.com/video-files/26744705/11999048_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80" },
  { name: "Concert Crowd Jumping", src: "https://videos.pexels.com/video-files/26744649/11999035_1920_1080_25fps.mp4", poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80" },
];

export default function PreviewPage() {
  const [current, setCurrent] = useState(0);
  const v = videos[current];

  function go(dir: number) {
    setCurrent((p) => (p + dir + videos.length) % videos.length);
  }

  return (
    <div className="relative">
      {/* The hero — same layout every time, different video */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden" key={current}>
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={v.poster}
            className="absolute inset-0 w-full h-full object-cover"
            key={v.src}
          >
            <source src={v.src} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Accent line at top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-accent z-20" />

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* Live indicator */}
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
              <span className="text-sm tracking-wide text-white/60 font-medium">New York City</span>
              <span className="h-px flex-1 bg-white/10 max-w-[120px]" />
            </motion.div>

            {/* Giant headline */}
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.85] tracking-[-0.04em] text-white mb-8">
              <span className="block">EVERY</span>
              <span className="block text-accent">NIGHT</span>
              <span className="block">OUT.</span>
            </h1>

            {/* Subtitle + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 sm:gap-12">
              <p className="text-white/40 text-lg sm:text-xl max-w-md leading-relaxed">
                Clubs, rooftops, warehouse parties. Every door in the city — one&nbsp;ticket.
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-3 bg-accent text-black font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
                >
                  Browse Events
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/admin/create-event"
                  className="inline-flex items-center gap-2 border border-white/15 bg-white/5 font-semibold px-7 py-4 rounded-full text-base transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Host
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={20} className="text-white/30" />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none z-[5]" />
      </section>

      {/* Fixed video switcher controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/85 backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 shadow-2xl max-w-[90vw]">
        <button
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
          aria-label="Previous video"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center min-w-[160px] sm:min-w-[220px] px-2">
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Video {current + 1} / {videos.length}</p>
          <p className="text-sm font-bold truncate">{v.name}</p>
        </div>
        <button
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
          aria-label="Next video"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
