import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const user = data.user;

  if (!user) {
    redirect("/auth?next=/account");
  }

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? "Customer";

  return (
    <main className="shell py-16">
      <div className="rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,246,240,0.94))] p-8 shadow-[0_22px_60px_rgba(19,35,58,0.06)]">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Account</p>
        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-platinum">Welcome back, {fullName}</h1>
            <p className="mt-4 text-base leading-8 text-platinum/68">
              Signed in as {user.email}. Your session stays active across refresh so checkout remains protected and seamless.
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
