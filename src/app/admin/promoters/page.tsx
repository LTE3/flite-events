"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, CheckCircle, XCircle, Clock, DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Promoter } from "@/lib/types";

export default function AdminPromotersPage() {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "active" | "suspended">("all");

  useEffect(() => {
    async function load() {
      try {
        const { createClient } = await import("@/lib/supabase");
        const supabase = createClient();
        const { data } = await supabase
          .from("promoters")
          .select("*")
          .order("created_at", { ascending: false });
        setPromoters((data as Promoter[]) || []);
      } catch {
        setPromoters([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function updateStatus(id: string, status: "active" | "suspended") {
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      const { data } = await supabase
        .from("promoters")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (data) {
        setPromoters((prev) => prev.map((p) => (p.id === id ? (data as Promoter) : p)));
      }
    } catch { /* handled */ }
  }

  const filtered = filter === "all" ? promoters : promoters.filter((p) => p.status === filter);
  const pendingCount = promoters.filter((p) => p.status === "pending").length;

  const statusConfig = {
    pending: { color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
    active: { color: "bg-green-500/20 text-green-400", icon: CheckCircle },
    suspended: { color: "bg-danger/20 text-danger", icon: XCircle },
  };

  return (
    <div className="px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Promoters</h1>
            <p className="text-text-dim mt-1">
              {promoters.length} total{pendingCount > 0 && ` · ${pendingCount} pending approval`}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
            <Users size={20} className="text-accent mb-2" />
            <p className="text-2xl font-extrabold">{promoters.length}</p>
            <p className="text-xs text-text-dim">Total Promoters</p>
          </div>
          <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
            <Clock size={20} className="text-yellow-400 mb-2" />
            <p className="text-2xl font-extrabold">{pendingCount}</p>
            <p className="text-xs text-text-dim">Pending</p>
          </div>
          <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
            <CheckCircle size={20} className="text-green-400 mb-2" />
            <p className="text-2xl font-extrabold">{promoters.filter((p) => p.status === "active").length}</p>
            <p className="text-xs text-text-dim">Active</p>
          </div>
          <div className="bg-bg-card border border-white/[0.06] rounded-2xl p-5">
            <DollarSign size={20} className="text-green-400 mb-2" />
            <p className="text-2xl font-extrabold">{formatPrice(promoters.reduce((s, p) => s + p.total_earned, 0))}</p>
            <p className="text-xs text-text-dim">Total Commissions</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "active", "suspended"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-accent text-white"
                  : "bg-bg-card border border-white/[0.06] text-text-dim hover:text-text"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-yellow-500/30 text-yellow-400 rounded text-[10px] font-bold">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Promoter list */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center bg-bg-card border border-white/[0.06] rounded-2xl">
            <Users size={32} className="mx-auto mb-3 text-text-dim" />
            <p className="text-text-dim">{filter === "all" ? "No promoters yet" : `No ${filter} promoters`}</p>
          </div>
        ) : (
          <div className="bg-bg-card border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left p-4 font-semibold text-text-dim">Code</th>
                    <th className="text-left p-4 font-semibold text-text-dim">Status</th>
                    <th className="text-left p-4 font-semibold text-text-dim">Commission</th>
                    <th className="text-left p-4 font-semibold text-text-dim">Sales</th>
                    <th className="text-left p-4 font-semibold text-text-dim">Earned</th>
                    <th className="text-left p-4 font-semibold text-text-dim">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => {
                    const StatusIcon = statusConfig[p.status].icon;
                    return (
                      <tr key={p.id} className={`hover:bg-white/[0.02] ${i < filtered.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs bg-bg-elevated px-2 py-1 rounded">{p.code}</span>
                            <a
                              href={`/?ref=${p.code}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-dim hover:text-accent transition-colors"
                              aria-label={`Open referral link for ${p.code}`}
                            >
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig[p.status].color}`}>
                            <StatusIcon size={12} /> {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-text-dim">{(p.commission_rate * 100).toFixed(0)}%</td>
                        <td className="p-4">{p.total_sales}</td>
                        <td className="p-4 text-green-400">{formatPrice(p.total_earned)}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {p.status === "pending" && (
                              <Button size="sm" onClick={() => updateStatus(p.id, "active")}>
                                Approve
                              </Button>
                            )}
                            {p.status === "active" && (
                              <Button size="sm" variant="danger" onClick={() => updateStatus(p.id, "suspended")}>
                                Suspend
                              </Button>
                            )}
                            {p.status === "suspended" && (
                              <Button size="sm" variant="outline" onClick={() => updateStatus(p.id, "active")}>
                                Reactivate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
