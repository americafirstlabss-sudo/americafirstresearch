import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { createClient } from "@/lib/supabase/server";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const user = data.user;

  if (!user) {
    redirect("/auth?next=/checkout");
  }

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? "";
  const [firstName = "", ...rest] = fullName.split(" ");

  return (
    <main className="shell py-16">
      <div className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Checkout</p>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl text-platinum">Secure Checkout</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-platinum/68">
          Review your order, confirm shipping details, and continue to payment through a protected customer account.
        </p>
      </div>
      <CheckoutForm
        initialCustomer={{
          firstName,
          lastName: rest.join(" "),
          email: user.email ?? ""
        }}
      />
    </main>
  );
}
