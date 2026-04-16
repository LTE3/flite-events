"use client";

import { DollarSign, Ticket, TrendingUp, Link2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";

interface PromoterStats {
  total_sales: number;
  total_earned: number;
  commission_rate: number;
  referral_code: string;
  status: string;
  recent_sales: Array<{
    id: string;
    commission_amount: number;
    status: string;
    created_at: string;
    events?: { title: string };
    tickets?: { email: string; quantity: number };
  }>;
}

export default function PromoterDashboardPage() {
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<PromoterStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/promoter/stats");
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        // Not a promoter or not logged in
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const referralLink = data?.referral_code
    ? `${window.location.origin}/events?ref=${data.referral_code}`
    : "";

  function copyLink() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const stats = [
    { label: "Total Sales", value: data ? String(data.total_sales) : "—", icon: Ticket, color: "text-accent" },
    { label: "Total Earned", value: data ? formatPrice(data.total_earned) : "—", icon: DollarSign, color: "text-green-400" },
    { label: "Commission Rate", value: data ? `${(data.commission_rate * 100).toFixed(0)}%` : "—", icon: TrendingUp, color: "text-accent" },
    { label: "Status", value: data?.status || "—", icon: Link2, color: "text-orange-400" },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-lg mx-auto text-center py-20">
          <p className="text-lg font-semibold mb-2">Not a Promoter</p>
          <p className="text-text-dim text-sm mb-6">You need to be an approved promoter to access this dashboard.</p>
          <a href="/promoter-signup"><Button>Apply Now</Button></a>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-800 mb-2">Promoter Dashboard</h1>
        <p className="text-text-dim mb-8">Track your sales and earnings</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
              <stat.icon size={22} className={`${stat.color} mb-3`} />
              <p className="text-2xl font-800">{stat.value}</p>
              <p className="text-sm text-text-dim">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Referral Link */}
        {referralLink && (
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
        )}

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
                {data.recent_sales.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-text-dim">No sales yet. Share your referral link to start earning!</td>
                  </tr>
                ) : (
                  data.recent_sales.map((sale, i) => (
                    <tr key={sale.id} className={i < data.recent_sales.length - 1 ? "border-b border-white/[0.06]" : ""}>
                      <td className="p-4 font-medium">{(sale.events as { title: string } | undefined)?.title || "Event"}</td>
                      <td className="p-4 text-text-dim">{new Date(sale.created_at).toLocaleDateString()}</td>
                      <td className="p-4">{(sale.tickets as { quantity: number } | undefined)?.quantity || 1}</td>
                      <td className="p-4 text-green-400">{formatPrice(sale.commission_amount)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          sale.status === "paid" ? "bg-green-500/20 text-green-400" :
                          sale.status === "approved" ? "bg-accent/10 text-accent" :
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
