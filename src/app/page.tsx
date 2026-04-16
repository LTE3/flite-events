import Link from "next/link";
import Image from "next/image";
import { Search, Ticket, QrCode, ScanLine, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Testimonials } from "@/components/landing/testimonials";
import { Features } from "@/components/landing/features";
import { Categories } from "@/components/landing/categories";
import { PressBar } from "@/components/landing/press-bar";
import { StatsSection } from "@/components/landing/stats-section";
import { EventShowcase } from "@/components/landing/event-showcase";
import { sampleEvents } from "@/lib/sample-events";
import { HeroSection } from "@/components/landing/hero-section";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-reveal";
import { SpotlightCard } from "@/components/motion/magnetic-button";

const steps = [
  { icon: Search, title: "Browse Events", desc: "Discover curated experiences happening across NYC this weekend.", color: "from-accent to-purple-400", num: "01" },
  { icon: Ticket, title: "Get Tickets", desc: "Purchase securely. No hidden fees, no platform markup.", color: "from-accent-2 to-emerald-400", num: "02" },
  { icon: QrCode, title: "Receive QR Code", desc: "Instant email delivery with your unique encrypted ticket.", color: "from-orange-500 to-amber-400", num: "03" },
  { icon: ScanLine, title: "Scan & Enter", desc: "Show your QR code at the door. That's it. You're in.", color: "from-pink-500 to-rose-400", num: "04" },
];

export default function Home() {
  const featured = sampleEvents.filter((e) => e.featured);
  const weekend = sampleEvents.slice(0, 6);
  const heroEvent = weekend[0];

  return (
    <>
      {/* ============ HERO ============ */}
      <HeroSection />

      {/* ============ TRUST BAR ============ */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-2/5" />
        <ScrollReveal>
          <section className="px-6 py-6 border-y border-white/[0.04]">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-10 sm:gap-16">
              {[
                { icon: Zap, text: "Instant Delivery" },
                { icon: Shield, text: "Encrypted QR Codes" },
                { icon: Sparkles, text: "Curated Experiences" },
                { icon: Ticket, text: "Zero Platform Fees" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2.5 py-2">
                  <f.icon size={16} className="text-accent" />
                  <span className="text-sm font-semibold text-white/60 tracking-wide">{f.text}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* ============ HORIZONTAL EVENT SHOWCASE ============ */}
      <EventShowcase
        events={weekend}
        title="This Weekend"
        subtitle="What's On"
        accentColor="text-accent"
      />

      {/* ============ STATS — animated counters ============ */}
      <StatsSection />

      {/* ============ CATEGORIES ============ */}
      <Categories />

      {/* ============ FEATURED EVENT — full bleed cinematic ============ */}
      {heroEvent && (
        <section className="relative py-0">
          <ScrollReveal>
            <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
              <Image
                src={heroEvent.image_url}
                alt={heroEvent.title}
                fill
                className="object-cover saturate-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="max-w-xl">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-[3px] uppercase mb-6">
                      Featured Event
                    </span>
                    <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] mb-4 tracking-tight">
                      {heroEvent.title}
                    </h2>
                    <p className="text-white/60 text-lg mb-2">
                      {heroEvent.venue} &bull; {heroEvent.borough}
                    </p>
                    <p className="text-white/40 mb-8">
                      {heroEvent.description?.slice(0, 120)}...
                    </p>
                    <Link
                      href={`/events/${heroEvent.slug}`}
                      className="inline-flex items-center gap-3 px-8 py-4 gradient-bg text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(108,99,255,0.5)] hover:-translate-y-1 transition-all duration-300"
                    >
                      Get Tickets <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ============ FEATURES ============ */}
      <Features />

      {/* ============ TRENDING — horizontal scroll ============ */}
      <EventShowcase
        events={featured}
        title="Trending Near You"
        subtitle="Popular"
        accentColor="text-accent-2"
      />

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <ScrollReveal className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[4px] text-accent mb-4">Simple</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Four Steps to <span className="gradient-text">Get In</span>
            </h2>
            <p className="text-white/40 max-w-md text-lg">From discovery to entry in under a minute</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <SpotlightCard className="relative group p-8 rounded-2xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-2 h-full">
                  <span className={`font-[family-name:var(--font-display)] text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500 block mb-6`}>
                    {step.num}
                  </span>
                  <step.icon size={28} className="mb-4 text-white/40 group-hover:text-white transition-colors duration-300" />
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>

                  {i < 3 && (
                    <div className="hidden lg:block absolute top-12 -right-3 w-6 border-t border-dashed border-white/[0.1]" />
                  )}
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials />

      {/* ============ PRESS BAR ============ */}
      <PressBar />

      {/* ============ CTA — cinematic full bleed ============ */}
      <section className="relative py-0">
        <ScrollReveal>
          <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
              alt="Host events"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-2/10" />

            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-3xl mx-auto px-6">
                <p className="text-xs font-bold uppercase tracking-[4px] text-accent mb-6">For Event Creators</p>
                <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] mb-6 tracking-tight">
                  Build community.
                  <br />
                  <span className="gradient-text">Not a guest list.</span>
                </h2>
                <p className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                  Everything you need to sell tickets, manage promoters, and grow your events — in one platform built for NYC nightlife.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/admin/create-event"
                    className="px-10 py-4 gradient-bg text-black font-bold text-base rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(108,99,255,0.5)] hover:-translate-y-1 flex items-center gap-2"
                  >
                    Start Hosting <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/promoter-signup"
                    className="px-10 py-4 rounded-full font-bold text-base border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                  >
                    Become a Promoter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
