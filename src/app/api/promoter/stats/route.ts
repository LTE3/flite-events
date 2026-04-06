import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch real promoter stats from Supabase
  // Need to authenticate the request and get promoter_id

  return NextResponse.json({
    total_sales: 47,
    total_earned: 705,
    commission_rate: 0.15,
    referral_clicks: 312,
    recent_sales: [],
  });
}
