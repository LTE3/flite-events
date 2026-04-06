import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const { eventId, quantity, email } = await request.json();

    if (!eventId || !quantity || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const supabase = createAdminClient();

    // Fetch event
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (eventError || !event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.status !== "published") {
      return NextResponse.json({ error: "Event is not available" }, { status: 400 });
    }

    if (event.tickets_left < quantity) {
      return NextResponse.json({ error: "Not enough tickets available" }, { status: 400 });
    }

    // Get promoter referral from cookie
    const refCode = request.cookies.get("pulsetix_ref")?.value;

    // Create Stripe Checkout Session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: event.title,
              description: `${event.venue} • ${event.date}`,
              images: event.image_url ? [event.image_url] : [],
            },
            unit_amount: event.price,
          },
          quantity,
        },
      ],
      metadata: {
        eventId: event.id,
        quantity: String(quantity),
        email,
        refCode: refCode || "",
      },
      success_url: `${appUrl}/my-tickets?success=true`,
      cancel_url: `${appUrl}/events/${event.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
