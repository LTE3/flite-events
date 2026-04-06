"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
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
      className="group block bg-bg-card rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold">
          {categoryLabels[event.category] || event.category}
        </span>
        {sellingFast && (
          <span className="absolute top-3 right-12 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs font-semibold">
            Selling Fast
          </span>
        )}
        {soldOut && (
          <span className="absolute top-3 right-12 px-3 py-1 bg-red-600 rounded-full text-xs font-semibold">
            Sold Out
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
          aria-label="Save"
        >
          <Heart size={16} className={saved ? "fill-pink-500 text-pink-500" : "text-white"} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-xs font-semibold text-accent tracking-wide mb-1.5 uppercase">
          {formatDate(event.date)} &bull; {formatTime(event.time)}
        </p>
        <h3 className="font-bold text-[1.05rem] leading-tight mb-1.5 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-text-dim mb-3.5">
          {event.venue} &bull; {event.borough || event.city}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <span className="font-bold">{formatPrice(event.price)}</span>
          <span className="text-xs text-text-dim flex items-center gap-1.5">
            <span className="flex">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-accent-2 -ml-0.5" />
              <span className="w-2 h-2 rounded-full bg-orange-500 -ml-0.5" />
            </span>
            {event.tickets_total - event.tickets_left} going
          </span>
        </div>
      </div>
    </Link>
  );
}
