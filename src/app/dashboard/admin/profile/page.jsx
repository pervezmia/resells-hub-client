import { getAllUsers } from "@/lib/api/user";
import { getAdminProducts } from "@/lib/api/product";
import { getAllOrders } from "@/lib/api/order";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import UserGrowthChart from "@/components/dashboard/admin/charts/UserGrowthChart";
import CategoryPerformanceChart from "@/components/dashboard/admin/charts/CategoryPerformanceChart";
import MonthlyOrdersChart from "@/components/dashboard/admin/charts/MonthlyOrdersChart";
import TopCategoriesChart from "@/components/dashboard/admin/charts/TopCategoriesChart";

export const metadata = {
  title: "Platform Analytics | ReSell Hub Admin Dashboard",
  description: "Platform-wide growth, product, and order analytics.",
};

// শেষ ৬ মাসের month-wise bucket তৈরি করে, প্রতিটা doc-এর createdAt দিয়ে count করে
function groupByMonth(docs) {
  const now = new Date();
  const buckets = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString("en-US", { month: "short" }),
      count: 0,
    });
  }

  docs.forEach((doc) => {
    if (!doc.createdAt) return;
    const d = new Date(doc.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = buckets.find((b) => b.key === key);
    if (bucket) bucket.count += 1;
  });

  return buckets.map(({ label, count }) => ({ month: label, count }));
}

const AdminAnalytics = async () => {
  const [users, products, orders] = await Promise.all([
    getAllUsers(),
    getAdminProducts(),
    getAllOrders(),
  ]);

  // User Growth — গত ৬ মাসে registration
  const userGrowthData = groupByMonth(users);

  // Category Performance — প্রতি category-তে কতগুলো product আছে
  const categoryPerformanceData = PRODUCT_CATEGORIES.map((cat) => ({
    category: cat,
    count: products.filter((p) => p.category === cat).length,
  }));

  // Monthly Orders — গত ৬ মাসে order
  const monthlyOrdersData = groupByMonth(orders);

  // Top Categories — order হওয়া product-গুলোর category বের করে count
  const productCategoryMap = new Map(products.map((p) => [p._id, p.category]));
  const topCategoriesCount = {};
  orders.forEach((order) => {
    const category = productCategoryMap.get(order.productId) || "Other";
    topCategoriesCount[category] = (topCategoriesCount[category] || 0) + 1;
  });
  const topCategoriesData = Object.entries(topCategoriesCount).map(
    ([category, count]) => ({ category, count })
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Platform Analytics</h1>
      <p className="mt-1 text-sm text-muted">
        Growth, product, and order insights across ReSell Hub.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UserGrowthChart data={userGrowthData} />
        <MonthlyOrdersChart data={monthlyOrdersData} />
        <CategoryPerformanceChart data={categoryPerformanceData} />
        <TopCategoriesChart data={topCategoriesData} />
      </div>
    </div>
  );
};

export default AdminAnalytics;