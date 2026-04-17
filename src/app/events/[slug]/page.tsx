import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Ticket, Shield } from "lucide-react";
import { sampleEvents } from "@/lib/sample-events";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Event, TicketTier } from "@/lib/types";

async function getEvent(slug: string): Promise<Event | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase not configured");
    }
    const { createAdminClient } = await import("@/lib/supabase-admin");
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!data) return sampleEvents.find((e) => e.slug === slug) || null;

    // Fetch tiers for this event
    const { data: tiers } = await supabase
      .from("ticket_tiers")
      .select("*")
      .eq("event_id", data.id)
      .order("sort_order", { ascending: true });

    return { ...data, tiers: tiers || [] };
  } catch {
    return sampleEvents.find((e) => e.slug === slug) || null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) {
    return {
      title: "Event Not Found | PulseTix",
      description: "The event you're looking for could not be found.",
    };
  }
  return {
    title: `${event.title} | PulseTix`,
    description: event.description?.slice(0, 160) || `Get tickets for ${event.title} on PulseTix.`,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const soldOut = event.tickets_left === 0;
  const ticketsSold = event.tickets_total - event.tickets_left;
  const percentSold = (ticketsSold / event.tickets_total) * 100;

  return (
    <div className="min-h-screen">
      {/* Hero image */}
      <div className="relative h-[50vh] sm:h-[55vh] overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/40 to-black/20" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <Link href="/events" className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium hover:bg-white/[0.1] transition-all">
            <ArrowLeft size={16} /> Back
          </Link>
          <button aria-label="Share event" className="w-11 h-11 glass rounded-full flex items-center justify-center hover:bg-white/[0.1] transition-all">
            <Share2 size={16} />
          </button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
              {event.category.replace("_", " & ")}
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-extrabold leading-[1.05] drop-shadow-2xl max-w-3xl tracking-[-0.02em]">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info pills */}
            <div className="flex flex-wrap gap-3">
              <InfoPill icon={Calendar} text={formatDate(event.date)} />
              <InfoPill icon={Clock} text={`${formatTime(event.time)}${event.end_time ? ` — ${formatTime(event.end_time)}` : ""}`} />
              <InfoPill icon={MapPin} text={`${event.venue} · ${event.borough || event.city}`} />
              <InfoPill icon={Users} text={`${ticketsSold} attending`} />
            </div>

            {/* About */}
            <div>
              <h2 className="text-xl font-extrabold mb-4">About This Event</h2>
              <p className="text-text-dim leading-relaxed text-[15px]">{event.description}</p>
            </div>

            {/* Venue */}
            <div className="p-6 rounded-2xl card">
              <h3 className="font-extrabold mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-accent" /> Venue
              </h3>
              <p className="font-semibold">{event.venue}</p>
              <p className="text-sm text-text-dim">{event.address}, {event.borough || event.city}, NY</p>
            </div>

            {/* Safety */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
              <Shield size={18} className="text-accent shrink-0" />
              <p className="text-sm text-text-dim">
                Tickets are secured with unique encrypted QR codes. Each ticket is verified at entry.
              </p>
            </div>
          </div>

          {/* Right - Ticket Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Ticket purchase card */}
              <div className="p-6 rounded-2xl card">
                {event.tiers && event.tiers.length > 0 ? (
                  <>
                    <p className="text-xs text-text-dim uppercase tracking-wider font-medium mb-4">Ticket Tiers</p>
                    <div className="space-y-3 mb-6">
                      {event.tiers.map((tier: TicketTier) => {
                        const tierSoldOut = tier.sold >= tier.quantity;
                        const tierRemaining = tier.quantity - tier.sold;
                        return (
                          <div key={tier.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">{tier.name}</span>
                              <span className="font-extrabold">{formatPrice(tier.price)}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-text-dim">
                              <span>{tier.sold} / {tier.quantity} sold</span>
                              {tierSoldOut ? (
                                <span className="text-danger font-semibold">Sold Out</span>
                              ) : tierRemaining < 10 ? (
                                <span className="text-orange-400 font-semibold">{tierRemaining} left</span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-text-dim uppercase tracking-wider font-medium">Price</p>
                      <p className="text-3xl font-extrabold mt-1">{formatPrice(event.price)}</p>
                    </div>
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                      <Ticket size={20} className="text-white" />
                    </div>
                  </div>
                )}

                {/* Tickets progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-text-dim mb-2">
                    <span>{ticketsSold} sold</span>
                    <span>{event.tickets_left} remaining</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentSold}%` }}
                    />
                  </div>
                  {event.tickets_left < 20 && event.tickets_left > 0 && (
                    <p className="text-xs text-orange-400 font-semibold mt-2 animate-pulse">
                      Only {event.tickets_left} tickets left!
                    </p>
                  )}
                </div>

                {/* Buy button */}
                <Link
                  href={soldOut ? "#" : `/checkout/${event.slug}`}
                  className={`block w-full py-4 text-center font-semibold text-base rounded-xl transition-all duration-300 ${
                    soldOut
                      ? "bg-white/[0.06] text-text-dim cursor-not-allowed"
                      : "bg-accent text-white hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {soldOut ? "Sold Out" : "Get Tickets"}
                </Link>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-text-dim">
                  <span className="flex items-center gap-1"><Shield size={12} /> Secure checkout</span>
                  <span>·</span>
                  <span>Instant delivery</span>
                </div>
              </div>

              {/* Share card */}
              <div className="p-5 rounded-2xl card text-center">
                <p className="text-sm font-medium mb-3">Share this event</p>
                <div className="flex justify-center gap-2">
                  {["Copy Link", "Twitter", "Instagram"].map((platform) => (
                    <button
                      key={platform}
                      className="px-4 py-2 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoPill({ icon: Icon, text }: { icon: React.ComponentType<{ size: number; className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm">
      <Icon size={15} className="text-accent shrink-0" />
      <span className="text-text-dim">{text}</span>
    </div>
  );
}
