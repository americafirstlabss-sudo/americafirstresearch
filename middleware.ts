import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*", "/auth/:path*"]
};
