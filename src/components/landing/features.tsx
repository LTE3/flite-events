"use client";

import { useState } from "react";
import { Ticket, Users, BarChart3, QrCode, Megaphone, CreditCard } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const features = [
  {
    icon: Ticket,
    title: "Ticketing & Sales",
    headline: "Sell tickets your way",
    desc: "Set your prices, control capacity, and sell directly to your audience. No middlemen taking 15% cuts. Instant Stripe payouts to your account.",
    stats: ["$0 platform fee", "Instant payouts", "Custom pricing"],
  },
  {
    icon: Users,
    title: "Promoter Network",
    headline: "Build your street team",
    desc: "Give every promoter their own referral link. Track who's driving sales in real-time. Automatic commission calculations and multi-tier payouts.",
    stats: ["Referral tracking", "Auto commissions", "Multi-tier payouts"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    headline: "Know your numbers",
    desc: "Real-time dashboard showing ticket sales, revenue, promoter performance, and attendee demographics. Make smarter decisions for your next event.",
    stats: ["Real-time data", "Revenue tracking", "Promoter analytics"],
  },
  {
    icon: QrCode,
    title: "QR Code Entry",
    headline: "Seamless door experience",
    desc: "Every ticket comes with an encrypted QR code. Scan at the door with any phone — instant validation, no printed lists, no arguments.",
    stats: ["Encrypted codes", "Phone scanning", "Real-time validation"],
  },
  {
    icon: Megaphone,
    title: "Marketing & Discovery",
    headline: "Get discovered",
    desc: "Your events appear in our discovery feed reaching thousands of NYC locals actively looking for their next night out. Built-in audience, zero ad spend.",
    stats: ["25K+ active users", "Category targeting", "Featured placement"],
  },
  {
    icon: CreditCard,
    title: "Revenue Streams",
    headline: "Multiple ways to earn",
    desc: "Beyond ticket sales — door sales, VIP upgrades, promoter commissions, and more. One platform for all your event revenue.",
    stats: ["Door sales", "VIP tiers", "Commission splits"],
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const f = features[active];

  return (
    <section className="px-6 py-32 relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-4">Platform</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-800 tracking-[-0.02em] mb-4">
              Everything You Need to <span className="accent-text">Run Events</span>
            </h2>
            <p className="text-text-dim max-w-lg text-lg">One platform. Zero compromises. Built for hosts who are serious about growing.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Feature tabs */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar">
            {features.map((feat, i) => (
              <button
                key={feat.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 shrink-0 lg:shrink ${
                  i === active
                    ? "bg-bg-elevated border border-white/10"
                    : "hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  i === active ? "bg-accent text-white" : "bg-white/[0.06] text-text-dim"
                }`}>
                  <feat.icon size={18} />
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
            <div className="p-8 sm:p-10 rounded-2xl card-elevated relative overflow-hidden transition-all duration-500">
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-5">
                  <f.icon size={14} /> {f.title}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-700 tracking-[-0.01em] mb-4">{f.headline}</h3>
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
