"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const VIDEO_URL = "https://videos.pexels.com/video-files/4043975/4043975-hd_1920_1080_25fps.mp4";
const POSTER = "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80";
const PHOTOS = [
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
];

function Vid({ className = "" }: { className?: string }) {
  return (
    <video autoPlay muted loop playsInline poster={POSTER} className={`object-cover ${className}`}>
      <source src={VIDEO_URL} type="video/mp4" />
    </video>
  );
}

function CTA({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href="/events" className={`px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 ${dark ? "bg-black text-white" : "bg-accent text-black"}`}>
        Browse Events
      </Link>
      <Link href="/admin/create-event" className={`px-7 py-3.5 rounded-full font-semibold text-sm border transition-all hover:-translate-y-0.5 ${dark ? "border-black/20 text-black hover:bg-black/5" : "border-white/15 text-white hover:bg-white/10"}`}>
        Host
      </Link>
    </div>
  );
}

// ─── VARIANT 1: Stacked Giant (current) ───
function V1() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-black/65" /></div>
      <div className="absolute top-0 inset-x-0 h-[2px] bg-accent z-20" />
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-white/60 font-medium">New York City</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.85] tracking-[-0.04em] text-white mb-8">
            EVERY<br /><span className="text-accent">NIGHT</span><br />OUT.
          </h1>
          <p className="text-white/40 text-lg max-w-md mb-10">Clubs, rooftops, warehouse parties. Every door in the city — one ticket.</p>
          <CTA />
        </div>
      </div>
    </section>
  );
}

// ─── VARIANT 2: Split Screen ───
function V2() {
  return (
    <section className="relative min-h-[100dvh] flex overflow-hidden">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Vid className="w-full h-full absolute inset-0" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="flex-1 bg-bg flex items-center px-8 sm:px-16 lg:px-20">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-[4px] text-text-dim">NYC · Live</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-black tracking-[-0.04em] leading-[0.9] mb-6">
            The night<br />is <span className="text-accent">yours</span>.
          </h1>
          <p className="text-text-dim text-lg mb-10 leading-relaxed max-w-md">
            Every club, rooftop, and underground party in one place. QR tickets, instant delivery.
          </p>
          <CTA />
        </div>
      </div>
      <div className="lg:hidden absolute inset-0 -z-10"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-bg/90" /></div>
    </section>
  );
}

// ─── VARIANT 3: Centered Minimal ───
function V3() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-black/75" /></div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-xs uppercase tracking-[6px] text-accent mb-8 font-medium">New York City</p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-6">
          Don&apos;t just go out.<br /><span className="text-accent">Stand out.</span>
        </h1>
        <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">The city&apos;s best nights, one ticket away.</p>
        <div className="flex justify-center"><CTA /></div>
      </div>
    </section>
  );
}

// ─── VARIANT 4: Marquee Text ───
function V4() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-black/50" /></div>
      <div className="relative z-10 overflow-hidden mb-8">
        <motion.div className="flex whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-[family-name:var(--font-display)] text-[clamp(4rem,15vw,14rem)] font-black tracking-[-0.04em] text-white/90 mx-4">
              EVERY NIGHT OUT · <span className="text-accent">EVERY NIGHT OUT</span> ·{" "}
            </span>
          ))}
        </motion.div>
      </div>
      <div className="relative z-10 px-6 sm:px-16 pb-12 flex items-end justify-between gap-8">
        <p className="text-white/50 text-base max-w-sm">NYC&apos;s clubs, rooftops, and underground events. One ticket.</p>
        <CTA />
      </div>
    </section>
  );
}

