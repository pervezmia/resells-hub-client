import { getAllPayments } from "@/lib/api/payment";
import PaymentsTable from "@/components/dashboard/admin/PaymentsTable";
import { Surface } from "@heroui/react";
import { Wallet } from "@gravity-ui/icons";

export const metadata = {
  title: "Payment Monitoring | ReSell Hub Admin Dashboard",
  description: "Monitor all transactions and revenue across ReSell Hub.",
};

const ManagePayments = async ({ searchParams }) => {
  const params = await searchParams;
  const payments = await getAllPayments(params?.status, params?.search);

  const totalRevenue = payments
    .filter((p) => p.paymentStatus === "success" || p.paymentStatus === "paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Payment Monitoring</h1>
      <p className="mt-1 text-sm text-muted">
        {payments.length} transaction{payments.length === 1 ? "" : "s"} across the platform.
      </p>

      <Surface className="mt-6 flex items-center gap-4 rounded-3xl border border-border bg-surface p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success-soft text-success">
          <Wallet width={22} height={22} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">৳{totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted">Total Revenue (successful payments)</p>
        </div>
      </Surface>

      <div className="mt-6">
        <PaymentsTable payments={payments} />
      </div>
    </div>
  );
};

export default ManagePayments;