import { getAllOrders } from "@/lib/api/order";
import AdminOrdersTable from "@/components/dashboard/admin/OrdersTable";

export const metadata = {
  title: "Manage Orders | ReSell Hub Admin Dashboard",
  description: "Monitor and manage all orders across the ReSell Hub platform.",
};

const ManageOrders = async ({ searchParams }) => {
  const params = await searchParams;
  const orders = await getAllOrders(params?.status, params?.search);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>
      <p className="mt-1 text-sm text-muted">
        {orders?.length || 0} order{orders?.length === 1 ? "" : "s"} across the platform.
      </p>

      <div className="mt-6">
        <AdminOrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default ManageOrders;