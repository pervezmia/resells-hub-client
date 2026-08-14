"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import { motion } from "motion/react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-border-y border bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        >
          Buy and Sell Pre-Owned Products,
          <span className="text-accent"> Safely and Easily</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-4 max-w-2xl text-sm text-foreground/60 sm:text-base lg:text-lg"
        >
          ReSell Hub connects buyers and sellers of second-hand goods, reducing
          waste and helping you find great deals or earn from items you no
          longer need.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/products" className="w-full sm:w-auto">
            <Button className="w-full gap-2 sm:w-auto">
              Start Shopping
              <ArrowRight />
            </Button>
          </Link>
          <Link href="/dashboard/seller/add-product" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto">
              Sell Your Item
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}