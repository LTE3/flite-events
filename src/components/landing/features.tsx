"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

const features = [
  {
    num: "01",
    title: "Sell direct",
    desc: "Your prices, your capacity, instant Stripe payouts. No middleman fees eating your margin.",
  },
  {
    num: "02",
    title: "Promoter network",
    desc: "Every promoter gets a tracked link. Auto commissions. Multi-tier payouts. See who drives sales.",
  },
  {
    num: "03",
    title: "Scan at the door",
    desc: "Encrypted QR on every ticket. Scan with any phone. No printed lists, no arguments at the entrance.",
  },
  {
    num: "04",
    title: "Real-time dashboard",
    desc: "Sales, revenue, promoter performance — all live. Make decisions while the night is still young.",
  },
  {
    num: "05",
    title: "Built-in discovery",
    desc: "Your events reach thousands of NYC locals looking for their next night out.",
  },
  {
    num: "06",
    title: "Door sales & VIP",
    desc: "Sell at the venue, offer upgrades, split commissions, manage tiers — one platform.",
  },
];

export function Features() {
  return (
    <section className="py-28 sm:py-40 px-6 sm:px-10 lg:px-16 relative bg-bg-card">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-4">How it works</p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em]">
                Everything to run your night
              </h2>
            </div>
            <p className="text-text-dim text-lg max-w-md leading-relaxed lg:text-right">
              One platform. Zero middlemen. From the first ticket sold to the last person at the door.
            </p>
          </div>
        </ScrollReveal>

        {/* Numbered feature list */}
        <div className="border-t border-white/[0.06]">
          {features.map((f, i) => (
            <ScrollReveal key={f.num} delay={i * 0.05}>
              <div className="group grid grid-cols-1 sm:grid-cols-[80px_1fr_1fr] gap-4 sm:gap-8 py-8 sm:py-10 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300 px-2 sm:px-4 -mx-2 sm:-mx-4">
                <span className="font-[family-name:var(--font-display)] text-sm font-bold text-accent tabular-nums">
                  {f.num}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="text-text-dim text-base leading-relaxed sm:pt-2">
                  {f.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
