import type { Metadata } from "next";
import AdminLoginForm from "@/features/admin/AdminLoginForm";
import AdminOrdersView from "@/features/admin/AdminOrdersView";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/session";
import { listAllOrders } from "@/lib/orders/repository";

export const metadata: Metadata = {
  title: "Admin — Orders",
  robots: { index: false, follow: false },
};

export default async function AdminOrdersPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-8">
        <h1 className="font-serif text-3xl text-ink">Admin orders</h1>
        <p className="font-sans text-sm text-ink-muted">
          Set <code className="font-mono text-ink">ADMIN_SECRET</code> in{" "}
          <code className="font-mono text-ink">.env.local</code> to enable this page.
        </p>
      </div>
    );
  }

  const signedIn = await isAdminAuthenticated();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 py-4">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Admin — Orders</h1>
        <p className="font-sans text-sm text-ink-muted">
          Match each order to your bank statement, then confirm payment. Use{" "}
          <span className="font-medium text-ink">Fulfillment</span> to move paid orders
          through <span className="font-medium text-ink">Mark preparing</span> →{" "}
          <span className="font-medium text-ink">Mark shipped</span> →{" "}
          <span className="font-medium text-ink">Mark delivered</span>.
        </p>
      </div>

      {signedIn ? (
        <AdminOrdersView initialOrders={await listAllOrders()} />
      ) : (
        <AdminLoginForm />
      )}
    </div>
  );
}
