import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const payload = await request.json();

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const orderNumber = String(payload.orderNumber ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const supabase = createAdminClient();
  if (supabase) {
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      subject,
      message,
      order_number: orderNumber || null
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Your message has been sent. Our team will get back to you shortly."
  });
}
