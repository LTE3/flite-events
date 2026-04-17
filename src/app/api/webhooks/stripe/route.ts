import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase-admin";
import { generateQRCodeDataURL } from "@/lib/qr";
import { sendTicketEmail } from "@/lib/email";
import { formatDate, formatTime } from "@/lib/utils";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripeClient.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { eventId, tierId, tierName, quantity, email, refCode } = session.metadata || {};

    if (!eventId || !quantity || !email) {
      console.error("Missing metadata in checkout session");
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    // Look up user by email to associate ticket with account
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    const qrCode = crypto.randomUUID();
    const qty = parseInt(quantity);

    // Create ticket with user_id and tier info
    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .insert({
        event_id: eventId,
        user_id: profile?.id || null,
        email,
        quantity: qty,
        qr_code: qrCode,
        tier_id: tierId || null,
        tier_name: tierName || null,
        stripe_session_id: session.id,
        status: "valid",
      })
      .select()
      .single();

    // Increment tier sold count if tier-based purchase
    if (tierId && !ticketError) {
      await supabase.rpc("increment_tier_sold", { tier_id: tierId, qty });
    }

    if (ticketError) {
      console.error("Failed to create ticket:", ticketError);
      return NextResponse.json({ error: "Ticket creation failed" }, { status: 500 });
    }

    // Handle promoter commission
    if (refCode) {
      const { data: promoter } = await supabase
        .from("promoters")
        .select("*")
        .eq("code", refCode)
        .eq("status", "active")
        .single();

      if (promoter) {
        const totalAmount = (session.amount_total || 0) / 100;
        const commission = totalAmount * Number(promoter.commission_rate);

        await supabase.from("promoter_sales").insert({
          promoter_id: promoter.id,
          ticket_id: ticket.id,
          event_id: eventId,
          commission_amount: commission,
          tier: 1,
          status: "pending",
        });

        // Update promoter totals
        await supabase
          .from("promoters")
          .update({
            total_sales: promoter.total_sales + parseInt(quantity),
            total_earned: Number(promoter.total_earned) + commission,
          })
          .eq("id", promoter.id);
      }
    }

    // Fetch event details for email
    const { data: eventData } = await supabase
      .from("events")
      .select("title, date, time, venue")
      .eq("id", eventId)
      .single();

    // Generate QR code image and send email
    if (eventData) {
      try {
        const qrDataUrl = await generateQRCodeDataURL(qrCode);
        await sendTicketEmail({
          to: email,
          eventTitle: eventData.title,
          eventDate: formatDate(eventData.date),
          eventTime: formatTime(eventData.time),
          venue: eventData.venue,
          quantity: parseInt(quantity),
          qrCode,
          qrDataUrl,
        });
      } catch (emailErr) {
        console.error("Failed to send ticket email:", emailErr);
        // Don't fail the webhook — ticket was already created
      }
    }
  }

  return NextResponse.json({ received: true });
}
