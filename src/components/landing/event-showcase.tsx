"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { useRef } from "react";
import type { Event } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

function LargeEventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[45vw] h-[420px] sm:h-[500px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
    >
      <Image
        src={event.image_url}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="60vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[11px] font-semibold tracking-[1.5px] uppercase border border-white/10">
            {event.category}
          </span>
          <span className="flex items-center gap-1.5 text-accent text-sm font-medium">
            <Clock size={13} /> {formatDate(event.date)}
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-[-0.01em] mb-2 leading-tight">
          {event.title}
        </h3>
        <div className="flex items-center gap-4 text-white/50">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> {event.venue}
          </span>
          <span className="text-xl font-bold text-white">{formatPrice(event.price)}</span>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}

export function EventShowcase({ events, title, subtitle, accentColor = "text-accent" }: {
  events: Event[];
  title: string;
  subtitle: string;
  accentColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <ScrollReveal>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[4px] ${accentColor} mb-4`}>{subtitle}</p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em]">
                {title}
              </h2>
            </div>
            <Link href="/events" className="text-accent text-sm font-semibold hover:text-accent/80 transition-colors flex items-center gap-1.5 group">
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-6 pb-4 snap-x snap-mandatory"
      >
        {/* Left padding for alignment */}
        <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)] hidden xl:block" />

        {events.map((event) => (
          <div key={event.id} className="snap-start">
            <LargeEventCard event={event} />
          </div>
        ))}

        {/* Right padding */}
        <div className="flex-shrink-0 w-6" />
      </div>
    </section>
  );
}
