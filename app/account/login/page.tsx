import { Suspense } from "react";
import { AuthPanel } from "@/components/auth/auth-panel";

export default function AccountLoginPage() {
  return (
    <main className="shell py-16">
      <Suspense fallback={<div className="panel p-8 text-sm text-platinum/60">Loading account access...</div>}>
        <AuthPanel defaultNext="/account" />
      </Suspense>
    </main>
  );
}
