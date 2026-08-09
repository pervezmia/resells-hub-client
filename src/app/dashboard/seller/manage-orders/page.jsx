import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getSellerOrders } from "@/lib/api/order";
import OrdersTable from "@/components/dashboard/seller/OrdersTable";

export const metadata = {
  title: "Manage Orders | ReSell Hub Seller Dashboard",
  description: "View and manage incoming orders for your listed products.",
};

const ManageOrders = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("logged in user id:", session?.user?.id);
  const orders = await getSellerOrders(session?.user?.id);
  console.log("orders fetched:",orders);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>
      <p className="mt-1 text-sm text-muted">
        You have {orders?.length || 0} order{orders?.length === 1 ? "" : "s"} from buyers.
      </p>

      <div className="mt-6">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default ManageOrders;