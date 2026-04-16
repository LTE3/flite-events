import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const eventId = request.nextUrl.searchParams.get("event_id");
  if (!eventId) {
    return NextResponse.json({ error: "event_id required" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data: tiers, error } = await supabase
      .from("ticket_tiers")
      .select("*")
      .eq("event_id", eventId)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ tiers: tiers || [] });
  } catch {
    return NextResponse.json({ tiers: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const admin = createAdminClient();

    const { data, error } = await admin.from("ticket_tiers").insert({
      event_id: body.event_id,
      name: body.name,
      price: Math.round((body.price || 0) * 100),
      quantity: body.quantity || 100,
      sold: 0,
      sort_order: body.sort_order || 0,
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ tier: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create tier" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const admin = createAdminClient();

    const updates: Record<string, unknown> = {};
    if (body.name !== undefined) updates.name = body.name;
    if (body.price !== undefined) updates.price = Math.round(body.price * 100);
    if (body.quantity !== undefined) updates.quantity = body.quantity;
    if (body.sort_order !== undefined) updates.sort_order = body.sort_order;

    const { data, error } = await admin
      .from("ticket_tiers")
      .update(updates)
      .eq("id", body.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ tier: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update tier" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tierId = request.nextUrl.searchParams.get("id");
    if (!tierId) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from("ticket_tiers").delete().eq("id", tierId);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete tier" },
      { status: 500 }
    );
  }
}
