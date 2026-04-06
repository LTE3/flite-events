"use client";

import { useState } from "react";
import { ScanLine, CheckCircle, XCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScannerPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [scanning, setScanning] = useState(false);

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setScanning(true);
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_code: code }),
      });
      const data = await res.json();
      setResult({ valid: data.valid, message: data.message });
    } catch {
      setResult({ valid: false, message: "Scanner error. Check connection." });
    } finally {
      setScanning(false);
    }
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-black text-center mb-2">QR Scanner</h1>
        <p className="text-text-dim text-center mb-8">Scan tickets at the door</p>

        {/* Camera placeholder */}
        <div className="aspect-square bg-bg-card border border-white/[0.06] rounded-2xl flex flex-col items-center justify-center mb-6">
          <Camera size={64} className="text-text-dim mb-4" />
          <p className="text-text-dim text-sm mb-1">Camera scanner</p>
          <p className="text-text-dim/60 text-xs">Will use device camera when connected to Supabase</p>
        </div>

        {/* Manual entry */}
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Or enter code manually</label>
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setResult(null); }}
              placeholder="Enter QR code value..."
              className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors font-mono"
            />
          </div>
          <Button type="submit" disabled={scanning || !code} className="w-full justify-center" size="lg">
            <ScanLine size={18} className="mr-2" />
            {scanning ? "Checking..." : "Validate Ticket"}
          </Button>
        </form>

        {/* Result */}
        {result && (
          <div className={`mt-6 p-5 rounded-2xl border flex items-center gap-4 ${
            result.valid
              ? "bg-accent-2/10 border-accent-2/30"
              : "bg-danger/10 border-danger/30"
          }`}>
            {result.valid ? (
              <CheckCircle size={32} className="text-accent-2 shrink-0" />
            ) : (
              <XCircle size={32} className="text-danger shrink-0" />
            )}
            <div>
              <p className={`font-bold ${result.valid ? "text-accent-2" : "text-danger"}`}>
                {result.valid ? "Valid Ticket" : "Invalid"}
              </p>
              <p className="text-sm text-text-dim">{result.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
