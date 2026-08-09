"use client";

import { Table, Button } from "@heroui/react";
import { Check, Xmark, ArrowRight } from "@gravity-ui/icons";
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
};

const statusFlow = [
  "pending",
  "accepted",
  "processing",
  "shipped",
  "delivered",
];

function getNextStatus(current) {
  const index = statusFlow.indexOf(current);
  if (index === -1 || index === statusFlow.length - 1) return null;
  return statusFlow[index + 1];
}

export default function OrdersTable({ orders = [] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState(null);

  const handleUpdate = async (orderId, orderStatus) => {
    setUpdatingId(orderId);
    try {
      const result = await updateOrderStatus(orderId, orderStatus);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(`Order marked as ${orderStatus}`);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">
          You don&apos;t have any orders yet.
        </p>
      </div>
    );
  }

  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage orders" className="min-w-[800px]">
          <Table.Header>
            <Table.Column isRowHeader>Buyer</Table.Column>
            <Table.Column>Product</Table.Column>
            <Table.Column>Payment</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {orders.map((order) => {
              const nextStatus = getNextStatus(order.orderStatus);
              const isUpdating = updatingId === order._id;

              return (
                <Table.Row key={order._id}>
                  <Table.Cell>
                    <div>
                      <p className="font-medium text-foreground">
                        {order.buyerInfo?.name}
                      </p>
                      <p className="text-xs text-muted">
                        {order.buyerInfo?.email}
                      </p>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {order.productTitle || order.productId}
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
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        statusStyles[order.orderStatus] ||
                        "bg-surface text-muted"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {order.orderStatus === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-success text-success-foreground"
                            isDisabled={isUpdating}
                            onPress={() => handleUpdate(order._id, "accepted")}
                          >
                            <span className="flex items-center gap-1.5">
                              <Check width={14} height={14} />
                              Accept
                            </span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            isDisabled={isUpdating}
                            onPress={() => handleUpdate(order._id, "rejected")}
                          >
                            <span className="flex items-center gap-1.5">
                              <Xmark
                                width={14}
                                height={14}
                                className="text-danger"
                              />
                              Reject
                            </span>
                          </Button>
                        </>
                      )}

                      {nextStatus && order.orderStatus !== "pending" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          isDisabled={isUpdating}
                          onPress={() => handleUpdate(order._id, nextStatus)}
                        >
                          {isUpdating ? "Updating..." : `Mark as ${nextStatus}`}
                          <ArrowRight width={14} height={14} />
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
