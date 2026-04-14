import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function mapBankfulStatus(value: string | null) {
  switch ((value ?? "").toUpperCase()) {
    case "APPROVED":
      return "paid";
    case "PENDING":
      return "pending_review";
    case "DECLINED":
      return "failed";
    default:
      return "pending_payment";
  }
}

async function handleCallback(data: Record<string, string>) {
  const xtlOrderId = data.XTL_ORDER_ID ?? data.xtl_order_id;
  if (!xtlOrderId) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: true });
  }

  await supabase
    .from("orders")
    .update({
      status: mapBankfulStatus(data.TRANS_STATUS_NAME ?? null),
      stripe_payment_intent_id: data.TRANS_ORDER_ID ?? null,
      notes: data.ERROR_MESSAGE ?? data.API_ADVICE ?? null
    })
    .eq("id", xtlOrderId);

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const body = await request.formData().catch(async () => {
    const json = await request.json().catch(() => ({}));
    return Object.entries(json as Record<string, string>);
  });

  const payload =
    body instanceof FormData
      ? Object.fromEntries(Array.from(body.entries()).map(([key, value]) => [key, String(value)]))
      : Object.fromEntries(body as [string, string][]);

  return handleCallback(payload);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return handleCallback(Object.fromEntries(searchParams.entries()));
}
