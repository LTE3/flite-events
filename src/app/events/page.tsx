"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, MapPin, Sparkles, Compass } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { CardSkeleton } from "@/components/ui/skeleton";
import type { Event, Category } from "@/lib/types";

const categories: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Music", value: "music" },
  { label: "Nightlife", value: "nightlife" },
  { label: "Fitness", value: "fitness" },
  { label: "Food & Drink", value: "food_drink" },
  { label: "Connections", value: "connections" },
  { label: "Art", value: "art" },
  { label: "Comedy", value: "comedy" },
];

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "all") params.set("category", activeCategory);
      if (query) params.set("search", query);
      const res = await fetch(`/api/events?${params}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, query]);

  useEffect(() => {
    const timeout = setTimeout(fetchEvents, query ? 300 : 0);
    return () => clearTimeout(timeout);
  }, [fetchEvents, query]);

  return (
    <div className="min-h-screen">
      {/* Header — layered gradient + grain, more presence */}
      <div className="relative overflow-hidden border-b border-white/[0.05]">
        {/* Background layers */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(255,77,77,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 95% 20%, rgba(255,77,77,0.08), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        {/* Fade at bottom */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-24 pointer-events-none bg-gradient-to-b from-transparent to-bg"
        />

        <div className="relative px-6 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Locale chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6 backdrop-blur-sm">
              <MapPin size={13} className="text-accent" />
              <span className="text-xs font-medium tracking-wide text-text-dim uppercase">New York City</span>
              <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-text-dim">Live</span>
            </div>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-[-0.035em] leading-[0.9] mb-5">
              What&apos;s{" "}
              <span className="relative inline-block">
                <span className="text-accent">On</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/60"
                  style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)" }}
                />
              </span>
              <span className="text-accent">.</span>
            </h1>

            <p className="text-text-dim text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
              Shows, parties, afters. Every door in the city, one place.
            </p>

            {/* Search */}
            <div className="flex gap-3 max-w-2xl">
              <div className="flex-1 flex items-center bg-bg-elevated/80 backdrop-blur-sm border border-white/[0.08] rounded-xl px-4 focus-within:border-accent/40 focus-within:bg-bg-elevated transition-all duration-300">
                <Search size={18} className="text-text-dim shrink-0" />
                <label htmlFor="events-search" className="sr-only">Search events</label>
                <input
                  id="events-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events, venues, neighborhoods..."
                  className="flex-1 bg-transparent border-none outline-none text-sm px-3 py-3.5 placeholder:text-text-muted"
                />
              </div>
              <button
                aria-label="Filters"
                className="px-4 bg-bg-elevated/80 backdrop-blur-sm border border-white/[0.08] rounded-xl text-text-dim hover:text-text hover:border-white/[0.15] transition-all duration-200"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Results — elevated card surface */}
      <div className="px-6 pb-20 -mt-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-bg-card border border-white/[0.05] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
            {/* Category filters — tabs */}
            <div className="relative mb-8">
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-white/[0.06]">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      className={`relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-lg ${
                        isActive
                          ? "text-accent"
                          : "text-text-dim hover:text-text hover:bg-white/[0.04]"
                      }`}
                    >
                      {cat.label}
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute left-2 right-2 -bottom-[1px] h-[2px] bg-accent rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-dim">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Loading the city...
                  </span>
                ) : (
                  <>
                    <span className="font-[family-name:var(--font-display)] text-text font-semibold text-base">
                      {events.length}
                    </span>{" "}
                    event{events.length !== 1 ? "s" : ""}
                    {activeCategory !== "all" && (
                      <span>
                        {" "}in{" "}
                        <span className="text-accent font-medium capitalize">
                          {activeCategory.replace("_", " & ")}
                        </span>
                      </span>
                    )}
                    {query && (
                      <span>
                        {" "}matching &quot;
                        <span className="text-text font-medium">{query}</span>
                        &quot;
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* Results */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : events.length === 0 ? (
              <div className="relative text-center py-20 sm:py-28 px-6 overflow-hidden rounded-2xl bg-bg-elevated/40 border border-dashed border-white/[0.08]">
                {/* Ambient glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse 40% 50% at 50% 40%, rgba(255,77,77,0.08), transparent 70%)",
                  }}
                />

                <div className="relative">
                  {/* Stacked icon composition */}
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-2xl bg-bg-elevated border border-white/[0.08] rotate-[-8deg]" />
                    <div className="absolute inset-0 rounded-2xl bg-bg-elevated border border-white/[0.08] rotate-[6deg]" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bg-elevated to-bg-card border border-white/[0.1] flex items-center justify-center">
                      <Compass size={36} className="text-accent" strokeWidth={1.5} />
                      <Sparkles
                        size={14}
                        className="absolute top-3 right-3 text-accent/70"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] mb-3">
                    No signal on that one.
                  </h3>
                  <p className="text-text-dim text-base max-w-md mx-auto mb-8 leading-relaxed">
                    {query
                      ? <>Nothing in the city matches &quot;<span className="text-text">{query}</span>&quot; right now. The night&apos;s still young — try a different angle.</>
                      : "Nothing in this category tonight. Switch it up — there's always something cooking."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.04] border border-white/[0.08] text-text-dim hover:text-text hover:border-white/[0.15] transition-all duration-200"
                      >
                        Clear search
                      </button>
                    )}
                    {activeCategory !== "all" && (
                      <button
                        onClick={() => setActiveCategory("all")}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-all duration-200"
                      >
                        Browse everything
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {events.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
