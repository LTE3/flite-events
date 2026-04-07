export function PressBar() {
  return (
    <section className="px-6 py-12 border-y border-white/[0.03]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-[3px] text-text-dim/50 mb-8">
          Trusted by event creators across NYC
        </p>
        <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap opacity-40">
          {/* Simplified text logos — replace with real SVG logos when available */}
          {["COMPLEX", "HYPEBEAST", "TIMEOUT", "THRILLIST", "EATER NY"].map((name) => (
            <span key={name} className="text-sm sm:text-base font-black tracking-[3px] text-white/60 hover:text-white/80 transition-colors cursor-default">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
