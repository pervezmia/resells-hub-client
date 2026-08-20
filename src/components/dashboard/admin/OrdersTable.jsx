"use client";

import { Table, Select, ListBox, Input, Button } from "@heroui/react";
import { Magnifier, Xmark } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

const filterOptions = [
  { id: "", label: "All Statuses" },
  ...statusOptions.map((s) => ({ id: s, label: s })),
];

export default function OrdersTable({ orders = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (key) => {
    updateParams({ status: key });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search });
  };

  const handleClearSearch = () => {
    setSearch("");
    updateParams({ search: "" });
  };

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

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Select
          aria-label="Filter by order status"
          placeholder="Filter"
          selectedKey={searchParams.get("status") || ""}
          onSelectionChange={handleFilterChange}
          className="w-full md:w-56"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {filterOptions.map((opt) => (
                <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                  <span className="capitalize">{opt.label}</span>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <form onSubmit={handleSearchSubmit} className="w-full md:w-72">
          <div className="relative">
            <Magnifier
              width={16}
              height={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              aria-label="Search orders by buyer, seller, or product"
              variant="secondary"
              placeholder="Search buyer, seller, product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={search ? "pl-9 pr-20" : "pl-9 pr-12"}
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                isIconOnly
                aria-label="Clear search"
                className="absolute right-12 top-1/2 -translate-y-1/2"
                onPress={handleClearSearch}
              >
                <Xmark width={14} height={14} />
              </Button>
            )}
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              isIconOnly
              aria-label="Search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
            >
              <Magnifier width={16} height={16} />
            </Button>
          </div>
        </form>
      </div>

      {!orders.length ? (
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <p className="text-sm text-muted">No orders found.</p>
        </div>
      ) : (
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
      )}
    </>
  );
}