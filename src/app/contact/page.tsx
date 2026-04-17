"use client";

import { useState } from "react";
import { Send, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Couldn't send. Try again in a sec.");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send your message. Try again or email Pulsetixai@gmail.com.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Got it.</h1>
          <p className="text-text-dim mb-6">We&apos;ll reply within 24 hours.</p>
          <a href="/events"><Button>See what&apos;s on</Button></a>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-accent" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold mb-2">Talk to us</h1>
          <p className="text-text-dim">Questions, problems, ideas — send them over.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-danger/10 border border-danger/30 rounded-xl text-sm text-danger">{error}</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">Name</label>
              <input
                id="contact-name"
                name="name"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              required
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="What's this about?"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">Message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
              placeholder="What's going on?"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full justify-center" size="lg">
            <Send size={16} className="mr-2" />
            {loading ? "Sending..." : "Send it"}
          </Button>
        </form>

        <p className="text-center text-sm text-text-dim mt-8">
          Or email{" "}
          <a href="mailto:Pulsetixai@gmail.com" className="text-accent hover:underline">Pulsetixai@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
