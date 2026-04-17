import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const { eventId, tierId, quantity, email } = await request.json();

    if (!eventId || !quantity || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const supabase = createAdminClient();

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

    let unitPrice = event.price;
    let productName = event.title;
    let tierName: string | null = null;

    if (tierId) {
      const { data: tier, error: tierError } = await supabase
        .from("ticket_tiers")
        .select("*")
        .eq("id", tierId)
        .single();

      if (tierError || !tier) {
        return NextResponse.json({ error: "Tier not found" }, { status: 404 });
      }

      if (tier.sold + quantity > tier.quantity) {
        return NextResponse.json({ error: "Not enough tickets in this tier" }, { status: 400 });
      }

      unitPrice = tier.price;
      tierName = tier.name;
      productName = `${event.title} — ${tier.name}`;
    } else {
      if (event.tickets_left < quantity) {
        return NextResponse.json({ error: "Not enough tickets available" }, { status: 400 });
      }
    }

    const refCode = request.cookies.get("pulsetix_ref")?.value;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: `${event.venue} • ${event.date}`,
              images: event.image_url ? [event.image_url] : [],
            },
            unit_amount: unitPrice,
          },
          quantity,
        },
      ],
      metadata: {
        eventId: event.id,
        tierId: tierId || "",
        tierName: tierName || "",
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
