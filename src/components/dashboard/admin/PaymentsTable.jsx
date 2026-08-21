"use client";

import { Table, Select, ListBox, Input, Button } from "@heroui/react";
import { Magnifier, Xmark } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const statusStyles = {
  success: "bg-success-soft text-success",
  paid: "bg-success-soft text-success",
  pending: "bg-warning-soft text-warning",
  failed: "bg-danger-soft text-danger",
};

const filterOptions = [
  { id: "", label: "All Statuses" },
  { id: "success", label: "Success" },
  { id: "pending", label: "Pending" },
  { id: "failed", label: "Failed" },
];

export default function PaymentsTable({ payments = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (key) => updateParams({ status: key });
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search });
  };
  const handleClearSearch = () => {
    setSearch("");
    updateParams({ search: "" });
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Select
          aria-label="Filter by payment status"
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
                  {opt.label}
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
              aria-label="Search by transaction ID, buyer name, or email"
              variant="secondary"
              placeholder="Search transaction, buyer..."
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
                className="absolute right-9 top-1/2 -translate-y-1/2"
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

      {!payments.length ? (
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <p className="text-sm text-muted">No transactions found.</p>
        </div>
      ) : (
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Payment monitoring" className="min-w-[750px]">
              <Table.Header>
                <Table.Column isRowHeader>Transaction ID</Table.Column>
                <Table.Column>Buyer</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Method</Table.Column>
                <Table.Column>Date</Table.Column>
                <Table.Column>Status</Table.Column>
              </Table.Header>
              <Table.Body>
                {payments.map((payment) => (
                  <Table.Row key={payment._id}>
                    <Table.Cell>
                      <span className="font-mono text-xs text-foreground">
                        {payment.transactionId}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div>
                        <p className="text-sm text-foreground">{payment.buyerName || "—"}</p>
                        <p className="text-xs text-muted">{payment.buyerEmail}</p>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="font-semibold text-foreground">
                      ৳{payment.amount?.toLocaleString()}
                    </Table.Cell>
                    <Table.Cell className="capitalize text-muted">
                      {payment.paymentMethod || "—"}
                    </Table.Cell>
                    <Table.Cell>
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          statusStyles[payment.paymentStatus] || "bg-surface text-muted"
                        }`}
                      >
                        {payment.paymentStatus}
                      </span>
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