import { NextResponse } from "next/server";
import { sampleEvents } from "@/lib/sample-events";

export async function GET() {
  const featured = sampleEvents.filter((e) => e.featured);
  return NextResponse.json({ events: featured });
}
