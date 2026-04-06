import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    try {
      const supabase = createAdminClient();
      await supabase.from("contact_messages").insert({ name, email, subject, message });
    } catch {
      // If Supabase isn't configured, just log it
      console.log("Contact form:", { name, email, subject, message });
    }

    return NextResponse.json({ success: true, message: "Message received. We'll get back to you soon!" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
