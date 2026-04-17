import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        {/* Top — logo + links in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto_auto] gap-12 lg:gap-20 mb-16">
          <div>
            <Link href="/" className="inline-block mb-3">
              <span className="font-[family-name:var(--font-display)] text-xl font-black tracking-[-0.04em]">
                <span className="text-white">PULSE</span>
                <span className="text-accent">TIX</span>
              </span>
            </Link>
            <p className="text-sm text-text-dim max-w-xs leading-relaxed">
              NYC nightlife, one ticket. Clubs, rooftops, and everything in between.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-text-dim mb-1">Platform</h4>
            <FooterLink href="/events">Events</FooterLink>
            <FooterLink href="/admin/create-event">Host</FooterLink>
            <FooterLink href="/promoter-signup">Promoters</FooterLink>
            <FooterLink href="/my-tickets">Tickets</FooterLink>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-text-dim mb-1">Company</h4>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="mailto:Pulsetixai@gmail.com">Support</FooterLink>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-[2px] uppercase text-text-dim mb-1">Legal</h4>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/sms-consent">SMS</FooterLink>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} PulseTix</p>
          <div className="flex gap-6">
            <SocialLink href="https://instagram.com/pulsetixnyc" label="Instagram" />
            <SocialLink href="https://twitter.com/pulsetixnyc" label="X" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-text-dim hover:text-white transition-colors">
      {children}
    </Link>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-text-muted hover:text-white transition-colors font-medium uppercase tracking-wider"
    >
      {label}
    </a>
  );
}
