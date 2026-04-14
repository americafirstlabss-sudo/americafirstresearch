"use client";

const FREE_SHIPPING_THRESHOLD = 200;

export function FreeShippingProgress({ total }: { total: number }) {
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(0, Math.round(FREE_SHIPPING_THRESHOLD - total));

  let message = "Add items to your cart to unlock free shipping";
  if (total >= FREE_SHIPPING_THRESHOLD) {
    message = "You've unlocked FREE shipping";
  } else if (total > 0 && remaining <= 50) {
    message = `You're only $${remaining} away — add one more item to qualify`;
  } else if (total > 0) {
    message = `You're $${remaining} away from FREE shipping`;
  }

  return (
    <div className="rounded-[26px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,244,237,0.92))] p-4 shadow-[0_14px_30px_rgba(19,35,58,0.05)]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-platinum">{message}</p>
        <span className="text-xs uppercase tracking-[0.24em] text-platinum/48">$200 Goal</span>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[rgba(19,35,58,0.08)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#6f88b8,#922030,#9c7a2b)] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
