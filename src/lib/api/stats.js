import { getAllProducts } from "./product";
import { getAllUsers } from "./user";
import { getAllOrders } from "./order";

export async function getMarketplaceStats() {
  const [productsRes, sellers, buyers, orders] = await Promise.all([
    getAllProducts({ limit: 0 }), // শুধু totalCount দরকার
    getAllUsers("").then((users) => users.filter((u) => u.role === "seller")),
    getAllUsers("").then((users) => users.filter((u) => u.role === "buyer")),
    getAllOrders(),
  ]);

  return {
    totalProducts: productsRes?.totalCount || 0,
    totalSellers: sellers?.length || 0,
    totalBuyers: buyers?.length || 0,
    completedOrders: orders?.filter((o) => o.orderStatus === "delivered").length || 0,
  };
}