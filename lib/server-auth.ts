import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";

export async function requireAdminAccess() {
  const supabase = await createClient();
  if (!supabase) return { ok: false as const, supabase: null, user: null };

  const { data } = await supabase.auth.getUser();
  if (!data.user || !isAdminEmail(data.user.email)) {
    return { ok: false as const, supabase, user: data.user ?? null };
  }

  return { ok: true as const, supabase, user: data.user };
}
