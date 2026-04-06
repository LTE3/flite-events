"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleEvents } from "@/lib/sample-events";

export default function DoorSalesPage() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Create ticket directly via Supabase (no Stripe)
    await new Promise((r) => setTimeout(r, 1000));
    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-lg mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-black mb-2">Door Sales</h1>
        <p className="text-text-dim mb-8">Manually create tickets for walk-up attendees</p>

        {success ? (
          <div className="text-center py-12 bg-bg-card border border-white/[0.06] rounded-2xl">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-black font-bold">
              ✓
            </div>
            <p className="font-bold text-lg mb-2">Ticket Created!</p>
            <p className="text-text-dim text-sm mb-6">QR code sent to {email}</p>
            <Button onClick={() => { setSuccess(false); setEmail(""); setQuantity(1); }}>
              Create Another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Event</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              >
                <option value="">Select event...</option>
                {sampleEvents.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Attendee Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="attendee@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                max={10}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full justify-center" size="lg">
              <ShoppingBag size={16} className="mr-2" />
              {loading ? "Creating..." : "Create Door Ticket"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
