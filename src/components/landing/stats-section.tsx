"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

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

export function StatsSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden border-y border-white/[0.04] bg-bg-card">
      <div className="max-w-7xl mx-auto px-6 relative">
        <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.4] tracking-tight text-center max-w-4xl mx-auto text-text-dim">
          Over{" "}
          <span className="font-bold text-text tabular-nums">
            <AnimatedNumber value={500} suffix="+" />
          </span>{" "}
          events hosted across{" "}
          <span className="font-bold text-text tabular-nums">
            <AnimatedNumber value={150} suffix="+" />
          </span>{" "}
          venues, with{" "}
          <span className="font-bold text-text tabular-nums">
            <AnimatedNumber value={25000} suffix="+" />
          </span>{" "}
          tickets sold and a{" "}
          <span className="font-bold text-text tabular-nums">
            <AnimatedNumber value={98} suffix="%" />
          </span>{" "}
          host satisfaction rate.
        </p>
      </div>
    </section>
  );
}
