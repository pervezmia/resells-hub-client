"use client";

import { Surface } from "@heroui/react";
import { ShoppingBag, Bookmark, CircleCheck, Wallet } from "@gravity-ui/icons";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function DashboardStats({
  totalOrders = 0,
  wishlistCount = 0,
  completedOrders = 0,
  totalSpent = 0,
}) {
  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      accent: "bg-primary-soft text-primary",
    },
    {
      label: "Completed Orders",
      value: completedOrders,
      icon: CircleCheck,
      accent: "bg-success-soft text-success",
    },
    {
      label: "Total Spent",
      value: `৳${totalSpent.toLocaleString()}`,
      icon: Wallet,
      accent: "bg-warning-soft text-warning",
    },
    {
      label: "Wishlist Items",
      value: wishlistCount,
      icon: Bookmark,
      accent: "bg-accent-soft text-accent",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map(({ label, value, icon: Icon, accent }) => (
        <motion.div key={label} variants={item}>
          <Surface className="rounded-3xl border border-border bg-surface p-5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
              <Icon width={20} height={20} />
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground">{value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </Surface>
        </motion.div>
      ))}
    </motion.div>
  );
}