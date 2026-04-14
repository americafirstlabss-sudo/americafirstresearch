import { AuthPanel } from "@/components/auth/auth-panel";

export default function AccountLoginPage() {
  return (
    <main className="shell py-16">
      <AuthPanel defaultNext="/account" />
    </main>
  );
}
