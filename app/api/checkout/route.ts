import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shop";
import { buildHostedBankfulSignature } from "@/lib/bankful";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const supabaseAuth = await createClient();
  const { data: authData } = supabaseAuth ? await supabaseAuth.auth.getUser() : { data: { user: null } };
  const authUser = authData.user;

  if (!authUser) {
    return NextResponse.json({ error: "Login required before checkout." }, { status: 401 });
  }

  const body = await request.json();
  const appBaseUrl = process.env.APP_BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const bankfulApiUrl = process.env.BANKFUL_API_URL;
  const bankfulUsername = process.env.BANKFUL_USERNAME;
  const bankfulPassword = process.env.BANKFUL_PASSWORD;
  const catalog = await getProducts();
  const items = Array.isArray(body.items) ? body.items : [];
  const checkoutItems = items
    .map((item: { productId?: string; quantity?: number; selectedOption?: string }) => {
      const product = catalog.find((entry) => entry.id === item.productId);
      if (!product) return null;
      return {
        product,
        quantity: Number(item.quantity ?? 1),
        selectedOption: String(item.selectedOption ?? product.sizeOptions[0])
      };
    })
    .filter(Boolean) as Array<{ product: (typeof catalog)[number]; quantity: number; selectedOption: string }>;

  if (!checkoutItems.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const totalAmount = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!bankfulApiUrl || !bankfulUsername || !bankfulPassword) {
    return NextResponse.json({ error: "Bankful checkout is not configured." }, { status: 500 });
  }

  const supabase = createAdminClient();
  let orderId: string | null = null;
  if (supabase) {
    let customerId: string | null = null;
    let shippingAddressId: string | null = null;

    if (authUser.email || body.customer?.email) {
      const { data: customer } = await supabase
        .from("customers")
        .upsert({
          auth_user_id: authUser.id,
          email: authUser.email ?? body.customer.email,
          first_name: body.customer.firstName,
          last_name: body.customer.lastName,
          phone: body.customer.phone
        }, { onConflict: "email" })
        .select("id")
        .single();

      customerId = customer?.id ?? null;
    }

    if (customerId && body.shipping?.line1 && body.shipping?.city && body.shipping?.state && body.shipping?.postalCode) {
      const { data: address } = await supabase
        .from("shipping_addresses")
        .insert({
          customer_id: customerId,
          name: `${body.customer?.firstName ?? ""} ${body.customer?.lastName ?? ""}`.trim(),
          line1: body.shipping.line1,
          line2: body.shipping.line2,
          city: body.shipping.city,
          state: body.shipping.state,
          postal_code: body.shipping.postalCode,
          country: body.shipping.country ?? "US"
        })
        .select("id")
        .single();

      shippingAddressId = address?.id ?? null;
    }

    const { data: order } = await supabase.from("orders").insert({
      customer_id: customerId,
      shipping_address_id: shippingAddressId,
      customer_email: authUser.email ?? body.customer?.email,
      subtotal_amount: totalAmount,
      total_amount: totalAmount,
      status: "pending_payment",
      source: "bankful_hosted_page"
    }).select("id").single();

    orderId = order?.id ?? null;

    if (order?.id) {
      await supabase.from("order_items").insert(
        checkoutItems.map((item) => ({
          order_id: order.id,
          product_id: isUuid(item.product.id) ? item.product.id : null,
          product_name: item.product.name,
          product_slug: item.product.slug,
          quantity: item.quantity,
          unit_price: item.product.price,
          selected_option: item.selectedOption,
          product_image: item.product.image
        }))
      );
    }
  }

  const xtlOrderId = orderId ?? `AFL-${Date.now()}`;
  const callbackUrl = `${appBaseUrl}/api/bankful/callback`;
  const successUrl = `${appBaseUrl}/checkout/success`;
  const failedUrl = `${appBaseUrl}/checkout/failed`;
  const pendingUrl = `${appBaseUrl}/checkout/pending`;

  const bankfulFields = {
    req_username: bankfulUsername,
    transaction_type: "CAPTURE",
    amount: totalAmount.toFixed(2),
    request_currency: "USD",
    cust_fname: String(body.customer?.firstName ?? ""),
    cust_lname: String(body.customer?.lastName ?? ""),
    cust_email: String(authUser.email ?? body.customer?.email ?? ""),
    cust_phone: String(body.customer?.phone ?? ""),
    bill_addr: String(body.shipping?.line1 ?? ""),
    bill_addr_2: String(body.shipping?.line2 ?? ""),
    bill_addr_city: String(body.shipping?.city ?? ""),
    bill_addr_state: String(body.shipping?.state ?? ""),
    bill_addr_zip: String(body.shipping?.postalCode ?? ""),
    bill_addr_country: String(body.shipping?.country ?? "US"),
    xtl_order_id: xtlOrderId,
    url_cancel: `${appBaseUrl}/cart`,
    url_complete: successUrl,
    url_failed: failedUrl,
    url_callback: callbackUrl,
    url_pending: pendingUrl,
    cart_name: "Hosted-Page",
    return_redirect_url: "Y"
  };

  const signature = buildHostedBankfulSignature(bankfulFields, bankfulPassword);

  const response = await fetch(bankfulApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      ...bankfulFields,
      signature
    }).toString()
  });

  const responseData = await response.json().catch(() => null);
  const redirectUrl = responseData?.redirect_url;

  if (!response.ok || !redirectUrl) {
    return NextResponse.json(
      {
        debug: {
          bankfulApiUrl,
          bankfulUsername,
          appBaseUrl
        },
        error:
          responseData?.errorMessage ??
          responseData?.message ??
          responseData?.status ??
          JSON.stringify(responseData) ??
          "Bankful could not create the hosted payment session."
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    provider: "bankful",
    checkoutUrl: redirectUrl
  });
}
