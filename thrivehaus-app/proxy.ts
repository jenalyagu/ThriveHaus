import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl.startsWith("your_")) {
    return NextResponse.next({ request });
  }
  return await updateSession(request);
}

export const config = {
  // Only run auth middleware on protected routes — keeps public pages like culture-kitchen fast
  matcher: [
    "/dashboard/:path*",
    "/intake/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};
