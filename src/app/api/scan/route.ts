import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { qr_code } = await request.json();

    if (!qr_code) {
      return NextResponse.json({ valid: false, message: "No QR code provided" }, { status: 400 });
    }

    // TODO: When Supabase is connected:
    // 1. Look up ticket by qr_code
    // 2. Check ticket status (valid, used, cancelled)
    // 3. If valid, mark as used and set checked_in_at
    // 4. Return ticket + event details

    return NextResponse.json({
      valid: false,
      message: "Scanner not connected to database yet",
    });
  } catch {
    return NextResponse.json({ valid: false, message: "Scanner error" }, { status: 500 });
  }
}
