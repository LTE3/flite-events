"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-black text-center mb-2">Welcome Back</h1>
        <p className="text-text-dim text-center mb-8">Sign in to your PulseTix account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full justify-center" size="lg">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-text-dim mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-accent font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
