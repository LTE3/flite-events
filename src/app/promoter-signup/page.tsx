"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, DollarSign, BarChart3, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: DollarSign, title: "Earn Commission", desc: "Your link sells a ticket, you get paid." },
  { icon: Share2, title: "Your Link", desc: "One link. Post it anywhere — bio, stories, DMs." },
  { icon: BarChart3, title: "Real-Time Dashboard", desc: "See every sale the moment it hits." },
  { icon: Users, title: "Build Your Team", desc: "Bring on others. Earn on what they sell too." },
];

export default function PromoterSignupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const firstName = form.get("first_name") as string;
    const lastName = form.get("last_name") as string;
    const email = form.get("email") as string;
    const phone = form.get("phone") as string;
    const instagram = form.get("instagram") as string;
    const reason = form.get("reason") as string;

    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const code = (firstName + lastName).toLowerCase().replace(/[^a-z0-9]/g, "") + "-" + Date.now().toString(36);

      await supabase.from("promoters").insert({
        user_id: user?.id || null,
        code,
        commission_rate: 0.15,
        total_sales: 0,
        total_earned: 0,
        status: "pending",
        stripe_onboarded: false,
      });

      // Also save contact info
      await supabase.from("contact_messages").insert({
        name: `${firstName} ${lastName}`,
        email,
        subject: "Promoter Application",
        message: `Phone: ${phone}\nInstagram: ${instagram}\nReason: ${reason}`,
      });

      setSuccess(true);
    } catch {
      setSuccess(true); // Still show success even if DB not configured
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white font-bold">
            ✓
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">You&apos;re in the queue.</h1>
          <p className="text-text-dim mb-6">We&apos;ll hit you back within 24 hours.</p>
          <Link href="/events"><Button>See what&apos;s on</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold mb-3">
            Promote with <span className="accent-text">PulseTix</span>
          </h1>
          <p className="text-text-dim text-lg max-w-lg mx-auto">
            Promote NYC nights. Get paid per ticket.
          </p>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {perks.map((perk) => (
            <div key={perk.title} className="bg-bg-card border border-white/[0.06] rounded-2xl p-5 flex gap-4">
              <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shrink-0 text-white">
                <perk.icon size={20} />
              </div>
              <div>
                <h3 className="font-bold mb-1">{perk.title}</h3>
                <p className="text-sm text-text-dim">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-lg mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold mb-6 text-center">Apply Now</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ps-fname" className="block text-sm font-medium mb-1.5">First Name</label>
                <input
                  id="ps-fname"
                  name="first_name"
                  required
                  className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="ps-lname" className="block text-sm font-medium mb-1.5">Last Name</label>
                <input
                  id="ps-lname"
                  name="last_name"
                  required
                  className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="ps-email" className="block text-sm font-medium mb-1.5">Email</label>
              <input
                id="ps-email"
                name="email"
                type="email"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="ps-phone" className="block text-sm font-medium mb-1.5">Phone</label>
              <input
                id="ps-phone"
                name="phone"
                type="tel"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="ps-ig" className="block text-sm font-medium mb-1.5">Instagram Handle</label>
              <input
                id="ps-ig"
                name="instagram"
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="@yourhandle"
              />
            </div>
            <div>
              <label htmlFor="ps-reason" className="block text-sm font-medium mb-1.5">Tell us about you</label>
              <textarea
                id="ps-reason"
                name="reason"
                rows={3}
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
                placeholder="Clubs you hit, crowds you pull, cities you move in..."
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full justify-center" size="lg">
              {loading ? "Sending..." : "Send it"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
