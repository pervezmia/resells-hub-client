"use client";

import { Table } from "@heroui/react";

const statusStyles = {
  success: "bg-success-soft text-success",
  pending: "bg-warning-soft text-warning",
  failed: "bg-danger-soft text-danger",
};

export default function PaymentHistoryTable({ payments = [] }) {
  if (!payments.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">
          No transactions yet. Your payment history will appear here after your first purchase.
        </p>
      </div>
    );
  }

  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label="Payment history" className="min-w-[700px]">
          <Table.Header>
            <Table.Column isRowHeader>Transaction ID</Table.Column>
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
                <Table.Cell>৳{payment.amount?.toLocaleString()}</Table.Cell>
                <Table.Cell className="capitalize">
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
  );
}