// ─── VARIANT 5: Editorial ───
function V5() {
  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" /></div>
      <div className="relative z-10 px-6 sm:px-16 pb-16 pt-32 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-xs uppercase tracking-[4px] text-accent mb-4 font-semibold">Issue 01 · NYC Nightlife</p>
            <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl font-black tracking-[-0.04em] leading-[0.85]">
              After<br />Dark
            </h1>
          </div>
          <div className="lg:max-w-md">
            <p className="text-white/50 text-base leading-relaxed mb-8">
              The definitive guide to what&apos;s happening tonight. Every club, every rooftop, every underground spot. QR-coded tickets delivered to your phone.
            </p>
            <CTA />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VARIANT 6: Brutalist ───
function V6() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent hidden lg:block" />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 w-full relative z-10">
        <p className="text-xs uppercase tracking-[6px] text-text-dim mb-12 font-bold">PulseTix · NYC · 2026</p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,10rem)] font-black tracking-[-0.05em] leading-[0.85] mb-12">
          <span className="text-text">EVERY</span><br />
          <span className="text-text">NIGHT</span><br />
          <span className="lg:text-black text-accent">OUT.</span>
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <CTA />
          <span className="text-text-dim text-sm">Tickets · Events · NYC</span>
        </div>
      </div>
    </section>
  );
}

// ─── VARIANT 7: Cinematic Letterbox ───
function V7() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-black">
      <div className="h-24 sm:h-32 bg-black flex items-center px-6 sm:px-16 z-10">
        <span className="text-xs uppercase tracking-[6px] text-white/30 font-bold">PulseTix · New York</span>
      </div>
      <div className="flex-1 relative">
        <Vid className="w-full h-full absolute inset-0" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="bg-black px-6 sm:px-16 py-8 sm:py-10 z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-3">
            Every night out<span className="text-accent">.</span>
          </h1>
          <p className="text-white/40 text-sm max-w-md">The city never sleeps. Neither do we.</p>
        </div>
        <CTA />
      </div>
    </section>
  );
}

// ─── VARIANT 8: Photo Collage ───
function V8() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 opacity-30">
        {PHOTOS.map((src, i) => (
          <div key={i} className="relative"><Image src={src} alt="" fill className="object-cover" sizes="33vw" /></div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/60 to-bg/90" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-16 w-full">
        <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-8">
          PULSE<span className="text-accent">TIX</span>
        </h1>
        <p className="text-text-dim text-xl max-w-lg mb-10 leading-relaxed">
          Every club. Every rooftop. Every underground spot in NYC. One ticket.
        </p>
        <CTA />
      </div>
    </section>
  );
}

// ─── VARIANT 9: Single Word ───
function V9() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-black/80" /></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(5rem,20vw,18rem)] font-black tracking-[-0.06em] leading-[0.8] text-white">
          PULSE<span className="text-accent">.</span>
        </h1>
        <p className="text-white/30 text-sm sm:text-base tracking-[4px] uppercase mt-4 mb-12">New York City · Nightlife · Tickets</p>
        <div className="flex justify-center"><CTA /></div>
      </div>
    </section>
  );
}

// ─── VARIANT 10: Vertical Text ───
function V10() {
  return (
    <section className="relative min-h-[100dvh] flex overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-black/60" /></div>
      <div className="relative z-10 flex w-full">
        <div className="hidden sm:flex items-center justify-center w-20 lg:w-28 border-r border-white/10 shrink-0">
          <span className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[6px] text-white/40 font-bold rotate-180" style={{ writingMode: "vertical-lr" }}>
            PulseTix · New York City · 2026
          </span>
        </div>
        <div className="flex-1 flex items-center px-8 sm:px-16">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.88] mb-8">
              The city<br />doesn&apos;t<br /><span className="text-accent">sleep.</span>
            </h1>
            <p className="text-white/40 text-lg max-w-md mb-10">Neither should you. Every event, every night, one ticket.</p>
            <CTA />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VARIANT 11: Countdown ───
function V11() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-black/70" /></div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-16 w-full">
        <p className="text-xs uppercase tracking-[4px] text-accent mb-6 font-semibold">Next Event</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-tight mb-8">
          Warehouse Rave:<br />Techno Edition
        </h1>
        <div className="flex gap-6 mb-10">
          {[{ n: "02", l: "Days" }, { n: "14", l: "Hours" }, { n: "37", l: "Min" }].map((t) => (
            <div key={t.l} className="text-center">
              <span className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-black text-accent tabular-nums">{t.n}</span>
              <p className="text-xs uppercase tracking-[3px] text-white/40 mt-1">{t.l}</p>
            </div>
          ))}
        </div>
        <CTA />
      </div>
    </section>
  );
}

