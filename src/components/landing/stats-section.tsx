"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 40, damping: 25 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  const display = useTransform(spring, (v: number) => Math.round(v).toLocaleString());

  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] tabular-nums text-white mb-3">
        <motion.span>{display}</motion.span>
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-sm sm:text-base text-text-dim tracking-wide uppercase font-medium">
        {label}
      </p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Full-width accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-px bg-accent/30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/30" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <Counter value={500} suffix="+" label="Events Hosted" />
          <Counter value={150} suffix="+" label="NYC Venues" />
          <Counter value={25000} suffix="+" label="Tickets Sold" />
          <Counter value={98} suffix="%" label="Satisfaction" />
        </div>
      </div>
    </section>
  );
}
