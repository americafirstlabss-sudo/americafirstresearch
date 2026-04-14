export default function CheckoutPendingPage() {
  return (
    <main className="shell py-16">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,246,240,0.94))] p-10 text-center shadow-[0_22px_60px_rgba(19,35,58,0.06)]">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Payment Pending</p>
        <h1 className="mt-4 text-4xl font-semibold text-platinum">Your payment is currently pending review.</h1>
        <p className="mt-6 text-base leading-8 text-platinum/68">
          We have received your order request and will update the payment status as soon as Bankful confirms the transaction.
        </p>
      </div>
    </main>
  );
}
