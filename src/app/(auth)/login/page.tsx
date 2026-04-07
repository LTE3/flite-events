"use client";

import Link from "next/link";
import { useState } from "react";
import { Ticket, ArrowRight } from "lucide-react";

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
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-2/6 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center glow-accent-sm">
              <Ticket size={20} className="text-black" />
            </div>
            <span className="text-xl font-black tracking-[2px] gradient-text">PULSETIX</span>
          </Link>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl glass-strong">
          <h1 className="text-2xl font-black text-center mb-1">Welcome Back</h1>
          <p className="text-text-dim text-sm text-center mb-7">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm animate-fade-up">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(108,99,255,0.1)] transition-all duration-300"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(108,99,255,0.1)] transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 gradient-bg text-black font-bold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-dim mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-accent font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
