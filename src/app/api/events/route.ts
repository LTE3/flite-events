import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabase } from "@/lib/supabase-server";
import { sampleEvents } from "@/lib/sample-events";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const admin = createAdminClient();

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      + "-" + Date.now().toString(36);

    const { data, error } = await admin.from("events").insert({
      title: body.title,
      slug,
      description: body.description || "",
      date: body.date,
      time: body.time,
      end_time: body.end_time || null,
      venue: body.venue,
      address: body.address || "",
      city: body.city || "New York",
      borough: body.borough || null,
      image_url: body.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      price: Math.round((body.price || 0) * 100),
      tickets_total: body.tickets_total || 100,
      tickets_left: body.tickets_total || 100,
      category: body.category || "nightlife",
      featured: body.featured || false,
      status: body.status || "published",
      created_by: user.id,
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ event: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");

  // Try Supabase first, fall back to sample data
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase not configured");
    }

    const supabase = createAdminClient();
    let query = supabase
      .from("events")
      .select("*")
      .in("status", ["published", "sold_out"])
      .order("date", { ascending: true });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (featured === "true") {
      query = query.eq("featured", true);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,venue.ilike.%${search}%,borough.ilike.%${search}%`);
    }

    const { data: events, error } = await query;
    if (error) throw error;

    return NextResponse.json({ events });
  } catch {
    // Fallback to sample data
    let events = sampleEvents;
    if (category && category !== "all") {
      events = events.filter((e) => e.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      events = events.filter(
        (e) => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.borough?.toLowerCase().includes(q)
      );
    }
    if (featured === "true") {
      events = events.filter((e) => e.featured);
    }
    return NextResponse.json({ events });
  }
}