// ─── VARIANT 12: Neon Glow ───
function V12() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-20"><Vid className="w-full h-full" /></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mb-6"
          style={{ textShadow: "0 0 60px rgba(45,212,191,0.5), 0 0 120px rgba(45,212,191,0.2)" }}>
          <span className="text-accent">EVERY</span><br />
          <span className="text-white">NIGHT</span><br />
          <span className="text-accent">OUT</span>
        </h1>
        <p className="text-white/30 text-base mb-10 max-w-md mx-auto">NYC nightlife. One platform. One ticket.</p>
        <div className="flex justify-center"><CTA /></div>
      </div>
    </section>
  );
}

// ─── VARIANT 13: Film Strip ───
function V13() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 w-full mb-12">
        <p className="text-xs uppercase tracking-[4px] text-accent mb-4 font-semibold">NYC Nightlife</p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.88] mb-6">
          Your night.<br /><span className="text-accent">Sorted.</span>
        </h1>
        <p className="text-text-dim text-lg max-w-md mb-8">Every club, rooftop, and warehouse party in the city.</p>
        <CTA />
      </div>
      <div className="overflow-hidden">
        <motion.div className="flex gap-3" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {[...PHOTOS, ...PHOTOS].map((src, i) => (
            <div key={i} className="relative w-[280px] aspect-[3/4] rounded-xl overflow-hidden shrink-0">
              <Image src={src} alt="" fill className="object-cover" sizes="280px" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── VARIANT 14: Two-Tone ───
function V14() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-accent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-16 w-full">
        <p className="text-xs uppercase tracking-[4px] text-text-dim mb-6 font-bold">PulseTix · NYC</p>
        <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.85] mb-10">
          EVERY<br />NIGHT<br />OUT.
        </h1>
        <CTA dark />
      </div>
    </section>
  );
}

// ─── VARIANT 15: Magazine Cover ───
function V15() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" /></div>
      <div className="relative z-10 px-6 sm:px-16 pt-8 flex items-center justify-between">
        <span className="font-[family-name:var(--font-display)] text-2xl font-black tracking-[-0.04em]">
          PULSE<span className="text-accent">TIX</span>
        </span>
        <span className="text-xs uppercase tracking-[4px] text-white/40">April 2026</span>
      </div>
      <div className="relative z-10 flex-1 flex items-end px-6 sm:px-16 pb-16">
        <div className="max-w-lg">
          <p className="text-accent text-xs uppercase tracking-[4px] font-bold mb-3">Cover Story</p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-black tracking-[-0.03em] leading-[0.9] mb-4">
            The New Nightlife
          </h1>
          <p className="text-white/50 text-base mb-8 leading-relaxed">How NYC&apos;s underground scene is taking over — and how to get in.</p>
          <CTA />
        </div>
      </div>
    </section>
  );
}

// ─── VARIANT 16: Stacked Cards ───
function V16() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[4px] text-accent mb-6 font-bold">NYC Nightlife</p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-black tracking-[-0.04em] leading-[0.88] mb-6">
            One city.<br />One <span className="text-accent">ticket</span>.
          </h1>
          <p className="text-text-dim text-lg max-w-md mb-10 leading-relaxed">
            Clubs, rooftops, underground raves. QR-coded tickets delivered to your phone.
          </p>
          <CTA />
        </div>
        <div className="relative h-[500px] hidden lg:block">
          {PHOTOS.slice(0, 3).map((src, i) => (
            <div key={i} className="absolute rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{
              width: "300px", height: "400px",
              top: `${i * 20}px`, left: `${i * 40}px`,
              transform: `rotate(${(i - 1) * 6}deg)`,
              zIndex: 3 - i,
            }}>
              <Image src={src} alt="" fill className="object-cover" sizes="300px" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── VARIANT 17: Oversized Accent Block ───
function V17() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-accent">
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-bg" />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 w-full relative z-10">
        <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-[-0.05em] leading-[0.82] mb-8">
          <span className="text-white">GO</span><br />
          <span className="text-black">OUT.</span>
        </h1>
        <p className="text-black/60 text-lg max-w-md mb-10">NYC nightlife, one tap. Every club, every rooftop, every underground party.</p>
        <CTA dark />
      </div>
    </section>
  );
}

