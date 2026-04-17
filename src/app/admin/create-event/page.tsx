"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TierDraft {
  name: string;
  price: string;
  quantity: string;
}

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
  const [error, setError] = useState("");
  const [tiers, setTiers] = useState<TierDraft[]>([]);
  const [useTiers, setUseTiers] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      setImagePreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
      setImagePreview("");
      setImageUrl("");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          description: form.get("description"),
          date: form.get("date"),
          time: form.get("time"),
          end_time: form.get("end_time") || null,
          venue: form.get("venue"),
          address: form.get("address"),
          city: form.get("city") || "New York",
          borough: form.get("borough") || null,
          category: form.get("category"),
          price: parseFloat(form.get("price") as string) || 0,
          tickets_total: parseInt(form.get("tickets_total") as string) || 100,
          featured: form.get("featured") === "on",
          image_url: imageUrl || "/placeholder-event.jpg",
          status: "published",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");

      // Create tiers if any
      if (useTiers && tiers.length > 0 && data.event?.id) {
        for (let i = 0; i < tiers.length; i++) {
          await fetch("/api/tiers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event_id: data.event.id,
              name: tiers[i].name,
              price: parseFloat(tiers[i].price) || 0,
              quantity: parseInt(tiers[i].quantity) || 50,
              sort_order: i,
            }),
          });
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-2">Event&apos;s live.</h1>
          <p className="text-text-dim mb-6">Published and ready to sell.</p>
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
        <h1 className="text-3xl font-extrabold mb-8">Create Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}
          {/* Title */}
          <div>
            <label htmlFor="ce-title" className="block text-sm font-medium mb-1.5">Event Title</label>
            <input
              id="ce-title"
              name="title"
              required
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="e.g. Neon Nights: Rooftop DJ Set"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="ce-desc" className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              id="ce-desc"
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
              <label htmlFor="ce-date" className="block text-sm font-medium mb-1.5">Date</label>
              <input
                id="ce-date"
                name="date"
                type="date"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="ce-time" className="block text-sm font-medium mb-1.5">Start Time</label>
              <input
                id="ce-time"
                name="time"
                type="time"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="ce-endtime" className="block text-sm font-medium mb-1.5">End Time</label>
              <input
                id="ce-endtime"
                name="end_time"
                type="time"
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ce-venue" className="block text-sm font-medium mb-1.5">Venue Name</label>
              <input
                id="ce-venue"
                name="venue"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="e.g. Skyline Terrace"
              />
            </div>
            <div>
              <label htmlFor="ce-address" className="block text-sm font-medium mb-1.5">Address</label>
              <input
                id="ce-address"
                name="address"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="123 Main St"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ce-city" className="block text-sm font-medium mb-1.5">City</label>
              <input
                id="ce-city"
                name="city"
                required
                defaultValue="New York"
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="ce-borough" className="block text-sm font-medium mb-1.5">Borough / Area</label>
              <input
                id="ce-borough"
                name="borough"
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="e.g. Brooklyn, Williamsburg"
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ce-category" className="block text-sm font-medium mb-1.5">Category</label>
              <select
                id="ce-category"
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
              <label htmlFor="ce-price" className="block text-sm font-medium mb-1.5">Ticket Price ($)</label>
              <input
                id="ce-price"
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
              <label htmlFor="ce-tickets" className="block text-sm font-medium mb-1.5">Total Tickets</label>
              <input
                id="ce-tickets"
                name="tickets_total"
                type="number"
                min="1"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="200"
              />
            </div>
          </div>

          {/* Ticket Tiers */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={useTiers}
                onChange={(e) => setUseTiers(e.target.checked)}
                className="w-5 h-5 rounded bg-bg-elevated border border-white/10 accent-accent"
              />
              <span className="text-sm font-medium">Use ticket tiers (GA, VIP, etc.)</span>
            </label>

            {useTiers && (
              <div className="space-y-3 p-5 bg-bg-card border border-white/[0.06] rounded-xl">
                {tiers.map((tier, i) => (
                  <div key={i} className="grid grid-cols-2 sm:grid-cols-[1fr_80px_80px_40px] gap-2 items-end">
                    <div>
                      {i === 0 && <label className="block text-xs font-medium mb-1 text-text-dim">Tier Name</label>}
                      <input
                        value={tier.name}
                        onChange={(e) => {
                          const next = [...tiers];
                          next[i] = { ...next[i], name: e.target.value };
                          setTiers(next);
                        }}
                        placeholder="e.g. GA, VIP"
                        className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      {i === 0 && <label className="block text-xs font-medium mb-1 text-text-dim">Price</label>}
                      <input
                        type="number"
                        value={tier.price}
                        onChange={(e) => {
                          const next = [...tiers];
                          next[i] = { ...next[i], price: e.target.value };
                          setTiers(next);
                        }}
                        placeholder="$"
                        min="0"
                        step="0.01"
                        className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      {i === 0 && <label className="block text-xs font-medium mb-1 text-text-dim">Qty</label>}
                      <input
                        type="number"
                        value={tier.quantity}
                        onChange={(e) => {
                          const next = [...tiers];
                          next[i] = { ...next[i], quantity: e.target.value };
                          setTiers(next);
                        }}
                        placeholder="100"
                        min="1"
                        className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setTiers(tiers.filter((_, j) => j !== i))}
                      aria-label={`Remove tier ${tier.name || i + 1}`}
                      className="w-11 h-11 flex items-center justify-center text-text-dim hover:text-danger transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setTiers([...tiers, { name: "", price: "", quantity: "" }])}
                  className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  <Plus size={16} /> Add Tier
                </button>
              </div>
            )}
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Event Image</label>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={imagePreview}
                  alt="Event image preview"
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                  unoptimized
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => { setImagePreview(""); setImageUrl(""); if (fileRef.current) fileRef.current.value = ""; }}
                  aria-label="Remove image"
                  className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer"
              >
                <Upload size={32} className="mx-auto mb-3 text-text-dim" />
                <p className="text-sm text-text-dim">Click to upload or drag and drop</p>
                <p className="text-xs text-text-dim/60 mt-1">PNG, JPG, WebP up to 5MB</p>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
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
