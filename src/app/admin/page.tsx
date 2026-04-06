"use client";

import Link from "next/link";
import { CalendarPlus, Ticket, Users, DollarSign, ScanLine, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Events", value: "12", icon: CalendarPlus, color: "text-accent" },
  { label: "Tickets Sold", value: "1,847", icon: Ticket, color: "text-accent-2" },
  { label: "Revenue", value: "$24,350", icon: DollarSign, color: "text-green-400" },
  { label: "Promoters", value: "8", icon: Users, color: "text-purple-400" },
];

const quickActions = [
  { label: "Create Event", href: "/admin/create-event", icon: CalendarPlus },
  { label: "QR Scanner", href: "/scanner", icon: ScanLine },
  { label: "Door Sales", href: "/admin/door-sales", icon: ShoppingBag },
];

export default function AdminDashboard() {
  return (
    <div className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Admin Dashboard</h1>
            <p className="text-text-dim mt-1">Manage your events, tickets, and promoters</p>
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
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-sm text-text-dim">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-bg-card border border-white/[0.06] rounded-2xl p-6 flex items-center gap-4 hover:border-white/[0.12] hover:-translate-y-0.5 transition-all"
            >
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-black">
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
                <tr className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                  <td className="p-4 font-medium">Neon Nights: Rooftop DJ Set</td>
                  <td className="p-4 text-text-dim">Apr 10, 2026</td>
                  <td className="p-4">48 / 200</td>
                  <td className="p-4 text-accent-2">$1,200</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-accent-2/20 text-accent-2 rounded-full text-xs font-semibold">Published</span></td>
                </tr>
                <tr className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                  <td className="p-4 font-medium">Warehouse Rave: Techno Edition</td>
                  <td className="p-4 text-text-dim">Apr 11, 2026</td>
                  <td className="p-4">788 / 800</td>
                  <td className="p-4 text-accent-2">$27,580</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full text-xs font-semibold">Selling Fast</span></td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-medium">Day Party: Afrobeats Edition</td>
                  <td className="p-4 text-text-dim">Apr 12, 2026</td>
                  <td className="p-4">395 / 400</td>
                  <td className="p-4 text-accent-2">$7,900</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-danger/20 text-danger rounded-full text-xs font-semibold">Almost Sold Out</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
