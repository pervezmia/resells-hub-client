"use client";

import { Surface } from "@heroui/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "var(--accent)",
  "var(--primary)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
  "#8884d8",
];

export default function TopCategoriesChart({ data = [] }) {
  if (!data.length) {
    return (
      <Surface className="rounded-3xl border border-border bg-surface p-5">
        <h2 className="font-semibold text-foreground">Top Categories</h2>
        <p className="mt-4 text-sm text-muted">No order data yet.</p>
      </Surface>
    );
  }

  return (
    <Surface className="rounded-3xl border border-border bg-surface p-5">
      <h2 className="font-semibold text-foreground">Top Categories</h2>
      <p className="text-xs text-muted">Order share by product category</p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Surface>
  );
}