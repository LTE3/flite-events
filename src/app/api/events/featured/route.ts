import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { sampleEvents } from "@/lib/sample-events";

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase not configured");
    }

    const supabase = createAdminClient();
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .eq("featured", true)
      .in("status", ["published", "sold_out"])
      .order("date", { ascending: true })
      .limit(6);

    if (error) throw error;
    return NextResponse.json({ events });
  } catch {
    const featured = sampleEvents.filter((e) => e.featured);
    return NextResponse.json({ events: featured });
  }
}
