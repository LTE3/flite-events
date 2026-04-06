"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleEvents } from "@/lib/sample-events";

export default function EditEventPage() {
  const params = useParams();
  const slug = params.slug as string;
  const event = sampleEvents.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-text-dim">Event not found</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-black mb-8">Edit Event</h1>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Event Title</label>
            <input
              defaultValue={event.title}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              defaultValue={event.description}
              rows={4}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Date</label>
              <input
                type="date"
                defaultValue={event.date}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Start Time</label>
              <input
                type="time"
                defaultValue={event.time}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">End Time</label>
              <input
                type="time"
                defaultValue={event.end_time}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Venue</label>
              <input
                defaultValue={event.venue}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Price ($)</label>
              <input
                type="number"
                defaultValue={(event.price / 100).toFixed(2)}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="flex-1 justify-center" size="lg">
              Save Changes
            </Button>
            <Button type="button" variant="danger" size="lg">
              Cancel Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
