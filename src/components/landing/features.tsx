"use client";

import { Ticket, Users, QrCode, BarChart3, Megaphone, CreditCard } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-reveal";

const features = [
  {
    icon: Ticket,
    title: "Sell tickets directly",
    desc: "Your prices. Your capacity. Instant Stripe payouts. No 15% platform fees.",
  },
  {
    icon: Users,
    title: "Run a promoter network",
    desc: "Every promoter gets a tracked link. Auto commissions. Multi-tier payouts.",
  },
  {
    icon: QrCode,
    title: "Scan at the door",
    desc: "Encrypted QR on every ticket. Scan with any phone. No printed lists.",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    desc: "Sales, revenue, promoter performance — all live in one dashboard.",
  },
  {
    icon: Megaphone,
    title: "Built-in discovery",
    desc: "Your events reach thousands of NYC locals looking for their next night.",
  },
  {
    icon: CreditCard,
    title: "Door sales & VIP tiers",
    desc: "Sell at the venue, offer upgrades, split commissions — one platform.",
  },
];

export function Features() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-xl mb-20">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-4">The toolkit</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-5">
              Everything to <span className="accent-text">run your night</span>
            </h2>
            <p className="text-text-dim text-lg leading-relaxed">One platform. Zero middlemen. Built for hosts who pack rooms.</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="bg-bg p-8 sm:p-10 h-full group hover:bg-bg-card transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                  <f.icon size={22} className="text-text-dim group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight mb-3">{f.title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
