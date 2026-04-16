"use client";

import { motion } from "framer-motion";

const publications = ["COMPLEX", "HYPEBEAST", "TIMEOUT", "THRILLIST", "EATER NY", "VICE", "THE INFATUATION", "GOTHAMIST"];

export function PressBar() {
  return (
    <section className="py-16 border-y border-white/[0.04] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />

      <p className="text-center text-xs font-bold uppercase tracking-[4px] text-white/30 mb-10 relative z-20">
        As Featured In
      </p>

      {/* Infinite scroll marquee */}
      <div className="relative">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...publications, ...publications].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold tracking-[6px] text-white/20 hover:text-white/50 transition-colors duration-500 cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
