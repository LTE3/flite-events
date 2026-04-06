"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-black mb-2">Check Your Email</h1>
          <p className="text-text-dim mb-6">We sent a confirmation link to <strong className="text-text">{email}</strong></p>
          <Link href="/login"><Button variant="outline">Back to Sign In</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-black text-center mb-2">Create Account</h1>
        <p className="text-text-dim text-center mb-8">Join PulseTix and discover events near you</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="Your name"
            />
          </div>
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
              minLength={8}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="At least 8 characters"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full justify-center" size="lg">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-text-dim mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-accent font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
