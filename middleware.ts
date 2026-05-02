import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Route hanya untuk guest
  const guestRoutes = ["/login", "/register"];

  // Route wajib login
  const protectedRoutes = ["/checkout", "/orders", "/profile"];

  const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (authError && isProtectedRoute) {
    if (authError.message.includes("JWT")) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Sudah login tapi buka login/register
  if (user && isGuestRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Belum login tapi buka protected route
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
