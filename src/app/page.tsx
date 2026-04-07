import Link from "next/link";
import Image from "next/image";
import { Search, Ticket, QrCode, ScanLine, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { sampleEvents } from "@/lib/sample-events";

const categories = ["All", "Music", "Nightlife", "Fitness", "Food & Drink", "Connections", "Art", "Comedy"];

const steps = [
  { icon: Search, title: "Browse Events", desc: "Discover the hottest parties and exclusive events across NYC.", color: "from-accent to-purple-400" },
  { icon: Ticket, title: "Get Tickets", desc: "Select your event and purchase securely through our platform.", color: "from-accent-2 to-emerald-400" },
  { icon: QrCode, title: "Receive QR Code", desc: "Instant email delivery with your unique QR code ticket.", color: "from-orange-500 to-amber-400" },
  { icon: ScanLine, title: "Scan & Enter", desc: "Present your QR code at the door for instant verification.", color: "from-pink-500 to-rose-400" },
];

const features = [
  { icon: Zap, title: "Instant Delivery", desc: "Tickets delivered to your email in seconds" },
  { icon: Shield, title: "Secure & Encrypted", desc: "Every QR code is uniquely encrypted" },
  { icon: Sparkles, title: "Curated Events", desc: "Only the best nightlife experiences" },
];

export default function Home() {
  const featured = sampleEvents.filter((e) => e.featured);
  const weekend = sampleEvents.slice(0, 6);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
            alt="NYC Nightlife"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>

        {/* Animated glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-2/10 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass-strong rounded-full mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-text-dim">NYC&apos;s #1 Nightlife Platform</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Experience The
            <br />
            <span className="gradient-text text-glow">Nightlife</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-dim mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Get exclusive access to the hottest clubs, rooftop parties, and underground events across Manhattan, Brooklyn, and Queens.
          </p>

          {/* Search bar */}
          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center glass-strong rounded-2xl px-5 py-2 max-w-xl mx-auto focus-within:border-accent/50 transition-all duration-300 focus-within:shadow-[0_0_30px_rgba(108,99,255,0.15)]">
              <Search size={20} className="text-text-dim shrink-0" />
              <input
                type="text"
                placeholder="Search events, venues, artists..."
                className="flex-1 bg-transparent border-none outline-none text-text text-sm px-4 py-3 placeholder:text-[#444]"
              />
              <button className="px-6 py-2.5 gradient-bg text-black font-bold text-sm rounded-xl transition-all hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:-translate-y-0.5 active:translate-y-0">
                Search
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { num: "500+", label: "Events hosted" },
              { num: "25K+", label: "Tickets sold" },
              { num: "4.9", label: "App rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-black gradient-text">{stat.num}</p>
                <p className="text-xs text-text-dim mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s" }}>
          <span className="text-[10px] uppercase tracking-[3px] text-text-dim/50">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============ FEATURES BAR ============ */}
      <section className="px-6 py-6 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <f.icon size={18} className="text-accent" />
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-text-dim">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORY PILLS ============ */}
      <section className="px-6 pt-12 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                  i === 0
                    ? "gradient-bg text-black border-transparent font-bold shadow-[0_0_20px_rgba(108,99,255,0.3)]"
                    : "bg-white/[0.03] text-text-dim border-white/[0.06] hover:text-text hover:border-white/[0.15] hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ THIS WEEKEND ============ */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-8 flex-wrap">
            <h2 className="text-3xl font-black">This Weekend</h2>
            <div className="flex gap-1.5">
              {["Friday", "Saturday", "Sunday"].map((day, i) => (
                <button
                  key={day}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    i === 0
                      ? "gradient-bg text-black font-bold shadow-[0_0_15px_rgba(108,99,255,0.25)]"
                      : "text-text-dim hover:text-text border border-white/[0.08] hover:border-white/[0.2]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <Link href="/events" className="ml-auto text-accent text-sm font-semibold hover:text-accent/80 transition-colors flex items-center gap-1.5 group">
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {weekend.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRENDING ============ */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-8 flex-wrap">
            <h2 className="text-3xl font-black">
              Trending <span className="gradient-text">Near You</span>
            </h2>
            <Link href="/events" className="ml-auto text-accent text-sm font-semibold hover:text-accent/80 transition-colors flex items-center gap-1.5 group">
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {featured.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="px-6 py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-text-dim max-w-md mx-auto">From discovery to entry — four simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative group text-center p-8 rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Step number */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 text-black font-black text-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(108,99,255,0.3)]`}>
                  {i + 1}
                </div>
                <step.icon size={24} className="mx-auto mb-3 text-text-dim group-hover:text-text transition-colors" />
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">{step.desc}</p>

                {/* Connector line (not on last) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-14 -right-3 w-6 border-t border-dashed border-white/[0.1]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-6 py-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
                alt="Host events"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/75" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-2/10" />
            </div>

            <div className="relative p-12 sm:p-20 text-center">
              <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-5">
                Build community.
                <br />
                <span className="gradient-text">Not a guest list.</span>
              </h2>
              <p className="text-text-dim text-lg max-w-lg mx-auto mb-9 leading-relaxed">
                Host your next event on PulseTix and reach thousands of locals looking for their next experience.
              </p>
              <Link
                href="/admin/create-event"
                className="inline-flex items-center gap-2 px-10 py-4 gradient-bg text-black font-bold text-base rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(108,99,255,0.5)] hover:-translate-y-1 active:translate-y-0"
              >
                Start Hosting <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
