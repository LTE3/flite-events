"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, CheckCircle, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event, GuestListEntry } from "@/lib/types";

export default function GuestListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [entries, setEntries] = useState<GuestListEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Add guest form
  const [guestName, setGuestName] = useState("");
  const [plusOnes, setPlusOnes] = useState(0);
  const [note, setNote] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      const res = await fetch("/api/events");
      const json = await res.json();
      setEvents(json.events || []);
    }
    loadEvents();
  }, []);

  useEffect(() => {
    if (!selectedEvent) {
      setEntries([]);
      return;
    }
    setLoading(true);
    fetch(`/api/guest-list?event_id=${selectedEvent}`)
      .then((r) => r.json())
      .then((json) => setEntries(json.entries || []))
      .finally(() => setLoading(false));
  }, [selectedEvent]);

  async function addGuest(e: React.FormEvent) {
    e.preventDefault();
    if (!guestName.trim() || !selectedEvent) return;
    setAdding(true);
    try {
      const res = await fetch("/api/guest-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: selectedEvent,
          name: guestName.trim(),
          plus_ones: plusOnes,
          note: note.trim() || null,
        }),
      });
      const json = await res.json();
      if (json.entry) {
        setEntries((prev) => [...prev, json.entry].sort((a, b) => a.name.localeCompare(b.name)));
        setGuestName("");
        setPlusOnes(0);
        setNote("");
      }
    } catch { /* handled */ }
    setAdding(false);
  }

  async function toggleCheckIn(entry: GuestListEntry) {
    try {
      const res = await fetch("/api/guest-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id, checked_in: !entry.checked_in }),
      });
      const json = await res.json();
      if (json.entry) {
        setEntries((prev) => prev.map((e) => (e.id === entry.id ? json.entry : e)));
      }
    } catch { /* handled */ }
  }

  async function removeGuest(id: string) {
    try {
      await fetch(`/api/guest-list?id=${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch { /* handled */ }
  }

  const filtered = search
    ? entries.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    : entries;

  const checkedIn = entries.filter((e) => e.checked_in).length;

  return (
    <div className="px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold mb-2 font-[family-name:var(--font-display)]">Guest List</h1>
        <p className="text-text-dim mb-8">Comps, VIPs, and plus-ones.</p>

        {/* Event selector */}
        <div className="mb-8">
          <label htmlFor="gl-event" className="block text-sm font-medium mb-1.5">Event</label>
          <select
            id="gl-event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
          >
            <option value="">Select event...</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.title}</option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-bg-card border border-white/[0.06] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{entries.length}</p>
                <p className="text-xs text-text-dim">Total Guests</p>
              </div>
              <div className="bg-bg-card border border-white/[0.06] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-success">{checkedIn}</p>
                <p className="text-xs text-text-dim">Checked In</p>
              </div>
              <div className="bg-bg-card border border-white/[0.06] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{entries.reduce((s, e) => s + e.plus_ones, 0)}</p>
                <p className="text-xs text-text-dim">Plus Ones</p>
              </div>
            </div>

            {/* Add guest form */}
            <form onSubmit={addGuest} className="bg-bg-card border border-white/[0.06] rounded-xl p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr_auto] gap-3 items-end">
                <div>
                  <label htmlFor="gl-name" className="block text-xs font-medium mb-1 text-text-dim">Name</label>
                  <input
                    id="gl-name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    placeholder="Guest name"
                    className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="gl-plusones" className="block text-xs font-medium mb-1 text-text-dim">+Ones</label>
                  <input
                    id="gl-plusones"
                    type="number"
                    value={plusOnes}
                    onChange={(e) => setPlusOnes(Number(e.target.value))}
                    min={0}
                    max={5}
                    className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="gl-note" className="block text-xs font-medium mb-1 text-text-dim">Note</label>
                  <input
                    id="gl-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="VIP, comp, etc."
                    className="w-full bg-bg-elevated border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>
                <Button type="submit" disabled={adding} size="sm" className="gap-1.5">
                  <UserPlus size={14} /> Add Guest
                </Button>
              </div>
            </form>

            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guests..."
                className="w-full bg-bg-elevated border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Guest list */}
            {loading ? (
              <div className="py-12 text-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center bg-bg-card border border-white/[0.06] rounded-xl">
                <p className="text-text-dim">{search ? "No matching guests" : "Empty list. Add your first guest above."}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      entry.checked_in
                        ? "bg-success/5 border-success/20"
                        : "bg-bg-card border-white/[0.06]"
                    }`}
                  >
                    <button
                      onClick={() => toggleCheckIn(entry)}
                      aria-label={entry.checked_in ? `Undo check-in for ${entry.name}` : `Check in ${entry.name}`}
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        entry.checked_in
                          ? "bg-success text-black"
                          : "bg-white/[0.06] text-text-dim hover:bg-white/[0.1]"
                      }`}
                    >
                      <CheckCircle size={18} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${entry.checked_in ? "line-through text-text-dim" : ""}`}>
                        {entry.name}
                        {entry.plus_ones > 0 && (
                          <span className="ml-2 text-xs text-text-dim font-normal">+{entry.plus_ones}</span>
                        )}
                      </p>
                      {entry.note && <p className="text-xs text-text-dim truncate">{entry.note}</p>}
                    </div>
                    {entry.checked_in && entry.checked_in_at && (
                      <span className="text-xs text-success shrink-0">
                        {new Date(entry.checked_in_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                    <button
                      onClick={() => removeGuest(entry.id)}
                      aria-label={`Remove ${entry.name}`}
                      className="w-11 h-11 flex items-center justify-center text-text-dim hover:text-danger transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
