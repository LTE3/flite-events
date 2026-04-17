"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { Event } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

function HeroCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 block"
    >
      <Image
        src={event.image_url}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        sizes="(min-width: 1024px) 66vw, 100vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[11px] font-semibold tracking-[1.5px] uppercase border border-white/10">
            {event.category}
          </span>
          <span className="flex items-center gap-1.5 text-accent text-sm font-medium">
            <Clock size={13} /> {formatDate(event.date)}
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-[-0.01em] mb-3 leading-[1.05]">
          {event.title}
        </h3>
        <div className="flex items-center justify-between gap-4 text-white/60">
          <span className="flex items-center gap-1.5 text-sm">
            <MapPin size={14} /> {event.venue}
          </span>
          <span className="text-xl font-bold text-white">{formatPrice(event.price)}</span>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}

function SideCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex gap-4 p-4 rounded-xl bg-bg-card border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:bg-bg-elevated"
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden relative shrink-0">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="112px"
        />
      </div>
      <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
        <div className="min-w-0">
          <h4 className="font-semibold text-base leading-tight mb-1.5 truncate">
            {event.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-text-dim">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {formatDate(event.date)}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-dim/50" />
            <span className="flex items-center gap-1 truncate">
              <MapPin size={11} /> <span className="truncate">{event.venue}</span>
            </span>
          </div>
        </div>
        <span className="font-bold text-lg">{formatPrice(event.price)}</span>
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
  const hasEditorialGrid = events.length >= 3;
  const heroEvent = events[0];
  const sideEvents = events.slice(1);

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[4px] ${accentColor} mb-4`}>
                {subtitle}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em]">
                {title}
              </h2>
            </div>
            <Link
              href="/events"
              className="text-accent text-sm font-semibold hover:text-accent/80 transition-colors flex items-center gap-1.5 group"
            >
              View All
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {hasEditorialGrid ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 lg:row-span-2">
              <HeroCard event={heroEvent} />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-4">
              {sideEvents.map((event) => (
                <SideCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {events.map((event) => (
              <div key={event.id} className="aspect-[4/3]">
                <HeroCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
