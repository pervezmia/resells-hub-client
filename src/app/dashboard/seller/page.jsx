import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProducts } from "@/lib/api/product";
import DashboardStats from "@/components/dashboard/seller/DashboardStats";

export const metadata = {
  title: "Seller Dashboard | ReSell Hub",
  description: "Overview of your listings, sales, and revenue on ReSell Hub.",
};

const SellerDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const products = await getProducts(session?.user?.id);

  const totalProducts = products?.length || 0;
  const soldProducts = products?.filter((p) => p.status === "sold") || [];
  const totalSales = soldProducts.length;
  const totalRevenue = soldProducts.reduce((sum, p) => sum + (p.price || 0), 0);
  // NOTE: pendingOrders will come from the Orders API once it's built.
  // Using product status as a stand-in for now.
  const pendingOrders = products?.filter((p) => p.status === "pending").length || 0;

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