"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleConfig: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#6C63FF", "#00E5A0", "#ffffff"] },
    links: {
      color: "#6C63FF",
      distance: 150,
      enable: true,
      opacity: 0.08,
      width: 0.5,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    number: {
      density: { enable: true },
      value: 60,
    },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 0.5, max: 2 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.2,
          color: "#00E5A0",
        },
      },
    },
  },
  detectRetina: true,
};

export function ParticleField({ className = "" }: { className?: string }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      className={`absolute inset-0 ${className}`}
      options={particleConfig}
    />
  );
}
