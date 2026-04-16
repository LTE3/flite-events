"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary aurora blob */}
      <motion.div
        className="absolute w-[800px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(108,99,255,0.4) 0%, rgba(0,229,160,0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          top: "-10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary aurora blob */}
      <motion.div
        className="absolute w-[600px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,229,160,0.4) 0%, rgba(108,99,255,0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          top: "20%",
          right: "5%",
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 40, -80, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Accent pink blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,77,141,0.5) 0%, rgba(108,99,255,0.1) 50%, transparent 70%)",
          filter: "blur(100px)",
          bottom: "10%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mesh gradient overlay lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
