import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBuyerPayments } from "@/lib/api/payment";
import PaymentHistoryTable from "@/components/dashboard/buyer/PaymentHistoryTable";

export const metadata = {
  title: "Payment History | ReSell Hub",
  description: "View your past payments and transactions on ReSell Hub.",
};

const PaymentHistoryPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const payments = await getBuyerPayments(session?.user?.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
      <p className="mt-1 text-sm text-muted">
        {payments?.length || 0} transaction{payments?.length === 1 ? "" : "s"} found.
      </p>

      <div className="mt-6">
        <PaymentHistoryTable payments={payments} />
      </div>
    </div>
  );
};

export default PaymentHistoryPage;