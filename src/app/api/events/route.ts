import { NextRequest, NextResponse } from "next/server";
import { sampleEvents } from "@/lib/sample-events";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");

  let events = sampleEvents;

  if (category && category !== "all") {
    events = events.filter((e) => e.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    events = events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.borough?.toLowerCase().includes(q)
    );
  }

  if (featured === "true") {
    events = events.filter((e) => e.featured);
  }

  // TODO: Replace with Supabase query when connected

  return NextResponse.json({ events });
}
