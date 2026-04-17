"use client";

import { motion } from "framer-motion";

const publications = ["COMPLEX", "HYPEBEAST", "TIMEOUT", "THRILLIST", "EATER NY", "VICE", "THE INFATUATION", "GOTHAMIST"];

export function PressBar() {
  return (
    <section className="py-12 border-y border-white/[0.04] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-bg pointer-events-none z-10" />

      <div className="relative">
        <motion.div
          className="flex gap-12 sm:gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...publications, ...publications].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold tracking-[4px] text-white/15 hover:text-white/40 transition-colors cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
