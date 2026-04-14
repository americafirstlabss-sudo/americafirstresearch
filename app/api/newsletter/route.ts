import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const supabase = createAdminClient();
  if (supabase) {
    await supabase.from("customers").upsert({ email, marketing_opt_in: true }, { onConflict: "email" });
  }

  return NextResponse.json({ ok: true });
}
