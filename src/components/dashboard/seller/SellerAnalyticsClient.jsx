"use client";

import { Surface } from "@heroui/react";
import { Wallet, ShoppingBag, Box, Hourglass } from "@gravity-ui/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const statusStyles = {
  available: "bg-success-soft text-success",
  sold: "bg-danger-soft text-danger",
  pending: "bg-warning-soft text-warning",
};

export default function SellerAnalyticsClient({
  stats = {},
  categorySalesData = [],
  topProducts = [],
  monthlySalesData = [],
}) {
  const kpiData = [
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Box,
      accent: "bg-accent-soft text-accent",
    },
    {
      title: "Total Sales",
      value: stats?.totalSales ?? 0,
      icon: ShoppingBag,
      accent: "bg-success-soft text-success",
    },
    {
      title: "Total Revenue",
      value: `৳${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: Wallet,
      accent: "bg-primary-soft text-primary",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders ?? 0,
      icon: Hourglass,
      accent: "bg-warning-soft text-warning",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl overflow-hidden px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Sales Analytics</h1>
      <p className="mt-1 text-sm text-muted">
        Real-time performance metrics and product insights for your store.
      </p>

      {/* KPI Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(({ title, value, icon: Icon, accent }) => (
          <Surface
            key={title}
            className="min-w-0 rounded-3xl border border-border bg-surface p-5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
            >
              <Icon width={20} height={20} />
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground">{value}</p>
            <p className="mt-1 text-sm text-muted">{title}</p>
          </Surface>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Surface className="min-w-0 rounded-3xl border border-border bg-surface p-5 lg:col-span-2">
          <h2 className="font-semibold text-foreground">Monthly Sales Trend</h2>
          <p className="text-xs text-muted">
            Revenue from paid orders over the last 6 months
          </p>

          <div className="mt-4 h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySalesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--accent)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--accent)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />
                <YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip
                  formatter={(val) => [
                    `৳${(val ?? 0).toLocaleString()}`,
                    "Revenue",
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--accent)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Surface>

        <Surface className="min-w-0 rounded-3xl border border-border bg-surface p-5">
          <h2 className="font-semibold text-foreground">Revenue by Category</h2>
          <p className="text-xs text-muted">From paid orders</p>

          <div className="mt-4 h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" stroke="var(--muted)" fontSize={10} />
                <YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="var(--success)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Surface>
      </div>

      {/* Top Selling Products */}
      <Surface className="mt-6 min-w-0 rounded-3xl border border-border bg-surface p-5">
        <h2 className="font-semibold text-foreground">Top Selling Products</h2>
        <p className="text-xs text-muted">
          Ranked by units sold from paid orders
        </p>

        {!topProducts.length ? (
          <p className="mt-6 text-sm text-muted">No sales yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {product.title}
                  </p>
                  <p className="text-xs text-muted">{product.category}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-semibold text-foreground">
                    ৳{product.price?.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted">{product.unitsSold} sold</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Surface>
    </div>
  );
}
