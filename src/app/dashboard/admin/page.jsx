import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAllUsers } from "@/lib/api/user";
import { getAdminProducts } from "@/lib/api/product";
import { getAllOrders } from "@/lib/api/order";
import AdminDashboardStats from "@/components/dashboard/admin/DashboardStats";

export const metadata = {
  title: "Admin Dashboard | ReSell Hub",
  description: "Platform-wide overview of users, products, and orders.",
};

const AdminDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const [users, products, orders] = await Promise.all([
    getAllUsers(),
    getAdminProducts(),
    getAllOrders(),
  ]);

  const totalUsers = users?.length || 0;
  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;

  const firstName = session?.user?.name?.split(" ")[0] || "Admin";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Welcome back, {firstName}. Here&apos;s the platform overview.
      </p>

      <div className="mt-6">
        <AdminDashboardStats
          totalUsers={totalUsers}
          totalProducts={totalProducts}
          totalOrders={totalOrders}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;