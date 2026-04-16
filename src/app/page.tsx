import Link from "next/link";
import Image from "next/image";
import { Search, Ticket, QrCode, ScanLine, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Testimonials } from "@/components/landing/testimonials";
import { Features } from "@/components/landing/features";
import { Categories } from "@/components/landing/categories";
import { PressBar } from "@/components/landing/press-bar";
import { AccentLine } from "@/components/landing/decorative";
import { sampleEvents } from "@/lib/sample-events";
import { HeroSection } from "@/components/landing/hero-section";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-reveal";
import { SpotlightCard } from "@/components/motion/magnetic-button";

const steps = [
  { icon: Search, title: "Browse Events", desc: "Discover curated experiences happening across NYC this weekend.", color: "from-accent to-purple-400" },
  { icon: Ticket, title: "Get Tickets", desc: "Purchase securely. No hidden fees, no platform markup.", color: "from-accent-2 to-emerald-400" },
  { icon: QrCode, title: "Receive QR Code", desc: "Instant email delivery with your unique encrypted ticket.", color: "from-orange-500 to-amber-400" },
  { icon: ScanLine, title: "Scan & Enter", desc: "Show your QR code at the door. That's it. You're in.", color: "from-pink-500 to-rose-400" },
];

export default function Home() {
  const featured = sampleEvents.filter((e) => e.featured);
  const weekend = sampleEvents.slice(0, 6);

  return (
    <>
      {/* ============ HERO ============ */}
      <HeroSection />

      {/* ============ TRUST BAR ============ */}
      <ScrollReveal>
        <section className="px-6 py-5 border-b border-white/[0.03]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {[
              { icon: Zap, text: "Instant Delivery" },
              { icon: Shield, text: "Encrypted QR Codes" },
              { icon: Sparkles, text: "Curated Experiences" },
              { icon: Ticket, text: "Zero Platform Fees" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2.5 py-2">
                <f.icon size={16} className="text-accent" />
                <span className="text-sm font-medium text-text-dim">{f.text}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ============ CATEGORIES ============ */}
      <Categories />

      <AccentLine />

      {/* ============ THIS WEEKEND ============ */}
      <section className="px-6 py-16 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-10 flex-wrap">
              <div>
                <p className="text-xs font-bold uppercase tracking-[3px] text-accent mb-2">What&apos;s On</p>
                <h2 className="text-3xl sm:text-4xl font-black">This Weekend</h2>
              </div>
              <div className="flex gap-1.5 sm:ml-4">
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
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekend.map((event) => (
              <StaggerItem key={event.id}>
                <EventCard event={event} index={0} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <AccentLine />

      {/* ============ FEATURES ============ */}
      <Features />

      <AccentLine />

      {/* ============ TRENDING ============ */}
      <section className="px-6 py-16 relative">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-2/4 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <ScrollReveal>
            <div className="flex items-center gap-6 mb-10 flex-wrap">
              <div>
                <p className="text-xs font-bold uppercase tracking-[3px] text-accent-2 mb-2">Popular</p>
                <h2 className="text-3xl sm:text-4xl font-black">
                  Trending <span className="gradient-text">Near You</span>
                </h2>
              </div>
              <Link href="/events" className="ml-auto text-accent text-sm font-semibold hover:text-accent/80 transition-colors flex items-center gap-1.5 group">
                View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event) => (
              <StaggerItem key={event.id}>
                <EventCard event={event} index={0} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <AccentLine />

      {/* ============ HOW IT WORKS ============ */}
      <section className="px-6 py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/4 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[3px] text-accent mb-3">Simple</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Four Steps to <span className="gradient-text">Get In</span>
            </h2>
            <p className="text-text-dim max-w-md mx-auto">From discovery to entry in under a minute</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <SpotlightCard className="relative group text-center p-8 rounded-2xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 text-black font-black text-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    {i + 1}
                  </div>
                  <step.icon size={24} className="mx-auto mb-3 text-text-dim group-hover:text-text transition-colors duration-300" />
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-text-dim leading-relaxed">{step.desc}</p>

                  {i < 3 && (
                    <div className="hidden lg:block absolute top-[3.5rem] -right-3 w-6 border-t border-dashed border-white/[0.08]" />
                  )}
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <AccentLine />

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials />

      {/* ============ PRESS BAR ============ */}
      <PressBar />

      {/* ============ CTA ============ */}
      <section className="px-6 py-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
                  alt="Host events"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent-2/10" />
              </div>

              <div className="relative p-12 sm:p-20 text-center">
                <p className="text-xs font-bold uppercase tracking-[3px] text-accent mb-6">For Event Creators</p>
                <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-5">
                  Build community.
                  <br />
                  <span className="gradient-text">Not a guest list.</span>
                </h2>
                <p className="text-text-dim text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                  Everything you need to sell tickets, manage promoters, and grow your events — in one platform built for NYC nightlife.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/admin/create-event"
                    className="px-10 py-4 gradient-bg text-black font-bold text-base rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(108,99,255,0.5)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
                  >
                    Start Hosting <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/promoter-signup"
                    className="px-10 py-4 glass-strong rounded-full font-bold text-base hover:bg-white/[0.1] transition-all duration-300"
                  >
                    Become a Promoter
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
