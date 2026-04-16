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
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="w-full max-w-md text-center animate-fade-up">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-black mb-3">Check Your Email</h1>
          <p className="text-text-dim mb-8">We sent a confirmation link to <span className="text-text font-medium">{email}</span></p>
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
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative animate-fade-up">
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-[family-name:var(--font-display)] text-2xl font-800 tracking-[-0.02em]">PULSETIX</span>
          </Link>
        </div>

        <div className="p-8 rounded-2xl glass-strong">
          <h1 className="text-2xl font-black text-center mb-1">Create Account</h1>
          <p className="text-text-dim text-sm text-center mb-7">Join PulseTix and discover events</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm animate-fade-up">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(255,77,77,0.1)] transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-dim mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(255,77,77,0.1)] transition-all duration-300"
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
                minLength={8}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(255,77,77,0.1)] transition-all duration-300"
                placeholder="At least 8 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-accent text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? "Creating account..." : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-dim mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
