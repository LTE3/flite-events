"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      window.location.href = "/events";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Wrong email or password. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="w-full max-w-md relative animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-[-0.02em]">
              <span className="text-white">PULSE</span><span className="text-accent">TIX</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-bg-card border border-white/[0.06]">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-center mb-1">You&apos;re back.</h1>
          <p className="text-text-dim text-sm text-center mb-7">Pick up where you left off</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm animate-fade-up">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 transition-all duration-300"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-bg-elevated border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 transition-all duration-300"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-accent text-black font-semibold text-sm rounded-full transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? "One sec..." : <>Sign in <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-dim mt-6">
          New here?{" "}
          <Link href="/register" className="text-accent font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
