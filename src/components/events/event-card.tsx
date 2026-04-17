"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import type { Event } from "@/lib/types";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  music: "Music",
  nightlife: "Nightlife",
  fitness: "Fitness",
  food_drink: "Food & Drink",
  connections: "Connections",
  art: "Art",
  comedy: "Comedy",
};

export function EventCard({ event, index = 0 }: { event: Event; index?: number }) {
  const [saved, setSaved] = useState(false);
  const soldOut = event.tickets_left === 0;
  const sellingFast = event.tickets_left > 0 && event.tickets_left < 20;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-bg-card border border-white/[0.06] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/50 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image — dominant, poster-like */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
        />

        {/* Gradient overlay for title legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Category badge — subtler, smaller */}
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-full text-[10px] font-medium tracking-[0.14em] uppercase text-text-dim">
          {categoryLabels[event.category] || event.category}
        </span>

        {/* Sold Out badge — keep colored, it matters */}
        {soldOut && (
          <span className="absolute top-3 right-14 px-2.5 py-1 bg-danger rounded-full text-[10px] font-bold tracking-[0.14em] uppercase text-white">
            Sold Out
          </span>
        )}

        {/* Save button */}
        <button
          onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
          className={`absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            saved
              ? "bg-accent/25 backdrop-blur-md"
              : "bg-black/40 backdrop-blur-md hover:bg-black/60"
          }`}
          aria-label={saved ? "Unsave event" : "Save event"}
        >
          <Heart size={16} className={saved ? "fill-accent text-accent" : "text-white"} />
        </button>

        {/* Title — big, bold, Bricolage, over the photo */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {sellingFast && !soldOut && (
            <div className="mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-accent">
                Selling Fast
              </span>
            </div>
          )}
          <h3 className="font-display font-bold text-2xl md:text-[26px] leading-[1.05] tracking-tight line-clamp-2 text-text drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Body — clean metadata row */}
      <div className="px-4 py-4 flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-1.5 text-text-dim">
            <Clock size={12} className="shrink-0" />
            <span className="text-xs font-medium tracking-wide truncate">
              {formatDate(event.date)} &bull; {formatTime(event.time)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-text-muted">
            <MapPin size={12} className="shrink-0" />
            <span className="text-xs truncate">
              {event.venue} &bull; {event.borough || event.city}
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase tracking-[0.14em] text-text-muted font-medium leading-none mb-1">
            {event.price > 0 ? "From" : ""}
          </div>
          <div className="font-display font-bold text-xl leading-none text-text">
            {formatPrice(event.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}
