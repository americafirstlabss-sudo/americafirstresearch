"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      router.replace("/auth");
      router.refresh();
      window.location.href = "/auth";
    }
  }

  return (
    <button type="button" onClick={handleLogout} className="button-secondary">
      Log out
    </button>
  );
}
