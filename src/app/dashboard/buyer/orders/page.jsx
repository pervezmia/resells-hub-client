import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBuyerOrders } from "@/lib/api/order";
import BuyerOrdersTable from "@/components/dashboard/buyer/OrdersTable";

export const metadata = {
  title: "My Orders | ReSell Hub",
  description: "View and manage your orders on ReSell Hub.",
};

const MyOrders = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const orders = await getBuyerOrders(session?.user?.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
      <p className="mt-1 text-sm text-muted">
        You have {orders?.length || 0} order{orders?.length === 1 ? "" : "s"}.
      </p>

      <div className="mt-6">
        <BuyerOrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default MyOrders;