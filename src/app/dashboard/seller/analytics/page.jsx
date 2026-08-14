import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProducts } from "@/lib/api/product";
import { getSellerOrders } from "@/lib/api/order";
import SellerAnalyticsClient from "@/components/dashboard/seller/SellerAnalyticsClient";

export const metadata = {
  title: "Sales Analytics | ReSell Hub Seller Dashboard",
  description: "Track your sales performance, revenue, and product trends on ReSell Hub.",
  robots: { index: false, follow: false },
};

// শেষ ৬ মাসের month bucket তৈরি করে, paid orders-এর revenue যোগ করে
function buildMonthlyRevenue(orders) {
  const now = new Date();
  const buckets = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: d.toLocaleDateString("en-US", { month: "short" }),
      revenue: 0,
    });
  }

  orders
    .filter((o) => o.paymentStatus === "paid")
    .forEach((order) => {
      if (!order.createdAt) return;
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = buckets.find((b) => b.key === key);
      if (bucket) bucket.revenue += (order.price || 0) * (order.quantity || 1);
    });

  return buckets.map(({ month, revenue }) => ({ month, revenue }));
}

export default async function SellerAnalyticsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const [products, orders] = await Promise.all([
    getProducts(session?.user?.id).then((p) => p || []),
    getSellerOrders(session?.user?.id).then((o) => o || []),
  ]);

  // productId → category ম্যাপ (order-এ category snapshot নেই বলে, listed product থেকে enrich করছি)
  const categoryMap = new Map(products.map((p) => [p._id, p.category]));

  // ১. Overview KPI — এখন সত্যিকারের Orders API থেকে (পুরনো product.status hack বাদ)
  const paidOrders = orders.filter((o) => o.paymentStatus === "paid");
  const totalProducts = products.length;
  const totalSales = paidOrders.length;
  const totalRevenue = paidOrders.reduce(
    (sum, o) => sum + (o.price || 0) * (o.quantity || 1),
    0
  );
  const pendingOrders = orders.filter((o) => o.orderStatus === "pending").length;

  // ২. Revenue by Category — paid orders-কে category অনুযায়ী গ্রুপ করে revenue যোগ
  const categoryRevenue = {};
  paidOrders.forEach((o) => {
    const cat = categoryMap.get(o.productId) || "Other";
    categoryRevenue[cat] =
      (categoryRevenue[cat] || 0) + (o.price || 0) * (o.quantity || 1);
  });
  const categorySalesData = Object.entries(categoryRevenue).map(
    ([category, sales]) => ({ category, sales })
  );

  // ৩. Top Selling Products — productId অনুযায়ী units sold + revenue aggregate
  const productSales = {};
  paidOrders.forEach((o) => {
    const key = o.productId;
    if (!productSales[key]) {
      productSales[key] = {
        id: key,
        title: o.productTitle,
        category: categoryMap.get(key) || "—",
        price: o.price,
        unitsSold: 0,
      };
    }
    productSales[key].unitsSold += o.quantity || 1;
  });
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5);

  // ৪. Monthly Sales Trend — real month-wise revenue
  const monthlySalesData = buildMonthlyRevenue(orders);

  return (
    <SellerAnalyticsClient
      stats={{ totalProducts, totalSales, totalRevenue, pendingOrders }}
      categorySalesData={categorySalesData}
      topProducts={topProducts}
      monthlySalesData={monthlySalesData}
    />
  );
}