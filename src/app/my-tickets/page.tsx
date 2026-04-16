"use client";

import { useState, useEffect } from "react";
import { QrCode, Calendar, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TicketDisplay {
  id: string;
  qr_code: string;
  status: string;
  quantity: number;
  purchased_at: string;
  event_title: string;
  event_date: string;
  event_time: string;
  event_venue: string;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<TicketDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const { createClient } = await import("@/lib/supabase");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }
        const { data } = await supabase
          .from("tickets")
          .select("*, event:events(title, date, time, venue)")
          .eq("user_id", user.id)
          .order("purchased_at", { ascending: false });

        if (data) {
          setTickets(data.map((t: Record<string, unknown>) => {
            const event = t.event as Record<string, string> | null;
            return {
              id: t.id as string,
              qr_code: t.qr_code as string,
              status: t.status as string,
              quantity: t.quantity as number,
              purchased_at: t.purchased_at as string,
              event_title: event?.title || "Unknown Event",
              event_date: event?.date || "",
              event_time: event?.time || "",
              event_venue: event?.venue || "",
            };
          }));
        }
      } catch {
        // Not logged in or Supabase not configured
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-800 mb-6">My Tickets</h1>
          <div className="text-center py-20 bg-bg-card border border-white/[0.06] rounded-2xl">
            <QrCode size={48} className="mx-auto mb-4 text-text-dim" />
            <p className="text-lg font-semibold mb-2">No tickets yet</p>
            <p className="text-text-dim text-sm mb-6">When you purchase tickets, they&apos;ll appear here with your QR codes.</p>
            <a href="/events"><Button>Browse Events</Button></a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-800 mb-6">My Tickets</h1>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-bg-card border border-white/[0.06] rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
              {/* QR Code */}
              <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                <QrCode size={80} className="text-black" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{ticket.event_title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    ticket.status === "valid" ? "bg-green-500/20 text-green-400" :
                    ticket.status === "used" ? "bg-text-dim/20 text-text-dim" :
                    "bg-danger/20 text-danger"
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-dim mb-1">
                  <Calendar size={14} /> {ticket.event_date} &bull; {ticket.event_time}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-dim mb-3">
                  <MapPin size={14} /> {ticket.event_venue}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-dim">
                  <span>Qty: {ticket.quantity}</span>
                  <span>&bull;</span>
                  <span>ID: {ticket.qr_code.slice(0, 8)}...</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 shrink-0">
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Download size={14} /> Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
