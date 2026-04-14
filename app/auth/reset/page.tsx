"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AuthResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Enter your new password to complete the reset.");
  const [isSaving, setIsSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      setStatus("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("Confirm password must match.");
      return;
    }

    try {
      const supabase = createClient();
      setIsSaving(true);
      const { error } = await supabase.auth.updateUser({ password });
      setStatus(error ? error.message : "Password updated. You can now log in.");
    } catch {
      setStatus("Unable to update password right now.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="shell py-16">
      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-lg rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,246,240,0.94))] p-8 shadow-[0_22px_60px_rgba(19,35,58,0.06)]"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Password Reset</p>
        <h1 className="mt-4 text-3xl font-semibold text-platinum">Choose a new password</h1>
        <div className="mt-6 space-y-4">
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            placeholder="New password"
            className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan"
          />
          <input
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            required
            placeholder="Confirm password"
            className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan"
          />
        </div>
        <button type="submit" disabled={isSaving} className="button-primary mt-6 w-full disabled:opacity-60">
          {isSaving ? "Saving..." : "Update Password"}
        </button>
        <p className="mt-4 text-sm text-platinum/55">{status}</p>
      </form>
    </main>
  );
}
