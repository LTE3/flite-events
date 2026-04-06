import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get promoter record
    const { data: promoter } = await supabase
      .from("promoters")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!promoter) {
      return NextResponse.json({ error: "Not a promoter" }, { status: 403 });
    }

    // Get recent sales
    const { data: sales } = await supabase
      .from("promoter_sales")
      .select("*, events(title), tickets(email, quantity)")
      .eq("promoter_id", promoter.id)
      .order("created_at", { ascending: false })
      .limit(20);

    return NextResponse.json({
      total_sales: promoter.total_sales,
      total_earned: Number(promoter.total_earned),
      commission_rate: Number(promoter.commission_rate),
      referral_code: promoter.code,
      status: promoter.status,
      recent_sales: sales || [],
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
