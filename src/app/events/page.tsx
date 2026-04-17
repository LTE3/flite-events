"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { CardSkeleton } from "@/components/ui/skeleton";
import type { Event, Category } from "@/lib/types";

const categories: { label: string; value: Category | "all" }[] = [
  { label: "All Events", value: "all" },
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
      {/* Header */}
      <div className="relative px-6 pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={16} className="text-accent" />
            <span className="text-sm text-text-dim">New York City</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] mb-2">
            Browse <span className="accent-text">Events</span>
          </h1>
          <p className="text-text-dim text-lg mb-8">Find your next experience</p>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1 flex items-center bg-bg-elevated border border-white/[0.08] rounded-xl px-4 focus-within:border-accent/40 transition-all duration-300">
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
            <button aria-label="Filters" className="px-4 bg-bg-elevated border border-white/[0.08] rounded-xl text-text-dim hover:text-text hover:bg-bg-overlay transition-all duration-200">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters + Results */}
      <div className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
                  activeCategory === cat.value
                    ? "bg-accent text-white border-transparent font-semibold"
                    : "bg-white/[0.03] text-text-dim border-white/[0.06] hover:text-text hover:border-white/[0.15] hover:bg-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-text-dim mb-6">
            {loading ? "Loading..." : (
              <>
                {events.length} event{events.length !== 1 ? "s" : ""} found
                {activeCategory !== "all" && <span> in <span className="text-accent font-medium capitalize">{activeCategory.replace("_", " & ")}</span></span>}
                {query && <span> matching &quot;<span className="text-text font-medium">{query}</span>&quot;</span>}
              </>
            )}
          </p>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
                <Search size={32} className="text-text-dim/40" />
              </div>
              <p className="text-xl font-extrabold mb-2">No events found</p>
              <p className="text-text-dim text-sm">Try adjusting your search or filters</p>
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
  );
}
