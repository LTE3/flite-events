"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const categoryOptions = [
  { label: "Music", value: "music" },
  { label: "Nightlife", value: "nightlife" },
  { label: "Fitness", value: "fitness" },
  { label: "Food & Drink", value: "food_drink" },
  { label: "Connections", value: "connections" },
  { label: "Art", value: "art" },
  { label: "Comedy", value: "comedy" },
];

export default function CreateEventPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: Save to Supabase
    await new Promise((r) => setTimeout(r, 1000));
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-black font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-black mb-2">Event Created!</h1>
          <p className="text-text-dim mb-6">Your event has been saved as a draft.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/admin"><Button variant="outline">Back to Dashboard</Button></Link>
            <Link href="/events"><Button>View Events</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-black mb-8">Create Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Event Title</label>
            <input
              name="title"
              required
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="e.g. Neon Nights: Rooftop DJ Set"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
              placeholder="Tell people what to expect..."
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Date</label>
              <input
                name="date"
                type="date"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Start Time</label>
              <input
                name="time"
                type="time"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">End Time</label>
              <input
                name="end_time"
                type="time"
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Venue Name</label>
              <input
                name="venue"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="e.g. Skyline Terrace"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Address</label>
              <input
                name="address"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="123 Main St"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">City</label>
              <input
                name="city"
                required
                defaultValue="New York"
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Borough / Area</label>
              <input
                name="borough"
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="e.g. Brooklyn, Williamsburg"
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Category</label>
              <select
                name="category"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Ticket Price ($)</label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="0 for free"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Total Tickets</label>
              <input
                name="tickets_total"
                type="number"
                min="1"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="200"
              />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Event Image</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto mb-3 text-text-dim" />
              <p className="text-sm text-text-dim">Click to upload or drag and drop</p>
              <p className="text-xs text-text-dim/60 mt-1">PNG, JPG up to 5MB</p>
              <input type="file" name="image" accept="image/*" className="hidden" />
            </div>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="featured" className="w-5 h-5 rounded bg-bg-elevated border border-white/10 accent-accent" />
            <span className="text-sm font-medium">Feature this event on the homepage</span>
          </label>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading} className="flex-1 justify-center" size="lg">
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
