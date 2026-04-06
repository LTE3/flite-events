import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const protectedRoutes = ["/my-tickets", "/profile", "/promoter-dashboard", "/admin", "/scanner"];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({ request });
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Capture promoter referral code
  if (pathname.startsWith("/ref/")) {
    const code = pathname.split("/ref/")[1];
    if (code) {
      response.cookies.set("pulsetix_ref", code, { maxAge: 60 * 60 * 24 * 90, path: "/" });
    }
  }
  const refParam = request.nextUrl.searchParams.get("ref");
  if (refParam) {
    response.cookies.set("pulsetix_ref", refParam, { maxAge: 60 * 60 * 24 * 90, path: "/" });
  }

  // Redirect unauthenticated users from protected routes
  if (!user && protectedRoutes.some((r) => pathname.startsWith(r))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (user && authRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/events", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
