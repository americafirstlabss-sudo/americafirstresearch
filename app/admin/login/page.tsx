"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const [status, setStatus] = useState("Admin sign in with magic link");

  async function onSubmit(formData: FormData) {
    try {
      const supabase = createClient();
      setStatus("Sending...");
      const { error } = await supabase.auth.signInWithOtp({
        email: String(formData.get("email")),
        options: { emailRedirectTo: `${window.location.origin}/admin` }
      });
      setStatus(error ? error.message : "Magic link sent");
    } catch {
      setStatus("Add Supabase env vars to enable admin auth");
    }
  }

  return (
    <main className="shell py-16">
      <form action={onSubmit} className="mx-auto max-w-lg panel p-8">
        <p className="eyebrow">Admin Login</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Polished admin access</h1>
        <input name="email" type="email" required placeholder="Admin email" className="mt-6 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
        <button type="submit" className="button-primary mt-4 w-full">Send magic link</button>
        <p className="mt-4 text-sm text-white/50">{status}</p>
      </form>
    </main>
  );
}
