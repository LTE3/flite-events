"use client";

import { Ticket, Users, QrCode, BarChart3, Megaphone, CreditCard } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

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

function BigCard({ feature }: { feature: (typeof features)[number] }) {
  const Icon = feature.icon;
  return (
    <div className="group p-10 sm:p-12 rounded-2xl bg-bg-card border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8">
        <Icon size={26} className="text-text-dim group-hover:text-accent transition-colors duration-300" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight mb-4">
        {feature.title}
      </h3>
      <p className="text-text-dim text-base leading-relaxed">{feature.desc}</p>
    </div>
  );
}

function SmallCard({ feature }: { feature: (typeof features)[number] }) {
  const Icon = feature.icon;
  return (
    <div className="group p-6 sm:p-8 rounded-2xl bg-bg-card border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
      <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors duration-300">
        <Icon size={18} className="text-text-dim group-hover:text-accent transition-colors duration-300" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-text-dim leading-relaxed">{feature.desc}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-28 sm:py-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-xl mb-20">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-accent mb-4">The toolkit</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.02em] mb-5">
              Everything to <span className="accent-text">run your night</span>
            </h2>
            <p className="text-text-dim text-lg leading-relaxed">One platform. Zero middlemen.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Row 1: big left, two small stacked right */}
          <ScrollReveal className="lg:col-span-2">
            <BigCard feature={features[0]} />
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-1 flex flex-col gap-4" delay={0.1}>
            <SmallCard feature={features[1]} />
            <SmallCard feature={features[2]} />
          </ScrollReveal>

          {/* Row 2: two small stacked left, big right */}
          <ScrollReveal className="lg:col-span-1 flex flex-col gap-4" delay={0.15}>
            <SmallCard feature={features[3]} />
            <SmallCard feature={features[4]} />
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-2" delay={0.2}>
            <BigCard feature={features[5]} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
