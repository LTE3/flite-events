"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[64px]" : "h-[72px]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-[family-name:var(--font-display)] text-lg font-extrabold tracking-[-0.03em] leading-none">
              <span className="text-white">PULSE</span>
              <span className="text-accent">TIX</span>
            </span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          </Link>

          {/* Desktop nav — centered pill */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center rounded-full bg-white/[0.04] border border-white/[0.06] px-1 py-1">
              <NavLink href="/events">Events</NavLink>
              <NavLink href="/promoter-signup">Promoters</NavLink>
              <NavLink href="#about">About</NavLink>
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-text-dim hover:text-text transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/admin/create-event"
              className="px-5 py-2 bg-accent text-white text-sm font-semibold rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5"
            >
              Host Event
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text hover:text-accent transition-colors"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — full screen takeover */}
      <div
        className={`fixed inset-0 z-40 bg-bg transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Radial accent glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,77,77,0.18) 0%, rgba(255,77,77,0.05) 30%, transparent 65%)",
          }}
        />

        <div className="relative h-full flex flex-col items-center justify-center gap-8 px-8">
          <MobileLink href="/events" onClick={() => setMobileOpen(false)}>
            Events
          </MobileLink>
          <MobileLink href="/promoter-signup" onClick={() => setMobileOpen(false)}>
            Promoters
          </MobileLink>
          <MobileLink href="#about" onClick={() => setMobileOpen(false)}>
            About
          </MobileLink>
          <MobileLink href="/login" onClick={() => setMobileOpen(false)}>
            Sign In
          </MobileLink>
          <Link
            href="/admin/create-event"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 bg-accent text-white text-base font-semibold rounded-full"
          >
            Host Event
          </Link>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-1.5 text-sm font-medium text-text-dim hover:text-text hover:bg-white/[0.06] transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.03em] text-text hover:text-accent transition-colors"
    >
      {children}
    </Link>
  );
}
