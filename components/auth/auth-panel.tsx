"use client";

import { startTransition, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";
import { createClient } from "@/lib/supabase/browser";

type AuthPanelProps = {
  defaultNext?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function syncCustomer(payload: { authUserId: string; email: string; fullName?: string | null }) {
  await fetch("/api/auth/customer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export function AuthPanel({ defaultNext = "/checkout" }: AuthPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => {
    const requested = searchParams.get("next");
    if (!requested || !requested.startsWith("/")) return defaultNext;
    return requested;
  }, [defaultNext, searchParams]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Sign in or create an account to continue to checkout.");
  const [loadingMode, setLoadingMode] = useState<"login" | "register" | "reset" | null>(null);

  function finishAuth(nextHref: string) {
    startTransition(() => {
      router.replace(nextHref);
      router.refresh();
    });
    window.location.href = nextHref;
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(loginEmail)) {
      setStatus("Enter a valid email address.");
      return;
    }

    if (loginPassword.length < 8) {
      setStatus("Password must be at least 8 characters.");
      return;
    }

    try {
      const supabase = createClient();
      setLoadingMode("login");
      setStatus("Signing you in...");

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
      });

      if (error || !data.user) {
        setStatus(error?.message ?? "Could not log in.");
        setLoadingMode(null);
        return;
      }

      await syncCustomer({
        authUserId: data.user.id,
        email: data.user.email ?? loginEmail,
        fullName: (data.user.user_metadata?.full_name as string | undefined) ?? null
      });

      setStatus("Login successful. Redirecting...");
      finishAuth(nextPath);
    } catch {
      setStatus("Add Supabase environment variables to enable authentication.");
      setLoadingMode(null);
    }
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!registerName.trim()) {
      setStatus("Enter your full name.");
      return;
    }

    if (!isValidEmail(registerEmail)) {
      setStatus("Enter a valid email address.");
      return;
    }

    if (registerPassword.length < 8) {
      setStatus("Password must be at least 8 characters.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setStatus("Confirm password must match.");
      return;
    }

    try {
      const supabase = createClient();
      setLoadingMode("register");
      setStatus("Creating your account...");

      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            full_name: registerName
          },
          emailRedirectTo: `${window.location.origin}${nextPath}`
        }
      });

      if (error || !data.user) {
        setStatus(error?.message ?? "Could not create your account.");
        setLoadingMode(null);
        return;
      }

      let authenticatedUser = data.user;
      let authenticatedEmail = data.user.email ?? registerEmail;
      let hasSession = Boolean(data.session);

      if (!data.session) {
        const loginResult = await supabase.auth.signInWithPassword({
          email: registerEmail,
          password: registerPassword
        });

        if (!loginResult.error && loginResult.data.user) {
          authenticatedUser = loginResult.data.user;
          authenticatedEmail = loginResult.data.user.email ?? registerEmail;
          hasSession = Boolean(loginResult.data.session);
        }
      }

      await syncCustomer({
        authUserId: authenticatedUser.id,
        email: authenticatedEmail,
        fullName: registerName
      });

      if (hasSession) {
        setStatus("Account created. Redirecting...");
        finishAuth(nextPath);
        return;
      }

      setStatus("Account created, but Supabase email confirmation is still enabled. Disable email confirmation if you want customers logged in immediately after registration.");
      setLoadingMode(null);
    } catch {
      setStatus("Add Supabase environment variables to enable authentication.");
      setLoadingMode(null);
    }
  }

  async function handleResetPassword() {
    if (!isValidEmail(loginEmail)) {
      setStatus("Enter your email address first so we can send a reset link.");
      return;
    }

    try {
      const supabase = createClient();
      setLoadingMode("reset");
      const { error } = await supabase.auth.resetPasswordForEmail(loginEmail, {
        redirectTo: `${window.location.origin}/auth/reset`
      });

      setStatus(error ? error.message : "Password reset instructions have been sent to your email.");
    } catch {
      setStatus("Unable to send reset email right now.");
    } finally {
      setLoadingMode(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl rounded-[36px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,246,240,0.94))] p-6 shadow-[0_26px_80px_rgba(19,35,58,0.08)] sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-[30px] border border-graphite/10 bg-white/72 p-6 shadow-[0_16px_40px_rgba(19,35,58,0.05)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Customer Access</p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl text-platinum sm:text-5xl">
            Account required before checkout
          </h1>
          <p className="mt-5 text-sm leading-7 text-platinum/68">
            Browse freely and build your cart normally. Before payment, sign in or create an account so your order,
            shipping details, and account history stay connected.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "Cart items stay preserved before and after login",
              "Successful login returns you directly to checkout"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-graphite/10 bg-white/80 px-4 py-3 text-sm text-platinum/72">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs leading-6 text-platinum/48">
            By continuing, you agree to the account, security, and checkout flow required for payment processing.
          </p>
        </div>

        <div>
          <Tabs.Root defaultValue="login">
            <Tabs.List className="flex flex-wrap gap-3">
              <Tabs.Trigger
                value="login"
                className="rounded-full border border-graphite/10 bg-white/72 px-5 py-2.5 text-sm font-medium text-platinum/72 transition hover:bg-white/92 data-[state=active]:border-gold data-[state=active]:bg-gold/10 data-[state=active]:text-platinum"
              >
                Login
              </Tabs.Trigger>
              <Tabs.Trigger
                value="register"
                className="rounded-full border border-graphite/10 bg-white/72 px-5 py-2.5 text-sm font-medium text-platinum/72 transition hover:bg-white/92 data-[state=active]:border-gold data-[state=active]:bg-gold/10 data-[state=active]:text-platinum"
              >
                Register
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="login" className="mt-5 rounded-[30px] border border-graphite/10 bg-white/80 p-6 shadow-[0_18px_42px_rgba(19,35,58,0.05)] sm:p-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Login</p>
              <h2 className="mt-4 text-3xl font-semibold text-platinum">Return to your account</h2>
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <input
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  type="email"
                  required
                  placeholder="Email"
                  className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/38 focus:border-cyan"
                />
                <input
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  type="password"
                  required
                  placeholder="Password"
                  className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/38 focus:border-cyan"
                />
                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="inline-flex items-center gap-2 text-platinum/68">
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-graphite/20" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-[#922030] transition hover:opacity-80"
                  >
                    {loadingMode === "reset" ? "Sending..." : "Forgot Password?"}
                  </button>
                </div>
                <button type="submit" disabled={loadingMode !== null} className="button-primary mt-2 w-full disabled:opacity-60">
                  {loadingMode === "login" ? "Logging in..." : "Login"}
                </button>
              </form>
            </Tabs.Content>

            <Tabs.Content value="register" className="mt-5 rounded-[30px] border border-graphite/10 bg-white/80 p-6 shadow-[0_18px_42px_rgba(19,35,58,0.05)] sm:p-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Register</p>
              <h2 className="mt-4 text-3xl font-semibold text-platinum">Create your customer account</h2>
              <form onSubmit={handleRegister} className="mt-6 space-y-4">
                <input
                  value={registerName}
                  onChange={(event) => setRegisterName(event.target.value)}
                  type="text"
                  required
                  placeholder="Full Name"
                  className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/38 focus:border-cyan"
                />
                <input
                  value={registerEmail}
                  onChange={(event) => setRegisterEmail(event.target.value)}
                  type="email"
                  required
                  placeholder="Email"
                  className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/38 focus:border-cyan"
                />
                <input
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                  type="password"
                  required
                  placeholder="Password"
                  className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/38 focus:border-cyan"
                />
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="h-12 w-full rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/38 focus:border-cyan"
                />
                <button type="submit" disabled={loadingMode !== null} className="button-primary mt-2 w-full disabled:opacity-60">
                  {loadingMode === "register" ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </Tabs.Content>
          </Tabs.Root>

          <div className="mt-5 rounded-[24px] border border-graphite/10 bg-white/74 px-5 py-4 text-sm text-platinum/62">
            <p>{status}</p>
            <p className="mt-2">
              Need to review your cart first?{" "}
              <Link href="/cart" className="font-medium text-[#922030] transition hover:opacity-80">
                Return to cart
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