// ─── VARIANT 18: Grid Typography ───
function V18() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {["CLUBS", "ROOFTOPS", "WAREHOUSE", "PARTIES"].map((word, i) => (
            <div key={word} className={`aspect-square rounded-2xl flex items-center justify-center p-4 ${i === 1 ? "bg-accent" : "bg-bg-card border border-white/[0.06]"}`}>
              <span className={`font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black tracking-tight ${i === 1 ? "text-black" : "text-white"}`}>
                {word}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl font-black tracking-[-0.03em] leading-[0.9] mb-3">
              Every night out<span className="text-accent">.</span>
            </h1>
            <p className="text-text-dim text-base max-w-md">NYC nightlife, one ticket. QR-coded, instant delivery.</p>
          </div>
          <CTA />
        </div>
      </div>
    </section>
  );
}

// ─── VARIANT 19: Window Peek ───
function V19() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-bg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[70vw] h-[60vh] max-w-3xl rounded-3xl overflow-hidden relative">
          <Vid className="w-full h-full absolute inset-0" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
      <div className="relative z-10 text-center px-6">
        <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.85] mb-6 text-white mix-blend-difference">
          EVERY<br />NIGHT<br />OUT<span className="text-accent">.</span>
        </h1>
        <div className="flex justify-center mt-10"><CTA /></div>
      </div>
    </section>
  );
}

// ─── VARIANT 20: Horizontal Lines ───
function V20() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0"><Vid className="w-full h-full" /><div className="absolute inset-0 bg-black/70" /></div>
      <div className="relative z-10 w-full">
        {["EVERY", "NIGHT", "OUT."].map((word, i) => (
          <div key={word} className="border-b border-white/10 px-6 sm:px-16 py-4 sm:py-6 flex items-center justify-between hover:bg-white/[0.03] transition-colors group">
            <h1 className={`font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] ${i === 2 ? "text-accent" : "text-white"}`}>
              {word}
            </h1>
            <span className="text-xs uppercase tracking-[4px] text-white/20 hidden sm:block group-hover:text-white/40 transition-colors">
              {["Clubs & Venues", "Rooftops & Lounges", "Warehouse & Underground"][i]}
            </span>
          </div>
        ))}
        <div className="px-6 sm:px-16 pt-10 flex items-center justify-between gap-8">
          <p className="text-white/40 text-base max-w-md">NYC nightlife. One platform, one ticket.</p>
          <CTA />
        </div>
      </div>
    </section>
  );
}

const variants = [
  { component: V1, name: "Stacked Giant" },
  { component: V2, name: "Split Screen" },
  { component: V3, name: "Centered Minimal" },
  { component: V4, name: "Marquee" },
  { component: V5, name: "Editorial" },
  { component: V6, name: "Brutalist" },
  { component: V7, name: "Cinematic" },
  { component: V8, name: "Photo Collage" },
  { component: V9, name: "Single Word" },
  { component: V10, name: "Vertical Text" },
  { component: V11, name: "Countdown" },
  { component: V12, name: "Neon Glow" },
  { component: V13, name: "Film Strip" },
  { component: V14, name: "Two-Tone" },
  { component: V15, name: "Magazine Cover" },
  { component: V16, name: "Stacked Cards" },
  { component: V17, name: "Accent Block" },
  { component: V18, name: "Grid Typography" },
  { component: V19, name: "Window Peek" },
  { component: V20, name: "Horizontal Lines" },
];

export default function PreviewPage() {
  const [current, setCurrent] = useState(0);
  const Variant = variants[current].component;

  return (
    <div className="relative">
      {/* Preview content */}
      <Variant />

      {/* Fixed controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 shadow-2xl">
        <button
          onClick={() => setCurrent((p) => (p - 1 + variants.length) % variants.length)}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Previous variant"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="text-center min-w-[180px]">
          <p className="text-xs text-white/50">{current + 1} / {variants.length}</p>
          <p className="text-sm font-bold">{variants[current].name}</p>
        </div>
        <button
          onClick={() => setCurrent((p) => (p + 1) % variants.length)}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Next variant"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
