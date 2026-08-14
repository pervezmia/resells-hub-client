"use client";

import { Table, Select, ListBox } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/lib/actions/order";

const statusStyles = {
  pending: "bg-warning-soft text-warning",
  accepted: "bg-primary-soft text-primary",
  processing: "bg-primary-soft text-primary",
  shipped: "bg-accent-soft text-accent",
  delivered: "bg-success-soft text-success",
  rejected: "bg-danger-soft text-danger",
  cancelled: "bg-danger-soft text-danger",
};

const statusOptions = [
  "pending",
  "accepted",
  "processing",
  "shipped",
  "delivered",
  "rejected",
  "cancelled",
];

export default function OrdersTable({ orders = [] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`Order updated to ${newStatus}.`);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">No orders yet.</p>
      </div>
    );
  }

  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage all orders" className="min-w-[850px]">
          <Table.Header>
            <Table.Column isRowHeader>Product</Table.Column>
            <Table.Column>Buyer</Table.Column>
            <Table.Column>Seller</Table.Column>
            <Table.Column>Payment</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            {orders.map((order) => (
              <Table.Row key={order._id}>
                <Table.Cell>
                  <span className="font-medium text-foreground">
                    {order.productTitle || order.productId}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <p className="text-sm text-foreground">{order.buyerInfo?.name}</p>
                    <p className="text-xs text-muted">{order.buyerInfo?.email}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <p className="text-sm text-foreground">{order.sellerInfo?.name}</p>
                    <p className="text-xs text-muted">{order.sellerInfo?.email}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                      order.paymentStatus === "paid"
                        ? "bg-success-soft text-success"
                        : "bg-warning-soft text-warning"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Select
                    aria-label={`Update status for order ${order._id}`}
                    selectedKey={order.orderStatus}
                    isDisabled={updatingId === order._id}
                    onSelectionChange={(key) => handleStatusChange(order._id, key)}
                    className="w-40"
                  >
                    <Select.Trigger>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          statusStyles[order.orderStatus] || "bg-surface text-muted"
                        }`}
                      >
                        <Select.Value />
                      </span>
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {statusOptions.map((s) => (
                          <ListBox.Item key={s} id={s} textValue={s}>
                            <span className="capitalize">{s}</span>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}