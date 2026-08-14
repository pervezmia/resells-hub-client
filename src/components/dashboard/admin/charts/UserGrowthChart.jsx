"use client";

import { Surface } from "@heroui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserGrowthChart({ data = [] }) {
  return (
    <Surface className="rounded-3xl border border-border bg-surface p-5">
      <h2 className="font-semibold text-foreground">User Growth</h2>
      <p className="text-xs text-muted">New registrations over the last 6 months</p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />
            <YAxis stroke="var(--muted)" fontSize={12} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Surface>
  );
}