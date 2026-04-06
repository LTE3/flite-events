"use client";

import { DollarSign, Ticket, TrendingUp, Link2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const stats = [
  { label: "Total Sales", value: "47", icon: Ticket, color: "text-accent" },
  { label: "Total Earned", value: "$705", icon: DollarSign, color: "text-accent-2" },
  { label: "Commission Rate", value: "15%", icon: TrendingUp, color: "text-purple-400" },
  { label: "Referral Clicks", value: "312", icon: Link2, color: "text-orange-400" },
];

export default function PromoterDashboardPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://pulsetix.ai/events?ref=johndoe";

  function copyLink() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Promoter Dashboard</h1>
        <p className="text-text-dim mb-8">Track your sales and earnings</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
              <stat.icon size={22} className={`${stat.color} mb-3`} />
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-sm text-text-dim">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Referral Link */}
        <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-6 mb-8">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <Link2 size={18} className="text-accent" /> Your Referral Link
          </h2>
          <div className="flex gap-2">
            <input
              readOnly
              value={referralLink}
              className="flex-1 bg-bg-elevated border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-text-dim"
            />
            <Button onClick={copyLink} variant="outline" size="sm" className="gap-1.5 shrink-0">
              <Copy size={14} /> {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
              <ExternalLink size={14} /> Share
            </Button>
          </div>
          <p className="text-xs text-text-dim mt-2">Share this link on social media. You earn commission on every ticket sold through it.</p>
        </div>

        {/* Recent Sales */}
        <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
        <div className="bg-bg-card border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left p-4 font-semibold text-text-dim">Event</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Date</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Tickets</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Commission</th>
                  <th className="text-left p-4 font-semibold text-text-dim">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/[0.06]">
                  <td className="p-4 font-medium">Neon Nights: Rooftop DJ Set</td>
                  <td className="p-4 text-text-dim">Apr 5, 2026</td>
                  <td className="p-4">2</td>
                  <td className="p-4 text-accent-2">$7.50</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-accent-2/20 text-accent-2 rounded-full text-xs font-semibold">Paid</span></td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="p-4 font-medium">Warehouse Rave: Techno Edition</td>
                  <td className="p-4 text-text-dim">Apr 4, 2026</td>
                  <td className="p-4">4</td>
                  <td className="p-4 text-accent-2">$21.00</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">Pending</span></td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Day Party: Afrobeats Edition</td>
                  <td className="p-4 text-text-dim">Apr 3, 2026</td>
                  <td className="p-4">1</td>
                  <td className="p-4 text-accent-2">$3.00</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-accent-2/20 text-accent-2 rounded-full text-xs font-semibold">Paid</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
