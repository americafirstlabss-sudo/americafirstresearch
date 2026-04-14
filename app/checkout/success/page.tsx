export default function CheckoutSuccessPage() {
  return (
    <main className="shell py-16">
      <div className="mx-auto max-w-3xl panel p-10 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Order Confirmed</p>
        <h1 className="mt-4 text-4xl font-semibold text-platinum">Thank you. Your order has been received.</h1>
        <p className="mt-6 text-base leading-8 text-platinum/68">
          Payment has been submitted and your order is now queued for confirmation, fulfillment review, and account-based order lookup.
        </p>
      </div>
    </main>
  );
}
