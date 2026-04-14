import { redirect } from "next/navigation";
import { AuthPanel } from "@/components/auth/auth-panel";
import { createClient } from "@/lib/supabase/server";

export default async function AuthPage({
  searchParams
}: {
  searchParams: { next?: string };
}) {
  const supabase = await createClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const nextPath = searchParams.next?.startsWith("/") ? searchParams.next : "/account";

  if (data.user) {
    redirect(nextPath);
  }

  return (
    <main className="shell py-16">
      <AuthPanel />
    </main>
  );
}
