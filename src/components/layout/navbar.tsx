"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] transition-colors duration-200",
          scrolled ? "bg-black/95 backdrop-blur-xl" : "bg-black/80 backdrop-blur-xl"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-[3px] gradient-text">
            PULSETIX
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/events" className="text-sm font-medium text-text-dim hover:text-text transition-colors">
              Events
            </Link>
            <Link href="#about" className="text-sm font-medium text-text-dim hover:text-text transition-colors">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold tracking-wide text-text-dim hover:text-text transition-colors">
              SIGN IN
            </Link>
            <Link href="/admin/create-event">
              <Button size="sm">HOST AN EVENT</Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/[0.06] p-6 flex flex-col gap-4 md:hidden">
          <Link href="/events" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-text-dim hover:text-text transition-colors">
            Events
          </Link>
          <Link href="#about" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-text-dim hover:text-text transition-colors">
            About
          </Link>
          <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-semibold tracking-wide text-text-dim hover:text-text transition-colors">
            SIGN IN
          </Link>
          <Link href="/admin/create-event" onClick={() => setMobileOpen(false)}>
            <Button className="w-full justify-center">HOST AN EVENT</Button>
          </Link>
        </div>
      )}
    </>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
