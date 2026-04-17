"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (authError) throw authError;
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Couldn't create account. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="w-full max-w-md text-center animate-fade-up">
          <div className="flex justify-center mb-8">
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[-0.02em]">
                <span className="text-white">PULSE</span><span className="text-accent">TIX</span>
              </span>
            </Link>
          </div>
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-3">Check your inbox</h1>
          <p className="text-text-dim mb-8">Confirmation link sent to <span className="text-text font-medium">{email}</span>. Click it to get in.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/[0.1] rounded-full text-sm font-medium hover:bg-white/[0.04] transition-all"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="w-full max-w-md relative animate-fade-up">
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[-0.02em]">
              <span className="text-white">PULSE</span><span className="text-accent">TIX</span>
            </span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl bg-bg-card border border-white/[0.06]">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-1">Get in</h1>
          <p className="text-text-dim text-sm text-center mb-7">One account. Every night out.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm animate-fade-up">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="reg-name" className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Name</label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Email</label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 transition-all duration-300"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="reg-password" className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Password</label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-bg-elevated border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 transition-all duration-300"
                placeholder="8+ characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-accent text-white font-semibold text-sm rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? "Setting up..." : <>Sign up <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-dim mt-6">
          Been here before?{" "}
          <Link href="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
