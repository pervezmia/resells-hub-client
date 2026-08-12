'use client';

import React from 'react';
import { Card, Chip } from '@heroui/react';
import { CircleDollar, ShoppingBag, Box, Clock } from '@gravity-ui/icons';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

export default function SellerAnalyticsClient({
  stats = {},
  categorySalesData = [],
  topProducts = [],
  monthlySalesData = []
}) {
  const kpiData = [
    {
      title: "TOTAL PRODUCTS",
      value: stats?.totalProducts ?? 0,
      icon: Box,
      iconBgClass: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      title: "TOTAL SALES",
      value: stats?.totalSales ?? 0,
      icon: ShoppingBag,
      iconBgClass: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "TOTAL REVENUE",
      value: `৳ ${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: CircleDollar,
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    },
    {
      title: "PENDING ORDERS",
      value: stats?.pendingOrders ?? 0,
      icon: Clock,
      iconBgClass: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <main className="w-full min-w-0 max-w-full overflow-x-hidden p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      
      {/* Header */}
      <header className="w-full min-w-0 border-b border-divider pb-3 sm:pb-5">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight truncate">
          Sales Analytics
        </h1>
        <p className="text-xs sm:text-sm text-default-500 mt-1 truncate">
          Real-time performance metrics and product insights for your store.
        </p>
      </header>

      {/* KPI Cards Section */}
      <section aria-label="Key Performance Indicators" className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {kpiData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} shadow="sm" className="w-full min-w-0 border border-divider p-3.5 sm:p-4 overflow-hidden">
              <div className="flex flex-row items-center justify-between gap-2.5 min-w-0">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-default-500 truncate">
                    {item.title}
                  </p>
                  <h2 className="text-base sm:text-2xl font-bold text-foreground mt-0.5 sm:mt-1 truncate">
                    {item.value}
                  </h2>
                </div>
                <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${item.iconBgClass}`}>
                  <IconComponent className="size-5 sm:size-6" aria-label={item.title} role="img" />
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Charts Section */}
      <section aria-label="Analytics Charts" className="w-full min-w-0 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Revenue Area Chart */}
        <Card shadow="sm" className="w-full min-w-0 lg:col-span-2 border border-divider p-3.5 sm:p-5 overflow-hidden">
          <div className="flex flex-col items-start pb-3 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground truncate w-full">Revenue Overview</h3>
            <p className="text-xs text-default-500 truncate w-full">Monthly earnings calculated from database</p>
          </div>
          <div className="h-[220px] sm:h-[300px] w-full min-w-0 relative">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={monthlySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => [`৳ ${(val ?? 0).toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Bar Chart */}
        <Card shadow="sm" className="w-full min-w-0 border border-divider p-3.5 sm:p-5 overflow-hidden">
          <div className="flex flex-col items-start pb-3 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground truncate w-full">Category Share</h3>
            <p className="text-xs text-default-500 truncate w-full">Products distribution by category</p>
          </div>
          <div className="h-[220px] sm:h-[300px] w-full min-w-0 relative">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={categorySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Top Products Table */}
      <section aria-label="Top Selling Products" className="w-full min-w-0">
        <Card shadow="sm" className="w-full min-w-0 border border-divider p-3.5 sm:p-5 overflow-hidden">
          <div className="flex flex-col items-start pb-3 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground">Listed Products</h3>
            <p className="text-xs text-default-500">Recent products fetched from database</p>
          </div>
          <div className="w-full min-w-0 overflow-x-auto rounded-lg">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-default-100 text-default-600 uppercase text-[10px] sm:text-[11px] tracking-wider">
                <tr>
                  <th className="p-2.5 sm:p-3 rounded-l-lg">Title</th>
                  <th className="p-2.5 sm:p-3">Category</th>
                  <th className="p-2.5 sm:p-3">Price</th>
                  <th className="p-2.5 sm:p-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {topProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-default-100/50 transition-colors">
                    <td className="p-2.5 sm:p-3 font-semibold text-foreground max-w-[120px] sm:max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="p-2.5 sm:p-3 text-default-500 whitespace-nowrap">{item.category}</td>
                    <td className="p-2.5 sm:p-3 font-medium text-foreground whitespace-nowrap">
                      ৳ {item.price?.toLocaleString()}
                    </td>
                    <td className="p-2.5 sm:p-3 whitespace-nowrap">
                      <Chip size="sm" color={item.status === 'sold' ? 'success' : 'warning'} variant="flat">
                        {item.status || 'available'}
                      </Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

    </main>
  );
}