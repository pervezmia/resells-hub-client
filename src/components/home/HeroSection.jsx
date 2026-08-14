"use client";

import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import { motion } from "motion/react";
import Link from "next/link";

export default function HeroSection({ stats }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
            Buy and Sell Pre-Owned Products, Safely and Easily
          </h1>
          <p className="mt-4 text-muted sm:text-lg">
            ReSell Hub connects buyers and sellers of second-hand goods —
            reduce waste, find great deals, or earn from items you no longer
            need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/products">
            <Button className="bg-accent text-accent-foreground">
              <span className="flex items-center gap-1.5">
                Browse Products
                <ArrowRight width={16} height={16} />
              </span>
            </Button>
          </Link>
          <Link href="/dashboard/seller/add-product">
            <Button variant="secondary">Start Selling</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted"
        >
          <span>
            <strong className="text-foreground">{stats.totalProducts}+</strong> products listed
          </span>
          <span>
            <strong className="text-foreground">{stats.totalSellers}+</strong> active sellers
          </span>
          <span>
            <strong className="text-foreground">{stats.completedOrders}+</strong> orders completed
          </span>
        </motion.div>
      </div>
    </section>
  );
}