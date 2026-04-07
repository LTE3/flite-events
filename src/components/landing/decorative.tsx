// Animated decorative SVG elements for brand personality
// These replace Flite's "goblin scribble" illustrations with our own style

export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden ${flip ? "rotate-180" : ""}`} style={{ height: "60px", marginTop: "-1px" }}>
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
        <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="url(#wave-grad)" fillOpacity="0.03" />
        <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30" stroke="url(#wave-grad)" strokeOpacity="0.08" strokeWidth="1" />
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00E5A0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function GlowOrb({ color = "accent", size = 400, className = "" }: { color?: string; size?: number; className?: string }) {
  const colors: Record<string, string> = {
    accent: "bg-accent/10",
    accent2: "bg-accent-2/8",
    pink: "bg-pink-500/8",
    orange: "bg-orange-500/8",
  };

  return (
    <div
      className={`absolute rounded-full blur-[120px] pointer-events-none animate-pulse-glow ${colors[color] || colors.accent} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity: 0.02 }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent/40 animate-float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${5 + i}s`,
          }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <div
          key={`g-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent-2/30 animate-float"
          style={{
            left: `${25 + i * 18}%`,
            top: `${30 + (i % 2) * 35}%`,
            animationDelay: `${i * 1.2 + 0.5}s`,
            animationDuration: `${6 + i}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AccentLine() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
  );
}
