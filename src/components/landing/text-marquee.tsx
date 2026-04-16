"use client";

import { motion } from "framer-motion";

export function TextMarquee({ words = ["DISCOVER", "EXPERIENCE", "REPEAT"] }: { words?: string[] }) {
  const text = words.join(" \u00B7 ") + " \u00B7 ";

  return (
    <section className="py-12 overflow-hidden border-y border-white/[0.04] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="font-[family-name:var(--font-display)] text-[8vw] sm:text-[6vw] lg:text-[5vw] font-bold tracking-tight text-white/[0.04] select-none"
            style={{
              WebkitTextStroke: "1px rgba(108,99,255,0.15)",
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </section>
  );
}

export function TextMarqueeAlt({ text = "NYC'S PREMIER NIGHTLIFE PLATFORM" }: { text?: string }) {
  const repeated = (text + " — ").repeat(4);

  return (
    <section className="py-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[8px] uppercase text-white/15 select-none">
            {repeated}{repeated}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
