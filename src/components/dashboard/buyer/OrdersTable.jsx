"use client";

import { Table, Button, AlertDialog } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cancelOrder } from "@/lib/actions/order";

const statusStyles = {
  pending: "bg-warning-soft text-warning",
  accepted: "bg-primary-soft text-primary",
  processing: "bg-primary-soft text-primary",
  shipped: "bg-accent-soft text-accent",
  delivered: "bg-success-soft text-success",
  rejected: "bg-danger-soft text-danger",
  cancelled: "bg-danger-soft text-danger",
};

// শিপমেন্টের আগে পর্যন্ত (pending/accepted/processing) cancel করা যাবে, docs অনুযায়ী
const cancellableStatuses = ["pending", "accepted", "processing"];

export default function OrdersTable({ orders = [] }) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState(null);
  const [targetOrder, setTargetOrder] = useState(null);

  const confirmCancel = async () => {
    if (!targetOrder) return;
    const id = targetOrder._id;

    setCancellingId(id);
    try {
      const result = await cancelOrder(id);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Order cancelled.");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while cancelling the order.");
    } finally {
      setCancellingId(null);
      setTargetOrder(null);
    }
  };

  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">
          You haven&apos;t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="My orders" className="min-w-[750px]">
            <Table.Header>
              <Table.Column isRowHeader>Product</Table.Column>
              <Table.Column>Seller</Table.Column>
              <Table.Column>Payment</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {orders.map((order) => {
                const canCancel = cancellableStatuses.includes(order.orderStatus);
                const isCancelling = cancellingId === order._id;

                return (
                  <Table.Row key={order._id}>
                    <Table.Cell>
                      <span className="font-medium text-foreground">
                        {order.productTitle || order.productId}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div>
                        <p className="text-foreground">{order.sellerInfo?.name}</p>
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
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          statusStyles[order.orderStatus] || "bg-surface text-muted"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {canCancel ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          isDisabled={isCancelling}
                          onPress={() => setTargetOrder(order)}
                        >
                          <span className="flex items-center gap-1.5 text-danger">
                            Cancel
                          </span>
                        </Button>
                      ) : (
                        <span className="text-xs text-muted">—</span>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <AlertDialog.Root
        isOpen={!!targetOrder}
        onOpenChange={(open) => !open && setTargetOrder(null)}
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Header>
                <AlertDialog.Heading>Cancel this order?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                Your order for <strong>{targetOrder?.productTitle}</strong> will be
                cancelled. This action cannot be undone.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <AlertDialog.CloseTrigger className="text-foreground">
                  Keep Order
                </AlertDialog.CloseTrigger>
                <Button
                  className="bg-danger text-danger-foreground"
                  isDisabled={cancellingId === targetOrder?._id}
                  onPress={confirmCancel}
                >
                  {cancellingId === targetOrder?._id ? "Cancelling..." : "Cancel Order"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog.Root>
    </>
  );
}