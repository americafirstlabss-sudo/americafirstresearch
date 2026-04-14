import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function splitName(fullName?: string | null) {
  const value = (fullName ?? "").trim();
  if (!value) return { firstName: null, lastName: null };
  const parts = value.split(/\s+/);
  return {
    firstName: parts[0] ?? null,
    lastName: parts.slice(1).join(" ") || null
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim();
  const authUserId = String(body.authUserId ?? "").trim();
  const fullName = String(body.fullName ?? "").trim();

  if (!email || !authUserId) {
    return NextResponse.json({ error: "Missing customer data." }, { status: 400 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: true });
  }

  const { firstName, lastName } = splitName(fullName);

  const { error } = await supabase.from("customers").upsert(
    {
      auth_user_id: authUserId,
      email,
      first_name: firstName,
      last_name: lastName
    },
    { onConflict: "email" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
