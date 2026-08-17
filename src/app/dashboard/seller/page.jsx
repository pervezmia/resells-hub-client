import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProducts } from "@/lib/api/product";
import { getSellerOrders } from "@/lib/api/order";
import DashboardStats from "@/components/dashboard/seller/DashboardStats";

export const metadata = {
  title: "Seller Dashboard | ReSell Hub",
  description: "Overview of your listings, sales, and revenue on ReSell Hub.",
};

const SellerDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const sellerId = session?.user?.id;

  const [products, orders] = await Promise.all([
    getProducts(sellerId),
    getSellerOrders(sellerId),
  ]);

  const totalProducts = products?.length || 0;

  const deliveredOrders = orders?.filter((o) => o.orderStatus === "delivered") || [];
  const totalSales = deliveredOrders.length;
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + (o.price || 0), 0);

  const pendingOrders =
    orders?.filter(
      (o) => o.orderStatus !== "delivered" && o.orderStatus !== "rejected"
    ).length || 0;

  const firstName = session?.user?.name?.split(" ")[0] || "Seller";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
      <p className="mt-1 text-sm text-muted">
        Welcome back, {firstName}. Here&apos;s how your store is doing.
      </p>

      <div className="mt-6">
        <DashboardStats
          totalProducts={totalProducts}
          totalSales={totalSales}
          totalRevenue={totalRevenue}
          pendingOrders={pendingOrders}
        />
      </div>
    </div>
  );
};

export default SellerDashboard;