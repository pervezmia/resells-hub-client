import { Surface } from "@heroui/react";
import Link from "next/link";

const statusStyles = {
  pending: "bg-warning-soft text-warning",
  accepted: "bg-primary-soft text-primary",
  processing: "bg-primary-soft text-primary",
  shipped: "bg-accent-soft text-accent",
  delivered: "bg-success-soft text-success",
  rejected: "bg-danger-soft text-danger",
  cancelled: "bg-danger-soft text-danger",
};

export default function RecentPurchases({ orders = [] }) {
  if (!orders.length) {
    return (
      <Surface className="rounded-3xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">
          No purchases yet. Browse{" "}
          <Link href="/products" className="text-accent underline">
            All Products
          </Link>{" "}
          to get started.
        </p>
      </Surface>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Surface
          key={order._id}
          className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4"
        >
          <div>
            <p className="font-medium text-foreground">
              {order.productTitle || order.productId}
            </p>
            <p className="text-xs text-muted">{order.sellerInfo?.name}</p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
              statusStyles[order.orderStatus] || "bg-surface text-muted"
            }`}
          >
            {order.orderStatus}
          </span>
        </Surface>
      ))}
    </div>
  );
}