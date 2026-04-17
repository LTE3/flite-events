import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Features } from "@/components/landing/features";
import { EventShowcase } from "@/components/landing/event-showcase";
import { HeroSection } from "@/components/landing/hero-section";
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
      {/* ============ HERO ============ */}
      <HeroSection />

      {/* ============ THIS WEEKEND ============ */}
      <EventShowcase
        events={weekend}
        title="This Weekend"
        subtitle="What's On"
        accentColor="text-accent"
      />

      {/* ============ FEATURES ============ */}
      <Features />

      {/* ============ TRENDING ============ */}
      <EventShowcase
        events={featured}
        title="Trending Near You"
        subtitle="Popular"
        accentColor="text-accent"
      />

      {/* ============ CTA ============ */}
      <section className="relative">
        <ScrollReveal>
          <div className="relative h-[70vh] min-h-[550px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80"
              alt="Host events"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-6">For Event Creators</p>
                  <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.9] mb-6 tracking-[-0.02em]">
                    Build community.
                    <br />
                    <span className="accent-text">Not a guest list.</span>
                  </h2>
                  <p className="text-white/40 text-lg max-w-lg mb-10 leading-relaxed">
                    Everything you need to sell tickets, manage promoters, and grow your events — in one platform.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href="/admin/create-event"
                      className="group px-8 py-4 bg-accent text-white font-semibold rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      Start Hosting <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
