"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setState("loading");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: formData.get("email") }),
      headers: { "Content-Type": "application/json" }
    });
    setState(response.ok ? "success" : "error");
  }

  return (
    <form action={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <input name="email" type="email" required placeholder="Email address" className="h-14 flex-1 rounded-full border border-graphite/10 bg-white/85 px-5 text-sm text-platinum outline-none placeholder:text-platinum/35" />
      <button type="submit" className="button-primary h-14 px-8">
        {state === "loading" ? "Saving..." : "Join the list"}
      </button>
      <p className="text-xs text-platinum/55 sm:self-center">{state === "success" ? "Subscribed." : "Product drops, COA updates, and consulting releases."}</p>
    </form>
  );
}
