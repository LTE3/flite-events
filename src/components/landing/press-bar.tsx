"use client";

import { motion } from "framer-motion";

const names = ["COMPLEX", "HYPEBEAST", "TIMEOUT", "THRILLIST", "EATER NY", "VICE", "THE INFATUATION", "GOTHAMIST"];

export function PressBar() {
  return (
    <section className="py-10 border-y border-white/[0.04] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg pointer-events-none z-10" />

      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...names, ...names].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-[family-name:var(--font-display)] text-sm font-bold tracking-[5px] text-white/10 select-none"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
