import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const stripe = new Stripe(stripeKey);
  const payload = await request.text();
  const signature = headers().get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createAdminClient();
    if (supabase) {
      await supabase.from("orders").upsert({
        stripe_checkout_id: session.id,
        customer_email: session.customer_details?.email,
        total_amount: session.amount_total ? session.amount_total / 100 : 0,
        status: "paid",
        source: "stripe_webhook"
      }, { onConflict: "stripe_checkout_id" });
    }
  }

  return NextResponse.json({ received: true });
}
