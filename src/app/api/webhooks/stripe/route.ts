import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // TODO: When Stripe is configured:
  // 1. Verify webhook signature
  // 2. Handle checkout.session.completed event
  // 3. Create ticket record in Supabase
  // 4. Generate QR code
  // 5. Send email with QR code via Resend

  console.log("Stripe webhook received:", body.slice(0, 100));

  return NextResponse.json({ received: true });
}
