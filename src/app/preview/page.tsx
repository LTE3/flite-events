"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

// All verified working (200 OK) as of build time
const videos = [
  { name: "1 · Celebration Crowd (OG fire)", src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" },
  { name: "2 · DJ in Dark Club", src: "https://videos.pexels.com/video-files/16476271/16476271-hd_1920_1080_60fps.mp4" },
  { name: "3 · Club Partying", src: "https://videos.pexels.com/video-files/9003382/9003382-hd_1920_1080_25fps.mp4" },
  { name: "4 · Rave Party Crowd", src: "https://videos.pexels.com/video-files/14670415/14670415-hd_1920_1080_24fps.mp4" },
  { name: "5 · Concert Phone Lights", src: "https://videos.pexels.com/video-files/12695733/12695733-hd_1920_1080_24fps.mp4" },
  { name: "6 · DJ + Dancing Crowd", src: "https://videos.pexels.com/video-files/3582369/3582369-hd_1920_1080_25fps.mp4" },
  { name: "7 · Nightclub Dancing", src: "https://videos.pexels.com/video-files/7269151/7269151-hd_1920_1080_25fps.mp4" },
  { name: "8 · Party Dancing", src: "https://videos.pexels.com/video-files/9006058/9006058-hd_1920_1080_25fps.mp4" },
  { name: "9 · Party Scene", src: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4" },
  { name: "10 · DJ Set", src: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4" },
  { name: "11 · Neon Party Lights", src: "https://videos.pexels.com/video-files/4990246/4990246-hd_1920_1080_30fps.mp4" },
  { name: "12 · Rooftop Party", src: "https://videos.pexels.com/video-files/7502734/7502734-hd_1920_1080_30fps.mp4" },
  { name: "13 · Concert Crowd", src: "https://videos.pexels.com/video-files/26744705/11999048_1920_1080_25fps.mp4" },
  { name: "14 · Concert Jumping", src: "https://videos.pexels.com/video-files/26744649/11999035_1920_1080_25fps.mp4" },
];

const POSTER = "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80";

function VideoPlayer({ src, onError }: { src: string; onError: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = ref.current;
    if (!vid) return;
    vid.load();
    const handleError = () => onError();
    vid.addEventListener("error", handleError);
    const source = vid.querySelector("source");
    if (source) source.addEventListener("error", handleError);
    return () => {
      vid.removeEventListener("error", handleError);
      if (source) source.removeEventListener("error", handleError);
    };
  }, [src, onError]);

  return (
    <video ref={ref} autoPlay muted loop playsInline poster={POSTER} className="absolute inset-0 w-full h-full object-cover">
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function PreviewPage() {
  const [current, setCurrent] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const v = videos[current];

  function go(dir: number) {
    setVideoError(false);
    setCurrent((p) => (p + dir + videos.length) % videos.length);
  }

  return (
    <div className="relative">
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
        <div className="absolute inset-0">
          <VideoPlayer key={v.src} src={v.src} onError={() => setVideoError(true)} />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="absolute top-0 inset-x-0 h-[2px] bg-accent z-20" />

        {videoError && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-danger/20 border border-danger/30 rounded-full px-4 py-2 text-sm text-danger">
            <AlertCircle size={14} />
            Video didn&apos;t load — showing poster
          </div>
        )}

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16">
          <div className="max-w-[1400px] mx-auto w-full">
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

            <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.85] tracking-[-0.04em] text-white mb-8">
              <span className="block">EVERY</span>
              <span className="block text-accent">NIGHT</span>
              <span className="block">OUT.</span>
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 sm:gap-12">
              <p className="text-white/40 text-lg sm:text-xl max-w-md leading-relaxed">
                Clubs, rooftops, warehouse parties. Every door in the city — one&nbsp;ticket.
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <Link href="/events" className="group inline-flex items-center gap-3 bg-accent text-black font-bold px-8 py-4 rounded-full text-base">
                  Browse Events <ArrowRight size={18} />
                </Link>
                <Link href="/admin/create-event" className="inline-flex items-center gap-2 border border-white/15 bg-white/5 font-semibold px-7 py-4 rounded-full text-base">
                  Host
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={20} className="text-white/30" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none z-[5]" />
      </section>

      {/* VIDEO SWITCHER */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-black/90 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-2xl max-w-[95vw]">
        <button onClick={() => go(-1)} className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all shrink-0" aria-label="Previous video">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center min-w-[160px] sm:min-w-[220px] px-3">
          <p className="text-[10px] text-accent uppercase tracking-wider font-bold mb-0.5">
            {current + 1} of {videos.length}
          </p>
          <p className="text-sm font-bold truncate">{v.name}</p>
        </div>
        <button onClick={() => go(1)} className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all shrink-0" aria-label="Next video">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
