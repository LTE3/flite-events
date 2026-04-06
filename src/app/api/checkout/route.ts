import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { eventId, quantity, email } = await request.json();

    if (!eventId || !quantity || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: When Stripe is configured:
    // 1. Fetch event from Supabase
    // 2. Check ticket availability
    // 3. Create Stripe Checkout Session
    // 4. Return session URL

    // Placeholder response
    return NextResponse.json({
      error: "Stripe not configured yet. Add STRIPE_SECRET_KEY to .env.local",
    }, { status: 503 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
