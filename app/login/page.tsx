import { RoutePlaceholderPage } from "@/components/placeholder/route-placeholder-page";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <RoutePlaceholderPage title="Login" route="/login" pageType="Auth" purpose="User login." />
    </main>
  );
}
