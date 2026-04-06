import { createClient } from "@supabase/supabase-js";

// Admin client using service role key — bypasses RLS
// Only use in API routes and server-side code, NEVER expose to client
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase admin credentials");
  return createClient(url, key);
}
