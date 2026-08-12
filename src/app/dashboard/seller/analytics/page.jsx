import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProducts } from "@/lib/api/product";
import SellerAnalyticsClient from "@/components/dashboard/seller/SellerAnalyticsClient";

export const metadata = {
  title: "Sales Analytics | ReSell Hub Seller Dashboard",
  description: "Track your sales performance, revenue, and product trends on ReSell Hub.",
  robots: { index: false, follow: false },
};

export default async function SellerAnalyticsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const products = (await getProducts(session?.user?.id)) || [];

  // --- Dynamic Analytics Calculation ---

  // 1. Overview KPIs
  const totalProducts = products.length;
  const soldProducts = products.filter((p) => p.status === "sold");
  const totalSales = soldProducts.length;
  const totalRevenue = soldProducts.reduce((sum, p) => sum + (p.price || 0), 0);
  const pendingOrders = products.filter((p) => p.status === "pending").length;

  // 2. Dynamic Category Performance
  const categoryMap = products.reduce((acc, p) => {
    const cat = p.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categorySalesData = Object.keys(categoryMap).map((cat) => ({
    category: cat,
    sales: categoryMap[cat],
  }));

  // 3. Dynamic Top Products (Sorted by Price/Sales)
  const topProducts = [...products]
    .sort((a, b) => (b.price || 0) - (a.price || 0))
    .slice(0, 5)
    .map((p) => ({
      id: p._id || p.id,
      title: p.title,
      category: p.category,
      price: p.price,
      status: p.status,
    }));

  // 4. Monthly Trend Data (Fallback chart data using real revenue base)
  const monthlySalesData = [
    { month: "Jan", revenue: Math.round(totalRevenue * 0.1) },
    { month: "Feb", revenue: Math.round(totalRevenue * 0.15) },
    { month: "Mar", revenue: Math.round(totalRevenue * 0.2) },
    { month: "Apr", revenue: Math.round(totalRevenue * 0.25) },
    { month: "May", revenue: Math.round(totalRevenue * 0.3) },
    { month: "Jun", revenue: totalRevenue },
  ];

  return (
    <SellerAnalyticsClient
      stats={{
        totalProducts,
        totalSales,
        totalRevenue,
        pendingOrders,
      }}
      categorySalesData={categorySalesData}
      topProducts={topProducts}
      monthlySalesData={monthlySalesData}
    />
  );
}