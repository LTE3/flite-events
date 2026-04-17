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
      className="group block rounded-2xl overflow-hidden bg-bg-card border border-white/[0.06] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Top glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-black/60 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase">
          {categoryLabels[event.category] || event.category}
        </span>

        {/* Status badges */}
        {sellingFast && (
          <span className="absolute top-3.5 left-[calc(3.5rem+var(--badge-w,5rem))] px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full text-[11px] font-bold tracking-wider uppercase animate-pulse">
            Selling Fast
          </span>
        )}
        {soldOut && (
          <span className="absolute top-3.5 right-14 px-3 py-1 bg-red-600/90 rounded-full text-[11px] font-bold tracking-wider uppercase">
            Sold Out
          </span>
        )}

        {/* Save button */}
        <button
          onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
          className={`absolute top-3.5 right-3.5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            saved
              ? "bg-pink-500/30 backdrop-blur-sm"
              : "bg-black/30 backdrop-blur-sm hover:bg-white/20"
          }`}
          aria-label="Save"
        >
          <Heart size={16} className={saved ? "fill-pink-500 text-pink-500" : "text-white"} />
        </button>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 pt-3">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-accent">
            <Clock size={13} />
            <span className="text-xs font-semibold tracking-wide">
              {formatDate(event.date)} &bull; {formatTime(event.time)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-text-dim mb-4">
          <MapPin size={13} className="shrink-0" />
          <span className="text-sm truncate">{event.venue} &bull; {event.borough || event.city}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
          <div>
            <span className="text-lg font-black">{formatPrice(event.price)}</span>
            {event.price > 0 && <span className="text-xs text-text-dim ml-1">/ ticket</span>}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-white/20 border-2 border-bg-card" />
              <span className="w-5 h-5 rounded-full bg-white/15 border-2 border-bg-card" />
              <span className="w-5 h-5 rounded-full bg-white/10 border-2 border-bg-card" />
            </div>
            <span className="text-xs text-text-dim font-medium">
              {event.tickets_total - event.tickets_left}+
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
