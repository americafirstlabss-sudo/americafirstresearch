import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const payload = await request.json();
  const supabase = createAdminClient();

  if (supabase) {
    const leadPayload = {
      full_name: payload.fullName,
      email: payload.email,
      primary_goal: payload.primaryGoal,
      preferred_date: payload.preferredDate || null,
      time_zone: payload.timeZone || "Eastern Time",
      preferred_time_slot: payload.timeSlot || null,
      notes: payload.notes,
      booking_fee: 99,
      status: "new"
    };

    const { error } = await supabase.from("consulting_leads").insert(leadPayload);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Consultation request received." });
}
