import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // TODO: Save to Supabase contact_messages table
    // TODO: Optionally send notification email via Resend

    console.log("Contact form:", { name, email, subject });

    return NextResponse.json({ success: true, message: "Message received. We'll get back to you soon!" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
