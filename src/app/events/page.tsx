"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { sampleEvents } from "@/lib/sample-events";
import type { Category } from "@/lib/types";

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

  const filtered = useMemo(() => {
    return sampleEvents.filter((e) => {
      if (activeCategory !== "all" && e.category !== activeCategory) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.borough?.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [query, activeCategory]);

  return (
    <div className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-6">Browse Events</h1>

        {/* Search */}
        <div className="flex items-center bg-bg-elevated border border-white/10 rounded-xl px-4 py-2 mb-6 focus-within:border-accent transition-colors max-w-lg">
          <Search size={18} className="text-text-dim shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, venues, neighborhoods..."
            className="flex-1 bg-transparent border-none outline-none text-sm px-3 py-1 placeholder:text-[#555]"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat.value
                  ? "bg-text text-bg border-text"
                  : "bg-bg-elevated text-text-dim border-white/[0.08] hover:text-text hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-dim text-lg">No events found</p>
            <p className="text-text-dim/60 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
