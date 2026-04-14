import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import type { CookieOptions } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/auth";

export async function createClient() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...(options ?? {}) });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...(options ?? {}) });
      }
    }
  });
}

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...(options ?? {}) });
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: "", ...(options ?? {}) });
      }
    }
  });

  const { data } = await supabase.auth.getUser();
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const isAccountPath = request.nextUrl.pathname.startsWith("/account");
  const isCheckoutPath = request.nextUrl.pathname.startsWith("/checkout");
  const securePath = isAdminPath || isAccountPath || isCheckoutPath;
  const loginPath =
    request.nextUrl.pathname.startsWith("/admin/login") ||
    request.nextUrl.pathname.startsWith("/account/login") ||
    request.nextUrl.pathname.startsWith("/auth");

  if (securePath && !loginPath && !data.user) {
    if (isAdminPath) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const destination = new URL("/auth", request.url);
    destination.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(destination);
  }

  if (request.nextUrl.pathname.startsWith("/admin") && !loginPath && data.user && !isAdminEmail(data.user.email)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}
