"use client";

import { Surface } from "@heroui/react";
import { Persons, Box, ShoppingBag } from "@gravity-ui/icons";
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
  totalUsers = 0,
  totalProducts = 0,
  totalOrders = 0,
}) {
  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Persons,
      accent: "bg-primary-soft text-primary",
    },
    {
      label: "Total Products",
      value: totalProducts,
      icon: Box,
      accent: "bg-accent-soft text-accent",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      accent: "bg-success-soft text-success",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
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