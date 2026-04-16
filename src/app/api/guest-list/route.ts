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
    const { data: entries, error } = await supabase
      .from("guest_list_entries")
      .select("*")
      .eq("event_id", eventId)
      .order("name", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ entries: entries || [] });
  } catch {
    return NextResponse.json({ entries: [] });
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

    const { data, error } = await admin.from("guest_list_entries").insert({
      event_id: body.event_id,
      name: body.name,
      plus_ones: body.plus_ones || 0,
      note: body.note || null,
      checked_in: false,
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ entry: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to add guest" },
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
    if (body.checked_in !== undefined) {
      updates.checked_in = body.checked_in;
      updates.checked_in_at = body.checked_in ? new Date().toISOString() : null;
    }
    if (body.name !== undefined) updates.name = body.name;
    if (body.plus_ones !== undefined) updates.plus_ones = body.plus_ones;
    if (body.note !== undefined) updates.note = body.note;

    const { data, error } = await admin
      .from("guest_list_entries")
      .update(updates)
      .eq("id", body.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ entry: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update guest" },
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

    const entryId = request.nextUrl.searchParams.get("id");
    if (!entryId) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from("guest_list_entries").delete().eq("id", entryId);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to remove guest" },
      { status: 500 }
    );
  }
}
