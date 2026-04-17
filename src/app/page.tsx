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

      <EventShowcase
        events={weekend}
        title="This Weekend"
        subtitle="What's On"
        accentColor="text-accent"
      />

      <Categories />

      <StatsSection />

      <Features />

      <Testimonials />

      <EventShowcase
        events={featured}
        title="Trending Near You"
        subtitle="Hot right now"
        accentColor="text-accent"
      />

      <PressBar />

      {/* CTA — For Hosts */}
      <section className="relative">
        <ScrollReveal>
          <div className="relative h-[70vh] min-h-[550px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=80"
              alt="DJ performing at a Brooklyn warehouse"
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-6">For Promoters & Hosts</p>
                  <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.9] mb-6 tracking-[-0.02em]">
                    Build community.
                    <br />
                    <span className="accent-text">Not a guest list.</span>
                  </h2>
                  <p className="text-white/40 text-lg max-w-lg mb-10 leading-relaxed">
                    Sell tickets. Run promoters. Pack the room.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href="/admin/create-event"
                      className="group px-8 py-4 bg-accent text-black font-semibold rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      Host Event <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/promoter-signup"
                      className="px-8 py-4 rounded-full font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Promote with us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
