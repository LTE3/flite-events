"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Ticket } from "lucide-react";

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
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 glow-accent-sm">
              <Ticket size={18} className="text-black" />
            </div>
            <span className="text-xl font-black tracking-[2px] gradient-text">PULSETIX</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/promoter-signup">For Promoters</NavLink>
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
              className="relative px-6 py-2.5 text-sm font-bold text-black gradient-bg rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10">Host Event</span>
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
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "72px" }}
      >
        <div className="flex flex-col p-8 gap-2">
          <MobileLink href="/events" onClick={() => setMobileOpen(false)}>Events</MobileLink>
          <MobileLink href="/promoter-signup" onClick={() => setMobileOpen(false)}>For Promoters</MobileLink>
          <MobileLink href="#about" onClick={() => setMobileOpen(false)}>About</MobileLink>
          <div className="h-px bg-white/[0.06] my-4" />
          <MobileLink href="/login" onClick={() => setMobileOpen(false)}>Sign In</MobileLink>
          <Link
            href="/admin/create-event"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-6 py-3.5 text-center text-sm font-bold text-black gradient-bg rounded-full"
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
