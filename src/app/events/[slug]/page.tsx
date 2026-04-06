import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleEvents } from "@/lib/sample-events";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = sampleEvents.find((e) => e.slug === slug);
  if (!event) notFound();

  const soldOut = event.tickets_left === 0;
  const ticketsSold = event.tickets_total - event.tickets_left;

  return (
    <div className="px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <Image
                src={event.image_url}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <span className="inline-block px-3 py-1 gradient-bg rounded-full text-xs font-semibold text-black mb-4 capitalize">
              {event.category.replace("_", " & ")}
            </span>
            <h1 className="text-3xl font-black leading-tight mb-4">{event.title}</h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-text-dim">
                <Calendar size={18} className="text-accent shrink-0" />
                <span className="text-sm">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-text-dim">
                <Clock size={18} className="text-accent shrink-0" />
                <span className="text-sm">{formatTime(event.time)}{event.end_time ? ` — ${formatTime(event.end_time)}` : ""}</span>
              </div>
              <div className="flex items-center gap-3 text-text-dim">
                <MapPin size={18} className="text-accent shrink-0" />
                <span className="text-sm">{event.venue} &bull; {event.address}, {event.borough || event.city}</span>
              </div>
              <div className="flex items-center gap-3 text-text-dim">
                <Users size={18} className="text-accent shrink-0" />
                <span className="text-sm">{ticketsSold} / {event.tickets_total} attending</span>
              </div>
            </div>

            {/* Price & Buy */}
            <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-text-dim">Price</p>
                  <p className="text-2xl font-black">{formatPrice(event.price)}</p>
                </div>
                {event.tickets_left < 20 && event.tickets_left > 0 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs font-semibold">
                    Only {event.tickets_left} left!
                  </span>
                )}
              </div>
              <Link href={soldOut ? "#" : `/checkout/${event.slug}`}>
                <Button disabled={soldOut} className="w-full justify-center" size="lg">
                  {soldOut ? "Sold Out" : "Get Tickets"}
                </Button>
              </Link>
              <p className="text-xs text-text-dim text-center mt-3">
                Secure, instant delivery with QR codes
              </p>
            </div>

            {/* Tickets progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-text-dim mb-1.5">
                <span>{ticketsSold} sold</span>
                <span>{event.tickets_left} remaining</span>
              </div>
              <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                <div
                  className="h-full gradient-bg rounded-full transition-all duration-500"
                  style={{ width: `${(ticketsSold / event.tickets_total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">About This Event</h2>
          <p className="text-text-dim leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
