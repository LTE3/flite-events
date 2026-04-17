"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { Event } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

function EventTile({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[480px] block"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 85vw, 480px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
          <span className="font-bold text-sm">{formatPrice(event.price)}</span>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ArrowRight size={20} className="text-black" />
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="text-xs text-accent font-semibold tracking-wide uppercase mb-1.5">
          {formatDate(event.date)} · {event.category.replace("_", " & ")}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold tracking-tight leading-tight mb-2">
          {event.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-text-dim">
          <MapPin size={13} className="shrink-0" />
          {event.venue} · {event.borough || event.city}
        </p>
      </div>
    </Link>
  );
}

export function EventShowcase({ events, title, subtitle }: {
  events: Event[];
  title: string;
  subtitle: string;
  accentColor?: string;
}) {
  if (events.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 relative">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-3">
                {subtitle}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em]">
                {title}
              </h2>
            </div>
            <Link
              href="/events"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-text-dim hover:text-accent transition-colors group"
            >
              See All
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll */}
      <ScrollReveal>
        <div className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scroll-smooth">
          <div className="flex-shrink-0 pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]" aria-hidden />
          {events.map((event) => (
            <div key={event.id} className="snap-start">
              <EventTile event={event} />
            </div>
          ))}
          <div className="flex-shrink-0 pr-6" aria-hidden />
        </div>
      </ScrollReveal>

      {/* Mobile "See All" */}
      <div className="sm:hidden px-6 mt-6">
        <Link
          href="/events"
          className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 rounded-full text-sm font-semibold text-text-dim hover:text-text transition-colors"
        >
          See All Events <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
