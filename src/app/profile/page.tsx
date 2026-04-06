"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Update profile in Supabase
    await new Promise((r) => setTimeout(r, 500));
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-black mb-8">Profile</h1>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-bg-elevated border border-white/10 flex items-center justify-center">
            <User size={40} className="text-text-dim" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full justify-center">
            {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </Button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <Button
            variant="danger"
            className="w-full justify-center"
            onClick={async () => {
              const { createClient } = await import("@/lib/supabase");
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
