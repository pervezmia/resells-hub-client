

import { getAllProducts } from "./product";
import { getUserCountByRole } from "./user"; // বা আপনার user API ফাইল
import { getCompletedOrdersCount } from "./order";

export async function getMarketplaceStats() {
  try {
    const [productsRes, totalSellers, totalBuyers, completedOrders] = await Promise.all([
      getAllProducts({ limit: 0 }),
      getUserCountByRole("seller"),
      getUserCountByRole("buyer"),
      getCompletedOrdersCount(), // ✅ পাবলিক কাউন্ট কল করা হলো
    ]);

    return {
      totalProducts: productsRes?.totalCount || 0,
      totalSellers: totalSellers || 0,
      totalBuyers: totalBuyers || 0,
      completedOrders: completedOrders || 0,
    };
  } catch (error) {
    return {
      totalProducts: 0,
      totalSellers: 0,
      totalBuyers: 0,
      completedOrders: 0,
    };
  }
}