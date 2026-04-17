"use client";

import Link from "next/link";
import { CalendarPlus, Ticket, Users, DollarSign, ScanLine, ShoppingBag, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsSkeleton, TableSkeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

interface DashboardData {
  events: Event[];
  totalEvents: number;
  totalTicketsSold: number;
  totalRevenue: number;
}

const quickActions = [
  { label: "Create Event", href: "/admin/create-event", icon: CalendarPlus },
  { label: "QR Scanner", href: "/scanner", icon: ScanLine },
  { label: "Door Sales", href: "/admin/door-sales", icon: ShoppingBag },
  { label: "Guest List", href: "/admin/guest-list", icon: ClipboardList },
  { label: "Promoters", href: "/admin/promoters", icon: Users },
];

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/events");
        const json = await res.json();
        const events: Event[] = json.events || [];
        const totalTicketsSold = events.reduce((sum, e) => sum + (e.tickets_total - e.tickets_left), 0);
        const totalRevenue = events.reduce((sum, e) => sum + e.price * (e.tickets_total - e.tickets_left), 0);
        setData({
          events,
          totalEvents: events.length,
          totalTicketsSold,
          totalRevenue,
        });
      } catch {
        setData({ events: [], totalEvents: 0, totalTicketsSold: 0, totalRevenue: 0 });
      }
    }
    load();
  }, []);

  const stats = [
    { label: "Total Events", value: data ? String(data.totalEvents) : "—", icon: CalendarPlus, color: "text-accent" },
    { label: "Tickets Sold", value: data ? data.totalTicketsSold.toLocaleString() : "—", icon: Ticket, color: "text-accent" },
    { label: "Revenue", value: data ? formatPrice(data.totalRevenue) : "—", icon: DollarSign, color: "text-success" },
    { label: "Promoters", value: "—", icon: Users, color: "text-text-dim" },
  ];

  return (
    <div className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
            <p className="text-text-dim mt-1">Your events. Your door. Your money.</p>
          </div>
          <Link href="/admin/create-event">
            <Button><CalendarPlus size={16} className="mr-2" /> New Event</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon size={22} className={stat.color} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-text-dim">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-bg-card border border-white/[0.06] rounded-2xl p-6 flex items-center gap-4 hover:border-white/[0.12] hover:-translate-y-0.5 transition-all"
            >
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white">
                <action.icon size={22} />
              </div>
              <span className="font-semibold">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Recent Events */}
        <h2 className="text-xl font-bold mb-4">Recent Events</h2>
        <div className="bg-bg-card border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left p-4 font-semibold text-text-dim">Event</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Date</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Tickets</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Revenue</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Status</th>
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  <tr><td colSpan={5} className="p-0"><TableSkeleton rows={4} /></td></tr>
                ) : data.events.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-text-dim">Nothing booked yet. Start your first night.</td></tr>
                ) : (
                  data.events.map((event, i) => {
                    const sold = event.tickets_total - event.tickets_left;
                    const revenue = event.price * sold;
                    const pct = (sold / event.tickets_total) * 100;
                    return (
                      <tr key={event.id} className={`hover:bg-white/[0.02] ${i < data.events.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                        <td className="p-4">
                          <Link href={`/admin/edit-event/${event.slug}`} className="font-medium hover:text-accent transition-colors">
                            {event.title}
                          </Link>
                        </td>
                        <td className="p-4 text-text-dim">{formatDate(event.date)}</td>
                        <td className="p-4">{sold} / {event.tickets_total}</td>
                        <td className="p-4 text-success">{formatPrice(revenue)}</td>
                        <td className="p-4">
                          {pct >= 95 ? (
                            <span className="px-2 py-0.5 bg-danger/20 text-danger rounded-full text-xs font-semibold">Almost Sold Out</span>
                          ) : pct >= 70 ? (
                            <span className="px-2 py-0.5 bg-warning/20 text-warning rounded-full text-xs font-semibold">Selling Fast</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full text-xs font-semibold capitalize">{event.status}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
