"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
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
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          {/* Location + Title */}
          <div className="flex items-center gap-2 text-sm text-text-dim mb-4">
            <MapPin size={14} className="text-accent" />
            <span>New York City</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] mb-8">
            Events
          </h1>

          {/* Search */}
          <div className="flex items-center bg-bg-elevated border border-white/[0.08] rounded-xl px-4 max-w-xl focus-within:border-accent/40 transition-colors">
            <Search size={18} className="text-text-dim shrink-0" />
            <label htmlFor="events-search" className="sr-only">Search events</label>
            <input
              id="events-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, venues..."
              className="flex-1 bg-transparent border-none outline-none text-sm px-3 py-3.5 placeholder:text-text-muted"
            />
          </div>
        </div>
      </div>

      {/* Filters + Results */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 mb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-accent text-black"
                  : "bg-white/[0.04] border border-white/[0.06] text-text-dim hover:text-text hover:border-white/[0.12]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-text-dim">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Loading...
              </span>
            ) : (
              <>
                <span className="font-bold text-text">{events.length}</span>
                {" "}event{events.length !== 1 ? "s" : ""}
                {activeCategory !== "all" && (
                  <span className="text-accent font-medium">
                    {" "}in {activeCategory.replace("_", " & ")}
                  </span>
                )}
                {query && (
                  <span>
                    {" "}matching &quot;<span className="text-text">{query}</span>&quot;
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
          <div className="text-center py-24 border border-dashed border-white/[0.08] rounded-2xl">
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-3">
              No events found
            </h3>
            <p className="text-text-dim text-sm mb-6 max-w-md mx-auto">
              {query
                ? <>Nothing matches &quot;{query}&quot; right now. Try a different search.</>
                : "Nothing in this category. Try a different one."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="px-4 py-2 rounded-full text-sm font-medium border border-white/[0.08] text-text-dim hover:text-text transition-colors"
                >
                  Clear search
                </button>
              )}
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-accent text-black"
                >
                  Show all
                </button>
              )}
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
  );
}
