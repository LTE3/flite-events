"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform, MotionValue } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  const display = useTransform(spring, (v: number) => Math.round(v).toLocaleString());

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>{suffix}
    </span>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Events Hosted", sublabel: "across NYC" },
  { value: 25000, suffix: "+", label: "Tickets Sold", sublabel: "and counting" },
  { value: 150, suffix: "+", label: "Venues", sublabel: "Manhattan to BK" },
  { value: 98, suffix: "%", label: "Satisfaction", sublabel: "from event hosts" },
];

export function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] via-transparent to-accent-2/[0.03]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-8 ${
                i < stats.length - 1 ? "lg:border-r lg:border-white/[0.06]" : ""
              }`}
            >
              <p className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-2 gradient-text">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-[family-name:var(--font-display)] font-semibold text-white/80 text-lg tracking-tight">{stat.label}</p>
              <p className="text-sm text-white/30 mt-1">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
