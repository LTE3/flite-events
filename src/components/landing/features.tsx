"use client";

import { useState } from "react";
import { Ticket, Users, BarChart3, QrCode, Megaphone, CreditCard } from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Ticketing & Sales",
    headline: "Sell tickets your way",
    desc: "Set your prices, control capacity, and sell directly to your audience. No middlemen taking 15% cuts. Instant Stripe payouts to your account.",
    stats: ["$0 platform fee", "Instant payouts", "Custom pricing"],
    gradient: "from-accent to-purple-500",
    glow: "rgba(108, 99, 255, 0.15)",
  },
  {
    icon: Users,
    title: "Promoter Network",
    headline: "Build your street team",
    desc: "Give every promoter their own referral link. Track who's driving sales in real-time. Automatic commission calculations and multi-tier payouts.",
    stats: ["Referral tracking", "Auto commissions", "Multi-tier payouts"],
    gradient: "from-accent-2 to-emerald-500",
    glow: "rgba(0, 229, 160, 0.15)",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    headline: "Know your numbers",
    desc: "Real-time dashboard showing ticket sales, revenue, promoter performance, and attendee demographics. Make smarter decisions for your next event.",
    stats: ["Real-time data", "Revenue tracking", "Promoter analytics"],
    gradient: "from-orange-500 to-amber-500",
    glow: "rgba(249, 115, 22, 0.15)",
  },
  {
    icon: QrCode,
    title: "QR Code Entry",
    headline: "Seamless door experience",
    desc: "Every ticket comes with an encrypted QR code. Scan at the door with any phone — instant validation, no printed lists, no arguments.",
    stats: ["Encrypted codes", "Phone scanning", "Real-time validation"],
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.15)",
  },
  {
    icon: Megaphone,
    title: "Marketing & Discovery",
    headline: "Get discovered",
    desc: "Your events appear in our discovery feed reaching thousands of NYC locals actively looking for their next night out. Built-in audience, zero ad spend.",
    stats: ["25K+ active users", "Category targeting", "Featured placement"],
    gradient: "from-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  {
    icon: CreditCard,
    title: "Revenue Streams",
    headline: "Multiple ways to earn",
    desc: "Beyond ticket sales — door sales, VIP upgrades, promoter commissions, and more. One platform for all your event revenue.",
    stats: ["Door sales", "VIP tiers", "Commission splits"],
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(139, 92, 246, 0.15)",
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const f = features[active];

  return (
    <section className="px-6 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-accent mb-3">Platform</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Everything You Need to <span className="gradient-text">Run Events</span>
          </h2>
          <p className="text-text-dim max-w-lg mx-auto">One platform. Zero compromises. Built for hosts who are serious about growing.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Feature tabs */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar">
            {features.map((feat, i) => (
              <button
                key={feat.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 shrink-0 lg:shrink ${
                  i === active
                    ? "glass-strong border-accent/20 shadow-[0_0_25px_rgba(108,99,255,0.1)]"
                    : "hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feat.gradient} flex items-center justify-center shrink-0 ${
                  i === active ? "shadow-lg" : "opacity-60"
                } transition-all`}>
                  <feat.icon size={18} className="text-black" />
                </div>
                <div>
                  <p className={`font-semibold text-sm transition-colors ${i === active ? "text-text" : "text-text-dim"}`}>
                    {feat.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right - Feature detail */}
          <div className="lg:col-span-3">
            <div
              className="p-8 sm:p-10 rounded-2xl glass-strong relative overflow-hidden transition-all duration-500"
              style={{ boxShadow: `0 0 60px -15px ${f.glow}` }}
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-30 pointer-events-none transition-all duration-700"
                style={{ background: `linear-gradient(135deg, ${f.glow}, transparent)` }}
              />

              <div className="relative">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${f.gradient} text-black text-xs font-bold uppercase tracking-wider mb-5`}>
                  <f.icon size={14} /> {f.title}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-4">{f.headline}</h3>
                <p className="text-text-dim leading-relaxed mb-8">{f.desc}</p>

                <div className="flex flex-wrap gap-3">
                  {f.stats.map((stat) => (
                    <span key={stat} className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm font-medium">
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
