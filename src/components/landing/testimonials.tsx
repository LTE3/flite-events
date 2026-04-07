"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "PulseTix completely changed how we run events. We went from spreadsheets and DMs to a real platform overnight. Our ticket sales doubled in the first month.",
    name: "Marcus Rivera",
    role: "Founder, Night District NYC",
    avatar: "MR",
    gradient: "from-accent to-purple-400",
  },
  {
    quote: "The promoter system is a game changer. My team of 12 promoters each have their own links, I can see exactly who's driving sales, and payouts are automatic.",
    name: "Jasmine Cole",
    role: "Events Director, Vibe Collective",
    avatar: "JC",
    gradient: "from-accent-2 to-emerald-400",
  },
  {
    quote: "We outgrew Eventbrite pretty quickly. The fees were killing us and we had zero control over the experience. PulseTix gave us our brand back.",
    name: "Austin Banks",
    role: "Co-Founder, Rooftop Sessions",
    avatar: "AB",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    quote: "QR code scanning at the door is seamless. No more printed lists, no more arguments at the entrance. Just scan and go. Our door team loves it.",
    name: "Daniela Santos",
    role: "Operations, BK Warehouse Events",
    avatar: "DS",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    quote: "I was skeptical about switching platforms mid-season but the migration was painless. Within a week we had everything running smoother than before.",
    name: "Kevin Okafor",
    role: "Promoter, Afrobeats NYC",
    avatar: "KO",
    gradient: "from-cyan-500 to-blue-400",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  function go(dir: number) {
    setIsAutoPlaying(false);
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }

  const t = testimonials[active];

  return (
    <section className="px-6 py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[3px] text-accent mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-black">
            Trusted by NYC&apos;s <span className="gradient-text">Top Hosts</span>
          </h2>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="p-8 sm:p-12 rounded-3xl glass-strong text-center transition-all duration-500">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-bold text-black`}>
                {t.avatar}
              </div>
              <div className="text-left">
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-text-dim">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setIsAutoPlaying(false); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 gradient-bg" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
