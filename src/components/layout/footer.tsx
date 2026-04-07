import Link from "next/link";
import { Ticket } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Ticket size={16} className="text-black" />
              </div>
              <span className="text-lg font-black tracking-[2px] gradient-text">PULSETIX</span>
            </Link>
            <p className="text-text-dim text-sm leading-relaxed mb-6">
              NYC&apos;s premier platform for exclusive nightlife experiences. Secure QR code tickets, instant delivery.
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://instagram.com/pulsetixnyc" label="Instagram">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </SocialLink>
              <SocialLink href="https://twitter.com/pulsetixnyc" label="X">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </SocialLink>
              <SocialLink href="https://facebook.com/pulsetixnyc" label="Facebook">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </SocialLink>
            </div>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-text mb-1">Platform</h4>
            <FooterLink href="/events">Browse Events</FooterLink>
            <FooterLink href="/admin/create-event">Host an Event</FooterLink>
            <FooterLink href="/promoter-signup">For Promoters</FooterLink>
            <FooterLink href="/my-tickets">My Tickets</FooterLink>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-text mb-1">Company</h4>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
            <FooterLink href="mailto:Pulsetixai@gmail.com">Support</FooterLink>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-text mb-1">Legal</h4>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Use</FooterLink>
            <FooterLink href="/sms-consent">SMS Consent</FooterLink>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#444]">&copy; {new Date().getFullYear()} PulseTix. All rights reserved.</p>
          <p className="text-xs text-[#444]">Secure ticketing powered by QR codes.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-text-dim hover:text-text transition-colors duration-200">
      {children}
    </Link>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-text-dim hover:text-text hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{children}</svg>
    </a>
  );
}
