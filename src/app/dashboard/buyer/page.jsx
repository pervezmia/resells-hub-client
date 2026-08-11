import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBuyerOrders } from "@/lib/api/order";
import { getWishlist } from "@/lib/api/wishlist";
import { getBuyerPayments } from "@/lib/api/payment";
import BuyerDashboardStats from "@/components/dashboard/buyer/DashboardStats";
import RecentPurchases from "@/components/dashboard/buyer/RecentPurchases";

export const metadata = {
  title: "Dashboard | ReSell Hub",
  description: "Overview of your orders, wishlist, and recent purchases on ReSell Hub.",
};

const BuyerDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const [orders, wishlist, payments] = await Promise.all([
    getBuyerOrders(session?.user?.id),
    getWishlist(session?.user?.id),
    getBuyerPayments(session?.user?.id),
  ]);

  const totalOrders = orders?.length || 0;
  const wishlistCount = wishlist?.length || 0;

  const completedOrders =
    orders?.filter((o) => o.orderStatus === "delivered").length || 0;

  const totalSpent =
    payments
      ?.filter(
        (p) => p.paymentStatus === "success" || p.paymentStatus === "paid"
      )
      .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

  const recentPurchases = [...(orders || [])]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3);

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Welcome back, {firstName}. Here&apos;s a summary of your activity.
      </p>

      <div className="mt-6">
        <BuyerDashboardStats
          totalOrders={totalOrders}
          wishlistCount={wishlistCount}
          completedOrders={completedOrders}
          totalSpent={totalSpent}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Recent Purchases</h2>
        <div className="mt-3">
          <RecentPurchases orders={recentPurchases} />
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;