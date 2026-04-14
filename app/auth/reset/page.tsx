"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function AuthResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Enter your new password to complete the reset.");
  const [isSaving, setIsSaving] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function prepareRecoverySession() {
      try {
        const supabase = createClient();
        const url = new URL(window.location.href);
        const hash = new URLSearchParams(window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "");
        const code = url.searchParams.get("code");
        const tokenHash = url.searchParams.get("token_hash");
        const type = url.searchParams.get("type");
        const accessToken = hash.get("access_token");
        const refreshToken = hash.get("refresh_token");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            if (active) setStatus(error.message);
            return;
          }
        } else if (tokenHash && type === "recovery") {
          const { error } = await supabase.auth.verifyOtp({
            type: "recovery",
            token_hash: tokenHash
          });
          if (error) {
            if (active) setStatus(error.message);
            return;
          }
        } else if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          if (error) {
            if (active) setStatus(error.message);
            return;
          }
        } else {
          if (active) setStatus("This reset link is missing the recovery token. Request a new password reset email.");
          return;
        }

        if (active) {
          setIsReady(true);
          setStatus("Enter your new password to complete the reset.");
          window.history.replaceState({}, document.title, "/auth/reset");
        }
      } catch {
        if (active) setStatus("Unable to validate the reset link right now.");
      }
    }

    void prepareRecoverySession();

    return () => {
      active = false;
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isReady) {
      setStatus("This reset link is still being prepared. Try again in a moment.");
      return;
    }

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
          {isSaving ? "Saving..." : isReady ? "Update Password" : "Preparing Reset Link..."}
        </button>
        <p className="mt-4 text-sm text-platinum/55">{status}</p>
      </form>
    </main>
  );
}
