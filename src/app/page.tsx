import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Testimonials } from "@/components/landing/testimonials";
import { Features } from "@/components/landing/features";
import { EventShowcase } from "@/components/landing/event-showcase";
import { TextMarquee, TextMarqueeAlt } from "@/components/landing/text-marquee";
import { sampleEvents } from "@/lib/sample-events";
import { HeroSection } from "@/components/landing/hero-section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export default function Home() {
  const featured = sampleEvents.filter((e) => e.featured);
  const weekend = sampleEvents.slice(0, 6);
  const heroEvent = weekend[1] || weekend[0];

  return (
    <>
      {/* ============ HERO ============ */}
      <HeroSection />

      {/* ============ GIANT TEXT MARQUEE ============ */}
      <TextMarquee words={["DISCOVER", "EXPERIENCE", "CONNECT", "REPEAT"]} />

      {/* ============ THIS WEEKEND — horizontal scroll ============ */}
      <EventShowcase
        events={weekend}
        title="This Weekend"
        subtitle="What's On"
        accentColor="text-accent"
      />

      {/* ============ FEATURED EVENT — full bleed cinematic ============ */}
      {heroEvent && (
        <section className="relative">
          <ScrollReveal>
            <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
              <Image
                src={heroEvent.image_url}
                alt={heroEvent.title}
                fill
                className="object-cover saturate-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

              {/* Accent glow */}
              <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="max-w-2xl">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent text-[11px] font-bold tracking-[4px] uppercase mb-8">
                      Featured
                    </span>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] mb-6 tracking-tight">
                      {heroEvent.title}
                    </h2>
                    <p className="text-white/50 text-xl mb-3 font-medium">
                      {heroEvent.venue} &bull; {heroEvent.borough}
                    </p>
                    <p className="text-white/30 text-lg mb-10 max-w-lg leading-relaxed">
                      {heroEvent.description?.slice(0, 150)}...
                    </p>
                    <Link
                      href={`/events/${heroEvent.slug}`}
                      className="group inline-flex items-center gap-3 px-10 py-5 gradient-bg text-black font-bold text-lg rounded-full hover:shadow-[0_0_50px_rgba(108,99,255,0.5)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Get Tickets <ArrowRight size={20} strokeWidth={2.5} />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ============ SMALL TEXT MARQUEE ============ */}
      <TextMarqueeAlt />

      {/* ============ FEATURES ============ */}
      <Features />

      {/* ============ TRENDING — horizontal scroll ============ */}
      <EventShowcase
        events={featured}
        title="Trending Near You"
        subtitle="Popular"
        accentColor="text-accent-2"
      />

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials />

      {/* ============ CTA — cinematic full bleed ============ */}
      <section className="relative">
        <ScrollReveal>
          <div className="relative h-[70vh] min-h-[550px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
              alt="Host events"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent-2/10" />

            {/* Accent glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[200px] rounded-full pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-3xl mx-auto px-6">
                <p className="text-xs font-bold uppercase tracking-[5px] text-accent mb-8">For Event Creators</p>
                <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.85] mb-8 tracking-tight">
                  Build community.
                  <br />
                  <span className="gradient-text">Not a guest list.</span>
                </h2>
                <p className="text-white/40 text-lg max-w-lg mx-auto mb-12 leading-relaxed">
                  Everything you need to sell tickets, manage promoters, and grow your events — in one platform.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <Link
                    href="/admin/create-event"
                    className="group px-10 py-5 gradient-bg text-black font-bold text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(108,99,255,0.5)] hover:-translate-y-1 flex items-center gap-3 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Start Hosting <ArrowRight size={20} strokeWidth={2.5} />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Link>
                  <Link
                    href="/promoter-signup"
                    className="px-10 py-5 rounded-full font-bold text-lg border border-white/15 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1"
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
