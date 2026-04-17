"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/lib/types";

export default function DoorSalesPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const json = await res.json();
        setEvents(json.events || []);
      } catch {
        setEvents([]);
      }
    }
    loadEvents();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();

      const qrCode = crypto.randomUUID();
      const ev = events.find((e) => e.id === selectedEvent);

      const { error: insertError } = await supabase.from("tickets").insert({
        event_id: selectedEvent,
        email,
        quantity,
        qr_code: qrCode,
        status: "valid",
        purchased_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;

      // Decrement tickets_left atomically via RPC or direct update
      if (ev) {
        await supabase.rpc("decrement_tickets_left", {
          p_event_id: ev.id,
          p_amount: quantity,
        }).then(({ error: rpcError }) => {
          if (rpcError) {
            // Fallback to direct update if RPC doesn't exist
            return supabase
              .from("events")
              .update({ tickets_left: Math.max(0, ev.tickets_left - quantity) })
              .eq("id", ev.id);
          }
        });
      }

      // Send ticket email with QR code
      if (ev) {
        try {
          await fetch("/api/door-sales-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              qrCode,
              eventTitle: ev.title,
              eventDate: ev.date,
              eventTime: ev.time,
              venue: ev.venue,
              quantity,
            }),
          });
        } catch {
          // Email send is best-effort for door sales
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sale didn't go through. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-lg mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Door Sales</h1>
        <p className="text-text-dim mb-8">Sell at the door. Fast.</p>

        {error && (
          <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-xl text-sm text-danger">{error}</div>
        )}

        {success ? (
          <div className="text-center py-12 bg-bg-card border border-white/[0.06] rounded-2xl">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white font-bold">
              ✓
            </div>
            <p className="font-bold text-lg mb-2">They&apos;re in.</p>
            <p className="text-text-dim text-sm mb-6">QR code sent to {email}</p>
            <Button onClick={() => { setSuccess(false); setEmail(""); setQuantity(1); setError(""); }}>
              Create Another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="ds-event" className="block text-sm font-medium mb-1.5">Event</label>
              <select
                id="ds-event"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              >
                <option value="">Select event...</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ds-email" className="block text-sm font-medium mb-1.5">Guest Email</label>
              <input
                id="ds-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="guest@email.com"
              />
            </div>
            <div>
              <label htmlFor="ds-qty" className="block text-sm font-medium mb-1.5">Quantity</label>
              <input
                id="ds-qty"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                max={10}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <Button type="submit" disabled={loading || !selectedEvent} className="w-full justify-center" size="lg">
              <ShoppingBag size={16} className="mr-2" />
              {loading ? "Selling..." : "Sell ticket"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
