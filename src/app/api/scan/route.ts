import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const { qr_code } = await request.json();

    if (!qr_code) {
      return NextResponse.json({ valid: false, message: "No QR code provided" }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ valid: false, message: "Database not connected" }, { status: 503 });
    }

    const supabase = createAdminClient();

    // Look up ticket
    const { data: ticket, error } = await supabase
      .from("tickets")
      .select("*, events(title, venue, date, time)")
      .eq("qr_code", qr_code)
      .single();

    if (error || !ticket) {
      return NextResponse.json({ valid: false, message: "Ticket not found. Invalid QR code." });
    }

    if (ticket.status === "used") {
      return NextResponse.json({
        valid: false,
        message: `Already checked in at ${new Date(ticket.checked_in_at).toLocaleTimeString()}`,
      });
    }

    if (ticket.status === "cancelled" || ticket.status === "refunded") {
      return NextResponse.json({ valid: false, message: `Ticket is ${ticket.status}` });
    }

    // Mark as used
    await supabase
      .from("tickets")
      .update({ status: "used", checked_in_at: new Date().toISOString() })
      .eq("id", ticket.id);

    const event = ticket.events as { title: string; venue: string } | null;

    return NextResponse.json({
      valid: true,
      message: `✓ ${ticket.email} — ${ticket.quantity} ticket${ticket.quantity > 1 ? "s" : ""} for ${event?.title || "Event"}`,
    });
  } catch {
    return NextResponse.json({ valid: false, message: "Scanner error" }, { status: 500 });
  }
}
