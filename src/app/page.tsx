export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/landing/hero-section";
import { EventShowcase } from "@/components/landing/event-showcase";
import { Categories } from "@/components/landing/categories";
import { StatsSection } from "@/components/landing/stats-section";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { PressBar } from "@/components/landing/press-bar";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { sampleEvents } from "@/lib/sample-events";
import type { Event } from "@/lib/types";

async function getEvents(): Promise<{ weekend: Event[]; featured: Event[] }> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase not configured");
    }
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const supabase = createAdminClient();

    const [weekendRes, featuredRes] = await Promise.all([
      supabase
        .from("events")
        .select("*")
        .in("status", ["published", "sold_out"])
        .order("date", { ascending: true })
        .limit(6),
      supabase
        .from("events")
        .select("*")
        .eq("featured", true)
        .in("status", ["published", "sold_out"])
        .order("date", { ascending: true }),
    ]);

    return {
      weekend: weekendRes.data || sampleEvents.slice(0, 6),
      featured: featuredRes.data || sampleEvents.filter((e) => e.featured),
    };
  } catch {
    return {
      weekend: sampleEvents.slice(0, 6),
      featured: sampleEvents.filter((e) => e.featured),
    };
  }
}

export default async function Home() {
  const { weekend, featured } = await getEvents();

  return (
    <>
      <HeroSection />

      <PressBar />

      <EventShowcase
        events={weekend}
        title="This Weekend"
        subtitle="What's On"
      />

      <StatsSection />

      <Categories />

      <Features />

      <Testimonials />

      {featured.length > 0 && (
        <EventShowcase
          events={featured}
          title="Trending Now"
          subtitle="Hot"
        />
      )}

      {/* CTA — full bleed image section */}
      <section className="relative">
        <ScrollReveal>
          <div className="relative min-h-[60vh] overflow-hidden flex items-center">
            <Image
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=80"
              alt="DJ performing at a Brooklyn warehouse"
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute top-0 left-0 right-0 h-px bg-accent/30" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">
              <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-6">For Promoters & Hosts</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] mb-6 tracking-[-0.03em] max-w-3xl">
                Build community.
                <br />
                <span className="text-accent">Not a guest list.</span>
              </h2>
              <p className="text-white/40 text-lg max-w-lg mb-10 leading-relaxed">
                Sell tickets. Run promoters. Pack the room. Keep the margin.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/admin/create-event"
                  className="group px-8 py-4 bg-accent text-black font-bold rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Host Event <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/promoter-signup"
                  className="px-8 py-4 rounded-full font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Become a Promoter
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
