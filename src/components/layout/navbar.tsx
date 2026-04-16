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
            ? "bg-bg/90 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo — text only, bold, no icon */}
          <Link href="/" className="group">
            <span className="font-[family-name:var(--font-display)] text-xl font-800 tracking-[-0.02em] text-text transition-colors group-hover:text-accent">PULSETIX</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/promoter-signup">Promoters</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium text-text-dim hover:text-text transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/admin/create-event"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-accent rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5"
            >
              Host Event
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text hover:text-accent transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-bg/98 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "72px" }}
      >
        <div className="flex flex-col p-8 gap-2">
          <MobileLink href="/events" onClick={() => setMobileOpen(false)}>Events</MobileLink>
          <MobileLink href="/promoter-signup" onClick={() => setMobileOpen(false)}>Promoters</MobileLink>
          <MobileLink href="#about" onClick={() => setMobileOpen(false)}>About</MobileLink>
          <div className="h-px bg-white/[0.06] my-4" />
          <MobileLink href="/login" onClick={() => setMobileOpen(false)}>Sign In</MobileLink>
          <Link
            href="/admin/create-event"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-6 py-3.5 text-center text-sm font-semibold text-white bg-accent rounded-full"
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
      className="px-4 py-2 text-sm font-medium text-text-dim hover:text-text transition-colors rounded-lg hover:bg-white/[0.04]"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3.5 text-lg font-medium text-text-dim hover:text-text transition-colors rounded-xl hover:bg-white/[0.04]"
    >
      {children}
    </Link>
  );
}
