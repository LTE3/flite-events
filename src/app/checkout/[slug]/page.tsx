"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleEvents } from "@/lib/sample-events";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const params = useParams();
  const slug = params.slug as string;
  const event = sampleEvents.find((e) => e.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill email from Supabase session
    (async () => {
      try {
        const { createClient } = await import("@/lib/supabase");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) setEmail(user.email);
      } catch { /* not logged in */ }
    })();
  }, []);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-text-dim">Event not found</p>
      </div>
    );
  }

  const total = event.price * quantity;
  const maxQty = Math.min(event.tickets_left, 10);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event!.id, quantity, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <Link href={`/events/${slug}`} className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Event
        </Link>

        <h1 className="text-2xl font-black mb-6">Checkout</h1>

        {/* Event summary */}
        <div className="flex gap-4 bg-bg-card border border-white/[0.06] rounded-2xl p-4 mb-8">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
            <Image src={event.image_url} alt={event.title} fill className="object-cover" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold truncate">{event.title}</h2>
            <p className="text-sm text-text-dim">{formatDate(event.date)} &bull; {formatTime(event.time)}</p>
            <p className="text-sm text-text-dim">{event.venue}</p>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="space-y-6">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-bg-elevated border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                className="w-10 h-10 rounded-full bg-bg-elevated border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors"
              >
                <Plus size={16} />
              </button>
              <span className="text-sm text-text-dim">Max {maxQty}</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email for tickets</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
            />
            <p className="text-xs text-text-dim mt-1.5">QR code tickets will be sent to this email</p>
          </div>

          {/* Total */}
          <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
            <div className="flex justify-between mb-2">
              <span className="text-text-dim text-sm">{quantity}x {event.title}</span>
              <span className="text-sm">{formatPrice(total)}</span>
            </div>
            <div className="border-t border-white/[0.06] pt-3 mt-3 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">{formatPrice(total)}</span>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full justify-center" size="lg">
            <Lock size={16} className="mr-2" />
            {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
          </Button>
          <p className="text-xs text-text-dim text-center">
            Secure payment powered by Stripe. Tickets delivered instantly via email.
          </p>
        </form>
      </div>
    </div>
  );
}
