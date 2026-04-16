"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Massive purple blob — TOP LEFT */}
      <motion.div
        className="absolute"
        style={{
          width: "1000px",
          height: "800px",
          background: "radial-gradient(ellipse at center, rgba(108,99,255,0.5) 0%, rgba(108,99,255,0.2) 30%, transparent 65%)",
          filter: "blur(60px)",
          top: "-15%",
          left: "-5%",
        }}
        animate={{
          x: [0, 150, -80, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.3, 0.85, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Massive teal blob — BOTTOM RIGHT */}
      <motion.div
        className="absolute"
        style={{
          width: "900px",
          height: "700px",
          background: "radial-gradient(ellipse at center, rgba(0,229,160,0.45) 0%, rgba(0,229,160,0.15) 35%, transparent 65%)",
          filter: "blur(60px)",
          bottom: "-10%",
          right: "-10%",
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 60, -100, 0],
          scale: [1, 0.8, 1.25, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hot pink accent blob — CENTER */}
      <motion.div
        className="absolute"
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(ellipse at center, rgba(255,60,170,0.35) 0%, rgba(255,60,170,0.1) 35%, transparent 60%)",
          filter: "blur(80px)",
          top: "20%",
          left: "25%",
        }}
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.4, 0.7, 1],
          opacity: [0.6, 1, 0.5, 0.6],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Electric blue pulse — TOP RIGHT */}
      <motion.div
        className="absolute"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, transparent 55%)",
          filter: "blur(50px)",
          top: "5%",
          right: "10%",
        }}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
