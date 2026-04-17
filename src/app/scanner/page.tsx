"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ScanLine, CheckCircle, XCircle, Camera, ClipboardList, Search, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Event, GuestListEntry } from "@/lib/types";

type Tab = "qr" | "guest";

export default function ScannerPage() {
  const [tab, setTab] = useState<Tab>("qr");

  // QR Scanner state
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5ScannerRef = useRef<unknown>(null);

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

  const validateCode = useCallback(async (qrCode: string) => {
    setScanning(true);
    setResult(null);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_code: qrCode }),
      });
      const data = await res.json();
      setResult({ valid: data.valid, message: data.message });
    } catch {
      setResult({ valid: false, message: "Scanner error. Check connection." });
    } finally {
      setScanning(false);
    }
  }, []);

  async function startCamera() {
    setCameraError("");
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      if (!scannerRef.current) return;

      const scanner = new Html5Qrcode("qr-reader");
      html5ScannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          scanner.stop().catch(() => {});
          html5ScannerRef.current = null;
          setCameraActive(false);
          setCode(decodedText);
          validateCode(decodedText);
        },
        () => {},
      );
      setCameraActive(true);
    } catch (err) {
      setCameraError(
        err instanceof Error && err.message.includes("Permission")
          ? "Camera access denied. Allow camera access in your browser settings."
          : "Could not start camera. Try typing the code instead."
      );
    }
  }

  async function stopCamera() {
    try {
      const scanner = html5ScannerRef.current as { stop: () => Promise<void> } | null;
      if (scanner) await scanner.stop();
    } catch { /* already stopped */ }
    html5ScannerRef.current = null;
    setCameraActive(false);
  }

  useEffect(() => {
    return () => { stopCamera(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    await validateCode(code);
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
        <h1 className="text-3xl font-bold text-center mb-2">Door Check-In</h1>
        <p className="text-text-dim text-center mb-6">Scan or search.</p>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-bg-card border border-white/[0.06] rounded-xl mb-8" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "qr"}
            onClick={() => { setTab("qr"); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              tab === "qr" ? "bg-accent text-white" : "text-text-dim hover:text-text"
            }`}
          >
            <ScanLine size={16} /> QR Scanner
          </button>
          <button
            role="tab"
            aria-selected={tab === "guest"}
            onClick={() => { setTab("guest"); stopCamera(); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              tab === "guest" ? "bg-accent text-white" : "text-text-dim hover:text-text"
            }`}
          >
            <ClipboardList size={16} /> Guest List
          </button>
        </div>

        {tab === "qr" ? (
          <>
            {/* Camera scanner */}
            <div className="aspect-square bg-bg-card border border-white/[0.06] rounded-2xl flex flex-col items-center justify-center mb-6 overflow-hidden relative">
              <div id="qr-reader" ref={scannerRef} className={cameraActive ? "w-full h-full" : "hidden"} />
              {!cameraActive && (
                <div className="flex flex-col items-center justify-center p-8">
                  {cameraError ? (
                    <>
                      <CameraOff size={48} className="text-text-dim mb-4" />
                      <p className="text-text-dim text-sm text-center mb-4">{cameraError}</p>
                      <Button size="sm" variant="outline" onClick={startCamera}>Try Again</Button>
                    </>
                  ) : (
                    <>
                      <Camera size={48} className="text-text-dim mb-4" />
                      <p className="text-text-dim text-sm mb-4">Tap to activate camera</p>
                      <Button size="sm" onClick={startCamera}>
                        <Camera size={14} className="mr-2" /> Start Camera
                      </Button>
                    </>
                  )}
                </div>
              )}
              {cameraActive && (
                <button
                  onClick={stopCamera}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 rounded-lg text-xs font-medium hover:bg-black/80 transition-colors"
                >
                  Stop
                </button>
              )}
            </div>

            {/* Manual entry */}
            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <label htmlFor="scan-code" className="block text-sm font-medium mb-1.5">Or type the code</label>
                <input
                  id="scan-code"
                  type="text"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setResult(null); }}
                  placeholder="Paste ticket code"
                  className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors font-mono"
                />
              </div>
              <Button type="submit" disabled={scanning || !code} className="w-full justify-center" size="lg">
                <ScanLine size={18} className="mr-2" />
                {scanning ? "Checking..." : "Check ticket"}
              </Button>
            </form>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-5 rounded-2xl border flex items-center gap-4 ${
                result.valid
                  ? "bg-success/10 border-success/30"
                  : "bg-danger/10 border-danger/30"
              }`}>
                {result.valid ? (
                  <CheckCircle size={32} className="text-success shrink-0" />
                ) : (
                  <XCircle size={32} className="text-danger shrink-0" />
                )}
                <div>
                  <p className={`font-bold ${result.valid ? "text-success" : "text-danger"}`}>
                    {result.valid ? "Valid — let them in" : "Invalid ticket"}
                  </p>
                  <p className="text-sm text-text-dim">{result.message}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Event selector */}
            <label htmlFor="scan-event" className="sr-only">Select event</label>
            <select
              id="scan-event"
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
                  <label htmlFor="scan-guest-search" className="sr-only">Search guest name</label>
                  <input
                    id="scan-guest-search"
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
                    <p className="text-text-dim">{guestSearch ? "No guest by that name" : "No guests for this event"}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredGuests.map((guest) => (
                      <button
                        key={guest.id}
                        onClick={() => !guest.checked_in && checkInGuest(guest)}
                        disabled={guest.checked_in}
                        aria-label={guest.checked_in ? `${guest.name} already checked in` : `Check in ${guest.name}`}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                          guest.checked_in
                            ? "bg-success/5 border-success/20"
                            : "bg-bg-card border-white/[0.06] hover:border-accent/30 active:scale-[0.98]"
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                          guest.checked_in ? "bg-success text-black" : "bg-white/[0.06] text-text-dim"
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
                          <span className="text-xs text-success">
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
