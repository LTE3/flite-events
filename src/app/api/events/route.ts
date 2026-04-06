import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sampleEvents } from "@/lib/sample-events";

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
