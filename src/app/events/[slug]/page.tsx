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
      {/* Hero image — the photo is the star */}
      <div className="relative h-[60vh] sm:h-[65vh] overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Stronger gradient — bg-bg lock at bottom so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg from-0% via-bg/70 via-35% to-black/20 to-100%" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <Link
            href="/events"
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium hover:bg-white/[0.1] transition-all"
          >
            <ArrowLeft size={16} /> Events
          </Link>
          <button
            aria-label="Share event"
            className="w-11 h-11 glass rounded-full flex items-center justify-center hover:bg-white/[0.1] transition-all"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Title + date/time/venue overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-3 py-1 bg-accent/15 text-accent rounded-full text-xs font-semibold mb-4 uppercase tracking-wider border border-accent/20">
              {event.category.replace("_", " & ")}
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] drop-shadow-2xl max-w-4xl tracking-[-0.025em]">
              {event.title}
            </h1>
            {/* Date / time / venue — in the hero, not below */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-text/90">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-accent" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </span>
              <span className="hidden sm:inline text-text-dim/60">·</span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                <span className="font-medium">
                  {formatTime(event.time)}
                  {event.end_time ? ` — ${formatTime(event.end_time)}` : ""}
                </span>
              </span>
              <span className="hidden sm:inline text-text-dim/60">·</span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span className="font-medium">
                  {event.venue} · {event.borough || event.city}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info row — horizontal with dividers, not wrapped pills */}
            <div className="flex items-center overflow-x-auto -mx-2 px-2 pb-1">
              <InfoCell icon={Calendar} label="Date" value={formatDate(event.date)} />
              <Divider />
              <InfoCell
                icon={Clock}
                label="Doors"
                value={`${formatTime(event.time)}${event.end_time ? ` — ${formatTime(event.end_time)}` : ""}`}
              />
              <Divider />
              <InfoCell
                icon={MapPin}
                label="Where"
                value={`${event.venue}`}
              />
              <Divider />
              <InfoCell icon={Users} label="Going" value={`${ticketsSold}`} />
            </div>

            {/* About */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-4 tracking-tight">About</h2>
              <p className="text-text-dim leading-relaxed text-[15px]">{event.description}</p>
            </div>

            {/* Venue */}
            <div className="p-6 card">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-accent" /> Venue
              </h3>
              <p className="font-semibold">{event.venue}</p>
              <p className="text-sm text-text-dim">
                {event.address}, {event.borough || event.city}, NY
              </p>
            </div>

            {/* Safety */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
              <Shield size={18} className="text-accent shrink-0" />
              <p className="text-sm text-text-dim">
                Every ticket gets a unique QR code. Scanned at the door. No counterfeits.
              </p>
            </div>
          </div>

          {/* Right - Ticket Card (urgent, prominent) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="p-6 card-elevated relative overflow-hidden">
                {/* subtle accent glow at top */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                  {event.tiers && event.tiers.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-xs text-text-dim uppercase tracking-wider font-semibold">Tickets</p>
                        {event.tickets_left < 20 && event.tickets_left > 0 && (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-warning animate-pulse">
                            Selling fast
                          </span>
                        )}
                      </div>
                      <div className="space-y-2.5 mb-6">
                        {event.tiers.map((tier: TicketTier) => {
                          const tierSoldOut = tier.sold >= tier.quantity;
                          const tierRemaining = tier.quantity - tier.sold;
                          return (
                            <div
                              key={tier.id}
                              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold">{tier.name}</span>
                                <span className="font-bold text-lg">{formatPrice(tier.price)}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-text-dim">
                                <span>{tier.quantity - tier.sold} left</span>
                                {tierSoldOut ? (
                                  <span className="text-danger font-semibold">Sold Out</span>
                                ) : tierRemaining < 10 ? (
                                  <span className="text-warning font-semibold">{tierRemaining} left</span>
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
                        <p className="text-xs text-text-dim uppercase tracking-wider font-semibold">From</p>
                        <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold mt-1 tracking-tight">
                          {formatPrice(event.price)}
                        </p>
                      </div>
                      <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30">
                        <Ticket size={22} className="text-white" />
                      </div>
                    </div>
                  )}

                  {/* Tickets progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-text-dim">
                        <span className="text-text font-semibold">{ticketsSold}</span> sold
                      </span>
                      <span className="text-text-dim">
                        <span className="text-text font-semibold">{event.tickets_left}</span> left
                      </span>
                    </div>
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentSold}%` }}
                      />
                    </div>
                    {event.tickets_left < 20 && event.tickets_left > 0 && (
                      <p className="text-xs text-warning font-semibold mt-2 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
                        Only {event.tickets_left} left
                      </p>
                    )}
                  </div>

                  {/* Buy button — bigger, rounded-full, glow */}
                  <Link
                    href={soldOut ? "#" : `/checkout/${event.slug}`}
                    className={`flex items-center justify-center gap-2 w-full py-5 text-center font-bold text-base rounded-full transition-all duration-300 ${
                      soldOut
                        ? "bg-white/[0.06] text-text-dim cursor-not-allowed"
                        : "bg-accent text-white hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
                    }`}
                  >
                    {soldOut ? (
                      "Sold Out"
                    ) : (
                      <>
                        <Ticket size={18} />
                        Get Tickets
                      </>
                    )}
                  </Link>

                  <div className="flex items-center justify-center gap-3 mt-4 text-xs text-text-dim">
                    <span className="flex items-center gap-1.5">
                      <Shield size={12} /> Encrypted
                    </span>
                    <span className="text-text-dim/40">·</span>
                    <span>Delivered instantly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCell({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-2 shrink-0 min-w-0">
      <Icon size={16} className="text-accent shrink-0 mt-1" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-text-dim font-semibold">{label}</p>
        <p className="text-sm font-semibold text-text truncate">{value}</p>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="h-8 w-px bg-white/[0.06] shrink-0" aria-hidden="true" />;
}
