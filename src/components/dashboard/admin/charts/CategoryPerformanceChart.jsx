"use client";

import { Surface } from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CategoryPerformanceChart({ data = [] }) {
  return (
    <Surface className="rounded-3xl border border-border bg-surface p-5">
      <h2 className="font-semibold text-foreground">Category Performance</h2>
      <p className="text-xs text-muted">Number of listed products per category</p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" stroke="var(--muted)" fontSize={12} allowDecimals={false} />
            <YAxis
              dataKey="category"
              type="category"
              stroke="var(--muted)"
              fontSize={12}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
            />
            <Bar dataKey="count" fill="var(--accent)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Surface>
  );
}