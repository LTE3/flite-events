"use client";

import { useState, useEffect } from "react";
import { ScanLine, CheckCircle, XCircle, Camera, ClipboardList, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event, GuestListEntry } from "@/lib/types";

type Tab = "qr" | "guest";

export default function ScannerPage() {
  const [tab, setTab] = useState<Tab>("qr");

  // QR Scanner state
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [scanning, setScanning] = useState(false);

  // Guest list state
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [guests, setGuests] = useState<GuestListEntry[]>([]);
  const [guestSearch, setGuestSearch] = useState("");
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    fetch("/api/events").then((r) => r.json()).then((j) => setEvents(j.events || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedEvent) { setGuests([]); return; }
    setGuestLoading(true);
    fetch(`/api/guest-list?event_id=${selectedEvent}`)
      .then((r) => r.json())
      .then((j) => setGuests(j.entries || []))
      .finally(() => setGuestLoading(false));
  }, [selectedEvent]);

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setScanning(true);
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_code: code }),
      });
      const data = await res.json();
      setResult({ valid: data.valid, message: data.message });
    } catch {
      setResult({ valid: false, message: "Scanner error. Check connection." });
    } finally {
      setScanning(false);
    }
  }

  async function checkInGuest(entry: GuestListEntry) {
    try {
      const res = await fetch("/api/guest-list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id, checked_in: true }),
      });
      const json = await res.json();
      if (json.entry) {
        setGuests((prev) => prev.map((g) => (g.id === entry.id ? json.entry : g)));
      }
    } catch { /* handled */ }
  }

  const filteredGuests = guestSearch
    ? guests.filter((g) => g.name.toLowerCase().includes(guestSearch.toLowerCase()))
    : guests;

  return (
    <div className="px-6 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-800 text-center mb-2">Door Check-In</h1>
        <p className="text-text-dim text-center mb-6">Scan tickets or check guest list</p>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-bg-card border border-white/[0.06] rounded-xl mb-8">
          <button
            onClick={() => setTab("qr")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              tab === "qr" ? "bg-accent text-white" : "text-text-dim hover:text-text"
            }`}
          >
            <ScanLine size={16} /> QR Scanner
          </button>
          <button
            onClick={() => setTab("guest")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              tab === "guest" ? "bg-accent text-white" : "text-text-dim hover:text-text"
            }`}
          >
            <ClipboardList size={16} /> Guest List
          </button>
        </div>

        {tab === "qr" ? (
          <>
            {/* Camera placeholder */}
            <div className="aspect-square bg-bg-card border border-white/[0.06] rounded-2xl flex flex-col items-center justify-center mb-6">
              <Camera size={64} className="text-text-dim mb-4" />
              <p className="text-text-dim text-sm mb-1">Camera scanner</p>
              <p className="text-text-dim/60 text-xs">Will use device camera when connected to Supabase</p>
            </div>

            {/* Manual entry */}
            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Or enter code manually</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setResult(null); }}
                  placeholder="Enter QR code value..."
                  className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors font-mono"
                />
              </div>
              <Button type="submit" disabled={scanning || !code} className="w-full justify-center" size="lg">
                <ScanLine size={18} className="mr-2" />
                {scanning ? "Checking..." : "Validate Ticket"}
              </Button>
            </form>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-5 rounded-2xl border flex items-center gap-4 ${
                result.valid
                  ? "bg-green-400/10 border-green-400/30"
                  : "bg-danger/10 border-danger/30"
              }`}>
                {result.valid ? (
                  <CheckCircle size={32} className="text-green-400 shrink-0" />
                ) : (
                  <XCircle size={32} className="text-danger shrink-0" />
                )}
                <div>
                  <p className={`font-bold ${result.valid ? "text-green-400" : "text-danger"}`}>
                    {result.valid ? "Valid Ticket" : "Invalid"}
                  </p>
                  <p className="text-sm text-text-dim">{result.message}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Event selector */}
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors mb-4"
            >
              <option value="">Select event...</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>

            {selectedEvent && (
              <>
                {/* Search */}
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
                  <input
                    value={guestSearch}
                    onChange={(e) => setGuestSearch(e.target.value)}
                    placeholder="Search guest name..."
                    className="w-full bg-bg-elevated border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Stats bar */}
                <div className="flex gap-4 mb-4 text-sm">
                  <span className="text-text-dim">
                    {guests.filter((g) => g.checked_in).length}/{guests.length} checked in
                  </span>
                </div>

                {/* Guest list */}
                {guestLoading ? (
                  <div className="py-12 text-center">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : filteredGuests.length === 0 ? (
                  <div className="py-12 text-center bg-bg-card border border-white/[0.06] rounded-xl">
                    <p className="text-text-dim">{guestSearch ? "No match" : "No guests for this event"}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredGuests.map((guest) => (
                      <button
                        key={guest.id}
                        onClick={() => !guest.checked_in && checkInGuest(guest)}
                        disabled={guest.checked_in}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                          guest.checked_in
                            ? "bg-green-400/5 border-green-400/20"
                            : "bg-bg-card border-white/[0.06] hover:border-accent/30 active:scale-[0.98]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          guest.checked_in ? "bg-green-400 text-black" : "bg-white/[0.06] text-text-dim"
                        }`}>
                          <CheckCircle size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${guest.checked_in ? "text-text-dim" : ""}`}>
                            {guest.name}
                            {guest.plus_ones > 0 && (
                              <span className="ml-2 text-xs text-text-dim font-normal">+{guest.plus_ones}</span>
                            )}
                          </p>
                          {guest.note && <p className="text-xs text-text-dim truncate">{guest.note}</p>}
                        </div>
                        {guest.checked_in ? (
                          <span className="text-xs text-green-400">
                            {guest.checked_in_at && new Date(guest.checked_in_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        ) : (
                          <span className="text-xs text-accent font-medium">Tap to check in</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
