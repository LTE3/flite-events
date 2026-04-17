"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

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
            ? "bg-bg/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5">
            <span className="font-[family-name:var(--font-display)] text-xl font-black tracking-[-0.04em] leading-none">
              <span className="text-white">PULSE</span>
              <span className="text-accent">TIX</span>
            </span>
          </Link>

          {/* Desktop nav — flat links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/events" className="text-sm text-text-dim hover:text-white transition-colors font-medium">
              Events
            </Link>
            <Link href="/promoter-signup" className="text-sm text-text-dim hover:text-white transition-colors font-medium">
              Promoters
            </Link>
            <Link href="/contact" className="text-sm text-text-dim hover:text-white transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-text-dim hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/admin/create-event"
              className="group flex items-center gap-2 px-5 py-2.5 bg-accent text-black text-sm font-bold rounded-full transition-all duration-300 hover:bg-accent/90"
            >
              Host Event
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-text hover:text-accent transition-colors"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — clean full screen */}
      <div
        className={`fixed inset-0 z-40 bg-bg transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-10 gap-2">
          {[
            { href: "/events", label: "Events" },
            { href: "/promoter-signup", label: "Promoters" },
            { href: "/contact", label: "Contact" },
            { href: "/login", label: "Sign In" },
          ].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-display)] text-5xl font-black tracking-[-0.03em] text-white/80 hover:text-accent transition-colors py-2"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin/create-event"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-accent text-black font-bold rounded-full text-lg w-fit"
          >
            Host Event <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}
