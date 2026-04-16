"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Lock, Ticket, Shield, Zap } from "lucide-react";
import { formatDate, formatTime, formatPrice } from "@/lib/utils";
import type { Event, TicketTier } from "@/lib/types";

export default function CheckoutPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [tiers, setTiers] = useState<TicketTier[]>([]);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetch event
        const res = await fetch(`/api/events?search=${encodeURIComponent(slug)}`);
        const json = await res.json();
        const found = (json.events || []).find((e: Event) => e.slug === slug);
        if (found) {
          setEvent(found);
          // Fetch tiers
          const tiersRes = await fetch(`/api/tiers?event_id=${found.id}`);
          const tiersJson = await tiersRes.json();
          const eventTiers = tiersJson.tiers || [];
          setTiers(eventTiers);
          if (eventTiers.length > 0) {
            setSelectedTier(eventTiers[0].id);
          }
        }
      } catch { /* fallback handled */ }

      // Pre-fill email from auth
      try {
        const { createClient } = await import("@/lib/supabase");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) setEmail(user.email);
      } catch { /* not logged in */ }

      setPageLoading(false);
    }
    load();
  }, [slug]);

  if (pageLoading) {
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

  const activeTier = tiers.find((t) => t.id === selectedTier);
  const unitPrice = activeTier ? activeTier.price : event.price;
  const total = unitPrice * quantity;
  const maxQty = activeTier
    ? Math.min(activeTier.quantity - activeTier.sold, 10)
    : Math.min(event.tickets_left, 10);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event!.id,
          quantity,
          email,
          tierId: selectedTier || undefined,
        }),
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
    <div className="min-h-screen px-6 py-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent/6 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        <Link href={`/events/${slug}`} className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Event
        </Link>

        <h1 className="text-3xl font-800 mb-8">Checkout</h1>

        {/* Event summary */}
        <div className="flex gap-5 p-5 rounded-2xl bg-bg-card border border-white/[0.06] mb-8 animate-fade-up">
          <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0">
            <Image src={event.image_url} alt={event.title} fill className="object-cover" sizes="112px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 bg-accent rounded text-[10px] font-bold text-white uppercase tracking-wider mb-2">
              {event.category.replace("_", " & ")}
            </span>
            <h2 className="font-bold text-lg leading-tight truncate">{event.title}</h2>
            <p className="text-sm text-text-dim mt-1">{formatDate(event.date)} &bull; {formatTime(event.time)}</p>
            <p className="text-sm text-text-dim">{event.venue}</p>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="space-y-6">
          {/* Tier selection */}
          {tiers.length > 0 && (
            <div className="p-6 rounded-2xl bg-bg-card border border-white/[0.06] animate-fade-up">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">Select Tier</label>
              <div className="space-y-2">
                {tiers.map((tier) => {
                  const tierSoldOut = tier.sold >= tier.quantity;
                  const isSelected = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      disabled={tierSoldOut}
                      onClick={() => { setSelectedTier(tier.id); setQuantity(1); }}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        tierSoldOut
                          ? "bg-white/[0.02] border border-white/[0.04] opacity-50 cursor-not-allowed"
                          : isSelected
                          ? "bg-accent/10 border border-accent/30"
                          : "bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{tier.name}</span>
                        <span className="font-800">{formatPrice(tier.price)}</span>
                      </div>
                      <div className="text-xs text-text-dim mt-1">
                        {tierSoldOut ? "Sold out" : `${tier.quantity - tier.sold} remaining`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="p-6 rounded-2xl bg-bg-card border border-white/[0.06] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-4">Quantity</label>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
              >
                <Minus size={18} />
              </button>
              <span className="text-3xl font-800 w-12 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
              >
                <Plus size={18} />
              </button>
              <span className="text-sm text-text-dim ml-2">Max {maxQty}</span>
            </div>
          </div>

          {/* Email */}
          <div className="p-6 rounded-2xl bg-bg-card border border-white/[0.06] animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-3">Email for tickets</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent transition-colors"
            />
            <p className="text-xs text-text-dim mt-2 flex items-center gap-1.5">
              <Ticket size={12} /> QR code tickets will be sent to this email
            </p>
          </div>

          {/* Total */}
          <div className="p-6 rounded-2xl bg-bg-card border border-white/[0.06] animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-between mb-3">
              <span className="text-text-dim text-sm">
                {quantity}x {activeTier ? activeTier.name : "Ticket"}
              </span>
              <span className="text-sm font-medium">{formatPrice(unitPrice)} each</span>
            </div>
            <div className="border-t border-white/[0.06] pt-4 mt-2 flex justify-between items-center">
              <span className="font-bold text-lg">Total</span>
              <span className="font-800 text-2xl text-accent">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Pay button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent text-white font-semibold text-base rounded-xl transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Lock size={16} />
            {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
          </button>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 text-xs text-text-dim animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <span className="flex items-center gap-1.5"><Shield size={13} /> Secure payment</span>
            <span className="flex items-center gap-1.5"><Zap size={13} /> Instant delivery</span>
            <span className="flex items-center gap-1.5"><Ticket size={13} /> QR code ticket</span>
          </div>
        </form>
      </div>
    </div>
  );
}
