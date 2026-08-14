"use client";

import { Surface } from "@heroui/react";
import { Box, Persons, ShoppingBag, CircleCheck } from "@gravity-ui/icons";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function MarketplaceStats({ stats }) {
  const data = [
    { label: "Total Products", value: stats.totalProducts, icon: Box, accent: "bg-accent-soft text-accent" },
    { label: "Total Sellers", value: stats.totalSellers, icon: Persons, accent: "bg-primary-soft text-primary" },
    { label: "Total Buyers", value: stats.totalBuyers, icon: ShoppingBag, accent: "bg-success-soft text-success" },
    { label: "Completed Orders", value: stats.completedOrders, icon: CircleCheck, accent: "bg-warning-soft text-warning" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-2xl font-bold text-foreground">
        ReSell Hub by the Numbers
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {data.map(({ label, value, icon: Icon, accent }) => (
          <motion.div key={label} variants={item}>
            <Surface className="rounded-3xl border border-border bg-surface p-6 text-center">
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
                <Icon width={22} height={22} />
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </Surface>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}