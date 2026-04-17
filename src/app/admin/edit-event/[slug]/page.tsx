"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import type { Event } from "@/lib/types";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/events?search=${encodeURIComponent(slug)}`);
        const json = await res.json();
        const found = (json.events || []).find((e: Event) => e.slug === slug);
        setEvent(found || null);
      } catch {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!event) return;
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("events")
        .update({
          title: form.get("title") as string,
          description: form.get("description") as string,
          date: form.get("date") as string,
          time: form.get("time") as string,
          end_time: (form.get("end_time") as string) || null,
          venue: form.get("venue") as string,
          price: Math.round(parseFloat(form.get("price") as string) * 100),
          tickets_total: parseInt(form.get("tickets_total") as string),
        })
        .eq("id", event.id);

      if (updateError) throw updateError;
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleCancel() {
    if (!event) return;
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      await supabase.from("events").update({ status: "cancelled" }).eq("id", event.id);
      router.push("/admin");
    } catch {
      setError("Failed to cancel event");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-display)]">Edit Event</h1>
        <p className="text-text-dim text-sm mb-8">
          {event.tickets_total - event.tickets_left} tickets sold &middot; {formatPrice(event.price * (event.tickets_total - event.tickets_left))} revenue
        </p>

        {error && (
          <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-xl text-sm text-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="ee-title" className="block text-sm font-medium mb-1.5">Event Title</label>
            <input
              id="ee-title"
              name="title"
              defaultValue={event.title}
              required
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="ee-desc" className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              id="ee-desc"
              name="description"
              defaultValue={event.description}
              rows={4}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ee-date" className="block text-sm font-medium mb-1.5">Date</label>
              <input
                id="ee-date"
                name="date"
                type="date"
                defaultValue={event.date}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="ee-time" className="block text-sm font-medium mb-1.5">Start Time</label>
              <input
                id="ee-time"
                name="time"
                type="time"
                defaultValue={event.time}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="ee-endtime" className="block text-sm font-medium mb-1.5">End Time</label>
              <input
                id="ee-endtime"
                name="end_time"
                type="time"
                defaultValue={event.end_time}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ee-venue" className="block text-sm font-medium mb-1.5">Venue</label>
              <input
                id="ee-venue"
                name="venue"
                defaultValue={event.venue}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="ee-price" className="block text-sm font-medium mb-1.5">Price ($)</label>
              <input
                id="ee-price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={(event.price / 100).toFixed(2)}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="ee-tickets" className="block text-sm font-medium mb-1.5">Total Tickets</label>
              <input
                id="ee-tickets"
                name="tickets_total"
                type="number"
                defaultValue={event.tickets_total}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="flex-1 justify-center" size="lg">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="danger" size="lg" onClick={handleCancel}>
              Cancel Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
